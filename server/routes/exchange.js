const express = require('express');
const router = express.Router();
const ExchangeRequest = require('../models/ExchangeRequest');
const Book = require('../models/Book');
const User = require('../models/user');
const { authenticate } = require('../utils');

// Send exchange request
router.post('/request', authenticate, async (req, res) => {
  try {
    // Check if book exists and is available
    const book = await Book.findById(req.body.book);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.status !== 'Available') return res.status(400).json({ error: 'Book is not available' });
    
    // Prevent users from requesting their own books
    if (book.owner.toString() === res.user.id) {
      return res.status(400).json({ error: 'Cannot request your own book' });
    }
    
    // Check if user already has a pending request for this book
    const existingRequest = await ExchangeRequest.findOne({
      book: req.body.book,
      requester: res.user.id,
      status: 'Pending'
    });
    
    if (existingRequest) {
      return res.status(400).json({ error: 'You already have a pending request for this book' });
    }
    
    const requestData = {
      book: req.body.book,
      requester: res.user.id,
      message: req.body.message || ''
    };
    
    const request = new ExchangeRequest(requestData);
    const saved = await request.save();
    
    // Add request to user's requestsSent
    await User.findByIdAndUpdate(res.user.id, {
      $push: { requestsSent: saved._id }
    });
    
    // Add request to book owner's requestsReceived
    await User.findByIdAndUpdate(book.owner, {
      $push: { requestsReceived: saved._id }
    });
    
    // Update book status to 'Requested'
    book.status = 'Requested';
    await book.save();
    
    const populatedRequest = await ExchangeRequest.findById(saved._id)
      .populate('book')
      .populate('requester', 'name username');
    
    res.status(201).json(populatedRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept request (only book owner can accept)
router.put('/request/:id/accept', authenticate, async (req, res) => {
  try {
    const request = await ExchangeRequest.findById(req.params.id).populate('book');
    if (!request) return res.status(404).json({ error: 'Request not found' });
    
    // Check if user is the book owner
    if (request.book.owner.toString() !== res.user.id) {
      return res.status(403).json({ error: 'Not authorized to accept this request' });
    }
    
    if (request.status !== 'Pending') {
      return res.status(400).json({ error: 'Request is not pending' });
    }

    request.status = 'Accepted';
    await request.save();

    // Mark book as exchanged
    await Book.findByIdAndUpdate(request.book._id, { status: 'Exchanged' });
    
    // Reject all other pending requests for this book
    await ExchangeRequest.updateMany(
      {
        book: request.book._id,
        _id: { $ne: request._id },
        status: 'Pending'
      },
      { status: 'Rejected' }
    );
    
    // Move book from currentPosts to postHistory for the owner
    await User.findByIdAndUpdate(res.user.id, {
      $pull: { currentPosts: request.book._id },
      $push: { postHistory: request.book._id }
    });
    
    // Add book to requester's previousPurchases
    await User.findByIdAndUpdate(request.requester, {
      $push: { previousPurchases: request.book._id }
    });

    const populatedRequest = await ExchangeRequest.findById(request._id)
      .populate('book')
      .populate('requester', 'name username');

    res.json({ message: 'Request accepted', request: populatedRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject request (only book owner can reject)
router.put('/request/:id/reject', authenticate, async (req, res) => {
  try {
    const request = await ExchangeRequest.findById(req.params.id).populate('book');
    if (!request) return res.status(404).json({ error: 'Request not found' });
    
    // Check if user is the book owner
    if (request.book.owner.toString() !== res.user.id) {
      return res.status(403).json({ error: 'Not authorized to reject this request' });
    }
    
    if (request.status !== 'Pending') {
      return res.status(400).json({ error: 'Request is not pending' });
    }

    request.status = 'Rejected';
    await request.save();
    
    // Check if this was the only pending request, if so, make book available again
    const otherPendingRequests = await ExchangeRequest.countDocuments({
      book: request.book._id,
      _id: { $ne: request._id },
      status: 'Pending'
    });
    
    if (otherPendingRequests === 0) {
      await Book.findByIdAndUpdate(request.book._id, { status: 'Available' });
    }

    const populatedRequest = await ExchangeRequest.findById(request._id)
      .populate('book')
      .populate('requester', 'name username');

    res.json({ message: 'Request rejected', request: populatedRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View all requests by a user (sent and received) - user can only view their own
router.get('/user/:userId', authenticate, async (req, res) => {
  // Users can only view their own requests
  if (req.params.userId !== res.user.id) {
    return res.status(403).json({ error: 'Not authorized to view these requests' });
  }
  try {
    const sent = await ExchangeRequest.find({ requester: req.params.userId })
      .populate('book')
      .populate('requester', 'name username');
    
    // Find requests for books owned by this user
    const userBooks = await Book.find({ owner: req.params.userId });
    const bookIds = userBooks.map(book => book._id);
    
    const received = await ExchangeRequest.find({ 
      book: { $in: bookIds },
      requester: { $ne: req.params.userId } // Exclude own requests
    })
      .populate('book')
      .populate('requester', 'name username');
    
    res.json({ sent, received });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel request (only requester can cancel)
router.put('/request/:id/cancel', authenticate, async (req, res) => {
  try {
    const request = await ExchangeRequest.findById(req.params.id).populate('book');
    if (!request) return res.status(404).json({ error: 'Request not found' });
    
    // Check if user is the requester
    if (request.requester.toString() !== res.user.id) {
      return res.status(403).json({ error: 'Not authorized to cancel this request' });
    }
    
    if (request.status !== 'Pending') {
      return res.status(400).json({ error: 'Can only cancel pending requests' });
    }

    request.status = 'Cancelled';
    await request.save();
    
    // Check if this was the only pending request, if so, make book available again
    const otherPendingRequests = await ExchangeRequest.countDocuments({
      book: request.book._id,
      _id: { $ne: request._id },
      status: 'Pending'
    });
    
    if (otherPendingRequests === 0) {
      await Book.findByIdAndUpdate(request.book._id, { status: 'Available' });
    }

    const populatedRequest = await ExchangeRequest.findById(request._id)
      .populate('book')
      .populate('requester', 'name username');

    res.json({ message: 'Request cancelled', request: populatedRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all requests for books owned by the authenticated user
router.get('/requests/received', authenticate, async (req, res) => {
  try {
    // Find all books owned by the user
    const userBooks = await Book.find({ owner: res.user.id });
    const bookIds = userBooks.map(book => book._id);
    
    const requests = await ExchangeRequest.find({ 
      book: { $in: bookIds }
    })
      .populate('book', 'title author imageUrls')
      .populate('requester', 'name username')
      .sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all requests sent by the authenticated user
router.get('/requests/sent', authenticate, async (req, res) => {
  try {
    const requests = await ExchangeRequest.find({ requester: res.user.id })
      .populate('book', 'title author imageUrls owner')
      .populate({
        path: 'book',
        populate: {
          path: 'owner',
          select: 'name username'
        }
      })
      .sort({ createdAt: -1 });
    
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

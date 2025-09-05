const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/user');
const { authenticate } = require('../utils');
const multer = require('multer');
const { uploadPhoto, resizeAndUploadImage } = require('../imageUpload');
const upload = multer();

// Create new book
router.post('/', authenticate, async (req, res) => {
  try {
    const bookData = {
      ...req.body,
      owner: res.user.id // Set owner from authenticated user
    };
    const book = new Book(bookData);
    const saved = await book.save();
    
    // Add book to user's currentPosts
    await User.findByIdAndUpdate(res.user.id, {
      $push: { currentPosts: saved._id }
    });
    
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('owner');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all available books (excluding user's own books)
router.get('/available', authenticate, async (req, res) => {
  try {
    const books = await Book.find({ 
      status: 'Available',
      owner: { $ne: res.user.id } // Exclude user's own books
    }).populate('owner', 'name username location');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner');
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update book (only owner can update)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    
    // Check if user is the owner
    if (book.owner.toString() !== res.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this book' });
    }
    
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete book (only owner can delete)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    
    // Check if user is the owner
    if (book.owner.toString() !== res.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this book' });
    }
    
    await Book.findByIdAndDelete(req.params.id);
    
    // Remove book from user's currentPosts and add to postHistory
    await User.findByIdAndUpdate(res.user.id, {
      $pull: { currentPosts: req.params.id },
      $push: { postHistory: req.params.id }
    });
    
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload book images
router.post('/:id/images', authenticate, uploadPhoto.single('file'), resizeAndUploadImage, async (req, res) => {
  try {
    if (!req.imageUrl) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    
    // Check if user is the owner
    if (book.owner.toString() !== res.user.id) {
      return res.status(403).json({ error: 'Not authorized to upload images for this book' });
    }

    // Add image URL to book's imageUrls array
    book.imageUrls.push(req.imageUrl);
    await book.save();

    res.status(201).json({ 
      message: "Image uploaded successfully", 
      imageUrl: req.imageUrl,
      book: book 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get books by genre
router.get('/genre/:genre', async (req, res) => {
  try {
    const books = await Book.find({ 
      genre: req.params.genre,
      status: 'Available'
    }).populate('owner', 'name username location');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search books
router.get('/search', async (req, res) => {
  try {
    const { q, genre, condition } = req.query;
    let query = { status: 'Available' };
    
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }
    
    if (genre) query.genre = genre;
    if (condition) query.condition = condition;
    
    const books = await Book.find(query).populate('owner', 'name username location');
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

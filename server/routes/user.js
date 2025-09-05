const express = require('express');
const router = express.Router();
const multer= require('multer')
const { uploadPhoto, resizeAndUploadImage } = require('../imageUpload');
const { authenticate,} = require('../utils')
const User = require('../models/user')
const upload = multer();

router.get('/',authenticate, (req, res) => {
    const id = res.user.id
    User.findById(id)
    .then(result => {
        res.status(200).json({ id, username: result.username, name: result.name })
    })
    .catch(err => res.status(400).json(err))
});

router.post('/image', authenticate, uploadPhoto.single('file'), resizeAndUploadImage, (req, res) => {
    if (!req.imageUrl) {
      return res.status(500).json({ message: "Image upload failed" });
    }
  
    const id = res.user.id; 
  
    User.findById(id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({ message: "User not found" });
        }
  
        result.profile_pic = req.imageUrl;
  
        return result.save(); 
      })
      .then((updatedUser) => {
        return res.status(201).json({ 
          message: "Uploaded successfully", 
          profilePic: updatedUser.profile_pic 
        });
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        return res.status(400).json({ message: "Failed to update user", error: err });
      });
  });

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('currentPosts postHistory previousPurchases');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current posts
router.get('/:id/posts/current', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('currentPosts');
    res.json(user.currentPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get post history
router.get('/:id/posts/history', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('postHistory');
    res.json(user.postHistory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get purchase history
router.get('/:id/purchases', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('previousPurchases');
    res.json(user.previousPurchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


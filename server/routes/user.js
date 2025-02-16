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
  
    const id = res.user.id; // Corrected from res.user.id
  
    User.findById(id)
      .then((result) => {
        if (!result) {
          return res.status(404).json({ message: "User not found" });
        }
  
        result.profile_pic = req.imageUrl;
  
        return result.save(); // Save updated user
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
  
    
module.exports = router;

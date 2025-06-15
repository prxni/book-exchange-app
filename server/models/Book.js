const mongoose = require('mongoose');

const allowedGenres = [
  'Adventure',
  'Fantasy',
  'Romance',
  'Science Fiction',
  'Horror',
  'Thriller',
  'Non-fiction',
  'Biography',
  'Mystery',
  'Historical',
  'Comics',
  'Poetry'
];

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: {
    type: String,
    enum: allowedGenres,
    required: true
  },
  description: String,
  condition: { type: String, enum: ['New', 'Good', 'Fair', 'Poor'], default: 'Good' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Available', 'Requested', 'Exchanged'], default: 'Available' },
  imageUrls: [String],
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);

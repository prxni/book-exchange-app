const mongoose = require('mongoose');

const allowedTags = [
  'Adventure', 'Fantasy', 'Romance', 'Science Fiction',
  'Horror', 'Thriller', 'Non-fiction', 'Biography', 'Mystery'
];

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  location: String,
  address: String,
  bio: String,
  tags: [{
    type: String,
    enum: allowedTags
  }],
  previousPurchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  currentPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  postHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  requestsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExchangeRequest' }],
  requestsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ExchangeRequest' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

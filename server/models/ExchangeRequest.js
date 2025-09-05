const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: String,
  status: { type: String, enum: ['Pending', 'Accepted', 'Rejected', 'Cancelled', 'Completed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ExchangeRequest', requestSchema);

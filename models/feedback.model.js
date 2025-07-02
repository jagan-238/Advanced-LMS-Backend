const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  assignmentId: mongoose.Schema.Types.ObjectId,
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PeerFeedback', feedbackSchema);

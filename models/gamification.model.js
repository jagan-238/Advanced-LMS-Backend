const mongoose = require('mongoose');

const gamificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  achievements: [{
    badge: String,
    description: String,
    awardedAt: { type: Date, default: Date.now }
  }],
  totalPoints: { type: Number, default: 0 }
});

module.exports = mongoose.model('Gamification', gamificationSchema);

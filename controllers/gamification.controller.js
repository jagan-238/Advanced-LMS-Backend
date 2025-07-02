const Gamification = require('../models/gamification.model');

exports.awardBadge = async (req, res) => {
  const { userId, badge, description, points } = req.body;
  let g = await Gamification.findOne({ userId });
  if (!g) g = await Gamification.create({ userId, achievements: [], totalPoints: 0 });

  g.achievements.push({ badge, description });
  g.totalPoints += points || 10;
  await g.save();
  res.json(g);
};

exports.getLeaderboard = async (req, res) => {
  const top = await Gamification.find().populate('userId', 'name').sort({ totalPoints: -1 }).limit(10);
  res.json(top);
};

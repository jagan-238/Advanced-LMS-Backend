const Feedback = require('../models/feedback.model');

// ✅ Submit feedback to another student
exports.giveFeedback = async (req, res) => {
  try {
    const { assignmentId, to, content, rating } = req.body;
    const from = req.user.userId;

    const feedback = await Feedback.create({ assignmentId, from, to, content, rating });
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ View feedback received
exports.getFeedbackForUser = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ to: req.user.userId }).populate('from', 'name');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ View feedback given by the user
exports.getFeedbackByUser = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ from: req.user.userId }).populate('to', 'name');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

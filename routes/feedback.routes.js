const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const feedbackCtrl = require('../controllers/feedback.controller');

// 📩 Submit feedback
router.post('/', authenticate, feedbackCtrl.giveFeedback);

// 👤 Get feedback received
router.get('/received', authenticate, feedbackCtrl.getFeedbackForUser);

// 📝 Get feedback given
router.get('/given', authenticate, feedbackCtrl.getFeedbackByUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const gamify = require('../controllers/gamification.controller');

// 🏅 Award a badge (admin/instructor only)
router.post('/award', authenticate, authorizeRoles('admin', 'instructor'), gamify.awardBadge);

// 📊 Leaderboard
router.get('/leaderboard', authenticate, gamify.getLeaderboard);

module.exports = router;

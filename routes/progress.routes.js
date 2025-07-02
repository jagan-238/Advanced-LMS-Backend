const express = require('express');
const router = express.Router();
const { markProgress, getProgressByStudent } = require('../controllers/progress.controller');

// Mark lesson/assignment as completed
router.post('/', markProgress);

// Get progress for a student
router.get('/:studentId', getProgressByStudent);

module.exports = router;

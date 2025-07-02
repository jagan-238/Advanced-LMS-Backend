const express = require('express');
const router = express.Router();
const { createLesson } = require('../controllers/lesson.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.post('/', authenticate, authorizeRoles('instructor', 'admin'), createLesson);

module.exports = router;

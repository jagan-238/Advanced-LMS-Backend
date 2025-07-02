const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/assessment.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.post('/', authenticate, authorizeRoles('instructor'), ctrl.createAssessment);
router.patch('/:id/publish', authenticate, authorizeRoles('instructor'), ctrl.publishAssessment);
router.post('/submit', authenticate, authorizeRoles('student'), ctrl.submitOrAutoSave);

module.exports = router;

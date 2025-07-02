const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');
const ctrl = require('../controllers/analytics.controller');

router.get('/dashboard', authenticate, authorizeRoles('instructor', 'admin'), ctrl.getDashboard);
router.get('/risk', authenticate, authorizeRoles('instructor', 'admin'), ctrl.getAtRiskStudents);
router.get('/report', authenticate, authorizeRoles('instructor', 'admin'), ctrl.getCustomReport);

router.get('/performance/:studentId', authenticate, ctrl.getPerformance);

module.exports = router;

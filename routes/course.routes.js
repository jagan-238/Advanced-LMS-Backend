// routes/course.routes.js
const express = require('express');
const router = express.Router();

const courseCtrl = require('../controllers/course.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorizeRoles } = require('../middlewares/role.middleware');

router.post('/', authenticate, authorizeRoles('instructor', 'admin'), courseCtrl.createCourse);
router.get('/', courseCtrl.getCourses);
router.get('/:id', courseCtrl.getCourse);
router.patch('/:id', authenticate, authorizeRoles('instructor', 'admin'), courseCtrl.updateCourse);
router.delete('/:id', authenticate, authorizeRoles('admin'), courseCtrl.deleteCourse);
router.patch('/:courseId/approve/:contentIndex', authenticate, authorizeRoles('admin'), courseCtrl.approveContent);

module.exports = router; 

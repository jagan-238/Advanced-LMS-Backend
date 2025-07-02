const router = require('express').Router();
const { authenticate } = require('../middlewares/auth.middleware');
const ctrl = require('../controllers/forum.controller');

router.post('/threads', authenticate, ctrl.createThread);
router.post('/threads/:threadId/reply', authenticate, ctrl.replyToThread);

module.exports = router;

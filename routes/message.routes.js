// routes/message.routes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');
const MessageCtrl = require('../controllers/message.controller');

// Send a private message
router.post('/send', authenticate, MessageCtrl.sendMessage);

// Optional: Get inbox messages
router.get('/inbox', authenticate, MessageCtrl.getInbox);

module.exports = router;

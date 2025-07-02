// controllers/message.controller.js
const Message = require('../models/message.model');

exports.sendMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body;
    if (!receiver || !content) {
      return res.status(400).json({ error: 'Receiver and content are required' });
    }

    const message = await Message.create({
      sender: req.user.userId,
      receiver,
      content,
    });

    res.status(201).json({ message: 'Message sent', data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInbox = async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user.userId })
      .populate('sender', 'name email')
      .sort({ sentAt: -1 });

    res.json({ inbox: messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Forum = require('../models/forum.model');

exports.createThread = async (req, res) => {
  const { courseId, title, content, tags } = req.body;
  const thread = await Forum.create({ courseId, title, content, tags, author: req.user.userId });
  res.status(201).json(thread);
};

exports.replyToThread = async (req, res) => {
  const { threadId } = req.params;
  const { content } = req.body;
  const thread = await Forum.findById(threadId);
  thread.replies.push({ author: req.user.userId, content });
  await thread.save();
  res.json(thread);
};

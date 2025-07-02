const Lesson = require('../models/lesson.model'); // ✅ Make sure this is imported

exports.createLesson = async (req, res) => {
  const { courseId, title, content } = req.body;

  console.log("Received Body:", req.body); // 🐞 Debug log

  if (!courseId || !title) {
    return res.status(400).json({ error: 'Title and course ID are required' });
  }

  try {
    const lesson = await Lesson.create({ courseId, title, content });
    res.status(201).json({ message: 'Lesson created successfully', lesson });
  } catch (error) {
    console.error("Error while creating lesson:", error); // 🐞 See the real problem
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


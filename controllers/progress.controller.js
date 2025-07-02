const Progress = require('../models/progress.model');

exports.markProgress = async (req, res) => {
  try {
    const { studentId, courseId, lessonId, status } = req.body;
    const progress = await Progress.create({ studentId, courseId, lessonId, status });
    res.status(201).json({ message: 'Progress saved', progress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProgressByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = await Progress.find({ studentId }).populate('courseId lessonId');
    res.status(200).json({ progress: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

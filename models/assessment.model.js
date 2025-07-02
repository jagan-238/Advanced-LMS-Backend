const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});

const assessmentSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  type: { type: String, enum: ['quiz', 'assignment'], required: true },
  title: { type: String, required: true },
  questions: [questionSchema]
});

module.exports = mongoose.model('Assessment', assessmentSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin', 'department-head'], default: 'student' },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  progress: {
    type: Map,
    of: Number // e.g., { "courseId": 40 } meaning 40% completed
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

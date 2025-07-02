const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  title: String,
  description: String,
  syllabus: Object,
  updatedAt: { type: Date, default: Date.now }
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: [
    {
      type: { type: String, enum: ['video', 'document', 'quiz'] },
      url: String,
      metadata: Object,
      approved: { type: Boolean, default: false }
    }
  ],
  syllabus: {
    objectives: [String],
    units: [
      {
        title: String,
        linkedLesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }
      }
    ]
  },
  versions: [versionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);

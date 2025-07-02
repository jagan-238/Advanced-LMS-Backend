const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [
    {
      questionIndex: Number,
      response: String,
      autoScore: Number,
      feedback: String
    }
  ],
  totalScore: Number,
  isFinal: { type: Boolean, default: false },
  similarityScore: Number
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);

const Assessment = require('../models/assessment.model');
const Submission = require('../models/submission.model');
const { gradeSubmission } = require('../utils/grader');
const { checkPlagiarism } = require('../utils/plagiarism');

exports.createAssessment = async (req, res) => {
  const assessment = await Assessment.create({ ...req.body, createdBy: req.user.userId });
  res.status(201).json(assessment);
};

exports.publishAssessment = async (req, res) => {
  const assessment = await Assessment.findByIdAndUpdate(req.params.id, { published: true }, { new: true });
  res.json({ message: 'Published', assessment });
};

exports.submitOrAutoSave = async (req, res) => {
  const { assessmentId, answers, isFinal } = req.body;
  const studentId = req.user.userId;

  const existing = await Submission.findOne({ assessmentId, studentId });
  const update = { answers, isFinal };

  if (isFinal) {
    const assessment = await Assessment.findById(assessmentId);
    const graded = gradeSubmission(assessment, { answers });

    update.answers = graded.answers;
    update.totalScore = graded.totalScore;

    // Optional plagiarism score
    const essays = answers.filter(a => assessment.questions[a.questionIndex].type === 'essay');
    const text = essays.map(e => e.response).join(' ');
    update.similarityScore = await checkPlagiarism(text);
  }

  const submission = existing
    ? await Submission.findOneAndUpdate({ assessmentId, studentId }, update, { new: true })
    : await Submission.create({ assessmentId, studentId, ...update });

  res.json(submission);
};


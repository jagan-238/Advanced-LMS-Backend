const Progress = require('../models/progress.model');
const { predictAtRisk } = require('../utils/predictor');
const { generateReport } = require('../utils/reporter');

// EXISTING: Dashboard
exports.getDashboard = async (req, res) => {
  const { courseId, studentId } = req.query;
  const query = {};
  if (courseId) query.courseId = courseId;
  if (studentId) query.studentId = studentId;

  const progressList = await Progress.find(query)
    .populate('studentId', 'name email')
    .populate('courseId', 'title');

  res.json({ dashboard: progressList });
};

// EXISTING: Risk
exports.getAtRiskStudents = async (req, res) => {
  const progressList = await Progress.find();
  const results = predictAtRisk(progressList);
  res.json({ flagged: results });
};

// EXISTING: Report
exports.getCustomReport = async (req, res) => {
  const progressList = await Progress.find();
  const report = generateReport(progressList);
  res.json({ report });
};

// ✅ NEW: getPerformance (student or instructor)
exports.getPerformance = async (req, res) => {
  const { studentId } = req.params;

  try {
    // If role is 'student', allow only self
    if (req.user.role === 'student' && req.user.userId !== studentId) {
      return res.status(403).json({ message: "You can only view your own performance" });
    }

    const progress = await Progress.find({ studentId });

    const totalCourses = new Set(progress.map(p => p.courseId.toString())).size;
    const completedLessons = progress.reduce((sum, p) => sum + (p.completedLessons || 0), 0);
    const averageScore =
      progress.length > 0
        ? Math.round(progress.reduce((sum, p) => sum + (p.score || 0), 0) / progress.length)
        : 0;

    res.json({
      studentId,
      totalCourses,
      completedLessons,
      averageScore,
      badges: ["Top Scorer", "Consistent Learner"] // you can update dynamically
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching performance data' });
  }
};


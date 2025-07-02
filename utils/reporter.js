// utils/reporter.js

exports.generateReport = (progressList) => {
  return progressList.map(p => ({
    student: p.studentId?.name || "Unknown",
    course: p.courseId?.title || "Unknown",
    totalLessons: p.lessons?.length || 0,
    completedLessons: p.completedLessons?.length || 0,
    progressPercent: (p.completedLessons?.length && p.lessons?.length)
      ? Math.floor((p.completedLessons.length / p.lessons.length) * 100)
      : 0
  }));
};

exports.predictAtRisk = (progressList) => {
  return progressList.map(p => {
    const risk = (p.engagementScore < 40 || p.finalGrade < 50) ? true : false;
    return {
      studentId: p.studentId,
      courseId: p.courseId,
      atRisk: risk,
      reason: risk ? 'Low engagement or performance' : 'OK'
    };
  });
};

exports.gradeSubmission = (assessment, submission) => {
  let total = 0;
  const updatedAnswers = submission.answers.map((a) => {
    const q = assessment.questions[a.questionIndex];
    let score = 0;
    let feedback = '';

    if (q.type === 'mcq' || q.type === 'true_false') {
      score = a.response === q.correctAnswer ? 1 : 0;
    } else if (q.type === 'essay') {
      score = 0; // placeholder, instructor reviews manually
      feedback = 'Awaiting instructor evaluation';
    }

    total += score;
    return { ...a, autoScore: score, feedback };
  });

  return { totalScore: total, answers: updatedAnswers };
};


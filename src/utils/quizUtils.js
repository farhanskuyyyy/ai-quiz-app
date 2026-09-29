// Shuffle array (Fisher-Yates)
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random questions by difficulty
export function getQuestions(questions, count, difficulty) {
  let filtered = questions;
  if (difficulty !== 'all') {
    filtered = questions.filter(q => q.difficulty === difficulty);
  }
  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Shuffle options and update correctAnswer index
export function shuffleOptions(question) {
  const optionsWithIndex = question.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
  const shuffled = shuffleArray(optionsWithIndex);
  const newCorrectIndex = shuffled.findIndex(opt => opt.originalIndex === question.correctAnswer);
  return {
    ...question,
    options: shuffled.map(opt => opt.text),
    correctAnswer: newCorrectIndex
  };
}

// Get feedback based on percentage
export function getFeedback(percentage) {
  if (percentage >= 90) return { text: 'Excellent! 🎉', color: 'text-green-600' };
  if (percentage >= 70) return { text: 'Great Job! 👏', color: 'text-blue-600' };
  if (percentage >= 50) return { text: 'Keep Learning 📚', color: 'text-yellow-600' };
  return { text: 'Keep Practicing 💪', color: 'text-red-600' };
}

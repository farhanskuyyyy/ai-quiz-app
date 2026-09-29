import { getFeedback } from '../utils/quizUtils';

export default function QuizResult({ score, total, answers, onReview, onTryAgain, onHome }) {
  const percentage = Math.round((score / total) * 100);
  const feedback = getFeedback(percentage);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🏆</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Quiz Complete!</h2>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <p className="text-5xl font-bold text-indigo-600 mb-2">{score}/{total}</p>
        <p className="text-2xl font-semibold text-gray-700">{percentage}%</p>
        <p className={`text-lg font-medium mt-2 ${feedback.color}`}>{feedback.text}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-2xl font-bold text-green-600">{score}</p>
          <p className="text-sm text-gray-600">Correct</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-2xl font-bold text-red-600">{total - score}</p>
          <p className="text-sm text-gray-600">Incorrect</p>
        </div>
      </div>

      <div className="space-y-3">
        <button onClick={onReview}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          📋 Review Answers
        </button>
        <button onClick={onTryAgain}
          className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
          🔄 Try Again
        </button>
        <button onClick={onHome}
          className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
          🏠 Back to Home
        </button>
      </div>
    </div>
  );
}

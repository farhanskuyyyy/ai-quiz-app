export default function AnswerReview({ answers, onBack }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Review Answers</h2>
      
      {answers.map((answer, index) => (
        <div key={index} className={`bg-white rounded-xl p-4 border-l-4 ${
          answer.isCorrect ? 'border-green-500' : 'border-red-500'
        }`}>
          <div className="flex items-start gap-3">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
              answer.isCorrect ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {answer.isCorrect ? '✓' : '✗'}
            </span>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{answer.question}</p>
              <p className="text-sm text-gray-600 mt-1">
                Your answer: <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                  {answer.options[answer.selected]}
                </span>
              </p>
              {!answer.isCorrect && (
                <p className="text-sm text-green-600">Correct: {answer.options[answer.correct]}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">{answer.explanation}</p>
            </div>
          </div>
        </div>
      ))}

      <button onClick={onBack}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors mt-4">
        ← Back to Results
      </button>
    </div>
  );
}

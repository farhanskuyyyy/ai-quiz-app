import { useState } from 'react';
import QuestionOption from './QuestionOption';

export default function QuizCard({ question, onAnswer, onNext, questionNum, totalQuestions }) {
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelected(index);
    setIsAnswered(true);
    onAnswer(index === question.correctAnswer, index);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">{question.category}</span>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>{question.difficulty}</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">{question.question}</h3>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <QuestionOption key={index} option={option} index={index}
            selected={selected} correct={question.correctAnswer}
            isAnswered={isAnswered} onClick={handleSelect} />
        ))}
      </div>

      {isAnswered && (
        <div className={`mt-4 p-4 rounded-xl ${
          selected === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <p className={`font-medium ${selected === question.correctAnswer ? 'text-green-700' : 'text-red-700'}`}>
            {selected === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
          </p>
          <p className="text-sm text-gray-600 mt-1">{question.explanation}</p>
        </div>
      )}

      {isAnswered && (
        <button onClick={onNext}
          className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          {questionNum < totalQuestions ? 'Next Question →' : 'See Results 🏆'}
        </button>
      )}
    </div>
  );
}

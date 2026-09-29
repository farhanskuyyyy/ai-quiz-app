import { useState } from 'react';
import { questions } from '../data/questions';

export default function QuizSetup({ onStart }) {
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('all');

  const totalQuestions = difficulty === 'all'
    ? questions.length
    : questions.filter(q => q.difficulty === difficulty).length;

  const handleStart = () => {
    onStart({ numQuestions: Math.min(numQuestions, totalQuestions), difficulty });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quiz Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Number of Questions</label>
          <div className="flex gap-2">
            {[5, 10, 20].map(n => (
              <button key={n} onClick={() => setNumQuestions(n)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  numQuestions === n ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {n} Questions
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">Available: {totalQuestions} questions</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Difficulty</label>
          <div className="flex gap-2">
            {[
              { value: 'easy', label: 'Easy', color: 'green' },
              { value: 'medium', label: 'Medium', color: 'yellow' },
              { value: 'hard', label: 'Hard', color: 'red' },
              { value: 'all', label: 'All Levels', color: 'gray' }
            ].map(d => (
              <button key={d.value} onClick={() => setDifficulty(d.value)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  difficulty === d.value ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleStart}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-lg mt-6">
          Start Quiz 🚀
        </button>
      </div>
    </div>
  );
}

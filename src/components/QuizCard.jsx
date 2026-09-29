import { useState } from 'react';

export default function QuizCard({ question, onAnswer, onNext, questionNum, totalQuestions }) {
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelected(index);
    setIsAnswered(true);
    onAnswer(index === question.correctAnswer, index);
  };

  const progress = (questionNum / totalQuestions) * 100;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-[11px] mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
          <span>Soal {questionNum} dari {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'var(--primary)' }} />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-lg p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-md uppercase tracking-wide"
            style={{ background: 'var(--primary)', color: '#fff' }}>
            {question.category}
          </span>
          <span className="px-2 py-0.5 text-[10px] font-medium rounded-md uppercase tracking-wide"
            style={{ 
              background: question.difficulty === 'easy' ? '#D1FAE5' : question.difficulty === 'medium' ? '#FEF3C7' : '#FEE2E2',
              color: question.difficulty === 'easy' ? '#065F46' : question.difficulty === 'medium' ? '#92400E' : '#991B1B'
            }}>
            {question.difficulty}
          </span>
        </div>

        <h3 className="text-base font-medium font-heading" style={{ color: 'var(--text)' }}>{question.question}</h3>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={isAnswered}
            className="w-full p-3 text-left rounded-md transition-all flex items-center gap-3"
            style={{
              background: !isAnswered ? 'var(--bg)' :
                index === question.correctAnswer ? '#D1FAE5' :
                index === selected ? '#FEE2E2' : 'var(--bg)',
              border: `1px solid ${!isAnswered ? 'var(--border)' :
                index === question.correctAnswer ? '#22C55E' :
                index === selected ? '#EF4444' : 'var(--border)'}`,
              color: 'var(--text)',
              cursor: isAnswered ? 'default' : 'pointer',
            }}
          >
            <span className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium flex-shrink-0"
              style={{ 
                background: !isAnswered ? 'var(--surface)' :
                  index === question.correctAnswer ? '#22C55E' :
                  index === selected ? '#EF4444' : 'var(--surface)',
                color: !isAnswered ? 'var(--text-secondary)' : '#fff'
              }}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className="text-sm">{option}</span>
            {isAnswered && index === question.correctAnswer && <span className="ml-auto text-green-600">✓</span>}
            {isAnswered && index === selected && index !== question.correctAnswer && <span className="ml-auto text-red-600">✗</span>}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className="rounded-lg p-3"
          style={{ background: selected === question.correctAnswer ? '#D1FAE5' : '#FEE2E2', border: `1px solid ${selected === question.correctAnswer ? '#22C55E' : '#EF4444'}` }}>
          <p className="text-sm font-medium" style={{ color: selected === question.correctAnswer ? '#065F46' : '#991B1B' }}>
            {selected === question.correctAnswer ? 'Benar!' : 'Salah'}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{question.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <button onClick={onNext}
          className="w-full py-3 rounded-md font-medium text-white active:scale-[0.98]"
          style={{ background: 'var(--primary)' }}>
          {questionNum < totalQuestions ? 'Soal Berikutnya' : 'Lihat Hasil'}
        </button>
      )}
    </div>
  );
}

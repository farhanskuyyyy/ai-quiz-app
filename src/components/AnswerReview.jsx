export default function AnswerReview({ answers, onBack }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold font-heading uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Review Jawaban</h2>
      
      {answers.map((answer, index) => (
        <div key={index} className="rounded-lg p-3 border-l-3"
          style={{ 
            background: 'var(--surface)', 
            borderLeftColor: answer.isCorrect ? '#22C55E' : '#EF4444',
            borderLeftWidth: 3
          }}>
          <div className="flex items-start gap-2">
            <span className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
              style={{ background: answer.isCorrect ? '#22C55E' : '#EF4444' }}>
              {answer.isCorrect ? '✓' : '✗'}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{answer.question}</p>
              <p className="text-[11px] mt-1" style={{ color: 'var(--text-secondary)' }}>
                Jawaban Anda: <span style={{ color: answer.isCorrect ? '#22C55E' : '#EF4444' }}>
                  {answer.options[answer.selected]}
                </span>
              </p>
              {!answer.isCorrect && (
                <p className="text-[11px]" style={{ color: '#22C55E' }}>
                  Jawaban Benar: {answer.options[answer.correctAnswer]}
                </p>
              )}
              <p className="text-[10px] mt-1" style={{ color: 'var(--text-tertiary)' }}>{answer.explanation}</p>
            </div>
          </div>
        </div>
      ))}

      <button onClick={onBack}
        className="w-full py-3 rounded-md font-medium text-white active:scale-[0.98]"
        style={{ background: 'var(--primary)' }}>
        Kembali ke Hasil
      </button>
    </div>
  );
}

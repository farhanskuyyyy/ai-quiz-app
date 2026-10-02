import { useState, useEffect } from 'react';

const QUESTION_TIME = 30;

export default function QuizCard({
  question,
  onAnswer,
  onNext,
  questionNum,
  totalQuestions,
  direction = 'forward',
  streak = 0,
}) {
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);

  useEffect(() => {
    const t = setTimeout(() => setShowSkeleton(false), 180);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isAnswered) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isAnswered]);

  useEffect(() => {
    if (ripples.length === 0) return;
    const t = setTimeout(() => setRipples((prev) => prev.slice(1)), 500);
    return () => clearTimeout(t);
  }, [ripples]);

  const handleSelect = (index, event) => {
    if (isAnswered) return;
    const btn = event.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = event.clientX - rect.left - 20;
    const y = event.clientY - rect.top - 20;
    setRipples((prev) => [...prev, { id: Date.now(), x, y }]);
    setSelected(index);
    setIsAnswered(true);
    onAnswer(index === question.correctAnswer, index);
  };

  const progress = (questionNum / totalQuestions) * 100;
  const timerProgress = (timeLeft / QUESTION_TIME) * 100;
  const isCorrect = selected === question.correctAnswer;
  const isDanger = timeLeft <= 5 && !isAnswered;

  if (showSkeleton) {
    return (
      <div role="status" aria-busy="true" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="skel-block h-4 w-32" />
          <div className="skel-block h-9 w-9 rounded-full" />
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: totalQuestions }, (_, i) => (
            <div key={i} className="skel-block h-2 w-2 rounded-full" />
          ))}
        </div>
        <div className="skel-block h-28" />
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skel-block h-12" />
          ))}
        </div>
        <span className="sr-only">Memuat soal…</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress: step-dots + timer ring */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] mb-1.5 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Soal {questionNum} dari {totalQuestions}
          </div>
          <div className="flex items-center gap-1.5" aria-label={`Soal ${questionNum} dari ${totalQuestions}`}>
            {Array.from({ length: totalQuestions }, (_, i) => (
              <span
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  background: i < questionNum - 1 ? '#22C55E' : i === questionNum - 1 ? 'var(--primary)' : 'var(--border)',
                  width: i === questionNum - 1 ? 24 : i < questionNum - 1 ? 16 : 8,
                  height: i === questionNum - 1 ? 10 : 8,
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {streak > 0 && (
            <span
              key={streak}
              className="flame-pop flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
              style={{
                background: 'color-mix(in srgb, var(--primary) 12%, transparent)',
                color: 'var(--primary)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
              </svg>
              {streak}
            </span>
          )}

          <div className="relative w-9 h-9">
            <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="16" fill="none" stroke="var(--border)" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke={isDanger ? '#EF4444' : 'var(--primary)'}
                strokeWidth="3"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={100 - timerProgress}
                className={isDanger ? 'ring-danger' : ''}
                style={{ transition: 'stroke-dashoffset .5s cubic-bezier(.4,0,.2,1), stroke .3s ease' }}
              />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center text-[10px] font-medium tabular-nums"
              style={{ color: isDanger ? '#EF4444' : 'var(--text-secondary)' }}
            >
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Question card direction-aware entrance */}
      <div
        key={question.id}
        className="q-enter rounded-lg p-4"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          '--dir': direction === 'forward' ? 1 : -1,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-2 py-0.5 text-[10px] font-medium rounded-md uppercase tracking-wide"
            style={{ background: 'var(--primary)', color: '#fff' }}
          >
            {question.category}
          </span>
          <span
            className="px-2 py-0.5 text-[10px] font-medium rounded-md uppercase tracking-wide"
            style={{
              background:
                question.difficulty === 'easy'
                  ? '#D1FAE5'
                  : question.difficulty === 'medium'
                    ? '#FEF3C7'
                    : '#FEE2E2',
              color:
                question.difficulty === 'easy'
                  ? '#065F46'
                  : question.difficulty === 'medium'
                    ? '#92400E'
                    : '#991B1B',
            }}
          >
            {question.difficulty}
          </span>
        </div>
        <h3 className="text-base font-medium font-heading" style={{ color: 'var(--text)' }}>
          {question.question}
        </h3>
      </div>

      {/* Options: stagger + press + ripple + feedback hierarchy */}
      <div className="space-y-2" key={`opts-${question.id}`}>
        {question.options.map((option, index) => {
          const isCorrectOption = isAnswered && index === question.correctAnswer;
          const isWrongSelected = isAnswered && index === selected && index !== question.correctAnswer;
          const isRevealed = isAnswered && index === question.correctAnswer && index !== selected;
          const isDimmed = isAnswered && !isCorrectOption && !isWrongSelected;

          let bg = 'var(--bg)';
          let border = 'var(--border)';
          let letterBg = 'var(--surface)';
          let letterColor = 'var(--text-secondary)';
          let opacity = 1;
          let extraClass = '';

          if (isAnswered) {
            if (isCorrectOption) {
              bg = '#D1FAE5';
              border = '#22C55E';
              letterBg = '#22C55E';
              letterColor = '#fff';
              extraClass = index === selected ? 'opt-correct' : '';
              if (isRevealed) opacity = 0.7;
            } else if (isWrongSelected) {
              bg = '#FEE2E2';
              border = '#EF4444';
              letterBg = '#EF4444';
              letterColor = '#fff';
              extraClass = 'opt-wrong';
            } else if (isDimmed) {
              opacity = 0.4;
            }
          }

          return (
            <button
              key={index}
              onClick={(e) => handleSelect(index, e)}
              disabled={isAnswered}
              className={`opt-btn opt-item relative overflow-hidden w-full p-3 text-left rounded-md flex items-center gap-3 ${extraClass}`}
              style={{
                '--i': index,
                background: bg,
                border: `1px solid ${border}`,
                color: 'var(--text)',
                cursor: isAnswered ? 'default' : 'pointer',
                opacity,
              }}
            >
              {ripples.map((r) => (
                <span key={r.id} className="opt-ripple" style={{ left: r.x, top: r.y }} />
              ))}

              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium flex-shrink-0"
                style={{ background: letterBg, color: letterColor }}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-sm">{option}</span>

              {isCorrectOption && (
                <span className="ml-auto">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path className="check-draw" d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
              )}
              {isWrongSelected && (
                <span className="ml-auto">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div
          role="status"
          aria-live="polite"
          className="rounded-lg p-3"
          style={{
            background: isCorrect ? '#D1FAE5' : '#FEE2E2',
            border: `1px solid ${isCorrect ? '#22C55E' : '#EF4444'}`,
          }}
        >
          <p className="text-sm font-medium" style={{ color: isCorrect ? '#065F46' : '#991B1B' }}>
            {isCorrect ? 'Benar!' : 'Salah'}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <button
          onClick={onNext}
          className="w-full py-3 rounded-md font-medium text-white active:scale-[0.98] transition-transform"
          style={{ background: 'var(--primary)' }}
        >
          {questionNum < totalQuestions ? 'Soal Berikutnya' : 'Lihat Hasil'}
        </button>
      )}
    </div>
  );
}

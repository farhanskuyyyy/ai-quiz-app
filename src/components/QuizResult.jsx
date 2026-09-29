import { getFeedback } from '../utils/quizUtils';

export default function QuizResult({ score, total, answers, onReview, onTryAgain, onHome }) {
  const percentage = Math.round((score / total) * 100);
  const feedback = getFeedback(percentage);

  return (
    <div className="space-y-4">
      {/* Score Card */}
      <div className="rounded-lg p-6 text-center" style={{ background: 'var(--primary)' }}>
        <p className="text-[11px] uppercase tracking-wide text-white/80 mb-2">Skor Anda</p>
        <p className="text-4xl font-bold font-heading text-white">{score}/{total}</p>
        <p className="text-2xl font-bold font-heading text-white mt-1">{percentage}%</p>
        <p className="text-sm font-medium text-white mt-2">{feedback.text}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg p-4 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-2xl font-bold font-heading" style={{ color: '#22C55E' }}>{score}</p>
          <p className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Benar</p>
        </div>
        <div className="rounded-lg p-4 text-center" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-2xl font-bold font-heading" style={{ color: '#EF4444' }}>{total - score}</p>
          <p className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Salah</p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button onClick={onReview}
          className="w-full py-3 rounded-md font-medium text-white active:scale-[0.98]"
          style={{ background: 'var(--primary)' }}>
          Review Jawaban
        </button>
        <button onClick={onTryAgain}
          className="w-full py-3 rounded-md font-medium active:scale-[0.98]"
          style={{ background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
          Coba Lagi
        </button>
        <button onClick={onHome}
          className="w-full py-3 rounded-md font-medium active:scale-[0.98]"
          style={{ background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
          Kembali ke Awal
        </button>
      </div>
    </div>
  );
}

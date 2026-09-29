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
    <div className="space-y-4">
      <div className="rounded-lg p-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <h2 className="text-xs font-semibold font-heading mb-3 uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Pengaturan Kuis</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Jumlah Soal</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[5, 10, 20].map(n => (
                <button key={n} onClick={() => setNumQuestions(n)}
                  className="py-2.5 rounded-md text-sm font-medium transition-colors"
                  style={{ background: numQuestions === n ? 'var(--primary)' : 'var(--bg)', color: numQuestions === n ? '#fff' : 'var(--text-secondary)', border: `1px solid ${numQuestions === n ? 'var(--primary)' : 'var(--border)'}` }}>
                  {n} Soal
                </button>
              ))}
            </div>
            <p className="text-[10px] mt-1.5" style={{ color: 'var(--text-tertiary)' }}>Tersedia: {totalQuestions} soal</p>
          </div>

          <div>
            <label className="text-[11px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Tingkat Kesulitan</label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { value: 'easy', label: 'Mudah' },
                { value: 'medium', label: 'Sedang' },
                { value: 'hard', label: 'Sulit' },
                { value: 'all', label: 'Semua' }
              ].map(d => (
                <button key={d.value} onClick={() => setDifficulty(d.value)}
                  className="py-2.5 rounded-md text-sm font-medium transition-colors"
                  style={{ background: difficulty === d.value ? 'var(--primary)' : 'var(--bg)', color: difficulty === d.value ? '#fff' : 'var(--text-secondary)', border: `1px solid ${difficulty === d.value ? 'var(--primary)' : 'var(--border)'}` }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleStart}
        className="w-full py-3.5 rounded-md font-medium text-white active:scale-[0.98] transition-transform"
        style={{ background: 'var(--primary)' }}>
        Mulai Kuis
      </button>
    </div>
  );
}

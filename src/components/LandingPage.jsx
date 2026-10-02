import { useEffect, useRef, useState } from 'react';
import { questions } from '../data/questions';

const CATEGORY_ICONS = {
  'AI Fundamentals': (
    <g>
      <rect x="14" y="10" width="20" height="16" rx="3" fill="none" strokeWidth="2" />
      <circle cx="20" cy="17" r="1.6" />
      <circle cx="28" cy="17" r="1.6" />
      <path d="M20 22c2 1.6 4 1.6 6 0" fill="none" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 6v4M16 8l2 3M32 8l-2 3" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  'Machine Learning': (
    <g>
      <path d="M12 30c4-12 16-12 20 0" fill="none" strokeWidth="2" />
      <circle cx="14" cy="28" r="2.4" />
      <circle cx="20" cy="18" r="2.4" />
      <circle cx="28" cy="22" r="2.4" />
      <circle cx="34" cy="28" r="2.4" />
      <path d="M14 28l6-10 8 4 6 6" fill="none" strokeWidth="1.5" opacity="0.7" />
    </g>
  ),
  'Deep Learning': (
    <g>
      <circle cx="14" cy="14" r="2.2" />
      <circle cx="14" cy="22" r="2.2" />
      <circle cx="14" cy="30" r="2.2" />
      <circle cx="24" cy="12" r="2.2" />
      <circle cx="24" cy="20" r="2.2" />
      <circle cx="24" cy="28" r="2.2" />
      <circle cx="34" cy="16" r="2.2" />
      <circle cx="34" cy="26" r="2.2" />
      <path d="M16 14l6-2M16 14l6 6M16 22l6-2M16 22l6 6M16 30l6-2M16 30l6-4M26 12l6 4M26 20l6-4M26 20l6 6M26 28l6-2" strokeWidth="1.2" opacity="0.6" fill="none" />
    </g>
  ),
  'NLP': (
    <g>
      <path d="M10 14h16a3 3 0 013 3v6a3 3 0 01-3 3h-8l-4 4v-4h-4a3 3 0 01-3-3v-6a3 3 0 013-3z" fill="none" strokeWidth="2" />
      <path d="M20 28h12a3 3 0 003-3v-5" fill="none" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="20" r="1.3" />
      <circle cx="20" cy="20" r="1.3" />
      <circle cx="24" cy="20" r="1.3" />
    </g>
  ),
  LLM: (
    <g>
      <path d="M24 8l3 6 6 1-4.5 4.5L30 26l-6-3-6 3 1.5-6.5L15 15l6-1z" fill="none" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13 31h22" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 35h14" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </g>
  ),
  'AI Ethics': (
    <g>
      <path d="M24 8l12 5v8c0 7-5 11.5-12 13-7-1.5-12-6-12-13v-8z" fill="none" strokeWidth="2" strokeLinejoin="round" />
      <path d="M19 22l3.5 3.5L29 18" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  'Neural Networks': (
    <g>
      <circle cx="24" cy="10" r="2.6" />
      <circle cx="14" cy="22" r="2.6" />
      <circle cx="24" cy="22" r="2.6" />
      <circle cx="34" cy="22" r="2.6" />
      <circle cx="24" cy="34" r="2.6" />
      <path d="M24 13v6M22 20l-6-2M26 20l6-2M24 25v6" strokeWidth="1.4" opacity="0.65" fill="none" />
    </g>
  ),
  'Computer Vision': (
    <g>
      <path d="M8 24s6-10 16-10 16 10 16 10-6 10-16 10S8 24 8 24z" fill="none" strokeWidth="2" />
      <circle cx="24" cy="24" r="4.5" fill="none" strokeWidth="2" />
      <circle cx="24" cy="24" r="1.6" />
    </g>
  ),
  'Reinforcement Learning': (
    <g>
      <path d="M12 32V16M12 32h20" fill="none" strokeWidth="2" strokeLinecap="round" />
      <rect x="16" y="22" width="4" height="10" rx="1" />
      <rect x="23" y="16" width="4" height="16" rx="1" />
      <rect x="30" y="12" width="4" height="20" rx="1" />
      <path d="M14 12l4-4 4 3 6-6" fill="none" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
    </g>
  ),
  'Prompt Engineering': (
    <g>
      <rect x="9" y="12" width="30" height="20" rx="3" fill="none" strokeWidth="2" />
      <path d="M14 19l4 3-4 3" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 25h9" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
};

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const TYPED_WORDS = ['Artificial Intelligence', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'LLMs'];

function Typewriter() {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = TYPED_WORDS[wordIdx];
    let delay = deleting ? 35 : 75;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === '') delay = 300;

    const timer = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') { setDeleting(false); setWordIdx(i => (i + 1) % TYPED_WORDS.length); }
      else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [text, deleting, wordIdx]);

  return (
    <span className="type-target">
      {text}
      <span className="type-caret" aria-hidden="true">|</span>
    </span>
  );
}

function categoryStats() {
  const map = new Map();
  for (const q of questions) {
    if (!map.has(q.category)) map.set(q.category, { count: 0, difficulties: new Set() });
    const entry = map.get(q.category);
    entry.count += 1;
    entry.difficulties.add(q.difficulty);
  }
  return [...map.entries()]
    .map(([name, v]) => ({ name, count: v.count, levels: [...v.difficulties] }))
    .sort((a, b) => b.count - a.count);
}

const LEVEL_LABEL = { easy: 'Mudah', medium: 'Sedang', hard: 'Sulit' };

function FloatingOrbs() {
  return (
    <div className="orbs" aria-hidden="true">
      <span className="orb orb-1" />
      <span className="orb orb-2" />
      <span className="orb orb-3" />
      <span className="orb orb-4" />
    </div>
  );
}

export default function LandingPage({ onStart }) {
  const cats = useRef(categoryStats()).current;
  const totalQuestions = questions.length;
  const easy = useCountUp(questions.filter(q => q.difficulty === 'easy').length);
  const medium = useCountUp(questions.filter(q => q.difficulty === 'medium').length);
  const hard = useCountUp(questions.filter(q => q.difficulty === 'hard').length);
  const catCount = useCountUp(cats.length, 1000);
  const revealRefs = useRef([]);

  useEffect(() => {
    const els = revealRefs.current.filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <FloatingOrbs />
        <div className="hero-inner">
          <div className="hero-badge reveal">30 Soal · 10 Kategori · 3 Level</div>
          <h1 className="hero-title reveal">
            Seberapa pintar kamu soal <span className="accent">AI</span>?
          </h1>
          <p className="hero-sub reveal">
            Kuasai <Typewriter /> lewat kuis singkat yang dirancang untuk menguji — dan menaikkan — pemahamanmu.
          </p>
          <div className="hero-cta reveal">
            <button className="btn-primary-lg" onClick={onStart}>
              Mulai Kuis Sekarang
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a href="#kategori" className="btn-ghost-lg">Lihat Kategori</a>
          </div>

          <div className="hero-visual reveal" aria-hidden="true">
            <svg className="brain-graphic" viewBox="0 0 240 140">
              <g className="bg-lines" stroke="currentColor" strokeWidth="1" opacity="0.25">
                <path d="M20 110 L60 70 L100 88 L140 40 L180 60 L220 24" fill="none" />
                <path d="M20 88 L60 96 L100 52 L140 74 L180 30 L220 48" fill="none" opacity="0.5" />
              </g>
              <g className="pulse-nodes">
                <circle cx="20" cy="110" r="4" /><circle cx="60" cy="70" r="5" />
                <circle cx="100" cy="88" r="4" /><circle cx="140" cy="40" r="6" />
                <circle cx="180" cy="60" r="4.5" /><circle cx="220" cy="24" r="4" />
                <circle cx="20" cy="88" r="3.5" /><circle cx="60" cy="96" r="4" />
                <circle cx="100" cy="52" r="4.5" /><circle cx="140" cy="74" r="3.5" />
                <circle cx="180" cy="30" r="5" /><circle cx="220" cy="48" r="3.5" />
              </g>
            </svg>
          </div>
        </div>
        <div className="hero-fade" aria-hidden="true" />
      </section>

      {/* Stats */}
      <section className="stats reveal">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-num">{totalQuestions}</div>
            <div className="stat-label">Soal AI</div>
            <div className="stat-bar"><span style={{ width: '100%' }} /></div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{catCount}</div>
            <div className="stat-label">Kategori</div>
            <div className="stat-bar"><span style={{ width: `${(catCount / 10) * 100}%` }} /></div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{easy}/{medium}/{hard}</div>
            <div className="stat-label">Mudah / Sedang / Sulit</div>
            <div className="stat-bar triple">
              <span className="b-easy" style={{ flex: easy }} />
              <span className="b-med" style={{ flex: medium }} />
              <span className="b-hard" style={{ flex: hard }} />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="kategori" className="categories">
        <div className="section-head reveal">
          <h2>10 Kategori, Satu Misi</h2>
          <p>Setiap kategori punya soal dengan tingkat kesulitan bertahap — dari dasar sampai konsep lanjutan.</p>
        </div>
        <div className="cat-grid">
          {cats.map((c, i) => (
            <div
              key={c.name}
              className="cat-card reveal"
              ref={el => (revealRefs.current[i] = el)}
              style={{ transitionDelay: `${(i % 5) * 70}ms` }}
            >
              <div className="cat-icon">
                <svg viewBox="0 0 48 48" fill="currentColor">
                  {CATEGORY_ICONS[c.name] || CATEGORY_ICONS['AI Fundamentals']}
                </svg>
              </div>
              <h3>{c.name}</h3>
              <p className="cat-count">{c.count} soal</p>
              <div className="cat-levels">
                {c.levels.map(l => (
                  <span key={l} className={`pill pill-${l}`}>{LEVEL_LABEL[l]}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how reveal">
        <div className="section-head">
          <h2>Cara Kerjanya</h2>
        </div>
        <div className="how-grid">
          <div className="how-step">
            <div className="how-num">01</div>
            <h3>Pilih Pengaturan</h3>
            <p>Tentukan jumlah soal dan tingkat kesulitan sesuai targetmu.</p>
          </div>
          <div className="how-step">
            <div className="how-num">02</div>
            <h3>Jawab & Belajar</h3>
            <p>Setiap jawaban langsung dijelaskan alasannya — bukan sekadar benar/salah.</p>
          </div>
          <div className="how-step">
            <div className="how-num">03</div>
            <h3>Lihat Hasilmu</h3>
            <p>Dapat skor akhir plus review lengkap semua jawabanmu.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta reveal">
        <div className="final-inner">
          <h2>Siap menguji pengetahuan AI-mu?</h2>
          <p>Gratis, tanpa login, langsung mulai.</p>
          <button className="btn-primary-lg" onClick={onStart}>
            Mulai Kuis
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      <footer className="landing-footer">
        <span>AI Quiz · ai-quiz.kreasifarhan.id</span>
      </footer>
    </div>
  );
}

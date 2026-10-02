import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import QuizSetup from './components/QuizSetup';
import QuizCard from './components/QuizCard';
import QuizResult from './components/QuizResult';
import AnswerReview from './components/AnswerReview';
import { questions } from './data/questions';
import { getQuestions, shuffleOptions } from './utils/quizUtils';

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [theme, setTheme] = useState('light');
  const [direction, setDirection] = useState('forward');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('quiz-theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('quiz-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const startQuiz = ({ numQuestions, difficulty }) => {
    const selected = getQuestions(questions, numQuestions, difficulty);
    const shuffled = selected.map(q => shuffleOptions(q));
    setQuizQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setShowReview(false);
    setDirection('forward');
    setStreak(0);
    setScreen('quiz');
  };

  const handleAnswer = (isCorrect, selectedIndex) => {
    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    setAnswers([...answers, {
      ...quizQuestions[currentIndex],
      selected: selectedIndex,
      isCorrect
    }]);
  };

  const handleNext = () => {
    setDirection('forward');
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setScreen('result');
    }
  };

  const handleTryAgain = () => {
    const shuffled = quizQuestions.map(q => shuffleOptions(q));
    setQuizQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setShowReview(false);
    setDirection('forward');
    setStreak(0);
    setScreen('quiz');
  };

  const startFromLanding = () => setScreen('setup');

  return (
    <div className="min-h-screen min-h-dvh flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Header */}
      <header className={screen === 'landing' ? '' : 'sticky top-0 z-20 border-b'} style={screen === 'landing' ? undefined : { background: 'var(--bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold font-heading" style={{ color: 'var(--primary)' }}>AI Quiz</h1>
            <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Test your AI knowledge</p>
          </div>
          <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-md text-sm"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className={screen === 'landing' ? 'flex-1' : 'flex-1 max-w-lg mx-auto w-full px-4 py-4'} style={screen === 'landing' ? undefined : { paddingBottom: '24px' }}>
        {screen === 'landing' && <LandingPage onStart={startFromLanding} />}
        {screen === 'setup' && <QuizSetup onStart={startQuiz} />}
        {screen === 'quiz' && (
          <QuizCard
            key={currentIndex}
            question={quizQuestions[currentIndex]}
            questionNum={currentIndex + 1}
            totalQuestions={quizQuestions.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
            direction={direction}
            streak={streak}
          />
        )}
        {screen === 'result' && !showReview && (
          <QuizResult
            score={score}
            total={quizQuestions.length}
            onReview={() => setShowReview(true)}
            onTryAgain={handleTryAgain}
            onHome={() => setScreen('setup')}
          />
        )}
        {screen === 'result' && showReview && (
          <AnswerReview
            answers={answers}
            onBack={() => setShowReview(false)}
          />
        )}
      </main>
    </div>
  );
}

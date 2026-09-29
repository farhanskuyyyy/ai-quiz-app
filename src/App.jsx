import { useState } from 'react';
import Header from './components/Header';
import QuizSetup from './components/QuizSetup';
import QuizCard from './components/QuizCard';
import QuizResult from './components/QuizResult';
import AnswerReview from './components/AnswerReview';
import ProgressBar from './components/ProgressBar';
import { questions } from './data/questions';
import { getQuestions, shuffleOptions } from './utils/quizUtils';

function App() {
  const [screen, setScreen] = useState('setup');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const startQuiz = ({ numQuestions, difficulty }) => {
    const selected = getQuestions(questions, numQuestions, difficulty);
    const shuffled = selected.map(q => shuffleOptions(q));
    setQuizQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setShowReview(false);
    setScreen('quiz');
  };

  const handleAnswer = (isCorrect, selectedIndex) => {
    if (isCorrect) setScore(s => s + 1);
    setAnswers([...answers, {
      ...quizQuestions[currentIndex],
      selected: selectedIndex,
      isCorrect
    }]);
  };

  const handleNext = () => {
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
    setScreen('quiz');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-6">
        {screen === 'setup' && <QuizSetup onStart={startQuiz} />}
        {screen === 'quiz' && (
          <>
            <ProgressBar current={currentIndex + 1} total={quizQuestions.length} />
            <QuizCard
              key={currentIndex}
              question={quizQuestions[currentIndex]}
              questionNum={currentIndex + 1}
              totalQuestions={quizQuestions.length}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          </>
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

export default App;

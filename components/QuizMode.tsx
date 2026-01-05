
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle, XCircle, Timer, RotateCcw } from 'lucide-react';

interface Props {
  table: number;
  onFinish: (score: number) => void;
}

interface Question {
  a: number;
  b: number;
  answer: number;
  options: number[];
}

const QuizMode: React.FC<Props> = ({ table, onFinish }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);

  const generateQuestions = useCallback(() => {
    const qList: Question[] = [];
    const multipliers = Array.from({ length: 10 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    
    multipliers.forEach(m => {
      const ans = table * m;
      const opts = new Set<number>([ans]);
      while (opts.size < 4) {
        const fake = table * (Math.floor(Math.random() * 10) + 1) + (Math.random() > 0.5 ? 1 : -1);
        if (fake > 0) opts.add(fake);
      }
      qList.push({
        a: table,
        b: m,
        answer: ans,
        options: Array.from(opts).sort(() => Math.random() - 0.5)
      });
    });
    setQuestions(qList);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(30);
    setGameStarted(true);
  }, [table]);

  useEffect(() => {
    let timer: number;
    if (gameStarted && !showResult && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
    }
    return () => clearInterval(timer);
  }, [gameStarted, showResult, timeLeft]);

  const handleAnswer = (choice: number) => {
    if (feedback || showResult) return;

    if (choice === questions[currentIndex].answer) {
      setScore(prev => prev + 10);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setShowResult(true);
        onFinish((score + (choice === questions[currentIndex].answer ? 10 : 0)));
      }
    }, 1000);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="w-32 h-32 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-16 h-16 text-yellow-500 animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold">آماده‌ای برای چالش ضرب عدد {table}؟</h2>
        <p className="text-gray-400 max-w-md">۱۰ سوال داری و ۳۰ ثانیه وقت! ببینیم چند تا ستاره میتونی بگیری.</p>
        <button 
          onClick={generateQuestions}
          className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-bold text-xl shadow-xl hover:scale-105 transition-transform"
        >
          شروع مسابقه!
        </button>
      </div>
    );
  }

  if (showResult) {
    const starCount = Math.floor(score / 30);
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <h2 className="text-3xl font-bold">پایان مسابقه!</h2>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: i <= starCount ? 1.2 : 1 }}
              className={i <= starCount ? "text-yellow-400" : "text-gray-700"}
            >
              <Trophy className="w-12 h-12 fill-current" />
            </motion.div>
          ))}
        </div>
        <div className="text-6xl font-black text-blue-400">{score}</div>
        <p className="text-xl">امتیاز نهایی شما</p>
        <button 
          onClick={generateQuestions}
          className="flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          دوباره امتحان کن
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="h-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-xl font-bold bg-white/5 px-4 py-2 rounded-xl">
          <Timer className={`w-6 h-6 ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`} />
          <span className={timeLeft < 10 ? 'text-red-500' : ''}>{timeLeft} ثانیه</span>
        </div>
        <div className="text-gray-400 text-lg">سوال {currentIndex + 1} از ۱۰</div>
        <div className="text-xl font-bold text-yellow-500">امتیاز: {score}</div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-7xl md:text-9xl font-black mb-12 text-white"
        >
          {currentQ.a} × {currentQ.b} = ؟
        </motion.div>

        <div className="grid grid-cols-2 gap-4 w-full">
          {currentQ.options.map((opt, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(opt)}
              disabled={!!feedback}
              className={`py-6 rounded-2xl text-3xl font-bold transition-all ${
                feedback === 'correct' && opt === currentQ.answer 
                ? 'bg-green-600 shadow-lg shadow-green-500/50'
                : feedback === 'wrong' && opt !== currentQ.answer
                ? 'bg-red-600 opacity-50'
                : feedback === 'wrong' && opt === currentQ.answer
                ? 'bg-green-600 shadow-lg'
                : 'glass hover:bg-white/20 border-white/10'
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className={`fixed bottom-20 flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-2xl shadow-2xl z-50 ${
              feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {feedback === 'correct' ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            {feedback === 'correct' ? 'آفرین! درسته' : 'اشکال نداره، دوباره سعی کن'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizMode;

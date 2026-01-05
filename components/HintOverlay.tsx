
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X, Info } from 'lucide-react';

interface Props {
  title: string;
  message: string;
  modeKey: string;
}

const HintOverlay: React.FC<Props> = ({ title, message, modeKey }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem(`hint_seen_${modeKey}`);
    if (!hasSeen) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [modeKey]);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem(`hint_seen_${modeKey}`, 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50, x: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-32 right-8 z-50 max-w-sm w-full"
        >
          <div className="bg-indigo-600 rounded-3xl p-6 shadow-2xl border-2 border-indigo-400/50 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/30" />
            
            <button 
              onClick={dismiss}
              className="absolute top-3 left-3 text-indigo-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-4 items-start">
              <div className="bg-white/20 p-2 rounded-xl">
                <Lightbulb className="w-6 h-6 text-yellow-300" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-1">{title}</h4>
                <p className="text-sm text-indigo-100 leading-relaxed">
                  {message}
                </p>
              </div>
            </div>

            <button 
              onClick={dismiss}
              className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all"
            >
              فهمیدم!
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HintOverlay;

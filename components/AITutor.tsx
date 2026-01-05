
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, Send, User } from 'lucide-react';
import { getAITeacherAdvice } from '../geminiService';

interface Props {
  table: number;
}

const AITutor: React.FC<Props> = ({ table }) => {
  const [multiplier, setMultiplier] = useState(3);
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const askTeacher = async () => {
    setLoading(true);
    setExplanation('');
    const advice = await getAITeacherAdvice(table, multiplier);
    setExplanation(advice || '');
    setLoading(false);
  };

  useEffect(() => {
    askTeacher();
  }, [table, multiplier]);

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">معلم هوشمند کهکشانی</h2>
        <p className="text-gray-400">هر سوالی داری بپرس تا با مثال‌های قشنگ برات توضیح بدم</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 items-stretch">
        {/* Tutor Personality */}
        <div className="md:w-1/3 glass rounded-3xl p-6 flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
               <BrainCircuit className="w-16 h-16 text-white" />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2 text-yellow-400"
            >
               <Sparkles className="w-8 h-8" />
            </motion.div>
          </div>
          <h3 className="text-xl font-bold mb-2">من "روبو-متمتیک" هستم!</h3>
          <p className="text-sm text-gray-400">من عاشق اعدادم و می‌تونم هر ضربی رو به زبان ساده برات توضیح بدم.</p>
        </div>

        {/* Interaction Area */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col gap-4">
             <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg"><User className="w-5 h-5" /></div>
                <span className="font-bold">بپرس: چرا {table} ضربدر {multiplier} میشه {table * multiplier}؟</span>
             </div>
             <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={multiplier} 
                  onChange={(e) => setMultiplier(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-2xl font-bold w-8">{multiplier}</span>
             </div>
          </div>

          <div className="flex-1 glass rounded-3xl p-8 relative min-h-[200px] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="flex gap-2">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-3 h-3 bg-blue-400 rounded-full" />
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-3 h-3 bg-blue-500 rounded-full" />
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-3 h-3 bg-blue-600 rounded-full" />
                </div>
                <p className="text-gray-400">روبو در حال فکر کردن...</p>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl md:text-2xl leading-relaxed text-blue-100"
              >
                {explanation}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;

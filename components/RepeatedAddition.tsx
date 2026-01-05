
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Plus } from 'lucide-react';

interface Props {
  table: number;
}

const RepeatedAddition: React.FC<Props> = ({ table }) => {
  const [multiplier, setMultiplier] = useState(3);

  return (
    <div className="flex flex-col h-full items-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">روش جمع تکراری</h2>
        <p className="text-gray-400">ضرب یعنی یک عدد رو چند بار با خودش جمع کنی!</p>
      </div>

      <div className="flex-1 w-full flex flex-col justify-center items-center gap-12">
        <div className="flex flex-wrap justify-center items-center gap-4 p-6 glass rounded-3xl max-w-4xl">
          <AnimatePresence mode="popLayout">
            {Array.from({ length: multiplier }).map((_, i) => (
              <React.Fragment key={i}>
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 20 }}
                  className="bg-blue-500/20 border-2 border-blue-400/30 p-4 rounded-2xl flex flex-col items-center gap-2"
                >
                  <div className="grid grid-cols-2 gap-1">
                    {Array.from({ length: table }).map((_, idx) => (
                      <Apple key={idx} className="w-5 h-5 text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]" />
                    ))}
                  </div>
                  <span className="font-black text-xl text-blue-300">{table}</span>
                </motion.div>
                {i < multiplier - 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500">
                    <Plus className="w-6 h-6" />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </AnimatePresence>
          <motion.div 
            layout
            className="text-4xl font-black text-green-400 ml-4 flex items-center gap-2"
          >
            <span className="text-white text-2xl">=</span>
            {table * multiplier}
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-6 w-full max-w-md">
           <div className="text-3xl font-bold text-center">
             <span className="text-blue-400">{table}</span>
             <span className="mx-2 text-white text-xl">×</span>
             <span className="text-purple-400">{multiplier}</span>
             <span className="mx-2 text-white text-xl">=</span>
             <span className="text-green-400 font-black">{table * multiplier}</span>
           </div>
           
           <div className="w-full space-y-4">
              <label className="text-sm text-gray-400 block text-center">چند دسته سیب داشته باشیم؟</label>
              <input 
                type="range" min="1" max="10" value={multiplier} 
                onChange={(e) => setMultiplier(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500">
                 <span>۱ دسته</span>
                 <span>۱۰ دسته</span>
              </div>
           </div>

           <div className="p-4 bg-indigo-900/20 rounded-2xl border border-indigo-500/20 text-center">
             <p className="text-indigo-200">
                در واقع داری <span className="font-bold text-white">{multiplier}</span> بار عدد <span className="font-bold text-white">{table}</span> رو با هم جمع می‌کنی.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RepeatedAddition;

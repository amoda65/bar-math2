
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  table: number;
}

const FingerMethod: React.FC<Props> = ({ table }) => {
  const [multiplier, setMultiplier] = useState(4);
  const isNine = table === 9;

  return (
    <div className="flex flex-col h-full items-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">روش انگشتی {isNine ? "(جادوی عدد ۹)" : ""}</h2>
        <p className="text-gray-400">
          {isNine 
            ? "ببین چطور با انگشتات میتونی ضرب ۹ رو سریع جواب بدی!" 
            : "ضرب رو با انگشتات حس کن!"}
        </p>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center gap-12">
        <div className="flex gap-4 md:gap-16 relative p-8 glass rounded-[3rem] border-2 border-orange-500/20">
          <div className="flex gap-1 md:gap-3">
             {[1, 2, 3, 4, 5].map(i => (
               <div key={`finger-left-${i}`} className="flex flex-col items-center gap-2">
                 <motion.div
                    animate={{ 
                      height: multiplier === i ? '40px' : '100px',
                      backgroundColor: multiplier === i ? '#475569' : (isNine ? (i < multiplier ? '#3b82f6' : '#f97316') : '#f59e0b'),
                      opacity: multiplier === i ? 0.5 : 1
                    }}
                    className="w-6 md:w-10 rounded-full shadow-lg border border-white/10"
                 />
                 <span className="text-[10px] text-gray-500">{i}</span>
               </div>
             ))}
          </div>
          <div className="flex gap-1 md:gap-3">
             {[6, 7, 8, 9, 10].map(i => (
               <div key={`finger-right-${i}`} className="flex flex-col items-center gap-2">
                 <motion.div
                    animate={{ 
                      height: multiplier === i ? '40px' : '100px',
                      backgroundColor: multiplier === i ? '#475569' : (isNine ? (i < multiplier ? '#3b82f6' : '#f97316') : '#f59e0b'),
                      opacity: multiplier === i ? 0.5 : 1
                    }}
                    className="w-6 md:w-10 rounded-full shadow-lg border border-white/10"
                 />
                 <span className="text-[10px] text-gray-500">{i}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="max-w-xl w-full text-center">
           <div className="text-4xl font-black mb-4">
              {table} × {multiplier} = <span className="text-green-400">{table * multiplier}</span>
           </div>
           <input 
              type="range" min="1" max="10" value={multiplier} 
              onChange={(e) => setMultiplier(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
           />
        </div>
      </div>
    </div>
  );
};

export default FingerMethod;

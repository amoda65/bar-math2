
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hand } from 'lucide-react';

interface Props {
  table: number;
}

const FingerMethod: React.FC<Props> = ({ table }) => {
  const [multiplier, setMultiplier] = useState(4);

  // The finger trick is specifically for 9, but we can explain it or show a general interactive
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
        <div className="flex gap-16 relative p-12 glass rounded-[3rem] border-2 border-orange-500/20">
          {/* Left Hand */}
          <div className="flex gap-2">
             {[1, 2, 3, 4, 5].map(i => (
               <Finger key={i} index={i} active={multiplier === i} isNine={isNine} />
             ))}
          </div>
          {/* Right Hand */}
          <div className="flex gap-2">
             {[6, 7, 8, 9, 10].map(i => (
               <Finger key={i} index={i} active={multiplier === i} isNine={isNine} />
             ))}
          </div>

          {isNine && (
            <div className="absolute -bottom-16 left-0 w-full text-center">
              <div className="flex justify-center gap-20 text-2xl font-black">
                 <div className="text-blue-400 flex flex-col">
                    <span>{multiplier - 1}</span>
                    <span className="text-xs text-gray-500 font-normal">دهگان</span>
                 </div>
                 <div className="text-orange-400 flex flex-col">
                    <span>{10 - multiplier}</span>
                    <span className="text-xs text-gray-500 font-normal">یکان</span>
                 </div>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-xl w-full flex flex-col gap-6">
           <div className="text-center">
              <div className="text-4xl font-black mb-2">
                 {table} × {multiplier} = <span className="text-green-400">{table * multiplier}</span>
              </div>
              {isNine && (
                <p className="text-blue-200 bg-blue-900/30 p-4 rounded-2xl border border-blue-500/20">
                  <span className="font-bold">راز انگشتی ۹:</span> انگشت شماره <span className="text-orange-400 font-bold">{multiplier}</span> رو بخوابون. 
                  تعداد انگشت‌های سمت چپ میشه <span className="text-white font-bold">دهگان</span> و سمت راست میشه <span className="text-white font-bold">یکان</span>!
                </p>
              )}
              {!isNine && (
                <p className="text-gray-400">
                  برای ضرب‌های دیگه هم میتونی از انگشتات استفاده کنی، مثلا برای عدد ۵!
                </p>
              )}
           </div>

           <div className="space-y-4">
              <label className="text-sm text-gray-400 block text-center">کدوم انگشت رو بخوابونیم؟ (عدد {multiplier})</label>
              <input 
                type="range" min="1" max="10" value={multiplier} 
                onChange={(e) => setMultiplier(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
           </div>
        </div>
      </div>
    </div>
  );
};

// Fixed: Defining FingerProps and using React.FC to resolve JSX 'key' prop assignment errors
interface FingerProps {
  index: number;
  active: boolean;
  isNine: boolean;
}

const Finger: React.FC<FingerProps> = ({ index, active, isNine }) => (
  <motion.div
    animate={{ 
      height: active ? '40px' : '100px',
      backgroundColor: active ? '#475569' : (isNine ? (index < (active ? index : (index <= 10 ? 11 : 0)) ? '#3b82f6' : '#f97316') : '#f59e0b'),
      opacity: active ? 0.5 : 1
    }}
    className="w-8 rounded-full shadow-lg relative flex items-end justify-center pb-2 border border-white/10"
  >
     <span className="text-xs font-bold text-white/50">{index}</span>
  </motion.div>
);

export default FingerMethod;

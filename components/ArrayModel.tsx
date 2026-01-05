
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Props {
  table: number;
}

const ArrayModel: React.FC<Props> = ({ table }) => {
  const [multiplier, setMultiplier] = useState(4);

  return (
    <div className="flex flex-col h-full items-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">مدل شکلی (آرایه)</h2>
        <p className="text-gray-400">ببین چطور ستاره‌ها در ردیف و ستون مرتب میشن</p>
      </div>

      <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="relative p-8 glass rounded-[2rem] border-2 border-purple-500/20 shadow-2xl">
          <motion.div 
            layout
            className="grid gap-2" 
            style={{ 
              gridTemplateColumns: `repeat(${multiplier}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: table * multiplier }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3, delay: (i % multiplier) * 0.05 + Math.floor(i / multiplier) * 0.05 }}
                className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center"
              >
                 <Star className="w-full h-full text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Labels */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
             <div className="h-20 w-1 bg-purple-500/50 rounded-full" />
             <span className="text-purple-400 font-black text-xl">{table} ردیف</span>
             <div className="h-20 w-1 bg-purple-500/50 rounded-full" />
          </div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
             <div className="w-20 h-1 bg-orange-500/50 rounded-full" />
             <span className="text-orange-400 font-black text-xl whitespace-nowrap">{multiplier} ستون</span>
             <div className="w-20 h-1 bg-orange-500/50 rounded-full" />
          </div>
        </div>

        <div className="flex flex-col gap-8 max-w-sm w-full">
           <div className="bg-white/5 p-6 rounded-3xl border border-white/10 text-center">
              <div className="text-5xl font-black text-white mb-2">
                 {table} × {multiplier} = <span className="text-green-400">{table * multiplier}</span>
              </div>
              <p className="text-gray-400">تعداد کل ستاره‌ها</p>
           </div>

           <div className="space-y-4">
              <label className="text-sm text-gray-400">تغییر تعداد ستون‌ها:</label>
              <input 
                type="range" min="1" max="10" value={multiplier} 
                onChange={(e) => setMultiplier(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs font-mono">
                 <span className="text-purple-400">۱ ستون</span>
                 <span className="text-purple-400">۱۰ ستون</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayModel;

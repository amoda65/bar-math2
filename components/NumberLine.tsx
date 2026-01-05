
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  table: number;
}

const NumberLine: React.FC<Props> = ({ table }) => {
  const [multiplier, setMultiplier] = useState(3);
  const maxVal = table * 10;
  const jumps = Array.from({ length: multiplier }, (_, i) => i + 1);

  return (
    <div className="flex flex-col h-full items-center">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">پرش روی محور اعداد (شمارش چندتا چندتا)</h2>
        <p className="text-gray-400">ببین چطور با هر پرش به جواب بعدی می‌رسی!</p>
      </div>

      <div className="flex-1 w-full flex flex-col justify-center gap-16 px-4">
        {/* The Number Line SVG */}
        <div className="relative w-full h-40 bg-white/5 rounded-3xl p-8 border border-white/10 overflow-x-auto">
          <div className="min-w-[800px] h-full relative">
            {/* Main Axis Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-600 transform -translate-y-1/2" />
            
            {/* Ticks and Labels */}
            {Array.from({ length: maxVal + 1 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute top-1/2 flex flex-col items-center" 
                style={{ left: `${(i / maxVal) * 100}%` }}
              >
                <div className={`w-0.5 ${i % table === 0 ? 'h-6 bg-blue-400' : 'h-3 bg-gray-700'}`} />
                {i % table === 0 && (
                  <span className={`mt-2 text-xs font-bold ${i === table * multiplier ? 'text-yellow-400 scale-125' : 'text-gray-400'}`}>
                    {i}
                  </span>
                )}
              </div>
            ))}

            {/* Jumps (Arcs) */}
            {jumps.map((j) => (
              <motion.path
                key={j}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: j * 0.3 }}
                d={`M ${((j-1)*table / maxVal) * 800} 80 Q ${( ((j-1)*table + table/2) / maxVal) * 800} 20 ${(j*table / maxVal) * 800} 80`}
                fill="none"
                stroke={j === multiplier ? "#facc15" : "#60a5fa"}
                strokeWidth="3"
                strokeLinecap="round"
                className="absolute top-0 left-0"
                style={{ overflow: 'visible' }}
                component="svg"
              >
                <svg className="absolute inset-0 w-full h-full overflow-visible">
                   <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: j * 0.3 }}
                    d={`M ${((j-1)*table / maxVal) * 100}% 50% Q ${( ((j-1)*table + table/2) / maxVal) * 100}% 10% ${(j*table / maxVal) * 100}% 50%`}
                    fill="none"
                    stroke={j === multiplier ? "#facc15" : "#60a5fa"}
                    strokeWidth="4"
                  />
                  <motion.circle 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: j * 0.3 + 0.4 }}
                    cx={`${(j*table / maxVal) * 100}%`} cy="50%" r="6" fill="#facc15" 
                  />
                </svg>
              </motion.path>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 glass rounded-2xl">
           <div className="text-right">
              <div className="text-4xl font-black text-blue-400 mb-2">
                 {multiplier} پرشِ {table} تایی
              </div>
              <p className="text-lg text-gray-300">
                وقتی <span className="text-yellow-400 font-bold">{multiplier}</span> بار به اندازه <span className="text-blue-400 font-bold">{table}</span> تا جلو می‌پری، 
                به عدد <span className="text-green-400 font-bold">{table * multiplier}</span> می‌رسی!
              </p>
           </div>
           
           <div className="w-full md:w-64 space-y-4">
              <label className="text-sm text-gray-400">تعداد پرش‌ها:</label>
              <input 
                type="range" min="1" max="10" value={multiplier} 
                onChange={(e) => setMultiplier(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
              />
              <div className="flex justify-between font-mono text-xl">
                 <span className="text-blue-400">{table} × {multiplier}</span>
                 <span className="text-white">=</span>
                 <span className="text-green-400 font-bold">{table * multiplier}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NumberLine;

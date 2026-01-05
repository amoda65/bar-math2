
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  table: number;
}

const Visualizer: React.FC<Props> = ({ table }) => {
  const [multiplier, setMultiplier] = useState(1);

  return (
    <div className="flex flex-col h-full items-center">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">آموزش بصری (مدل آرایه‌ای)</h2>
        <p className="text-gray-400">ببین چطور عددها با هم یه شکل می‌سازن</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 w-full">
        {/* Dot Grid */}
        <div className="relative p-8 glass rounded-3xl">
          <div 
            className="grid gap-2" 
            style={{ 
              gridTemplateColumns: `repeat(${multiplier}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${table}, minmax(0, 1fr))`
            }}
          >
            {Array.from({ length: table * multiplier }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-sm shadow-blue-400/50"
              />
            ))}
          </div>
          <div className="absolute -top-4 -left-4 bg-purple-600 px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
             {table} سطر
          </div>
          <div className="absolute -bottom-4 -right-4 bg-orange-500 px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
             {multiplier} ستون
          </div>
        </div>

        {/* Info & Controls */}
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="text-center md:text-right">
            <div className="text-5xl font-black mb-2 flex items-center justify-center md:justify-end gap-3">
              <span className="text-purple-400">{table}</span>
              <span className="text-white text-3xl">×</span>
              <span className="text-orange-400">{multiplier}</span>
              <span className="text-white text-3xl">=</span>
              <span className="text-green-400">{table * multiplier}</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              ما اینجا <span className="text-purple-400 font-bold">{table}</span> دسته داریم که در هر کدوم 
              <span className="text-orange-400 font-bold"> {multiplier} </span> دونه وجود داره.
            </p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm text-gray-400">تغییر مقدار ستون‌ها:</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={multiplier} 
              onChange={(e) => setMultiplier(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs font-mono text-gray-500">
              <span>۱</span>
              <span>۱۰</span>
            </div>
          </div>
          
          <div className="p-4 bg-blue-900/30 border border-blue-500/30 rounded-xl">
             <h4 className="font-bold text-blue-400 mb-2">روش جمع تکراری:</h4>
             <div className="flex flex-wrap gap-1 justify-center font-mono">
                {Array.from({ length: multiplier }).map((_, i) => (
                  <React.Fragment key={i}>
                    <span className="text-blue-200">{table}</span>
                    {i < multiplier - 1 && <span className="text-gray-500">+</span>}
                  </React.Fragment>
                ))}
                <span className="text-gray-500">=</span>
                <span className="text-green-400 font-bold">{table * multiplier}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;

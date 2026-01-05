
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  selectedTable: number;
  onSelectTable: (n: number) => void;
}

const MultiplicationGrid: React.FC<Props> = ({ selectedTable, onSelectTable }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2">جدول ضرب عدد {selectedTable}</h2>
        <p className="text-gray-400">روی هر عدد کلیک کن تا جادوی ضرب رو ببینی!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 flex-1">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`relative group cursor-pointer p-6 rounded-2xl flex flex-col items-center justify-center border-2 transition-all overflow-hidden ${
              selectedTable === i 
              ? 'bg-blue-600/20 border-blue-400 shadow-blue-500/20 shadow-2xl scale-105' 
              : 'glass border-transparent hover:border-white/20'
            }`}
            onClick={() => onSelectTable(i)}
          >
            <div className="text-4xl font-bold mb-1">{selectedTable} × {i}</div>
            <div className="text-2xl text-blue-300 font-bold">= {selectedTable * i}</div>
            
            {/* Background pattern */}
            <div className="absolute -bottom-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity">
               <span className="text-6xl font-black">{i}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 p-6 glass rounded-2xl text-center">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">میدونی چرا؟</h3>
        <p className="text-lg">
          یعنی عدد <span className="font-bold text-blue-400">{selectedTable}</span> رو باید 
          <span className="font-bold text-purple-400"> {selectedTable} </span> بار با خودش جمع کنی!
        </p>
      </div>
    </div>
  );
};

export default MultiplicationGrid;

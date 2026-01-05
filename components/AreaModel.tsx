
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Plus, Equal, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';

interface Props {
  table: number;
}

enum Step {
  WHOLE = 1,
  SPLIT = 2,
  CALCULATE = 3,
  SUM = 4
}

const AreaModel: React.FC<Props> = ({ table }) => {
  const [multiplier, setMultiplier] = useState(8);
  const [splitPoint, setSplitPoint] = useState(5);
  const [currentStep, setCurrentStep] = useState<Step>(Step.WHOLE);

  // Ensure splitPoint is valid when multiplier changes
  useEffect(() => {
    if (splitPoint >= multiplier) {
      setSplitPoint(Math.max(1, Math.floor(multiplier / 2)));
    }
  }, [multiplier]);

  const m1 = splitPoint;
  const m2 = multiplier - m1;
  const area1 = table * m1;
  const area2 = table * m2;
  const totalArea = table * multiplier;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, Step.SUM));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, Step.WHOLE));

  return (
    <div className="flex flex-col h-full items-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-1">روش مستطیلی (خاصیت توزیع‌پذیری)</h2>
        <p className="text-gray-400">بیا یک ضرب سخت رو با تقسیم کردن مستطیل به دو بخش راحت، زانو در بیاریم!</p>
      </div>

      {/* Step Progress Bar */}
      <div className="flex gap-2 mb-8 w-full max-w-md">
        {[1, 2, 3, 4].map((s) => (
          <div 
            key={s} 
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              s <= currentStep ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-white/10'
            }`} 
          />
        ))}
      </div>

      <div className="flex-1 w-full flex flex-col lg:flex-row items-center justify-center gap-10 px-4">
        {/* The Interactive Visualizer Area */}
        <div className="relative flex-1 flex flex-col items-center justify-center min-h-[450px] w-full max-w-2xl">
          
          <div className="relative p-16 glass rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-center">
            {/* The Main Rectangle Container */}
            <motion.div 
              layout
              className="relative border-4 border-white/20 rounded-2xl overflow-hidden flex shadow-2xl bg-white/5"
            >
              {/* Part 1 */}
              <motion.div
                layout
                animate={{ 
                  width: m1 * 40,
                  marginRight: currentStep >= Step.SPLIT ? 15 : 0
                }}
                style={{ height: table * 40 }}
                className={`relative flex items-center justify-center transition-colors duration-500 ${
                  currentStep >= Step.CALCULATE ? 'bg-blue-600/60' : 'bg-indigo-500/40'
                }`}
              >
                {currentStep >= Step.CALCULATE && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-2xl font-black text-white drop-shadow-md">
                    {area1}
                  </motion.div>
                )}
                
                {/* Labels for Part 1 */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-blue-300 font-bold text-lg">{m1}</div>
                {currentStep === Step.SPLIT && (
                  <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full text-indigo-900 shadow-xl animate-bounce">
                    <Scissors className="w-4 h-4" />
                  </div>
                )}
              </motion.div>

              {/* Part 2 */}
              <AnimatePresence>
                {m2 > 0 && (
                  <motion.div
                    layout
                    initial={{ width: 0 }}
                    animate={{ width: m2 * 40 }}
                    style={{ height: table * 40 }}
                    className={`relative flex items-center justify-center transition-colors duration-500 ${
                      currentStep >= Step.CALCULATE ? 'bg-purple-600/60' : 'bg-indigo-500/40'
                    }`}
                  >
                    {currentStep >= Step.CALCULATE && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-2xl font-black text-white drop-shadow-md">
                        {area2}
                      </motion.div>
                    )}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-purple-300 font-bold text-lg">{m2}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Common Height Label */}
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 font-black text-2xl text-white">{table}</div>
            </motion.div>

            {/* Total Area Info (Shows in Step 1 or Final Step) */}
            <AnimatePresence>
              {(currentStep === Step.WHOLE || currentStep === Step.SUM) && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -bottom-12 flex items-center gap-4 bg-white/10 px-6 py-2 rounded-full border border-white/20"
                >
                  {currentStep === Step.SUM ? (
                    <div className="flex items-center gap-3 font-bold text-xl">
                      <span className="text-blue-400">{area1}</span>
                      <Plus className="w-5 h-5 text-gray-400" />
                      <span className="text-purple-400">{area2}</span>
                      <Equal className="w-6 h-6 text-gray-400" />
                      <span className="text-green-400 text-3xl font-black">{totalArea}</span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">
                      {table} × {multiplier} = <span className="text-indigo-400">{totalArea}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Instructions & Controls Panel */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          <div className="glass p-8 rounded-[2.5rem] border border-white/10 flex flex-col min-h-[380px]">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-600 p-2 rounded-xl text-white">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">مرحله {currentStep}: {
                  currentStep === Step.WHOLE ? 'ساخت مستطیل اصلی' :
                  currentStep === Step.SPLIT ? 'بُرش و تقسیم' :
                  currentStep === Step.CALCULATE ? 'محاسبه بخش‌ها' : 'جمع نهایی'
                }</h3>
              </div>

              <div className="text-lg leading-relaxed text-gray-200 mb-8 h-24">
                {currentStep === Step.WHOLE && (
                  <p>اول مستطیل ضرب <span className="font-bold text-white">{table} × {multiplier}</span> رو می‌کشیم. این مساحتی هست که باید کلش رو پیدا کنیم.</p>
                )}
                {currentStep === Step.SPLIT && (
                  <p>حالا عدد <span className="text-indigo-300 font-bold">{multiplier}</span> رو به دو عدد راحت‌تر یعنی <span className="text-blue-400 font-bold">{m1}</span> و <span className="text-purple-400 font-bold">{m2}</span> تقسیم می‌کنیم.</p>
                )}
                {currentStep === Step.CALCULATE && (
                  <p>ضرب دو مستطیل جدید خیلی آسون‌تره! <br/> <span className="text-blue-300">{table}×{m1}={area1}</span> و <span className="text-purple-300">{table}×{m2}={area2}</span>.</p>
                )}
                {currentStep === Step.SUM && (
                  <p>در آخر کافیه جواب این دو تا ضرب کوچیک رو با هم جمع کنی تا به جواب اصلی یعنی <span className="text-green-400 font-bold">{totalArea}</span> برسی!</p>
                )}
              </div>

              {/* Dynamic Controls based on Step */}
              <div className="space-y-6">
                {currentStep === Step.WHOLE && (
                  <div className="space-y-4">
                    <label className="text-sm text-gray-400">اندازه ضرب رو انتخاب کن:</label>
                    <input 
                      type="range" min="3" max="10" value={multiplier} 
                      onChange={(e) => setMultiplier(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>کوچک</span>
                      <span>بزرگ</span>
                    </div>
                  </div>
                )}

                {currentStep === Step.SPLIT && (
                  <div className="space-y-4">
                    <label className="text-sm text-gray-400">محل بُرش رو تغییر بده:</label>
                    <input 
                      type="range" min="1" max={multiplier - 1} value={splitPoint} 
                      onChange={(e) => setSplitPoint(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-blue-400 font-bold text-lg">
                      <span>{m1}</span>
                      <span>{m2}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <button 
                onClick={prevStep}
                disabled={currentStep === Step.WHOLE}
                className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all ${
                  currentStep === Step.WHOLE ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <ArrowRight className="w-5 h-5" />
                قبلی
              </button>
              <button 
                onClick={nextStep}
                disabled={currentStep === Step.SUM}
                className={`flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl ${
                  currentStep === Step.SUM ? 'bg-white/5 text-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                بعدی
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaModel;

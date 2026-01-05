
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Plus, Equal, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';

interface Props {
  table: number;
}

const Steps = {
  WHOLE: 1,
  SPLIT: 2,
  CALCULATE: 3,
  SUM: 4
} as const;

type StepType = typeof Steps[keyof typeof Steps];

const AreaModel: React.FC<Props> = ({ table }) => {
  const [multiplier, setMultiplier] = useState(8);
  const [splitPoint, setSplitPoint] = useState(5);
  const [currentStep, setCurrentStep] = useState<StepType>(Steps.WHOLE);

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

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, Steps.SUM) as StepType);
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, Steps.WHOLE) as StepType);

  return (
    <div className="flex flex-col h-full items-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-1">روش مستطیلی (خاصیت توزیع‌پذیری)</h2>
        <p className="text-gray-400">یک ضرب سخت رو با تقسیم کردن مستطیل به دو بخش راحت، حل کن!</p>
      </div>

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
        <div className="relative flex-1 flex flex-col items-center justify-center min-h-[400px] w-full max-w-2xl">
          <div className="relative p-12 glass rounded-[3rem] border border-white/10 shadow-2xl flex items-center justify-center">
            <motion.div layout className="relative border-4 border-white/20 rounded-2xl overflow-hidden flex shadow-2xl bg-white/5">
              <motion.div
                layout
                animate={{ width: m1 * 30, marginRight: currentStep >= Steps.SPLIT ? 15 : 0 }}
                style={{ height: table * 30 }}
                className={`relative flex items-center justify-center transition-colors duration-500 ${
                  currentStep >= Steps.CALCULATE ? 'bg-blue-600/60' : 'bg-indigo-500/40'
                }`}
              >
                {currentStep >= Steps.CALCULATE && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xl font-black text-white">{area1}</motion.div>
                )}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-blue-300 font-bold">{m1}</div>
                {currentStep === Steps.SPLIT && (
                  <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full text-indigo-900 shadow-xl animate-bounce">
                    <Scissors className="w-4 h-4" />
                  </div>
                )}
              </motion.div>

              <AnimatePresence>
                {m2 > 0 && (
                  <motion.div
                    layout
                    initial={{ width: 0 }}
                    animate={{ width: m2 * 30 }}
                    style={{ height: table * 30 }}
                    className={`relative flex items-center justify-center transition-colors duration-500 ${
                      currentStep >= Steps.CALCULATE ? 'bg-purple-600/60' : 'bg-indigo-500/40'
                    }`}
                  >
                    {currentStep >= Steps.CALCULATE && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xl font-black text-white">{area2}</motion.div>
                    )}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-purple-300 font-bold">{m2}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute -right-10 top-1/2 -translate-y-1/2 font-black text-xl text-white">{table}</div>
            </motion.div>

            <AnimatePresence>
              {(currentStep === Steps.WHOLE || currentStep === Steps.SUM) && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute -bottom-12 flex items-center gap-4 bg-white/10 px-6 py-2 rounded-full border border-white/20"
                >
                  {currentStep === Steps.SUM ? (
                    <div className="flex items-center gap-3 font-bold text-lg">
                      <span className="text-blue-400">{area1}</span>
                      <Plus className="w-4 h-4 text-gray-400" />
                      <span className="text-purple-400">{area2}</span>
                      <Equal className="w-5 h-5 text-gray-400" />
                      <span className="text-green-400 text-2xl font-black">{totalArea}</span>
                    </div>
                  ) : (
                    <div className="text-xl font-bold">
                      {table} × {multiplier} = <span className="text-indigo-400">{totalArea}</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full lg:w-[350px] flex flex-col gap-6">
          <div className="glass p-6 rounded-[2rem] border border-white/10 flex flex-col min-h-[350px]">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-600 p-2 rounded-xl text-white">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">مرحله {currentStep}</h3>
              </div>

              <div className="text-md leading-relaxed text-gray-200 mb-6 h-20">
                {currentStep === Steps.WHOLE && <p>اول مستطیل ضرب اصلی رو می‌کشیم.</p>}
                {currentStep === Steps.SPLIT && <p>عدد {multiplier} رو به دو بخش راحت تقسیم می‌کنیم.</p>}
                {currentStep === Steps.CALCULATE && <p>حالا مساحت هر بخش رو جداگانه حساب می‌کنیم.</p>}
                {currentStep === Steps.SUM && <p>در آخر جواب‌ها رو با هم جمع می‌کنیم!</p>}
              </div>

              <div className="space-y-4">
                {currentStep === Steps.WHOLE && (
                  <input type="range" min="3" max="10" value={multiplier} onChange={(e) => setMultiplier(parseInt(e.target.value))} className="w-full accent-indigo-500" />
                )}
                {currentStep === Steps.SPLIT && (
                  <input type="range" min="1" max={multiplier - 1} value={splitPoint} onChange={(e) => setSplitPoint(parseInt(e.target.value))} className="w-full accent-blue-500" />
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button onClick={prevStep} disabled={currentStep === Steps.WHOLE} className="flex-1 py-3 rounded-xl bg-white/10 disabled:opacity-30">قبلی</button>
              <button onClick={nextStep} disabled={currentStep === Steps.SUM} className="flex-1 py-3 rounded-xl bg-indigo-600 disabled:opacity-30">بعدی</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaModel;

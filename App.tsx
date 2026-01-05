
import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  BrainCircuit, 
  Gamepad2, 
  Star,
  Trophy,
  Activity,
  SearchCode,
  Layers,
  Square,
  Hand,
  PlusCircle
} from 'lucide-react';
import { LearningMode, ModeHints } from './types.ts';
import MultiplicationGrid from './components/MultiplicationGrid.tsx';
import QuizMode from './components/QuizMode.tsx';
import AITutor from './components/AITutor.tsx';
import NumberLine from './components/NumberLine.tsx';
import PatternExplorer from './components/PatternExplorer.tsx';
import RepeatedAddition from './components/RepeatedAddition.tsx';
import AreaModel from './components/AreaModel.tsx';
import FingerMethod from './components/FingerMethod.tsx';
import ArrayModel from './components/ArrayModel.tsx';
import HintOverlay from './components/HintOverlay.tsx';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<LearningMode>(LearningMode.EXPLORE);
  const [selectedTable, setSelectedTable] = useState<number>(2);
  const [progress, setProgress] = useState<Record<number, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('math_galaxy_progress');
    if (saved) setProgress(JSON.parse(saved));
  }, []);

  const updateProgress = (table: number, score: number) => {
    const newProgress = { ...progress, [table]: Math.max(progress[table] || 0, score) };
    setProgress(newProgress);
    localStorage.setItem('math_galaxy_progress', JSON.stringify(newProgress));
  };

  const renderContent = () => {
    switch (activeMode) {
      case LearningMode.EXPLORE:
        return <MultiplicationGrid selectedTable={selectedTable} onSelectTable={setSelectedTable} />;
      case LearningMode.REPEATED_ADDITION:
        return <RepeatedAddition table={selectedTable} />;
      case LearningMode.ARRAY_MODEL:
        return <ArrayModel table={selectedTable} />;
      case LearningMode.NUMBER_LINE:
        return <NumberLine table={selectedTable} />;
      case LearningMode.AREA_MODEL:
        return <AreaModel table={selectedTable} />;
      case LearningMode.FINGER_METHOD:
        return <FingerMethod table={selectedTable} />;
      case LearningMode.PATTERNS:
        return <PatternExplorer table={selectedTable} />;
      case LearningMode.QUIZ:
        return <QuizMode table={selectedTable} onFinish={(score) => updateProgress(selectedTable, score)} />;
      case LearningMode.AI_TUTOR:
        return <AITutor table={selectedTable} />;
      default:
        return <MultiplicationGrid selectedTable={selectedTable} onSelectTable={setSelectedTable} />;
    }
  };

  const activeHint = ModeHints[activeMode];

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-7xl mx-auto overflow-y-auto">
      <header className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-xl shadow-lg">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              کهکشان ریاضی
            </h1>
            <p className="text-xs text-gray-500">آموزش مدرن جدول ضرب</p>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-1.5 p-1 glass rounded-2xl">
          {[
            { id: LearningMode.EXPLORE, icon: Gamepad2, label: 'کاوش' },
            { id: LearningMode.REPEATED_ADDITION, icon: PlusCircle, label: 'جمع' },
            { id: LearningMode.ARRAY_MODEL, icon: Layers, label: 'شکل' },
            { id: LearningMode.NUMBER_LINE, icon: Activity, label: 'محور' },
            { id: LearningMode.AREA_MODEL, icon: Square, label: 'مستطیل' },
            { id: LearningMode.FINGER_METHOD, icon: Hand, label: 'انگشتی' },
            { id: LearningMode.PATTERNS, icon: SearchCode, label: 'الگو' },
            { id: LearningMode.QUIZ, icon: Trophy, label: 'مسابقه' },
            { id: LearningMode.AI_TUTOR, icon: BrainCircuit, label: 'معلم' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                activeMode === mode.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <mode.icon className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-medium">{mode.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 glass rounded-3xl p-4 md:p-8 relative min-h-[500px]">
        {renderContent()}
      </main>

      <footer className="mt-6 flex gap-2 justify-center flex-wrap">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setSelectedTable(num)}
            className={`relative w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
              selectedTable === num 
              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white/50 shadow-xl scale-110' 
              : 'glass hover:bg-white/10'
            }`}
          >
            {num}
            {progress[num] >= 90 && (
              <Star className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 fill-current" />
            )}
          </button>
        ))}
      </footer>

      <HintOverlay 
        key={activeMode}
        modeKey={activeMode} 
        title={activeHint?.title || ""} 
        message={activeHint?.message || ""} 
      />
    </div>
  );
};

export default App;

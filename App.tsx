
import React, { useState, useEffect } from 'react';
import { GameState, Question, Level, LevelResult } from './types';
import { LEVELS, PARISHES } from './constants';
import QuestionCard from './components/QuestionCard';

const PRIMARY_BLUE = "#002d62";
const DEFAULT_COVER = "https://guzmangr.github.io/OviedoRural/assets/img/parroquias/naranco.jpg";
const STORAGE_KEY = "oviedo_rural_cover";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('START');
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1]);
  const [rewards, setRewards] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<LevelResult | null>(null);
  const [coverImage, setCoverImage] = useState<string>(DEFAULT_COVER);
  const [isSelectingImage, setIsSelectingImage] = useState(false);

  useEffect(() => {
    const savedCover = localStorage.getItem(STORAGE_KEY);
    if (savedCover) {
      setCoverImage(savedCover);
    }
  }, []);

  const handleSetCover = (imgUrl: string) => {
    setCoverImage(imgUrl);
    localStorage.setItem(STORAGE_KEY, imgUrl);
    setIsSelectingImage(false);
  };

  const startLevel = (level: Level) => {
    setCurrentLevel(level);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setGameState('PLAYING');
  };

  const handleOptionSelect = (option: string) => {
    if (showFeedback || !currentLevel) return;
    setSelectedOption(option);
    setShowFeedback(true);
    
    if (option === currentLevel.questions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (!currentLevel) return;

    if (currentIndex < currentLevel.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      finishLevel();
    }
  };

  const finishLevel = () => {
    if (!currentLevel) return;
    
    const success = score >= currentLevel.requiredScore;
    const stars = Math.ceil((score / currentLevel.questions.length) * 3);
    
    if (success) {
      if (!unlockedLevels.includes(currentLevel.id + 1)) {
        setUnlockedLevels(prev => [...prev, currentLevel.id + 1]);
      }
      if (!rewards.includes(currentLevel.reward)) {
        setRewards(prev => [...prev, currentLevel.reward]);
      }
    }

    setLastResult({
      levelId: currentLevel.id,
      score,
      total: currentLevel.questions.length,
      stars,
      unlockedNext: success
    });
    setGameState('LEVEL_RESULT');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Navbar Premium */}
      <header className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img src="way.png" alt="Oviedo Rural Logo" className="h-10 w-auto" onError={(e) => {
            (e.target as HTMLImageElement).src = "https://guzmangr.github.io/OviedoRural/assets/img/logo.png";
          }} />
          <h1 className="text-2xl font-black tracking-tighter cursor-pointer" style={{ color: PRIMARY_BLUE }} onClick={() => setGameState('START')}>
            OVIEDO<span className="font-light">RURAL</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {rewards.length > 0 && (
            <div className="flex gap-2">
              {rewards.map((r, i) => (
                <div key={i} title={r} className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white shadow-sm border-2 border-white">
                  <i className="fa-solid fa-medal text-xs"></i>
                </div>
              ))}
            </div>
          )}
          {gameState === 'START' && (
            <button 
              onClick={() => setIsSelectingImage(true)}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
              title="Personalizar Portada"
            >
              <i className="fa-solid fa-palette text-lg"></i>
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl px-4 py-8 flex flex-col items-center justify-center">
        {gameState === 'START' && (
          <div className="text-center animate-fadeIn max-w-2xl w-full">
            <div className="mb-10 relative">
              <img 
                src={coverImage} 
                alt="Oviedo Portada" 
                className="rounded-[2.5rem] shadow-2xl h-96 w-full object-cover transition-all duration-700"
                onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_COVER; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002d62]/90 via-[#002d62]/30 to-transparent rounded-[2.5rem]"></div>
              <div className="absolute bottom-10 left-0 right-0 text-white px-10 text-left">
                <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">Patrimonio Rural</span>
                <h2 className="text-5xl font-black mb-2 leading-tight">Las 30 Parroquias</h2>
                <p className="text-blue-100 opacity-90 text-lg">Un viaje interactivo por la historia y belleza del entorno rural de Oviedo.</p>
              </div>
              
              {/* Botón flotante para cambiar imagen */}
              <button 
                onClick={() => setIsSelectingImage(true)}
                className="absolute top-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
              >
                <i className="fa-solid fa-camera"></i>
              </button>
            </div>
            
            <button 
              onClick={() => setGameState('LEVEL_SELECT')}
              className="px-12 py-5 text-white font-bold rounded-2xl shadow-xl transform transition-all hover:scale-105 active:scale-95 text-xl mb-12 w-full sm:w-auto"
              style={{ backgroundColor: PRIMARY_BLUE }}
            >
              Comenzar Aventura
            </button>
            
            <div className="grid grid-cols-3 gap-6 opacity-60">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                   <i className="fa-solid fa-map-location-dot text-xl" style={{ color: PRIMARY_BLUE }}></i>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">30 Parroquias</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                  <i className="fa-solid fa-landmark text-xl" style={{ color: PRIMARY_BLUE }}></i>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Patrimonio</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                  <i className="fa-solid fa-route text-xl" style={{ color: PRIMARY_BLUE }}></i>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Niveles</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Selección de Imagen */}
        {isSelectingImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#002d62]/40 backdrop-blur-sm animate-fadeInShort">
            <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-bounceInShort">
              <div className="p-8 border-b flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-slate-800">Personalizar Portada</h3>
                  <p className="text-slate-500 text-sm">Elige una imagen de nuestras parroquias para tu pantalla de inicio.</p>
                </div>
                <button onClick={() => setIsSelectingImage(false)} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>
              <div className="p-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                {PARISHES.map((parish) => (
                  <button 
                    key={parish.id}
                    onClick={() => handleSetCover(parish.image)}
                    className={`group relative rounded-2xl overflow-hidden aspect-video border-4 transition-all ${
                      coverImage === parish.image ? 'border-blue-600 scale-95 shadow-inner' : 'border-transparent hover:scale-[1.02]'
                    }`}
                  >
                    <img src={parish.image} alt={parish.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute bottom-2 left-2 right-2 text-white font-bold text-[10px] uppercase truncate">{parish.name}</div>
                    {coverImage === parish.image && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                        <i className="fa-solid fa-check text-[10px]"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="p-8 bg-slate-50 flex justify-end gap-3">
                <button 
                   onClick={() => handleSetCover(DEFAULT_COVER)}
                   className="px-6 py-2 rounded-xl font-bold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Restaurar Original
                </button>
              </div>
            </div>
          </div>
        )}

        {gameState === 'LEVEL_SELECT' && (
          <div className="w-full animate-fadeIn">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black text-slate-800 mb-2">Selecciona un Nivel</h2>
              <p className="text-slate-500">Desbloquea todos los niveles para convertirte en Maestro Rural.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {LEVELS.map((level) => {
                const isUnlocked = unlockedLevels.includes(level.id);
                return (
                  <button
                    key={level.id}
                    disabled={!isUnlocked}
                    onClick={() => startLevel(level)}
                    className={`relative p-8 rounded-3xl text-left transition-all overflow-hidden ${
                      isUnlocked 
                      ? 'bg-white shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-blue-200 cursor-pointer group' 
                      : 'bg-slate-200 opacity-70 cursor-not-allowed'
                    }`}
                  >
                    {!isUnlocked && (
                      <div className="absolute top-4 right-4 bg-slate-400 text-white p-2 rounded-full">
                        <i className="fa-solid fa-lock"></i>
                      </div>
                    )}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                      isUnlocked ? 'bg-blue-50 text-blue-600' : 'bg-slate-300 text-slate-500'
                    }`}>
                      <i className={`fa-solid ${level.icon} text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{level.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{level.description}</p>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-medal text-yellow-500"></i>
                      <span className="text-xs font-bold uppercase text-slate-400">Premio: {level.reward}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-10 text-center">
               <button onClick={() => setGameState('START')} className="text-slate-400 font-bold text-sm hover:text-blue-600 transition-colors">
                 <i className="fa-solid fa-arrow-left mr-2"></i> Volver a Portada
               </button>
            </div>
          </div>
        )}

        {gameState === 'PLAYING' && currentLevel && (
          <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-2xl mb-8 flex items-center justify-between text-slate-400 font-bold text-xs uppercase tracking-widest">
              <span>Nivel {currentLevel.id}: {currentLevel.title}</span>
              <span>{currentIndex + 1} / {currentLevel.questions.length}</span>
            </div>
            <QuestionCard 
              question={currentLevel.questions[currentIndex]}
              selectedOption={selectedOption}
              onSelect={handleOptionSelect}
              showFeedback={showFeedback}
            />
            {showFeedback && (
              <button 
                onClick={nextQuestion}
                className="mt-8 px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                {currentIndex < currentLevel.questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Nivel'}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            )}
          </div>
        )}

        {gameState === 'LEVEL_RESULT' && lastResult && (
          <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 text-center animate-bounceIn border-4" style={{ borderColor: PRIMARY_BLUE }}>
            <div className="mb-6">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 bg-yellow-50 text-yellow-500 shadow-inner">
                <i className={`fa-solid ${lastResult.unlockedNext ? 'fa-trophy' : 'fa-triangle-exclamation'} text-4xl`}></i>
              </div>
              <h2 className="text-3xl font-black text-slate-800">
                {lastResult.unlockedNext ? '¡Nivel Superado!' : 'Casi lo logras'}
              </h2>
            </div>
            
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3].map(s => (
                <i key={s} className={`fa-solid fa-star text-3xl ${s <= lastResult.stars ? 'text-yellow-400' : 'text-slate-200'}`}></i>
              ))}
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl mb-8">
              <p className="text-xs font-bold uppercase text-slate-400 mb-1">Puntuación</p>
              <p className="text-4xl font-black" style={{ color: PRIMARY_BLUE }}>{lastResult.score} / {lastResult.total}</p>
            </div>

            {lastResult.unlockedNext && (
              <div className="mb-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4 text-left">
                <div className="bg-yellow-400 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fa-solid fa-medal"></i>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-blue-600">Nueva Recompensa</p>
                  <p className="text-sm font-bold text-blue-900">{LEVELS.find(l => l.id === lastResult.levelId)?.reward}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setGameState('LEVEL_SELECT')}
                className="w-full py-5 text-white font-bold rounded-2xl shadow-lg transition-all"
                style={{ backgroundColor: PRIMARY_BLUE }}
              >
                Volver a Niveles
              </button>
              <button 
                onClick={() => setGameState('START')}
                className="w-full py-4 text-slate-500 font-bold hover:text-slate-800 transition-colors"
              >
                Ir a Portada
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="py-12 text-center text-slate-300 text-[10px] w-full max-w-4xl border-t border-slate-100">
        <p className="uppercase tracking-[0.3em] font-bold">Patrimonio Rural de Oviedo · 2025</p>
        <p className="mt-2 text-slate-200 italic">Descubre la esencia de Asturias</p>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInShort { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
        @keyframes bounceInShort { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .animate-fadeInShort { animation: fadeInShort 0.3s ease-out forwards; }
        .animate-bounceIn { animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-bounceInShort { animation: bounceInShort 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default App;

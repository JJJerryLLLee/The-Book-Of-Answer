import React, { useState } from 'react';
import { AppState } from './types';
import BookCover from './components/BookCover';
import NumberSelector from './components/NumberSelector';
import BookFlipping from './components/BookFlipping';
import BookResult from './components/BookResult';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<AppState>(AppState.COVER);
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const handleOpenBook = () => {
    setGameState(AppState.SELECTING);
  };

  const handlePageSelect = (page: number) => {
    setSelectedPage(page);
    setGameState(AppState.FLIPPING);

    // Flip animation duration (1 second)
    setTimeout(() => {
      setGameState(AppState.RESULT);
    }, 1200);
  };

  const handleReset = () => {
    setGameState(AppState.COVER);
  };

  return (
    <div className="w-full h-full text-neutral-100 selection:bg-yellow-900 selection:text-white">
      
      {/* View Router */}
      {gameState === AppState.COVER && (
        <BookCover onOpen={handleOpenBook} />
      )}

      {gameState === AppState.SELECTING && (
        <>
          <BookCover onOpen={() => {}} /> {/* Keep cover background visible but overlay picker */}
          <NumberSelector onSelect={handlePageSelect} />
        </>
      )}

      {gameState === AppState.FLIPPING && (
        <BookFlipping />
      )}

      {gameState === AppState.RESULT && (
        <BookResult page={selectedPage} onReset={handleReset} />
      )}
      
      {/* Global CSS for Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInSlow {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInText {
            0% { opacity: 0; filter: blur(5px); }
            100% { opacity: 1; filter: blur(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.4s ease-out forwards; }
        .animate-fadeInSlow { animation: fadeInSlow 0.8s ease-out forwards; }
        .animate-fadeInText { animation: fadeInText 1.5s ease-out forwards; }
        
        .text-shadow-gold {
            text-shadow: 0 0 10px rgba(253, 224, 71, 0.5);
        }
      `}</style>
    </div>
  );
};

export default App;
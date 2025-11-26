import React, { useState, useRef } from 'react';
import { playPageFlipSound } from '../utils/audio';

interface NumberSelectorProps {
  onSelect: (page: number) => void;
}

const NumberSelector: React.FC<NumberSelectorProps> = ({ onSelect }) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate numbers 1-99
  const numbers = Array.from({ length: 99 }, (_, i) => i + 1);

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const children = container.children;
      if (children.length === 0) return;

      // Calculate the geometric center of the scroll view
      const containerCenter = container.scrollTop + container.clientHeight / 2;
      
      // Get metrics from the first item (assuming uniform height)
      const firstItem = children[0] as HTMLElement;
      const itemHeight = firstItem.offsetHeight;
      
      // Calculate the center position of the first item
      // offsetTop includes the top padding
      const firstItemCenter = firstItem.offsetTop + itemHeight / 2;
      
      // Calculate index based on distance from the first item's center
      const diff = containerCenter - firstItemCenter;
      const index = Math.round(diff / itemHeight);
      
      // Clamp value
      const newNumber = Math.min(Math.max(index + 1, 1), 99);
      
      if (newNumber !== currentNumber) {
        setCurrentNumber(newNumber);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md p-8 text-center animate-slideUp">
        <h2 className="text-yellow-100 font-display text-2xl mb-8 tracking-widest drop-shadow-md">
          Focus on your question...<br/>
          <span className="text-sm font-serif italic text-yellow-300/70">Select a page number</span>
        </h2>

        {/* The Wheel Window */}
        <div className="relative w-48 h-64 mx-auto bg-neutral-900/90 rounded-xl border-4 border-yellow-800/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] box-border">
          
          {/* Glass Reflection / Overlay */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
          
          {/* Center Highlight Line */}
          <div className="absolute top-1/2 left-0 right-0 h-16 -mt-8 border-t border-b border-yellow-500/30 z-20 pointer-events-none bg-yellow-500/5 box-border"></div>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="absolute inset-0 overflow-y-scroll no-scrollbar snap-y snap-mandatory scroll-smooth"
            style={{ 
                // Padding is calculated to center the first and last item in the viewport
                // 50% of container height minus half of item height (2rem)
                paddingTop: 'calc(50% - 2rem)', 
                paddingBottom: 'calc(50% - 2rem)' 
            }}
          >
            {numbers.map((num) => (
              <div 
                key={num} 
                className={`h-16 flex items-center justify-center font-display text-4xl snap-center transition-all duration-200 leading-none ${
                  num === currentNumber 
                    ? 'text-yellow-400 scale-110 font-bold text-shadow-gold' 
                    : 'text-neutral-600 scale-90 blur-[1px]'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-neutral-500 text-xs font-serif italic mb-4">Scroll to select</p>
            <button 
            onClick={() => {
                playPageFlipSound(); 
                onSelect(currentNumber);
            }}
            className="px-10 py-3 bg-gradient-to-b from-yellow-700 to-yellow-900 text-yellow-100 font-display font-bold text-lg tracking-widest rounded shadow-lg border border-yellow-500/20 hover:scale-105 transition-transform active:scale-95"
            >
            REVEAL
            </button>
        </div>
      </div>
    </div>
  );
};

export default NumberSelector;
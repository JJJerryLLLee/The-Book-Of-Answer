import React, { useEffect, useState } from 'react';
import { playPageFlipSound } from '../utils/audio';

const BookFlipping: React.FC = () => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    // Sound loop sequence and random number flashing
    const interval = setInterval(() => {
        playPageFlipSound();
        setCurrentNumber(Math.floor(Math.random() * 99) + 1);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40">
      {/* 
         Width is doubled compared to cover (Cover was 300px/400px).
         Open book is 600px/800px.
      */}
      <div className="relative w-[600px] h-[450px] md:w-[800px] md:h-[600px] perspective-1000 max-w-full scale-90 md:scale-100">
        
        {/* Back Cover (Static Base spanning full width) */}
        <div className="absolute inset-0 bg-neutral-800 rounded-lg shadow-2xl border-4 border-neutral-900 leather-texture"></div>

        {/* The Pages Container */}
        <div className="absolute top-2 bottom-2 left-3 right-3 flex preserve-3d">
            
            {/* Left Page Stack (Static Destination) */}
            <div className="w-1/2 h-full bg-[#e8decc] rounded-l-sm shadow-inner border-r border-neutral-300 relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-black via-transparent to-transparent"></div>
                 {/* Decorative lines to look like text */}
                 <div className="p-6 opacity-30">
                    <div className="space-y-4 mt-8">
                        <div className="h-1 bg-neutral-600 w-full rounded"></div>
                        <div className="h-1 bg-neutral-600 w-5/6 rounded"></div>
                        <div className="h-1 bg-neutral-600 w-full rounded"></div>
                        <div className="h-1 bg-neutral-600 w-4/6 rounded"></div>
                    </div>
                 </div>
                 {/* Left side page number hint */}
                 <div className="absolute bottom-6 left-6 font-display text-neutral-400/30 text-2xl">
                    42
                 </div>
            </div>

            {/* Right Page Stack (Static Source) */}
            <div className="w-1/2 h-full bg-[#f4ebd9] rounded-r-sm shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-l from-black via-transparent to-transparent"></div>
                {/* Flashing random numbers to simulate seeking */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-6xl text-neutral-400 opacity-50 blur-[1px]">{currentNumber}</span>
                </div>
            </div>

            {/* FLIPPING PAGES ANIMATION */}
            {/* We use multiple pages with delays to create a continuous flipping effect */}
            
            {/* Page 1 */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#f4ebd9] origin-left border-l border-neutral-300 shadow-xl rounded-r-sm animate-flip">
                <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent"></div>
            </div>

            {/* Page 2 */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#f4ebd9] origin-left border-l border-neutral-300 shadow-xl rounded-r-sm animate-flip" style={{ animationDelay: '0.15s' }}></div>

            {/* Page 3 */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#f4ebd9] origin-left border-l border-neutral-300 shadow-xl rounded-r-sm animate-flip" style={{ animationDelay: '0.3s' }}></div>
            
            {/* Page 4 */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#f4ebd9] origin-left border-l border-neutral-300 shadow-xl rounded-r-sm animate-flip" style={{ animationDelay: '0.45s' }}></div>

        </div>
      </div>

      <style>{`
        @keyframes flip {
            0% {
                transform: rotateY(0deg);
                z-index: 10;
                background-color: #f4ebd9;
            }
            15% {
                /* Darker as it stands up (lighting) */
                background-color: #e8e0ce;
            }
            50% {
                transform: rotateY(-90deg);
                z-index: 20;
            }
            100% {
                transform: rotateY(-180deg);
                z-index: 5;
                /* Darker on the other side */
                background-color: #e0d6c2; 
            }
        }
        .animate-flip {
            animation: flip 0.9s infinite cubic-bezier(0.25, 1, 0.5, 1);
            backface-visibility: hidden; 
        }
      `}</style>
    </div>
  );
};

export default BookFlipping;
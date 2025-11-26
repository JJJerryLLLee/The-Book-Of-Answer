import React from 'react';
import { getAnswer } from '../data/answers';

interface BookResultProps {
  page: number;
  onReset: () => void;
}

const BookResult: React.FC<BookResultProps> = ({ page, onReset }) => {
  const answer = getAnswer(page);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* The Open Book */}
      <div className="relative w-full max-w-4xl aspect-[3/2] flex bg-neutral-800 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-neutral-900 leather-texture animate-fadeInSlow">
        
        {/* Left Page */}
        <div className="flex-1 m-2 mr-0 bg-[#f4ebd9] rounded-l shadow-[inset_-10px_0_20px_rgba(0,0,0,0.1)] relative overflow-hidden transform origin-right">
             {/* Paper Texture */}
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#8b7355 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             <div className="absolute top-6 left-6 right-6 bottom-6 border border-double border-neutral-400/30 p-8 flex flex-col justify-between">
                <div className="text-center font-display text-neutral-400/50 text-sm tracking-widest">
                    THE BOOK OF ANSWERS
                </div>
                <div className="flex-1"></div>
                <div className="text-center font-display text-neutral-500 font-bold text-xl opacity-30">
                    {page % 2 !== 0 ? page - 1 : page}
                </div>
             </div>
             
             {/* Center Shadow/Fold */}
             <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
        </div>

        {/* Right Page (The Answer) */}
        <div className="flex-1 m-2 ml-0 bg-[#f4ebd9] rounded-r shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)] relative overflow-hidden transform origin-left">
            {/* Paper Texture */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#8b7355 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="absolute top-6 left-6 right-6 bottom-6 border border-double border-neutral-400/30 p-8 flex flex-col items-center justify-center">
                
                {/* The Answer Text */}
                <div className="relative p-8">
                    <span className="absolute -top-4 -left-4 text-4xl text-neutral-300 font-serif">"</span>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-center font-serif font-bold text-neutral-800 leading-relaxed drop-shadow-sm animate-fadeInText">
                        {answer}
                    </h2>
                    <span className="absolute -bottom-4 -right-4 text-4xl text-neutral-300 font-serif">"</span>
                </div>

                {/* Page Number */}
                <div className="absolute bottom-4 font-display text-neutral-800 font-bold text-xl">
                    {page}
                </div>
            </div>

            {/* Center Shadow/Fold */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
        </div>

      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
            onClick={onReset}
            className="w-14 h-14 rounded-full bg-yellow-900 border-2 border-yellow-600 text-yellow-100 shadow-lg hover:scale-110 transition-transform flex items-center justify-center group"
            title="Close Book"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
            </svg>
        </button>
      </div>
    </div>
  );
};

export default BookResult;
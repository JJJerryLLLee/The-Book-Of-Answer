import React from 'react';

interface BookCoverProps {
  onOpen: () => void;
}

const BookCover: React.FC<BookCoverProps> = ({ onOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 perspective-1000">
      
      {/* Ambient Light/Shadow Container */}
      <div className="relative group cursor-pointer transition-transform duration-500 transform hover:scale-105 hover:-rotate-x-2" onClick={onOpen}>
        
        {/* Book Spine Shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-black opacity-40 z-0 blur-sm rounded-l-lg transform -translate-x-2"></div>

        {/* The Book Itself */}
        <div className="relative z-10 w-[300px] h-[450px] md:w-[400px] md:h-[600px] rounded-r-lg rounded-l-md shadow-2xl leather-texture border-l-8 border-neutral-900 flex flex-col items-center justify-between py-12 px-8 box-border">
          
          {/* Decorative Corners (Gold) */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-yellow-600 opacity-60 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-yellow-600 opacity-60 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-yellow-600 opacity-60 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-yellow-600 opacity-60 rounded-br-lg"></div>

          {/* Title Section */}
          <div className="flex flex-col items-center gap-4 mt-16">
            <div className="w-20 h-20 rounded-full border-2 border-yellow-700 flex items-center justify-center mb-6 gold-leaf shadow-inner">
               <span className="text-4xl font-display font-bold text-red-900 mt-1">A</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-center font-bold tracking-widest gold-text drop-shadow-md leading-snug">
              The Book<br/>
              Of<br/>
              Answers
            </h1>
          </div>

          {/* Decorative Divider */}
          <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-yellow-600 to-transparent my-4"></div>

          {/* Button */}
          <div className="mt-auto mb-10">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className="px-8 py-2 border border-yellow-600/50 text-yellow-100 font-display tracking-widest hover:bg-yellow-900/30 transition-colors duration-300 rounded-sm"
            >
              OPEN
            </button>
          </div>

          {/* Spine Detail (Visual left edge) */}
          <div className="absolute left-2 top-0 bottom-0 w-1 bg-gradient-to-r from-black/20 to-transparent"></div>
        </div>

        {/* Book Thickness (Pages side) */}
        <div className="absolute right-0 top-2 bottom-2 w-4 bg-neutral-200 transform translate-x-full rounded-r-sm shadow-md" 
             style={{ 
               background: 'repeating-linear-gradient(90deg, #f5f5f5, #f5f5f5 1px, #e5e5e5 2px, #e5e5e5 3px)' 
             }}>
        </div>
      </div>
    </div>
  );
};

export default BookCover;
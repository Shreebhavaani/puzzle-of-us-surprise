
import { useState, useEffect } from 'react';
import { PuzzleGame } from '@/components/PuzzleGame';
import { GiftScroll } from '@/components/GiftScroll';
import { BackgroundMusic } from '@/components/BackgroundMusic';
import { ParticleEffect } from '@/components/ParticleEffect';

const Index = () => {
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    if (isPuzzleSolved) {
      setTimeout(() => setShowScroll(true), 1000);
    }
  }, [isPuzzleSolved]);

  console.log('Index component rendering, isPuzzleSolved:', isPuzzleSolved, 'showScroll:', showScroll);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 overflow-hidden relative">
      <BackgroundMusic />
      <ParticleEffect show={isPuzzleSolved} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4 animate-fade-in">
            Piece of Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            🎂 A Birthday Puzzle Just For You 🎂
          </p>
        </div>

        {!isPuzzleSolved && (
          <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
            <PuzzleGame onSolved={() => setIsPuzzleSolved(true)} />
          </div>
        )}

        {showScroll && (
          <div className="animate-scale-in">
            <GiftScroll />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

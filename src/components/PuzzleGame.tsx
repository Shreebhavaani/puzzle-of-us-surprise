
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface PuzzlePiece {
  id: number;
  correctPosition: number;
  currentPosition: number;
  image: string;
}

interface PuzzleGameProps {
  onSolved: () => void;
}

export const PuzzleGame = ({ onSolved }: PuzzleGameProps) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    console.log('PuzzleGame component mounted');
    
    // Initialize puzzle pieces - using the uploaded image
    const initialPieces: PuzzlePiece[] = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      correctPosition: i,
      currentPosition: Math.floor(Math.random() * 9), // Random initial positions
      image: `/lovable-uploads/98dfc77c-2983-4dad-84f0-6a2b57eb5bac.png`
    }));
    
    // Shuffle the pieces
    const shuffled = [...initialPieces].sort(() => Math.random() - 0.5);
    shuffled.forEach((piece, index) => {
      piece.currentPosition = index;
    });
    
    console.log('Puzzle pieces initialized:', shuffled);
    setPieces(shuffled);
  }, []);

  const handleDragStart = (e: React.DragEvent, pieceId: number) => {
    setDraggedPiece(pieceId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetPosition: number) => {
    e.preventDefault();
    
    if (draggedPiece === null) return;

    setPieces(prev => {
      const newPieces = [...prev];
      const draggedIndex = newPieces.findIndex(p => p.id === draggedPiece);
      const targetIndex = newPieces.findIndex(p => p.currentPosition === targetPosition);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        // Swap positions
        const temp = newPieces[draggedIndex].currentPosition;
        newPieces[draggedIndex].currentPosition = newPieces[targetIndex].currentPosition;
        newPieces[targetIndex].currentPosition = temp;
      }
      
      return newPieces;
    });

    setDraggedPiece(null);
  };

  useEffect(() => {
    // Check if puzzle is solved
    const solved = pieces.every(piece => piece.id === piece.currentPosition);
    if (solved && pieces.length === 9 && !isComplete) {
      console.log('Puzzle solved!');
      setIsComplete(true);
      toast("🎉 Amazing! You've completed our memory puzzle!");
      setTimeout(() => onSolved(), 2000);
    }
  }, [pieces, onSolved, isComplete]);

  const getPieceStyle = (pieceId: number) => {
    // Calculate position in 3x3 grid
    const row = Math.floor(pieceId / 3);
    const col = pieceId % 3;
    
    // Each piece is 133.33px wide and 133.33px tall (400px / 3)
    const pieceWidth = 133.33;
    const pieceHeight = 133.33;
    
    return {
      backgroundImage: `url(/lovable-uploads/98dfc77c-2983-4dad-84f0-6a2b57eb5bac.png)`,
      backgroundPosition: `${-col * pieceWidth}px ${-row * pieceHeight}px`,
      backgroundSize: '400px 400px',
      backgroundRepeat: 'no-repeat'
    };
  };

  console.log('PuzzleGame rendering, pieces count:', pieces.length);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-pink-700 mb-4 font-medium text-lg">
          Drag and drop the pieces to reveal our special memory! 🧩✨
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-2 bg-gradient-to-br from-white to-pink-50 p-4 rounded-2xl shadow-2xl border-4 border-pink-200 w-fit mx-auto">
        {Array.from({ length: 9 }).map((_, position) => {
          const piece = pieces.find(p => p.currentPosition === position);
          return (
            <div
              key={position}
              className="w-32 h-32 border-2 border-dashed border-pink-300 rounded-lg relative overflow-hidden hover:border-pink-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, position)}
            >
              {piece && (
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, piece.id)}
                  className="w-full h-full cursor-move hover:scale-105 transition-transform"
                  style={getPieceStyle(piece.id)}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {isComplete && (
        <div className="text-center mt-6 animate-bounce">
          <p className="text-2xl font-bold text-pink-600">
            Perfect! Just like our friendship! 💕
          </p>
        </div>
      )}
    </div>
  );
};

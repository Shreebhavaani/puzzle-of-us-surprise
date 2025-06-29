
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
    // Initialize puzzle pieces - using placeholder image
    const initialPieces: PuzzlePiece[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      correctPosition: i,
      currentPosition: Math.floor(Math.random() * 8), // Random initial positions
      image: `https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&crop=faces,center`
    }));
    
    // Shuffle the pieces
    const shuffled = [...initialPieces].sort(() => Math.random() - 0.5);
    shuffled.forEach((piece, index) => {
      piece.currentPosition = index;
    });
    
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
    if (solved && pieces.length === 8 && !isComplete) {
      setIsComplete(true);
      toast("🎉 Amazing! You've completed our memory puzzle!");
      setTimeout(() => onSolved(), 2000);
    }
  }, [pieces, onSolved, isComplete]);

  const getPieceStyle = (pieceId: number) => {
    const row = Math.floor(pieceId / 4);
    const col = pieceId % 4;
    return {
      backgroundImage: `url(https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&crop=faces,center)`,
      backgroundPosition: `${-col * 100}px ${-row * 100}px`,
      backgroundSize: '400px 200px'
    };
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-gray-600 mb-4">
          Drag and drop the pieces to reveal our special memory! 🧩
        </p>
      </div>
      
      <div className="grid grid-cols-4 gap-2 bg-white p-4 rounded-2xl shadow-2xl border-4 border-pink-200">
        {Array.from({ length: 8 }).map((_, position) => {
          const piece = pieces.find(p => p.currentPosition === position);
          return (
            <div
              key={position}
              className="aspect-square border-2 border-dashed border-pink-300 rounded-lg relative overflow-hidden hover:border-pink-400 transition-colors"
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

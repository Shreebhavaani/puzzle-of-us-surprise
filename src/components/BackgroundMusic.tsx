
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  console.log('BackgroundMusic component rendered');

  const toggleMute = () => {
    setIsMuted(!isMuted);
    console.log('Music muted:', !isMuted);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg border border-pink-200">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-pink-100 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-600" />
            ) : (
              <Volume2 className="w-5 h-5 text-pink-600" />
            )}
          </button>
          
          <div className="text-sm text-gray-600">
            🎵 Music
          </div>
        </div>
      </div>
    </div>
  );
};

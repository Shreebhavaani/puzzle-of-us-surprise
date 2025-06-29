
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log('BackgroundMusic component rendered');
    
    // Try to load the audio
    if (audioRef.current) {
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log('Audio loaded successfully');
        setIsLoaded(true);
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.log('Audio loading error:', e);
      });
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current && isLoaded) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        console.log('Music paused');
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          console.log('Music started playing');
        }).catch((error) => {
          console.log('Playback failed:', error);
        });
      }
    } else {
      console.log('Audio not loaded yet or not available');
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      console.log('Music muted:', !isMuted);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 backdrop-blur-sm rounded-full p-3 shadow-lg border-2 border-pink-300">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMusic}
            className="p-2 rounded-full hover:bg-pink-200 transition-colors"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-pink-600" />
            ) : (
              <Play className="w-5 h-5 text-pink-600" />
            )}
          </button>
          
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-pink-200 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-500" />
            ) : (
              <Volume2 className="w-5 h-5 text-pink-600" />
            )}
          </button>
          
          <div className="text-sm text-pink-700 font-medium">
            🎵 {isPlaying ? 'Playing' : isLoaded ? 'Music' : 'Loading...'}
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        volume={0.3}
        onEnded={() => setIsPlaying(false)}
        onLoadedData={() => setIsLoaded(true)}
      >
        {/* Using a simple, soft background music that should work */}
        <source src="https://www.bensound.com/bensound-music/bensound-ukulele.mp3" type="audio/mpeg" />
        <source src="https://www.bensound.com/bensound-music/bensound-sunny.mp3" type="audio/mpeg" />
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+LyvmEaBS+m4/HTgC4FLYnU8tGELwQt" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

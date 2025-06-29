
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log('BackgroundMusic component rendered');
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          console.log('Playback failed - user interaction required');
        });
      }
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
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 backdrop-blur-sm rounded-full p-3 shadow-lg border-2 border-orange-300">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMusic}
            className="p-2 rounded-full hover:bg-orange-200 transition-colors"
            title={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-orange-600" />
            ) : (
              <Play className="w-5 h-5 text-orange-600" />
            )}
          </button>
          
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-orange-200 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-500" />
            ) : (
              <Volume2 className="w-5 h-5 text-orange-600" />
            )}
          </button>
          
          <div className="text-sm text-orange-700 font-medium">
            🎵 {isPlaying ? 'Playing' : 'Music'}
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      >
        {/* Using a gentle piano melody as placeholder - you can replace with Perfect by Ed Sheeran */}
        <source src="https://www.soundjay.com/misc/sounds/piano-harmonies-05.mp3" type="audio/mpeg" />
        <source src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-1/zapsplat_multimedia_game_sound_warm_happy_musical_tone_001_23839.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

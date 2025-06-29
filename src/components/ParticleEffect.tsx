
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  emoji: string;
}

interface ParticleEffectProps {
  show: boolean;
}

export const ParticleEffect = ({ show }: ParticleEffectProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!show) return;

    const emojis = ['🎉', '🎂', '🎈', '✨', '💖', '🌟', '🎁', '💫'];
    
    const createParticle = (id: number): Particle => ({
      id,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 50,
      vx: (Math.random() - 0.5) * 4,
      vy: -Math.random() * 8 - 4,
      life: 100,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    });

    const initialParticles = Array.from({ length: 30 }, (_, i) => createParticle(i));
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prev => {
        const updated = prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.1, // gravity
          life: particle.life - 1
        })).filter(particle => particle.life > 0 && particle.y < window.innerHeight + 100);

        // Add new particles occasionally
        if (Math.random() < 0.3 && updated.length < 50) {
          updated.push(createParticle(Date.now()));
        }

        return updated;
      });
    }, 50);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setParticles([]);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-2xl animate-bounce"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            opacity: particle.life / 100,
            transform: `scale(${particle.life / 100})`
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

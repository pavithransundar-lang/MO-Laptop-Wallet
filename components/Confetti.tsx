
import React, { useEffect, useState, useMemo } from 'react';

interface ConfettiProps {
  trigger: boolean;
  onComplete: () => void;
  count?: number;
  colors?: string[];
}

const defaultColors = ['#67E8F9', '#F472B6', '#A78BFA', '#FBBF24']; // teal, pink, purple, gold

export const Confetti: React.FC<ConfettiProps> = ({ trigger, onComplete, count = 50, colors = defaultColors }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trigger && !isAnimating) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onComplete();
      }, 3000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [trigger, isAnimating, onComplete]);

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      const style: React.CSSProperties = {
        position: 'absolute',
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        top: `${Math.random() * -200}%`,
        left: `${Math.random() * 100}%`,
        opacity: 0,
        transform: `rotate(${Math.random() * 360}deg)`,
        animation: isAnimating
          ? `confetti-fall ${Math.random() * 1 + 2}s ${Math.random() * 2}s ease-out forwards`
          : 'none',
      };
      return <div key={index} style={style} className="rounded-full" />;
    });
  }, [count, colors, isAnimating]);

  if (!isAnimating) return null;

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        {particles}
      </div>
    </>
  );
};

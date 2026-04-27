import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
}

const GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#________';

export default function GlitchText({ 
  text, 
  className = '',
  glitchInterval = 50 
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration / 3) return text[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );

      iteration += 1;
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, glitchInterval);

    return () => clearInterval(interval);
  }, [text, isGlitching, glitchInterval]);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onHoverStart={() => setIsGlitching(true)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <span className="relative z-10">{displayText}</span>
      
      <AnimatePresence>
        {isGlitching && (
          <>
            <motion.span
              className="absolute inset-0 text-cyan-500/50"
              initial={{ x: 0 }}
              animate={{ x: [-2, 2, -2, 0] }}
              exit={{ x: 0 }}
              transition={{ duration: 0.1, repeat: Infinity }}
              style={{ clipPath: 'inset(0 0 50% 0)' }}
            >
              {displayText}
            </motion.span>
            <motion.span
              className="absolute inset-0 text-red-500/50"
              initial={{ x: 0 }}
              animate={{ x: [2, -2, 2, 0] }}
              exit={{ x: 0 }}
              transition={{ duration: 0.1, repeat: Infinity }}
              style={{ clipPath: 'inset(50% 0 0 0)' }}
            >
              {displayText}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.span>
  );
}

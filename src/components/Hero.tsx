import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';
import GlitchText from './GlitchText';
import FloatingElement from './FloatingElement';

const ROLES = ['VFX Artist', 'Compositor', 'Motion Designer', 'Visual Effects'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        '.hero-char',
        { opacity: 0, y: 100, rotateX: 90 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1.2, 
          stagger: 0.05,
          ease: 'power4.out',
          delay: 0.3
        }
      );
      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(20px)', y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          y: 0, 
          scale: 1,
          duration: 1.2, 
          stagger: 0.15, 
          ease: 'power3.out' 
        },
        '-=0.8'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToShowreel = () => {
    const el = document.getElementById('showreel');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const nameChars = 'HAI LUONG'.split('');

  return (
    <section id="home" ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark cinematic background with vignette */}
      <div className="absolute inset-0 bg-bg-deep" />
      <div className="absolute inset-0 cinematic-vignette" />
      
      {/* Animated gradient orbs */}
      <FloatingElement className="absolute top-1/4 left-1/4 w-96 h-96 opacity-30" duration={8} range={40}>
        <div className="w-full h-full rounded-full bg-accent/20 blur-[100px]" />
      </FloatingElement>
      <FloatingElement className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-20" duration={10} delay={2} range={50}>
        <div className="w-full h-full rounded-full bg-accent/30 blur-[80px]" />
      </FloatingElement>
      
      {/* Subtle grid overlay */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(232, 164, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 164, 0, 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      {/* Floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <FloatingElement
          key={i}
          className="absolute"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          duration={3 + i * 0.5}
          delay={i * 0.3}
          range={15}
        >
          <Sparkles 
            size={12 + i * 2} 
            className="text-accent/30" 
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        </FloatingElement>
      ))}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center"
        style={{ opacity }}
      >
        {/* Animated role badge */}
        <motion.div 
          className="blur-in relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative px-6 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm mb-8">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span 
              key={roleIndex}
              className="relative text-xs text-accent uppercase tracking-[0.4em] font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {ROLES[roleIndex]}
            </motion.span>
          </div>
        </motion.div>

        {/* Animated name with character reveal */}
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display leading-[0.9] tracking-wide text-text-primary mb-6 text-glow" style={{ perspective: '1000px' }}>
          {nameChars.map((char, i) => (
            <motion.span
              key={i}
              className="hero-char inline-block"
              whileHover={{ 
                scale: 1.2, 
                color: '#e8a400',
                textShadow: '0 0 40px rgba(232, 164, 0, 0.8)',
                transition: { duration: 0.2 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        <p className="blur-in text-base md:text-lg text-muted mb-4 max-w-xl">
          VFX Compositor based in <GlitchText text="Ho Chi Minh City" className="text-accent" />
        </p>

        <motion.p 
          className="blur-in text-sm text-muted/70 max-w-md mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          5 years of experience in compositing, matchmoving, and visual effects. 
          Bringing imagination to life frame by frame.
        </motion.p>

        <MagneticButton
          onClick={scrollToShowreel}
          className="blur-in group relative flex items-center gap-3 px-8 py-4 rounded-full border-2 border-accent/50 hover:border-accent transition-all duration-500 overflow-hidden"
          strength={0.4}
        >
          {/* Animated background */}
          <motion.div 
            className="absolute inset-0 bg-accent/10"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ borderRadius: '100%', transformOrigin: 'center' }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          
          {/* Play icon with pulse */}
          <div className="relative w-10 h-10 rounded-full bg-accent flex items-center justify-center transition-all duration-300">
            <motion.div
              className="absolute inset-0 rounded-full bg-accent"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Play size={18} className="relative text-bg-deep ml-0.5" fill="currentColor" />
          </div>
          
          <span className="relative text-text-primary font-medium tracking-wide">
            Watch Showreel
          </span>
        </MagneticButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.span 
          className="text-xs text-muted uppercase tracking-[0.2em]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <div className="relative w-6 h-10 rounded-full border border-stroke flex justify-center pt-2">
          <motion.div 
            className="w-1 h-2 rounded-full bg-accent"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Decorative film frame corners with animation */}
      {[
        'top-8 left-8 border-l-2 border-t-2',
        'top-8 right-8 border-r-2 border-t-2',
        'bottom-8 left-8 border-l-2 border-b-2',
        'bottom-8 right-8 border-r-2 border-b-2',
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-16 h-16 ${pos} border-accent/30`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
        />
      ))}
    </section>
  );
}

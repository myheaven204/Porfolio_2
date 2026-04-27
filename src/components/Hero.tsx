import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.4, delay: 0.2, ease: 'power3.out' }
      );
      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' },
        '-=1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToShowreel = () => {
    const el = document.getElementById('showreel');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark cinematic background with vignette */}
      <div className="absolute inset-0 bg-bg-deep" />
      <div className="absolute inset-0 cinematic-vignette" />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(232, 164, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 164, 0, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <p className="blur-in text-xs text-accent uppercase tracking-[0.4em] mb-8 font-medium">
          VFX Artist
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-[10rem] font-display leading-[0.9] tracking-wide text-text-primary mb-6 text-glow">
          HAI LUONG
        </h1>

        <p className="blur-in text-base md:text-lg text-muted mb-4 max-w-xl">
          VFX Compositor based in <span className="text-accent">Ho Chi Minh City</span>
        </p>

        <p className="blur-in text-sm text-muted/70 max-w-md mb-12">
          5 years of experience in compositing, matchmoving, and visual effects. 
          Bringing imagination to life frame by frame.
        </p>

        <motion.button
          onClick={scrollToShowreel}
          className="blur-in group relative flex items-center gap-3 px-8 py-4 rounded-full border-2 border-accent/50 hover:border-accent transition-all duration-500 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Play icon */}
          <div className="relative w-10 h-10 rounded-full bg-accent flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-300">
            <Play size={18} className="text-bg-deep ml-0.5" fill="currentColor" />
          </div>
          
          <span className="relative text-text-primary font-medium tracking-wide">
            Watch Showreel
          </span>
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="relative w-px h-12 bg-stroke overflow-hidden">
          <div className="absolute inset-0 animate-scroll-down bg-accent" />
        </div>
      </div>

      {/* Decorative film frame corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-accent/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-accent/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent/30" />
    </section>
  );
}

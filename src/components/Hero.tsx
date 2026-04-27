import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import HeroVideo from './HeroVideo';

const ROLES = ['Creative', 'Fullstack', 'Founder', 'Scholar'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1, ease: 'power3.out' }
      );
      tl.fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
        '-=0.9'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(i => (i + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" ref={sectionRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <HeroVideo overlay="bg-black/20" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          COLLECTION '26
        </p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Michael Smith
        </h1>

        <p className="blur-in text-sm md:text-base text-muted mb-4">
          A{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              className="font-display italic text-text-primary inline-block animate-role-fade-in"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>{' '}
          lives in Chicago.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        <div className="blur-in inline-flex gap-4 flex-wrap justify-center">
          {/* See Works */}
          <button className="relative group rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg font-medium hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient" />
            <span className="absolute inset-[2px] rounded-full bg-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 group-hover:text-text-primary transition-colors duration-300">See Works</span>
          </button>

          {/* Reach out */}
          <button className="relative group rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary font-medium hover:scale-105 hover:border-transparent transition-all duration-300">
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient -z-10" />
            <span className="absolute inset-[2px] rounded-full bg-bg z-0 group-hover:opacity-100" />
            <span className="relative z-10">Reach out...</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute inset-0 animate-scroll-down" style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }} />
        </div>
      </div>
    </section>
  );
}

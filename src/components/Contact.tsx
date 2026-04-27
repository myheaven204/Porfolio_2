import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import HeroVideo from './HeroVideo';

const SOCIALS = ['Twitter', 'LinkedIn', 'Dribbble', 'GitHub'];
const MARQUEE_TEXT = 'BUILDING THE FUTURE • ';

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    return () => tween.kill();
  }, []);

  return (
    <footer id="contact" className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden relative">
      {/* Background video */}
      <div className="absolute inset-0">
        <HeroVideo flip overlay="bg-black/60" />
      </div>

      {/* Fade top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent z-10 pointer-events-none" />

      <div className="relative z-20">
        {/* Marquee */}
        <div className="overflow-hidden mb-16 md:mb-24">
          <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: 'max-content' }}>
            {Array.from({ length: 20 }, (_, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/20 select-none px-4"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center px-6 mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Let's Talk</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary mb-10 leading-[0.9]">
            Have a project?
          </h2>
          <a
            href="mailto:hello@michaelsmith.com"
            className="inline-flex items-center gap-2 text-base text-text-primary group relative rounded-full px-8 py-4 border border-stroke hover:border-transparent transition-all duration-300"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient" />
            <span className="absolute inset-[1px] rounded-full bg-bg/80" />
            <span className="relative z-10">hello@michaelsmith.com</span>
          </a>
        </motion.div>

        {/* Footer bar */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="border-t border-stroke pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Socials */}
            <div className="flex items-center gap-6">
              {SOCIALS.map(social => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-muted hover:text-text-primary transition-colors duration-200 uppercase tracking-[0.15em]"
                >
                  {social}
                </a>
              ))}
            </div>

            {/* Available dot */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-muted">Available for projects</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

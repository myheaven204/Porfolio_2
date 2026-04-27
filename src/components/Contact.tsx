import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, Video, Palette } from 'lucide-react';

const SOCIALS = [
  { name: 'LinkedIn', icon: <Linkedin size={18} />, url: 'https://linkedin.com' },
  { name: 'ArtStation', icon: <Palette size={18} />, url: 'https://artstation.com' },
  { name: 'Instagram', icon: <Instagram size={18} />, url: 'https://instagram.com' },
  { name: 'Vimeo', icon: <Video size={18} />, url: 'https://vimeo.com' },
];

const MARQUEE_TEXT = 'AVAILABLE FOR FREELANCE ';

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    return () => tween.kill();
  }, []);

  return (
    <footer id="contact" className="bg-bg-deep pt-20 md:pt-32 pb-8 overflow-hidden relative">
      {/* Cinematic vignette */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(232, 164, 0, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 164, 0, 0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10">
        {/* Marquee */}
        <div className="overflow-hidden mb-16 md:mb-24 border-y border-stroke/30 py-4">
          <div ref={marqueeRef} className="flex whitespace-nowrap" style={{ width: 'max-content' }}>
            {Array.from({ length: 20 }, (_, i) => (
              <span
                key={i}
                className="text-4xl md:text-6xl lg:text-7xl font-display text-accent/20 select-none px-4"
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
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-accent/50" />
            <span className="text-xs text-accent uppercase tracking-[0.4em] font-medium">Get in Touch</span>
            <div className="w-12 h-px bg-accent/50" />
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-text-primary mb-6 tracking-wide">
            LET&apos;S CREATE
          </h2>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-display text-accent mb-10 tracking-wide">
            SOMETHING EPIC
          </h3>

          <p className="text-muted max-w-md mx-auto mb-10">
            Have a project in mind? Looking for a VFX artist to bring your vision to life? 
            I&apos;d love to hear from you.
          </p>

          <a
            href="mailto:alex@vfxartist.com"
            className="group inline-flex items-center gap-3 text-lg text-text-primary relative rounded-full px-8 py-4 border-2 border-accent/50 hover:border-accent transition-all duration-300"
          >
            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <Mail size={20} className="text-accent" />
            <span className="relative z-10">alex@vfxartist.com</span>
          </a>
        </motion.div>

        {/* Footer bar */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="border-t border-stroke pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Socials */}
            <div className="flex items-center gap-4">
              {SOCIALS.map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-stroke hover:border-accent/50 text-muted hover:text-accent transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-6 text-xs text-muted">
              <span>&copy; 2026 Alex Chen</span>
              <span className="w-1 h-1 rounded-full bg-stroke" />
              <span>VFX Artist</span>
            </div>

            {/* Available status */}
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

      {/* Decorative film frame */}
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent/20" />
    </footer>
  );
}

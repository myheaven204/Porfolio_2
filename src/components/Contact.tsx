import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, Video, Palette, ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

const SOCIALS = [
  { name: 'LinkedIn', icon: <Linkedin size={18} />, url: 'https://linkedin.com', color: '#0A66C2' },
  { name: 'ArtStation', icon: <Palette size={18} />, url: 'https://artstation.com', color: '#13AFF0' },
  { name: 'Instagram', icon: <Instagram size={18} />, url: 'https://instagram.com', color: '#E4405F' },
  { name: 'Vimeo', icon: <Video size={18} />, url: 'https://vimeo.com', color: '#1AB7EA' },
];

const MARQUEE_TEXT = 'AVAILABLE FOR FREELANCE ';

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(232, 164, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(232, 164, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(232, 164, 0, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Cinematic vignette */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none" />
      
      {/* Subtle grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(232, 164, 0, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232, 164, 0, 0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Mouse follower glow */}
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232, 164, 0, 0.1) 0%, transparent 70%)',
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
      />

      <div className="relative z-10">
        {/* Marquee with hover effect */}
        <motion.div 
          className="overflow-hidden mb-16 md:mb-24 border-y border-stroke/30 py-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            ref={marqueeRef} 
            className="flex whitespace-nowrap" 
            style={{ width: 'max-content' }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {Array.from({ length: 20 }, (_, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-6xl lg:text-7xl font-display text-accent/20 select-none px-4"
                whileHover={{ 
                  color: 'rgba(232, 164, 0, 0.6)',
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {MARQUEE_TEXT}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center px-6 mb-16 md:mb-24"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div 
              className="w-12 h-px bg-accent/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            <span className="text-xs text-accent uppercase tracking-[0.4em] font-medium">Get in Touch</span>
            <motion.div 
              className="w-12 h-px bg-accent/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
          
          {/* Animated title with letter reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h2 
              className="text-5xl md:text-7xl lg:text-8xl font-display text-text-primary tracking-wide"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {"LET'S CREATE".split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  whileHover={{ 
                    y: -10, 
                    color: '#e8a400',
                    transition: { duration: 0.2 }
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h2>
          </div>
          
          <div className="overflow-hidden mb-10">
            <motion.h3 
              className="text-4xl md:text-6xl lg:text-7xl font-display text-accent tracking-wide"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {"SOMETHING EPIC".split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  animate={{ 
                    textShadow: [
                      '0 0 20px rgba(232, 164, 0, 0)',
                      '0 0 20px rgba(232, 164, 0, 0.5)',
                      '0 0 20px rgba(232, 164, 0, 0)',
                    ]
                  }}
                  transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h3>
          </div>

          <motion.p 
            className="text-muted max-w-md mx-auto mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Have a project in mind? Looking for a VFX artist to bring your vision to life? 
            I&apos;d love to hear from you.
          </motion.p>

          {/* Magnetic email button */}
          <MagneticButton
            className="group relative inline-flex items-center gap-3 text-lg text-text-primary rounded-full px-8 py-4 border-2 border-accent/50 hover:border-accent overflow-hidden"
            strength={0.3}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            
            <Mail size={20} className="relative z-10 text-accent group-hover:text-bg-deep transition-colors" />
            <span className="relative z-10 group-hover:text-bg-deep transition-colors">hailuong.vfx@gmail.com</span>
            <ArrowUpRight size={16} className="relative z-10 opacity-0 group-hover:opacity-100 text-bg-deep transition-all -ml-4 group-hover:ml-0" />
          </MagneticButton>
        </motion.div>

        {/* Footer bar */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div 
            className="border-t border-stroke pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Socials with hover effects */}
            <div className="flex items-center gap-4">
              {SOCIALS.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative p-3 rounded-full border border-stroke text-muted overflow-hidden"
                  aria-label={social.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, type: 'spring', bounce: 0.4 }}
                  whileHover={{ scale: 1.1, borderColor: social.color }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setHoveredSocial(i)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  {/* Background fill on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: social.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: hoveredSocial === i ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span 
                    className="relative z-10 transition-colors"
                    style={{ color: hoveredSocial === i ? '#ffffff' : undefined }}
                  >
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Copyright with animation */}
            <motion.div 
              className="flex items-center gap-6 text-xs text-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span>&copy; 2026 Hai Luong</span>
              <motion.span 
                className="w-1 h-1 rounded-full bg-accent"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>VFX Compositor</span>
            </motion.div>

            {/* Available status with pulse */}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="relative flex h-2 w-2">
                <motion.span 
                  className="absolute inline-flex h-full w-full rounded-full bg-green-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-muted">Available for projects</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative film frame with animation */}
      {[
        'bottom-8 left-8 border-l-2 border-b-2',
        'bottom-8 right-8 border-r-2 border-b-2',
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute w-16 h-16 ${pos} border-accent/20`}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
        />
      ))}
    </footer>
  );
}

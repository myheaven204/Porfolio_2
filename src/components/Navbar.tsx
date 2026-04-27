import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'Breakdown', id: 'breakdown' },
  { label: 'Skills', id: 'skills' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className={`relative inline-flex items-center rounded-full backdrop-blur-md border border-stroke/50 px-2 py-2 transition-all duration-500 ${
          scrolled ? 'shadow-lg shadow-black/30 bg-bg/95 border-accent/20' : 'bg-bg/80'
        }`}
        layout
      >
        {/* Animated background glow when scrolled */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              className="absolute inset-0 rounded-full bg-accent/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Logo with magnetic effect */}
        <motion.button
          onClick={() => scrollTo('home')}
          className="relative w-9 h-9 rounded-full flex items-center justify-center group overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated background */}
          <motion.div 
            className="absolute inset-0 bg-accent"
            animate={{ 
              boxShadow: scrolled 
                ? '0 0 20px rgba(232, 164, 0, 0.5)' 
                : '0 0 0px rgba(232, 164, 0, 0)'
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Ripple effect on hover */}
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            initial={{ scale: 0, opacity: 0.5 }}
            whileHover={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          
          <span className="relative z-10 font-display text-sm text-bg-deep tracking-wider">
            HL
          </span>
        </motion.button>

        {/* Divider */}
        <motion.div 
          className="hidden sm:block w-px h-5 bg-stroke mx-2"
          animate={{ opacity: scrolled ? 0.5 : 0.3 }}
        />

        {/* Nav links with hover effects */}
        <div className="relative flex">
          {NAV_LINKS.map((link, i) => (
            <motion.button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200"
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {/* Active/Hover background indicator */}
              {(activeSection === link.id || hoveredLink === link.id) && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: activeSection === link.id ? 'rgba(232, 164, 0, 0.15)' : 'rgba(232, 164, 0, 0.08)',
                  }}
                  layoutId="navIndicator"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <span 
                className={`relative z-10 transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'text-accent'
                    : hoveredLink === link.id
                    ? 'text-text-primary'
                    : 'text-muted'
                }`}
              >
                {link.label}
              </span>
              
              {/* Active dot indicator */}
              {activeSection === link.id && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-accent"
                  layoutId="activeDot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Divider */}
        <motion.div 
          className="hidden sm:block w-px h-5 bg-stroke mx-2"
          animate={{ opacity: scrolled ? 0.5 : 0.3 }}
        />

        {/* Hire me button with effects */}
        <motion.a
          href="mailto:hailuong.vfx@gmail.com"
          className="relative text-xs sm:text-sm rounded-full px-4 py-2 bg-accent text-bg-deep font-medium overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          
          {/* Pulse glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ 
              boxShadow: [
                '0 0 0px rgba(232, 164, 0, 0)',
                '0 0 20px rgba(232, 164, 0, 0.5)',
                '0 0 0px rgba(232, 164, 0, 0)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <span className="relative z-10">Hire Me</span>
        </motion.a>
      </motion.div>
    </motion.nav>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
    >
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-stroke/50 bg-bg/80 px-2 py-2 transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-black/20 bg-bg/95' : ''
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="relative w-9 h-9 rounded-full flex items-center justify-center group overflow-hidden"
        >
          <div className="absolute inset-0 bg-accent opacity-100 group-hover:opacity-90 transition-opacity duration-300" />
          <span className="relative z-10 font-display text-sm text-bg-deep tracking-wider">
            HL
          </span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* Nav links */}
        {NAV_LINKS.map(link => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 ${
              activeSection === link.id
                ? 'text-accent bg-accent/10'
                : 'text-muted hover:text-text-primary'
            }`}
          >
            {link.label}
          </button>
        ))}

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* Hire me button */}
        <a
          href="mailto:hailuong.vfx@gmail.com"
          className="relative text-xs sm:text-sm rounded-full px-4 py-2 bg-accent text-bg-deep font-medium hover:bg-accent-light transition-colors duration-300"
        >
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}

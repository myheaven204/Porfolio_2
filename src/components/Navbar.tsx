import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = ['Home', 'Work', 'Resume'];

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
    const el = document.getElementById(id.toLowerCase());
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
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="relative w-9 h-9 rounded-full flex items-center justify-center group"
        >
          <span className="absolute inset-0 rounded-full accent-gradient opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)',
            }}
          />
          <span className="relative z-10 w-[30px] h-[30px] bg-bg rounded-full flex items-center justify-center font-display italic text-[13px] text-text-primary group-hover:scale-110 transition-transform duration-300">
            JA
          </span>
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        {NAV_LINKS.map(link => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 ${
              activeSection === link.toLowerCase()
                ? 'text-text-primary bg-stroke/50'
                : 'text-muted hover:text-text-primary hover:bg-stroke/50'
            }`}
          >
            {link}
          </button>
        ))}

        {/* Divider */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi button */}
        <a
          href="mailto:hello@michaelsmith.com"
          className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary transition-colors duration-200 group"
        >
          <span
            className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient"
          />
          <span className="relative z-10 flex items-center gap-1 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md -mx-3 sm:-mx-4 -my-1.5 sm:-my-2">
            Say hi ↗
          </span>
        </a>
      </div>
    </motion.nav>
  );
}

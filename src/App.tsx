import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import Contact from './components/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'work', 'journal', 'explorations', 'stats', 'contact'];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Navbar activeSection={activeSection} />
          <main>
            <Hero />
            <Works />
            <Journal />
            <Explorations />
            <Stats />
            <Contact />
          </main>
        </motion.div>
      )}
    </>
  );
}

export default App;

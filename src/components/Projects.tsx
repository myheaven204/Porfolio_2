import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Film, Tv, Gamepad2 } from 'lucide-react';

type Category = 'All' | 'Film' | 'Commercial' | 'Game';

const CATEGORIES: { label: Category; icon: React.ReactNode }[] = [
  { label: 'All', icon: null },
  { label: 'Film', icon: <Film size={14} /> },
  { label: 'Commercial', icon: <Tv size={14} /> },
  { label: 'Game', icon: <Gamepad2 size={14} /> },
];

const PROJECTS = [
  {
    title: 'Stellar Odyssey',
    category: 'Film' as Category,
    role: 'Lead FX Artist',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    year: '2026',
  },
  {
    title: 'Aether Dynamics',
    category: 'Commercial' as Category,
    role: 'Compositing Lead',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    year: '2025',
  },
  {
    title: 'Neon Horizon',
    category: 'Game' as Category,
    role: 'Cinematic VFX',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    year: '2025',
  },
  {
    title: 'The Last Signal',
    category: 'Film' as Category,
    role: 'Environment TD',
    image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80',
    year: '2024',
  },
  {
    title: 'Quantum Drive',
    category: 'Commercial' as Category,
    role: 'FX Supervisor',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
    year: '2024',
  },
  {
    title: 'Phantom Protocol',
    category: 'Game' as Category,
    role: 'VFX Artist',
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80',
    year: '2024',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="work" className="bg-bg py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent/50" />
              <span className="text-xs text-accent uppercase tracking-[0.4em] font-medium">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary tracking-wide">
              PROJECTS
            </h2>
            <p className="text-sm text-muted mt-4 max-w-md">
              A curated selection of VFX work across film, commercials, and game cinematics.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === label
                    ? 'bg-accent text-bg-deep font-medium'
                    : 'bg-surface border border-stroke text-muted hover:text-text-primary hover:border-accent/50'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative rounded-xl overflow-hidden bg-surface border border-stroke cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-accent font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* View button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-bg-deep font-medium text-sm">
                      View Project <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-display text-text-primary tracking-wide group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted mt-1">{project.role}</p>
                    </div>
                    <span className="text-xs text-muted/60 font-mono">{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

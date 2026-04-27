import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Film, Tv, Gamepad2, ChevronDown } from 'lucide-react';

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
    description: 'Epic space adventure with massive destruction sequences and nebula environments.',
  },
  {
    title: 'Aether Dynamics',
    category: 'Commercial' as Category,
    role: 'Compositing Lead',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    year: '2025',
    description: 'High-end automotive commercial with fluid simulations and particle systems.',
  },
  {
    title: 'Neon Horizon',
    category: 'Game' as Category,
    role: 'Cinematic VFX',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    year: '2025',
    description: 'Cyberpunk game cinematics featuring holographic effects and neon environments.',
  },
  {
    title: 'The Last Signal',
    category: 'Film' as Category,
    role: 'Environment TD',
    image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80',
    year: '2024',
    description: 'Sci-fi thriller with alien planet environments and atmospheric effects.',
  },
  {
    title: 'Quantum Drive',
    category: 'Commercial' as Category,
    role: 'FX Supervisor',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
    year: '2024',
    description: 'Tech product launch with abstract particle simulations and light trails.',
  },
  {
    title: 'Phantom Protocol',
    category: 'Game' as Category,
    role: 'VFX Artist',
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80',
    year: '2024',
    description: 'Action game with explosive effects, magic systems, and environmental destruction.',
  },
  {
    title: 'Crimson Eclipse',
    category: 'Film' as Category,
    role: 'Senior FX Artist',
    image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&q=80',
    year: '2024',
    description: 'Fantasy epic featuring fire and water simulations with magical creatures.',
  },
  {
    title: 'Aurora Motors',
    category: 'Commercial' as Category,
    role: 'Lead Compositor',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
    year: '2024',
    description: 'Luxury car reveal with dynamic lighting, reflections, and environment integration.',
  },
  {
    title: 'Echoes of War',
    category: 'Game' as Category,
    role: 'FX Lead',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    year: '2023',
    description: 'Military FPS cinematics with realistic explosions and debris simulations.',
  },
  {
    title: 'Nebula Rising',
    category: 'Film' as Category,
    role: 'FX Artist',
    image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&q=80',
    year: '2023',
    description: 'Space opera with volumetric nebulae, asteroid fields, and ship destruction.',
  },
  {
    title: 'Titan Energy',
    category: 'Commercial' as Category,
    role: 'VFX Artist',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    year: '2023',
    description: 'Energy drink commercial with electric arcs, plasma effects, and speed trails.',
  },
  {
    title: 'Realm of Shadows',
    category: 'Game' as Category,
    role: 'Cinematic Artist',
    image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80',
    year: '2023',
    description: 'Dark fantasy game with smoke, fog, and ethereal magic effects.',
  },
  {
    title: 'Arctic Expedition',
    category: 'Film' as Category,
    role: 'Environment FX',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    year: '2023',
    description: 'Survival thriller with blizzard simulations, ice fracturing, and aurora effects.',
  },
  {
    title: 'Velocity X',
    category: 'Commercial' as Category,
    role: 'Motion Graphics',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    year: '2022',
    description: 'Sports brand campaign with dynamic motion trails and impact effects.',
  },
  {
    title: 'Eternal Conquest',
    category: 'Game' as Category,
    role: 'Senior VFX',
    image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&q=80',
    year: '2022',
    description: 'Strategy game cinematics with large-scale battle effects and magic systems.',
  },
  {
    title: 'Deep Impact',
    category: 'Film' as Category,
    role: 'Destruction FX',
    image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80',
    year: '2022',
    description: 'Disaster film with building collapses, floods, and pyrotechnic simulations.',
  },
  {
    title: 'Luxe Cosmetics',
    category: 'Commercial' as Category,
    role: 'Beauty VFX',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    year: '2022',
    description: 'High-end beauty campaign with liquid simulations and product visualization.',
  },
  {
    title: 'Cyber Nexus',
    category: 'Game' as Category,
    role: 'Tech VFX',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    year: '2022',
    description: 'Hacking game with digital glitch effects, data streams, and UI animations.',
  },
];

const ITEMS_PER_PAGE = 6;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredProjects.length));
  };

  return (
    <section id="work" className="bg-bg py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <motion.div 
              className="flex items-center gap-4 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="w-12 h-px bg-accent/50"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
              <span className="text-xs text-accent uppercase tracking-[0.4em] font-medium">Selected Work</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary tracking-wide overflow-hidden">
              <motion.span 
                className="inline-block"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                PROJECTS
              </motion.span>
            </h2>
            <motion.p 
              className="text-sm text-muted mt-4 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              A curated selection of VFX work across film, commercials, and game cinematics.
            </motion.p>
          </div>

          {/* Category filters */}
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {CATEGORIES.map(({ label, icon }, i) => (
              <motion.button
                key={label}
                onClick={() => handleCategoryChange(label)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 overflow-hidden ${
                  activeCategory === label
                    ? 'bg-accent text-bg-deep font-medium'
                    : 'bg-surface border border-stroke text-muted hover:text-text-primary hover:border-accent/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {activeCategory === label && (
                  <motion.div
                    className="absolute inset-0 bg-accent"
                    layoutId="activeCategory"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {icon}
                  {label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.6, 
                    delay: isInView ? i * 0.1 : 0,
                    ease: [0.25, 0.1, 0.25, 1]
                  }
                }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-xl overflow-hidden bg-surface border border-stroke cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ 
                      scale: hoveredIndex === i ? 1.15 : 1,
                      filter: hoveredIndex === i ? 'brightness(0.7)' : 'brightness(1)'
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Category badge */}
                  <motion.div 
                    className="absolute top-4 left-4 z-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-accent font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Hover overlay with reveal animation */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* View button with magnetic effect */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: hoveredIndex === i ? 1 : 0,
                      scale: hoveredIndex === i ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3, type: 'spring', bounce: 0.4 }}
                  >
                    <motion.div 
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-bg-deep font-medium text-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Project 
                      <motion.span
                        animate={{ x: hoveredIndex === i ? [0, 4, 0] : 0 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      >
                        <ArrowUpRight size={14} />
                      </motion.span>
                    </motion.div>
                  </motion.div>

                  {/* Animated border on hover */}
                  <motion.div
                    className="absolute inset-0 border-2 border-accent/0 rounded-xl"
                    animate={{ borderColor: hoveredIndex === i ? 'rgba(232, 164, 0, 0.3)' : 'rgba(232, 164, 0, 0)' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <motion.h3 
                        className="text-lg font-display text-text-primary tracking-wide"
                        animate={{ color: hoveredIndex === i ? '#e8a400' : '#f5f5f5' }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-sm text-muted mt-1">{project.role}</p>
                    </div>
                    <motion.span 
                      className="text-xs text-muted/60 font-mono"
                      animate={{ opacity: hoveredIndex === i ? 1 : 0.6 }}
                    >
                      {project.year}
                    </motion.span>
                  </div>
                  <motion.p 
                    className="text-xs text-muted/80 mt-3 line-clamp-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredIndex === i ? 1 : 0.7,
                      height: 'auto'
                    }}
                  >
                    {project.description}
                  </motion.p>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformOrigin: 'left' }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={loadMore}
              className="group relative flex items-center gap-3 px-8 py-4 rounded-full border border-stroke bg-surface overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <span className="relative z-10 text-sm font-medium tracking-wide group-hover:text-bg-deep transition-colors">
                Load More Projects
              </span>
              <span className="relative z-10 text-xs text-muted group-hover:text-bg-deep/70 transition-colors">
                ({filteredProjects.length - visibleCount} remaining)
              </span>
              <motion.span
                className="relative z-10"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ChevronDown size={16} className="group-hover:text-bg-deep transition-colors" />
              </motion.span>
            </motion.button>
          </motion.div>
        )}

        {/* Project Count */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-muted/60">
            Showing <span className="text-accent">{displayedProjects.length}</span> of <span className="text-accent">{filteredProjects.length}</span> projects
          </p>
        </motion.div>
      </div>
    </section>
  );
}

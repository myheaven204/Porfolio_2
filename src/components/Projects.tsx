import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, Film, Tv, Gamepad2, ChevronDown } from 'lucide-react';
import { PROJECTS, Category } from '../data/projects';

type FilterCategory = 'All' | Category;

const CATEGORIES: { label: FilterCategory; icon: React.ReactNode }[] = [
  { label: 'All', icon: null },
  { label: 'Film', icon: <Film size={14} /> },
  { label: 'Commercial', icon: <Tv size={14} /> },
  { label: 'Game', icon: <Gamepad2 size={14} /> },
];

const ITEMS_PER_PAGE = 6;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleCategoryChange = (category: FilterCategory) => {
    setActiveCategory(category);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredProjects.length));
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
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
                key={project.id}
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
                onClick={() => handleProjectClick(project.id)}
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

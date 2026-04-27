import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SOFTWARE = [
  {
    name: 'After Effects',
    category: 'Motion Graphics & VFX',
    level: 90,
    description: 'Compositing, motion design, and visual effects',
    color: '#9999FF',
  },
  {
    name: 'PFtrack',
    category: 'Matchmove & Tracking',
    level: 80,
    description: '3D camera tracking and object tracking',
    color: '#FF6B6B',
  },
  {
    name: 'Premiere Pro',
    category: 'Video Editing',
    level: 70,
    description: 'Video editing and post-production',
    color: '#9999FF',
  },
  {
    name: 'Photoshop',
    category: 'Image Editing',
    level: 60,
    description: 'Photo manipulation and texture work',
    color: '#31A8FF',
  },
];

export default function Skills() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <section id="skills" className="bg-bg py-24 md:py-32 border-t border-stroke overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div 
              className="w-12 h-px bg-accent/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
            <span className="text-xs text-accent uppercase tracking-[0.4em] font-medium">Expertise</span>
            <motion.div 
              className="w-12 h-px bg-accent/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary tracking-wide"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              SKILLS & SOFTWARE
            </motion.h2>
          </div>
          <motion.p 
            className="text-sm text-muted mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            Industry-standard tools and techniques honed through years of experience in film and commercial VFX.
          </motion.p>
        </motion.div>

        {/* Software grid with interactive cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOFTWARE.map((software, i) => (
            <motion.div
              key={software.name}
              className="group relative"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              onMouseEnter={() => {
                setActiveIndex(i);
                setHoveredSkill(i);
              }}
              onMouseLeave={() => {
                setActiveIndex(null);
                setHoveredSkill(null);
              }}
            >
              <motion.div
                className="relative p-6 rounded-xl bg-surface border border-stroke overflow-hidden cursor-pointer h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${software.color}20 0%, transparent 70%)`,
                  }}
                  animate={{ opacity: hoveredSkill === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Glowing border effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${software.color}`,
                    opacity: 0,
                  }}
                  animate={{ opacity: hoveredSkill === i ? 0.5 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Header */}
                <div className="relative flex items-start justify-between mb-4">
                  <div>
                    <motion.h3 
                      className="text-xl font-display text-text-primary tracking-wide"
                      animate={{ color: hoveredSkill === i ? software.color : '#f5f5f5' }}
                      transition={{ duration: 0.3 }}
                    >
                      {software.name}
                    </motion.h3>
                    <span className="text-xs text-accent uppercase tracking-wider">{software.category}</span>
                  </div>
                  
                  {/* Animated percentage */}
                  <motion.div 
                    className="relative"
                    animate={{ scale: hoveredSkill === i ? 1.2 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span 
                      className="text-2xl font-display transition-colors duration-300"
                      style={{ color: hoveredSkill === i ? software.color : '#8c8c8c' }}
                    >
                      {software.level}%
                    </span>
                  </motion.div>
                </div>

                {/* Animated progress bar */}
                <div className="relative h-2 bg-stroke rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: software.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${software.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: i * 0.2 }}
                  />
                  
                  {/* Glowing dot at the end */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: software.color,
                      boxShadow: `0 0 10px ${software.color}, 0 0 20px ${software.color}`,
                      left: `${software.level}%`,
                      marginLeft: '-6px',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.15 }}
                    animate={{
                      scale: hoveredSkill === i ? [1, 1.5, 1] : 1,
                    }}
                  />
                </div>

                {/* Description with reveal animation */}
                <motion.p 
                  className="relative text-sm text-muted/70"
                  animate={{ opacity: hoveredSkill === i ? 1 : 0.7 }}
                >
                  {software.description}
                </motion.p>

                {/* Corner accents */}
                <motion.div
                  className="absolute top-2 right-2 w-4 h-4 border-t border-r"
                  style={{ borderColor: software.color }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: hoveredSkill === i ? 0.5 : 0,
                    scale: hoveredSkill === i ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-4 h-4 border-b border-l"
                  style={{ borderColor: software.color }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: hoveredSkill === i ? 0.5 : 0,
                    scale: hoveredSkill === i ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Interactive skill showcase */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              className="mt-12 p-8 rounded-2xl bg-surface/50 border border-stroke backdrop-blur-sm"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-6">
                <motion.div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: SOFTWARE[activeIndex].color + '20' }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span 
                    className="text-3xl font-display"
                    style={{ color: SOFTWARE[activeIndex].color }}
                  >
                    {SOFTWARE[activeIndex].level}
                  </span>
                </motion.div>
                <div>
                  <h4 
                    className="text-2xl font-display"
                    style={{ color: SOFTWARE[activeIndex].color }}
                  >
                    {SOFTWARE[activeIndex].name}
                  </h4>
                  <p className="text-muted">{SOFTWARE[activeIndex].description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Film, Users, Briefcase } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: <Film size={20} />, value: '50+', label: 'Projects Completed', color: '#e8a400' },
  { icon: <Users size={20} />, value: '20+', label: 'Clients', color: '#00d4ff' },
  { icon: <Briefcase size={20} />, value: '5', label: 'Years Experience', color: '#ff6b6b' },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={containerRef} className="bg-bg-deep py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo side with parallax */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-accent/10 blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-accent/5 blur-3xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Main photo with parallax */}
            <motion.div 
              className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              style={{ y: imageY }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Hai Luong - VFX Compositor"
                className="absolute inset-0 w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent" />
              
              {/* Animated film frame overlay */}
              <motion.div 
                className="absolute inset-4 border border-accent/20 rounded-xl pointer-events-none"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />
              
              {/* Scanning effect */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-accent/30"
                initial={{ top: '0%' }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ boxShadow: '0 0 10px rgba(232, 164, 0, 0.3)' }}
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 md:bottom-8 md:right-8 p-4 rounded-xl bg-surface/80 backdrop-blur-md border border-stroke"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: 'spring', bounce: 0.4 }}
              whileHover={{ scale: 1.05, rotate: 3 }}
            >
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-3 h-3 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-sm text-text-primary font-medium">Available for hire</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content side with parallax */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
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
              <span className="text-xs text-accent uppercase tracking-[0.4em] font-medium">About Me</span>
            </motion.div>
            
            {/* Animated title */}
            <div className="overflow-hidden mb-6">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary tracking-wide"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                HAI LUONG
              </motion.h2>
            </div>

            {/* Paragraphs with stagger animation */}
            {[
              <>A passionate VFX Compositor with <span className="text-accent">5 years of experience</span> in compositing, matchmoving, and visual effects for film and commercial projects.</>,
              'Based in Ho Chi Minh City, Vietnam. I specialize in compositing with After Effects, camera tracking with PFtrack, and video editing with Premiere Pro.',
              "I'm dedicated to delivering high-quality visual effects that seamlessly blend with live-action footage, bringing creative visions to life.",
            ].map((text, i) => (
              <motion.p
                key={i}
                className={`text-muted leading-relaxed ${i === 0 ? 'text-lg mb-6' : 'mb-8'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                {text}
              </motion.p>
            ))}

            {/* Stats grid with hover effects */}
            <div className="grid grid-cols-3 gap-4">
              {HIGHLIGHTS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="relative p-4 rounded-xl bg-surface border border-stroke text-center overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ y: -5, borderColor: stat.color }}
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  {/* Background glow on hover */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${stat.color}15 0%, transparent 70%)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredStat === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon with animation */}
                  <motion.div 
                    className="relative inline-flex items-center justify-center w-10 h-10 rounded-full mb-3"
                    style={{ backgroundColor: stat.color + '20' }}
                    animate={{ 
                      rotate: hoveredStat === i ? [0, -10, 10, 0] : 0,
                      scale: hoveredStat === i ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <span style={{ color: stat.color }}>{stat.icon}</span>
                  </motion.div>
                  
                  {/* Animated counter */}
                  <motion.div 
                    className="relative text-2xl font-display"
                    style={{ color: hoveredStat === i ? stat.color : '#f5f5f5' }}
                    animate={{ scale: hoveredStat === i ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="relative text-xs text-muted uppercase tracking-wider">{stat.label}</div>

                  {/* Bottom accent line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: stat.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredStat === i ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

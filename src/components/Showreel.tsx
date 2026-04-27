import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section id="showreel" ref={containerRef} className="relative bg-bg-deep py-24 md:py-32 overflow-hidden">
      {/* Cinematic letterbox bars */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-8 bg-black z-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-8 bg-black z-20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
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
            <motion.span 
              className="text-xs text-accent uppercase tracking-[0.4em] font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Showreel 2026
            </motion.span>
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
              LATEST WORK
            </motion.h2>
          </div>
        </motion.div>

        {/* Video Container with parallax */}
        <motion.div
          className="relative w-full aspect-[2.39/1] bg-black rounded-lg overflow-hidden group"
          style={{ scale, opacity }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-lg z-10 pointer-events-none"
            animate={{
              boxShadow: isHovered 
                ? 'inset 0 0 0 2px rgba(232, 164, 0, 0.5), 0 0 60px rgba(232, 164, 0, 0.2)'
                : 'inset 0 0 0 1px rgba(232, 164, 0, 0.2), 0 0 0px rgba(232, 164, 0, 0)',
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Placeholder/Thumbnail */}
          {!isPlaying && (
            <div className="absolute inset-0 z-10">
              <motion.div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80)',
                }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-black/50" />
              
              {/* Play button overlay */}
              <motion.button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group/play"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  {/* Multiple pulsing rings */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-accent/50"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{ 
                        scale: [1, 2, 2],
                        opacity: [0.5, 0, 0],
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                  
                  {/* Main button */}
                  <motion.div 
                    className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(232, 164, 0, 1)' }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(232, 164, 0, 0)',
                        '0 0 40px 10px rgba(232, 164, 0, 0.3)',
                        '0 0 0 0 rgba(232, 164, 0, 0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Play size={40} className="text-bg-deep ml-2" fill="currentColor" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Corner accents */}
              {[
                'top-4 left-4 border-l-2 border-t-2',
                'top-4 right-4 border-r-2 border-t-2',
                'bottom-4 left-4 border-l-2 border-b-2',
                'bottom-4 right-4 border-r-2 border-b-2',
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-8 h-8 ${pos} border-accent/30`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0.5, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
          )}

          {/* YouTube Embed */}
          {isPlaying && (
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0"
              title="VFX Showreel 2026"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* Video controls overlay */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
                </motion.button>
                <span className="text-sm text-white/80">VFX Showreel 2026</span>
              </div>
              <motion.button 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Maximize2 size={18} className="text-white" />
              </motion.button>
            </div>
          </motion.div>

          {/* Film grain overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none z-30"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            }}
          />
        </motion.div>

        {/* Quick stats with animations */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {[
            { value: '50+', label: 'Projects' },
            { value: '8', label: 'Years Experience' },
            { value: '12', label: 'Awards' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              className="relative text-center p-4 rounded-xl bg-surface/30 border border-stroke/50 overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(232, 164, 0, 0.3)' }}
            >
              {/* Background glow on hover */}
              <motion.div
                className="absolute inset-0 bg-accent/5"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              <motion.span 
                className="relative text-2xl md:text-3xl font-display text-accent"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.span>
              <p className="relative text-xs text-muted uppercase tracking-wider mt-1">{stat.label}</p>
              
              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

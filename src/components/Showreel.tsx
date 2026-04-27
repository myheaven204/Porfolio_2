import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="showreel" className="relative bg-bg-deep py-24 md:py-32 overflow-hidden">
      {/* Cinematic letterbox bars */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-black z-20" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-accent/50" />
            <span className="text-xs text-accent uppercase tracking-[0.4em] font-medium">Showreel 2026</span>
            <div className="w-12 h-px bg-accent/50" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary tracking-wide">
            LATEST WORK
          </h2>
        </motion.div>

        {/* Video Container - Cinematic 2.39:1 aspect ratio */}
        <motion.div
          className="relative w-full aspect-[2.39/1] bg-black rounded-lg overflow-hidden group"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Placeholder/Thumbnail */}
          {!isPlaying && (
            <div className="absolute inset-0 z-10">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1920&q=80)',
                }}
              />
              <div className="absolute inset-0 bg-black/50" />
              
              {/* Play button overlay */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group/play"
              >
                <div className="relative">
                  {/* Pulsing ring */}
                  <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-accent/50 animate-ping opacity-30" />
                  
                  {/* Main button */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover/play:bg-accent group-hover/play:scale-110">
                    <Play size={40} className="text-bg-deep ml-2" fill="currentColor" />
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* YouTube Embed (placeholder - would be replaced with actual video) */}
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
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
                </button>
                <span className="text-sm text-white/80">VFX Showreel 2026</span>
              </div>
              <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                <Maximize2 size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* Film grain overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none z-30"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            }}
          />
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { value: '50+', label: 'Projects' },
            { value: '8', label: 'Years Experience' },
            { value: '12', label: 'Awards' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-2xl md:text-3xl font-display text-accent">{stat.value}</span>
              <p className="text-xs text-muted uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

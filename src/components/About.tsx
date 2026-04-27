import { motion } from 'framer-motion';
import { Film, Users, Briefcase } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: <Film size={20} />, value: '50+', label: 'Projects Completed' },
  { icon: <Users size={20} />, value: '20+', label: 'Clients' },
  { icon: <Briefcase size={20} />, value: '5', label: 'Years Experience' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function About() {
  return (
    <section id="about" className="bg-bg-deep py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo side */}
          <motion.div
            className="relative"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Main photo */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Hai Luong - VFX Compositor"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent" />
              
              {/* Film frame overlay */}
              <div className="absolute inset-4 border border-accent/20 rounded-xl pointer-events-none" />
            </div>

            
          </motion.div>

          {/* Content side */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent/50" />
              <span className="text-xs text-accent uppercase tracking-[0.4em] font-medium">About Me</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary tracking-wide mb-6">
              HAI LUONG
            </h2>

            <p className="text-lg text-muted mb-6 leading-relaxed">
              A passionate VFX Compositor with <span className="text-accent">5 years of experience</span> in 
              compositing, matchmoving, and visual effects for film and commercial projects.
            </p>

            <p className="text-muted mb-8 leading-relaxed">
              Based in Ho Chi Minh City, Vietnam. I specialize in compositing with After Effects, 
              camera tracking with PFtrack, and video editing with Premiere Pro.
            </p>

            <p className="text-muted mb-10 leading-relaxed">
              I&apos;m dedicated to delivering high-quality visual effects that seamlessly blend with 
              live-action footage, bringing creative visions to life.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-4">
              {HIGHLIGHTS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-4 rounded-xl bg-surface border border-stroke text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-display text-text-primary">{stat.value}</div>
                  <div className="text-xs text-muted uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

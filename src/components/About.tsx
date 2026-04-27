import { motion } from 'framer-motion';
import { Award, Film, Users, Briefcase } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: <Film size={20} />, value: '50+', label: 'Projects Completed' },
  { icon: <Award size={20} />, value: '12', label: 'Industry Awards' },
  { icon: <Users size={20} />, value: '25+', label: 'Clients Worldwide' },
  { icon: <Briefcase size={20} />, value: '8', label: 'Years Experience' },
];

const EXPERIENCE = [
  { company: 'ILM', role: 'Senior VFX Artist', period: '2022 - Present' },
  { company: 'Framestore', role: 'FX TD', period: '2019 - 2022' },
  { company: 'MPC', role: 'Compositor', period: '2017 - 2019' },
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
                alt="Alex Chen - VFX Artist"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent" />
              
              {/* Film frame overlay */}
              <div className="absolute inset-4 border border-accent/20 rounded-xl pointer-events-none" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-8 -right-4 md:right-8 bg-surface border border-stroke rounded-xl p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Award className="text-accent" size={24} />
                </div>
                <div>
                  <span className="text-2xl font-display text-text-primary">VES Award</span>
                  <p className="text-xs text-muted">Best FX - 2025</p>
                </div>
              </div>
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
              ALEX CHEN
            </h2>

            <p className="text-lg text-muted mb-6 leading-relaxed">
              A passionate VFX artist with <span className="text-accent">8 years of experience</span> crafting 
              visual effects for blockbuster films, high-end commercials, and AAA game cinematics.
            </p>

            <p className="text-muted mb-8 leading-relaxed">
              Currently based in Los Angeles, I specialize in FX simulations, compositing, and 
              photorealistic environment creation. My work has been featured in major studio 
              productions and has earned recognition from the Visual Effects Society.
            </p>

            <p className="text-muted mb-10 leading-relaxed">
              When I&apos;m not pushing pixels, you&apos;ll find me exploring new rendering techniques, 
              contributing to open-source VFX tools, or mentoring the next generation of artists.
            </p>

            {/* Experience timeline */}
            <div className="mb-10">
              <h3 className="text-lg font-display text-text-primary tracking-wide mb-4">EXPERIENCE</h3>
              <div className="space-y-4">
                {EXPERIENCE.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    className="flex items-center justify-between py-3 border-b border-stroke"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div>
                      <h4 className="font-medium text-text-primary">{exp.company}</h4>
                      <p className="text-sm text-muted">{exp.role}</p>
                    </div>
                    <span className="text-xs text-accent font-mono">{exp.period}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

import { motion } from 'framer-motion';

const SOFTWARE = [
  {
    name: 'After Effects',
    category: 'Motion Graphics & VFX',
    level: 90,
    description: 'Compositing, motion design, and visual effects',
  },
  {
    name: 'PFtrack',
    category: 'Matchmove & Tracking',
    level: 80,
    description: '3D camera tracking and object tracking',
  },
  {
    name: 'Premiere Pro',
    category: 'Video Editing',
    level: 70,
    description: 'Video editing and post-production',
  },
  {
    name: 'Photoshop',
    category: 'Image Editing',
    level: 60,
    description: 'Photo manipulation and texture work',
  },
];

const EXPERTISE = [
  { area: 'FX Simulations', skills: ['Pyro', 'Fluids', 'Destruction', 'Particles'] },
  { area: 'Compositing', skills: ['Keying', 'Roto', 'Paint', 'Integration'] },
  { area: 'Environment', skills: ['Matte Painting', 'Set Extension', 'CG Integration'] },
  { area: 'Pipeline', skills: ['Python', 'VEX', 'Tool Development', 'Automation'] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Skills() {
  return (
    <section id="skills" className="bg-bg py-24 md:py-32 border-t border-stroke">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-accent/50" />
            <span className="text-xs text-accent uppercase tracking-[0.4em] font-medium">Expertise</span>
            <div className="w-12 h-px bg-accent/50" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary tracking-wide">
            SKILLS & SOFTWARE
          </h2>
          <p className="text-sm text-muted mt-4 max-w-lg mx-auto">
            Industry-standard tools and techniques honed through years of experience in film and commercial VFX.
          </p>
        </motion.div>

        {/* Software grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {SOFTWARE.map((software, i) => (
            <motion.div
              key={software.name}
              className="group relative p-6 rounded-xl bg-surface border border-stroke hover:border-accent/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-display text-text-primary tracking-wide group-hover:text-accent transition-colors">
                    {software.name}
                  </h3>
                  <span className="text-xs text-accent uppercase tracking-wider">{software.category}</span>
                </div>
                <span className="text-2xl font-display text-muted group-hover:text-accent transition-colors">
                  {software.level}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-stroke rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${software.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>

              {/* Description */}
              <p className="text-sm text-muted/70">{software.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Expertise areas */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h3 className="text-2xl font-display text-text-primary tracking-wide text-center mb-10">
            AREAS OF EXPERTISE
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERTISE.map((area, i) => (
              <motion.div
                key={area.area}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className="text-lg font-display text-accent tracking-wide mb-4">
                  {area.area}
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {area.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-full bg-surface border border-stroke text-xs text-muted hover:text-text-primary hover:border-accent/30 transition-all duration-300 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Automotive Motion',
    span: 'md:col-span-7',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1200',
    aspect: 'aspect-[16/9]',
  },
  {
    title: 'Urban Architecture',
    span: 'md:col-span-5',
    image: 'https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1200',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'Human Perspective',
    span: 'md:col-span-5',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1200',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'Brand Identity',
    span: 'md:col-span-7',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    aspect: 'aspect-[16/9]',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Works() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-10 md:mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-body font-light text-text-primary">
              Featured <em className="font-display italic not-italic" style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}>projects</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>
          <a
            href="#work"
            className="hidden md:inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary transition-colors duration-200 group relative rounded-full px-5 py-2.5 border border-stroke hover:border-transparent"
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient"
            />
            <span className="absolute inset-[1px] rounded-full bg-bg" />
            <span className="relative z-10 flex items-center gap-2">
              View all work <ArrowUpRight size={14} />
            </span>
          </a>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              className={`${project.span} group relative rounded-3xl overflow-hidden bg-surface border border-stroke cursor-pointer`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`relative w-full ${project.aspect}`}>
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Halftone overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-lg flex items-center justify-center">
                  <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full">
                    <span className="absolute inset-0 rounded-full accent-gradient" />
                    <span className="absolute inset-[2px] rounded-full bg-white" />
                    <span className="relative z-10 text-sm font-medium text-black">
                      View — <em className="font-display" style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}>{project.title}</em>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

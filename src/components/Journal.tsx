import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ENTRIES = [
  {
    title: 'The Intersection of Motion and Meaning in Digital Design',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    readTime: '5 min read',
    date: 'Jan 12, 2026',
  },
  {
    title: 'Building Design Systems That Scale Across Teams',
    image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=400',
    readTime: '8 min read',
    date: 'Dec 28, 2025',
  },
  {
    title: 'Typography as a Tool for Emotional Connection',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
    readTime: '4 min read',
    date: 'Dec 10, 2025',
  },
  {
    title: 'From Wireframe to Launch: A Product Story',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    readTime: '6 min read',
    date: 'Nov 22, 2025',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-body font-light text-text-primary">
              Recent <em style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}>thoughts</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-sm">
              Reflections on design, technology, and the spaces in between.
            </p>
          </div>
          <a
            href="#journal"
            className="hidden md:inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary transition-colors duration-200 group relative rounded-full px-5 py-2.5 border border-stroke hover:border-transparent"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient" />
            <span className="absolute inset-[1px] rounded-full bg-bg" />
            <span className="relative z-10 flex items-center gap-2">
              View all <ArrowUpRight size={14} />
            </span>
          </a>
        </motion.div>

        {/* Entries */}
        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={entry.title}
              href="#"
              className="flex items-center gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all duration-300 group"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base text-text-primary font-medium line-clamp-2 sm:line-clamp-1 group-hover:text-text-primary/80 transition-colors">
                  {entry.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted">{entry.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-stroke" />
                  <span className="text-xs text-muted">{entry.date}</span>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="flex-shrink-0 text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 mr-2"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '95+', label: 'Projects Done' },
  { value: '200%', label: 'Satisfied Clients' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Stats() {
  return (
    <section id="stats" className="bg-bg py-16 md:py-24 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stroke">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-bg p-10 md:p-16 flex flex-col gap-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.12 }}
            >
              <span className="text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary">
                {stat.value}
              </span>
              <span className="text-sm text-muted uppercase tracking-[0.2em]">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

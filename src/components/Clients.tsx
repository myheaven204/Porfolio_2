import { motion } from 'framer-motion';

const CLIENTS = [
  { name: 'Netflix', logo: 'NETFLIX' },
  { name: 'HBO', logo: 'HBO' },
  { name: 'Disney', logo: 'DISNEY' },
  { name: 'Warner Bros', logo: 'WARNER BROS' },
  { name: 'Sony Pictures', logo: 'SONY' },
  { name: 'Universal', logo: 'UNIVERSAL' },
  { name: 'Paramount', logo: 'PARAMOUNT' },
  { name: 'Apple TV', logo: 'APPLE TV+' },
  { name: 'Amazon Prime', logo: 'PRIME VIDEO' },
  { name: 'VTV', logo: 'VTV' },
  { name: 'HTV', logo: 'HTV' },
  { name: 'FPT Play', logo: 'FPT PLAY' },
];

export default function Clients() {
  return (
    <section className="py-20 bg-bg-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] text-accent uppercase mb-4 block">
            Trusted By
          </span>
          <h2 className="text-3xl md:text-4xl font-display text-text-primary tracking-wide">
            CLIENTS & PARTNERS
          </h2>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-deep to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-deep to-transparent z-10 pointer-events-none" />

        {/* First row - left to right */}
        <div className="flex mb-8">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="flex-shrink-0 group"
              >
                <div className="px-10 py-6 rounded-xl border border-stroke/30 bg-surface/30 hover:border-accent/50 hover:bg-surface/50 transition-all duration-300 min-w-[180px] flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-display text-muted/50 group-hover:text-accent transition-colors duration-300 tracking-wider whitespace-nowrap">
                    {client.logo}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second row - right to left */}
        <div className="flex">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 35,
                ease: 'linear',
              },
            }}
          >
            {[...CLIENTS.slice().reverse(), ...CLIENTS.slice().reverse()].map((client, i) => (
              <div
                key={`${client.name}-rev-${i}`}
                className="flex-shrink-0 group"
              >
                <div className="px-10 py-6 rounded-xl border border-stroke/30 bg-surface/30 hover:border-accent/50 hover:bg-surface/50 transition-all duration-300 min-w-[180px] flex items-center justify-center">
                  <span className="text-xl md:text-2xl font-display text-muted/50 group-hover:text-accent transition-colors duration-300 tracking-wider whitespace-nowrap">
                    {client.logo}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <motion.div
          className="flex flex-wrap justify-center gap-12 md:gap-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-display text-accent">20+</span>
            <p className="text-sm text-muted mt-2">Happy Clients</p>
          </div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-display text-accent">50+</span>
            <p className="text-sm text-muted mt-2">Projects Delivered</p>
          </div>
          <div className="text-center">
            <span className="text-4xl md:text-5xl font-display text-accent">5</span>
            <p className="text-sm text-muted mt-2">Years Experience</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

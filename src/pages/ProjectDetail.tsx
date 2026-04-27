import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Users,
  Award,
  X,
} from 'lucide-react';
import { getProjectById, getAdjacentProjects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : undefined;
  const adjacent = id ? getAdjacentProjects(id) : null;
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — VFX Portfolio`;
    } else {
      document.title = 'Project not found — VFX Portfolio';
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-xs text-accent uppercase tracking-[0.4em] mb-4">404</p>
          <h1 className="text-3xl md:text-5xl font-display text-text-primary mb-4">
            Project not found
          </h1>
          <p className="text-sm text-muted mb-8">
            The project you are looking for doesn’t exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-bg-deep font-medium text-sm"
          >
            <ArrowLeft size={14} /> Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-bg/70 border-b border-stroke">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="tracking-wide">Back to portfolio</span>
          </Link>
          <div className="hidden md:flex items-center gap-3 text-xs text-muted/70 font-mono uppercase tracking-[0.3em]">
            <span>{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span>{project.year}</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={project.image}
            alt=""
            aria-hidden
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/80 to-bg" />
        </motion.div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="px-3 py-1 rounded-full border border-accent/40 text-xs text-accent uppercase tracking-[0.3em]">
              {project.category}
            </span>
            <span className="text-xs text-muted font-mono">{project.role}</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display tracking-wide leading-[1.05] max-w-4xl">
            {project.title.split('').map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.05 * i,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-base md:text-lg text-muted mt-8 max-w-2xl text-pretty leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {project.description}
          </motion.p>

          {/* Meta */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-stroke mt-12 border border-stroke rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <MetaItem
              icon={<Calendar size={14} />}
              label="Year"
              value={project.year}
            />
            <MetaItem
              icon={<Clock size={14} />}
              label="Duration"
              value={project.duration ?? '—'}
            />
            <MetaItem
              icon={<Users size={14} />}
              label="Team"
              value={project.team ?? '—'}
            />
            <MetaItem
              icon={<Award size={14} />}
              label="Client"
              value={project.client ?? '—'}
            />
          </motion.div>
        </div>
      </section>

      {/* Tools */}
      {project.tools && project.tools.length > 0 && (
        <section className="border-t border-stroke">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-accent/50" />
              <span className="text-xs text-accent uppercase tracking-[0.4em]">
                Tools & Software
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  className="px-4 py-2 rounded-full bg-surface border border-stroke text-sm text-text-primary"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: 'rgba(232, 164, 0, 0.5)',
                  }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenge & Solution */}
      {(project.challenge || project.solution) && (
        <section className="border-t border-stroke">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 grid md:grid-cols-2 gap-10">
            {project.challenge && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-8 rounded-2xl bg-surface border border-stroke overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
                <p className="text-xs text-accent uppercase tracking-[0.4em] mb-4">
                  Challenge
                </p>
                <p className="text-base md:text-lg text-text-primary leading-relaxed">
                  {project.challenge}
                </p>
              </motion.div>
            )}
            {project.solution && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative p-8 rounded-2xl bg-surface border border-stroke overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-accent/60" />
                <p className="text-xs text-muted uppercase tracking-[0.4em] mb-4">
                  Solution
                </p>
                <p className="text-base md:text-lg text-text-primary leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="border-t border-stroke">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-px bg-accent/50" />
              <span className="text-xs text-accent uppercase tracking-[0.4em]">
                Gallery
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {project.gallery.map((src, i) => (
                <motion.button
                  key={src + i}
                  type="button"
                  onClick={() => setLightboxImage(src)}
                  className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-surface border border-stroke"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6 }}
                >
                  <img
                    src={src}
                    alt={`${project.title} still ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="font-mono">
                      {String(i + 1).padStart(2, '0')} /{' '}
                      {String(project.gallery!.length).padStart(2, '0')}
                    </span>
                    <span className="inline-flex items-center gap-1 text-accent">
                      View <ArrowUpRight size={12} />
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Awards */}
      {project.awards && project.awards.length > 0 && (
        <section className="border-t border-stroke">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-accent/50" />
              <span className="text-xs text-accent uppercase tracking-[0.4em]">
                Awards
              </span>
            </div>
            <ul className="grid md:grid-cols-2 gap-3">
              {project.awards.map((award) => (
                <li
                  key={award}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl bg-surface border border-stroke"
                >
                  <Award size={16} className="text-accent shrink-0" />
                  <span className="text-sm text-text-primary">{award}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="border-t border-stroke">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
            <motion.blockquote
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-display text-text-primary leading-snug text-balance">
                &ldquo;{project.testimonial.text}&rdquo;
              </p>
              <footer className="mt-8 text-sm text-muted">
                <span className="text-accent">
                  {project.testimonial.author}
                </span>
                <span className="mx-2 text-muted/50">·</span>
                <span>{project.testimonial.position}</span>
              </footer>
            </motion.blockquote>
          </div>
        </section>
      )}

      {/* Adjacent navigation */}
      {adjacent && (
        <section className="border-t border-stroke">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-12 grid md:grid-cols-2 gap-4 md:gap-6">
            <AdjacentCard
              direction="prev"
              project={adjacent.prev}
            />
            <AdjacentCard direction="next" project={adjacent.next} />
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="border-t border-stroke">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-sm text-muted">
            Have a project in mind? Let&apos;s build something together.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-bg-deep font-medium text-sm hover:scale-[1.02] transition-transform"
          >
            Get in touch <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-bg-deep/95 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.button
              type="button"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface border border-stroke flex items-center justify-center text-text-primary hover:text-accent transition-colors"
              onClick={() => setLightboxImage(null)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              aria-label="Close image"
            >
              <X size={18} />
            </motion.button>
            <motion.img
              src={lightboxImage}
              alt=""
              className="max-w-full max-h-full object-contain rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-surface p-5">
      <div className="flex items-center gap-2 text-accent mb-2">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.3em]">{label}</span>
      </div>
      <p className="text-sm md:text-base text-text-primary">{value}</p>
    </div>
  );
}

function AdjacentCard({
  direction,
  project,
}: {
  direction: 'prev' | 'next';
  project: ReturnType<typeof getProjectById>;
}) {
  if (!project) return null;
  const isNext = direction === 'next';
  return (
    <Link
      to={`/project/${project.id}`}
      className={`group relative overflow-hidden rounded-2xl bg-surface border border-stroke aspect-[16/9] md:aspect-[21/9] ${
        isNext ? 'md:text-right' : ''
      }`}
    >
      <img
        src={project.image}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-30 transition-all duration-700 group-hover:opacity-50 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent group-[]:opacity-100" />
      <div
        className={`relative h-full p-6 md:p-8 flex flex-col justify-between ${
          isNext ? 'items-end' : 'items-start'
        }`}
      >
        <div
          className={`flex items-center gap-2 text-xs text-accent uppercase tracking-[0.4em] ${
            isNext ? 'flex-row-reverse' : ''
          }`}
        >
          {isNext ? (
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          ) : (
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          )}
          <span>{isNext ? 'Next project' : 'Previous project'}</span>
        </div>
        <div className={isNext ? 'text-right' : 'text-left'}>
          <p className="text-xs text-muted font-mono mb-1">{project.year}</p>
          <h3 className="text-2xl md:text-3xl font-display text-text-primary group-hover:text-accent transition-colors">
            {project.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

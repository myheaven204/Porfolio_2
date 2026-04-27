import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Wrench, 
  Award, 
  Quote, 
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { getProjectById, PROJECTS, type Project } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getProjectById(id);
      setProject(found || null);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-text-primary mb-4">Project Not Found</h1>
          <Link to="/" className="text-accent hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 to-transparent" />
        
        {/* Back Button */}
        <motion.div
          className="absolute top-8 left-8 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-sm border border-stroke text-text-primary hover:border-accent transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Portfolio</span>
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-[1400px] mx-auto">
            <motion.span
              className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs uppercase tracking-wider mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {project.category}
            </motion.span>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-display text-text-primary tracking-wide mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {project.title}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {project.description}
            </motion.p>
          </div>
        </div>

        {/* Play Button for Video */}
        {project.videoUrl && (
          <motion.button
            onClick={() => setShowVideo(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-accent/90 flex items-center justify-center z-10 hover:scale-110 transition-transform"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
            whileHover={{ boxShadow: '0 0 40px rgba(232, 164, 0, 0.5)' }}
          >
            <Play size={40} className="text-bg-deep ml-2" fill="currentColor" />
          </motion.button>
        )}
      </section>

      {/* Project Info Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Role */}
            <motion.div
              className="p-6 rounded-xl bg-surface border border-stroke"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-xs text-muted uppercase tracking-wider">Role</span>
              <p className="text-lg text-text-primary mt-2 font-medium">{project.role}</p>
            </motion.div>

            {/* Client */}
            {project.client && (
              <motion.div
                className="p-6 rounded-xl bg-surface border border-stroke"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-xs text-muted uppercase tracking-wider flex items-center gap-2">
                  <ExternalLink size={12} /> Client
                </span>
                <p className="text-lg text-text-primary mt-2 font-medium">{project.client}</p>
              </motion.div>
            )}

            {/* Duration */}
            {project.duration && (
              <motion.div
                className="p-6 rounded-xl bg-surface border border-stroke"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-xs text-muted uppercase tracking-wider flex items-center gap-2">
                  <Clock size={12} /> Duration
                </span>
                <p className="text-lg text-text-primary mt-2 font-medium">{project.duration}</p>
              </motion.div>
            )}

            {/* Year */}
            <motion.div
              className="p-6 rounded-xl bg-surface border border-stroke"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xs text-muted uppercase tracking-wider flex items-center gap-2">
                <Calendar size={12} /> Year
              </span>
              <p className="text-lg text-text-primary mt-2 font-medium">{project.year}</p>
            </motion.div>
          </div>

          {/* Tools & Team */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Tools */}
            {project.tools && project.tools.length > 0 && (
              <motion.div
                className="p-8 rounded-xl bg-surface border border-stroke"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm text-muted uppercase tracking-wider flex items-center gap-2 mb-4">
                  <Wrench size={14} /> Tools & Software
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, i) => (
                    <motion.span
                      key={tool}
                      className="px-4 py-2 rounded-full bg-bg border border-stroke text-sm text-text-primary"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ borderColor: 'rgba(232, 164, 0, 0.5)', scale: 1.05 }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Team */}
            {project.team && (
              <motion.div
                className="p-8 rounded-xl bg-surface border border-stroke"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm text-muted uppercase tracking-wider flex items-center gap-2 mb-4">
                  <Users size={14} /> Team Size
                </h3>
                <p className="text-3xl font-display text-accent">{project.team}</p>
              </motion.div>
            )}
          </div>

          {/* Challenge & Solution */}
          {(project.challenge || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {project.challenge && (
                <motion.div
                  className="p-8 rounded-xl bg-gradient-to-br from-surface to-bg border border-stroke"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-display text-text-primary mb-4">The Challenge</h3>
                  <p className="text-muted leading-relaxed">{project.challenge}</p>
                </motion.div>
              )}
              {project.solution && (
                <motion.div
                  className="p-8 rounded-xl bg-gradient-to-br from-accent/10 to-surface border border-accent/20"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-display text-accent mb-4">The Solution</h3>
                  <p className="text-muted leading-relaxed">{project.solution}</p>
                </motion.div>
              )}
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-display text-text-primary mb-8">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => { setActiveImageIndex(i); setShowLightbox(true); }}
                  >
                    <img
                      src={img.src}
                      alt={img.caption || `Gallery image ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-sm text-white">{img.caption || 'View Image'}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Awards */}
          {project.awards && project.awards.length > 0 && (
            <motion.div
              className="mb-16 p-8 rounded-xl bg-gradient-to-r from-accent/5 to-surface border border-accent/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm text-muted uppercase tracking-wider flex items-center gap-2 mb-6">
                <Award size={14} className="text-accent" /> Awards & Recognition
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.awards.map((award, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-bg border border-accent/30"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Award size={16} className="text-accent" />
                    <span className="text-text-primary">{award}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Testimonial */}
          {project.testimonial && (
            <motion.div
              className="mb-16 p-10 rounded-xl bg-surface border border-stroke relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Quote size={60} className="absolute top-6 left-6 text-accent/10" />
              <div className="relative z-10">
                <p className="text-xl md:text-2xl text-text-primary leading-relaxed italic mb-6">
                  "{project.testimonial.text}"
                </p>
                <div>
                  <p className="text-accent font-medium">{project.testimonial.author}</p>
                  <p className="text-sm text-muted">{project.testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Project Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-stroke">
            {prevProject ? (
              <Link
                to={`/project/${prevProject.id}`}
                className="group flex items-center gap-4 text-muted hover:text-text-primary transition-colors"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
                <div>
                  <span className="text-xs uppercase tracking-wider">Previous</span>
                  <p className="text-lg font-display">{prevProject.title}</p>
                </div>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                to={`/project/${nextProject.id}`}
                className="group flex items-center gap-4 text-right text-muted hover:text-text-primary transition-colors"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider">Next</span>
                  <p className="text-lg font-display">{nextProject.title}</p>
                </div>
                <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && project.gallery && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLightbox(false)}
          >
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => Math.max(0, prev - 1)); }}
              className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              disabled={activeImageIndex === 0}
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <motion.img
              key={activeImageIndex}
              src={project.gallery[activeImageIndex].src}
              alt={project.gallery[activeImageIndex].caption}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex(prev => Math.min(project.gallery!.length - 1, prev + 1)); }}
              className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              disabled={activeImageIndex === project.gallery.length - 1}
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {project.gallery[activeImageIndex].caption && (
              <p className="absolute bottom-6 text-white/80 text-center">
                {project.gallery[activeImageIndex].caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && project.videoUrl && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
            <motion.div
              className="w-full max-w-5xl aspect-video"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={project.videoUrl}
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

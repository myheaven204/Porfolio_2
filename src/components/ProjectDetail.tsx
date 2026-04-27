import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowUpRight, 
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
  Sparkles,
  Target,
  Lightbulb,
  Building2
} from 'lucide-react';
import { PROJECTS, Project } from '../data/projects';
import ParticleBackground from './ParticleBackground';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    const foundProject = PROJECTS.find(p => p.id === id);
    setProject(foundProject || null);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Trigger load animation
    setTimeout(() => setIsLoaded(true), 100);
  }, [id]);

  // Get next and previous projects
  const currentIndex = PROJECTS.findIndex(p => p.id === id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];

  if (!project) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading project...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-bg">
      <ParticleBackground />
      
      {/* Fixed Back Button */}
      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur-md border border-stroke text-text-primary hover:border-accent/50 transition-all group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </motion.button>

      {/* Hero Section */}
      <motion.section 
        className="relative h-[80vh] overflow-hidden"
        style={{ y: heroY }}
      >
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/80" />
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-[10%] w-32 h-32 rounded-full bg-accent/10 blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 left-[5%] w-48 h-48 rounded-full bg-accent/5 blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end pb-16">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 w-full">
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent text-sm font-medium">
                <Sparkles size={14} />
                {project.category}
              </span>
            </motion.div>

            {/* Title with character reveal */}
            <div className="overflow-hidden mb-4">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-display text-text-primary tracking-wide"
                initial={{ y: 100 }}
                animate={{ y: isLoaded ? 0 : 100 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {project.title}
              </motion.h1>
            </div>

            {/* Role */}
            <motion.p
              className="text-xl md:text-2xl text-accent mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              {project.role}
            </motion.p>

            {/* Quick Info */}
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ delay: 0.6 }}
            >
              {project.client && (
                <div className="flex items-center gap-2 text-muted">
                  <Building2 size={16} className="text-accent" />
                  <span>{project.client}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted">
                <Calendar size={16} className="text-accent" />
                <span>{project.year}</span>
              </div>
              {project.duration && (
                <div className="flex items-center gap-2 text-muted">
                  <Clock size={16} className="text-accent" />
                  <span>{project.duration}</span>
                </div>
              )}
              {project.team && (
                <div className="flex items-center gap-2 text-muted">
                  <Users size={16} className="text-accent" />
                  <span>{project.team}</span>
                </div>
              )}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="w-6 h-10 rounded-full border-2 border-muted/30 flex items-start justify-center p-1"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div
                  className="w-1.5 h-3 bg-accent rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="relative z-10 bg-bg">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-24">
          {/* Description */}
          <motion.div
            className="max-w-3xl mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs text-accent uppercase tracking-[0.4em] mb-4">Overview</h2>
            <p className="text-2xl md:text-3xl text-text-primary leading-relaxed font-light">
              {project.description}
            </p>
          </motion.div>

          {/* Tools Grid */}
          {project.tools && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Wrench size={18} className="text-accent" />
                <h3 className="text-xs text-accent uppercase tracking-[0.4em]">Tools & Software</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.tools.map((tool, i) => (
                  <motion.span
                    key={tool}
                    className="px-4 py-2 rounded-lg bg-surface border border-stroke text-text-primary text-sm hover:border-accent/50 hover:bg-accent/5 transition-all cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Challenge & Solution */}
          {(project.challenge || project.solution) && (
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {project.challenge && (
                <motion.div
                  className="p-8 rounded-2xl bg-surface border border-stroke relative overflow-hidden group"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ borderColor: 'rgba(232, 164, 0, 0.3)' }}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Target size={20} className="text-accent" />
                      </div>
                      <h3 className="text-lg font-medium text-text-primary">The Challenge</h3>
                    </div>
                    <p className="text-muted leading-relaxed">{project.challenge}</p>
                  </div>
                </motion.div>
              )}
              
              {project.solution && (
                <motion.div
                  className="p-8 rounded-2xl bg-surface border border-stroke relative overflow-hidden group"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ borderColor: 'rgba(232, 164, 0, 0.3)' }}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Lightbulb size={20} className="text-accent" />
                      </div>
                      <h3 className="text-lg font-medium text-text-primary">The Solution</h3>
                    </div>
                    <p className="text-muted leading-relaxed">{project.solution}</p>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Video Section */}
          {project.videoUrl && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xs text-accent uppercase tracking-[0.4em] mb-6">Project Reel</h3>
              <div 
                className="relative aspect-video rounded-2xl overflow-hidden bg-surface border border-stroke cursor-pointer group"
                onClick={() => setIsVideoOpen(true)}
              >
                <img
                  src={project.image}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-bg/40 group-hover:bg-bg/20 transition-colors" />
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
                    <Play size={32} className="text-bg-deep ml-1" fill="currentColor" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xs text-accent uppercase tracking-[0.4em] mb-6">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.gallery.map((img, i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setActiveGalleryIndex(i);
                      setIsGalleryOpen(true);
                    }}
                  >
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-sm text-text-primary">{img.caption}</p>
                    </div>
                    <motion.div
                      className="absolute inset-0 border-2 border-accent/0 rounded-xl group-hover:border-accent/30 transition-colors"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Awards */}
          {project.awards && project.awards.length > 0 && (
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Award size={18} className="text-accent" />
                <h3 className="text-xs text-accent uppercase tracking-[0.4em]">Awards & Recognition</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {project.awards.map((award, i) => (
                  <motion.div
                    key={i}
                    className="px-6 py-4 rounded-xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 flex items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, borderColor: 'rgba(232, 164, 0, 0.4)' }}
                  >
                    <Award size={20} className="text-accent" />
                    <span className="text-text-primary">{award}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Testimonial */}
          {project.testimonial && (
            <motion.div
              className="mb-20 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-surface border border-stroke relative overflow-hidden">
                <motion.div
                  className="absolute -top-20 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <Quote size={48} className="text-accent/30 mx-auto mb-6" />
                <p className="text-xl md:text-2xl text-text-primary leading-relaxed mb-8 italic">
                  "{project.testimonial.text}"
                </p>
                <div>
                  <p className="text-accent font-medium">{project.testimonial.author}</p>
                  <p className="text-muted text-sm">{project.testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Project Navigation */}
          <motion.div
            className="border-t border-stroke pt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Previous Project */}
              <motion.div
                className="group cursor-pointer"
                onClick={() => navigate(`/project/${prevProject.id}`)}
                whileHover={{ x: -10 }}
              >
                <div className="flex items-center gap-2 text-muted mb-2">
                  <ChevronLeft size={16} />
                  <span className="text-xs uppercase tracking-wider">Previous Project</span>
                </div>
                <h4 className="text-2xl font-display text-text-primary group-hover:text-accent transition-colors">
                  {prevProject.title}
                </h4>
                <p className="text-sm text-muted mt-1">{prevProject.role}</p>
              </motion.div>

              {/* Next Project */}
              <motion.div
                className="group cursor-pointer text-right"
                onClick={() => navigate(`/project/${nextProject.id}`)}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center justify-end gap-2 text-muted mb-2">
                  <span className="text-xs uppercase tracking-wider">Next Project</span>
                  <ChevronRight size={16} />
                </div>
                <h4 className="text-2xl font-display text-text-primary group-hover:text-accent transition-colors">
                  {nextProject.title}
                </h4>
                <p className="text-sm text-muted mt-1">{nextProject.role}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Back to all projects */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate('/')}
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-bg-deep font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Projects</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && project.videoUrl && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/95 backdrop-blur-md p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface border border-stroke flex items-center justify-center hover:border-accent/50 transition-colors"
              onClick={() => setIsVideoOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
            <motion.div
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={project.videoUrl}
                className="w-full h-full"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {isGalleryOpen && project.gallery && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/95 backdrop-blur-md p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGalleryOpen(false)}
          >
            <motion.button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface border border-stroke flex items-center justify-center hover:border-accent/50 transition-colors z-10"
              onClick={() => setIsGalleryOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>

            {/* Navigation Arrows */}
            <motion.button
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-surface border border-stroke flex items-center justify-center hover:border-accent/50 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setActiveGalleryIndex((prev) => 
                  prev === 0 ? project.gallery!.length - 1 : prev - 1
                );
              }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <motion.button
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-surface border border-stroke flex items-center justify-center hover:border-accent/50 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                setActiveGalleryIndex((prev) => 
                  (prev + 1) % project.gallery!.length
                );
              }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>

            <motion.div
              className="w-full max-w-5xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeGalleryIndex}
                  src={project.gallery[activeGalleryIndex].url}
                  alt={project.gallery[activeGalleryIndex].caption}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                />
              </AnimatePresence>
              <motion.p
                className="text-center text-muted mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.gallery[activeGalleryIndex].caption}
              </motion.p>
              <div className="flex justify-center gap-2 mt-4">
                {project.gallery.map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeGalleryIndex ? 'bg-accent w-6' : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveGalleryIndex(i);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

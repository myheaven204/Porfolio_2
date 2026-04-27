import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProjectDetailsData {
  title: string;
  category: string;
  role: string;
  image: string;
  year: string;
  description: string;
  client?: string;
  duration?: string;
  tools?: string[];
  team?: string;
  challenge?: string;
  solution?: string;
  gallery?: string[];
  videoUrl?: string;
  awards?: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

const PROJECT_DETAILS: Record<string, ProjectDetailsData> = {
  'stellar-odyssey': {
    title: 'Stellar Odyssey',
    category: 'Film',
    role: 'Lead FX Artist',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    year: '2026',
    description: 'Epic space adventure with massive destruction sequences and nebula environments.',
    client: 'Universal Pictures',
    duration: '6 months',
    tools: ['Houdini', 'Maya', 'RenderMan', 'Nuke', 'Substance Painter'],
    team: '8 FX Artists',
    challenge: 'Creating photorealistic space destruction sequences with millions of particles while maintaining real-time preview performance.',
    solution: 'Implemented GPU-accelerated particle simulation with LOD system and proxy geometry optimization for seamless collaboration.',
    awards: ['VES Award for Outstanding Visual Effects'],
    testimonial: {
      text: 'The team delivered exceptional results within tight deadlines. Their technical expertise and creative vision elevated the entire project.',
      author: 'John Director',
      position: 'Director, Universal Pictures'
    }
  },
  'aether-dynamics': {
    title: 'Aether Dynamics',
    category: 'Commercial',
    role: 'Compositing Lead',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    year: '2025',
    description: 'High-end automotive commercial with fluid simulations and particle systems.',
    client: 'Audi AG',
    duration: '4 months',
    tools: ['Houdini', 'Arnold', 'Nuke', 'RealFlow', 'Clarisse'],
    team: '5 FX Artists, 2 Compositors',
    challenge: 'Balancing photorealism with stylized fluid effects to create visually stunning yet believable automotive sequences.',
    solution: 'Combined procedural modeling with hand-crafted simulations and advanced compositing techniques for flawless integration.'
  },
  'neon-horizon': {
    title: 'Neon Horizon',
    category: 'Game',
    role: 'Cinematic VFX',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    year: '2025',
    description: 'Cyberpunk game cinematics featuring holographic effects and neon environments.',
    client: 'Cyberpunk Games Studio',
    duration: '5 months',
    tools: ['Unreal Engine 5', 'Houdini', 'Substance Suite', 'Niagara'],
    team: '6 VFX Artists',
    challenge: 'Creating real-time VFX for game cinematics that push visual boundaries while maintaining performance budgets.',
    solution: 'Leveraged UE5 Niagara particle system with custom shaders and LOD systems for optimal real-time performance.'
  }
};

export default function ProjectDetailPage() {
  const [projectData, setProjectData] = useState<ProjectDetailsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get project ID from URL params
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    
    if (projectId && PROJECT_DETAILS[projectId]) {
      setProjectData(PROJECT_DETAILS[projectId]);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-bg text-text-primary">Loading...</div>;
  }

  if (!projectData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-bg text-text-primary gap-6">
        <h1 className="text-3xl font-display">Project Not Found</h1>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-bg-deep font-medium hover:scale-105 transition-transform"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between py-8 border-b border-stroke"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-stroke text-text-primary hover:border-accent/50 hover:text-accent transition-all"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <div className="text-center">
            <span className="text-xs text-accent uppercase tracking-wider">Project Details</span>
          </div>
          <div className="w-[72px]" /> {/* Spacer for centering */}
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="relative aspect-[16/9] rounded-xl overflow-hidden my-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img 
            src={projectData.image} 
            alt={projectData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-12">
          {/* Left Column - Project Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Title Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium uppercase tracking-wider">
                  {projectData.category}
                </span>
                <span className="text-sm text-muted">{projectData.year}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display text-text-primary tracking-wide mb-4">
                {projectData.title}
              </h1>
              <p className="text-lg text-muted leading-relaxed">
                {projectData.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-8 mb-12 pb-12 border-b border-stroke">
              {projectData.client && (
                <div>
                  <h3 className="text-xs text-accent uppercase tracking-wider mb-2">Client</h3>
                  <p className="text-text-primary font-medium">{projectData.client}</p>
                </div>
              )}
              {projectData.role && (
                <div>
                  <h3 className="text-xs text-accent uppercase tracking-wider mb-2">Role</h3>
                  <p className="text-text-primary font-medium">{projectData.role}</p>
                </div>
              )}
              {projectData.duration && (
                <div>
                  <h3 className="text-xs text-accent uppercase tracking-wider mb-2">Duration</h3>
                  <p className="text-text-primary font-medium">{projectData.duration}</p>
                </div>
              )}
              {projectData.team && (
                <div>
                  <h3 className="text-xs text-accent uppercase tracking-wider mb-2">Team</h3>
                  <p className="text-text-primary font-medium">{projectData.team}</p>
                </div>
              )}
            </div>

            {/* Challenge & Solution */}
            {(projectData.challenge || projectData.solution) && (
              <div className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projectData.challenge && (
                    <motion.div 
                      className="p-6 rounded-lg bg-surface border border-stroke"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-sm font-display text-accent uppercase tracking-wider mb-3">Challenge</h3>
                      <p className="text-muted leading-relaxed">{projectData.challenge}</p>
                    </motion.div>
                  )}
                  {projectData.solution && (
                    <motion.div 
                      className="p-6 rounded-lg bg-surface border border-stroke"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-sm font-display text-accent uppercase tracking-wider mb-3">Solution</h3>
                      <p className="text-muted leading-relaxed">{projectData.solution}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* Tools */}
            {projectData.tools && projectData.tools.length > 0 && (
              <div className="mb-12">
                <h3 className="text-sm font-display text-accent uppercase tracking-wider mb-4">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {projectData.tools.map((tool, i) => (
                    <motion.span
                      key={tool}
                      className="px-4 py-2 rounded-full bg-surface border border-stroke text-text-primary text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      whileHover={{ borderColor: 'rgba(232, 164, 0, 0.5)' }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Awards */}
            {projectData.awards && projectData.awards.length > 0 && (
              <div>
                <h3 className="text-sm font-display text-accent uppercase tracking-wider mb-4">Awards & Recognition</h3>
                <div className="space-y-3">
                  {projectData.awards.map((award, i) => (
                    <motion.div
                      key={award}
                      className="flex items-center gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-accent"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-text-primary font-medium">{award}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column - Testimonial & CTA */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {projectData.testimonial && (
              <motion.div 
                className="p-8 rounded-lg bg-surface border border-stroke mb-8"
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">
                  <span className="text-4xl text-accent">❝</span>
                </div>
                <p className="text-sm text-muted italic leading-relaxed mb-4">
                  {projectData.testimonial.text}
                </p>
                <div className="pt-4 border-t border-stroke">
                  <p className="text-sm font-medium text-text-primary">
                    {projectData.testimonial.author}
                  </p>
                  <p className="text-xs text-muted">
                    {projectData.testimonial.position}
                  </p>
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div 
              className="p-6 rounded-lg bg-accent/10 border border-accent/20"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm text-muted mb-4">
                Interested in working together?
              </p>
              <motion.a
                href="#contact"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-accent text-bg-deep font-medium text-sm hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
                <ArrowUpRight size={16} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

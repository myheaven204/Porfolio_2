import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Layers, Wand2, Sparkles, Image, ExternalLink } from 'lucide-react';

const STEP_ICONS: Record<string, React.ReactNode> = {
  Plate: <Image size={16} />,
  'CG Elements': <Layers size={16} />,
  'FX Pass': <Wand2 size={16} />,
  'Final Comp': <Sparkles size={16} />,
  Reference: <Image size={16} />,
  '3D Model': <Layers size={16} />,
  Simulation: <Wand2 size={16} />,
  Concept: <Image size={16} />,
  Blockout: <Layers size={16} />,
  Lighting: <Wand2 size={16} />,
  'Final Render': <Sparkles size={16} />,
};

interface BreakdownStep {
  label: string;
  description: string;
  youtubeId: string;
  timestamp?: string;
}

interface BreakdownProject {
  id: number;
  title: string;
  youtubeId: string;
  steps: BreakdownStep[];
}

const BREAKDOWNS: BreakdownProject[] = [
  {
    id: 1,
    title: 'Stellar Odyssey - Space Battle',
    youtubeId: 'dQw4w9WgXcQ',
    steps: [
      {
        label: 'Plate',
        description: 'Original live-action footage with green screen elements',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '0s',
      },
      {
        label: 'CG Elements',
        description: 'Spacecraft models, debris, and environment assets',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '15s',
      },
      {
        label: 'FX Pass',
        description: 'Explosions, particle systems, and volumetric effects',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '30s',
      },
      {
        label: 'Final Comp',
        description: 'Color graded composite with all elements integrated',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '45s',
      },
    ],
  },
  {
    id: 2,
    title: 'Aether Dynamics - Product Reveal',
    youtubeId: 'dQw4w9WgXcQ',
    steps: [
      {
        label: 'Reference',
        description: 'Clean studio shot for tracking and lighting reference',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '0s',
      },
      {
        label: '3D Model',
        description: 'High-detail product model with procedural materials',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '15s',
      },
      {
        label: 'Simulation',
        description: 'Liquid and particle simulations for dynamic reveal',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '30s',
      },
      {
        label: 'Final Comp',
        description: 'Polished final with motion blur and lens effects',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '45s',
      },
    ],
  },
  {
    id: 3,
    title: 'Neon Horizon - Environment',
    youtubeId: 'dQw4w9WgXcQ',
    steps: [
      {
        label: 'Concept',
        description: 'Initial concept art and mood board reference',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '0s',
      },
      {
        label: 'Blockout',
        description: 'Gray-box 3D layout for composition and scale',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '15s',
      },
      {
        label: 'Lighting',
        description: 'Atmospheric lighting with neon accents and fog',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '30s',
      },
      {
        label: 'Final Render',
        description: 'Full detail render with post-processing effects',
        youtubeId: 'dQw4w9WgXcQ',
        timestamp: '45s',
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

function YouTubeEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  return (
    <div className="relative w-full h-full">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&controls=1`}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function VideoCard({
  step,
  index,
  isActive,
  onClick,
}: {
  step: BreakdownStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const rotateX = isHovered ? ((mousePos.y / 120) - 0.5) * -8 : 0;
  const rotateY = isHovered ? ((mousePos.x / 280) - 0.5) * 8 : 0;

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer rounded-2xl overflow-hidden border transition-all duration-500 ${
        isActive
          ? 'border-accent/60 shadow-[0_0_30px_rgba(232,164,0,0.15)]'
          : 'border-stroke hover:border-accent/30'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '800px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative"
      >
        {/* Mouse-follow glow */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, rgba(232, 164, 0, 0.12) 0%, transparent 100%)`,
            }}
          />
        )}

        {/* Thumbnail */}
        <div className="relative aspect-video bg-surface overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${step.youtubeId}/hqdefault.jpg`}
            alt={step.label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Dark overlay */}
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-40'}`} />

          {/* Play button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center shadow-lg shadow-accent/30 backdrop-blur-sm">
              <Play size={18} className="text-bg-deep ml-0.5" fill="currentColor" />
            </div>
          </div>

          {/* Active playing indicator */}
          {isActive && (
            <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-accent/90 backdrop-blur-sm">
              <div className="flex items-center gap-0.5">
                <motion.div
                  className="w-1 h-3 bg-bg-deep rounded-full"
                  animate={{ scaleY: [1, 0.4, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-1 h-3 bg-bg-deep rounded-full"
                  animate={{ scaleY: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-1 h-3 bg-bg-deep rounded-full"
                  animate={{ scaleY: [1, 0.4, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
              <span className="text-[10px] text-bg-deep font-medium uppercase tracking-wider">Playing</span>
            </div>
          )}

          {/* Film frame corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-accent/30" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-accent/30" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-accent/30" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-accent/30" />
        </div>

        {/* Info bar */}
        <div className="p-4 bg-surface/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              isActive ? 'bg-accent text-bg-deep' : 'bg-surface-elevated text-muted'
            }`}>
              <span className="font-display text-sm">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`transition-colors duration-300 ${isActive ? 'text-accent' : 'text-muted'}`}>
                  {STEP_ICONS[step.label] || <Sparkles size={14} />}
                </span>
                <h4 className={`text-sm font-medium transition-colors duration-300 truncate ${
                  isActive ? 'text-text-primary' : 'text-muted'
                }`}>
                  {step.label}
                </h4>
              </div>
              <p className="text-xs text-muted/60 truncate mt-0.5">{step.description}</p>
            </div>
            {step.timestamp && (
              <span className="flex-shrink-0 text-[10px] text-muted/50 font-mono bg-surface-elevated px-2 py-1 rounded">
                {step.timestamp}
              </span>
            )}
          </div>
        </div>

        {/* Accent line on active */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
            layoutId="activeBreakdownLine"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Breakdown() {
  const [activeBreakdown, setActiveBreakdown] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentBreakdown = BREAKDOWNS[activeBreakdown];
  const currentStep = currentBreakdown.steps[activeStep];

  const nextBreakdown = () => {
    setActiveBreakdown((prev) => (prev + 1) % BREAKDOWNS.length);
    setActiveStep(0);
    setIsPlaying(false);
  };

  const prevBreakdown = () => {
    setActiveBreakdown((prev) => (prev - 1 + BREAKDOWNS.length) % BREAKDOWNS.length);
    setActiveStep(0);
    setIsPlaying(false);
  };

  const selectStep = (index: number) => {
    setActiveStep(index);
    setIsPlaying(true);
  };

  return (
    <section id="breakdown" className="bg-bg-deep py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-accent/50" />
              <span className="text-xs text-accent uppercase tracking-[0.4em] font-medium">Process</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary tracking-wide">
              VFX BREAKDOWN
            </h2>
            <p className="text-sm text-muted mt-4 max-w-md">
              Step-by-step breakdown of the visual effects pipeline from plate to final composite.
            </p>
          </div>

          {/* Breakdown navigation */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={prevBreakdown}
              className="p-3 rounded-full border border-stroke hover:border-accent/50 text-muted hover:text-accent transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <span className="text-sm text-muted font-mono">
              {String(activeBreakdown + 1).padStart(2, '0')} / {String(BREAKDOWNS.length).padStart(2, '0')}
            </span>
            <motion.button
              onClick={nextBreakdown}
              className="p-3 rounded-full border border-stroke hover:border-accent/50 text-muted hover:text-accent transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Breakdown title */}
        <AnimatePresence mode="wait">
          <motion.h3
            key={currentBreakdown.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="text-xl md:text-2xl font-display text-text-primary tracking-wide mb-8"
          >
            {currentBreakdown.title}
          </motion.h3>
        </AnimatePresence>

        {/* Main content */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Video player - larger */}
          <div className="lg:col-span-3">
            <motion.div
              className="relative aspect-video bg-surface rounded-2xl overflow-hidden border border-stroke shadow-2xl shadow-black/30"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {isPlaying ? (
                <YouTubeEmbed youtubeId={currentStep.youtubeId} title={`${currentStep.label} - ${currentBreakdown.title}`} />
              ) : (
                <div
                  className="absolute inset-0 cursor-pointer group"
                  onClick={() => setIsPlaying(true)}
                >
                  <img
                    src={`https://img.youtube.com/vi/${currentStep.youtubeId}/maxresdefault.jpg`}
                    alt={currentStep.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-accent/90 flex items-center justify-center shadow-2xl shadow-accent/40"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={28} className="text-bg-deep ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Step label overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                    <div className="flex items-center gap-2 text-accent mb-1">
                      {STEP_ICONS[currentStep.label] || <Sparkles size={16} />}
                      <span className="text-sm font-medium uppercase tracking-wider">{currentStep.label}</span>
                    </div>
                    <p className="text-sm text-white/70">{currentStep.description}</p>
                  </div>
                </div>
              )}

              {/* Film frame corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent/30 pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent/30 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent/30 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent/30 pointer-events-none" />

              {/* Open in YouTube link */}
              <a
                href={`https://www.youtube.com/watch?v=${currentStep.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white/60 hover:text-accent transition-colors duration-200"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink size={14} />
              </a>
            </motion.div>

            {/* Step progress bar */}
            <div className="flex items-center gap-2 mt-4">
              {currentBreakdown.steps.map((step, i) => (
                <button
                  key={step.label}
                  onClick={() => selectStep(i)}
                  className="flex-1 group"
                >
                  <div className={`h-1 rounded-full transition-all duration-500 ${
                    i <= activeStep ? 'bg-accent' : 'bg-stroke group-hover:bg-muted'
                  }`} />
                  <span className={`text-[10px] mt-1 block transition-colors duration-300 ${
                    i === activeStep ? 'text-accent' : 'text-muted/40 group-hover:text-muted'
                  }`}>
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {currentBreakdown.steps.map((step, index) => (
              <VideoCard
                key={`${activeBreakdown}-${step.label}`}
                step={step}
                index={index}
                isActive={activeStep === index}
                onClick={() => selectStep(index)}
              />
            ))}
          </div>
        </div>

        {/* Project selector dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {BREAKDOWNS.map((project, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setActiveBreakdown(index);
                setActiveStep(0);
                setIsPlaying(false);
              }}
              className={`relative h-2 rounded-full transition-all duration-500 ${
                activeBreakdown === index ? 'w-10 bg-accent' : 'w-2 bg-stroke hover:bg-muted'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {activeBreakdown === index && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent/40"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Layers, Image, Wand2, Sparkles } from 'lucide-react';

const BREAKDOWNS = [
  {
    id: 1,
    title: 'Stellar Odyssey - Space Battle',
    steps: [
      {
        label: 'Plate',
        description: 'Original live-action footage with green screen elements',
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
        icon: <Image size={16} />,
      },
      {
        label: 'CG Elements',
        description: 'Spacecraft models, debris, and environment assets',
        image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80',
        icon: <Layers size={16} />,
      },
      {
        label: 'FX Pass',
        description: 'Explosions, particle systems, and volumetric effects',
        image: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?w=800&q=80',
        icon: <Wand2 size={16} />,
      },
      {
        label: 'Final Comp',
        description: 'Color graded composite with all elements integrated',
        image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
        icon: <Sparkles size={16} />,
      },
    ],
  },
  {
    id: 2,
    title: 'Aether Dynamics - Product Reveal',
    steps: [
      {
        label: 'Reference',
        description: 'Clean studio shot for tracking and lighting reference',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        icon: <Image size={16} />,
      },
      {
        label: '3D Model',
        description: 'High-detail product model with procedural materials',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        icon: <Layers size={16} />,
      },
      {
        label: 'Simulation',
        description: 'Liquid and particle simulations for dynamic reveal',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
        icon: <Wand2 size={16} />,
      },
      {
        label: 'Final Comp',
        description: 'Polished final with motion blur and lens effects',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        icon: <Sparkles size={16} />,
      },
    ],
  },
  {
    id: 3,
    title: 'Neon Horizon - Environment',
    steps: [
      {
        label: 'Concept',
        description: 'Initial concept art and mood board reference',
        image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
        icon: <Image size={16} />,
      },
      {
        label: 'Blockout',
        description: 'Gray-box 3D layout for composition and scale',
        image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80',
        icon: <Layers size={16} />,
      },
      {
        label: 'Lighting',
        description: 'Atmospheric lighting with neon accents and fog',
        image: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=800&q=80',
        icon: <Wand2 size={16} />,
      },
      {
        label: 'Final Render',
        description: 'Full detail render with post-processing effects',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
        icon: <Sparkles size={16} />,
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Breakdown() {
  const [activeBreakdown, setActiveBreakdown] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const currentBreakdown = BREAKDOWNS[activeBreakdown];
  const currentStep = currentBreakdown.steps[activeStep];

  const nextBreakdown = () => {
    setActiveBreakdown((prev) => (prev + 1) % BREAKDOWNS.length);
    setActiveStep(0);
  };

  const prevBreakdown = () => {
    setActiveBreakdown((prev) => (prev - 1 + BREAKDOWNS.length) % BREAKDOWNS.length);
    setActiveStep(0);
  };

  return (
    <section id="breakdown" className="bg-bg-deep py-24 md:py-32">
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
            <button
              onClick={prevBreakdown}
              className="p-3 rounded-full border border-stroke hover:border-accent/50 text-muted hover:text-text-primary transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-muted font-mono">
              {String(activeBreakdown + 1).padStart(2, '0')} / {String(BREAKDOWNS.length).padStart(2, '0')}
            </span>
            <button
              onClick={nextBreakdown}
              className="p-3 rounded-full border border-stroke hover:border-accent/50 text-muted hover:text-text-primary transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Breakdown title */}
        <motion.h3
          key={currentBreakdown.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-display text-text-primary tracking-wide mb-8"
        >
          {currentBreakdown.title}
        </motion.h3>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image viewer */}
          <motion.div
            className="relative aspect-video bg-surface rounded-xl overflow-hidden border border-stroke"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.img
              key={`${activeBreakdown}-${activeStep}`}
              src={currentStep.image}
              alt={currentStep.label}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Step label overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-2 text-accent mb-1">
                {currentStep.icon}
                <span className="text-sm font-medium uppercase tracking-wider">{currentStep.label}</span>
              </div>
              <p className="text-sm text-white/80">{currentStep.description}</p>
            </div>

            {/* Film frame corners */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-accent/40" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-accent/40" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-accent/40" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-accent/40" />
          </motion.div>

          {/* Steps selector */}
          <div className="flex flex-col gap-4">
            {currentBreakdown.steps.map((step, index) => (
              <motion.button
                key={step.label}
                onClick={() => setActiveStep(index)}
                className={`group flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 text-left ${
                  activeStep === index
                    ? 'bg-surface border-accent/50'
                    : 'bg-transparent border-stroke hover:border-accent/30'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Step number */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-display text-lg transition-colors ${
                  activeStep === index
                    ? 'bg-accent text-bg-deep'
                    : 'bg-surface-elevated text-muted group-hover:text-text-primary'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Step info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`transition-colors ${activeStep === index ? 'text-accent' : 'text-muted'}`}>
                      {step.icon}
                    </span>
                    <h4 className={`font-medium transition-colors ${
                      activeStep === index ? 'text-text-primary' : 'text-muted group-hover:text-text-primary'
                    }`}>
                      {step.label}
                    </h4>
                  </div>
                  <p className="text-sm text-muted/70 line-clamp-2">{step.description}</p>
                </div>

                {/* Thumbnail */}
                <div className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border border-stroke">
                  <img
                    src={step.image}
                    alt={step.label}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {BREAKDOWNS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveBreakdown(index);
                setActiveStep(0);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeBreakdown === index ? 'w-8 bg-accent' : 'bg-stroke hover:bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

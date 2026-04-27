import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    image: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=600',
    rotation: -3,
  },
  {
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
    rotation: 2,
  },
  {
    image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=600',
    rotation: -2,
  },
  {
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
    rotation: 3,
  },
  {
    image: 'https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=600',
    rotation: -1,
  },
  {
    image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=600',
    rotation: 2,
  },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;
    if (!section || !content || !col1 || !col2) return;

    const pinTrigger = ScrollTrigger.create({
      trigger: content,
      start: 'top top',
      end: () => `+=${section.offsetHeight - window.innerHeight}`,
      pin: true,
      pinSpacing: false,
    });

    const parallax1 = gsap.to(col1, {
      y: -300,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    const parallax2 = gsap.to(col2, {
      y: 200,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    return () => {
      pinTrigger.kill();
      parallax1.scrollTrigger?.kill();
      parallax2.scrollTrigger?.kill();
    };
  }, []);

  const col1Items = ITEMS.slice(0, 3);
  const col2Items = ITEMS.slice(3, 6);

  return (
    <section ref={sectionRef} id="explorations" className="relative min-h-[300vh] bg-bg overflow-hidden">
      {/* Pinned center content */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex items-center justify-center pointer-events-none"
      >
        <div className="text-center px-6 pointer-events-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-body font-light text-text-primary mb-4">
            Visual <em style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}>playground</em>
          </h2>
          <p className="text-sm text-muted max-w-xs mx-auto mb-8">
            Experimental work exploring the edges of visual communication and interaction.
          </p>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-text-primary transition-colors duration-200 group relative rounded-full px-5 py-2.5 border border-stroke hover:border-transparent"
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient" />
            <span className="absolute inset-[1px] rounded-full bg-bg" />
            <span className="relative z-10 flex items-center gap-2">
              View on Dribbble <ArrowUpRight size={14} />
            </span>
          </a>
        </div>
      </div>

      {/* Parallax columns */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-2 gap-12 md:gap-40">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-8 items-end pointer-events-auto">
            {col1Items.map((item, i) => (
              <div
                key={i}
                className="w-full max-w-[280px] md:max-w-[320px] aspect-square rounded-2xl overflow-hidden cursor-zoom-in border border-stroke"
                style={{ transform: `rotate(${item.rotation}deg)` }}
                onClick={() => setLightboxImg(item.image)}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-8 items-start mt-32 pointer-events-auto">
            {col2Items.map((item, i) => (
              <div
                key={i}
                className="w-full max-w-[280px] md:max-w-[320px] aspect-square rounded-2xl overflow-hidden cursor-zoom-in border border-stroke"
                style={{ transform: `rotate(${item.rotation}deg)` }}
                onClick={() => setLightboxImg(item.image)}
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-8 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-muted hover:text-text-primary transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              src={lightboxImg}
              alt=""
              className="max-w-full max-h-full rounded-2xl object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

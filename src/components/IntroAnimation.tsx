import { motion } from 'motion/react';
import { Hammer } from 'lucide-react';
import { useState, useEffect } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState('initial');

  useEffect(() => {
    const p1 = setTimeout(() => setPhase('text'), 300);
    const p2 = setTimeout(() => setPhase('desc'), 800);
    const p3 = setTimeout(onComplete, 2500);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        y: -40,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      }}
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="flex flex-col items-center max-w-xl px-10 text-center">
        <motion.div
          layoutId="logo-container"
          className="w-24 h-24 bg-brand-purple rounded-[2rem] flex items-center justify-center mb-10 shadow-3xl shadow-brand-purple/20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M14.5 9.5 22 2l-2.5 2.5L22 7l-2.5-2.5L12 12l2.5 2.5L22 17l-2.5-2.5L22 22l-7.5-7.5-5 5-7.5-7.5 7.5-7.5 5 5Z" />
          </svg>
        </motion.div>

        <div className="relative">
          <motion.div 
            layoutId="logo-text"
            className="flex flex-col items-center gap-0 leading-none mb-10"
          >
            <span className="text-white font-serif italic text-6xl md:text-8xl tracking-tightest uppercase">TEMPLATE</span>
            <span className="bg-linear-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-sans font-black text-2xl md:text-4xl tracking-[0.4em] uppercase mt-2">FORGE</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={phase === 'desc' || phase === 'text' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            {phase === 'desc' && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-slate-400 text-lg font-light tracking-widest uppercase mb-12"
              >
                Premier Digital Craftsmanship & Premium Assets
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Decorative lines */}
        <motion.div 
          className="absolute h-[1px] bg-brand-purple/30 left-0 right-0 top-1/2 -z-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "circInOut" }}
        />
      </div>

      {/* Grid pattern in background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05] pointer-events-none" />
    </motion.div>
  );
}

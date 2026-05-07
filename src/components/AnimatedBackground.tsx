import { motion } from 'motion/react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-white pointer-events-none">
      {/* Soft Blended Static Accents - Enhanced Visibility & Vibrancy */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-brand-purple/40 blur-[130px] rounded-full animate-soft-pulse opacity-100" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-brand-pink/35 blur-[150px] rounded-full animate-soft-pulse [animation-delay:3s] opacity-90" />
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-300/25 blur-[110px] rounded-full animate-soft-pulse [animation-delay:1.5s]" />
      
      {/* Structural Grid - High Definition */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1.5px,transparent_1.5px),linear-gradient(to_bottom,#0000000a_1.5px,transparent_1.5px)] bg-[size:100px_100px]" />
    </div>
  );
}

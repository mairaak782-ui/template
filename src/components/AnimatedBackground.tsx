import { motion } from 'motion/react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
      {/* Static Premium Gradient for better performance */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.04) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.04) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.02) 0%, transparent 40%)
          `
        }}
      />
      
      {/* Structural Grid - Minimalist */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:80px_80px]" />
    </div>
  );
}

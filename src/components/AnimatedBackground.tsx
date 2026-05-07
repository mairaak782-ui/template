import { motion } from 'motion/react';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-white pointer-events-none">
      {/* Optimized Soft Mesh Gradient using CSS Radial Gradients instead of heavy Blur filters */}
      <div 
        className="absolute inset-0 opacity-40 animate-soft-pulse"
        style={{
          background: `
            radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
          `,
          willChange: 'opacity'
        }}
      />
      
      {/* Structural Grid - Minimalist */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:100px_100px]" />
    </div>
  );
}

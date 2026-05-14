import { motion } from 'motion/react';
import { products } from '../constants';

export default function CollectionTicker() {
  // Duplicate products to create seamless loop
  const tickerItems = [...products, ...products];

  return (
    <section className="py-20 bg-white overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-slate-100" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-purple">Live Collection Viewer</span>
          <div className="h-[1px] flex-1 bg-slate-100" />
        </div>
      </div>

      <div className="relative">
        {/* Gradients for fade effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-white to-transparent z-10" />

        <motion.div 
          className="flex gap-8 px-4"
          animate={{
            x: [0, -1920],
          }}
          style={{ willChange: 'transform' }}
          transition={{
            duration: 50, // Slightly slower for smoother feel
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {tickerItems.map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`}
              className="flex-none w-72 group"
            >
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-100 mb-4 bg-white shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.badge && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 border border-slate-100 shadow-sm">
                    {item.badge}
                  </div>
                )}
              </div>
              <div className="px-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-1 truncate">{item.title}</h4>
                <p className="text-[10px] text-slate-400 font-medium tracking-tight uppercase">{item.category}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

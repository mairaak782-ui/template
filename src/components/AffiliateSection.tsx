import { motion } from 'motion/react';
import { Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { resources } from '../constants';

export default function AffiliateSection() {
  return (
    <section id="affiliate" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-brand-gold font-bold uppercase tracking-[0.4em] text-[9px] mb-4">
              <ShieldCheck size={14} />
              Curated Excellence
            </div>
            <h2 className="text-4xl font-serif italic text-slate-900 mb-4">Recommended Resources</h2>
            <p className="text-slate-500 text-base font-light leading-relaxed">
              Precision tools for high-impact decision making. Every resource is vetted for the modern digital entrepreneur.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-loose mb-2 font-bold">
              Affiliate Disclosure
            </p>
            <div className="h-px w-24 bg-slate-200 ml-auto" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {resources.map((resource, idx) => (
            <motion.a
              key={resource.id}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col p-12 rounded-sm border border-slate-100 hover:border-brand-gold/40 transition-all duration-700 bg-white shadow-lg shadow-slate-200/20"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden mb-10 bg-white border border-slate-100 p-0 shadow-md group-hover:scale-110 group-hover:border-brand-gold/50 transition-all duration-700">
                <img 
                  src={resource.image} 
                  alt={resource.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={10} 
                    fill={i < Math.floor(resource.rating) ? "#D4AF37" : "none"} 
                    className={i < Math.floor(resource.rating) ? "text-brand-gold" : "text-slate-100"} 
                  />
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-4 flex items-center justify-between group-hover:text-brand-gold transition-colors font-serif italic text-slate-900">
                {resource.title}
                <motion.div whileHover={{ x: 5 }}>
                  <ExternalLink size={18} className="text-slate-300 group-hover:text-brand-gold transition-all" />
                </motion.div>
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-12 font-light">
                {resource.description}
              </p>
              
              <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold px-3 py-1 bg-brand-gold/5 rounded-sm">Protocol 01</span>
                <span className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em]">Verified Asset</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

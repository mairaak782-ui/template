import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-bg-dark">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-linear-to-bl from-brand-gold/5 via-transparent to-transparent opacity-20" />
      <div className="absolute -top-24 -left-24 -z-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] opacity-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-extrabold uppercase tracking-[0.4em] text-brand-gold mb-8 w-fit shadow-sm"
            >
              <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse shadow-[0_0_8px_#D4AF37]" />
              Elite Digital Systems
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-[5.5rem] font-serif italic text-slate-900 leading-[1] mb-8 tracking-tighter"
            >
              Precision <br />
              <span className="text-gradient-gold not-italic font-sans font-black uppercase">Built Success.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-base text-slate-500 mb-10 max-w-lg leading-relaxed font-light"
            >
              Unlock the architecture of high-converting businesses. We provide the templates, the strategy, and the aesthetic for the next generation of digital leaders.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-8"
            >
              <motion.a 
                href="#store" 
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#store')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brand-gold text-white px-12 py-5 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] hover:brightness-110 transition-all gold-glow flex items-center gap-4 group"
              >
                Access Systems
                <ShoppingBag size={14} className="group-hover:rotate-12 transition-transform" />
              </motion.a>
              <motion.a 
                href="#blog" 
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#blog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-12 py-5 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] border border-slate-200 hover:border-brand-gold transition-all text-slate-600"
              >
                The Blueprint
              </motion.a>
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden bg-linear-to-br from-slate-50/50 to-white shadow-2xl shadow-slate-200/50">
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-brand-gold/5 to-transparent opacity-30" />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-2/3 h-2/3">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white border border-slate-100 rounded-xl shadow-lg flex flex-col p-4 justify-between"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center"><Terminal size={14} className="text-brand-gold" /></div>
                    <div className="space-y-1">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full" />
                      <div className="w-1/2 h-1.5 bg-slate-100 rounded-full" />
                    </div>
                  </motion.div>
                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="bg-white border border-slate-100 rounded-xl shadow-lg flex flex-col p-4 justify-between"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-50" />
                    <div className="w-full h-1/2 bg-brand-gold/5 rounded-lg animate-pulse" />
                  </motion.div>
                  <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="bg-white border border-slate-100 rounded-xl shadow-lg flex flex-col p-4 gap-3"
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-brand-gold/40" />
                      <div className="w-2 h-2 rounded-full bg-slate-200" />
                    </div>
                    <div className="flex-1 rounded-sm border border-slate-100 bg-slate-50" />
                  </motion.div>
                  <motion.div 
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="bg-white border border-brand-gold/20 rounded-xl shadow-xl shadow-brand-gold/5 flex items-center justify-center"
                  >
                    <span className="text-brand-gold text-2xl font-serif italic font-bold">100%</span>
                  </motion.div>
                </div>
              </div>

              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 -right-4 bg-white border border-slate-100 p-4 rounded-sm shadow-2xl border-l-brand-gold border-l-2"
              >
                <div className="text-2xl font-bold text-brand-gold">0.1s</div>
                <div className="text-[7px] text-slate-400 font-bold uppercase tracking-[0.3em]">Latency</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 -left-8 bg-white border border-slate-100 p-4 rounded-sm shadow-2xl border-r-brand-gold border-r-2"
              >
                <div className="text-2xl font-bold text-slate-900">ELITE</div>
                <div className="text-[7px] text-slate-400 font-bold uppercase tracking-[0.3em]">Tier One</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

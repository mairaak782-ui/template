import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, Terminal, TrendingUp, Zap, Globe, Sparkles, Layout, CreditCard } from 'lucide-react';

const slides = [
  {
    id: 'templates',
    tag: 'Premium Design Ecosystem',
    title: {
      serif: 'Download Ready-to-Use',
      bold: 'Websites & Designs.'
    },
    description: 'High-performance templates and aesthetic greeting cards designed for modern builders. Instant download, easy to customize, production-ready.',
    ctaPrimary: { text: 'Shop Templates', href: '#templates', icon: <ShoppingBag size={14} /> },
    ctaSecondary: { text: 'Browse Designs', href: '#cards' },
    bgImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'affiliate',
    tag: 'Professional Gear Registry',
    title: {
      serif: 'Curated Professional',
      bold: 'Tools We Use.'
    },
    description: 'The exact software, hosting, and design tools we use to build high-converting systems. Optimized for performance and scale.',
    ctaPrimary: { text: 'Recommended Tools', href: '#affiliate', icon: <TrendingUp size={14} /> },
    ctaSecondary: { text: 'Get Free Template', href: '#contact-form' },
    bgImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2672&auto=format&fit=crop'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white">
      {/* Structural Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white to-transparent" />
      </div>

      {/* Image Layer */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`bg-${slide.id}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.6, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img 
            src={slide.bgImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover grayscale opacity-100"
          />
          <div className="absolute inset-0 bg-white/40" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-linear-to-bl from-brand-gold/10 via-transparent to-transparent opacity-30" />
      <div className="absolute -top-24 -left-24 -z-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] opacity-20" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10 w-full">
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-extrabold uppercase tracking-[0.5em] text-brand-gold mb-10 w-fit shadow-sm"
              >
                <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]" />
                {slide.tag}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-[6.5rem] font-serif italic text-slate-900 leading-[0.9] mb-10 tracking-tighter"
              >
                {slide.title.serif} <br />
                <span className="text-gradient-gold not-italic font-sans font-black uppercase text-4xl md:text-[5.5rem] block mt-2">
                  {slide.title.bold}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-sm md:text-lg text-slate-600 mb-12 max-w-xl leading-relaxed font-light"
              >
                {slide.description}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-8"
              >
                <motion.a 
                  href={slide.ctaPrimary.href} 
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    if (slide.ctaPrimary.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(slide.ctaPrimary.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-brand-gold text-white px-14 py-6 rounded-sm font-bold uppercase text-[11px] tracking-[0.3em] hover:brightness-110 transition-all gold-glow flex items-center gap-4 group shadow-2xl shadow-brand-gold/20"
                >
                  {slide.ctaPrimary.text}
                  <span className="group-hover:translate-x-1 transition-transform">
                    {slide.ctaPrimary.icon}
                  </span>
                </motion.a>
                <motion.a 
                  href={slide.ctaSecondary.href} 
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.05)", x: 5 }}
                  onClick={(e) => {
                    if (slide.ctaSecondary.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(slide.ctaSecondary.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-14 py-6 rounded-sm font-bold uppercase text-[11px] tracking-[0.3em] border border-slate-200 hover:border-brand-gold transition-all text-slate-800 flex items-center gap-3"
                >
                  {slide.ctaSecondary.text}
                  <ArrowRight size={14} className="opacity-40" />
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Pagination */}
          <div className="flex gap-4 mt-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  currentSlide === idx ? 'w-24 bg-brand-gold' : 'w-10 bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`visual-${slide.id}`}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1, x: -50 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden bg-linear-to-br from-slate-50/50 to-white shadow-3xl shadow-slate-200/50">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-brand-gold/5 to-transparent opacity-30" />
                
                <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
                  {slide.id === 'templates' ? (
                    <div className="grid grid-cols-2 gap-6 w-full h-full">
                      <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="bg-white border border-slate-100 rounded-xl shadow-xl p-6 flex flex-col justify-between">
                        <Layout className="text-brand-gold" size={24} />
                        <div className="space-y-4">
                          <div className="w-full h-2 bg-slate-100 rounded-full" />
                          <div className="w-2/3 h-2 bg-slate-100 rounded-full" />
                        </div>
                      </motion.div>
                      <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 0.5 }} className="bg-white border border-brand-gold/20 rounded-xl shadow-xl p-6 flex items-center justify-center">
                        <CreditCard className="text-brand-gold animate-pulse" size={40} />
                      </motion.div>
                      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 6, repeat: Infinity }} className="col-span-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Protocol Active</div>
                          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        </div>
                        <div className="w-full h-4 bg-slate-800 rounded-sm overflow-hidden">
                          <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/3 h-full bg-brand-gold/40 skew-x-12" />
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col gap-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs uppercase font-black tracking-[0.2em] text-slate-900">Store Front</div>
                        <div className="flex gap-2 text-slate-300">
                          <div className="w-2 h-2 bg-slate-200 rounded-full" />
                          <div className="w-2 h-2 bg-slate-200 rounded-full" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 flex-1">
                        <motion.div 
                          whileHover={{ y: -10 }}
                          className="bg-white border border-slate-100 p-6 rounded-xl shadow-xl flex flex-col gap-4"
                        >
                          <div className="aspect-square bg-slate-50 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="text-brand-gold/30" size={32} />
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full" />
                          <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
                          <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between">
                            <div className="h-4 w-10 bg-brand-gold/20 rounded-full" />
                            <div className="h-4 w-4 bg-slate-100 rounded-full" />
                          </div>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="flex flex-col gap-6"
                        >
                          <div className="bg-slate-900 p-6 rounded-xl shadow-2xl flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                              <Zap className="text-brand-gold" size={16} />
                              <div className="text-[8px] text-brand-gold font-bold uppercase tracking-widest">Live</div>
                            </div>
                            <div className="text-2xl font-serif italic text-white">$2,480</div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                animate={{ width: '70%' }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="h-full bg-brand-gold" 
                              />
                            </div>
                          </div>
                          <div className="bg-white border border-slate-100 p-6 rounded-xl shadow-xl flex-1 flex flex-col justify-center gap-2">
                             <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Inventory</div>
                             <div className="text-xl font-sans font-black flex items-end gap-2">
                               942 <span className="text-[10px] text-green-500 font-bold mb-1 ml-1">+12</span>
                             </div>
                          </div>
                        </motion.div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                          ))}
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-gold flex items-center justify-center text-[8px] text-white font-bold">+8</div>
                        </div>
                        <div className="text-[9px] uppercase font-bold tracking-widest text-slate-400">Order Nexus Active</div>
                      </div>
                    </div>
                  )}
                </div>

                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-12 -right-8 bg-white border border-slate-100 py-3 px-6 rounded-sm shadow-2xl border-l-brand-gold border-l-2"
                >
                  <div className="text-xl font-bold text-brand-gold">{slide.id === 'assets' ? 'System' : 'Nexus'}</div>
                  <div className="text-[6px] text-slate-400 font-bold uppercase tracking-[0.4em]">Integrated</div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}


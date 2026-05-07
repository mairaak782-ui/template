import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, Terminal, TrendingUp, Zap, Globe, Sparkles, Layout, CreditCard } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Hero() {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'templates',
      tag: t('hero.tag1'),
      title: {
        serif: t('hero.title1.serif'),
        bold: t('hero.title1.bold')
      },
      description: t('hero.desc1'),
      ctaPrimary: { text: t('hero.cta1'), href: '#saas', icon: <ShoppingBag size={14} /> },
      ctaSecondary: { text: t('nav.matrimonial'), href: '#cards' },
      bgImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop'
    },
    {
      id: 'affiliate',
      tag: t('hero.tag2'),
      title: {
        serif: t('hero.title2.serif'),
        bold: t('hero.title2.bold')
      },
      description: t('hero.desc2'),
      ctaPrimary: { text: t('hero.cta2'), href: '#affiliate', icon: <TrendingUp size={14} /> },
      ctaSecondary: { text: t('nav.contact'), href: '#contact' },
      bgImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2672&auto=format&fit=crop'
    }
  ];

  useEffect(() => {
    // Initial delay before starting the auto-play timer
    const startTimeout = setTimeout(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 8000);
      return () => clearInterval(timer);
    }, 2000);
    
    return () => clearTimeout(startTimeout);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-20 pb-12 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`bg-${slide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950/40 to-slate-950 z-10" />
            <img 
              src={slide.bgImage} 
              alt="Hero Background" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:60px_60px] opacity-[0.02] z-20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-20 w-full pt-12 md:pt-0">
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ willChange: 'transform, opacity' }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className={`flex flex-col items-center lg:items-start text-center lg:text-left ${language === 'ur' ? 'lg:items-end lg:text-right font-urdu' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className={`inline-flex items-center gap-3 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white mb-10 w-fit shadow-sm ${language === 'ur' ? 'flex-row-reverse tracking-normal' : ''}`}
              >
                <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" />
                {slide.tag}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`text-3xl sm:text-4xl md:text-6xl lg:text-[7rem] font-serif italic text-white leading-[0.95] md:leading-[0.85] mb-12 lg:mb-14 tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}
              >
                {slide.title.serif} <br />
                <span className="not-italic font-sans font-black uppercase text-2xl sm:text-3xl md:text-5xl lg:text-[5.5rem] block mt-6 text-white tracking-tight">
                  {slide.title.bold}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base md:text-lg lg:text-xl text-slate-300 mb-12 lg:mb-16 max-w-xl leading-relaxed font-light"
              >
                {slide.description}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`flex flex-col sm:flex-row items-center gap-6 ${language === 'ur' ? 'sm:flex-row-reverse' : ''}`}
              >
                <motion.a 
                  href={slide.ctaPrimary.href} 
                  whileHover={{ scale: 1.05, backgroundColor: "#7C3AED" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    if (slide.ctaPrimary.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(slide.ctaPrimary.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-brand-purple text-white px-12 py-6 rounded-full font-black uppercase text-[11px] tracking-[0.3em] transition-all hover:shadow-2xl hover:shadow-brand-purple/40 flex items-center gap-4 group"
                >
                  <span className={language === 'ur' ? 'tracking-normal text-sm' : ''}>{slide.ctaPrimary.text}</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {slide.ctaPrimary.icon}
                  </span>
                </motion.a>
                <motion.a 
                  href={slide.ctaSecondary.href} 
                  whileHover={{ x: 5, color: "#FFFFFF" }}
                  onClick={(e) => {
                    if (slide.ctaSecondary.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(slide.ctaSecondary.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-10 py-6 rounded-full font-black uppercase text-[11px] tracking-[0.3em] border border-white/20 hover:border-white transition-all text-slate-400 flex items-center gap-3 group"
                >
                  <span className={language === 'ur' ? 'tracking-normal text-sm' : ''}>{slide.ctaSecondary.text}</span>
                  <ArrowRight size={14} className={`group-hover:translate-x-1 transition-transform ${language === 'ur' ? 'rotate-180' : ''}`} />
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Pagination */}
          <div className={`flex justify-center lg:justify-start gap-4 mt-16 md:mt-20 ${language === 'ur' ? 'lg:justify-end' : ''}`}>
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  currentSlide === idx ? 'w-24 bg-brand-purple' : 'w-10 bg-white/20'
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
              style={{ willChange: 'transform, opacity' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl border border-slate-100 flex items-center justify-center relative overflow-hidden bg-linear-to-br from-slate-50/50 to-white shadow-3xl shadow-slate-200/50">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-brand-gold/5 to-transparent opacity-30" />
                
                <div className="relative z-10 w-full h-full flex items-center justify-center p-12">
                  {slide.id === 'templates' ? (
                    <div className="grid grid-cols-2 gap-6 w-full h-full">
                      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="bg-white border border-slate-100 rounded-xl shadow-xl p-6 flex flex-col justify-between">
                        <Layout className="text-brand-purple" size={24} />
                        <div className="space-y-4">
                          <div className="w-full h-2 bg-slate-100 rounded-full" />
                          <div className="w-2/3 h-2 bg-slate-100 rounded-full" />
                        </div>
                      </motion.div>
                      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, delay: 0.5 }} className="bg-white border border-slate-100 rounded-xl shadow-xl p-6 flex items-center justify-center">
                        <CreditCard className="text-brand-purple" size={40} />
                      </motion.div>
                      <motion.div className="col-span-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Protocol Active</div>
                          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-brand-purple/40 skew-x-12" />
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
                              <Zap className="text-brand-purple" size={16} />
                              <div className="text-[8px] text-brand-purple font-bold uppercase tracking-widest">Live</div>
                            </div>
                            <div className="text-2xl font-serif italic text-white">$2,480</div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                animate={{ width: '70%' }}
                                transition={{ duration: 0.8 }}
                                className="h-full bg-brand-purple" 
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


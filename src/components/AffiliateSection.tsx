import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { ArrowUpRight, ShieldCheck, Cpu, Globe, ArrowRight, Star, Zap } from 'lucide-react';
import { resources as staticTools } from '../constants';
import { useLanguage } from '../lib/LanguageContext';

export default function AffiliateSection() {
  const { t, language } = useLanguage();
  const [affiliateProducts, setAffiliateProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setAffiliateProducts(staticTools);
      setIsLoading(false);
      return;
    }
    const q = query(
      collection(db, 'products'), 
      where('type', '==', 'affiliate'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAffiliateProducts(items.length > 0 ? items : staticTools);
      setIsLoading(false);
    }, (error) => {
      if (error.message.includes('index')) {
        const fallbackQ = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        onSnapshot(fallbackQ, (snap) => {
          const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          const filtered = all.filter((p: any) => p.type === 'affiliate');
          setAffiliateProducts(filtered.length > 0 ? filtered : staticTools);
          setIsLoading(false);
        });
      } else {
        handleFirestoreError(error, OperationType.GET, 'products');
        setAffiliateProducts(staticTools);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="affiliate" className="py-32 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/[0.03] blur-[80px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-gold/[0.03] blur-[80px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 ${language === 'ur' ? 'lg:flex-row-reverse text-right' : ''}`}>
          <div className="space-y-6 max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 backdrop-blur-md ${language === 'ur' ? 'flex-row-reverse' : ''}`}
            >
              <ShieldCheck className="w-4 h-4 text-brand-purple" />
              <span className={`text-[10px] uppercase tracking-[0.3em] text-slate-600 font-bold ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>{t('aff.tag')}</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-3xl sm:text-5xl md:text-7xl font-bold text-slate-950 leading-tight tracking-tighter ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}
            >
              {t('aff.title')} <span className="text-brand-purple">{t('aff.title.bold')}</span><span className="text-brand-gold">.</span>
            </motion.h2>
          </div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className={`lg:max-w-xs text-slate-500 border-l-2 border-brand-purple/30 pl-6 py-2 ${language === 'ur' ? 'border-l-0 border-r-2 pl-0 pr-6' : ''}`}
          >
            <p className={`text-lg font-light leading-relaxed ${language === 'ur' ? 'font-urdu' : ''}`}>
              {t('aff.desc')}
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] bg-slate-50 rounded-[2.5rem] animate-pulse border border-slate-100" />
              ))
            ) : (
              affiliateProducts.map((product, idx) => (
                <motion.div
                  key={product.id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  style={{ willChange: 'transform, opacity' }}
                  className="group relative h-full flex flex-col bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden hover:border-brand-purple/50 transition-all duration-500"
                >
                  {/* Top Preview Area */}
                  <div className="relative h-56 overflow-hidden bg-slate-50 flex items-center justify-center border-b border-slate-100">
                    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.4)_0%,transparent_70%)]" />
                    
                    <div className="relative z-10 w-28 h-28 rounded-[2rem] bg-white shadow-xl flex items-center justify-center p-5 transform group-hover:scale-105 transition-all duration-700 border border-slate-100">
                      <img 
                        src={product.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.title)}&background=8b5cf6&color=fff`} 
                        alt={product.title} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Category Tag */}
                    <div className={`absolute top-6 ${language === 'ur' ? 'left-6' : 'right-6'}`}>
                       <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-100 text-[9px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                        {product.category || 'Tool'}
                       </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className={`p-10 flex flex-col flex-grow ${language === 'ur' ? 'text-right' : ''}`}>
                    <div className={`flex justify-between items-start mb-6 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                      <h3 className="text-2xl font-bold text-slate-950 group-hover:text-brand-purple transition-colors uppercase">
                        {product.title}
                      </h3>
                      <div className={`flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                        <Star size={12} className="text-brand-gold fill-brand-gold" />
                        <span className="text-xs font-bold text-slate-900">{product.rating || '4.9'}</span>
                      </div>
                    </div>

                    <p className={`text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-light ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {product.description}
                    </p>

                    <div className={`mt-auto flex items-center justify-between pt-8 border-t border-slate-50 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                      <div className={language === 'ur' ? 'text-right' : ''}>
                        <p className={`text-[10px] text-slate-400 uppercase font-black tracking-tighter ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>{t('aff.starting')}</p>
                        <p className="text-xl font-bold text-slate-950">
                          {product.price ? `$${product.price}` : 'FREE'}
                        </p>
                      </div>

                      <motion.a 
                        href={product.affiliateLink || product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-950 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-brand-purple transition-all duration-300 shadow-xl ${language === 'ur' ? 'flex-row-reverse font-urdu tracking-normal' : ''}`}
                      >
                        {t('aff.explore')} <ArrowUpRight size={16} />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA / Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-slate-100"
        >
          {[
            { label: t('aff.stat1'), val: '50+', icon: ShieldCheck },
            { label: t('aff.stat2'), val: '10k+', icon: Globe },
            { label: t('aff.stat3'), val: '40%', icon: Zap },
            { label: t('aff.stat4'), val: '24', icon: Cpu },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <stat.icon className="w-5 h-5 text-brand-purple mx-auto mb-3" />
              <p className="text-2xl font-bold text-slate-950">{stat.val}</p>
              <p className={`text-[10px] text-slate-400 uppercase tracking-widest ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
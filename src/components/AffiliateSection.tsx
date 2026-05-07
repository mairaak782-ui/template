import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { ArrowUpRight, ShieldCheck, Cpu, Globe, ArrowRight, Star, Zap } from 'lucide-react';
import { resources as staticTools } from '../constants';

export default function AffiliateSection() {
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
    <section id="affiliate" className="py-32 bg-[#030712] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="space-y-6 max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-purple-200 font-bold">Curated Tech Stack</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-8xl font-bold text-white leading-tight tracking-tighter"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-white to-blue-400">Elite</span> <br />
              Digital Arsenal<span className="text-purple-500">.</span>
            </motion.h2>
          </div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="lg:max-w-xs text-slate-400 border-l-2 border-purple-500/30 pl-6 py-2"
          >
            <p className="text-lg font-light leading-relaxed">
              We only recommend tools that we use to build high-performance digital experiences.
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] bg-white/5 rounded-[2.5rem] animate-pulse border border-white/10" />
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
                  className="group relative h-full flex flex-col bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-purple-500/50 transition-all duration-500"
                >
                  {/* Top Preview Area */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-900/40 via-slate-900 to-blue-900/40 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-purple-500" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
                    
                    <div className="relative z-10 w-28 h-28 rounded-[2rem] bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex items-center justify-center p-5 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-1000 border border-white/20">
                      <img 
                        src={product.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.title)}&background=8b5cf6&color=fff`} 
                        alt={product.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-6 right-6">
                       <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white uppercase tracking-widest">
                        {product.category || 'Tool'}
                       </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-bold text-white">{product.rating || '4.9'}</span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Starting At</p>
                        <p className="text-xl font-bold text-white">
                          {product.price ? `$${product.price}` : 'FREE'}
                        </p>
                      </div>

                      <motion.a 
                        href={product.affiliateLink || product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-bold text-sm hover:bg-purple-500 hover:text-white transition-all duration-300"
                      >
                        Explore <ArrowUpRight size={16} />
                      </motion.a>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA / Stats (Optional) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5"
        >
          {[
            { label: 'Verified Tools', val: '50+', icon: ShieldCheck },
            { label: 'Global Users', val: '10k+', icon: Globe },
            { label: 'Efficiency Boost', val: '40%', icon: Zap },
            { label: 'Tech Partners', val: '24', icon: Cpu },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <stat.icon className="w-5 h-5 text-purple-500 mx-auto mb-3" />
              <p className="text-2xl font-bold text-white">{stat.val}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { ExternalLink, Sparkles, Zap, ArrowRight, Star } from 'lucide-react';
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
      // If index is missing, fallback to client-side filter for now
      if (error.message.includes('index')) {
        console.warn("Index needed for type filtering, using fallback.");
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
    <section id="affiliate" className="py-32 relative overflow-hidden">
      {/* Multidimensional Premium Mesh Gradient */}
      <div className="absolute inset-0 bg-slate-950 -z-20" />
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-purple/20 blur-[150px] rounded-full animate-soft-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-brand-pink/15 blur-[150px] rounded-full animate-soft-pulse [animation-delay:3s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
        
        {/* Animated Grain/Noise Overlay for Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-28">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-12 bg-linear-to-r from-brand-purple to-transparent" />
              <span className="text-[10px] uppercase font-black tracking-[0.8em] text-brand-purple">Tech Ecosystem</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-serif italic text-white leading-[0.9] tracking-tightest">
              The <span className="bg-linear-to-r from-brand-purple via-white to-brand-pink bg-clip-text text-transparent font-sans not-italic font-black uppercase">Professional</span> <br/>
              <span className="text-white/40">Selection.</span>
            </h2>
          </div>
          <div className="text-slate-400 text-lg font-light max-w-sm mb-2 flex flex-col gap-6 leading-relaxed">
            <p>A hand-picked collection of software and hardware that meets our rigorous standards for digital excellence.</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-5 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white/50">Enterprise</span>
              <span className="px-5 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-white/50">Performance</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-white/5 rounded-[3rem] animate-pulse" />
            ))
          ) : (
            affiliateProducts.map((product, idx) => (
              <motion.div
                key={product.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative flex flex-col h-full bg-linear-to-b from-white/[0.06] to-transparent backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] hover:border-white/20 transition-all duration-1000 hover:shadow-[0_60px_100px_-30px_rgba(0,0,0,0.6)]"
              >
                {/* Accent Top Bar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[2px] bg-linear-to-r from-transparent via-brand-purple to-transparent opacity-0 group-hover:opacity-100 group-hover:w-1/2 transition-all duration-700" />

                <div className="flex justify-between items-start mb-12">
                  <div className="w-20 h-20 bg-white rounded-3xl border border-white/10 flex items-center justify-center p-4 group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-brand-purple/5 to-transparent" />
                    <img 
                      src={product.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.title)}&background=8b5cf6&color=fff`} 
                      alt={product.title} 
                      className="w-full h-full object-contain relative z-10"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.title)}&background=8b5cf6&color=fff`;
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">
                      {product.category || 'Architecture'}
                    </span>
                    <div className="flex items-center gap-1 text-brand-purple">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] font-bold">{product.rating || '4.9'}</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-serif italic text-white mb-4 group-hover:tracking-wider transition-all duration-700">
                  {product.title}
                </h3>
                
                <p className="text-sm text-white/40 mb-12 line-clamp-3 font-light leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">MSRP / ENTRY</span>
                    <span className="text-white font-sans font-black text-2xl tracking-tighter">
                      {product.price ? `$${product.price}` : 'FREE'}
                    </span>
                  </div>
                  <a 
                    href={product.affiliateLink || product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-brand-purple group-hover:border-brand-purple transition-all duration-500 overflow-hidden relative"
                  >
                    <ArrowRight size={20} className="group-hover:translate-x-12 absolute transition-all duration-500" />
                    <ArrowRight size={20} className="-translate-x-12 group-hover:translate-x-0 absolute transition-all duration-500" />
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

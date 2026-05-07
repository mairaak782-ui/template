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
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 bg-slate-950 -z-20" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-brand-purple/40 blur-[130px] rounded-full animate-soft-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-pink/30 blur-[110px] rounded-full animate-soft-pulse [animation-delay:2s]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <Sparkles size={16} className="text-brand-purple" />
              <span className="text-[10px] uppercase font-black tracking-[0.6em] text-white/50">Curated Stack</span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">
              Elite <span className="bg-linear-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-sans not-italic font-black uppercase">Technical Partners.</span>
            </h2>
          </div>
          <div className="text-slate-400 text-base font-light max-w-md mb-2 flex flex-col gap-6">
            <p>Our infrastructure is powered by industry leaders. We recommend these high-performance platforms for your next digital venture.</p>
            <div className="flex gap-4">
              <span className="bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] uppercase font-black tracking-widest text-slate-300">Hosting</span>
              <span className="bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] uppercase font-black tracking-widest text-slate-300">SaaS</span>
              <span className="bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] uppercase font-black tracking-widest text-slate-300">Design</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-white/5 rounded-[2.5rem] animate-pulse" />
            ))
          ) : (
            affiliateProducts.map((product, idx) => (
              <motion.div
                key={product.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] hover:bg-white/[0.07] hover:border-white/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-3 group-hover:border-brand-purple transition-all duration-500 shadow-sm overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-contain group-hover:scale-125 transition-transform duration-700 brightness-0 invert"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest border border-white/10 px-4 py-1.5 rounded-full">
                    {product.category || 'Tool'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-purple transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-sm text-slate-400 mb-10 line-clamp-2 font-light leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">{product.price ? 'Starting At' : 'Rating'}</span>
                    <span className="text-white font-serif italic text-2xl">
                      {product.price ? `$${product.price}` : <div className="flex items-center gap-1 text-brand-purple"><Star size={16} fill="currentColor" /> {product.rating}/5</div>}
                    </span>
                  </div>
                  <a 
                    href={product.affiliateLink || product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.2em] text-brand-purple group-hover:translate-x-2 transition-all duration-500"
                  >
                    View <ArrowRight size={14} />
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

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { ExternalLink, Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function AffiliateSection() {
  const [affiliateProducts, setAffiliateProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const q = query(
      collection(db, 'products'), 
      where('type', '==', 'affiliate'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAffiliateProducts(items);
      setIsLoading(false);
    }, (error) => {
      // If index is missing, fallback to client-side filter for now
      if (error.message.includes('index')) {
        console.warn("Index needed for type filtering, using fallback.");
        const fallbackQ = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        onSnapshot(fallbackQ, (snap) => {
          const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setAffiliateProducts(all.filter((p: any) => p.type === 'affiliate'));
          setIsLoading(false);
        });
      } else {
        handleFirestoreError(error, OperationType.GET, 'products');
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isLoading && affiliateProducts.length === 0) return null;

  return (
    <section id="affiliate" className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold opacity-[0.03] skew-x-12 translate-x-32" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-brand-gold mb-4"
            >
              <Sparkles size={16} />
              <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Tools We Use</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">
              Recommended <span className="text-brand-gold font-sans not-italic font-black uppercase">Professional Tools.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm font-light max-w-xs mb-2">
            The exact hosting, design, and productivity platforms we use to deploy high-converting digital products.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="aspect-video bg-slate-800 animate-pulse rounded-sm" />
            ))
          ) : (
            affiliateProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-slate-800/50 border border-slate-700 p-8 rounded-sm hover:border-brand-gold/50 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-12 h-12 bg-slate-700/50 rounded-sm flex items-center justify-center text-brand-gold">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest border border-slate-700 px-2 py-1">
                    {product.category || 'Lifestyle'}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-xs text-slate-400 mb-8 line-clamp-2 font-light leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-700/50">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Value</span>
                    <span className="text-white font-serif italic text-lg">${product.price}</span>
                  </div>
                  <a 
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold hover:translate-x-2 transition-transform"
                  >
                    Get Access <ArrowRight size={14} />
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

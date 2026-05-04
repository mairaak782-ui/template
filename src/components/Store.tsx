import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { products as initialProducts } from '../constants';

export default function Store() {
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbProducts(items);
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'products');
    });

    return () => unsubscribe();
  }, []);

  const allProducts = [...dbProducts, ...initialProducts];

  return (
    <section id="store" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-serif italic mb-3 text-slate-900"
            >
              Essential Products
            </motion.h2>
            <p className="text-slate-400 text-sm font-light">Curated digital assets for precise workflows.</p>
          </div>
          <span className="text-[9px] uppercase font-bold text-brand-gold tracking-[0.3em] cursor-pointer hover:text-brand-gold-light transition-all border-b border-brand-gold pb-1.5 px-1 mb-1">
            {allProducts.length} Assets Available
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {allProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group flex flex-col rounded-sm overflow-hidden border border-slate-100 bg-white hover:border-brand-gold/30 transition-all duration-700 hover:shadow-2xl hover:shadow-brand-gold/5"
            >
              <div className="relative aspect-[4/5] overflow-hidden transition-all duration-1000">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/20 via-transparent to-transparent" />
                {product.badge && (
                  <div className="absolute top-6 left-6 bg-brand-gold text-white text-[8px] font-bold uppercase tracking-[0.3em] px-3 py-1.5 rounded-sm shadow-xl">
                    {product.badge}
                  </div>
                )}
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <div className="text-[9px] font-bold text-brand-gold uppercase tracking-[0.4em] mb-4">
                  {product.category}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight text-slate-900 group-hover:text-brand-gold transition-colors duration-300">{product.title}</h3>
                <p className="text-xs text-slate-500 mb-10 line-clamp-2 leading-relaxed font-light">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-2xl font-serif italic text-slate-900 group-hover:text-brand-gold transition-colors">${product.price}</div>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    onClick={() => {
                      const link = product.affiliateLink || '#contact-form';
                      if (link.startsWith('#')) {
                         document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.open(link, '_blank');
                      }
                    }}
                    className="text-[9px] uppercase font-bold tracking-[0.3em] text-slate-400 hover:text-slate-900 border-b border-slate-200 hover:border-brand-gold transition-all pb-1.5"
                  >
                    Acquire &rarr;
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

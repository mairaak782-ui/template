import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { products as initialProducts } from '../constants';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export default function Store({ filterCategory, sectionId, title, subTitle }: { filterCategory?: string, sectionId?: string, title?: string, subTitle?: string }) {
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const q = query(
      collection(db, 'products'), 
      where('type', '==', 'digital'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDbProducts(items);
      setIsLoading(false);
    }, (error) => {
      // Fallback for missing index
      if (error.message.includes('index')) {
        const fallbackQ = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        onSnapshot(fallbackQ, (snap) => {
          const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setDbProducts(all.filter((p: any) => p.type === 'digital'));
          setIsLoading(false);
        });
      } else {
        handleFirestoreError(error, OperationType.GET, 'products');
      }
    });

    return () => unsubscribe();
  }, []);

  const allProducts = [...dbProducts, ...initialProducts.map(p => ({ ...p, type: 'digital' }))];
  const filteredProducts = filterCategory 
    ? allProducts.filter(p => p.category?.toLowerCase().includes(filterCategory.toLowerCase()))
    : allProducts;

  if (filteredProducts.length === 0) return null;

  return (
    <section id={sectionId || "store"} className="py-32 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-4"
            >
              Curated Archive
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif italic text-slate-900"
            >
              {title || "The Collection"}
            </motion.h2>
            <p className="text-slate-500 text-sm md:text-lg font-light mt-6 max-w-xl">
              {subTitle || "Precision-built systems and aesthetic components for high-performance builders."}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[9px] uppercase font-bold text-slate-300 tracking-[0.3em]">
              Available Now
            </span>
            <div className="flex gap-2">
              <div className="h-1.5 w-12 bg-brand-gold rounded-full" />
              <div className="h-1.5 w-4 bg-slate-100 rounded-full" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {filteredProducts.map((product, idx) => (
            <Link 
              key={product.id || idx}
              to={product.id ? `/product/${product.id}` : '#'}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col h-full rounded-3xl overflow-hidden border border-slate-100 bg-white hover:border-brand-gold transition-all duration-700 hover:shadow-3xl hover:shadow-slate-200"
              >
                <div className="relative aspect-[3/4] overflow-hidden transition-all duration-1000">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-95 group-hover:opacity-100 grayscale-[0.2] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  {product.badge && (
                    <div className="absolute top-6 left-6 bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-2xl backdrop-blur-md">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute bottom-6 right-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-white/90 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center text-slate-900 shadow-2xl">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-[9px] font-black text-brand-gold uppercase tracking-[0.4em] mb-4">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight text-slate-900 group-hover:text-brand-gold transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-10 line-clamp-2 leading-relaxed font-light">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-8">
                    <div className="text-3xl font-serif italic text-slate-900 group-hover:text-brand-gold transition-colors">
                      <span className="text-xs not-italic font-sans font-bold text-slate-300 mr-1">$</span>
                      {product.price}
                    </div>
                    <div className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-brand-gold transition-colors">
                       <ShoppingBag size={12} className="text-slate-300 group-hover:text-brand-gold transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { products as initialProducts } from '../constants';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Store({ filterCategory, sectionId, title, subTitle }: { filterCategory?: string, sectionId?: string, title?: string, subTitle?: string }) {
  const { t, language } = useLanguage();
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
    <section id={sectionId || "store"} className={`py-16 md:py-32 border-t border-slate-100/10 ${sectionId === 'templates' ? 'bg-transparent' : 'bg-slate-900/5 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8 ${language === 'ur' ? 'md:flex-row-reverse text-right' : ''}`}>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`text-[10px] font-black uppercase tracking-[0.6em] text-brand-gold mb-6 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}
            >
              {sectionId === 'cards' ? (language === 'en' ? 'Exclusive Artisans' : 'خاص ڈیزائنز') : t('store.tag')}
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-4xl md:text-7xl font-serif italic text-slate-950 leading-tight tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}
            >
              {title || t('store.title')}
            </motion.h2>
            <p className={`text-slate-500 text-base md:text-lg font-light mt-8 max-w-xl leading-relaxed ${language === 'ur' ? 'font-urdu' : ''}`}>
              {subTitle || (language === 'en' ? "Precision-built systems and aesthetic components for high-performance builders." : "اعلیٰ کارکردگی والے بلڈرز کے لیے انتہائی درستگی کے ساتھ بنائے گئے نظام۔")}
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 md:translate-y-[-10px]">
            <span className={`text-[10px] uppercase font-black text-slate-400 tracking-[0.4em] ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>
              {language === 'en' ? 'Available Now' : 'ابھی دستیاب ہے'}
            </span>
            <div className="flex gap-2">
              <div className="h-1.5 w-16 bg-brand-gold rounded-full" />
              <div className="h-1.5 w-6 bg-slate-200 rounded-full" />
            </div>
          </div>
        </div>

        <div className={`grid gap-10 md:gap-16 ${sectionId === 'cards' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
          {filteredProducts.map((product, idx) => (
            <Link 
              key={product.id || idx}
              to={product.id ? `/product/${product.id}` : '#'}
              className={`group ${sectionId === 'cards' && idx % 3 === 0 ? 'md:col-span-2' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`flex flex-col h-full overflow-hidden border border-slate-100 bg-white hover:border-brand-gold/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] 
                  rounded-[2rem] 
                  ${sectionId === 'cards' && idx % 3 === 0 ? 'md:flex-row' : ''}`}
              >
                <div className={`relative overflow-hidden transition-all duration-1000 ${sectionId === 'cards' && idx % 3 === 0 ? 'aspect-[16/9] md:aspect-auto md:w-1/2' : 'aspect-[4/5]'}`}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  {product.badge && (
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-white/90 backdrop-blur-md text-slate-900 text-[9px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full shadow-xl">
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute bottom-8 right-8 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 hidden md:block">
                    <div className="bg-brand-gold text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>

                <div className={`p-8 md:p-10 flex-1 flex flex-col bg-white ${sectionId === 'cards' && idx % 3 === 0 ? 'md:justify-center' : ''}`}>
                  <div className="text-[10px] font-black text-brand-gold uppercase tracking-[0.5em] mb-4 md:mb-6">
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight text-slate-950 group-hover:text-brand-gold transition-colors duration-300 uppercase">
                    {product.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-8 md:mb-12 line-clamp-2 leading-relaxed font-light">
                    {product.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-8 md:pt-10">
                    <div className="text-3xl md:text-4xl font-serif italic text-slate-950 group-hover:text-brand-gold transition-colors">
                      <span className="text-xs not-italic font-sans font-black text-slate-300 mr-2">$</span>
                      {product.price}
                    </div>
                    <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
                       <ShoppingBag size={14} className="text-slate-400 group-hover:text-white transition-colors" />
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

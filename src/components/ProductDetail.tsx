import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, CheckCircle2, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ProductDetail() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `products/${id}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <h1 className={`text-2xl font-serif mb-4 ${language === 'ur' ? 'font-urdu' : ''}`}>{t('prod.notfound')}</h1>
        <Link to="/" className={`text-brand-gold uppercase tracking-widest font-bold text-xs border-b border-brand-gold pb-1 ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>{t('prod.return')}</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/" className={`inline-flex items-center gap-3 text-slate-400 hover:text-brand-gold transition-colors mb-16 text-[11px] uppercase font-black tracking-[0.4em] ${language === 'ur' ? 'flex-row-reverse font-urdu tracking-normal' : ''}`}>
            <ArrowLeft size={16} /> {t('prod.back')}
          </Link>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Gallery / Image */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-slate-100 shadow-3xl shadow-slate-200">
                {product.mediaType === 'video' ? (
                  <video 
                    src={product.video} 
                    className="w-full h-full object-cover"
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    poster={product.image}
                  />
                ) : (
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              <div className={`absolute -bottom-6 -right-6 glass-card p-6 rounded-sm shadow-xl border-l-4 border-l-brand-gold max-w-[200px] ${language === 'ur' ? 'border-l-0 border-r-4 border-r-brand-gold -right-auto -left-6 text-right' : ''}`}>
                <p className={`text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>{t('prod.architecture')}</p>
                <p className={`text-[9px] text-slate-500 italic font-light italic leading-relaxed ${language === 'ur' ? 'font-urdu' : ''}`}>
                  "{product.mockupPrompt || (language === 'en' ? 'Designed with precision for the modern digital workspace.' : 'جدید ڈیجیٹل ورک اسپیس کے لیے انتہائی درستگی کے ساتھ ڈیزائن کیا گیا ہے۔')}"
                </p>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={language === 'ur' ? 'text-right' : ''}
            >
              <div className={`flex items-center gap-2 text-brand-gold mb-4 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                <ShieldCheck size={14} />
                <span className={`text-[10px] uppercase font-bold tracking-[0.4em] ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>{product.category}</span>
              </div>
              
              <h1 className={`text-4xl md:text-6xl font-serif italic text-slate-900 mb-6 leading-tight ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}>
                {product.title}
              </h1>

              <div className="text-3xl font-serif text-slate-900 mb-8">${product.price}</div>

              <p className={`text-slate-500 text-lg mb-10 font-light leading-relaxed ${language === 'ur' ? 'font-urdu text-right' : ''}`}>
                {product.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                {product.features?.map((feature: string, idx: number) => (
                  <div key={idx} className={`flex gap-4 ${language === 'ur' ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle2 size={18} className="text-brand-gold flex-shrink-0" />
                    <p className={`text-xs text-slate-600 font-medium leading-relaxed ${language === 'ur' ? 'font-urdu' : ''}`}>{feature}</p>
                  </div>
                ))}
              </div>

              <div className={`pt-10 border-t border-slate-100 flex flex-col sm:flex-row gap-4 ${language === 'ur' ? 'sm:flex-row-reverse' : ''}`}>
                <motion.button
                  onClick={() => {
                    window.location.href = '/#contact';
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 bg-brand-gold text-white py-5 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-brand-gold/20 ${language === 'ur' ? 'font-urdu tracking-normal flex-row-reverse' : ''}`}
                >
                  {t('prod.license')} <ShoppingBag size={16} />
                </motion.button>
                <button className={`flex-1 border border-slate-200 text-slate-400 py-5 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-slate-50 transition-colors ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>
                  {t('prod.docs')}
                </button>
              </div>

              <div className={`mt-12 flex items-center gap-8 py-6 border-y border-slate-50 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 text-[9px] font-bold text-slate-300 uppercase tracking-widest ${language === 'ur' ? 'font-urdu tracking-normal flex-row-reverse' : ''}`}>
                  <Globe size={12} /> {t('prod.access')}
                </div>
                <div className={`flex items-center gap-2 text-[9px] font-bold text-slate-300 uppercase tracking-widest ${language === 'ur' ? 'font-urdu tracking-normal flex-row-reverse' : ''}`}>
                  <Sparkles size={12} /> {t('prod.quality')}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

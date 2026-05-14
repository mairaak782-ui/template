import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../lib/LanguageContext';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { blogPosts } from '../constants';
import Navbar from './Navbar';
import Footer from './Footer';

export default function BlogDetail() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="text-center">
          <h2 className={`text-4xl font-serif italic text-slate-950 mb-6 ${language === 'ur' ? 'font-urdu not-italic' : ''}`}>{t('blog.detail.notfound')}</h2>
          <Link to="/" className={`text-brand-gold font-bold uppercase tracking-widest text-xs ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>{t('blog.detail.return')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className={`inline-flex items-center gap-3 text-slate-400 hover:text-brand-gold transition-colors mb-16 text-[11px] uppercase font-black tracking-[0.4em] ${language === 'ur' ? 'flex-row-reverse font-urdu tracking-normal' : ''}`}>
              <ArrowLeft size={16} className={language === 'ur' ? 'rotate-180' : ''} /> {t('blog.detail.back')}
            </Link>

            <div className={`flex items-center gap-4 text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-10 ${language === 'ur' ? 'flex-row-reverse font-urdu tracking-normal' : ''}`}>
              <span>{post.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <span className="text-slate-400 normal-case italic font-light tracking-normal">{post.date}</span>
            </div>

            <h1 className={`text-5xl md:text-7xl font-serif italic text-slate-950 mb-12 leading-[1.1] tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal text-right' : ''}`}>
              {post.title}
            </h1>

            <div className={`flex flex-wrap items-center gap-10 mb-20 pb-12 border-b border-slate-100 ${language === 'ur' ? 'flex-row-reverse text-right' : ''}`}>
              <div className={`flex items-center gap-3 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <User size={20} className="text-slate-400" />
                </div>
                <div>
                  <p className={`text-[10px] uppercase font-black tracking-widest text-slate-300 mb-0.5 ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>{t('blog.detail.author')}</p>
                  <p className="text-slate-950 font-bold tracking-tight">{post.author}</p>
                </div>
              </div>
              <div className={`flex items-center gap-3 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Clock size={20} className="text-slate-400" />
                </div>
                <div>
                  <p className={`text-[10px] uppercase font-black tracking-widest text-slate-300 mb-0.5 ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>{t('blog.detail.readtime')}</p>
                  <p className={`text-slate-950 font-bold tracking-tight ${language === 'ur' ? 'font-urdu' : ''}`}>{language === 'en' ? '8 Min Read' : '8 منٹ مطالعہ'}</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-slate-400 hover:text-brand-gold transition-colors ${language === 'en' ? 'ml-auto' : 'mr-auto flex-row-reverse font-urdu tracking-normal'}`}
                onClick={() => alert(language === 'en' ? "Strategic Intelligence Link Copied." : "لنک کاپی ہو گیا ہے۔")}
              >
                <Share2 size={16} /> {t('blog.detail.share')}
              </motion.button>
            </div>

            <div className="aspect-[16/9] rounded-[3rem] overflow-hidden mb-20 shadow-3xl shadow-slate-200 border border-slate-100 ">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className={`prose prose-slate prose-lg max-w-none ${language === 'ur' ? 'text-right' : ''}`}>
              <p className={`text-2xl text-slate-500 font-light leading-relaxed italic mb-12 border-brand-purple pl-10 ${language === 'ur' ? 'pr-10 border-r-4 border-l-0 font-urdu not-italic' : 'border-l-4'}`}>
                {post.excerpt}
              </p>
              <div className={`text-slate-700 space-y-10 font-light text-xl leading-loose ${language === 'ur' ? 'font-urdu' : ''}`}>
                <section>
                  <h3 className={`text-3xl font-serif italic text-slate-950 mt-16 mb-8 tracking-tight ${language === 'ur' ? 'font-urdu not-italic text-4xl' : ''}`}>
                    {language === 'en' ? 'The Architecture of Excellence' : 'برتری کا فن تعمیر'}
                  </h3>
                  <p>
                    {language === 'en' 
                      ? `In the rapidly evolving digital landscape of 2026, the distinction between a standard application and an elite system lies in the precision of its architecture. At Template Forge, we bridge the gap between technical complexity and aesthetic luxury. This strategic brief explores the methodologies behind our latest innovations, specifically ${post.title}.`
                      : `2026 کے تیزی سے بدلتے ہوئے ڈیجیٹل منظرنامے میں، ایک عام ایپلی کیشن اور ایک ایلیٹ سسٹم کے درمیان فرق اس کے فن تعمیر کی درستگی میں مضمر ہے۔ ٹیمپلیٹ فورج میں، ہم تکنیکی پیچیدگی اور جمالیاتی عیش و آرام کے درمیان فرق کو ختم کرتے ہیں۔ یہ اسٹریٹجک بریف ہماری تازہ ترین اختراعات، خاص طور پر ${post.title} کے پیچھے طریقہ کار کو تلاش کرتی ہے۔`
                    }
                  </p>
                </section>
              </div>
            </div>

            <div className="mt-32 pt-20 border-t border-slate-100 flex flex-col items-center text-center">
              <h4 className={`text-2xl font-serif italic text-slate-950 mb-8 ${language === 'ur' ? 'font-urdu not-italic text-3xl' : ''}`}>{t('blog.detail.cta.title')}</h4>
              <Link to="/" className={`bg-brand-gold text-white px-16 py-6 rounded-full font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl shadow-brand-gold/20 hover:scale-105 transition-all ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>
                {t('blog.detail.cta.btn')}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

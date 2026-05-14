import { useState, FormEvent } from 'react';
import { Mail, Github, Twitter, Linkedin, Terminal, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Footer() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!db) throw new Error("Database failed");
      await addDoc(collection(db, 'submissions'), {
        email,
        type: 'newsletter',
        createdAt: serverTimestamp(),
        source: 'footer_newsletter'
      });
      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'submissions');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="relative text-slate-500 py-32 border-t border-slate-100 bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-24 pb-24 border-b border-slate-50 ${language === 'ur' ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={language === 'ur' ? 'text-right' : ''}
          >
            <h2 className={`text-5xl md:text-7xl font-serif italic text-slate-950 mb-12 leading-[1.1] tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal leading-tight' : ''}`}>
              {t('footer.title')}
            </h2>
            <p className={`text-slate-500 text-lg mb-12 max-w-md leading-relaxed font-light ${language === 'ur' ? 'font-urdu' : ''}`}>
              {t('footer.desc')}
            </p>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-4 bg-green-50 text-green-700 px-8 py-5 rounded-full w-fit border border-green-100 ${language === 'ur' ? 'flex-row-reverse float-right' : ''}`}
              >
                <CheckCircle size={20} />
                <span className={`font-bold text-xs uppercase tracking-widest ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>{t('footer.newsletter.success')}</span>
              </motion.div>
            ) : (
              <form id="contact-form" className={`flex flex-col sm:flex-row gap-4 max-w-lg group ${language === 'ur' ? 'sm:flex-row-reverse' : ''}`} onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')} 
                  className={`flex-1 bg-slate-50 border border-slate-100 rounded-full px-10 py-6 focus:outline-none focus:border-brand-purple transition-all text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm ${language === 'ur' ? 'text-right font-urdu' : ''}`}
                  required
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className={`bg-slate-950 text-white px-12 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 hover:bg-brand-purple disabled:opacity-50 ${language === 'ur' ? 'font-urdu tracking-normal flex-row-reverse' : ''}`}
                >
                  {isSubmitting ? '...' : t('footer.newsletter.btn')} <ArrowRight size={14} className={language === 'ur' ? 'rotate-180' : ''} />
                </motion.button>
              </form>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`grid grid-cols-2 sm:grid-cols-3 gap-16 ${language === 'ur' ? 'text-right' : ''}`}
          >
            <div>
              <h4 className={`text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-10 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>{t('footer.nav.title')}</h4>
              <ul className={`space-y-6 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>
                <li><motion.a whileHover={{ x: language === 'ur' ? -5 : 5, color: "#6D28D9" }} href="#templates" className="transition-colors block">{t('nav.templates')}</motion.a></li>
                <li><motion.a whileHover={{ x: language === 'ur' ? -5 : 5, color: "#6D28D9" }} href="#saas" className="transition-colors block">{t('nav.saas')}</motion.a></li>
                <li><motion.a whileHover={{ x: language === 'ur' ? -5 : 5, color: "#6D28D9" }} href="#cards" className="transition-colors block">{t('nav.matrimonial')}</motion.a></li>
                <li><motion.a whileHover={{ x: language === 'ur' ? -5 : 5, color: "#6D28D9" }} href="#about" className="transition-colors block">{t('nav.about')}</motion.a></li>
              </ul>
            </div>
            <div>
              <h4 className={`text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-10 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>{t('footer.connect.title')}</h4>
              <ul className={`space-y-6 text-[11px] uppercase tracking-[0.2em] font-black text-slate-400 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>
                <li><motion.a whileHover={{ x: language === 'ur' ? -5 : 5, color: "#6D28D9" }} href="#" className="transition-colors block">Twitter (X)</motion.a></li>
                <li><motion.a whileHover={{ x: language === 'ur' ? -5 : 5, color: "#6D28D9" }} href="#" className="transition-colors block">LinkedIn</motion.a></li>
                <li><motion.a whileHover={{ x: language === 'ur' ? -5 : 5, color: "#6D28D9" }} href="#" className="transition-colors block">Instagram</motion.a></li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className={`pt-24 flex flex-col md:flex-row justify-between items-center gap-12 text-slate-400 ${language === 'ur' ? 'md:flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-4">
            <div className={`relative w-16 h-16 flex items-center justify-center ${language === 'ur' ? 'order-2' : ''}`}>
              <div className="absolute inset-x-0 h-[2px] bg-slate-200 top-0" />
              <div className="absolute inset-y-0 w-[2px] bg-slate-200 left-0" />
              <div className="absolute inset-0 bg-brand-purple translate-x-2 -translate-y-2"></div>
              <div className="relative z-10 text-white font-black text-2xl drop-shadow-md">
                TF
              </div>
            </div>
            <span className={`text-3xl font-bold tracking-tighter text-slate-950 flex flex-col gap-0 uppercase ${language === 'ur' ? 'text-right order-1' : ''}`}>
              <span className="font-display font-black leading-none text-2xl">TEMPLATE</span>
              <span className="text-brand-purple font-display font-bold tracking-[0.4em] text-[10px] leading-none mt-1">FORGE ARCADE</span>
            </span>
          </div>
          <div className={`text-[10px] uppercase tracking-[0.6em] text-slate-300 font-black border-x border-slate-50 px-12 py-3 ${language === 'ur' ? 'font-urdu tracking-normal border-none' : ''}`}>
            &copy; {new Date().getFullYear()} TEMPLATE FORGE ECOSYSTEM. V2.0
          </div>
          <div className="flex items-center gap-10">
            <motion.a whileHover={{ color: "#6D28D9" }} href="/admin" className={`text-[10px] uppercase tracking-[0.4em] font-black transition-colors ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>{t('footer.admin')}</motion.a>
            <motion.div whileHover={{ y: -5, color: "#6D28D9" }} className="transition-colors cursor-pointer"><Twitter size={20} /></motion.div>
            <motion.div whileHover={{ y: -5, color: "#6D28D9" }} className="transition-colors cursor-pointer"><Github size={20} /></motion.div>
            <motion.div whileHover={{ y: -5, color: "#6D28D9" }} className="transition-colors cursor-pointer"><Mail size={20} /></motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

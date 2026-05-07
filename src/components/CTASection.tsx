import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function CTASection() {
  const { t, language } = useLanguage();

  return (
    <section id="cta" className="py-32 relative overflow-hidden bg-slate-950">
      {/* Deep Blended Gradient Background - Enhanced */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(110,68,255,0.25)_0%,transparent_60%)]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/30 blur-[180px] rounded-full opacity-60 animate-soft-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-pink/20 blur-[150px] rounded-full opacity-40 animate-soft-pulse [animation-delay:2s]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 md:p-24 rounded-[4rem] text-center shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-10"
          >
            <div className="w-24 h-24 bg-brand-purple rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-purple/20">
              <Mail className="text-white" size={40} />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-5xl md:text-7xl font-serif italic text-white mb-10 leading-[1.1] tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}
          >
            {t('cta.title')} 
            <span className="not-italic font-sans font-black uppercase text-brand-purple block mt-2 text-4xl md:text-6xl tracking-widest">
              {t('cta.title.bold')}
            </span>
            {t('cta.title.end')}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-slate-400 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed ${language === 'ur' ? 'font-urdu' : ''}`}
          >
            {t('cta.desc')}
          </motion.p>
          
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`flex flex-col md:flex-row gap-6 max-w-2xl mx-auto ${language === 'ur' ? 'md:flex-row-reverse' : ''}`}
            onSubmit={(e) => {
              e.preventDefault();
              alert(language === 'en' ? "Successfully subscribed to the archive." : "آرکائیو میں کامیابی سے شامل ہوگئے۔");
            }}
          >
            <input 
              type="email" 
              placeholder={t('cta.placeholder')}
              className={`flex-1 bg-slate-50 border border-slate-100 rounded-[2rem] px-10 py-6 text-slate-950 font-bold focus:outline-none focus:border-brand-purple transition-all shadow-sm ${language === 'ur' ? 'text-right font-urdu' : ''}`}
              required
            />
            <button className="bg-brand-purple text-white px-14 py-6 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.4em] flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-brand-purple/20">
              <span className={language === 'ur' ? 'font-urdu tracking-normal text-sm' : ''}>{t('cta.button')}</span>
              <ArrowRight size={16} className={language === 'ur' ? 'rotate-180' : ''} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

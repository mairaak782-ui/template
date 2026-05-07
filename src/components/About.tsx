import { motion } from 'motion/react';
import { Target, Zap, Heart } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function About() {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-16 md:py-32 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-950/5 -skew-x-12 translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-16 md:gap-24 items-center ${language === 'ur' ? 'lg:flex-row-reverse' : ''}`}>
          <div className="relative order-2 lg:order-1 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative z-10 w-full max-w-md aspect-[4/5]"
            >
              <div className="absolute inset-0 border-2 border-brand-purple translate-x-6 translate-y-6 -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop" 
                alt="Visionary Workspace" 
                className="w-full h-full object-cover shadow-2xl transition-all duration-700 border border-slate-100"
                loading="lazy"
              />
              <div className="absolute bottom-6 right-6 bg-brand-purple text-white p-6 shadow-xl translate-x-12 translate-y-6">
                <Heart size={32} fill="currentColor" />
              </div>
            </motion.div>
          </div>
 
          <div className={`${language === 'ur' ? 'text-right' : ''} order-1 lg:order-2`}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className={`text-[10px] font-black uppercase tracking-[0.6em] text-brand-purple mb-8 md:mb-10 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>{t('about.tag')}</div>
              <h2 className={`text-4xl md:text-7xl font-serif italic text-slate-950 mb-8 md:mb-12 leading-tight tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal text-5xl md:text-7xl' : ''}`}>{t('about.title')}</h2>
              <p className={`text-slate-500 text-lg mb-10 md:mb-16 font-light leading-relaxed max-w-xl ${language === 'ur' ? 'font-urdu' : ''}`}>
                {t('about.desc')}
              </p>

              <div className="grid gap-8 md:gap-12">
                <div className={`flex gap-6 md:gap-10 group items-start ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-brand-purple group-hover:border-brand-purple transition-all shadow-sm">
                    <Target className="text-brand-purple group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold text-slate-950 mb-2 md:mb-3 uppercase tracking-wide italic ${language === 'ur' ? 'font-urdu not-italic' : ''}`}>{t('about.feature1.title')}</h4>
                    <p className={`text-slate-500 text-base font-light leading-relaxed ${language === 'ur' ? 'font-urdu text-sm md:text-base' : ''}`}>{t('about.feature1.desc')}</p>
                  </div>
                </div>
                
                <div className={`flex gap-6 md:gap-10 group items-start ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-brand-purple group-hover:border-brand-purple transition-all shadow-sm">
                    <Zap className="text-brand-purple group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold text-slate-950 mb-2 md:mb-3 uppercase tracking-wide italic ${language === 'ur' ? 'font-urdu not-italic' : ''}`}>{t('about.feature2.title')}</h4>
                    <p className={`text-slate-500 text-base font-light leading-relaxed ${language === 'ur' ? 'font-urdu text-sm md:text-base' : ''}`}>{t('about.feature2.desc')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

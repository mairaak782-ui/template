import { motion } from 'motion/react';
import { MousePointer2, Download, Zap, Heart } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function BenefitSection() {
  const { t, language } = useLanguage();

  const benefits = [
    {
      icon: <MousePointer2 className="text-brand-gold" size={24} />,
      title: t('benefit1.title'),
      description: t('benefit1.desc'),
    },
    {
      icon: <Download className="text-brand-gold" size={24} />,
      title: t('benefit2.title'),
      description: t('benefit2.desc'),
    },
    {
      icon: <Zap className="text-brand-gold" size={24} />,
      title: t('benefit3.title'),
      description: t('benefit3.desc'),
    },
    {
      icon: <Heart className="text-brand-gold" size={24} />,
      title: t('benefit4.title'),
      description: t('benefit4.desc'),
    },
  ];

  return (
    <section id="benefits" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`flex flex-col items-center text-center mb-24 ${language === 'ur' ? 'font-urdu' : ''}`}>
          <div className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-gold mb-6">
            {t('benefits.tag')}
          </div>
          <h2 className={`text-3xl sm:text-5xl md:text-7xl font-serif italic text-slate-950 tracking-tighter ${language === 'ur' ? 'not-italic tracking-normal' : ''}`}>
            {t('benefits.title')}<span className={`not-italic font-sans font-black uppercase text-brand-gold ${language === 'ur' ? 'font-urdu block mt-4' : ''}`}>{t('benefits.title.bold')}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`bg-white border border-slate-100 p-10 rounded-[2rem] shadow-sm flex flex-col items-start text-left group transition-all duration-300 hover:shadow-md hover:border-brand-gold/20 ${language === 'ur' ? 'text-right items-end font-urdu' : ''}`}
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold/5 transition-all duration-300">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-black text-slate-950 mb-4 uppercase tracking-widest">{benefit.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

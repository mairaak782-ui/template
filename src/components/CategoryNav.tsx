import { motion } from 'motion/react';
import { Layout, CreditCard, Gift, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function CategoryNav() {
  const { t, language } = useLanguage();

  const categories = [
    {
      id: 'saas',
      name: t('cat.templates'),
      description: t('cat.templates.desc'),
      icon: <Layout className="text-white" size={24} />,
      color: 'bg-emerald-600',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
    },
    {
      id: 'nikkah',
      name: t('cat.nikkah'),
      description: t('cat.nikkah.desc'),
      icon: <CreditCard className="text-white" size={24} />,
      color: 'bg-amber-600',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2669&auto=format&fit=crop'
    },
    {
      id: 'birthday',
      name: t('cat.birthday'),
      description: t('cat.birthday.desc'),
      icon: <Gift className="text-white" size={24} />,
      color: 'bg-indigo-600',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=2670&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-20 md:py-40 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className={`${language === 'ur' ? 'text-right md:order-2' : ''}`}>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-purple mb-4">{t('cat.nav.tag')}</p>
            <h2 className={`text-4xl md:text-6xl font-serif italic text-slate-950 tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}>{t('cat.nav.title')}</h2>
          </div>
          <p className={`text-slate-400 text-sm max-w-sm mb-2 ${language === 'ur' ? 'text-right md:order-1 font-urdu' : ''}`}>
            {t('cat.nav.desc')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="group relative h-[450px] overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm"
            >
              <div className="absolute inset-0">
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/20 to-slate-950/80" />
              </div>
              
              <div className={`absolute inset-0 p-10 flex flex-col justify-end ${language === 'ur' ? 'text-right items-end' : 'items-start'}`}>
                <div className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-black/20 text-white`}>
                  {cat.icon}
                </div>
                <h3 className={`text-4xl font-serif italic text-white mb-2 tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}>{cat.name}</h3>
                <p className={`text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-8 ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>{cat.description}</p>
                
                <div className={`flex items-center gap-2 text-brand-gold font-black text-[10px] uppercase tracking-widest ${language === 'ur' ? 'flex-row-reverse font-urdu' : ''}`}>
                  <span>{language === 'en' ? 'OPEN COLLECTION' : 'کلکشن کھولیں'}</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

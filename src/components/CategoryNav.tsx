import { motion } from 'motion/react';
import { Layout, CreditCard, Gift, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function CategoryNav() {
  const { t, language } = useLanguage();

  const categories = [
    {
      id: 'templates',
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
    <section className="py-16 md:py-32 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch">
          {categories.map((cat, idx) => (
            <motion.a
              key={cat.id}
              href={`#${cat.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="flex-1 group relative overflow-hidden rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/50 bg-white"
            >
              <div className="h-full min-h-[500px] relative overflow-hidden p-10 flex flex-col">
                <div className="absolute inset-0">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/10 to-white/95" />
                </div>
                
                <div className={`relative z-10 mt-auto ${language === 'ur' ? 'text-right items-end' : 'items-start'} flex flex-col`}>
                  <div className={`${cat.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-xl border border-white/20 group-hover:scale-110 transition-transform duration-500`}>
                    {cat.icon}
                  </div>
                  <h3 className={`text-4xl font-serif italic text-slate-950 mb-3 tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}>{cat.name}</h3>
                  <p className={`text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10 leading-loose ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>{cat.description}</p>
                  
                  <div className={`flex items-center gap-3 text-brand-purple font-black text-[10px] uppercase tracking-widest ${language === 'ur' ? 'flex-row-reverse font-urdu' : ''}`}>
                    <div className="h-[2px] w-8 bg-brand-purple/30 group-hover:w-16 transition-all duration-700" />
                    {language === 'en' ? 'OPEN COLLECTION' : 'کلکشن کھولیں'}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

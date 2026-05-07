import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowRight, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../constants';
import { useLanguage } from '../lib/LanguageContext';

export default function Blog() {
  const { t, language } = useLanguage();
  const [index, setIndex] = useState(0);

  const nextPost = useCallback(() => {
    setIndex((prev) => (prev + 1) % blogPosts.length);
  }, []);

  const prevPost = useCallback(() => {
    setIndex((prev) => (prev - 1 + blogPosts.length) % blogPosts.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextPost, 6000);
    return () => clearInterval(timer);
  }, [nextPost]);

  const post = blogPosts[index];

  return (
    <section id="blog" className="py-16 md:py-32 bg-transparent border-t border-slate-100/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24 ${language === 'ur' ? 'md:flex-row-reverse text-right' : ''}`}>
          <div className="max-w-2xl">
            <div className={`text-[10px] font-black uppercase tracking-[0.6em] text-brand-gold mb-6 ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}>
              {language === 'en' ? 'Strategic Journal' : 'تزویراتی جرنل'}
            </div>
            <h2 className={`text-5xl md:text-7xl font-serif italic text-slate-950 mb-10 font-medium tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}>
              {language === 'en' ? 'Insights ' : 'بصیرت '}
              <span className="not-italic font-sans font-black uppercase text-brand-purple">
                {language === 'en' ? '& Education.' : 'اور تعلیم۔'}
              </span>
            </h2>
          </div>
          
          <div className={`flex items-center gap-4 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
            <button 
              onClick={prevPost}
              className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center text-slate-950 hover:bg-slate-950 hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextPost}
              className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center text-slate-950 hover:bg-slate-950 hover:text-white transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative min-h-[650px] md:min-h-[500px] perspective-2000">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                rotateY: language === 'ur' ? -90 : 90, 
                x: language === 'ur' ? -100 : 100,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1, 
                rotateY: 0, 
                x: 0,
                scale: 1
              }}
              exit={{ 
                opacity: 0, 
                rotateY: language === 'ur' ? 90 : -90, 
                x: language === 'ur' ? 100 : -100,
                scale: 0.8
              }}
              transition={{ 
                duration: 0.7, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden', willChange: 'transform, opacity' }}
              className="absolute inset-0"
            >
              <Link to={`/blog/${post.id}`} className="group h-full">
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-24 h-full items-center ${language === 'ur' ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] border border-slate-100 shadow-3xl shadow-slate-200">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                  </div>
                  
                  <div className={language === 'ur' ? 'text-right' : ''}>
                    <div className={`text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-8 flex items-center gap-4 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                      <span className="px-4 py-1.5 bg-brand-gold/10 rounded-full">{post.category}</span>
                      <span className="text-slate-400 font-light italic tracking-normal normal-case">{post.date}</span>
                    </div>

                    <h3 className={`text-4xl md:text-6xl font-serif text-slate-950 mb-10 leading-[1.1] group-hover:text-brand-purple transition-all duration-500 tracking-tighter ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {post.title}
                    </h3>
                    
                    <p className={`text-slate-500 text-xl font-light leading-relaxed mb-12 line-clamp-3 ${language === 'ur' ? 'font-urdu' : ''}`}>
                      {post.excerpt}
                    </p>
                    
                    <div className={`flex items-center gap-8 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-4 text-[11px] uppercase font-black tracking-widest text-slate-400 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                        <div className="w-12 h-[1px] bg-slate-200" />
                        {post.author}
                      </div>
                      <motion.div 
                        whileHover={{ x: language === 'ur' ? -10 : 10 }}
                        className={`text-sm uppercase font-black tracking-widest text-brand-purple flex items-center gap-3 ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}
                      >
                        {language === 'en' ? 'Read Full Insights' : 'مکمل معلومات پڑھیں'} 
                        <ArrowRight size={18} className={language === 'ur' ? 'rotate-180' : ''} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={`flex gap-3 mt-16 ${language === 'ur' ? 'justify-end' : ''}`}>
          {blogPosts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                index === idx ? 'w-24 bg-brand-purple' : 'w-8 bg-slate-100 hover:bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: t('nav.templates'), href: '#templates' },
    { name: t('nav.saas'), href: '#saas' },
    { name: t('nav.matrimonial'), href: '#cards' },
    { name: t('nav.blog'), href: '#blog' },
    { name: t('nav.about'), href: '#about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`backdrop-blur-xl border transition-all duration-500 rounded-full px-8 py-4 flex justify-between items-center ${
          scrolled ? 'bg-white/80 border-slate-200 shadow-xl' : 'bg-transparent border-transparent'
        }`}>
          <motion.a 
            href="/" 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold tracking-tighter flex items-center gap-4 group"
          >
            <motion.div 
              layoutId="logo-container"
              className="relative w-14 h-14 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-brand-purple rounded-2xl shadow-xl rotate-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-[2px] border border-white/20"></div>
              <div className="relative z-10 text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 9.5 22 2l-2.5 2.5L22 7l-2.5-2.5L12 12l2.5 2.5L22 17l-2.5-2.5L22 22l-7.5-7.5-5 5-7.5-7.5 7.5-7.5 5 5Z" />
                </svg>
              </div>
            </motion.div>
            <motion.div 
              layoutId="logo-text"
              className="flex flex-col gap-0 leading-none"
            >
              <span className="text-slate-950 font-display font-black tracking-tighter text-xl leading-none uppercase">TEMPLATE</span>
              <span className="bg-linear-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-display font-bold tracking-[0.4em] text-[9px] uppercase leading-none mt-1">FORGE</span>
            </motion.div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                whileHover={{ y: -2 }}
                onClick={(e) => {
                  e.preventDefault();
                  const id = link.href.replace('#', '');
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold text-slate-500 hover:text-brand-purple transition-all duration-300 relative group ${language === 'ur' ? 'font-urdu' : ''}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-purple transition-all group-hover:w-full"></span>
              </motion.a>
            ))}
            
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 hover:border-brand-purple transition-all group"
            >
              <Globe size={14} className="text-slate-400 group-hover:text-brand-purple transition-colors" />
              <span className={`text-[10px] font-black uppercase tracking-widest text-slate-500`}>
                {language === 'en' ? 'اردو' : 'English'}
              </span>
            </button>

            <motion.a 
              href="#contact-form" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-slate-200 text-slate-900 px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all duration-300 bg-white shadow-sm"
            >
              {language === 'en' ? 'MEMBER LOGIN' : 'لاگ ان'}
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-6 right-6 mt-4 bg-white border border-slate-200 p-8 rounded-3xl md:hidden shadow-3xl z-50 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-lg uppercase tracking-widest font-bold text-slate-900 hover:text-brand-purple transition-colors ${language === 'ur' ? 'text-right' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    const id = link.href.replace('#', '');
                    setTimeout(() => {
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                >
                  {link.name}
                </a>
              ))}
              
              <button 
                onClick={() => {
                  setLanguage(language === 'en' ? 'ur' : 'en');
                  setIsOpen(false);
                }}
                className="flex items-center justify-between w-full bg-slate-50 px-6 py-4 rounded-xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-brand-purple" />
                  <span className="text-sm font-black uppercase tracking-widest">{language === 'en' ? 'Change Language' : 'زبان تبدیل کریں'}</span>
                </div>
                <span className="text-sm font-black uppercase">{language === 'en' ? 'اردو' : 'EN'}</span>
              </button>

              <a 
                href="#contact-form" 
                className="bg-brand-purple text-white py-4 rounded-xl text-sm uppercase tracking-widest font-black text-center"
                onClick={() => setIsOpen(false)}
              >
                {language === 'en' ? 'MEMBER LOGIN' : 'لاگ ان'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

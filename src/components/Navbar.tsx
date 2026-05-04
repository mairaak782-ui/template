import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Store', href: '#store' },
  { name: 'Resources', href: '#affiliate' },
  { name: 'Ethos', href: '#about' },
  { name: 'Journal', href: '#blog' },
  { name: 'Contact', href: '#contact-form' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="/" 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold tracking-tighter flex items-center gap-1 group"
        >
          <span className="text-slate-900 font-sans">THE</span>
          <span className="text-brand-gold font-sans group-hover:text-brand-gold-light transition-all">PROMPT</span>
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
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-brand-gold transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-gold transition-all group-hover:w-full"></span>
            </motion.a>
          ))}
          <motion.a 
            href="#contact-form" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-slate-200 text-slate-900 px-8 py-3 rounded-sm text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-slate-50 hover:border-brand-gold transition-all duration-300 bg-linear-to-r from-slate-50 to-transparent shadow-sm"
          >
            MEMBER LOGIN
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xs uppercase tracking-widest font-bold text-slate-900"
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
              <a 
                href="#contact-form" 
                className="bg-brand-gold text-white py-3 rounded text-[10px] uppercase tracking-widest font-bold text-center"
                onClick={() => setIsOpen(false)}
              >
                MEMBER LOGIN
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

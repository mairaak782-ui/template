import { Mail, Github, Twitter, Linkedin, Terminal, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-50 text-slate-600 py-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 pb-16 border-b border-slate-200">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900 mb-10 leading-[1.1]">
              Ready for <br />
              <span className="text-gradient-gold not-italic font-sans font-bold tracking-tighter">Digital Mastery.</span>
            </h2>
            <p className="text-slate-400 text-base mb-10 max-w-md leading-relaxed font-light">
              Secure your access to our premium templates and insights. Subscribe to the Collective for curated intelligence.
            </p>
            <form id="contact-form" className="flex flex-col sm:flex-row gap-0 max-w-lg group" onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed! Welcome to the Collective.");
            }}>
              <input 
                type="email" 
                placeholder="Secure Email Address" 
                className="flex-1 bg-white border border-slate-200 rounded-sm px-8 py-5 focus:outline-none focus:border-brand-gold transition-colors text-sm uppercase tracking-[0.2em] font-bold text-slate-900"
                required
              />
              <motion.button 
                whileHover={{ backgroundColor: "#B8860B" }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-gold text-white px-10 py-5 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] transition-colors flex items-center justify-center gap-3"
              >
                Join <ArrowRight size={14} />
              </motion.button>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-16"
          >
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-10">Navigation</h4>
              <ul className="space-y-6 text-[11px] uppercase tracking-[0.1em] font-bold text-slate-400">
                <li><motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#store" className="transition-colors block">The Store</motion.a></li>
                <li><motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#affiliate" className="transition-colors block">Resources</motion.a></li>
                <li><motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#blog" className="transition-colors block">The Journal</motion.a></li>
                <li><motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#about" className="transition-colors block">Our Ethos</motion.a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-10">Connect</h4>
              <ul className="space-y-6 text-[11px] uppercase tracking-[0.1em] font-bold text-slate-400">
                <li><motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#" className="transition-colors block">Twitter (X)</motion.a></li>
                <li><motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#" className="transition-colors block">LinkedIn</motion.a></li>
                <li><motion.a whileHover={{ x: 5, color: "#D4AF37" }} href="#" className="transition-colors block">Instagram</motion.a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-10">Protocol</h4>
              <ul className="space-y-6 text-[10px] uppercase font-bold tracking-widest text-slate-400">
                <li><motion.a whileHover={{ color: "#D4AF37" }} href="#" className="transition-colors block">Privacy</motion.a></li>
                <li><motion.a whileHover={{ color: "#D4AF37" }} href="#" className="transition-colors block">Terms</motion.a></li>
                <li><motion.a whileHover={{ color: "#D4AF37" }} href="#" className="transition-colors block">Affiliate</motion.a></li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="pt-16 flex flex-col md:flex-row justify-between items-center gap-12 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-slate-900">MODERN<span className="text-brand-gold font-serif italic ml-1">ARCHIVE</span></span>
          </div>
          <div className="text-[9px] uppercase tracking-[0.5em] text-slate-300 font-bold border-x border-slate-200 px-8 py-2">
            &copy; {new Date().getFullYear()} MODERN ARCHIVE ECOSYSTEM. V2.0
          </div>
          <div className="flex items-center gap-10">
            <motion.a whileHover={{ color: "#D4AF37" }} href="/admin" className="text-[9px] uppercase tracking-widest font-bold transition-colors">Admin</motion.a>
            <motion.div whileHover={{ y: -5, color: "#D4AF37" }} className="transition-colors cursor-pointer"><Twitter size={20} /></motion.div>
            <motion.div whileHover={{ y: -5, color: "#D4AF37" }} className="transition-colors cursor-pointer"><Github size={20} /></motion.div>
            <motion.div whileHover={{ y: -5, color: "#D4AF37" }} className="transition-colors cursor-pointer"><Mail size={20} /></motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

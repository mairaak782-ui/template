import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="contact-form" className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 -skew-x-12 translate-x-1/4" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-24 rounded-[3rem] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 bg-brand-gold rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-gold/20">
              <Mail className="text-white" size={32} />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif italic text-white mb-8"
          >
            Get a <span className="not-italic font-sans font-black uppercase text-brand-gold">Free Template</span> <br className="hidden md:block" /> Every Month.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed"
          >
            Join 2,000+ creators and get premium design assets delivered straight to your inbox. No spam, just high-end resources.
          </motion.p>
          
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-brand-gold transition-all"
            />
            <button className="bg-brand-gold text-white px-12 py-5 rounded-2xl font-bold uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-2xl shadow-brand-gold/20">
              Subscribe Now <ArrowRight size={16} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

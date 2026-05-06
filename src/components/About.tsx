import { motion } from 'motion/react';
import { Target, Zap, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop" 
                alt="Our Vision" 
                className="rounded-sm shadow-2xl transition-all duration-1000 border border-slate-100"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold rounded-full blur-[100px] opacity-5 -z-10" />
          </div>
 
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold mb-4">Our Story</div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900 mb-8 leading-tight">Elite Designs <br />Built by <span className="text-brand-gold not-italic font-sans font-black uppercase">Creators.</span></h2>
              <p className="text-slate-500 text-base mb-10 font-light leading-relaxed">
                Founded on the principle that premium design should be accessible to everyone, Modern Archive curates high-end digital assets that save you hundreds of hours in development.
              </p>

              <div className="grid gap-10">
                <div className="flex gap-8 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-slate-50 rounded-sm flex items-center justify-center border border-slate-100 group-hover:border-brand-gold transition-colors">
                    <Target className="text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-wide">Strategic Intent</h4>
                    <p className="text-slate-400 text-sm font-light">Every line of code and every pixel is placed with high-converting purpose.</p>
                  </div>
                </div>
                
                <div className="flex gap-8 group">
                  <div className="flex-shrink-0 w-14 h-14 bg-slate-50 rounded-sm flex items-center justify-center border border-slate-100 group-hover:border-brand-gold transition-colors">
                    <Zap className="text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 uppercase tracking-wide">Vantablack Performance</h4>
                    <p className="text-slate-400 text-sm font-light">Fast, invisible, and efficient architecture for the modern digital era.</p>
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

import { motion } from 'motion/react';
import { MousePointer2, Download, Zap, Heart } from 'lucide-react';

const benefits = [
  {
    icon: <MousePointer2 className="text-brand-gold" size={24} />,
    title: 'Easy to Edit',
    description: 'Fully customizable layers and components using familiar tools like Canva or Figma.',
  },
  {
    icon: <Download className="text-brand-gold" size={24} />,
    title: 'Instant Download',
    description: 'Access your files immediately after purchase. No waiting for processing or delivery.',
  },
  {
    icon: <Zap className="text-brand-gold" size={24} />,
    title: 'Beginner Friendly',
    description: 'No coding or design degree required. Our templates are built for everyone to use.',
  },
  {
    icon: <Heart className="text-brand-gold" size={24} />,
    title: 'High Aesthetic',
    description: 'Engineered for modern appeal, ensuring your brand stands out with elite design quality.',
  },
];

export default function BenefitSection() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold mb-4"
          >
            The Archive Advantage
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif italic text-slate-900"
          >
            Why Choose <span className="not-italic font-sans font-black uppercase text-brand-gold">Our Designs?</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-gold/10 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
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

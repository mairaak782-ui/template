import { motion } from 'motion/react';
import { Layout, CreditCard, Gift, ArrowUpRight } from 'lucide-react';

const categories = [
  {
    id: 'templates',
    name: 'Website Templates',
    description: 'Portfolio, Business & Landing Pages',
    icon: <Layout className="text-white" size={24} />,
    color: 'bg-slate-900',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'
  },
  {
    id: 'nikkah',
    name: 'Nikkah Cards',
    description: 'Elegant Traditional Invitations',
    icon: <CreditCard className="text-white" size={24} />,
    color: 'bg-brand-gold',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2669&auto=format&fit=crop'
  },
  {
    id: 'birthday',
    name: 'Birthday Cards',
    description: 'Modern & Playful Greeting Designs',
    icon: <Gift className="text-white" size={24} />,
    color: 'bg-slate-800',
    image: 'https://images.unsplash.com/photo-1530103862676-fa390d41246a?q=80&w=2670&auto=format&fit=crop'
  }
];

export default function CategoryNav() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.a
              key={cat.id}
              href={`#${cat.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl shadow-slate-200"
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-10">
                <div className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-3xl font-serif italic text-white mb-2">{cat.name}</h3>
                <p className="text-slate-300 text-xs font-bold uppercase tracking-[0.2em] mb-6">{cat.description}</p>
                <div className="flex items-center gap-2 text-brand-gold font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  Explore Collection <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

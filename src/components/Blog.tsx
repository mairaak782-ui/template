import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { blogPosts } from '../constants';

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold mb-4">Strategic Journal</div>
            <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900 mb-6 font-medium">Insights <span className="not-italic font-sans font-black uppercase text-brand-gold">& Education.</span></h2>
            <p className="text-slate-500 text-base font-light leading-relaxed">
              Master the art of digital asset deployment. From editing HTML templates to building a high-performance design business.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.3em] bg-white border border-slate-200 text-slate-900 px-10 py-4 rounded-sm hover:border-brand-gold transition-all duration-300">
            View All Articles <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer flex flex-col pt-10 border-t border-slate-200 hover:border-brand-gold/30 transition-all duration-500"
            >
              <div className="relative aspect-video mb-8 overflow-hidden rounded-sm">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.4em] text-brand-gold mb-4 flex items-center justify-between">
                <span>{post.category}</span>
                <span className="text-slate-400 font-light italic tracking-normal">{post.date}</span>
              </div>

              <h3 className="text-3xl font-serif text-slate-900 mb-8 leading-[1.2] group-hover:text-brand-gold transition-all duration-300">
                {post.title}
              </h3>
              
              <p className="text-slate-500 mb-12 leading-relaxed font-light line-clamp-3 text-sm">
                {post.excerpt}
              </p>
              
              <div className="mt-auto flex items-center justify-between group/link">
                <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-slate-300 group-hover:text-slate-400 transition-colors">
                  <div className="w-8 h-[1px] bg-slate-200 group-hover:w-12 transition-all duration-500" />
                  {post.author}
                </div>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="text-[9px] uppercase font-bold tracking-[0.3em] text-brand-gold"
                >
                  Read Review &rarr;
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

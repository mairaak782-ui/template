import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { blogPosts } from '../constants';
import Navbar from './Navbar';
import Footer from './Footer';

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="text-center">
          <h2 className="text-4xl font-serif italic text-slate-950 mb-6">Article Not Found</h2>
          <Link to="/" className="text-brand-gold font-bold uppercase tracking-widest text-xs">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <Navbar />
      
      <main className="pt-40 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-flex items-center gap-3 text-slate-400 hover:text-brand-gold transition-colors mb-16 text-[11px] uppercase font-black tracking-[0.4em]">
              <ArrowLeft size={16} /> Back to Strategic Journal
            </Link>

            <div className="flex items-center gap-4 text-brand-gold text-[10px] font-black uppercase tracking-[0.4em] mb-10">
              <span>{post.category}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <span className="text-slate-400 normal-case italic font-light tracking-normal">{post.date}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif italic text-slate-950 mb-12 leading-[1.1] tracking-tighter">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-10 mb-20 pb-12 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <User size={20} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-300 mb-0.5">Author</p>
                  <p className="text-slate-950 font-bold tracking-tight">{post.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <Clock size={20} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-300 mb-0.5">Read Time</p>
                  <p className="text-slate-950 font-bold tracking-tight">8 Min Read</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-auto flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-slate-400 hover:text-brand-gold transition-colors"
                onClick={() => alert("Strategic Intelligence Link Copied.")}
              >
                <Share2 size={16} /> Share Brief
              </motion.button>
            </div>

            <div className="aspect-[16/9] rounded-[3rem] overflow-hidden mb-20 shadow-3xl shadow-slate-200 border border-slate-100 ">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="prose prose-slate prose-lg max-w-none">
              <p className="text-2xl text-slate-500 font-light leading-relaxed italic mb-12 border-l-4 border-brand-purple pl-10">
                {post.excerpt}
              </p>
              <div className="text-slate-700 space-y-10 font-light text-xl leading-loose">
                <section>
                  <h3 className="text-3xl font-serif italic text-slate-950 mt-16 mb-8 tracking-tight">The Architecture of Excellence</h3>
                  <p>
                    In the rapidly evolving digital landscape of 2026, the distinction between a standard application and an elite system lies in the precision of its architecture. At Template Forge, we bridge the gap between technical complexity and aesthetic luxury. This strategic brief explores the methodologies behind our latest innovations, specifically {post.title}.
                  </p>
                  <p>
                    Effective design is no longer just about visual appeal; it's about cognitive resonance. Every interaction point must feel intentional, reducing user friction while maximizing engagement. Our team, under the strategic direction of CEO Maira, focuses on "Zero-G" interfaces—layouts so fluid that users forget the technology and focus entirely on the value proposition.
                  </p>
                </section>

                <section>
                  <h3 className="text-3xl font-serif italic text-slate-950 mt-16 mb-8 tracking-tight">Strategic Implementation Protocols</h3>
                  <p>
                    Implementing a high-performance system requires a tiered approach. First, the structural integrity of the code must support extreme scalability. Whether you are deploying a localized matrimonial platform or a global SaaS infrastructure, the backend must remain invisible yet invincible.
                  </p>
                  <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 my-16 shadow-inner">
                    <h4 className="text-sm font-black uppercase tracking-[0.3em] text-brand-purple mb-8 text-center italic">— The Forge Manifesto —</h4>
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <span className="text-4xl font-serif italic text-brand-purple/20 block">01</span>
                        <h5 className="font-bold text-slate-950 uppercase tracking-widest text-xs">Visual Hierarchy</h5>
                        <p className="text-base text-slate-500 leading-relaxed">Utilize dynamic white space to prioritize high-value content blocks over secondary navigation elements.</p>
                      </div>
                      <div className="space-y-4">
                        <span className="text-4xl font-serif italic text-brand-purple/20 block">02</span>
                        <h5 className="font-bold text-slate-950 uppercase tracking-widest text-xs">Performance Core</h5>
                        <p className="text-base text-slate-500 leading-relaxed">Optimize all assets for sub-800ms initial paint times to ensure 99th percentile user retention.</p>
                      </div>
                      <div className="space-y-4">
                        <span className="text-4xl font-serif italic text-brand-purple/20 block">03</span>
                        <h5 className="font-bold text-slate-950 uppercase tracking-widest text-xs">Emotional UX</h5>
                        <p className="text-base text-slate-500 leading-relaxed">Incorporate micro-animations that provide positive physiological feedback during user task completion.</p>
                      </div>
                      <div className="space-y-4">
                        <span className="text-4xl font-serif italic text-brand-purple/20 block">04</span>
                        <h5 className="font-bold text-slate-950 uppercase tracking-widest text-xs">SEO Dominion</h5>
                        <p className="text-base text-slate-500 leading-relaxed">Strategically embed semantic entities that align with 2026 AI-driven search algorithms for maximum authority.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-3xl font-serif italic text-slate-950 mt-16 mb-8 tracking-tight">Future-Proofing the Vision</h3>
                  <p>
                    As we look toward the remainder of 2026, Template Forge is dedicated to expanding our library of elite assets. The integration of advanced AI workflows directly into our SaaS templates is the next frontier. We aren't just selling tools; we are providing the blueprints for the next generation of digital empires.
                  </p>
                  <p>
                    The journey from a digital collection to a global Template Forge ecosystem has been one of relentless refinement. This specific article on {post.title} is just one chapter in a much larger story of technical and creative innovation.
                  </p>
                </section>
              </div>
            </div>

            <div className="mt-32 pt-20 border-t border-slate-100 flex flex-col items-center text-center">
              <h4 className="text-2xl font-serif italic text-slate-950 mb-8">Ready to implement this vision?</h4>
              <Link to="/" className="bg-brand-gold text-white px-16 py-6 rounded-full font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl shadow-brand-gold/20 hover:scale-105 transition-all">
                Browse Collection
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

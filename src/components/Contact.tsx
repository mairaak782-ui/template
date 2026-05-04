import { motion } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact-form" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif italic text-slate-900 mb-6">Let's build something <br /><span className="text-brand-gold not-italic font-sans font-black uppercase tracking-tighter">Iconic.</span></h2>
              <p className="text-slate-500 text-lg mb-10 font-light leading-relaxed max-w-md">
                Have a project in mind or inquiry about our digital assets? Drop a message and let's discuss your next move.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <Mail size={20} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Secure Email</p>
                    <p className="font-medium">contact@theprompt.co</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                    <MessageSquare size={20} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Direct Chat</p>
                    <p className="font-medium">@theprompt_ops</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10 rounded-sm shadow-xl"
          >
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              alert("Message sent! We will contact you shortly.");
            }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    required
                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-gold transition-colors text-slate-900" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    required
                    className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-gold transition-colors text-slate-900" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Subject</label>
                <select className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-gold transition-colors text-slate-900">
                  <option>Custom Template Inquiry</option>
                  <option>Affiliate Collaboration</option>
                  <option>Store Support</option>
                  <option>Other Collaboration</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help?" 
                  required
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-sm focus:outline-none focus:border-brand-gold transition-colors text-slate-900"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-brand-gold text-white py-4 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 shadow-lg shadow-brand-gold/20"
              >
                Send Intelligence <Send size={14} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

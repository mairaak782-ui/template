import { motion } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.6em] text-brand-gold mb-10">The Connection</div>
              <h2 className="text-5xl md:text-7xl font-serif italic text-slate-950 mb-12 leading-tight tracking-tighter">Let's build something <br /><span className="text-brand-gold not-italic font-sans font-black uppercase text-4xl md:text-6xl block mt-4 tracking-normal">Iconic.</span></h2>
              <p className="text-slate-500 text-lg mb-16 font-light leading-relaxed max-w-md">
                Have a project in mind or inquiry about our digital assets? Drop a message and let's discuss your next move.
              </p>

              <div className="grid gap-10">
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center border border-slate-100 shadow-sm transition-all group-hover:border-brand-gold group-hover:shadow-xl group-hover:shadow-slate-100">
                    <Mail size={24} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-300 mb-1">Secure Email</p>
                    <p className="text-slate-950 font-bold tracking-tight">contact@templateforge.co</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center border border-slate-100 shadow-sm transition-all group-hover:border-brand-gold group-hover:shadow-xl group-hover:shadow-slate-100">
                    <MessageSquare size={24} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-300 mb-1">Direct Console</p>
                    <p className="text-slate-950 font-bold tracking-tight">@forge_ops</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-16 rounded-[3rem] shadow-3xl shadow-slate-200 border border-slate-100"
          >
            <form className="space-y-10" onSubmit={(e) => {
              e.preventDefault();
              alert("Transmission Received. Our operatives will contact you shortly.");
            }}>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-4">Full Identity</label>
                  <input 
                    type="text" 
                    placeholder="Enter Name" 
                    required
                    className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:outline-none focus:border-brand-gold transition-colors text-slate-950 font-bold placeholder:text-slate-300" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-4">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@domain.com" 
                    required
                    className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:outline-none focus:border-brand-gold transition-colors text-slate-950 font-bold placeholder:text-slate-300" 
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-4">Inquiry Nature</label>
                <select className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:outline-none focus:border-brand-gold transition-colors text-slate-950 font-bold appearance-none cursor-pointer">
                  <option>Bespoke Design Request</option>
                  <option>Enterprise Licensing</option>
                  <option>Matrimonial Asset Support</option>
                  <option>Partnership Protocol</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-4">Intelligence Brief</label>
                <textarea 
                  rows={4} 
                  placeholder="Describe your vision..." 
                  required
                  className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:outline-none focus:border-brand-gold transition-colors text-slate-950 font-bold placeholder:text-slate-300"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-slate-950 text-white py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] flex items-center justify-center gap-4 shadow-2xl shadow-slate-200 group"
              >
                Send Message <Send size={16} className="group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

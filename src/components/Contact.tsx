import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: t('contact.opt1'),
    message: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!db) throw new Error("Database connection failed");
      
      await addDoc(collection(db, 'submissions'), {
        ...formData,
        createdAt: serverTimestamp(),
        source: 'contact_form'
      });

      setIsSuccess(true);
      setFormData({ name: '', email: '', type: t('contact.opt1'), message: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'submissions');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-24 items-start ${language === 'ur' ? 'lg:flex-row-reverse text-right' : ''}`}>
          <div className={language === 'ur' ? 'order-2 lg:order-1' : ''}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={language === 'ur' ? 'text-right' : ''}
            >
              <div className={`text-[10px] font-black uppercase tracking-[0.6em] text-brand-gold mb-10 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>{t('contact.tag')}</div>
              <h2 className={`text-5xl md:text-7xl font-serif italic text-slate-950 mb-12 leading-tight tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}>{t('contact.title1')} <br /><span className="text-brand-gold not-italic font-sans font-black uppercase text-4xl md:text-6xl block mt-4 tracking-normal">{t('contact.title2')}</span></h2>
              <p className={`text-slate-500 text-lg mb-16 font-light leading-relaxed max-w-md ${language === 'ur' ? 'font-urdu' : ''}`}>
                {t('contact.desc')}
              </p>

              <div className="grid gap-10">
                <div className={`flex items-center gap-6 group ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center border border-slate-100 shadow-sm transition-all group-hover:border-brand-gold group-hover:shadow-xl group-hover:shadow-slate-100">
                    <Mail size={24} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className={`text-[10px] uppercase font-black tracking-widest text-slate-300 mb-1 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>Email</p>
                    <p className="text-slate-950 font-bold tracking-tight">contact@templateforge.co</p>
                  </div>
                </div>
                <div className={`flex items-center gap-6 group ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center border border-slate-100 shadow-sm transition-all group-hover:border-brand-gold group-hover:shadow-xl group-hover:shadow-slate-100">
                    <MessageSquare size={24} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className={`text-[10px] uppercase font-black tracking-widest text-slate-300 mb-1 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>WhatsApp</p>
                    <p className="text-slate-950 font-bold tracking-tight">+92 330 3093773</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-100 relative ${language === 'ur' ? 'text-right' : ''}`}
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle size={48} className="text-green-500" />
                </div>
                <h3 className={`text-3xl font-serif italic text-slate-950 mb-4 ${language === 'ur' ? 'font-urdu not-italic' : ''}`}>{t('contact.success.title')}</h3>
                <p className={`text-slate-500 font-light mb-10 ${language === 'ur' ? 'font-urdu' : ''}`}>{t('contact.success.desc')}</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className={`text-brand-gold font-black uppercase text-[10px] tracking-widest hover:underline ${language === 'ur' ? 'font-urdu tracking-normal' : ''}`}
                >
                  {t('contact.success.another')}
                </button>
              </motion.div>
            ) : (
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className={`text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-4 ${language === 'ur' ? 'mr-4 ml-0 font-urdu tracking-normal' : ''}`}>{t('contact.name')}</label>
                    <input 
                      type="text" 
                      placeholder={t('contact.placeholder.name')} 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:outline-none focus:border-brand-gold transition-colors text-slate-950 font-bold placeholder:text-slate-300 ${language === 'ur' ? 'text-right font-urdu' : ''}`} 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className={`text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-4 ${language === 'ur' ? 'mr-4 ml-0 font-urdu tracking-normal' : ''}`}>{t('contact.email')}</label>
                    <input 
                      type="email" 
                      placeholder={t('contact.placeholder.email')} 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:outline-none focus:border-brand-gold transition-colors text-slate-950 font-bold placeholder:text-slate-300 ${language === 'ur' ? 'text-right font-urdu' : ''}`} 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className={`text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-4 ${language === 'ur' ? 'mr-4 ml-0 font-urdu tracking-normal' : ''}`}>{t('contact.category')}</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className={`w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:outline-none focus:border-brand-gold transition-colors text-slate-950 font-bold appearance-none cursor-pointer ${language === 'ur' ? 'text-right font-urdu' : ''}`}
                  >
                    <option value="contact">{t('contact.opt1')}</option>
                    <option value="order">{t('contact.opt2')}</option>
                    <option value="lead">{t('contact.opt3')}</option>
                    <option value="newsletter">{t('contact.opt4')}</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className={`text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 ml-4 ${language === 'ur' ? 'mr-4 ml-0 font-urdu tracking-normal' : ''}`}>{t('contact.message')}</label>
                  <textarea 
                    rows={4} 
                    placeholder={t('contact.placeholder.msg')} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:outline-none focus:border-brand-gold transition-colors text-slate-950 font-bold placeholder:text-slate-300 ${language === 'ur' ? 'text-right font-urdu' : ''}`}
                  ></textarea>
                </div>
                <motion.button
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-slate-950 text-white py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] flex items-center justify-center gap-4 shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed ${language === 'ur' ? 'font-urdu tracking-normal flex-row-reverse' : ''}`}
                >
                  {isSubmitting ? t('contact.sending') : t('contact.send')} <Send size={16} className={`group-hover:translate-x-2 transition-transform ${language === 'ur' ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

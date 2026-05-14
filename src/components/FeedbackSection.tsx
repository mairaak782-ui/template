import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useLanguage } from '../lib/LanguageContext';

export default function FeedbackSection() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    category: 'Suggestion',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await addDoc(collection(db, 'feedbacks'), {
        ...formData,
        language: language,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({
        userName: '',
        userEmail: '',
        category: 'Suggestion',
        message: ''
      });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Feedback Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="feedback" className="py-16 md:py-32 relative overflow-hidden bg-slate-50/50">
      {/* Blended Mesh Background - Enhanced */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-brand-purple/15 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/3 animate-soft-pulse" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-brand-pink/10 blur-[120px] rounded-full translate-y-1/3 -translate-x-1/4 animate-soft-pulse [animation-delay:4s]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 md:gap-24 items-center ${language === 'ur' ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`${language === 'ur' ? 'text-right' : ''}`}>
            <div className={`text-[10px] font-black uppercase tracking-[0.6em] text-brand-purple mb-8 ${language === 'ur' ? 'tracking-normal font-urdu' : ''}`}>
              {t('feedback.tag')}
            </div>
            <h2 className={`text-5xl md:text-7xl font-serif italic text-slate-950 mb-12 leading-[1.1] tracking-tighter ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}>
              {t('feedback.title')}
            </h2>
            <p className={`text-slate-500 text-xl font-light leading-relaxed mb-16 max-w-lg ${language === 'ur' ? 'font-urdu' : ''}`}>
              {t('feedback.desc')}
            </p>

            <div className="space-y-12">
              {[
                { icon: <Sparkles />, title: language === 'en' ? "New Asset Requests" : "نئے اثاثوں کی درخواست", desc: language === 'en' ? "Need a specific Nikkah design or a business SaaS template?" : "کیا آپ کو نکاح کارڈ یا بزنس ٹیمپلیٹ کی ضرورت ہے؟" },
                { icon: <MessageSquare />, title: language === 'en' ? "Problem Solving" : "مسائل کا حل", desc: language === 'en' ? "Facing technical hurdles? We build tools to bypass them." : "تکنیکی مسائل کا سامنا ہے؟ ہم ان کے لیے ٹولز بناتے ہیں۔" }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`flex gap-6 items-start ${language === 'ur' ? 'flex-row-reverse text-right' : ''}`}
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-purple shadow-sm border border-slate-100 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold text-slate-950 mb-2 uppercase tracking-wide italic ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}>{item.title}</h4>
                    <p className={`text-slate-500 font-light leading-relaxed ${language === 'ur' ? 'font-urdu text-sm' : ''}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[4rem] p-12 md:p-16 shadow-3xl shadow-slate-200 border border-slate-100 relative group">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className={`text-[10px] font-black uppercase tracking-widest text-slate-400 ${language === 'ur' ? 'text-right block font-urdu' : ''}`}>{language === 'en' ? 'Full Name' : 'پورا نام'}</label>
                  <input 
                    type="text" 
                    required
                    value={formData.userName}
                    onChange={(e) => setFormData({...formData, userName: e.target.value})}
                    placeholder={language === 'en' ? "Enter name" : "نام درج کریں"}
                    className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 focus:outline-none focus:border-brand-purple transition-all text-slate-950 font-medium ${language === 'ur' ? 'text-right font-urdu' : ''}`}
                  />
                </div>
                <div className="space-y-3">
                  <label className={`text-[10px] font-black uppercase tracking-widest text-slate-400 ${language === 'ur' ? 'text-right block font-urdu' : ''}`}>{language === 'en' ? 'Email Address (Optional)' : 'ای میل (اختیاری)'}</label>
                  <input 
                    type="email" 
                    value={formData.userEmail}
                    onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                    placeholder={language === 'en' ? "Enter email" : "ای میل درج کریں"}
                    className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 focus:outline-none focus:border-brand-purple transition-all text-slate-950 font-medium ${language === 'ur' ? 'text-right font-urdu' : ''}`}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className={`text-[10px] font-black uppercase tracking-widest text-slate-400 ${language === 'ur' ? 'text-right block font-urdu' : ''}`}>{language === 'en' ? 'Category' : 'قسم'}</label>
                <div className={`flex flex-wrap gap-4 ${language === 'ur' ? 'flex-row-reverse' : ''}`}>
                  {['Suggestion', 'Problem', 'Feature Request'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData({...formData, category: cat})}
                      className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                        formData.category === cat 
                          ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/20' 
                          : 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-brand-purple/30'
                      } ${language === 'ur' ? 'font-urdu lowercase p-4 pb-4' : ''}`}
                    >
                      {language === 'ur' ? (cat === 'Suggestion' ? 'مشورہ' : cat === 'Problem' ? 'مسئلہ' : 'فیچر') : cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className={`text-[10px] font-black uppercase tracking-widest text-slate-400 ${language === 'ur' ? 'text-right block font-urdu' : ''}`}>{language === 'en' ? 'The Problem or Idea' : 'مسئلہ یا خیال'}</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={6}
                  placeholder={language === 'en' ? "Describe what you need or what's bothering you..." : "تفصیل بتائیں کہ آپ کو کیا چاہیے یا کیا مسئلہ ہے۔۔۔"}
                  className={`w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-6 focus:outline-none focus:border-brand-purple transition-all text-slate-950 font-light text-lg leading-relaxed resize-none ${language === 'ur' ? 'text-right font-urdu' : ''}`}
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-linear-to-r from-brand-purple to-brand-pink text-white rounded-2xl py-6 font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl shadow-brand-purple/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group/btn"
              >
                {status === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span className={language === 'ur' ? 'font-urdu tracking-normal text-sm' : ''}>{status === 'success' ? (language === 'en' ? 'RECEIVED' : 'مل گئی') : t('feedback.submit')}</span> 
                    <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-x-12 bottom-12 bg-white/90 backdrop-blur-md border border-emerald-100 p-6 rounded-3xl flex items-center gap-4 shadow-xl shadow-emerald-500/10"
                >
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h5 className={`font-bold text-slate-900 uppercase tracking-widest text-xs ${language === 'ur' ? 'font-urdu text-right tracking-normal' : ''}`}>{language === 'en' ? 'Request Transmitted' : 'درخواست بھیج دی گئی'}</h5>
                    <p className={`text-slate-500 text-[10px] font-medium leading-relaxed italic uppercase ${language === 'ur' ? 'font-urdu text-right italic-none' : ''}`}>{language === 'en' ? 'Maira will review your suggestion shortly.' : 'مائرہ جلد ہی آپ کے مشورے کا جائزہ لیں گی۔'}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, CheckCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CTASection() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!db) throw new Error("Database failed");
      await addDoc(collection(db, 'submissions'), {
        email,
        type: 'newsletter',
        createdAt: serverTimestamp(),
        source: 'cta_footer'
      });
      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'submissions');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cta" className="py-32 relative overflow-hidden bg-white border-t border-slate-100">
      {/* Reduced Complexity Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(110,68,255,0.05)_0%,transparent_60%)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/[0.03] blur-[100px] rounded-full opacity-60" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-slate-50 backdrop-blur-xl border border-slate-100 p-12 md:p-24 rounded-[4rem] text-center shadow-sm">
          {isSuccess ? (
            <div className="py-12">
              <div className="w-20 h-20 bg-brand-purple rounded-3xl flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h2 className="text-4xl font-serif italic text-slate-950 mb-4">Subscription Active</h2>
              <p className="text-slate-500 font-light mb-10">You've successfully joined the elite archive.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-brand-purple font-black uppercase text-[10px] tracking-widest hover:underline"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-10">
                <div className="w-24 h-24 bg-brand-purple rounded-[2rem] flex items-center justify-center shadow-2xl shadow-brand-purple/20">
                  <Mail className="text-white" size={40} />
                </div>
              </div>
              
              <h2 className={`text-5xl md:text-7xl font-serif italic text-slate-950 mb-10 leading-[1.1] tracking-tightest ${language === 'ur' ? 'font-urdu not-italic tracking-normal' : ''}`}>
                {t('cta.title')} 
                <span className="not-italic font-sans font-black uppercase text-brand-gold block mt-2 text-4xl md:text-6xl tracking-[0.4em]">
                  {t('cta.title.bold')}
                </span>
                {t('cta.title.end')}
              </h2>
              
              <p className={`text-slate-500 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed ${language === 'ur' ? 'font-urdu' : ''}`}>
                {t('cta.desc')}
              </p>
              
              <form
                className={`flex flex-col md:flex-row gap-6 max-w-2xl mx-auto ${language === 'ur' ? 'md:flex-row-reverse' : ''}`}
                onSubmit={handleSubmit}
              >
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('cta.placeholder')}
                  className={`flex-1 bg-white border border-slate-200 rounded-[2rem] px-10 py-6 text-slate-950 font-bold focus:outline-none focus:border-brand-purple transition-all shadow-sm ${language === 'ur' ? 'text-right font-urdu' : ''}`}
                  required
                />
                <button 
                  disabled={isSubmitting}
                  className="bg-slate-950 text-white px-14 py-6 rounded-[2rem] font-black uppercase text-[11px] tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-brand-purple transition-all shadow-2xl disabled:opacity-50"
                >
                  <span className={language === 'ur' ? 'font-urdu tracking-normal text-sm' : ''}>
                    {isSubmitting ? '...' : t('cta.button')}
                  </span>
                  <ArrowRight size={16} className={language === 'ur' ? 'rotate-180' : ''} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

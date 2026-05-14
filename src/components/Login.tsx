import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, LogIn, UserPlus, HelpCircle, ArrowLeft, ShieldCheck, Chrome } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { useLanguage } from '../lib/LanguageContext';

type AuthMode = 'login' | 'signup' | 'forgot';

export default function Login() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error(language === 'en' ? 'Passwords do not match' : 'پاس ورڈز مطابقت نہیں رکھتے');
        }
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/');
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, email);
        setMessage(language === 'en' ? 'Reset link sent to your email.' : 'ری سیٹ لنک آپ کے ای میل پر بھیج دیا گیا ہے۔');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6">
      <div className="max-w-md mx-auto">
        <Link to="/" className={`inline-flex items-center gap-2 text-slate-400 hover:text-brand-purple transition-colors mb-12 text-[10px] uppercase font-black tracking-[0.4em] ${language === 'ur' ? 'flex-row-reverse font-urdu tracking-normal' : ''}`}>
          <ArrowLeft size={16} className={language === 'ur' ? 'rotate-180' : ''} /> {language === 'en' ? 'Back to Forge' : 'واپس ہوم پیج'}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <ShieldCheck size={80} className="text-brand-purple" />
          </div>

          <div className="relative z-10 text-center mb-10">
            <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-brand-purple/20">
              {mode === 'signup' ? <UserPlus className="text-white" size={24} /> : mode === 'forgot' ? <HelpCircle className="text-white" size={24} /> : <LogIn className="text-white" size={24} />}
            </div>
            <h1 className={`text-3xl font-serif italic text-slate-950 mb-4 ${language === 'ur' ? 'font-urdu not-italic text-4xl' : ''}`}>
              {mode === 'login' ? t('auth.login.title') : mode === 'signup' ? t('auth.signup.title') : t('auth.forgot.title')}
            </h1>
            <p className={`text-slate-400 text-sm font-light leading-relaxed max-w-[280px] mx-auto ${language === 'ur' ? 'font-urdu' : ''}`}>
              {mode === 'login' ? t('auth.login.subtitle') : mode === 'signup' ? t('auth.signup.subtitle') : t('auth.forgot.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`space-y-2 ${language === 'ur' ? 'text-right' : ''}`}>
              <label className={`text-[10px] uppercase font-black tracking-widest text-slate-400 flex items-center gap-2 ${language === 'ur' ? 'flex-row-reverse font-urdu tracking-normal' : ''}`}>
                <Mail size={12} /> {t('auth.email')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-purple transition-all text-slate-900 ${language === 'ur' ? 'text-right font-urdu' : ''}`}
                placeholder="name@email.com"
              />
            </div>

            {mode !== 'forgot' && (
              <div className={`space-y-2 ${language === 'ur' ? 'text-right' : ''}`}>
                <label className={`text-[10px] uppercase font-black tracking-widest text-slate-400 flex items-center gap-2 ${language === 'ur' ? 'flex-row-reverse font-urdu tracking-normal' : ''}`}>
                  <Lock size={12} /> {t('auth.password')}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-purple transition-all text-slate-900 ${language === 'ur' ? 'text-right font-urdu' : ''}`}
                  placeholder="••••••••"
                />
              </div>
            )}

            {mode === 'signup' && (
              <div className={`space-y-2 ${language === 'ur' ? 'text-right' : ''}`}>
                <label className={`text-[10px] uppercase font-black tracking-widest text-slate-400 flex items-center gap-2 ${language === 'ur' ? 'flex-row-reverse font-urdu tracking-normal' : ''}`}>
                  <Lock size={12} /> {t('auth.confirmPassword')}
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-brand-purple transition-all text-slate-900 ${language === 'ur' ? 'text-right font-urdu' : ''}`}
                  placeholder="••••••••"
                />
              </div>
            )}

            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-red-500 text-[10px] font-bold uppercase tracking-widest bg-red-50 p-4 rounded-xl text-center ${language === 'ur' ? 'font-urdu' : ''}`}
              >
                {error}
              </motion.p>
            )}

            {message && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-green-600 text-[10px] font-bold uppercase tracking-widest bg-green-50 p-4 rounded-xl text-center ${language === 'ur' ? 'font-urdu' : ''}`}
              >
                {message}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-slate-950 text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-slate-200 hover:bg-brand-purple hover:shadow-brand-purple/20 transition-all ${language === 'ur' ? 'font-urdu tracking-normal' : ''} disabled:opacity-50`}
            >
              {isLoading ? '...' : mode === 'login' ? t('auth.login.btn') : mode === 'signup' ? t('auth.signup.btn') : t('auth.forgot.btn')}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-8 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest text-slate-300">
                  <span className="bg-white px-4">OR</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className={`w-full border border-slate-200 text-slate-900 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-slate-50 transition-all ${language === 'ur' ? 'font-urdu tracking-normal flex-row-reverse' : ''}`}
              >
                <Chrome size={18} className="text-brand-purple" /> {t('auth.google.btn')}
              </button>
            </div>
          )}

          <div className={`mt-10 pt-8 border-t border-slate-50 flex flex-col gap-4 text-center`}>
            {mode === 'login' ? (
              <>
                <button
                  onClick={() => setMode('signup')}
                  className={`text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-purple transition-colors ${language === 'ur' ? 'font-urdu' : ''}`}
                >
                  {t('auth.noAccount')} <span className="text-brand-gold ml-2 underline decoration-brand-gold/30">{t('auth.signup.btn')}</span>
                </button>
                <button
                  onClick={() => setMode('forgot')}
                  className={`text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-purple transition-colors ${language === 'ur' ? 'font-urdu' : ''}`}
                >
                  {t('auth.forgotLink')}
                </button>
              </>
            ) : (
              <button
                onClick={() => setMode('login')}
                className={`text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-purple transition-colors ${language === 'ur' ? 'font-urdu' : ''}`}
              >
                {t('auth.hasAccount')} <span className="text-brand-gold ml-2 underline decoration-brand-gold/30">{t('auth.login.btn')}</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

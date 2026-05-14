import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { generateProductContent } from '../lib/gemini';
import { Plus, Trash2, Loader2, Sparkles, LogIn, ExternalLink, Package, ShieldCheck, ArrowLeft, Home, TrendingUp, MessageSquare, Inbox } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [newProductInput, setNewProductInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'digital' | 'affiliate' | 'submissions' | 'feedbacks'>('digital');

  const adminEmail = 'mairaak782@gmail.com';
  const adminSecret = 'maira@2003';

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'template',
    type: 'digital',
    image: '',
    video: '',
    mediaType: 'image' as 'image' | 'video',
    badge: '',
    affiliateLink: '',
    features: [] as string[],
    mockupPrompt: '',
    seoTitle: '',
    seoDescription: '',
    location: 'Global Forge HQ'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const isMaira = currentUser?.email?.toLowerCase() === adminEmail.toLowerCase();
      setIsAdminUser(isMaira);
      
      const sessionVerified = localStorage.getItem('tf_admin_verified') === 'true';
      if (sessionVerified) setIsVerified(true);
      
      setIsLoading(false);
      
      if (currentUser && !isMaira) {
        console.warn('Unauthorized access attempt by:', currentUser.email);
        setLoginError(`Unauthorized: ${currentUser.email}. Admin access restricted.`);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdminUser && isVerified) {
      fetchProducts();
      fetchSubmissions();
      fetchFeedbacks();
    }
  }, [isAdminUser, isVerified]);

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminSecret) {
      setIsVerified(true);
      localStorage.setItem('tf_admin_verified', 'true');
    } else {
      alert('Incorrect access key.');
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setLoginError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Login failed:', error);
      setLoginError(error.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsVerified(false);
    localStorage.removeItem('tf_admin_verified');
  };

  const fetchProducts = async () => {
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'products');
    }
  };

  const fetchSubmissions = async () => {
    try {
      const q = query(collection(db, 'submissions'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setSubmissions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'submissions');
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setFeedbacks(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'feedbacks');
    }
  };

  const handleGenerate = async () => {
    if (!newProductInput) return;
    setIsGenerating(true);
    try {
      const result = await generateProductContent(newProductInput);
      setFormData({
        ...formData,
        title: result.title,
        description: result.description,
        mockupPrompt: result.mockupPrompt,
        features: result.features,
        category: result.suggestedCategory || 'template',
        price: result.suggestedPrice?.toString() || '',
        seoTitle: result.title,
        seoDescription: result.description,
      });
    } catch (error) {
      alert('Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdminUser) {
      alert('Action Unauthorized.');
      return;
    }
    if (!db) {
      alert('Database not initialized.');
      return;
    }
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        ...formData,
        price: parseFloat(formData.price || '0'),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'template',
        type: activeTab === 'affiliate' ? 'affiliate' : 'digital',
        image: '',
        video: '',
        mediaType: 'image',
        badge: '',
        affiliateLink: '',
        features: [],
        mockupPrompt: '',
        seoTitle: '',
        seoDescription: '',
        location: 'Global Forge HQ'
      });
      fetchProducts();
      alert('Product saved and deployed successfully.');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (coll: string, id: string) => {
    if (!isAdminUser) {
      alert('Delete Unauthorized.');
      return;
    }
    if (!confirm('Permanently delete?')) return;
    try {
      await deleteDoc(doc(db, coll, id));
      if (coll === 'products') fetchProducts();
      if (coll === 'submissions') fetchSubmissions();
      if (coll === 'feedbacks') fetchFeedbacks();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${coll}/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-gold" size={40} />
      </div>
    );
  }

  if (!isAdminUser) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white text-center">
        <div className="max-w-md">
          <ShieldCheck className="mx-auto mb-6 text-red-500" size={60} />
          <h1 className="text-3xl font-serif italic mb-4">Admin Only</h1>
          <p className="text-slate-400 mb-8">This zone is restricted to Forge Admin. Only mairaak782@gmail.com is authorized.</p>
          {!user ? (
            <button 
              onClick={handleLogin}
              className="bg-brand-gold text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-brand-gold/20"
            >
              Sign In to Verify Identity
            </button>
          ) : (
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all"
            >
              Logout Unauthorized User
            </button>
          )}
          {loginError && <p className="mt-6 text-red-400 text-xs uppercase tracking-widest">{loginError}</p>}
          <div className="mt-8">
            <Link to="/" className="text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-white transition-colors">Return to Site</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white text-center">
        <div className="max-w-sm w-full bg-slate-900 p-12 rounded-[3rem] border border-white/10 shadow-3xl">
          <ShieldCheck className="mx-auto mb-8 text-brand-gold" size={48} />
          <h1 className="text-3xl font-serif italic mb-8">Access Key Required</h1>
          <form onSubmit={handleVerifyPassword} className="space-y-6">
            <input 
              type="password"
              placeholder="Enter Password"
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-center outline-none focus:border-brand-gold transition-all"
            />
            <button className="w-full bg-brand-gold text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-brand-gold/20">
              Unlock Console
            </button>
            <div className="pt-4">
               <button onClick={handleLogout} className="text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-white">Log Out</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {!isAdminUser && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 bg-white/5 border border-brand-gold/30 p-10 md:p-16 rounded-[3rem] flex flex-col items-center text-center gap-8 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <ShieldCheck size={120} className="text-brand-gold" />
             </div>
             <div className="relative z-10 max-w-2xl">
               <div className="w-20 h-20 bg-brand-gold rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-brand-gold/20">
                 <LogIn className="text-white" size={32} />
               </div>
               <h3 className="text-3xl md:text-5xl font-serif italic text-white mb-6 tracking-tighter">Database Protocol</h3>
               <p className="text-slate-400 text-lg font-light leading-relaxed mb-12">
                 You have passed the primary clearance. To access the live cloud database and manage assets, please verify your Google identity (mairaak782@gmail.com).
               </p>
               <button 
                 onClick={handleLogin}
                 disabled={isLoading}
                 className="bg-brand-gold text-white px-16 py-6 rounded-2xl font-black uppercase text-[12px] tracking-[0.3em] flex items-center gap-4 hover:scale-105 transition-all shadow-2xl shadow-brand-gold/40 disabled:opacity-50"
               >
                 {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><LogIn size={20} /> Initialize Database Sync</>}
               </button>
               
               {loginError && (
                 <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                   <p className="text-sm font-bold text-red-500 uppercase tracking-widest mb-1">Authorization Error</p>
                   <p className="text-xs text-slate-400">{loginError}</p>
                 </div>
               )}
               
               {user && !isAdminUser && !loginError && (
                 <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                   <p className="text-xs font-bold text-red-400 uppercase tracking-widest">
                     Identity Error: {user.email} is not authorized for this console.
                   </p>
                 </div>
               )}
             </div>
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-gold transition-colors text-[10px] uppercase font-bold tracking-[0.3em]">
              <Home size={14} /> Global Registry
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif italic tracking-tighter">Forge Console</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mb-1">Authenticated Operative</p>
              <p className="text-xs font-bold text-brand-gold">{user?.email || 'Unauthorized'}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl text-[9px] uppercase font-bold tracking-widest hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-all"
            >
              Terminate Session
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-12 p-2 bg-white/5 border border-white/10 rounded-2xl w-fit">
          {[
            { id: 'digital', label: 'Assets', icon: <Package size={14} /> },
            { id: 'affiliate', label: 'Affiliates', icon: <TrendingUp size={14} /> },
            { id: 'submissions', label: 'Signals', icon: <Inbox size={14} /> },
            { id: 'feedbacks', label: 'Intel', icon: <MessageSquare size={14} /> }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-brand-gold text-white shadow-lg shadow-brand-gold/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {(activeTab === 'digital' || activeTab === 'affiliate') && (
            <>
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-slate-900 border border-white/10 p-8 rounded-[2rem] sticky top-32">
                   <h2 className="text-xl font-bold mb-8 uppercase tracking-widest flex items-center gap-3">
                    <Plus size={18} className="text-brand-gold" /> Deploy New Asset
                  </h2>

                  {!db && (
                  <div className="mb-8 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                    <p className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-2">Cloud Offline</p>
                    <p className="text-slate-400 text-[10px] leading-relaxed">The database connection is not active. Please ensure you have run the Firebase setup Tool.</p>
                  </div>
                )}

                <div className="mb-10 p-6 bg-white/5 border border-white/5 rounded-2xl">
                    <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mb-4">Neural Generator</p>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        value={newProductInput}
                        onChange={(e) => setNewProductInput(e.target.value)}
                        placeholder="What are we building?"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-all text-white"
                      />
                      <button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !newProductInput}
                        className="bg-brand-gold text-white px-4 rounded-xl disabled:opacity-50 hover:brightness-110 transition-all font-bold text-[9px]"
                      >
                        {isGenerating ? <Loader2 className="animate-spin" size={16} /> : 'GEN'}
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Price (USD)</label>
                        <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-brand-gold outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Category</label>
                        <input type="text" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-brand-gold outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Title</label>
                      <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-brand-gold outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Description</label>
                      <textarea required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-brand-gold outline-none min-h-[100px]" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Media Type</label>
                      <div className="flex gap-2">
                        {['image', 'video'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({...formData, mediaType: type as any})}
                            className={`flex-1 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${formData.mediaType === type ? 'bg-brand-gold text-white' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    {formData.mediaType === 'image' ? (
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Image URL</label>
                        <input type="text" required={formData.mediaType === 'image'} value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-brand-gold outline-none" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Video URL (TikTok/YouTube Direct/MP4)</label>
                        <input type="text" required={formData.mediaType === 'video'} value={formData.video} onChange={(e) => setFormData({...formData, video: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-brand-gold outline-none" />
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Backup Image (Thumbnail)</label>
                      <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-brand-gold outline-none" placeholder="Required for video thumbnails" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Protocol Link</label>
                      <input type="text" required value={formData.affiliateLink} onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs focus:border-brand-gold outline-none" />
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full bg-white text-slate-950 py-5 rounded-xl font-black uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-brand-gold hover:text-white transition-all">
                      {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Save Protocol'}
                    </button>
                  </form>
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {products.filter(p => p.type === activeTab).map((product) => (
                    <motion.div key={product.id} className="bg-slate-900 border border-white/5 p-6 rounded-[2rem] group relative">
                      <div className="flex gap-4 mb-4">
                        <div className="relative">
                          <img src={product.image} alt="" className="w-16 h-16 object-cover rounded-xl border border-white/10" />
                          {product.mediaType === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
                              <Sparkles size={12} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm mb-1 line-clamp-1">{product.title}</h3>
                          <p className="text-brand-gold font-mono text-xs">${product.price}</p>
                        </div>
                        <button onClick={() => handleDelete('products', product.id)} className="text-white/10 hover:text-red-500 transition-colors self-start p-2"><Trash2 size={16} /></button>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mb-4 font-light">{product.description}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-slate-600 border border-white/5 px-3 py-1 rounded-full">{product.category}</span>
                        <a href={product.affiliateLink} target="_blank" className="text-slate-500 hover:text-brand-gold transition-colors"><ExternalLink size={14} /></a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'submissions' && (
            <div className="lg:col-span-12 space-y-6">
              {submissions.map((sub) => (
                <motion.div key={sub.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-900 border border-white/10 p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 items-start hover:border-brand-gold/30 transition-all group">
                  <div className="bg-white/5 p-4 rounded-2xl text-brand-gold group-hover:scale-110 transition-transform"><Inbox size={24} /></div>
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap gap-4 justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{sub.name || 'Anonymous Signal'}</h3>
                        <p className="text-brand-gold text-xs font-mono">{sub.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] uppercase font-bold tracking-widest text-slate-500 mb-1">Received</p>
                        <p className="text-xs font-medium text-slate-400">{sub.createdAt?.toDate ? sub.createdAt.toDate().toLocaleString() : 'Just now'}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                       <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[8px] uppercase font-bold tracking-widest text-slate-500 mb-2">Category</p>
                        <p className="text-xs font-bold text-white uppercase">{sub.type}</p>
                      </div>
                      {sub.whatsapp && (
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                          <p className="text-[8px] uppercase font-bold tracking-widest text-slate-500 mb-2">WhatsApp</p>
                          <p className="text-xs font-bold text-white transition-colors hover:text-brand-gold cursor-pointer">{sub.whatsapp}</p>
                        </div>
                      )}
                      <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-[8px] uppercase font-bold tracking-widest text-slate-500 mb-2">Source Protocol</p>
                        <p className="text-xs font-bold text-white uppercase">{sub.source || 'Direct'}</p>
                      </div>
                    </div>
                    {sub.message && (
                      <div className="p-6 bg-slate-950 border border-white/5 rounded-2xl italic font-light text-slate-400 leading-relaxed">
                        "{sub.message}"
                      </div>
                    )}
                  </div>
                  <button onClick={() => handleDelete('submissions', sub.id)} className="bg-red-500/10 text-red-500 p-4 rounded-2xl hover:bg-red-500 transition-all hover:text-white"><Trash2 size={20} /></button>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'feedbacks' && (
            <div className="lg:col-span-12 space-y-6">
               {feedbacks.map((f) => (
                <motion.div key={f.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-white/10 p-8 rounded-[2rem] hover:border-brand-purple/30 transition-all group">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-6 items-center">
                       <div className="w-12 h-12 bg-brand-purple/20 rounded-2xl flex items-center justify-center text-brand-purple"><MessageSquare size={20} /></div>
                       <div>
                         <h3 className="text-lg font-bold">{f.userName}</h3>
                         <p className="text-[10px] text-slate-500 uppercase tracking-widest">{f.userEmail || 'Private Signal'}</p>
                       </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="px-4 py-1.5 bg-brand-purple/10 text-brand-purple border border-brand-purple/20 rounded-full text-[9px] font-bold uppercase tracking-widest">{f.category}</span>
                      <button onClick={() => handleDelete('feedbacks', f.id)} className="text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </div>
                  </div>
                  <p className="text-slate-300 font-light text-lg leading-relaxed mb-6 italic">"{f.message}"</p>
                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <div className="flex gap-4">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-slate-600">Language: {f.language || 'EN'}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">{f.createdAt?.toDate ? f.createdAt.toDate().toLocaleString() : 'Just now'}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

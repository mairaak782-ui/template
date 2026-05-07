import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { generateProductContent } from '../lib/gemini';
import { Plus, Trash2, Loader2, Sparkles, LogIn, ExternalLink, Package, ShieldCheck, ArrowLeft, Home, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [newProductInput, setNewProductInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [activeTab, setActiveTab] = useState<'digital' | 'affiliate'>('digital');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'template',
    type: 'digital',
    image: '',
    badge: '',
    affiliateLink: '',
    features: [] as string[],
    mockupPrompt: '',
    seoTitle: '',
    seoDescription: '',
    location: 'Global Forge HQ'
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, type: activeTab }));
  }, [activeTab]);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_access') === 'true';
    if (isAuth) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'maira@2003') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_access', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_access');
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
        location: 'Global Forge HQ'
      });
      alert('Content generated successfully! You can find the 3D mockup prompt in the field below.');
    } catch (error) {
      alert('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        ...formData,
        price: parseFloat(formData.price),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        seoTitle: formData.seoTitle,
        seoDescription: formData.seoDescription,
        location: formData.location
      });
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'template',
        image: '',
        badge: '',
        affiliateLink: '',
        features: [],
        mockupPrompt: '',
        seoTitle: '',
        seoDescription: '',
        location: 'Global Forge HQ'
      });
      setNewProductInput('');
      fetchProducts();
      alert('Product added successfully');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-sm shadow-2xl border border-slate-100 max-w-md w-full"
        >
          <div className="flex items-center gap-2 mb-8 justify-center">
            <span className="text-2xl font-bold tracking-tighter text-slate-900 font-sans">MODERN<span className="text-brand-gold font-serif italic ml-1">ARCHIVE</span></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 ml-2">Console</span>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-2">Access Key</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-sm px-6 py-4 focus:outline-none focus:border-brand-gold transition-all font-mono"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-brand-gold text-white py-5 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 hover:brightness-110 transition-all"
            >
              System Initialize <LogIn size={16} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <Link to="/" className="text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-brand-gold transition-colors flex items-center justify-center gap-2">
              <ArrowLeft size={12} /> Back to Site
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-gold transition-colors mb-4 text-[10px] uppercase font-bold tracking-widest">
              <Home size={14} /> Return to Home
            </Link>
            <div className="flex items-center gap-2 mb-2 text-brand-gold">
              <ShieldCheck size={16} />
              <span className="text-[10px] uppercase font-bold tracking-[0.4em]">Secure Command Center</span>
            </div>
            <h1 className="text-4xl font-serif italic text-slate-900">Manage Assets</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400 hover:text-red-500 transition-colors"
          >
            System Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Add Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-sm shadow-xl border border-slate-100 sticky top-32">
              <div className="flex gap-4 mb-8 p-1 bg-slate-50 rounded-sm border border-slate-100">
                <button 
                  onClick={() => setActiveTab('digital')}
                  className={`flex-1 py-3 text-[9px] uppercase font-bold tracking-widest transition-all rounded-sm ${activeTab === 'digital' ? 'bg-white shadow-sm text-brand-gold' : 'text-slate-400'}`}
                >
                  Digital Asset
                </button>
                <button 
                  onClick={() => setActiveTab('affiliate')}
                  className={`flex-1 py-3 text-[9px] uppercase font-bold tracking-widest transition-all rounded-sm ${activeTab === 'affiliate' ? 'bg-white shadow-sm text-brand-gold' : 'text-slate-400'}`}
                >
                  Affiliate
                </button>
              </div>

              <h2 className="text-xl font-bold mb-8 uppercase tracking-widest flex items-center gap-3">
                {activeTab === 'digital' ? <Plus size={18} className="text-brand-gold" /> : <TrendingUp size={18} className="text-brand-gold" />}
                Add New {activeTab === 'digital' ? 'Asset' : 'Recommendation'}
              </h2>

              <div className="mb-10 p-6 bg-slate-50 border border-slate-100 rounded-sm">
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 mb-4">Quick AI Fill</p>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={newProductInput}
                    onChange={(e) => setNewProductInput(e.target.value)}
                    placeholder={activeTab === 'digital' ? "Template Name/Role" : "Product URL/Brand"}
                    className="flex-1 bg-white border border-slate-200 rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-all"
                  />
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !newProductInput}
                    className="bg-brand-gold text-white p-3 rounded-sm disabled:opacity-50 hover:brightness-110 transition-all font-bold text-[10px]"
                  >
                    {isGenerating ? <Loader2 className="animate-spin" size={18} /> : 'GENERATE'}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-2">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-all"
                      required
                    >
                      <option value="">Select Category</option>
                      <optgroup label="Templates">
                        <option value="Template: Portfolio">Portfolio Template</option>
                        <option value="Template: Business">Business Template</option>
                        <option value="Template: Landing Page">Landing Page</option>
                      </optgroup>
                      <optgroup label="Cards">
                        <option value="Card: Nikkah">Nikkah Design</option>
                        <option value="Card: Birthday">Birthday Design</option>
                        <option value="Card: Invitation">Invitation Design</option>
                      </optgroup>
                      <optgroup label="Tools (Affiliate)">
                        <option value="Tool: Hosting">Web Hosting</option>
                        <option value="Tool: Design">Design Software</option>
                        <option value="Tool: Development">Dev Tools</option>
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-2">Price (USD)</label>
                    <input 
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-2">Asset Origin / Location</label>
                    <select 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-all"
                      required
                    >
                      <option value="Global Forge HQ">Global Forge HQ</option>
                      <option value="Design Lab Alpha">Design Lab Alpha</option>
                      <option value="SaaS Infrastructure Hub">SaaS Infrastructure Hub</option>
                      <option value="Premium Matrimonial Archive">Premium Matrimonial Archive</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 p-4 bg-slate-50 border border-slate-100 rounded-sm">
                  <p className="text-[9px] font-black uppercase tracking-widest text-brand-purple">SEO Optimization Protocol</p>
                  <div>
                    <label className="block text-[8px] uppercase font-bold tracking-widest text-slate-400 mb-1">Meta Title</label>
                    <input 
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                      placeholder="Keywords-rich SEO Title"
                      className="w-full bg-white border border-slate-200 rounded-sm px-4 py-2 text-xs focus:outline-none focus:border-brand-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase font-bold tracking-widest text-slate-400 mb-1">Meta Description</label>
                    <textarea 
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({...formData, seoDescription: e.target.value})}
                      placeholder="High-converting SEO description"
                      className="w-full bg-white border border-slate-200 rounded-sm px-4 py-2 text-xs focus:outline-none focus:border-brand-gold transition-all min-h-[60px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-2">Product Title</label>
                  <input 
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-2">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-all min-h-[100px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-2">Header/Visual Image URL</label>
                  <input 
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-all"
                    placeholder="Unsplash image URL preferred"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-2">
                    {activeTab === 'digital' ? 'Download/Access Link' : 'Affiliate (Amazon/Shopify) Link'}
                  </label>
                  <input 
                    type="text"
                    value={formData.affiliateLink}
                    onChange={(e) => setFormData({...formData, affiliateLink: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-brand-gold transition-all"
                    placeholder={activeTab === 'digital' ? 'Link to your file' : 'Referral product link'}
                    required
                  />
                </div>

                {activeTab === 'digital' && (
                  <div className="p-4 bg-brand-gold/5 border border-brand-gold/10 rounded-sm">
                    <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-gold mb-2 flex items-center gap-2">
                      <Sparkles size={10} /> 3D Visual Blueprint
                    </label>
                    <textarea 
                      value={formData.mockupPrompt}
                      readOnly
                      className="w-full bg-white/50 border border-slate-100 rounded-sm px-4 py-3 text-[9px] font-mono text-slate-500 focus:outline-none min-h-[80px]"
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white py-4 rounded-sm font-bold uppercase text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-50 hover:bg-brand-gold transition-all shadow-lg"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={16} /> : `Save ${activeTab === 'digital' ? 'Asset' : 'Recommendation'}`}
                </button>
              </form>
            </div>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center justify-between px-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Inventory ({products.length})</span>
                <button onClick={fetchProducts} className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Refresh</button>
              </div>

              {isLoading && products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-sm">
                  <Loader2 className="animate-spin text-brand-gold mb-4" size={32} />
                  <span className="text-xs text-slate-400 uppercase tracking-widest">Querying System...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="py-20 text-center bg-white border border-slate-100 rounded-sm">
                  <Package size={48} className="mx-auto text-slate-100 mb-6" />
                  <p className="text-slate-400 text-sm font-light">No assets deployed in current protocol.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <AnimatePresence>
                    {products.map((product) => (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white p-8 rounded-sm shadow-md border border-slate-100 group relative"
                      >
                        <div className="flex gap-6 mb-6">
                          <div className="w-20 h-20 flex-shrink-0 bg-slate-50 border border-slate-100 overflow-hidden rounded-sm">
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2">{product.title}</h3>
                              <button 
                                onClick={() => handleDelete(product.id)}
                                className="text-slate-200 hover:text-red-500 transition-colors p-2"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <span className="text-brand-gold font-bold text-sm">${product.price}</span>
                          </div>
                        </div>
                        <p className="text-slate-500 text-xs line-clamp-3 mb-6 font-light">{product.description}</p>
                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300 py-1 px-3 bg-slate-50 rounded-full">{product.category}</span>
                          <a 
                            href={product.affiliateLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-brand-gold hover:text-brand-gold-light"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { useLanguage } from './lib/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Store from './components/Store';
import CategoryNav from './components/CategoryNav';
import CollectionTicker from './components/CollectionTicker';
import BenefitSection from './components/BenefitSection';
import AffiliateSection from './components/AffiliateSection';
import CTASection from './components/CTASection';
import FeedbackSection from './components/FeedbackSection';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Admin from './components/Admin';
import ProductDetail from './components/ProductDetail';
import BlogDetail from './components/BlogDetail';
import AnimatedBackground from './components/AnimatedBackground';
import IntroAnimation from './components/IntroAnimation';

function MainSite() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('intro_played');
    }
    return true;
  });

  const handleComplete = () => {
    sessionStorage.setItem('intro_played', 'true');
    setIsLoading(false);
  };

  return (
    <AnimatePresence>
      {isLoading ? (
        <IntroAnimation key="intro" onComplete={handleComplete} />
      ) : (
        <motion.div 
          key="content" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <AnimatedBackground />
          <Navbar />
          <main>
            <Hero />
            <CategoryNav />
            <CollectionTicker />
            <About />
            
            <Store 
              sectionId="templates" 
              title={language === 'en' ? 'Digital Templates' : 'ڈیجیٹل ٹیمپلیٹس'} 
              subTitle={language === 'en' ? 'High-performance website architectures for portfolios, businesses, and landing pages.' : 'پورٹ فولیوز اور کاروبار کے لیے اعلیٰ کارکردگی والے ویب سائٹ ڈیزائن۔'}
              filterCategory="template"
            />

            <BenefitSection />

            <AffiliateSection />
            <FeedbackSection />
            <CTASection />
            <Blog />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { LanguageProvider } from './lib/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-bg-dark text-slate-900 font-sans selection:bg-brand-gold selection:text-white">
          <Routes>
            <Route path="/" element={<MainSite />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

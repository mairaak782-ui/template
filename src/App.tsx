/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
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
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import Admin from './components/Admin';
import ProductDetail from './components/ProductDetail';
import BlogDetail from './components/BlogDetail';
import Login from './components/Login';
import AnimatedBackground from './components/AnimatedBackground';
import IntroAnimation from './components/IntroAnimation';

function MainSite() {
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  const handleIntroComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <IntroAnimation key="intro" onComplete={handleIntroComplete} />
        ) : (
          <motion.div 
            key="content" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.3, 
            }}
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
                sectionId="saas" 
                title={t('store.templates.title')} 
                subTitle={t('store.templates.subtitle')}
                filterCategory="template"
              />

              <BenefitSection />

              <Store 
                sectionId="cards" 
                title={t('store.cards.title')} 
                subTitle={t('store.cards.subtitle')}
                filterCategory="card"
              />

              <AffiliateSection />
              <FeedbackSection />
              <CTASection />
              <Blog />
              <Contact />
            </main>
            <Footer />
            <WhatsAppButton />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
            <Route path="/login" element={<Login />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

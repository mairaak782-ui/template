/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Store from './components/Store';
import CategoryNav from './components/CategoryNav';
import BenefitSection from './components/BenefitSection';
import AffiliateSection from './components/AffiliateSection';
import CTASection from './components/CTASection';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import ProductDetail from './components/ProductDetail';

function MainSite() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryNav />
        
        <Store 
          sectionId="templates" 
          title="Digital Templates" 
          subTitle="High-performance website architectures for portfolios, businesses, and landing pages."
          filterCategory="template"
        />

        <BenefitSection />

        <Store 
          sectionId="cards" 
          title="Curated Designs" 
          subTitle="Elite greeting cards for Nikkah, Birthdays, and special invitations. Instant luxury for every occasion."
          filterCategory="card"
        />

        <AffiliateSection />
        <CTASection />
        <Blog />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-dark text-slate-900 font-sans selection:bg-brand-gold selection:text-white">
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

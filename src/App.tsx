/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Store from './components/Store';
import AffiliateSection from './components/AffiliateSection';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';

function MainSite() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Store />
        <AffiliateSection />
        <About />
        <Contact />
        <Blog />
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
        </Routes>
      </div>
    </Router>
  );
}

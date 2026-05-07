import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.templates': 'Templates',
    'nav.saas': 'SaaS',
    'nav.matrimonial': 'Matrimonial',
    'nav.blog': 'Journal',
    'nav.about': 'About Maira',
    'nav.contact': 'Contact',
    'hero.tag1': 'Premium Digital Ecosystem',
    'hero.title1.serif': 'Elite SaaS &',
    'hero.title1.bold': 'Premium Apps.',
    'hero.desc1': 'High-performance SaaS applications and aesthetic digital systems. Precision-built for Template Forge innovators.',
    'hero.cta1': 'Explore SaaS',
    'hero.tag2': 'Expert Resource Vault',
    'hero.title2.serif': 'Pro Design',
    'hero.title2.bold': 'Digital Tools.',
    'hero.desc2': 'Hand-picked software and design ecosystems used to build and scale elite digital platforms with precision.',
    'hero.cta2': 'Explore Collection',
    'about.tag': 'Leadership & Global Vision',
    'about.title': 'The Vision of CEO Maira.',
    'about.desc': 'As the lead strategist and CEO behind Template Forge, I have dedicated my career to redefining digital elegance. Every resource here is a result of technical design and architectural refinement, specifically curated to provide the most sophisticated digital systems.',
    'about.feature1.title': "Maira's Strategic Intent",
    'about.feature1.desc': 'Every line of code and every pixel is personally vetted by me to ensure high-converting purpose and absolute technical superiority.',
    'about.feature2.title': 'Elite Forge Standards',
    'about.feature2.desc': 'Fast, invisible, and efficient architecture designed for the 2026 digital era, powered by our custom performance protocols.',
    'ticker.title': 'Live Collection Viewer',
    'store.tag': 'Elite Collection',
    'store.title': 'The Digital Assets Library.',
    'feedback.tag': 'Collaborative Innovation',
    'feedback.title': 'What Should We Forge Next?',
    'feedback.desc': "Tell us about the problems you face. Whether it's a specific SaaS tool you need or a design problem, Maira's team is ready to build the solution.",
    'feedback.submit': 'Submit Request',
    'footer.title': 'Future Innovation.',
    'footer.desc': 'Secure your access to our premium collections. Subscribe for early release notifications.',
    'cat.templates': 'Website Templates',
    'cat.templates.desc': 'Portfolio, Business & Landing Pages',
    'cat.nikkah': 'Nikkah Cards',
    'cat.nikkah.desc': 'Elegant Traditional Invitations',
    'cat.birthday': 'Birthday Cards',
    'cat.birthday.desc': 'Modern & Playful Greeting Designs',
    'blog.tag': 'Strategic Journal',
    'blog.title': 'Insights ',
    'blog.title.bold': '& Education.',
    'blog.desc': 'Master your craft with our latest tutorials. From mastering digital templates to building iconic SaaS systems for 2026.',
    'cta.title': 'Get Premium ',
    'cta.title.bold': 'Asset Updates',
    'cta.title.end': ' & Early Access.',
    'cta.desc': 'Join 2,000+ creators and get notified the moment a new premium system drops. Elite resources, zero fluff.',
    'cta.placeholder': 'Enter your professional email',
    'cta.button': 'Subscribe'
  },
  ur: {
    'nav.home': 'ہوم',
    'nav.templates': 'ٹیمپلیٹس',
    'nav.saas': 'SaaS',
    'nav.matrimonial': 'نکاح کارڈز',
    'nav.blog': 'بلاگ',
    'nav.about': 'مائرہ کے بارے میں',
    'nav.contact': 'رابطہ',
    'hero.tag1': 'پریمیم ڈیجیٹل سسٹم',
    'hero.title1.serif': 'اعلیٰ SaaS اور',
    'hero.title1.bold': 'پریمیم ایپس۔',
    'hero.desc1': 'اعلیٰ کارکردگی والے SaaS ایپلی کیشنز اور خوبصورت ڈیجیٹل سسٹمز۔ مائرہ کے ذریعے ڈیزائن کردہ۔',
    'hero.cta1': 'ایکسپلور کریں',
    'hero.tag2': 'ماہرانہ وسائل کا خزانہ',
    'hero.title2.serif': 'پرو ڈیزائن',
    'hero.title2.bold': 'ڈیجیٹل ٹولز۔',
    'hero.desc2': 'اعلیٰ درجے کے ڈیجیٹل پلیٹ فارمز بنانے کے لیے منتخب کردہ سافٹ ویئر اور ڈیزائن ٹولز۔',
    'hero.cta2': 'کلکشن دیکھیں',
    'about.tag': 'قیادت اور عالمی وژن',
    'about.title': 'سی ای او مائرہ کا وژن۔',
    'about.desc': 'ٹیمپلیٹ فورج کے پیچھے لیڈ اسٹریٹجسٹ اور سی ای او کے طور پر، میں نے اپنے کیریئر کو ڈیجیٹل خوبصورتی کی ازسرنو تعریف کے لیے وقف کر دیا ہے۔ یہاں موجود ہر وسیلہ تکنیکی ڈیزائن اور فن تعمیر کا نتیجہ ہے، جو خاص طور پر جدید ترین ڈیجیٹل نظام فراہم کرنے کے لیے تیار کیا گیا ہے۔',
    'about.feature1.title': 'مائرہ کا تزویراتی ارادہ',
    'about.feature1.desc': 'کوڈ کی ہر لائن اور ہر پکسل کی میں نے ذاتی طور پر جانچ کی ہے تاکہ اعلیٰ معیار اور تکنیکی برتری کو یقینی بنایا جا سکے۔',
    'about.feature2.title': 'ایلیٹ فورج معیار',
    'about.feature2.desc': 'تیز، پوشیدہ، اور موثر فن تعمیر جو 2026 کے ڈیجیٹل دور کے لیے ڈیزائن کیا گیا ہے۔',
    'ticker.title': 'لائیو کلکشن ویور',
    'store.tag': 'اعلیٰ کلکشن',
    'store.title': 'ڈیجیٹل اثاثوں کی لائبریری۔',
    'feedback.tag': 'باہمی جدت',
    'feedback.title': 'ہمیں آگے کیا بنانا چاہیے؟',
    'feedback.desc': 'ہمیں ان مسائل کے بارے میں بتائیں جن کا آپ سامنا کر رہے ہیں۔ مائرہ کی ٹیم حل تیار کرنے کے لیے تیار ہے۔',
    'feedback.submit': 'درخواست جمع کرائیں',
    'footer.title': 'مستقبل کی جدت۔',
    'footer.desc': 'ہمارے پریمیم کلکشن تک رسائی حاصل کریں۔ نئی ریلیز کے لیے سبسکرائب کریں۔',
    'cat.templates': 'ویب سائٹ ٹیمپلیٹس',
    'cat.templates.desc': 'پورٹ فولیو اور بزنس پیجز',
    'cat.nikkah': 'نکاح کارڈز',
    'cat.nikkah.desc': 'خوبصورت روایتی ڈیزائن',
    'cat.birthday': 'سالگرہ کارڈز',
    'cat.birthday.desc': 'جدید اور خوبصورت ڈیزائن',
    'blog.tag': 'تزویراتی جرنل',
    'blog.title': 'بصیرت ',
    'blog.title.bold': 'اور تعلیم۔',
    'blog.desc': 'ہمارے تازہ ترین ٹیوٹوریلز کے ساتھ اپنے فن میں مہارت حاصل کریں۔ ڈیجیٹل ٹیمپلیٹس سے لے کر 2026 کے لیے SaaS سسٹمز بنانے تک۔',
    'cta.title': 'پریمیم ',
    'cta.title.bold': 'اپ ڈیٹس حاصل کریں',
    'cta.title.end': ' اور رسائی حاصل کریں۔',
    'cta.desc': '2000 سے زائد تخلیق کاروں میں شامل ہوں اور پریمیم سسٹم کی ریلیز کی اطلاع پائیں۔',
    'cta.placeholder': 'اپنی ای میل درج کریں',
    'cta.button': 'سبسکرائب کریں'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'template' | 'journal' | 'card' | 'saas' | 'application';
  image: string;
  badge?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  content: string;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Minimalist Portfolio Template',
    description: 'A clean, high-performance Vite + React portfolio template for creatives.',
    price: 49,
    category: 'template',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular'
  },
  {
    id: '2',
    title: 'Premium Nikkah Card Design',
    description: 'Elite digital invitation with gold foil aesthetic and traditional motifs.',
    price: 25,
    category: 'card',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    badge: 'Luxury'
  },
  {
    id: 'saas-1',
    title: 'ForgeCRM SaaS App',
    description: 'Full-stack CRM application for managing digital asset sales and customer relations.',
    price: 129,
    category: 'saas',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    badge: 'Enterprise'
  },
  {
    id: 'app-1',
    title: 'TaskFlow Productivity App',
    description: 'Cross-platform task management application with real-time sync and gold-standard UI.',
    price: 79,
    category: 'application',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80',
    badge: 'App Store'
  },
  {
    id: '3',
    title: 'SaaS Landing Page Pack',
    description: '5 high-converting landing page templates built with Tailwind CSS.',
    price: 89,
    category: 'template',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Value'
  },
  {
    id: '4',
    title: 'Birthday Celebration Design',
    description: 'Modern, playful digital card for high-end birthday events.',
    price: 15,
    category: 'card',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'
  }
];

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Hostinger Premium',
    description: 'The best reliable hosting for modern businesses with 99.9% uptime.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    rating: 5
  },
  {
    id: '2',
    title: 'Canva Pro Early Access',
    description: 'Unlock professional designs with thousands of premium templates and AI assets.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9
  },
  {
    id: '3',
    title: 'Grammarly',
    description: 'Upgrade your writing with AI-powered suggestions and clarity checks.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Mastering Digital Templates: The Ultimate CEO Guide to High-Converting Layouts',
    excerpt: 'Discover how to transform static HTML into dynamic, high-revenue engines with Maira\'s expert customization protocols and design principles.',
    date: 'May 10, 2026',
    author: 'Maira (CEO)',
    category: 'Tutorial',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    content: 'Full article content for mastering digital templates...'
  },
  {
    id: '2',
    title: 'Best Nikkah Designs 2026: Modern Traditions & Luxury Invitation Inspiration',
    excerpt: 'Step into the future of matrimonial elegance with our curated selection of the most sophisticated Nikkah designs for the 2026 season.',
    date: 'May 08, 2026',
    author: 'Maira (CEO)',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    content: 'Full article content for best Nikkah designs 2026...'
  },
  {
    id: '3',
    title: 'Scaling SaaS Empires: CEO Maira\'s Blueprint for Iconic Software Architectures',
    excerpt: 'Exclusive insights into the technical and strategic layers required to build, scale, and dominate the modern SaaS market using high-performance infrastructure.',
    date: 'May 05, 2026',
    author: 'Maira (CEO)',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1454165833069-b1950e67e2d1?auto=format&fit=crop&w=1200&q=80',
    content: 'Full article content for scaling SaaS empires...'
  }
];


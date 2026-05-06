export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'template' | 'journal';
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
    title: 'Digital Productivity Journal',
    description: 'A 365-day interactive PDF journal designed for maximum efficiency.',
    price: 19,
    category: 'journal',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80'
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
    title: 'Gratitude & Wellness Log',
    description: 'A beautifully designed printable journal for mental well-being.',
    price: 15,
    category: 'journal',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
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
    title: 'Canva Pro',
    description: 'Create professional designs with thousands of templates and assets.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: '3',
    title: 'Grammarly',
    description: 'Upgrade your writing with AI-powered suggestions and clarity checks.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    rating: 4.5
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Build a High-Converting Storefront in 2024',
    excerpt: 'Learn the principles of UI/UX that turn visitors into loyal customers.',
    date: 'May 12, 2024',
    author: 'Admin',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80',
    content: 'Long content here...'
  },
  {
    id: '2',
    title: 'Designing Digital Assets That Sell',
    excerpt: 'Master the art of creating premium digital products that stand out in a crowded market.',
    date: 'May 08, 2024',
    author: 'Maira',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
    content: 'Long content here...'
  },
  {
    id: '3',
    title: 'Why Digital Journals are the Future of Productivity',
    excerpt: 'Digital journals offer flexibility and searchability that paper simply cannot match.',
    date: 'May 01, 2024',
    author: 'Admin',
    category: 'Life',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    content: 'Long content here...'
  }
];

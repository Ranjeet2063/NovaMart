import { Category, Product, Testimonial } from './types';

export const categories: Category[] = [
  { id: 'c1', name: 'Electronics', slug: 'electronics' },
  { id: 'c2', name: 'Fashion', slug: 'fashion' },
  { id: 'c3', name: 'Home', slug: 'home' },
  { id: 'c4', name: 'Beauty', slug: 'beauty' }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Nova Earbuds Pro',
    slug: 'nova-earbuds-pro',
    description: 'Noise cancellation, 36h battery and immersive audio.',
    price: 99,
    currency: 'USD',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=80',
    inventory: 48,
    rating: 4.8,
    featured: true,
    bestseller: true,
    reviews: [
      { id: 'r1', user: 'Sophia', rating: 5, comment: 'Amazing sound quality!' },
      { id: 'r2', user: 'Liam', rating: 4, comment: 'Great value for money.' }
    ]
  },
  {
    id: 'p2',
    name: 'Urban Flex Sneakers',
    slug: 'urban-flex-sneakers',
    description: 'Lightweight running shoes with premium comfort.',
    price: 120,
    currency: 'USD',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    inventory: 32,
    rating: 4.6,
    featured: true,
    reviews: [{ id: 'r3', user: 'Ava', rating: 5, comment: 'Super comfy for long walks.' }]
  },
  {
    id: 'p3',
    name: 'Smart Home Lamp',
    slug: 'smart-home-lamp',
    description: 'App controlled lamp with warm/cool lighting presets.',
    price: 75,
    currency: 'USD',
    category: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
    inventory: 24,
    rating: 4.4,
    bestseller: true,
    reviews: [{ id: 'r4', user: 'Noah', rating: 4, comment: 'Looks great and works well.' }]
  },
  {
    id: 'p4',
    name: 'Radiant Skin Kit',
    slug: 'radiant-skin-kit',
    description: 'Clean beauty essentials for daily routine.',
    price: 59,
    currency: 'USD',
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
    inventory: 19,
    rating: 4.7,
    featured: true,
    reviews: [{ id: 'r5', user: 'Emma', rating: 5, comment: 'Gentle and effective products.' }]
  }
];

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Mason', text: 'Fast shipping and premium quality products.' },
  { id: 't2', name: 'Olivia', text: 'The checkout experience is smooth and secure.' },
  { id: 't3', name: 'Ethan', text: 'Excellent support and easy order tracking.' }
];

export const faqs = [
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days globally.'
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes, every order gets a tracking number in your dashboard.'
  },
  {
    question: 'What payment methods are supported?',
    answer: 'All major cards and wallets via Stripe.'
  }
];

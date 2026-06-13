export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Review = {
  id: string;
  user: string;
  rating: number;
  comment: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: 'USD' | 'EUR' | 'INR';
  category: string;
  image: string;
  inventory: number;
  rating: number;
  featured?: boolean;
  bestseller?: boolean;
  reviews: Review[];
};

export type Testimonial = {
  id: string;
  name: string;
  text: string;
};

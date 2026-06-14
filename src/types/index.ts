import { ObjectId } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'user' | 'admin';
  addresses: IAddress[];
  phone?: string;
  createdAt: Date;
}

export interface IAddress {
  _id?: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  richDescription?: string;
  images: string[];
  brand: string;
  price: number;
  comparePrice?: number;
  category: ObjectId | ICategory;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  tags: string[];
  specifications: { key: string; value: string }[];
  createdAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parentCategory?: ObjectId;
}

export interface IOrder {
  _id: string;
  user: ObjectId | IUser;
  orderItems: IOrderItem[];
  shippingAddress: IAddress;
  paymentMethod: string;
  paymentResult?: { id: string; status: string; update_time: string };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: Date;
}

export interface IOrderItem {
  product: ObjectId | IProduct;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IReview {
  _id: string;
  user: ObjectId | IUser;
  product: ObjectId | IProduct;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  createdAt: Date;
}

export interface ICartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ICart {
  items: ICartItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export const CATEGORIES = [
  'Electronics', 'Clothing', 'Home & Kitchen', 'Books',
  'Sports', 'Beauty', 'Toys', 'Automotive', 'Health', 'Grocery'
];

export const SORT_OPTIONS = [
  { label: 'Newest', value: '-createdAt' },
  { label: 'Price: Low to High', value: 'price' },
  { label: 'Price: High to Low', value: '-price' },
  { label: 'Best Rating', value: '-rating' },
  { label: 'Most Popular', value: '-numReviews' }
];

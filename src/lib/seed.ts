import { connectDB } from '../lib/db';
import User from '../models/User';
import Product from '../models/Product';
import Category from '../models/Category';
import bcrypt from 'bcryptjs';

const categories = [
  { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { name: 'Clothing', slug: 'clothing', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400' },
  { name: 'Home & Kitchen', slug: 'home-kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
  { name: 'Books', slug: 'books', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400' },
  { name: 'Sports', slug: 'sports', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400' },
  { name: 'Beauty', slug: 'beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' },
  { name: 'Toys & Games', slug: 'toys-games', image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?w=400' }
];

const products = [
  { name: 'Wireless Noise-Cancelling Headphones', slug: 'wireless-noise-cancelling-headphones', description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio.', price: 349.99, comparePrice: 399.99, brand: 'SoundMax', images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'], countInStock: 25, isFeatured: true, rating: 4.5, numReviews: 128, tags: ['audio', 'wireless', 'bluetooth'] },
  { name: 'Smart Watch Pro', slug: 'smart-watch-pro', description: 'Advanced fitness tracking, heart rate monitor, GPS, and 7-day battery life. Water resistant to 50m.', price: 249.99, comparePrice: 299.99, brand: 'TechWear', images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'], countInStock: 50, isFeatured: true, rating: 4.7, numReviews: 256, tags: ['wearable', 'fitness', 'smartwatch'] },
  { name: '4K Ultra HD Monitor', slug: '4k-ultra-hd-monitor', description: '27-inch 4K UHD monitor with HDR10, 144Hz refresh rate, and 1ms response time. Ideal for creators and gamers.', price: 499.99, brand: 'ViewPro', images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'], countInStock: 15, isFeatured: true, rating: 4.8, numReviews: 89, tags: ['monitor', '4k', 'gaming'] },
  { name: 'Ergonomic Office Chair', slug: 'ergonomic-office-chair', description: 'Adjustable lumbar support, mesh back, and memory foam seat cushion. Perfect for long work hours.', price: 399.99, comparePrice: 499.99, brand: 'ComfortPlus', images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600'], countInStock: 20, rating: 4.6, numReviews: 67, tags: ['office', 'ergonomic', 'furniture'] },
  { name: 'Premium Cotton T-Shirt', slug: 'premium-cotton-t-shirt', description: '100% organic cotton, pre-shrunk, and garment-dyed for a unique look. Available in 12 colors.', price: 39.99, brand: 'EcoWear', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'], countInStock: 200, rating: 4.3, numReviews: 312, tags: ['clothing', 'cotton', 'casual'] },
  { name: 'Stainless Steel Water Bottle', slug: 'stainless-steel-water-bottle', description: 'Double-wall vacuum insulated. Keeps drinks cold 24h or hot 12h. BPA-free, 32oz capacity.', price: 34.99, brand: 'EcoLife', images: ['https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600'], countInStock: 150, rating: 4.7, numReviews: 890, tags: ['eco', 'bottle', 'hydration'] },
  { name: 'Mechanical Keyboard RGB', slug: 'mechanical-keyboard-rgb', description: 'Cherry MX switches, per-key RGB, aluminum frame, and detachable USB-C cable.', price: 159.99, comparePrice: 189.99, brand: 'TypeMaster', images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600'], countInStock: 30, rating: 4.8, numReviews: 445, tags: ['keyboard', 'mechanical', 'gaming'] },
  { name: 'Portable Bluetooth Speaker', slug: 'portable-bluetooth-speaker', description: 'Waterproof IP67, 360-degree sound, 20-hour battery, and built-in microphone.', price: 79.99, brand: 'SoundWave', images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600'], countInStock: 40, isFeatured: true, rating: 4.4, numReviews: 567, tags: ['speaker', 'bluetooth', 'portable'] },
  { name: 'Leather Crossbody Bag', slug: 'leather-crossbody-bag', description: 'Genuine full-grain leather, adjustable strap, RFID blocking pocket. Handcrafted.', price: 129.99, brand: 'ArtisanLeather', images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600'], countInStock: 35, rating: 4.6, numReviews: 89, tags: ['bag', 'leather', 'fashion'] },
  { name: 'Yoga Mat Premium', slug: 'yoga-mat-premium', description: '6mm thick, non-slip, eco-friendly TPE material. Includes carrying strap.', price: 49.99, brand: 'ZenFit', images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600'], countInStock: 75, rating: 4.5, numReviews: 234, tags: ['yoga', 'fitness', 'eco'] }
];

async function seed() {
  await connectDB();
  console.log('Connected to MongoDB');

  await User.deleteMany({}); await Product.deleteMany({}); await Category.deleteMany({});
  console.log('Cleared existing data');

  const admin = await User.create({ name: 'Admin', email: 'admin@novamart.com', password: 'Admin123!', role: 'admin' });
  console.log('Admin created:', admin.email);

  const testUser = await User.create({ name: 'Test User', email: 'test@novamart.com', password: 'Test1234!' });
  console.log('Test user created:', testUser.email);

  const categoryDocs = await Category.insertMany(categories);
  console.log(`${categoryDocs.length} categories created`);

  const productData = products.map((p, i) => ({
    ...p,
    category: categoryDocs[i % categoryDocs.length]._id,
    specifications: [
      { key: 'Brand', value: p.brand },
      { key: 'Warranty', value: '1 Year' },
      { key: 'Condition', value: 'New' }
    ]
  }));

  await Product.insertMany(productData);
  console.log(`${productData.length} products created`);
  console.log('\nSeed complete!');
  console.log('Admin: admin@novamart.com / Admin123!');
  console.log('User: test@novamart.com / Test1234!');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });

# NovaMart - Premium E-Commerce Platform

Full-stack e-commerce platform built with **Next.js 14**, **React**, **TypeScript**, **Node.js**, **MongoDB**, **Stripe**, and **Tailwind CSS**.

## Features

- Product catalog with categories, search, and filtering
- Shopping cart with persistent localStorage
- Secure checkout with Stripe payment integration
- User authentication (email/password)
- Order management and tracking
- Admin dashboard with analytics
- Product reviews and ratings
- Wishlist functionality
- Responsive mobile-first design
- Dark mode ready

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes, Server Components |
| Database | MongoDB with Mongoose |
| Auth | JWT-based authentication |
| Payments | Stripe |
| Charts | Chart.js + react-chartjs-2 |
| Icons | React Icons |

## Quick Start

```bash
# Clone & install
cd NovaMart
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your MongoDB URI and Stripe keys

# Seed database
npm run seed

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Seed Data

The seed script creates:

- **Admin:** admin@novamart.com / Admin123!
- **Test User:** test@novamart.com / Test1234!
- **7 categories** (Electronics, Clothing, Home & Kitchen, Books, Sports, Beauty, Toys)
- **10 products** with images, prices, ratings, and stock

## Project Structure

```
NovaMart/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Home page
│   │   ├── products/           # Product listing & detail
│   │   ├── checkout/           # Checkout flow
│   │   ├── auth/               # Login & register
│   │   ├── account/            # User account
│   │   ├── orders/             # Order details
│   │   ├── admin/              # Admin dashboard
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── product/            # ProductCard
│   │   └── cart/               # CartDrawer
│   ├── lib/                    # Utilities, DB, Stripe, Auth
│   ├── models/                 # Mongoose models
│   └── types/                  # TypeScript types
├── public/
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Login |
| POST | /api/auth/register | Register |
| GET | /api/products | List products (paginated, filterable) |
| GET | /api/products/:id | Get product detail |
| POST | /api/checkout | Create order |
| POST | /api/checkout/stripe | Create payment intent |
| GET | /api/orders | List user orders |
| GET | /api/admin | Admin dashboard stats |
| POST | /api/reviews | Submit review |
| GET | /api/users/profile | Get profile |
| PUT | /api/users/profile | Update profile |
| POST | /api/webhooks/stripe | Stripe webhook |

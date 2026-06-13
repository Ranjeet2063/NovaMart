# NovaMart

Production-ready full-stack e-commerce platform using **Next.js 15 + React + TypeScript + Tailwind CSS** (frontend) and **Node.js + Express + MongoDB + JWT + Stripe** (backend).

## Features

- Modern responsive storefront
- Homepage: hero, featured products, categories, best sellers, testimonials, newsletter
- Product listing with search, filters, sorting, pagination
- Product details with reviews, ratings, related products, add to cart and buy now
- Shopping cart and checkout (Stripe-ready)
- User auth (register/login with JWT)
- User dashboard, wishlist, order tracking
- Contact, About, FAQ pages
- Admin dashboard: product/category/order/customer/review/sales analytics modules
- Dark mode, SEO metadata, image optimization
- Multi-language and currency switcher
- Inventory + invoice-ready order model

---

## Monorepo Structure

```bash
NovaMart/
├── frontend/                 # Next.js 15 storefront
│   ├── src/app/              # App Router pages
│   ├── src/components/       # Reusable UI components
│   ├── src/context/          # Global client state (cart/wishlist/theme/lang/currency)
│   └── src/lib/              # Shared frontend data/types
├── backend/                  # Express + TypeScript API
│   ├── src/config/           # Env + DB config
│   ├── src/controllers/      # Route handlers
│   ├── src/middleware/       # Auth/error middleware
│   ├── src/models/           # Mongoose schemas
│   ├── src/routes/           # REST routes
│   ├── src/services/         # Stripe/JWT helpers
│   └── src/utils/            # Async utilities
└── package.json              # Workspaces + top-level scripts
```

---

## Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Environment setup

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

### 3) Run in development

```bash
npm run dev
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

---

## Scripts

At repo root:

```bash
npm run dev      # run frontend + backend
npm run build    # build frontend and backend
npm run lint     # lint frontend
npm run test     # backend placeholder test script
```

---

## API Overview

Base URL: `/api`

### Auth
- `POST /auth/register`
- `POST /auth/login`

### Products
- `GET /products?search=&category=&sort=&page=&limit=`
- `GET /products/:slug`

### Orders
- `POST /orders/checkout` (JWT required, Stripe PaymentIntent)
- `GET /orders/my-orders` (JWT required)

### Admin
- `GET /admin/metrics` (JWT + admin role required)

---

## Core MongoDB Models

- **User**: profile, credentials, role, addresses, language/currency preferences
- **Category**: category metadata + slug
- **Product**: pricing, inventory, tags, featured/bestseller flags, reviews/ratings
- **Order**: items, shipping, payment status, order status, invoice number, totals
- **Wishlist**: user-saved product references

---

## Deployment Notes

### Frontend (Vercel)
- Set `NEXT_PUBLIC_API_URL`
- Build command: `npm run build --workspace frontend`

### Backend (Render/Railway/Fly.io)
- Set all variables from `backend/.env.example`
- Build command: `npm run build --workspace backend`
- Start command: `npm run start --workspace backend`

### Database & Payments
- Use managed MongoDB Atlas cluster
- Use Stripe live/test keys per environment
- Set CORS `FRONTEND_URL` to deployed frontend domain


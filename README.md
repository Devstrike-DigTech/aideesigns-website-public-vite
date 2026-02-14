# Aideesigns & Stitches - Public Website

Elegant, interactive public-facing website for Aideesigns & Stitches custom fashion brand.

## 🎨 Features

### ✅ Completed Features

- **Home Page** - Hero section, featured products, testimonials, about preview
- **Products** - Grid with filters, sorting, search, product detail modal
- **Shopping Cart** - Drawer with cart management, quantity controls
- **Checkout** - Full checkout flow with Paystack/Flutterwave integration
- **Custom Bookings** - Date picker, outfit details, image upload (Cloudinary)
- **Contact Page** - Contact form with business information
- **CMS Pages** - Dynamic pages (About, Privacy, Terms) from backend
- **Order Tracking** - Track orders by ID + phone/email
- **SEO Optimization** - Meta tags, Open Graph, Twitter Cards
- **Performance** - Code splitting, lazy loading, optimized images
- **Animations** - Framer Motion for smooth transitions
- **Mobile Responsive** - Works beautifully on all devices

### 🎯 Key Technologies

- **React 18** + TypeScript - Modern React with strict typing
- **Vite** - Lightning fast dev server and build tool
- **shadcn/ui** - Beautiful, accessible component library
- **Tailwind CSS** - Utility-first styling with custom brand colors
- **Framer Motion** - Smooth animations and transitions
- **TanStack Query** - Server state management with caching
- **Zustand** - Client state (shopping cart)
- **React Hook Form + Zod** - Form handling with validation
- **React Helmet Async** - SEO and meta tag management

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Extract the project**
   ```bash
   tar -xzf aideesigns-website-phase8.tar.gz
   cd aideesigns-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env`:
   ```bash
   VITE_API_URL=http://localhost:8089/api
   
   # Optional: For image uploads in bookings
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=aideesigns_bookings
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn components (Button, Card, Dialog, etc.)
│   ├── layout/          # Header, Footer, Layout
│   ├── home/            # Home page sections
│   ├── products/        # Product components
│   ├── cart/            # Cart drawer
│   ├── booking/         # Booking form components
│   ├── SEO.tsx          # SEO meta tags
│   ├── ScrollToTop.tsx  # Scroll to top button
│   ├── LoadingPage.tsx  # Loading screen
│   └── LazyLoad.tsx     # Code splitting helper
├── pages/               # Route pages
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── CheckoutPage.tsx
│   ├── BookingPage.tsx
│   ├── ContactPage.tsx
│   ├── TrackOrderPage.tsx
│   ├── CMSPage.tsx
│   └── NotFoundPage.tsx
├── services/            # API clients
├── hooks/               # React Query hooks
├── store/               # Zustand stores (cart)
├── types/               # TypeScript types
├── lib/                 # Utilities (api, utils)
├── App.tsx              # Main app with routing
└── main.tsx             # Entry point
```

## 🎨 Brand Colors

```css
--lavender: #B3A7C9      /* Primary accent */
--ash-grey: #B9CAA5      /* Secondary accent */
--graphite: #2B2B2B      /* Dark text/backgrounds */
--linen: #EDA9C9         /* Soft pink */
--pastel-petal: #FFCEC5  /* Light pink */
--white: #FFFFFF         /* White */
```

## 📚 Documentation

- **[CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md)** - Image upload configuration
- **[PERFORMANCE.md](./PERFORMANCE.md)** - Optimization guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[CMS_EXAMPLES_*.md](./CMS_EXAMPLES_ABOUT.md)** - Example CMS content

## 🛠 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 Routes

- `/` - Home page
- `/products` - Products listing
- `/checkout` - Checkout flow
- `/booking` - Custom booking form
- `/contact` - Contact page
- `/track-order` - Order tracking
- `/about` - About page (CMS)
- `/privacy` - Privacy policy (CMS)
- `/terms` - Terms of service (CMS)

## 🔌 Backend Integration

Connects to Spring Boot backend at:
- **Default**: `http://localhost:8089/api`
- **Production**: Configure in `.env`

### Required Backend Endpoints

- `GET /products` - Products list
- `GET /products/{id}` - Product details
- `POST /orders` - Create order
- `GET /orders/track/{id}` - Track order
- `POST /bookings` - Create booking
- `GET /slots` - Available production slots
- `GET /testimonials` - Approved testimonials
- `GET /content/{slug}` - CMS pages

## 🎯 Performance

Optimizations implemented:
- ✅ Code splitting by route
- ✅ Lazy loading for all pages
- ✅ Image lazy loading
- ✅ React Query caching (5 min)
- ✅ Optimized bundle size
- ✅ Tree shaking with Vite

**Target Lighthouse Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 🚢 Deployment

### Quick Deploy to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🐛 Troubleshooting

### Images not uploading in bookings
- Configure Cloudinary credentials in `.env`
- Or use URL input to paste image links

### Products not loading
- Check backend is running on port 8089
- Verify CORS configuration allows your frontend URL
- Check Network tab for API errors

### Checkout payment not working
- Verify Paystack/Flutterwave credentials in backend
- Check backend logs for payment gateway errors

## 📝 License

All rights reserved - Aideesigns & Stitches

## 🤝 Support

For support, email hello@aideesigns.com

---

Built with ❤️ using React + TypeScript + shadcn/ui

# aideesigns-website-public-vite

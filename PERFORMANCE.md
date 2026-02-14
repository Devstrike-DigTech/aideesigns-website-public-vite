# Performance Optimization Guide

## What's Been Optimized

### 1. Code Splitting & Lazy Loading
All pages are now lazy-loaded using React.lazy() and Suspense:
- HomePage
- ProductsPage
- CheckoutPage
- BookingPage
- ContactPage
- TrackOrderPage
- CMSPage
- NotFoundPage

**Benefits:**
- Smaller initial bundle size
- Faster first page load
- Pages load on-demand

### 2. SEO Optimization
Added react-helmet-async for managing meta tags:
- Dynamic page titles
- Meta descriptions
- Open Graph tags (Facebook sharing)
- Twitter Card tags
- Canonical URLs
- Keywords

**To use SEO component:**
```tsx
import { SEO } from '@/components/SEO'

<SEO 
  title="Products"
  description="Browse our collection"
  keywords="fashion, custom tailoring"
/>
```

### 3. Image Optimization Tips

**For Product Images:**
- Serve WebP format when possible
- Use responsive images with srcset
- Implement lazy loading with `loading="lazy"`
- Compress images before upload

**Example:**
```tsx
<img 
  src={image.url} 
  alt={product.name}
  loading="lazy"
  className="..."
/>
```

### 4. React Query Caching
Already configured with:
- 5 minute stale time
- Automatic background refetch
- Retry logic

### 5. Bundle Size Optimization
- Using Vite for tree-shaking
- Code splitting by route
- Only necessary dependencies

## Further Optimizations You Can Make

### 1. Image CDN
Use Cloudinary or imgix for automatic:
- Image optimization
- Format conversion (WebP/AVIF)
- Responsive sizing
- Lazy loading

### 2. API Response Caching
Add Cache-Control headers in backend:
```kotlin
@GetMapping("/products")
fun getProducts(): ResponseEntity<ApiResponse<List<Product>>> {
    return ResponseEntity.ok()
        .cacheControl(CacheControl.maxAge(1, TimeUnit.HOURS))
        .body(...)
}
```

### 3. Gzip/Brotli Compression
Enable in your hosting:
- Netlify: Automatic
- Vercel: Automatic
- Custom server: Configure nginx/apache

### 4. Preload Critical Resources
Add to index.html:
```html
<link rel="preconnect" href="https://api.cloudinary.com">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

### 5. Service Worker (PWA)
Add Vite PWA plugin for:
- Offline support
- Faster repeat visits
- App-like experience

### 6. Monitoring
Add analytics:
- Google Analytics 4
- Vercel Analytics
- Sentry for error tracking

## Build for Production

```bash
npm run build
```

Check bundle size:
```bash
npm run build -- --stats
```

Preview production build:
```bash
npm run preview
```

## Lighthouse Score Goals

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

Run audit:
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Fix issues

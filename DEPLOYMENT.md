# Deployment Guide

## Production Checklist

### 1. Environment Variables
Create `.env.production`:
```bash
VITE_API_URL=https://api.yourdomain.com/api
VITE_CLOUDINARY_CLOUD_NAME=your_production_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=aideesigns_bookings
```

### 2. Build Optimization
```bash
npm run build
```

This creates optimized production files in `dist/`

### 3. Test Production Build Locally
```bash
npm run preview
```

Visit http://localhost:4173 to test

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Automatic deployments from Git
- Free tier available

**Steps:**
1. Push code to GitHub
2. Go to vercel.com
3. Click "Import Project"
4. Select your repository
5. Add environment variables
6. Deploy!

**Custom Domain:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Option 2: Netlify

**Steps:**
1. Push code to GitHub
2. Go to netlify.com
3. Click "Add new site"
4. Connect to GitHub
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables
7. Deploy!

**Redirects for SPA:**
Create `public/_redirects`:
```
/*    /index.html   200
```

### Option 3: Traditional Hosting (cPanel/VPS)

**Steps:**
1. Build locally: `npm run build`
2. Upload `dist/` contents to server
3. Configure web server:

**Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/json application/javascript
</IfModule>
```

## SSL Certificate

### Free SSL with Let's Encrypt
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (already set up)
sudo certbot renew --dry-run
```

## Backend Configuration

Update CORS in backend:
```kotlin
.allowedOrigins("https://yourdomain.com", "https://www.yourdomain.com")
```

## Post-Deployment

### 1. Test Everything
- [ ] Home page loads
- [ ] Products page works
- [ ] Add to cart works
- [ ] Checkout flow works
- [ ] Booking submission works
- [ ] Contact form works
- [ ] Order tracking works
- [ ] CMS pages load

### 2. Set Up Monitoring
- [ ] Google Analytics
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring (UptimeRobot)

### 3. SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google My Business
- [ ] Add structured data (Schema.org)

### 4. Performance
- [ ] Run Lighthouse audit
- [ ] Test on mobile devices
- [ ] Check load time (<3 seconds)

### 5. Security
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CSP policy set
- [ ] Regular dependency updates

## Continuous Deployment

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Rollback Plan

If deployment fails:
1. Revert to previous Git commit
2. Redeploy
3. Or use platform rollback feature (Vercel/Netlify)

## Support

If you encounter issues:
1. Check browser console for errors
2. Check network tab for failed requests
3. Verify environment variables
4. Check API endpoint URLs
5. Review server logs

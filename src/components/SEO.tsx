import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  canonical?: string
}

const defaultSEO = {
  title: 'Aideesigns & Stitches - Custom Outfits Made Just for You',
  description: 'Premium custom tailoring and ready-to-wear fashion in Lagos, Nigeria. From wedding dresses to corporate wear, we create elegant outfits that tell your unique story.',
  keywords: 'custom tailoring, fashion designer Lagos, bespoke outfits Nigeria, wedding dress, traditional attire, corporate wear, custom clothing',
  ogImage: '/og-image.jpg',
  siteUrl: 'https://aideesigns.com',
}

export function SEO({ 
  title, 
  description, 
  keywords, 
  ogImage,
  canonical 
}: SEOProps) {
  const seoTitle = title ? `${title} | Aideesigns & Stitches` : defaultSEO.title
  const seoDescription = description || defaultSEO.description
  const seoKeywords = keywords || defaultSEO.keywords
  const seoImage = ogImage || defaultSEO.ogImage
  const seoCanonical = canonical || defaultSEO.siteUrl

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={seoCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoCanonical} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoCanonical} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoImage} />

      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="Aideesigns & Stitches" />
    </Helmet>
  )
}

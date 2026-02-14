import { Hero } from '@/components/home/Hero'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { AboutPreview } from '@/components/home/AboutPreview'
import { CTASection } from '@/components/home/CTASection'
import { SEO } from '@/components/SEO'

export default function HomePage() {
  return (
    <>
      <SEO/>
      <Hero />
      <FeaturedProducts />
      <AboutPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}

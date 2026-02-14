import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Scissors, Sparkles, Heart, ArrowRight } from 'lucide-react'

const features = [
  {
    icon: Scissors,
    title: 'Expert Craftsmanship',
    description: 'Every stitch is a testament to our dedication to perfection and quality.',
  },
  {
    icon: Sparkles,
    title: 'Custom Designs',
    description: 'Bring your vision to life with bespoke outfits tailored to your style.',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Each piece is crafted with passion, care, and attention to detail.',
  },
]

export function AboutPreview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 bg-brand-lavender/10 rounded-full mb-6">
              <span className="text-sm font-medium text-brand-graphite">
                About Aideesigns
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Where Style Meets Sophistication
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At Aideesigns & Stitches, we believe that fashion is more than 
              just clothing—it's an expression of identity, confidence, and grace. 
              With years of expertise in bespoke tailoring and ready-to-wear collections, 
              we craft outfits that celebrate your unique story.
            </p>

            {/* Features Grid */}
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-lavender/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-lavender" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More About Us
                </Button>
              </Link>
              <Link to="/booking">
                <Button size="lg" className="w-full sm:w-auto group">
                  Book Custom Outfit
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <div className="col-span-2 aspect-video bg-gradient-to-br from-brand-lavender/20 to-brand-pastel-petal/20 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Scissors className="w-16 h-16" />
                </div>
              </div>

              {/* Two Small Images */}
              <div className="aspect-square bg-gradient-to-br from-brand-linen/20 to-brand-lavender/20 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Sparkles className="w-12 h-12" />
                </div>
              </div>
              <div className="aspect-square bg-gradient-to-br from-brand-pastel-petal/20 to-brand-linen/20 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Heart className="w-12 h-12" />
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -top-8 -right-8 w-72 h-72 bg-brand-lavender/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

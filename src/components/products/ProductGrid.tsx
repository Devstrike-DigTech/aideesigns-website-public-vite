import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  onProductClick: (product: Product) => void
}

export function ProductGrid({ products, onProductClick }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          onClick={() => onProductClick(product)}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images.find((img) => img.isPrimary)
  const lowStock = product.sizes.some((size) => size.stockQuantity > 0 && size.stockQuantity < 5)

  return (
    <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-0">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {primaryImage ? (
          <img
            src={primaryImage.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-gray-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {lowStock && (
            <Badge variant="destructive" className="shadow-lg">
              Low Stock
            </Badge>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="text-white font-medium">View Details</span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-brand-lavender transition-colors line-clamp-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-brand-graphite">
            {formatCurrency(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            {product.sizes.length} size{product.sizes.length !== 1 ? 's' : ''}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

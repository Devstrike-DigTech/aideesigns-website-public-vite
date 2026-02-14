import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface ProductFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  sortBy: string
  onSortChange: (value: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (value: [number, number]) => void
}

export function ProductFilters({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
}: ProductFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg p-6 shadow-sm sticky top-24"
    >
      <h3 className="text-lg font-semibold mb-6">Filters</h3>

      {/* Search */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Sort By
        </label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Price Range
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
              className="w-full"
            />
            <span className="text-gray-500">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
          </div>
          <div className="text-xs text-gray-500">
            {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
          </div>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          onSearchChange('')
          onSortChange('name')
          onPriceRangeChange([0, 100000])
        }}
        className="text-sm text-brand-lavender hover:underline"
      >
        Reset Filters
      </button>
    </motion.div>
  )
}

import { useParams, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { usePage } from '@/hooks/useCMS'
import { Loader2 } from 'lucide-react'
import type { ContentBlock } from '@/types'

export default function CMSPage() {
  const { slug: paramSlug } = useParams<{ slug: string }>()
  const location = useLocation()
  
  // Extract slug from either route params or pathname
  const slug = paramSlug || location.pathname.replace('/', '')
  
  console.log('CMSPage - slug:', slug, 'pathname:', location.pathname)
  
  const { data: page, isLoading, error } = usePage(slug!)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-lavender" />
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            {page.title}
          </h1>

          {/* Content Blocks */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">
            {page.blocks.map((block) => (
              <ContentBlockRenderer key={block.id} block={block} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.blockType) {
    case 'text':
      return (
        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap leading-relaxed text-gray-700">
            {block.content}
          </div>
        </div>
      )

    case 'image':
      return block.imageUrl ? (
        <div className="my-8">
          <img
            src={block.imageUrl}
            alt={block.blockKey}
            className="w-full rounded-lg"
          />
        </div>
      ) : null

    case 'html':
      return block.content ? (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: block.content }}
        />
      ) : null

    default:
      return null
  }
}
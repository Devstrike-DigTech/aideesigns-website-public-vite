import { useState, useEffect, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [inputValue, setInputValue] = useState(value)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setInputValue(url)
    onChange(url)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB')
      return
    }

    setIsUploading(true)

    try {
      // Upload to Cloudinary
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'demo'
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'aideesigns_bookings'
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      const imageUrl = data.secure_url

      setInputValue(imageUrl)
      onChange(imageUrl)
      toast.success('Image uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const clearImage = () => {
    setInputValue('')
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {/* Upload Mode Toggle */}
      <div className="flex gap-2 border-b">
        <button
          type="button"
          onClick={() => setUploadMode('file')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            uploadMode === 'file'
              ? 'border-b-2 border-brand-lavender text-brand-graphite'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setUploadMode('url')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            uploadMode === 'url'
              ? 'border-b-2 border-brand-lavender text-brand-graphite'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Image URL
        </button>
      </div>

      {/* File Upload */}
      {uploadMode === 'file' && (
        <div>
          <Label htmlFor="fileUpload">Upload Inspiration Image</Label>
          <div className="mt-2">
            <input
              ref={fileInputRef}
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Image
                </>
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-1">
              Supported: JPG, PNG, GIF (Max 5MB)
            </p>
          </div>
        </div>
      )}

      {/* URL Input */}
      {uploadMode === 'url' && (
        <div>
          <Label htmlFor="imageUrl">Inspiration Image URL</Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Paste an image URL from any website
          </p>
        </div>
      )}

      {/* Clear Button */}
      {inputValue && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearImage}
          className="w-full"
        >
          <X className="mr-2 h-4 w-4" />
          Clear Image
        </Button>
      )}

      {/* Preview */}
      {inputValue && (
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border">
          <img
            src={inputValue}
            alt="Inspiration preview"
            className="w-full h-full object-cover"
            onError={() => {
              toast.error('Failed to load image')
              setInputValue('')
              onChange('')
            }}
          />
        </div>
      )}

      {/* Upload Placeholder */}
      {!inputValue && !isUploading && (
        <div className="aspect-video bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
          <ImageIcon className="w-12 h-12 mb-2" />
          <p className="text-sm">No image yet</p>
          <p className="text-xs mt-1">Upload a file or paste a URL</p>
        </div>
      )}
    </div>
  )
}
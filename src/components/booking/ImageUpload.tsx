// import { useState } from 'react'
// import { Upload, X, Image as ImageIcon } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Button } from '@/components/ui/button'

// interface ImageUploadProps {
//   value: string
//   onChange: (url: string) => void
// }

// export function ImageUpload({ value, onChange }: ImageUploadProps) {
//   const [previewUrl, setPreviewUrl] = useState(value)

//   const handleUrlChange = (url: string) => {
//     setPreviewUrl(url)
//     onChange(url)
//   }

//   const clearImage = () => {
//     setPreviewUrl('')
//     onChange('')
//   }

//   return (
//     <div className="space-y-4">
//       <div>
//         <Label htmlFor="imageUrl">Inspiration Image URL</Label>
//         <div className="flex gap-2 mt-2">
//           <Input
//             id="imageUrl"
//             type="url"
//             placeholder="https://example.com/image.jpg"
//             value={previewUrl}
//             onChange={(e) => handleUrlChange(e.target.value)}
//           />
//           {previewUrl && (
//             <Button
//               type="button"
//               variant="ghost"
//               size="icon"
//               onClick={clearImage}
//             >
//               <X className="h-4 w-4" />
//             </Button>
//           )}
//         </div>
//         <p className="text-xs text-gray-500 mt-1">
//           Paste an image URL or upload to a service like Imgur
//         </p>
//       </div>

//       {/* Preview */}
//       {previewUrl && (
//         <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border">
//           <img
//             src={previewUrl}
//             alt="Inspiration preview"
//             className="w-full h-full object-cover"
//             onError={() => {
//               setPreviewUrl('')
//               onChange('')
//             }}
//           />
//         </div>
//       )}

//       {/* Upload Placeholder */}
//       {!previewUrl && (
//         <div className="aspect-video bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400">
//           <ImageIcon className="w-12 h-12 mb-2" />
//           <p className="text-sm">No image yet</p>
//         </div>
//       )}
//     </div>
//   )
// }

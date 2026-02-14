import { api } from '@/lib/api'
import type { ApiResponse, Product, Testimonial } from '@/types'

export const productsService = {
  getAll: () => api.get<ApiResponse<Product[]>>('/products'),
  getById: (id: string) => api.get<ApiResponse<Product>>(`/products/${id}`),
}

export const testimonialsService = {
  getApproved: () => api.get<ApiResponse<Testimonial[]>>('/testimonials'),
}
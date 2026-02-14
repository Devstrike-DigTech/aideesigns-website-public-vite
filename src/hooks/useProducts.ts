import { useQuery } from '@tanstack/react-query'
import { productsService, testimonialsService } from '@/services/productsService'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productsService.getAll()
      return response.data.data
    },
  })
}

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await productsService.getById(id)
      return response.data.data
    },
    enabled: !!id,
  })
}

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await testimonialsService.getApproved()
      return response.data.data
    },
  })
}
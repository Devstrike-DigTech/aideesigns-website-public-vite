import { useQuery } from '@tanstack/react-query'
import { cmsService } from '@/services/cmsService'

export const usePage = (slug: string) => {
  return useQuery({
    queryKey: ['cms', 'page', slug],
    queryFn: async () => {
      const response = await cmsService.getPageBySlug(slug)
      return response.data.data
    },
    enabled: !!slug,
  })
}

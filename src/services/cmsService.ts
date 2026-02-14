import { api } from '@/lib/api'
import type { ApiResponse, ContentPage } from '@/types'

export const cmsService = {
  getPageBySlug: (slug: string) =>
    api.get<ApiResponse<ContentPage>>(`/content/${slug}`),
}

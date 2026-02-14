import { api } from '@/lib/api'
import type { ApiResponse, ProductionSlot } from '@/types'

interface CreateBookingRequest {
  customerName: string
  phone: string
  email?: string
  outfitType: string
  inspirationImageUrl?: string
  notes?: string
  preferredDate: string
}

export const bookingsService = {
  create: (data: CreateBookingRequest) =>
    api.post<ApiResponse<any>>('/bookings', data),
  
  getAvailableSlots: (from: string, to: string) =>
    api.get<ApiResponse<ProductionSlot[]>>('/slots', { params: { from, to } }),
}

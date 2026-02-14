import { api } from '@/lib/api'
import type { ApiResponse } from '@/types'

interface CreateOrderRequest {
  customerName: string
  phone: string
  email?: string
  items: Array<{
    productId: string
    sizeLabel: string
    quantity: number
    unitPrice: number
  }>
  deliveryAddress: {
    addressLine: string
    city: string
    state: string
    contactPhone: string
  }
  gateway: 'PAYSTACK' | 'FLUTTERWAVE'
}

interface CreateOrderResponse {
  orderId: string
  paymentAuthorizationUrl: string
}

export const ordersService = {
  create: (data: CreateOrderRequest) =>
    api.post<ApiResponse<CreateOrderResponse>>('/orders', data),
  
  track: (orderId: string, phone: string, email?: string) =>
    api.get<ApiResponse<any>>(`/orders/track/${orderId}`, {
      params: { phone, email },
    }),
}

import { useMutation } from '@tanstack/react-query'
import { ordersService } from '@/services/ordersService'
import { toast } from 'sonner'

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: ordersService.create,
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create order')
    },
  })
}

export const useTrackOrder = () => {
  return useMutation({
    mutationFn: ({ orderId, phone, email }: { orderId: string; phone: string; email?: string }) =>
      ordersService.track(orderId, phone, email),
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Order not found')
    },
  })
}

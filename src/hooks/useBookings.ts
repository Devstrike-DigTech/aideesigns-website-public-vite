import { useQuery, useMutation } from '@tanstack/react-query'
import { bookingsService } from '@/services/bookingsService'
import { toast } from 'sonner'

export const useAvailableSlots = (from: string, to: string) => {
  return useQuery({
    queryKey: ['slots', from, to],
    queryFn: async () => {
      const response = await bookingsService.getAvailableSlots(from, to)
      return response.data.data
    },
    enabled: !!from && !!to,
  })
}

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: bookingsService.create,
    onSuccess: () => {
      toast.success('Booking submitted successfully! We will contact you soon.')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create booking')
    },
  })
}

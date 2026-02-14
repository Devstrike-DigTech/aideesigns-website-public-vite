import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { format, startOfMonth, endOfMonth, addMonths, parseISO } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { ImageUpload } from '@/components/booking/ImageUploadEnhanced'
import { useAvailableSlots, useCreateBooking } from '@/hooks/useBookings'
import { Calendar as CalendarIcon, Loader2, Scissors, CheckCircle } from 'lucide-react'

const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  outfitType: z.string().min(3, 'Please describe the outfit type'),
  notes: z.string().optional(),
  inspirationImageUrl: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

const OUTFIT_TYPES = [
  'Wedding Dress',
  'Groom Suit',
  'Bridesmaid Dress',
  'Evening Gown',
  'Traditional Outfit',
  'Corporate Wear',
  'Casual Wear',
  'Custom Design',
]

export default function BookingPage() {
  const navigate = useNavigate()
  const createBooking = useCreateBooking()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  // Fetch available slots for next 3 months
  const today = new Date()
  const from = format(startOfMonth(today), 'yyyy-MM-dd')
  const to = format(endOfMonth(addMonths(today, 3)), 'yyyy-MM-dd')
  const { data: slots, isLoading: slotsLoading } = useAvailableSlots(from, to)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const inspirationImageUrl = watch('inspirationImageUrl')

  // Convert slots to available dates
  const availableDates = slots
    ?.filter((slot) => slot.isAvailable && !slot.isClosed && slot.remainingCapacity > 0)
    .map((slot) => {
      // Parse the date string correctly
      const date = new Date(slot.productionDate)
      // Reset time to midnight to ensure proper comparison
      date.setHours(0, 0, 0, 0)
      return date
    }) || []

  console.log('Available slots:', slots)
  console.log('Filtered available dates:', availableDates)

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate) {
      alert('Please select a production date')
      return
    }

    try {
      await createBooking.mutateAsync({
        ...data,
        email: data.email || undefined,
        preferredDate: format(selectedDate, 'yyyy-MM-dd'),
      })
      setShowSuccess(true)
    } catch (error) {
      console.error('Booking error:', error)
    }
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Booking Submitted!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for your booking request. We'll review your details and contact you within 24 hours to confirm your appointment.
          </p>
          <div className="space-y-3">
            <Button onClick={() => navigate('/')} className="w-full">
              Back to Home
            </Button>
            <Button onClick={() => navigate('/products')} variant="outline" className="w-full">
              Browse Products
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-brand-lavender/10 px-4 py-2 rounded-full mb-6">
            <Scissors className="w-4 h-4 text-brand-lavender" />
            <span className="text-sm font-medium text-brand-graphite">
              Custom Outfit Booking
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create Your Perfect Outfit
          </h1>
          <p className="text-lg text-gray-600">
            Share your vision with us and let our expert tailors bring your dream outfit to life
          </p>
        </motion.div>

        {/* Booking Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="customerName">Full Name *</Label>
                      <Input
                        id="customerName"
                        {...register('customerName')}
                        placeholder="John Doe"
                      />
                      {errors.customerName && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.customerName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          {...register('phone')}
                          placeholder="+234 xxx xxx xxxx"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Outfit Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Outfit Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="outfitType">Outfit Type *</Label>
                      <select
                        id="outfitType"
                        {...register('outfitType')}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      >
                        <option value="">Select outfit type</option>
                        {OUTFIT_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.outfitType && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.outfitType.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        {...register('notes')}
                        placeholder="Tell us about your vision, preferred colors, styles, measurements, etc."
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Inspiration Image */}
                <Card>
                  <CardHeader>
                    <CardTitle>Inspiration Image (Optional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ImageUpload
                      value={inspirationImageUrl || ''}
                      onChange={(url) => setValue('inspirationImageUrl', url)}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Calendar */}
              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Select Production Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {slotsLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-brand-lavender" />
                      </div>
                    ) : (
                      <>
                        <Calendar
                          selectedDate={selectedDate}
                          onSelect={setSelectedDate}
                          availableDates={availableDates}
                        />
                        {selectedDate && (
                          <div className="mt-4 p-3 bg-brand-lavender/10 rounded-lg">
                            <p className="text-sm font-medium text-brand-graphite">
                              Selected: {format(selectedDate, 'MMMM dd, yyyy')}
                            </p>
                          </div>
                        )}
                        {availableDates.length === 0 && (
                          <p className="text-sm text-gray-500 mt-4 text-center">
                            No available dates in the next 3 months. Please contact us directly.
                          </p>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                size="lg"
                className="min-w-[300px]"
                disabled={createBooking.isPending || !selectedDate}
              >
                {createBooking.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Booking Request'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
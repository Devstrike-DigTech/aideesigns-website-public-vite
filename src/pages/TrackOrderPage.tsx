import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Search, MapPin, Calendar, CheckCircle, Clock, Truck, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTrackOrder } from '@/hooks/useOrders'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import type { Order, PaymentStatus, FulfillmentStatus } from '@/types'

const trackingSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
})

type TrackingFormData = z.infer<typeof trackingSchema>

const paymentStatusConfig: Record<PaymentStatus, { label: string; color: string; icon: any }> = {
  PENDING: { label: 'Pending Payment', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
  PAID: { label: 'Paid', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
  FAILED: { label: 'Payment Failed', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
  REFUNDED: { label: 'Refunded', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Package },
}

const fulfillmentStatusConfig: Record<FulfillmentStatus, { label: string; color: string; icon: any }> = {
  PENDING: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
  CONFIRMED: { label: 'Confirmed', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle },
  PROCESSING: { label: 'Processing', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: Package },
  SHIPPED: { label: 'Shipped', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: Truck },
  DELIVERED: { label: 'Delivered', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
}

export default function TrackOrderPage() {
  const [order, setOrder] = useState<Order | null>(null)
  const trackOrder = useTrackOrder()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackingFormData>({
    resolver: zodResolver(trackingSchema),
  })

  const onSubmit = async (data: TrackingFormData) => {
    try {
      const response = await trackOrder.mutateAsync({
        orderId: data.orderId,
        phone: data.phone,
        email: data.email || undefined,
      })
      setOrder(response.data.data)
    } catch (error) {
      setOrder(null)
    }
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
            <Package className="w-4 h-4 text-brand-lavender" />
            <span className="text-sm font-medium text-brand-graphite">
              Order Tracking
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600">
            Enter your order details to see the current status of your order
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Enter Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="orderId">Order ID *</Label>
                    <Input
                      id="orderId"
                      {...register('orderId')}
                      placeholder="e.g., 550e8400-e29b-41d4-a716-446655440000"
                    />
                    {errors.orderId && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.orderId.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      You can find this in your order confirmation email
                    </p>
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
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={trackOrder.isPending}
                  >
                    {trackOrder.isPending ? (
                      'Searching...'
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Track Order
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Details */}
          <AnimatePresence>
            {order && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="mt-8 space-y-6"
              >
                {/* Status Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Payment Status</p>
                        <StatusBadge
                          status={order.paymentStatus}
                          config={paymentStatusConfig}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Fulfillment Status</p>
                        <StatusBadge
                          status={order.fulfillmentStatus}
                          config={fulfillmentStatusConfig}
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Order Total</span>
                        <span className="text-2xl font-bold text-brand-graphite">
                          {formatCurrency(order.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-3 border-b last:border-0"
                        >
                          <div className="flex-1">
                            <p className="font-medium">Product ID: {item.productId.slice(0, 8)}...</p>
                            <p className="text-sm text-gray-600">
                              Size: {item.sizeLabel} × {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(item.subtotal)}</p>
                            <p className="text-sm text-gray-600">
                              {formatCurrency(item.unitPrice)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                {order.deliveryAddress && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Delivery Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-gray-700">
                        <p>{order.deliveryAddress.addressLine}</p>
                        <p>{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
                        <p className="text-sm text-gray-600">
                          Contact: {order.deliveryAddress.contactPhone}
                        </p>
                        <div className="pt-3 border-t mt-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Fee</span>
                            <span className="font-medium">
                              {formatCurrency(order.deliveryAddress.deliveryFee)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Order Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Order Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID</span>
                      <span className="font-mono text-sm">{order.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer Name</span>
                      <span className="font-medium">{order.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone</span>
                      <span className="font-medium">{order.phone}</span>
                    </div>
                    {order.email && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email</span>
                        <span className="font-medium">{order.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date</span>
                      <span className="font-medium">
                        {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({
  status,
  config,
}: {
  status: string
  config: Record<string, { label: string; color: string; icon: any }>
}) {
  const statusConfig = config[status as keyof typeof config]
  if (!statusConfig) return null

  const Icon = statusConfig.icon

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${statusConfig.color}`}>
      <Icon className="h-4 w-4" />
      <span className="font-medium">{statusConfig.label}</span>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/store/cartStore'
import { useCreateOrder } from '@/hooks/useOrders'
import { formatCurrency } from '@/lib/utils'
import { ShoppingBag, MapPin, CreditCard, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  addressLine: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  contactPhone: z.string().min(10, 'Contact phone is required'),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

const NIGERIAN_STATES = [
  'Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Enugu', 'Anambra', 
  'Delta', 'Ogun', 'Edo', 'Kwara', 'Imo', 'Akwa Ibom', 'Abia'
]

const DELIVERY_FEES: Record<string, number> = {
  Lagos: 2000,
  Abuja: 3500,
  default: 5000,
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const createOrder = useCreateOrder()
  const [selectedGateway, setSelectedGateway] = useState<'PAYSTACK' | 'FLUTTERWAVE'>('PAYSTACK')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const selectedState = watch('state')
  const deliveryFee = DELIVERY_FEES[selectedState] || DELIVERY_FEES.default
  const subtotal = getTotalPrice()
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to checkout</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const orderData = {
        customerName: data.customerName,
        phone: data.phone,
        email: data.email || undefined,
        items: items.map((item) => ({
          productId: item.product.id,
          sizeLabel: item.size.sizeLabel,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
        deliveryAddress: {
          addressLine: data.addressLine,
          city: data.city,
          state: data.state,
          contactPhone: data.contactPhone,
        },
        gateway: selectedGateway,
      }

      const response = await createOrder.mutateAsync(orderData)
      
      // Redirect to payment
      if (response.data.data.paymentAuthorizationUrl) {
        clearCart()
        window.location.href = response.data.data.paymentAuthorizationUrl
      }
    } catch (error) {
      console.error('Checkout error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5" />
                      Customer Information
                    </CardTitle>
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

                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="addressLine">Street Address *</Label>
                      <Textarea
                        id="addressLine"
                        {...register('addressLine')}
                        placeholder="123 Main Street, Apartment 4"
                        rows={3}
                      />
                      {errors.addressLine && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.addressLine.message}
                        </p>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          {...register('city')}
                          placeholder="Ikeja"
                        />
                        {errors.city && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="state">State *</Label>
                        <select
                          id="state"
                          {...register('state')}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        >
                          <option value="">Select State</option>
                          {NIGERIAN_STATES.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                        {errors.state && (
                          <p className="text-sm text-red-600 mt-1">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="contactPhone">Contact Phone *</Label>
                      <Input
                        id="contactPhone"
                        {...register('contactPhone')}
                        placeholder="+234 xxx xxx xxxx"
                      />
                      {errors.contactPhone && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.contactPhone.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedGateway('PAYSTACK')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          selectedGateway === 'PAYSTACK'
                            ? 'border-brand-lavender bg-brand-lavender/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-semibold mb-1">Paystack</div>
                          <div className="text-xs text-gray-600">
                            Card, Bank Transfer, USSD
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedGateway('FLUTTERWAVE')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          selectedGateway === 'FLUTTERWAVE'
                            ? 'border-brand-lavender bg-brand-lavender/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-semibold mb-1">Flutterwave</div>
                          <div className="text-xs text-gray-600">
                            Card, Bank Transfer, Mobile Money
                          </div>
                        </div>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={createOrder.isPending}
                >
                  {createOrder.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${formatCurrency(total)}`
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.size.id}`} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-gray-600">
                            {item.size.sizeLabel} × {item.quantity}
                          </div>
                        </div>
                        <div className="font-medium">
                          {formatCurrency(item.product.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery ({selectedState || 'Select state'})</span>
                      <span>{formatCurrency(deliveryFee)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-brand-graphite">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

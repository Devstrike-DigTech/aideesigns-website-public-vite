// Products
export interface Product {
  id: string
  name: string
  description?: string
  price: number
  isAvailable: boolean
  sizes: ProductSize[]
  images: ProductImage[]
}

export interface ProductSize {
  id: string
  sizeLabel: string
  stockQuantity: number
}

export interface ProductImage {
  id: string
  imageUrl: string
  isPrimary: boolean
}

// Cart
export interface CartItem {
  product: Product
  size: ProductSize
  quantity: number
}

// Orders
export interface Order {
  id: string
  customerName: string
  phone: string
  email?: string
  totalAmount: number
  paymentStatus: PaymentStatus
  fulfillmentStatus: FulfillmentStatus
  items: OrderItem[]
  deliveryAddress?: DeliveryAddress
  payment?: Payment
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  sizeLabel: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface DeliveryAddress {
  addressLine: string
  city: string
  state: string
  deliveryFee: number
  contactPhone: string
}

export interface Payment {
  id: string
  gateway: string
  gatewayReference?: string
  amount: number
  status: PaymentStatus
  paidAt?: string
  createdAt: string
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum FulfillmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

// Bookings
export interface Booking {
  id: string
  customerName: string
  phone: string
  email?: string
  outfitType: string
  inspirationImageUrl?: string
  notes?: string
  status: string
  productionDate?: string
  createdAt: string
}

export interface ProductionSlot {
  id: string
  productionDate: string
  maxCapacity: number
  bookedCount: number
  remainingCapacity: number
  isClosed: boolean
  isAvailable: boolean
}

// Testimonials
export interface Testimonial {
  id: string
  customerName: string
  message: string
  rating?: number
  isApproved: boolean
  createdAt: string
}

// CMS
export interface ContentPage {
  id: string
  slug: string
  title: string
  blocks: ContentBlock[]
  updatedAt: string
}

export interface ContentBlock {
  id: string
  blockKey: string
  blockType: string
  content?: string
  imageUrl?: string
  updatedAt: string
}

// API Response
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

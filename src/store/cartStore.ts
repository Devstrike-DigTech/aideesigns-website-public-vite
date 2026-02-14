import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, ProductSize } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, size: ProductSize, quantity: number) => void
  removeItem: (productId: string, sizeId: string) => void
  updateQuantity: (productId: string, sizeId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, quantity) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id && item.size.id === size.id
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && item.size.id === size.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }

          return {
            items: [...state.items, { product, size, quantity }],
          }
        })
      },

      removeItem: (productId, sizeId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.size.id === sizeId)
          ),
        }))
      },

      updateQuantity: (productId, sizeId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, sizeId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.size.id === sizeId
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Layout } from './components/layout/Layout'

// Pages - placeholders for now
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CheckoutPage from './pages/CheckoutPage'
import BookingPage from './pages/BookingPage'
import ContactPage from './pages/ContactPage'
import CMSPage from './pages/CMSPage'
import TrackOrderPage from './pages/TrackOrderPage'
import NotFoundPage from './pages/NotFoundPage'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
})

function App() {
  return (
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="track-order" element={<TrackOrderPage />} />
            <Route path="about" element={<CMSPage />} />
            <Route path="privacy" element={<CMSPage />} />
            <Route path="terms" element={<CMSPage />} />
            <Route path=":slug" element={<CMSPage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* More routes will be added in upcoming phases */}
          </Route>
        </Routes>
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App

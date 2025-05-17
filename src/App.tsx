import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import OrdersPage from './pages/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import CheckoutPage from './pages/CheckoutPage'
import { CartProvider } from './context/CartContext'
import { OrdersProvider } from './context/OrdersContext'

const App: React.FC = () => {
  return (
    <CartProvider>
      <OrdersProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/tracking/:orderId" element={<TrackingPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <footer className="border-t">
            <div className="container mx-auto px-4 py-6">
              <p className="text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Pressing App. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </OrdersProvider>
    </CartProvider>
  )
}

export default App 
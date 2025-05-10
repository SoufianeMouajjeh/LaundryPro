import * as React from 'react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { ShoppingBag, MapPin, CreditCard } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [error, setError] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Prepare order object
    const order = {
      date: new Date().toISOString(),
      status: 'pending',
      items: items.map(item => ({
        itemId: item.itemId,
        name: item.name,
        price: item.price,
        unit: item.unit,
        quantity: item.quantity || 1,
      })),
      total,
      customerInfo: {
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: '', // Add if you have it in your form
        zipCode: '', // Add if you have it in your form
      }
    };

    try {
      const backendUrl = 'https://rp9hwiqc7wmq.manus.space';
      const response = await fetch(`${backendUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Get the saved order from backend response and add to context
      const savedOrder = await response.json();
      addOrder(savedOrder);

      clearCart();
      navigate('/orders');
    } catch (e: any) {
      setError('Failed to place order: ' + e.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-dashed transition-all duration-200 hover:shadow-lg">
            <CardContent className="pt-6">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-primary" />
              <h2 className="text-2xl font-semibold mb-2 transition-colors duration-200 hover:text-primary">Your LaundryPro Cart is Empty</h2>
              <p className="text-muted-foreground mb-6 transition-colors duration-200 hover:text-primary/70">
                Add some items to your cart before proceeding to checkout with LaundryPro.
              </p>
              <Button
                onClick={() => navigate('/services')}
                className="w-full transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
              >
                Browse Services
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">LaundryPro Checkout</h1>
          <Button
            variant="outline"
            onClick={() => navigate('/cart')}
            className="w-full transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/20 hover:scale-105 active:scale-95"
          >
            Back to Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="transition-all duration-200 hover:shadow-md group">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 transition-colors duration-200 group-hover:text-primary">
                  <MapPin className="h-5 w-5" />
                  Delivery Information
                </CardTitle>
                <CardDescription>
                  Please provide your contact and delivery details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 hover:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 hover:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 hover:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="address" className="text-sm font-medium">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 hover:border-primary/50"
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div>
                    <CardTitle className="flex items-center gap-2 mb-4">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="cardNumber" className="text-sm font-medium">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 hover:border-primary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="expiryDate" className="text-sm font-medium">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 hover:border-primary/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="cvv" className="text-sm font-medium">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          placeholder="123"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 hover:border-primary/50"
                        />
                      </div>
                    </div>
                  </div>
                  {error && (
                    <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                  >
                    Place Order
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.itemId} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md"
                >
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;


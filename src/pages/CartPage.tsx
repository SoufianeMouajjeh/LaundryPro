import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (itemId: string, change: number) => {
    const currentItem = items.find(item => item.itemId === itemId);
    if (currentItem && currentItem.quantity !== undefined) {
      const newQuantity = Math.max(1, currentItem.quantity + change);
      updateQuantity(itemId, newQuantity);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity ?? 0)), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-dashed transition-all duration-200 hover:shadow-lg hover:border-primary/20">
            <CardContent className="pt-6">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-primary" />
              <h2 className="text-2xl font-semibold mb-2 transition-colors duration-200 hover:text-primary">Your LaundryPro Cart is Empty</h2>
              <p className="text-muted-foreground mb-6 transition-colors duration-200 hover:text-primary/70">
                Add some items to your cart to get started with LaundryPro's premium services.
              </p>
              <Button
                onClick={() => navigate('/services')}
                className="w-full transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md hover:bg-primary/90"
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">LaundryPro Cart</h1>
          <Button
            variant="outline"
            onClick={() => navigate('/services')}
            className="gap-2 transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/20 hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.itemId} className="transition-all duration-200 hover:shadow-md group hover:border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg transition-colors duration-200 group-hover:text-primary">{item.name}</h3>
                      <p className="text-sm text-muted-foreground transition-colors duration-200 group-hover:text-primary/70">
                        ${item.price.toFixed(2)} / {item.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.itemId, -1)}
                          className="h-8 w-8 transition-all duration-200 hover:bg-primary hover:text-white hover:scale-110 active:scale-95"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium transition-colors duration-200 group-hover:text-primary">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.itemId, 1)}
                          className="h-8 w-8 transition-all duration-200 hover:bg-primary hover:text-white hover:scale-110 active:scale-95"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.itemId)}
                        className="h-8 w-8 text-red-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:scale-110 active:scale-95"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="transition-all duration-200 hover:shadow-md hover:border-primary/20">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm transition-colors duration-200 hover:text-primary/70">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm transition-colors duration-200 hover:text-primary/70">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="transition-colors duration-200 hover:bg-primary/20" />
                  <div className="flex justify-between font-semibold transition-colors duration-200 hover:text-primary">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-md hover:bg-primary/90"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 hover:scale-105 active:scale-95"
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


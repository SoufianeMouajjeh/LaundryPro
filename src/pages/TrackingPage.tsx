import * as React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Input } from '../components/ui/input';
import { Package, Truck, CheckCircle, Clock, ArrowLeft, Search } from 'lucide-react';

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
}

const TrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState(orderId || '');

  const order = orders.find(o => o.id === trackingId);

  const getTrackingSteps = (status: string): TrackingStep[] => {
    const steps: TrackingStep[] = [
      {
        id: 'order-placed',
        title: 'Order Placed',
        description: 'Your order has been received',
        icon: <Package className="h-5 w-5" />,
        status: 'completed'
      },
      {
        id: 'processing',
        title: 'Processing',
        description: 'Your items are being prepared',
        icon: <Clock className="h-5 w-5" />,
        status: status === 'processing' ? 'current' : status === 'completed' ? 'completed' : 'upcoming'
      },
      {
        id: 'in-transit',
        title: 'In Transit',
        description: 'Your order is on the way',
        icon: <Truck className="h-5 w-5" />,
        status: status === 'in-transit' ? 'current' : status === 'completed' ? 'completed' : 'upcoming'
      },
      {
        id: 'delivered',
        title: 'Delivered',
        description: 'Order has been delivered',
        icon: <CheckCircle className="h-5 w-5" />,
        status: status === 'completed' ? 'completed' : 'upcoming'
      }
    ];

    return steps;
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId) {
      navigate(`/tracking/${trackingId}`);
    }
  };

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
              <CardDescription>
                Enter your order ID to track your laundry order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter Order ID"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="gap-2">
                    <Search className="h-4 w-4" />
                    Track
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const trackingSteps = getTrackingSteps(order.status);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Track Order #{order.id}</h1>
          <Button
            variant="outline"
            onClick={() => navigate('/orders')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <CardDescription>
                  Last updated: {new Date(order.date).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {trackingSteps.map((step, index) => (
                    <div key={step.id} className="relative">
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`absolute left-4 top-8 w-0.5 h-16 ${
                            step.status === 'completed'
                              ? 'bg-primary'
                              : 'bg-muted'
                          }`}
                        />
                      )}
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            step.status === 'completed'
                              ? 'bg-primary text-primary-foreground'
                              : step.status === 'current'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {step.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{step.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.itemId} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${(order.total / 1.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>${(order.total - order.total / 1.1).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage; 
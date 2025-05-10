import * as React from 'react';
import { useEffect } from 'react';
import { useOrders } from '../context/OrdersContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

// Sample images for different item types
const itemImages: { [key: string]: string } = {
  'Regular Clothing': 'https://placehold.co/200x200/2563eb/ffffff?text=Regular+Clothing',
  'Delicate Items': 'https://placehold.co/200x200/7c3aed/ffffff?text=Delicate+Items',
  'Suits': 'https://placehold.co/200x200/059669/ffffff?text=Suits',
  'Dresses': 'https://placehold.co/200x200/dc2626/ffffff?text=Dresses',
  'Silk Blouses': 'https://placehold.co/200x200/ea580c/ffffff?text=Silk+Blouses',
  'Wool Sweaters': 'https://placehold.co/200x200/4f46e5/ffffff?text=Wool+Sweaters',
  'Leather Jackets': 'https://placehold.co/200x200/1e293b/ffffff?text=Leather+Jackets',
  'Wedding Dresses': 'https://placehold.co/200x200/be185d/ffffff?text=Wedding+Dresses',
  'Fur Coats': 'https://placehold.co/200x200/831843/ffffff?text=Fur+Coats',
  'Cashmere Items': 'https://placehold.co/200x200/9f1239/ffffff?text=Cashmere',
  'Vintage Clothing': 'https://placehold.co/200x200/854d0e/ffffff?text=Vintage',
  'Handmade Items': 'https://placehold.co/200x200/166534/ffffff?text=Handmade',
  'Embellished Garments': 'https://placehold.co/200x200/be123c/ffffff?text=Embellished',
  'Lace Items': 'https://placehold.co/200x200/be185d/ffffff?text=Lace',
  'default': 'https://placehold.co/200x200/6b7280/ffffff?text=Item'
};

const OrdersPage: React.FC = () => {
  const { orders, setOrders } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const backendUrl = 'https://rp9hwiqc7wmq.manus.space';
        const response = await fetch(`${backendUrl}/api/orders`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (e) {
        // Optionally handle error
      }
    };
    fetchOrders();
  }, [setOrders]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'in-transit':
        return <Truck className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getItemImage = (itemName: string) => {
    return itemImages[itemName] || itemImages.default;
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="border-dashed">
            <CardContent className="pt-6">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
              <p className="text-muted-foreground mb-6">
                Your order history will appear here once you place an order.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="secondary"
                      className={`flex items-center gap-1 ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    {order.status !== 'completed' && order.status !== 'cancelled' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/tracking/${order.id}`)}
                        className="gap-2 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 hover:scale-105 active:scale-95"
                      >
                        <Truck className="h-4 w-4" />
                        Track Order
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.itemId}
                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:shadow-md cursor-pointer group"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-md transition-transform duration-200 group-hover:scale-105">
                          <img
                            src={getItemImage(item.name)}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = itemImages.default;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.quantity} x ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage; 
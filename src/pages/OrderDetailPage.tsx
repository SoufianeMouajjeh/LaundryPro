import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, AlertCircle, Loader, Calendar, Edit3, List, DollarSign, Hash, XCircle } from 'lucide-react';

// Define interface for Order Item
interface OrderItem {
  id: number;
  item_id: number;
  item_name: string;
  quantity: number;
  price_at_order: number;
  special_instructions?: string | null;
}

// Define interface for Address
interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  notes?: string | null;
}

// Define interface for Order
interface Order {
  id: number;
  user_id: number;
  pickup_address_id: number;
  delivery_address_id: number;
  pickup_address?: Address; // Optional
  delivery_address?: Address; // Optional
  pickup_slot_start: string;
  pickup_slot_end: string;
  delivery_slot_start: string;
  delivery_slot_end: string;
  status: string;
  total_price: number;
  created_at: string;
  items: OrderItem[];
  special_instructions?: string | null;
}

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuth();
  // const navigate = useNavigate(); // Removed as navigation is not used directly here
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const API_BASE_URL = 'https://rp9hwiqc7wmq.manus.space/api';

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user || !orderId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          credentials: 'include',
        });
        if (response.ok) {
          const data: Order = await response.json();
          setOrder(data);
        } else if (response.status === 404) {
          throw new Error('Order not found.');
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch order details');
        }
      } catch (error: any) {
        console.error('Failed to fetch order details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [user, orderId]);

  const handleCancelOrder = async () => {
    if (!order || order.status !== 'Scheduled Pickup') return;
    setCancelling(true);
    setCancelError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${order.id}/cancel`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        const updatedOrderData = await response.json();
        setOrder(updatedOrderData.order);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel order');
      }
    } catch (error: any) {
      console.error('Failed to cancel order:', error);
      setCancelError(error.message);
    } finally {
      setCancelling(false);
    }
  };

  const formatDateTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    } catch (e) {
      return isoString;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'processing':
      case 'out for delivery':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled pickup':
      case 'picked up':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-12 text-center text-gray-500"><Loader size={24} className="animate-spin inline-block mr-2"/> Loading order details...</div>;
  if (error) return <div className="container mx-auto px-4 py-12 text-center text-red-600 bg-red-100 p-4 rounded flex items-center justify-center"><AlertCircle size={18} className="mr-2"/> Error: {error}</div>;
  if (!order) return <div className="container mx-auto px-4 py-12 text-center text-gray-500">Order data not available.</div>;

  const canCancel = order.status === 'Scheduled Pickup';

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-6">
        <Link to="/orders" className="inline-flex items-center text-cyan-600 hover:text-cyan-800 transition duration-150">
          <ArrowLeft size={18} className="mr-1" /> Back to Orders
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Order Details</h1>

      <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 space-y-6">
        {/* Order Summary Header - Adjusted grid for responsiveness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5 pb-4 border-b">
          <div>
            <p className="text-sm text-gray-500 flex items-center"><Hash size={14} className="mr-1"/> Order ID</p>
            <p className="font-semibold text-lg text-gray-800">#{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center"><Calendar size={14} className="mr-1"/> Placed On</p>
            <p className="font-medium text-gray-700">{formatDateTime(order.created_at)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 flex items-center"><DollarSign size={14} className="mr-1"/> Total Price</p>
            <p className="font-semibold text-lg text-gray-800">${order.total_price.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <span 
              className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(order.status)}`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center text-gray-700"><Calendar size={20} className="mr-2 text-cyan-600"/> Time Slots</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Pickup:</strong> {formatDateTime(order.pickup_slot_start)} - {formatDateTime(order.pickup_slot_end)}</p>
            <p><strong>Delivery:</strong> {formatDateTime(order.delivery_slot_start)} - {formatDateTime(order.delivery_slot_end)}</p>
          </div>
        </div>

        {/* Addresses - Placeholder */}
        {/* ... */}

        {/* Special Instructions */}
        {order.special_instructions && (
          <div>
            <h2 className="text-xl font-semibold mb-3 flex items-center text-gray-700"><Edit3 size={20} className="mr-2 text-cyan-600"/> Special Instructions</h2>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{order.special_instructions}</p>
          </div>
        )}

        {/* Items Ordered Table - Added responsive wrapper */}
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center text-gray-700"><List size={20} className="mr-2 text-cyan-600"/> Items Ordered</h2>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Price</th>
                  <th className="px-4 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Subtotal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map(item => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-gray-800">{item.item_name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-gray-600">${item.price_at_order.toFixed(2)}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-center text-gray-600">{item.quantity}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-gray-800 font-medium">${(item.price_at_order * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-4 py-2 text-right font-semibold text-gray-700">Total:</td>
                  <td className="px-4 py-2 text-right font-semibold text-lg text-gray-800">${order.total_price.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Cancel Order Button */}
        {canCancel && (
          <div className="border-t pt-6 text-right">
            {cancelError && 
              <p className="text-red-600 text-sm mb-2 text-center bg-red-100 p-2 rounded flex items-center justify-center">
                <AlertCircle size={16} className="mr-1"/> {cancelError}
              </p>
            }
            <button
              onClick={handleCancelOrder}
              disabled={cancelling}
              className="inline-flex items-center bg-red-600 text-white text-sm py-2 px-4 rounded hover:bg-red-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelling ? <Loader size={16} className="animate-spin mr-1"/> : <XCircle size={16} className="mr-1"/>}
              {cancelling ? 'Cancelling...' : 'Cancel Order'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;


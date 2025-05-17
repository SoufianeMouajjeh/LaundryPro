import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { ListOrdered, Loader, AlertCircle, Eye } from 'lucide-react'; // Removed unused icons

// Define interface for Order Item
interface OrderItem {
  id: number;
  item_id: number;
  item_name: string;
  quantity: number;
  price_at_order: number;
  special_instructions?: string | null;
}

// Define interface for Order
interface Order {
  id: number;
  user_id: number;
  pickup_address_id: number;
  delivery_address_id: number;
  pickup_slot_start: string;
  pickup_slot_end: string;
  delivery_slot_start: string;
  delivery_slot_end: string;
  status: string;
  total_price: number;
  created_at: string;
  items: OrderItem[];
}

// Import statements should be at the top of the file
const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'https://rp9hwiqc7wmq.manus.space/api';

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
          credentials: 'include',
        });
        if (response.ok) {
          const data: Order[] = await response.json();
          data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          setOrders(data);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch orders');
        }
      } catch (error: any) {
        console.error('Failed to fetch orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []); // Remove user dependency since it's not defined/used

  const formatDateTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">My Orders</h1>

      {loading ? (
        <div className="text-center text-gray-500 py-10"><Loader size={24} className="animate-spin inline-block mr-2"/> Loading orders...</div>
      ) : error ? (
        <div className="text-red-600 bg-red-100 p-4 rounded flex items-center justify-center"><AlertCircle size={18} className="mr-2"/> Error loading orders: {error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 bg-white shadow rounded-lg">
          <ListOrdered size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet.</p>
          <Link 
            to="/services" 
            className="inline-block bg-cyan-600 text-white font-semibold py-2 px-6 rounded hover:bg-cyan-700 transition duration-300"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-xl">
              {/* Responsive Grid for Order Summary */}
              <div className="p-5 border-b border-gray-200 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Order ID</p>
                  <p className="font-semibold text-gray-800">#{order.id}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Placed On</p>
                  <p className="font-medium text-gray-700">{formatDateTime(order.created_at)}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
                  <p className="font-semibold text-gray-800">${order.total_price.toFixed(2)}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <span 
                    className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
                {/* View Details Link - takes full width on small, aligns right on large */}
                <div className="col-span-2 md:col-span-4 lg:col-span-1 text-left md:text-right mt-2 md:mt-0">
                  <Link 
                    to={`/orders/${order.id}`} 
                    className="inline-flex items-center text-sm text-cyan-600 hover:text-cyan-800 hover:underline font-medium transition duration-150"
                  >
                    <Eye size={16} className="mr-1"/> View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;


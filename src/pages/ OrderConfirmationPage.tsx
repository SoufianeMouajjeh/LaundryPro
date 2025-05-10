import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

// Define interface for Order Item (matching backend)
interface OrderItem {
  id: number;
  item_id: number;
  item_name: string; // Assuming backend provides item name
  quantity: number;
  price_at_order: number;
  special_instructions?: string | null;
}

// Define interface for Order (matching backend)
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
  // Add other fields like special_instructions, promo_code, etc.
}

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order as Order | undefined;

  // If no order data is passed in state, redirect (e.g., to home or orders page)
  if (!order) {
    // Redirecting to home page as a fallback
    return <Navigate to="/" replace />;
  }

  // Format date/time for display
  const formatDateTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleString();
    } catch (e) {
      return isoString; // Fallback to original string if parsing fails
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for your order. Your order ID is #{order.id}.</p>
        
        <div className="text-left border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Placed On:</strong> {formatDateTime(order.created_at)}</p>
            <p><strong>Pickup Slot:</strong> {formatDateTime(order.pickup_slot_start)} - {formatDateTime(order.pickup_slot_end)}</p>
            <p><strong>Delivery Slot:</strong> {formatDateTime(order.delivery_slot_start)} - {formatDateTime(order.delivery_slot_end)}</p>
            {/* TODO: Display addresses if needed, might require fetching them based on ID */}
            {/* <p><strong>Pickup Address ID:</strong> {order.pickup_address_id}</p> */}
            {/* <p><strong>Delivery Address ID:</strong> {order.delivery_address_id}</p> */}
            
            <h3 className="text-lg font-medium pt-3">Items:</h3>
            <ul className="list-disc list-inside pl-4 space-y-1">
              {order.items.map(item => (
                <li key={item.id}>
                  {item.quantity} x {item.item_name} @ ${item.price_at_order.toFixed(2)} each
                </li>
              ))}
            </ul>
            <p className="font-semibold text-base pt-3"><strong>Total Price:</strong> ${order.total_price.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-8">
          <Link 
            to="/orders" // TODO: Create Order History page
            className="text-cyan-600 hover:underline mr-4"
          >
            View Order History
          </Link>
          <Link 
            to="/services"
            className="bg-cyan-600 text-white font-bold py-2 px-4 rounded hover:bg-cyan-700 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;


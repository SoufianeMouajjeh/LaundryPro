export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'pressing' | 'blanchisserie' | 'retoucherie';
  image?: string;
  duration: string;
  isAvailable: boolean;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: Address;
  pickupAddress?: Address;
  scheduledPickup?: string;
  scheduledDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  serviceId: string;
  service: Service;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  serviceId: string;
  service: Service;
  quantity: number;
  price: number;
  notes?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
} 
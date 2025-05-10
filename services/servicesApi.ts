import api from './api';

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  // Add other service properties as needed
}

export const servicesApi = {
  // Get all services
  getAllServices: async (): Promise<Service[]> => {
    const response = await api.get('/api/services');
    return response.data;
  },

  // Get a single service by ID
  getServiceById: async (id: number): Promise<Service> => {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
  },

  // Create a new order
  createOrder: async (orderData: any) => {
    const response = await api.post('/api/orders', orderData);
    return response.data;
  },

  // Get order status
  getOrderStatus: async (orderId: string) => {
    const response = await api.get(`/api/orders/${orderId}/status`);
    return response.data;
  },
}; 
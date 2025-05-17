import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { email: string; password: string; name: string }) =>
    api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Services endpoints
export const services = {
  getAll: () => api.get('/services'),
  getById: (id: string) => api.get(`/services/${id}`),
  create: (data: any) => api.post('/services', data),
  update: (id: string, data: any) => api.put(`/services/${id}`, data),
  delete: (id: string) => api.delete(`/services/${id}`),
};

// Orders endpoints
export const orders = {
  getAll: () => api.get('/orders'),
  getById: (id: string) => api.get(`/orders/${id}`),
  create: (data: any) => api.post('/orders', data),
  update: (id: string, data: any) => api.put(`/orders/${id}`, data),
  cancel: (id: string) => api.post(`/orders/${id}/cancel`),
};

// Cart endpoints
export const cart = {
  get: () => api.get('/cart'),
  addItem: (data: any) => api.post('/cart/items', data),
  updateItem: (itemId: string, data: any) => api.put(`/cart/items/${itemId}`, data),
  removeItem: (itemId: string) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
};

// User endpoints
export const user = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: any) => api.put('/user/profile', data),
  getAddresses: () => api.get('/user/addresses'),
  addAddress: (data: any) => api.post('/user/addresses', data),
  updateAddress: (id: string, data: any) => api.put(`/user/addresses/${id}`, data),
  deleteAddress: (id: string) => api.delete(`/user/addresses/${id}`),
};

export default api; 
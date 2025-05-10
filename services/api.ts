import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000', // Default Flask backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for handling tokens if needed
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

// Add response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here (e.g., show notifications)
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 
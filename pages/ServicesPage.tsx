import React, { useEffect, useState } from 'react';
import { servicesApi, Service } from '../services/servicesApi';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAllServices();
        setServices(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch services. Please try again later.');
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div key={service.id} className="border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <p className="text-lg font-bold">${service.price.toFixed(2)}</p>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            onClick={() => {
              // Add to cart logic here
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ServicesPage; 
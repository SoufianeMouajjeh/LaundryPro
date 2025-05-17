import * as React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section - Mimic structure from pressing-rah.com */}
      <section className="bg-cyan-100 p-8 rounded-lg mb-8 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
          <h1 className="text-4xl font-bold text-cyan-800 mb-4">The Laundry Service That Comes To You</h1>
          <p className="text-lg text-gray-700 mb-6">From collection to delivery, we take care of your clothes.</p>
          <Link 
            to="/services" 
            className="bg-cyan-600 text-white font-bold py-2 px-6 rounded hover:bg-cyan-700 transition duration-300"
          >
            Order Now
          </Link>
        </div>
        <div className="md:w-1/2">
          {/* Placeholder for an image similar to the reference site */}
          <div className="bg-gray-300 h-64 rounded flex items-center justify-center">
            <span className="text-gray-500">Hero Image Placeholder</span>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-6">Simple & Efficient Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="border p-6 rounded-lg shadow-sm">
            {/* Icon Placeholder */}
            <div className="text-4xl mb-3">🛒</div> 
            <h3 className="text-xl font-semibold mb-2">1. Order Online</h3>
            <p>Select your items and choose your service.</p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm">
            {/* Icon Placeholder */}
            <div className="text-4xl mb-3">🧺</div>
            <h3 className="text-xl font-semibold mb-2">2. Collection & Cleaning</h3>
            <p>We pick up your laundry and clean it with care.</p>
          </div>
          <div className="border p-6 rounded-lg shadow-sm">
            {/* Icon Placeholder */}
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="text-xl font-semibold mb-2">3. Express Delivery</h3>
            <p>Receive your clean clothes, ready to wear!</p>
          </div>
        </div>
      </section>

      {/* TODO: Add Service Categories section */}
      {/* TODO: Add Testimonials section */}
      {/* TODO: Add FAQ section */}

    </div>
  );
};

export default HomePage;


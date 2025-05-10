import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Optional based on your model
  const [phone, setPhone] = useState(''); // Optional based on your model
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const backendUrl = 'https://rp9hwiqc7wmq.manus.space'; // Use the latest deployed backend URL
      const response = await fetch(`${backendUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include name and phone if they are part of registration
        body: JSON.stringify({ email, password, name, phone }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Automatically log in or redirect to login page after registration
      console.log('Registration successful');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (e: any) {
      setError(e.message);
      console.error('Registration failed:', e);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required // Make required if needed
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
         <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel" // Use tel type for phone numbers
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            // required // Make required if needed
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* TODO: Add password confirmation field */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Register</button>
      </form>
      {/* TODO: Add link to Login page */}
    </div>
  );
};

export default RegisterPage;


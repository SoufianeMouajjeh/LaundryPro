import { useState, useEffect } from 'react';

// Define interfaces for user data (adjust based on your actual API response)
interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
}

interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  notes: string | null;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Get user ID or token from auth state
  const userId = 1; // Placeholder - replace with actual user ID from auth context
  const backendUrl = 'https://rp9hwiqc7wmq.manus.space'; // Use the latest deployed backend URL

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch user profile
        const profileResponse = await fetch(`${backendUrl}/api/users/${userId}`); // Assuming endpoint exists
        if (!profileResponse.ok) {
          throw new Error(`HTTP error fetching profile! status: ${profileResponse.status}`);
        }
        const profileData: UserProfile = await profileResponse.json();
        setProfile(profileData);

        // Fetch user addresses
        const addressResponse = await fetch(`${backendUrl}/api/users/${userId}/addresses`); // Assuming endpoint exists
        if (!addressResponse.ok) {
          throw new Error(`HTTP error fetching addresses! status: ${addressResponse.status}`);
        }
        const addressData: Address[] = await addressResponse.json();
        setAddresses(addressData);

      } catch (e: any) {
        setError(e.message);
        console.error("Failed to fetch profile data:", e);
      } finally {
        setLoading(false);
      }
    };

    if (userId) { // Only fetch if user ID is available
      fetchProfileData();
    }
  }, [userId, backendUrl]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile: {error}</div>;
  if (!profile) return <div>User not found or not logged in.</div>; // Handle case where profile couldn't be loaded

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Details</h2>
        <p><strong>Name:</strong> {profile.name || 'Not set'}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone || 'Not set'}</p>
        {/* TODO: Add Edit Profile button/functionality */}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">My Addresses</h2>
        {addresses.length > 0 ? (
          <ul>
            {addresses.map((address) => (
              <li key={address.id} className="border-b py-2">
                {address.street}, {address.city}, {address.state} {address.zip_code}, {address.country}
                {address.notes && <span className="text-sm text-gray-600 block">({address.notes})</span>}
                {/* TODO: Add Edit/Delete Address buttons/functionality */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No addresses found.</p>
        )}
        {/* TODO: Add 'Add New Address' button/form */}
      </div>

      {/* TODO: Add Order History section */}
    </div>
  );
};

export default ProfilePage;


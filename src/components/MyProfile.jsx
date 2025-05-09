import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('http://localhost:3000/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const result = await response.json();
        if (result.success && result.data) {
          setProfile(result.data);
        } else {
          throw new Error('Invalid profile data');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleVerifyClick = () => {
    navigate('/verification-form');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-3xl font-bold text-blue-600">
              {profile.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{profile.name || 'unik'}</h3>
            <p className="text-gray-600">{profile.email || 'unik@gmail.com'}</p>
            {profile.isVerified && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Role</h4>
            <p className="mt-1 text-lg capitalize">{profile.role || 'USER'}</p>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Account Created</h4>
              <p className="mt-1 text-lg">
                {profile.createdAt ? new Date(profile.createdAt).toLocaleString() : '4/21/2025, 11:59:36 AM'}
              </p>
            </div>
            {!profile.isVerified && (
              <button
                onClick={handleVerifyClick}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors h-fit"
              >
                Verify
              </button>
            )}
          </div>
        </div>

        {profile.role === 'technician' && (
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold mb-4">Technician Stats</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="text-sm font-medium text-gray-500">Open Tickets</h5>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  {profile.openTickets || 0}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h5 className="text-sm font-medium text-gray-500">In Progress</h5>
                <p className="mt-1 text-2xl font-bold text-yellow-600">
                  {profile.inProgressTickets || 0}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="text-sm font-medium text-gray-500">Closed Tickets</h5>
                <p className="mt-1 text-2xl font-bold text-green-600">
                  {profile.closedTickets || 0}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
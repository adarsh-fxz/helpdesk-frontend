import { useState, useEffect } from 'react';
import { Edit2, Save, X, Phone, MapPin, Building, User, Mail, Calendar, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    department: '',
    location: ''
  });

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
          setFormData({
            name: result.data.name || '',
            phone: result.data.phone || '',
            bio: result.data.bio || '',
            department: result.data.department || '',
            location: result.data.location || ''
          });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3000/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      if (result.success) {
        setProfile(result.data);
        setIsEditing(false);
      } else {
        throw new Error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="w-full p-8 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Loading profile information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full p-8">
        <div className={`${isDarkMode ? 'bg-red-900/50' : 'bg-red-100'} border-red-400 text-red-700 border px-4 py-3 rounded-lg`}>
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No profile state
  if (!profile) {
    return (
      <div className="w-full p-8">
        <div className={`${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} p-6 rounded-lg shadow-sm`}>
          <p>No profile data available. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-0 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
      <div className="relative h-40 sm:h-56 w-full">
        {/* Professional Header with Gradient and Wave */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-500 to-blue-400" />
        {/* SVG Wave at the bottom */}
        <svg className="absolute bottom-0 left-0 w-full h-12 sm:h-16" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={isDarkMode ? "#1f2937" : "#fff"} fillOpacity="0.95" />
        </svg>
        {/* Header Content */}
        <div className="absolute top-8 left-8 sm:left-12 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">My Profile</h1>
          <p className="text-sm sm:text-base text-white/90">Manage your personal information and preferences</p>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 relative">
        {/* Action button */}
        <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`
              flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${isEditing 
                ? isDarkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            {isEditing ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>
        
        {/* Profile picture and basic info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          <div className="relative -mt-16 sm:-mt-20">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg border-4 border-white bg-gray-200">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                <span className="text-4xl sm:text-5xl font-bold text-white">
                  {profile.name?.charAt(0).toUpperCase() || '?'}
                </span>
              </div>
            )}
          </div>
          </div>
          
          <div className="text-center sm:text-left sm:ml-6 mt-3 sm:mt-0">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              {profile.name || 'User'}
            </h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              {profile.email}
            </p>
            <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                <Shield className="w-3 h-3 mr-1" />
                {profile.role?.toUpperCase() || 'USER'}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                <Calendar className="w-3 h-3 mr-1" />
                Active
              </span>
            </div>
          </div>
        </div>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                  ${isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                  ${isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                  ${isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                  ${isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-blue-500'
                  }`}
              />
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-gray-100 focus:ring-blue-500 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-blue-500'
                }`}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-2">
                <Phone className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</h3>
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {profile.phone || 'Not provided'}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-2">
                <Building className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department</h3>
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {profile.department || 'Not provided'}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-2">
                <MapPin className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Location</h3>
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {profile.location || 'Not provided'}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-2">
                <User className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</h3>
              </div>
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {profile.role?.toUpperCase() || 'USER'}
              </p>
            </div>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="flex items-center mb-2">
              <Mail className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <h3 className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bio</h3>
            </div>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              {profile.bio || 'No bio provided'}
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default MyProfile; 
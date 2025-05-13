import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { useTheme } from '../context/ThemeContext';

const Signup = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/signup', formData);
      localStorage.setItem('token', data.token);
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-5xl w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row`}>
        {/* Image Section */}
        <div className="md:w-1/2 p-4 h-64 md:h-auto">
          <img
            src="Helpdesk.png"
            alt="Helpdesk"
            className="w-full h-full object-contain rounded-lg hover:scale-105 transition-transform"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="Khushi Das"
              />
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                autoComplete="new-password"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className={`px-2 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'} text-sm`}>
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button 
                onClick={() => navigate('/GoogleLogin')}
                className={`flex items-center justify-center py-2 px-4 border rounded-md hover:bg-gray-50 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
              >
                <FcGoogle className="mr-2 text-lg" />
                <span className="text-sm font-medium">Sign up with Google</span>
              </button>
            </div>
          </div>

          <p className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/signin')}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      {/* Dark/Light Mode Toggle Button */}
      <button onClick={toggleTheme} className="absolute top-4 right-4 p-2 text-sm rounded bg-blue-500 text-white">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default Signup;

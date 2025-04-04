import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Mail, Phone, MapPin, Save } from "lucide-react";

const EditProfile = () => {
  const navigate = useNavigate();
  
  // Sample user data - in a real app, this would come from props or context
  const [user, setUser] = useState({
    name: "Roshit",
    email: "roshit@example.com",
    phone: "+977 98000000",
    location: "Kathmandu, Nepal",
    avatar: "/Kunga.png"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the changes
    console.log("Profile updated:", user);
    
    // After saving, navigate back to profile
    navigate("/UserProfile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link 
              to="/UserProfile" 
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Cancel
            </Link>
            <h1 className="text-xl font-bold text-gray-800">Edit Profile</h1>
            <button 
              type="submit" 
              form="editForm"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Save className="h-5 w-5 mr-1" />
              Save
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
            <div className="relative mx-auto w-24 h-24">
              <img 
                src={user.avatar} 
                alt="User Profile" 
                className="w-full h-full rounded-full border-4 border-white object-cover shadow-md"
              />
              <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition">
                <label htmlFor="avatarUpload" className="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
                <input 
                  id="avatarUpload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    // Handle image upload here
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setUser(prev => ({
                          ...prev,
                          avatar: event.target.result
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </button>
            </div>
            <div className="mt-4">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="text-2xl font-bold text-white bg-transparent border-b border-blue-300 focus:outline-none focus:border-white text-center"
              />
            </div>
          </div>

          {/* Profile Details Form */}
          <form id="editForm" onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-50 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <label htmlFor="email" className="text-sm font-medium text-gray-500 block">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full px-0 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-50 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-500 block">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="w-full px-0 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-50 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <label htmlFor="location" className="text-sm font-medium text-gray-500 block">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={user.location}
                    onChange={handleChange}
                    className="w-full px-0 py-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-6">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
              <textarea
                id="bio"
                name="bio"
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
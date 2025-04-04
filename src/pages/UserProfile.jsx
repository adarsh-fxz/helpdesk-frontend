import React from "react";
import { Link } from "react-router-dom";
import { Edit, ChevronLeft, Mail, Phone, MapPin } from "lucide-react";

const UserProfile = () => {
  // Sample user data - replace with actual user data from your backend/context
  const user = {
    name: "Roshit ",
    email: "roshit@example.com",
    phone: "+977 98000000",
    location: "Kathmandu, Nepal",
    avatar: "/Kunga.png",
    joinDate: "Member since June 2023"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link 
              to="/UserHomePage" 
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </Link>
            <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
            <div className="w-24"></div> {/* Spacer for balance */}
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
                <Edit className="h-4 w-4 text-blue-600" />
              </button>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-blue-100">{user.joinDate}</p>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-50 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-800">{user.email}</p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-50 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-800">{user.phone}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-50 p-2 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-gray-800">{user.location}</p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                to="/EditProfile"
                className="w-full flex justify-center items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-50 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">Ticket resolved</p>
                  <p className="text-sm text-gray-500">Printer not working - Closed</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-yellow-50 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">Ticket in progress</p>
                  <p className="text-sm text-gray-500">Email configuration - Being worked on</p>
                  <p className="text-xs text-gray-400 mt-1">5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
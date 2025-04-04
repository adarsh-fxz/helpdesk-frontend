import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, ChevronRight, AlertCircle, Phone, MapPin, FileText } from "lucide-react";

const UserProblem = () => {
  const [issue, setIssue] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState(null);

  const previousRequests = [
    { id: 1, title: "TV screen not working", submittedTime: "Submitted 2 days ago", status: "In Progress" },
    { id: 2, title: "Phone battery problem", submittedTime: "Submitted 4 days ago", status: "Resolved" },
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ issue, category, location, phoneNumber, file });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 shadow-sm bg-white z-50">
        <div className="flex items-center space-x-3">
          <img src="/Logo.png" alt="Helpdesk Logo" className="w-10 h-10 rounded-lg" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Helpdesk
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/UserHomePage" 
            className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-2">
            <Link to="/UserProfile">
              <img 
                src="/Kunga.png" 
                alt="User Profile" 
                className="w-8 h-8 rounded-full border-2 border-blue-100 hover:border-blue-300 transition-colors cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-10 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">Create New Support Ticket</h1>
            <p className="text-gray-500 mt-1">Please provide details about your issue</p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Issue Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
                  Describe your issue
                </label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Please describe your problem in detail..."
                  rows={5}
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  required
                />
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach supporting files (optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-10 w-10 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input 
                          type="file" 
                          className="sr-only" 
                          onChange={handleFileChange}
                          accept="image/*,.pdf,.doc,.docx"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Category
                  </label>
                  <select
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Software</option>
                    <option value="network">Network</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Where is the issue occurring?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Submit Support Request
              </button>
            </form>
          </div>
        </div>

        {/* Previous Requests */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Your Previous Requests
            </h2>
            <Link 
              to="/tickets" 
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-3">
            {previousRequests.map((request) => (
              <div 
                key={request.id} 
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{request.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{request.submittedTime}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === "In Progress" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-green-100 text-green-800"
                  }`}>
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProblem;
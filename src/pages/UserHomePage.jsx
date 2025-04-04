import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const UserHomePage = () => {
  const navigate = useNavigate();

  // Sample data - replace with your actual data
  const recentTickets = [
    {
      id: 1,
      title: "Printer not working",
      status: "Open",
      date: new Date().toLocaleDateString(),
      priority: "High"
    },
    {
      id: 2,
      title: "Email configuration",
      status: "In Progress",
      date: new Date().toLocaleDateString(),
      priority: "Medium"
    },
    {
      id: 3,
      title: "Software installation",
      status: "Resolved",
      date: new Date().toLocaleDateString(),
      priority: "Low"
    }
  ];

  const handleCreateTicket = () => {
    navigate("/UserProblem");
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="/Logo.png" 
                alt="Helpdesk Logo" 
                className="w-12 h-12 rounded-lg shadow-sm"
              />   
              <Link 
                to="/" 
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Helpdesk
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/UserHomePage" 
                className="relative px-3 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                Dashboard
              </Link>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="relative px-3 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                Contact Us
              </a>
            </div>

            <div className="flex items-center space-x-6">
              <Link
                to="/UserProfile"
                className="flex items-center space-x-3 group"
              >
                <div className="relative">
                  <img 
                    src="/Kunga.png" 
                    alt="User Profile" 
                    className="w-10 h-10 rounded-full border-2 border-blue-100 group-hover:border-blue-300 transition-colors shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors hidden lg:inline">
                  My Profile
                </span>
              </Link>
              <button
                onClick={() => navigate("/Home")}
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
              <p className="text-gray-500 mt-2">Welcome back! Here's what's happening with your tickets.</p>
            </div>
            <button
              onClick={handleCreateTicket}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Create New Ticket</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Open Tickets</h3>
                  <p className="text-4xl font-bold mt-2 text-gray-800">2</p>
                </div>
                <div className="p-3 bg-red-50 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">In Progress</h3>
                  <p className="text-4xl font-bold mt-2 text-gray-800">1</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Resolved</h3>
                  <p className="text-4xl font-bold mt-2 text-gray-800">5</p>
                </div>
                <div className="p-3 bg-green-50 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tickets */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Tickets</h2>
              <Link to="/tickets" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentTickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        ticket.status === "Open" ? "bg-red-500" :
                        ticket.status === "In Progress" ? "bg-yellow-500" :
                        "bg-green-500"
                      }`}></div>
                      <span className="text-blue-600 hover:underline font-medium">
                        {ticket.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ticket.status === "Open" ? "bg-red-100 text-red-800" :
                        ticket.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {ticket.status}
                      </span>
                      <span className={`text-xs font-medium ${
                        ticket.priority === "High" ? "text-red-500" :
                        ticket.priority === "Medium" ? "text-yellow-500" :
                        "text-green-500"
                      }`}>
                        {ticket.priority} Priority
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-500 flex items-center space-x-4">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {ticket.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={handleCreateTicket}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className="p-4 bg-blue-50 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Report Problem</h4>
                <p className="text-sm text-gray-500">Create new support ticket</p>
              </button>
              
              <button
                onClick={() => navigate("/knowledge-base")}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className="p-4 bg-purple-50 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">Knowledge Base</h4>
                <p className="text-sm text-gray-500">Find solutions and guides</p>
              </button>
              
              <button
                onClick={() => navigate("/status")}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className="p-4 bg-green-50 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-800 mb-2">System Status</h4>
                <p className="text-sm text-gray-500">Check service outages</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Footer */}
      <footer id="contact" className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto bg-blue-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">support@helpdesk.com</p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-blue-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+977 980-000-0000</p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-blue-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserHomePage;
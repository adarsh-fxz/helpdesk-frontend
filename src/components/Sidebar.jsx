import React from "react";
import { Home, FileText, Users, Settings, MessageSquare, HelpCircle, LogOut, Bell } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Notification from "./Notification";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Signin');
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: FileText, label: "Create Ticket", path: "/dashboard/create-ticket" },
    { icon: FileText, label: "My Tickets", path: "/dashboard/my-tickets" },
    { icon: FileText, label: "Open Tickets", path: "/dashboard/open-tickets" },
    { icon: Bell, label: "Notifications", path: "/dashboard/notifications", component: Notification },
    { icon: Users, label: "Users", path: "/dashboard/users" },
    { icon: Users, label: "Technician", path: "/dashboard/technician" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <nav className="w-64 bg-white p-6 border-r border-gray-200 shadow-lg h-screen flex flex-col fixed top-0 left-0 z-10">
      {/* Header with subtle gradient */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-xs text-gray-500 mt-1">Welcome back!</p>
      </div>
      
      {/* Main Menu with better spacing and icons */}
      <div className="space-y-2 flex-grow">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition-all duration-300 group ${
              location.pathname === item.path 
                ? "bg-blue-100/80 text-blue-700 font-semibold border-l-4 border-blue-500 shadow-inner" 
                : "text-gray-600 hover:bg-blue-50/50 hover:text-blue-600"
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 ${
              location.pathname === item.path 
                ? "text-blue-600" 
                : "text-gray-500 group-hover:text-blue-500"
            }`} />
            <span>{item.label}</span>
            {item.component && <item.component />}
            {location.pathname !== item.path && (
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Footer with improved visual hierarchy */}
      <div className="pt-4 flex flex-col border-t border-gray-200 space-y-2">
        <a 
          href="#" 
          className="flex items-center p-3 text-gray-600 hover:bg-gray-100/50 hover:text-gray-800 rounded-lg transition-all duration-300 group"
        >
          <MessageSquare className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-500" />
          <span>Feedback</span>
          <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">New</span>
        </a>
        <a 
          href="#" 
          className="flex items-center p-3 text-gray-600 hover:bg-gray-100/50 hover:text-gray-800 rounded-lg transition-all duration-300 group"
        >
          <HelpCircle className="w-5 h-5 mr-3 text-gray-500 group-hover:text-blue-500" />
          <span>Help & Docs</span>
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center p-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-300 mt-4 group"
        >
          <LogOut className="w-5 h-5 mr-3 text-gray-500 group-hover:text-red-500" />
          <span>Logout</span>
        </button>
      </div>

      {/* User profile mini-card at the bottom */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center p-2 rounded-lg hover:bg-gray-100/50 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
            U
          </div>
          <div>
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

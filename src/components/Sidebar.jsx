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
  ];

  return (
    <nav className="w-64 bg-white p-6 border-r border-gray-100 shadow-sm h-screen flex flex-col sticky top-0">
      <h2 className="text-xl font-bold mb-8 text-gray-800 border-b border-gray-100 pb-4 px-2">Dashboard</h2>
      <div className="space-y-1 flex-grow">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              location.pathname === item.path 
                ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-500" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
            {item.component && <item.component />}
          </Link>
        ))}
        <Link
          to="/dashboard/technician"
          className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
            location.pathname === "/dashboard/technician"
              ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-500"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          }`}
        >
          <Users className="w-5 h-5 mr-3" />
          <span>Technician</span>
        </Link>
        <Link
          to="/dashboard/settings"
          className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
            location.pathname === "/dashboard/settings"
              ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-500"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          }`}
        >
          <Settings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </Link>
      </div>
      <div className="pt-4 flex flex-col border-t border-gray-100 mt-4">
        <a href="#" className="flex items-center p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-all duration-200">
          <MessageSquare className="w-5 h-5 mr-3" />
          <span>Feedback</span>
        </a>
        <a href="#" className="flex items-center p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg transition-all duration-200">
          <HelpCircle className="w-5 h-5 mr-3" />
          <span>Help & Docs</span>
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center p-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200 mt-2"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;

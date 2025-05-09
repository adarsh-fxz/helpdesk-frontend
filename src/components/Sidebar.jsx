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
    <nav className="w-64 bg-white p-6 border-r shadow-md h-screen flex flex-col sticky top-0">
      <h2 className="text-xl font-semibold mb-6 text-blue-700 border-b pb-4">Dashboard</h2>
      <div className="space-y-2 flex-grow">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center p-3 rounded-lg ${
              location.pathname === item.path 
                ? "bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-500" 
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
            {item.component && <item.component />}
          </Link>
        ))}
        <Link
          to="/dashboard/technician"
          className={`flex items-center p-3 rounded-lg ${
            location.pathname === "/dashboard/technician"
              ? "bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-500"
              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <Users className="w-5 h-5 mr-3" />
          Technician
        </Link>
        <Link
          to="/dashboard/settings"
          className={`flex items-center p-3 rounded-lg ${
            location.pathname === "/dashboard/settings"
              ? "bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-500"
              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Link>
      </div>
      <div className="pt-6 flex flex-col border-t">
        <Link
          to="/dashboard/feedback"
          className={`flex items-center p-3 rounded-lg ${
            location.pathname === "/dashboard/feedback"
              ? "bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-500"
              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <MessageSquare className="w-5 h-5 mr-3" />
          Feedback
        </Link>
        <Link
          to="/dashboard/help-docs"
          className={`flex items-center p-3 rounded-lg ${
            location.pathname === "/dashboard/help-docs"
              ? "bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-500"
              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <HelpCircle className="w-5 h-5 mr-3" />
          Help & Docs
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center p-3 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;

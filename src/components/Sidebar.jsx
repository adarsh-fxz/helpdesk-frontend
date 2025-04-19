import React from "react";
import {
  Home,
  FileText,
  Users,
  Settings,
  MessageSquare,
  HelpCircle,
  LogOut,
  Bell
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Notification from "./Notification";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
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

  const bottomMenuItems = [
    { icon: MessageSquare, label: "Feedback", path: "#" },
    { icon: HelpCircle, label: "Help & Docs", path: "#" },
  ];

  return (
    <nav className="w-64 bg-white p-6 shadow-lg h-screen flex flex-col sticky top-0">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 tracking-wide">Dashboard</h2>

      <div className="space-y-1 flex-grow">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const ActiveClasses =
            "bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-500";
          const InactiveClasses =
            "text-gray-600 hover:bg-blue-50 hover:text-blue-600";

          return (
            <Link
              key={`${item.path}-${index}`}
              to={item.path}
              className={`flex items-center justify-between p-3 rounded-md transition-colors duration-200 ${
                isActive ? ActiveClasses : InactiveClasses
              }`}
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </div>
              {item.component && <item.component />}
            </Link>
          );
        })}
      </div>

      <div className="mt-4 space-y-1">
        {bottomMenuItems.map((item, index) => (
          <a
            key={`bottom-${index}`}
            href={item.path}
            className="flex items-center p-3 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </a>
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center p-3 rounded-md text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors duration-200 w-full"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
      
    </nav>
  );
};

export default Sidebar;

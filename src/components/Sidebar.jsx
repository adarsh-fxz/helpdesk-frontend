import React from "react";
import { Home, FileText, Users, Settings, MessageSquare, HelpCircle, LogOut, Bell, ClipboardList, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Notification from "./Notification";
import { useTheme } from "../context/ThemeContext";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = (localStorage.getItem('role') || '').toLowerCase();
  const { isDarkMode } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    navigate('/Signin');
  };

  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: "My Profile", path: "/dashboard" },
      { icon: Bell, label: "Notifications", path: "/dashboard/notifications", component: Notification },
    ];
    const userItems = [
      { icon: FileText, label: "Create Ticket", path: "/dashboard/create-ticket" },
      { icon: FileText, label: "My Tickets", path: "/dashboard/my-tickets" },
    ];
    const technicianItems = [
      { icon: FileText, label: "Open Tickets", path: "/dashboard/open-tickets" },
      { icon: ClipboardList, label: "Assigned Tickets", path: "/dashboard/assigned-tickets" },
    ];
    const adminItems = [
      { icon: FileText, label: "Create Ticket", path: "/dashboard/create-ticket" },
      { icon: FileText, label: "My Tickets", path: "/dashboard/my-tickets" },
      { icon: FileText, label: "Open Tickets", path: "/dashboard/open-tickets" },
      { icon: Users, label: "Users", path: "/dashboard/users" },
      { icon: Users, label: "Technicians", path: "/dashboard/technician" },
    ];
    switch (userRole) {
      case 'admin':
        return [...commonItems, ...adminItems];
      case 'technician':
        return [...commonItems, ...technicianItems];
      case 'user':
        return [...commonItems, ...userItems];
      default:
        return commonItems;
    }
  };
  const menuItems = getMenuItems();

  // Overlay for mobile
  const overlay = (
    <div
      className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${isMobileOpen ? 'block' : 'hidden'}`}
      onClick={() => setIsMobileOpen(false)}
      aria-label="Close sidebar overlay"
    />
  );

  // Sidebar content
  const sidebarContent = (
    <nav
      className={`
        flex flex-col h-full border-r shadow-lg z-50
        w-72 max-w-full p-4 md:p-6
        transition-transform duration-300
        fixed md:static top-0 left-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}
      aria-label="Sidebar navigation"
    >
      {/* Mobile close button */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h2 className={`text-xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Helpdesk</h2>
        <button
          onClick={() => setIsMobileOpen(false)}
          className={`p-2 rounded focus:outline-none ${
            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
          }`}
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      {/* Desktop title */}
      <h2 className={`hidden md:block text-xl font-bold mb-8 border-b pb-4 ${
        isDarkMode ? 'text-blue-400 border-gray-700' : 'text-blue-700 border-gray-200'
      }`}>Helpdesk</h2>
      <div className="space-y-1 flex-grow">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${location.pathname === item.path
                ? isDarkMode
                  ? "bg-blue-900 text-blue-400 font-semibold border-l-4 border-blue-500"
                  : "bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500"
                : isDarkMode
                  ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="truncate">{item.label}</span>
            {item.component && <item.component />}
          </Link>
        ))}
        <Link
          to="/dashboard/settings"
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${location.pathname === "/dashboard/settings"
              ? isDarkMode
                ? "bg-blue-900 text-blue-400 font-semibold border-l-4 border-blue-500"
                : "bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500"
              : isDarkMode
                ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}
          `}
        >
          <Settings className="w-5 h-5" />
          <span className="truncate">Settings</span>
        </Link>
      </div>
      <div className={`pt-6 flex flex-col border-t mt-6 gap-1 ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <Link
          to="/dashboard/feedback"
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${location.pathname === "/dashboard/feedback"
              ? isDarkMode
                ? "bg-blue-900 text-blue-400 font-semibold border-l-4 border-blue-500"
                : "bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500"
              : isDarkMode
                ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}
          `}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="truncate">Feedback</span>
        </Link>
        <Link
          to="/dashboard/help-docs"
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
            ${location.pathname === "/dashboard/help-docs"
              ? isDarkMode
                ? "bg-blue-900 text-blue-400 font-semibold border-l-4 border-blue-500"
                : "bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500"
              : isDarkMode
                ? "text-gray-300 hover:bg-gray-700 hover:text-blue-400"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}
          `}
        >
          <HelpCircle className="w-5 h-5" />
          <span className="truncate">Help & Docs</span>
        </Link>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isDarkMode
              ? "text-red-400 hover:bg-gray-700 hover:text-red-300"
              : "text-red-600 hover:bg-red-50 hover:text-red-700"
          }`}
        >
          <LogOut className="w-5 h-5" />
          <span className="truncate">Logout</span>
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Hamburger for mobile (shown in Header, but fallback here) */}
      {/* Overlay and sidebar for mobile */}
      <div className="md:hidden">
        {isMobileOpen && overlay}
        <div className="fixed inset-y-0 left-0 z-50">
          {sidebarContent}
        </div>
      </div>
      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col h-screen sticky top-0 z-30">
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import { Bell, User, Menu, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Header = ({ setIsMobileOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userName = localStorage.getItem('name') || 'User';
  const userRole = (localStorage.getItem('role') || '').toLowerCase();
  const { isDarkMode, toggleTheme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  return (
    <header 
      className={`
        sticky top-0 z-20 w-full transition-all duration-200
        ${scrolled ? 'shadow-md' : 'shadow-sm'}
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
      `}
    >
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Hamburger for mobile */}
        <button
          className={`md:hidden p-2 rounded-md focus:outline-none ${
            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
          }`}
          onClick={() => setIsMobileOpen && setIsMobileOpen(true)}
          aria-label="Open sidebar menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* Right section - Theme toggle, Notifications and user menu */}
        <div className="flex items-center space-x-3 ml-auto">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
            }`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-6 h-6 cursor-pointer" /> : <Moon className="w-6 h-6 cursor-pointer" />}
          </button>
          {/* Notifications */}
          <Link 
            to="/dashboard/notifications" 
            className={`p-2 rounded-full relative ${
              isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
          {/* User menu */}
          <div className="user-menu-container relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center focus:outline-none cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-medium">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block ml-2 text-left">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{userName}</p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>{userRole}</p>
              </div>
            </button>
            {/* Dropdown menu */}
            {showUserMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-50 border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <Link 
                  to="/dashboard" 
                  className={`block px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  My Profile
                </Link>
                <Link 
                  to="/dashboard/settings" 
                  className={`block px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Settings
                </Link>
                <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} my-1`}></div>
                <Link 
                  to="/dashboard/help-docs" 
                  className={`block px-4 py-2 text-sm ${
                    isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Help & Support
                </Link>
                <button 
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    localStorage.removeItem('userId');
                    window.location.href = '/Signin';
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDarkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-red-50'
                  }`}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

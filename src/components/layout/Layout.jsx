import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { useTheme } from '../../context/ThemeContext';

const Layout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full overflow-x-hidden">
        {/* Header */}
        <Header setIsMobileOpen={setIsMobileOpen} />
        
        {/* Page Content */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
import React, { useState } from "react";
import { Cog, ChevronRight, Search, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../context/ThemeContext';

const Setting = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password length
    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    // Validate password match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword
        }),
      });

      const data = await response.json();
      console.log("Response:", response.status, data);

      if (!response.ok) {
        if (response.status === 401) {
          setError("Current password is incorrect");
        } else if (data.message === "New passwords do not match") {
          setError("New passwords do not match");
        } else {
          setError(data.message || "An error occurred while changing password");
        }
        return;
      }

      // Clear form and show success message
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setShowPasswordForm(false);
      alert("Password changed successfully!");
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while changing password");
    }
  };

  return (
    <div className={`p-6 min-h-screen font-sans ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className={`text-2xl font-semibold flex items-center ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            <Cog className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            System Settings
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your application preferences</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className={`absolute left-3 top-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search settings..."
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600
              ${isDarkMode 
                ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500' 
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {!showPasswordForm ? (
          // Settings List
          [
            { 
              name: "Account Security", 
              description: "Manage password & security settings",
              icon: <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
            },
            { 
              name: "Notifications", 
              description: "Control email and push notifications",
              icon: <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
            },
            { 
              name: "Change Password", 
              description: "Update your account password",
              icon: <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                      <Lock className="h-5 w-5" />
                    </div>
            },
            { 
              name: "Language", 
              description: "Set your preferred language",
              icon: <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389 21.034 21.034 0 01-.914-1.026 18.994 18.994 0 01-3.107-7.337 1 1 0 01.242-1.023l2-1.999a1 1 0 011.414 0A1 1 0 017 2zm5 2a1 1 0 100 2h.01a1 1 0 100-2H12z" clipRule="evenodd" />
                        <path d="M9 13a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                      </svg>
                    </div>
            },
            { 
              name: "System Preferences", 
              description: "Adjust UI and performance settings",
              icon: <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </div>
            }
          ].map((setting, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-4 rounded-lg border transition-colors cursor-pointer
                ${isDarkMode 
                  ? 'bg-gray-900 border-gray-700 hover:border-blue-600' 
                  : 'bg-white border-gray-200 hover:border-blue-300'}`}
              onClick={() => setting.name === "Change Password" ? setShowPasswordForm(true) : console.log(`Navigate to ${setting.name}`)}
            >
              <div className="flex items-center space-x-4">
                {setting.icon}
                <div>
                  <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{setting.name}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{setting.description}</p>
                </div>
              </div>
              <ChevronRight className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
            </div>
          ))
        ) : (
          // Password Change Form
          <div className={`rounded-lg border p-6 ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setShowPasswordForm(false)}
                className={`mr-4 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Change Password</h2>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {error && (
                <div className={`p-3 rounded-lg text-sm ${isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-50 text-red-700'}`}>
                  {error}
                </div>
              )}
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600
                    ${isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-gray-100' 
                      : 'bg-white border-gray-300 text-gray-900'}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600
                    ${isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-gray-100' 
                      : 'bg-white border-gray-300 text-gray-900'}`}
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                />
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Password must be at least 6 characters long</p>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600
                    ${isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-gray-100' 
                      : 'bg-white border-gray-300 text-gray-900'}`}
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                  className={`px-4 py-2 border rounded-lg transition-colors
                    ${isDarkMode 
                      ? 'text-gray-300 border-gray-600 hover:bg-gray-700' 
                      : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
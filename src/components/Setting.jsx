import React from "react";
import { Cog, ChevronRight, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 flex items-center">
              <Cog className="w-5 h-5 mr-2 text-blue-600" />
              System Settings
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your application preferences</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search settings..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
          />
        </div>
      </div>

      {/* Settings Cards */}
      <div className="space-y-4">
        {[
          { 
            name: "Account Security", 
            description: "Manage password & security settings",
            icon: <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
          },
          { 
            name: "Notifications", 
            description: "Control email and push notifications",
            icon: <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
          },
          { 
            name: "Privacy", 
            description: "Manage data sharing preferences",
            icon: <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
          },
          { 
            name: "Language", 
            description: "Set your preferred language",
            icon: <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389 21.034 21.034 0 01-.914-1.026 18.994 18.994 0 01-3.107-7.337 1 1 0 01.242-1.023l2-1.999a1 1 0 011.414 0A1 1 0 017 2zm5 2a1 1 0 100 2h.01a1 1 0 100-2H12z" clipRule="evenodd" />
                      <path d="M9 13a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                    </svg>
                  </div>
          },
          { 
            name: "System Preferences", 
            description: "Adjust UI and performance settings",
            icon: <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
          }
        ].map((setting, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
            onClick={() => console.log(`Navigate to ${setting.name}`)}
          >
            <div className="flex items-center space-x-4">
              {setting.icon}
              <div>
                <h3 className="font-medium text-gray-800">{setting.name}</h3>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Setting;
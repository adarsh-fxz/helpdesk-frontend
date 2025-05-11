import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, Phone, AlertCircle, Shield, Edit, Menu, X } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const UsersList = () => {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [viewMode, setViewMode] = useState(() => {
    const width = window.innerWidth;
    if (width < 640) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setViewMode('mobile');
      } else if (width < 1024) {
        setViewMode('tablet');
      } else {
        setViewMode('desktop');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required. Please login again.');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/user/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setUsers(response.data.data);
          setError(null);
        } else {
          setError(response.data.message || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error.response) {
          setError(error.response.data.message || 'Failed to fetch users');
        } else {
          setError('Network error. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/api/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setUsers(users.filter(user => user.id !== userId));
        setError(null);
      } else {
        setError(response.data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.response) {
        setError(error.response.data.message || 'Failed to delete user');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/user/${userId}/role`,
        { role: newRole },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ));
        setShowRoleModal(false);
        setError(null);
      } else {
        setError(response.data.message || 'Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      if (error.response) {
        setError(error.response.data.message || 'Failed to update role');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'TECHNICIAN':
        return 'bg-blue-100 text-blue-800';
      case 'USER':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderMobileUserCard = (user) => (
    <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
          }`}>
            <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
              {user.name.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {user.name}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {user.role}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedUser(user);
              setNewRole(user.role);
              setShowRoleModal(true);
            }}
            className={isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}
            title="Update role"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteUser(user.id)}
            className={isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}
            title="Delete user"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <Mail className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          {user.email}
        </div>
        <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <Phone className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          {user.phone || 'N/A'}
        </div>
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            user.status === 'Active' 
              ? isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800'
              : isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {user.status}
          </span>
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Tickets: {user.ticketsCreated || 0}
          </span>
        </div>
      </div>
    </div>
  );

  const renderTabletUserCard = (user) => (
    <div className={`relative flex flex-col min-w-[250px] rounded-xl shadow-md p-5 mb-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}> 
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}> 
            <span className={`text-lg font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{user.name.charAt(0)}</span>
          </div>
          <div className="ml-3">
            <div className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{user.name}</div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.role}</div>
          </div>
        </div>
        <div className="flex space-x-2 ml-2">
          <button onClick={() => { setSelectedUser(user); setNewRole(user.role); setShowRoleModal(true); }} className={isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} title="Update role">
            <Edit className="w-5 h-5" />
          </button>
          <button onClick={() => handleDeleteUser(user.id)} className={isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'} title="Delete user">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <Mail className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          {user.email}
        </div>
        <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <Phone className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          {user.phone || 'N/A'}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.status === 'Active' ? (isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800') : (isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800')}`}>{user.status}</span>
          <span className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="inline-block w-2 h-2 rounded-full bg-current opacity-60"></span>
            Tickets: {user.ticketsCreated || 0}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`p-4 sm:p-6 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white'}`}>
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center mb-6">
        <div className="flex items-center space-x-4">
          <Users className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Users</h1>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Manage and view all user accounts</p>
          </div>
        </div>
        
        <div className="relative w-full lg:w-64">
          <Search className={`absolute left-3 top-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search users..."
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500' 
                : 'border-gray-200'
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className={`mb-4 p-4 rounded-lg flex items-start ${
          isDarkMode ? 'bg-red-900/50 border-red-800' : 'bg-red-50 border-red-200'
        } border`}>
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
        </div>
      ) : (
        <div className={`rounded-lg shadow overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {viewMode === 'mobile' ? (
            <div className="p-4">
              {filteredUsers.length === 0 ? (
                <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No users found
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div key={user.id}>
                    {renderMobileUserCard(user)}
                  </div>
                ))
              )}
            </div>
          ) : viewMode === 'tablet' ? (
            <div className="p-4">
              {filteredUsers.length === 0 ? (
                <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  No users found
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id}>
                      {renderTabletUserCard(user)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>Name</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>ID</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>Contact</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>Role</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>Status</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>Tickets</th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-500'
                    }`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className={`px-6 py-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className={isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
                              }`}>
                                <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                                  {user.name.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            <code className={`px-2 py-1 rounded cursor-pointer ${
                              isDarkMode 
                                ? 'bg-gray-700 hover:bg-gray-600' 
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`} 
                              onClick={(e) => {
                                navigator.clipboard.writeText(user.id);
                                const el = e.target;
                                el.textContent = 'Copied!';
                                setTimeout(() => el.textContent = user.id, 1000);
                              }}>
                              {user.id}
                            </code>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm flex items-center ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                            <Mail className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            {user.email}
                          </div>
                          <div className={`text-sm flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Phone className={`w-4 h-4 mr-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            {user.phone || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                            <Shield className="w-3 h-3 mr-1" />
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'Active' 
                              ? isDarkMode ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-800'
                              : isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.ticketsCreated || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setNewRole(user.role);
                                setShowRoleModal(true);
                              }}
                              className={isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}
                              title="Update role"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className={isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}
                              title="Delete user"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-lg p-6 w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Update User Role</h3>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                User ID
              </label>
              <input
                type="text"
                value={selectedUser?.id || ''}
                disabled
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-300' 
                    : 'border-gray-300'
                }`}
              />
            </div>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                New Role
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-gray-300' 
                    : 'border-gray-300'
                }`}
              >
                <option value="">Select a role</option>
                <option value="ADMIN">Admin</option>
                <option value="TECHNICIAN">Technician</option>
                <option value="USER">User</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setSelectedUser(null);
                  setNewRole('');
                }}
                className={`px-4 py-2 ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Cancel
              </button>
              <button
                onClick={() => handleRoleUpdate(selectedUser.id, newRole)}
                className={`px-4 py-2 rounded-md ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Update Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList; 
import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, Phone, AlertCircle, Edit } from 'lucide-react';
import axios from 'axios';

const Technician = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required. Please login again.');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/user/technicians', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setTechnicians(response.data.data);
          setError(null);
        } else {
          setError(response.data.message || 'Failed to fetch technicians');
        }
      } catch (error) {
        console.error('Error fetching technicians:', error);
        if (error.response) {
          setError(error.response.data.message || 'Failed to fetch technicians');
        } else {
          setError('Network error. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  const handleDeleteTechnician = async (technicianId) => {
    if (!window.confirm('Are you sure you want to delete this technician?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/api/user/${technicianId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setTechnicians(technicians.filter(tech => tech.id !== technicianId));
        setError(null);
      } else {
        setError(response.data.message || 'Failed to delete technician');
      }
    } catch (error) {
      console.error('Error deleting technician:', error);
      if (error.response) {
        setError(error.response.data.message || 'Failed to delete technician');
      } else {
        setError('Network error. Please try again later.');
      }
    }
  };

  const handleRoleUpdate = async (technicianId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/api/user/${technicianId}/role`,
        { role: newRole },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setTechnicians(technicians.map(tech => 
          tech.id === technicianId ? { ...tech, role: newRole } : tech
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

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Users className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Technicians</h1>
            <p className="text-gray-500">Manage and view all technician accounts</p>
          </div>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search technicians..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tickets</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTechnicians.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No technicians found
                    </td>
                  </tr>
                ) : (
                  filteredTechnicians.map((technician) => (
                    <tr key={technician.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {technician.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{technician.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <code className="bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-gray-200" 
                                onClick={(e) => {
                                  navigator.clipboard.writeText(technician.id);
                                  const el = e.target;
                                  el.textContent = 'Copied!';
                                  setTimeout(() => el.textContent = technician.id, 1000);
                                }}>
                            {technician.id}
                          </code>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {technician.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {technician.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {technician.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          technician.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {technician.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {technician.ticketsAssigned || 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedTechnician(technician);
                              setNewRole(technician.role);
                              setShowRoleModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800"
                            title="Update role"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTechnician(technician.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete technician"
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
        </div>
      )}

      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Update Technician Role</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technician ID
              </label>
              <input
                type="text"
                value={selectedTechnician?.id || ''}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Role
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  setSelectedTechnician(null);
                  setNewRole('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRoleUpdate(selectedTechnician.id, newRole)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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

export default Technician; 
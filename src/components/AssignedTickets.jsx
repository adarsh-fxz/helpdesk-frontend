import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Search, AlertCircle, User } from 'lucide-react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const AssignedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [copiedPhone, setCopiedPhone] = useState(null);
  const navigate = useNavigate();
  const userRole = (localStorage.getItem('role') || '').toLowerCase();
  const isAdmin = userRole === 'admin';

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    fetchAssignedTickets();
  }, []);

  const fetchAssignedTickets = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3000/api/ticket/assigned', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch assigned tickets');
      }

      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        setTickets(result.data);
      } else {
        setTickets([]);
      }
    } catch (error) {
      console.error('Error fetching assigned tickets:', error);
      setError(error.message || 'Failed to load assigned tickets. Please try again.');
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const handleStatusUpdate = async (ticketId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ticket/${ticketId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update ticket status');
      }

      // Refresh the tickets list
      fetchAssignedTickets();
    } catch (error) {
      console.error('Error updating ticket status:', error);
      setError(error.message || 'Failed to update ticket status. Please try again.');
    }
  };

  const handleUnassign = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ticket/${ticketId}/unassign`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to unassign ticket');
      }

      // Refresh the tickets list
      fetchAssignedTickets();
    } catch (error) {
      console.error('Error unassigning ticket:', error);
      setError(error.message || 'Failed to unassign ticket. Please try again.');
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (isAdmin && ticket.assignedTo?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = selectedStatus === 'ALL' || ticket.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return 'bg-yellow-100 text-yellow-800';
      case 'ASSIGNED':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':
        return 'bg-purple-100 text-purple-800';
      case 'CLOSED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <ClipboardList className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              {isAdmin ? 'All Assigned Tickets' : 'My Assigned Tickets'}
            </h1>
            <p className="text-gray-500">
              {isAdmin ? 'View and manage all assigned tickets' : 'View and manage tickets assigned to you'}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder={isAdmin ? "Search by title, description or technician..." : "Search tickets..."}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-300"
          >
            <option value="ALL">All Status</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {filteredTickets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No assigned tickets found</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-4 justify-center">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-200 relative mx-auto max-w-sm w-full"
              style={{ minHeight: 380, maxHeight: 440, marginBottom: 18 }}
            >
              {/* Status badge at top right */}
              <span className={`absolute top-3 right-3 px-3 py-0.5 rounded-full text-xs font-bold shadow ${getStatusColor(ticket.status)} border border-gray-300 uppercase tracking-wide`} style={{letterSpacing: 1}}>
                {ticket.status.replace('_', ' ')}
              </span>

              {/* Image section */}
              {ticket.imageUrls && ticket.imageUrls.length > 0 && (
                <div className="relative h-32 w-full bg-gray-100">
                  <img
                    src={ticket.imageUrls[0]}
                    alt={ticket.title}
                    className="w-full h-full object-cover rounded-t-2xl border-b border-gray-200"
                  />
                </div>
              )}

              {/* Content section */}
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{ticket.title}</h3>
                <p className="text-gray-600 mb-2 break-words line-clamp-2" style={{minHeight: 32}}>{ticket.description}</p>

                {/* Location section */}
                {ticket.latitude && ticket.longitude && isLoaded ? (
                  <div className="h-24 mb-3 rounded-lg overflow-hidden border border-gray-200">
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={{ lat: ticket.latitude, lng: ticket.longitude }}
                      zoom={15}
                    >
                      <Marker position={{ lat: ticket.latitude, lng: ticket.longitude }} />
                    </GoogleMap>
                  </div>
                ) : (ticket.latitude && ticket.longitude &&
                  <div className="h-24 mb-3 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 text-gray-400 text-xs">
                    Map unavailable
                  </div>
                )}

                {/* Ticket details */}
                <div className="space-y-1 mb-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 font-medium">
                      Created by: <span className="text-gray-700 font-semibold">{ticket.createdBy?.name || 'Unknown'}</span>
                    </span>
                    {ticket.createdBy?.phone && (
                      <button
                        type="button"
                        className="text-xs text-blue-600 ml-1 hover:underline font-medium text-left focus:outline-none"
                        onClick={async () => {
                          await navigator.clipboard.writeText(ticket.createdBy.phone);
                          setCopiedPhone(ticket.id + '-creator');
                          setTimeout(() => setCopiedPhone(null), 1200);
                        }}
                      >
                        📞 {ticket.createdBy.phone}
                        {copiedPhone === ticket.id + '-creator' && (
                          <span className="ml-2 text-green-600 font-semibold">Copied!</span>
                        )}
                      </button>
                    )}
                  </div>
                  {isAdmin && (
                    <div className="flex flex-col space-y-1 bg-blue-50 p-1 rounded-md">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-blue-700 font-medium text-xs">
                          Assigned to: {ticket.assignedTo?.name || 'Unassigned'}
                        </span>
                      </div>
                      {ticket.assignedTo?.phone && (
                        <button
                          type="button"
                          className="text-xs text-blue-600 ml-6 hover:underline text-left focus:outline-none"
                          onClick={async () => {
                            await navigator.clipboard.writeText(ticket.assignedTo.phone);
                            setCopiedPhone(ticket.id);
                            setTimeout(() => setCopiedPhone(null), 1200);
                          }}
                        >
                          Phone: {ticket.assignedTo.phone}
                          {copiedPhone === ticket.id && (
                            <span className="ml-2 text-green-600 font-semibold">Copied!</span>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    <span className="text-xs text-gray-500">
                      <span className="font-medium">Location:</span> {ticket.location || 'Not specified'}
                    </span>
                    <span className="text-xs text-gray-500">
                      <span className="font-medium">Created:</span> {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-auto pt-3 border-t border-gray-200 gap-2">
                  <div className="flex space-x-2 mb-2 sm:mb-0">
                    <button
                      onClick={() => navigate(`/dashboard/ticket/${ticket.id}/edit`)}
                      className="text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-3 py-0.5 rounded-md text-xs font-semibold transition-colors duration-150"
                    >
                      View Details
                    </button>
                    {!isAdmin && (
                      <button
                        onClick={() => handleUnassign(ticket.id)}
                        className="text-red-600 hover:text-white hover:bg-red-600 border border-red-600 px-3 py-0.5 rounded-md text-xs font-semibold transition-colors duration-150"
                      >
                        Unassign
                      </button>
                    )}
                  </div>
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusUpdate(ticket.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white font-medium"
                  >
                    <option value="ASSIGNED">Assigned</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedTickets;
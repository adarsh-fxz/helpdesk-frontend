import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Search, AlertCircle, User, MessageSquare } from 'lucide-react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useTheme } from '../context/ThemeContext';
import Chat from './Chat';

const AssignedTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [copiedPhone, setCopiedPhone] = useState(null);
  const [selectedTicketForChat, setSelectedTicketForChat] = useState(null);
  const navigate = useNavigate();
  const userRole = (localStorage.getItem('role') || '').toLowerCase();
  const isAdmin = userRole === 'admin';
  const { isDarkMode } = useTheme();

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
    if (isDarkMode) {
      switch (status) {
        case 'OPEN': return 'bg-yellow-900 text-yellow-200 border-yellow-700';
        case 'ASSIGNED': return 'bg-blue-900 text-blue-200 border-blue-700';
        case 'IN_PROGRESS': return 'bg-purple-900 text-purple-200 border-purple-700';
        case 'CLOSED': return 'bg-green-900 text-green-200 border-green-700';
        default: return 'bg-gray-800 text-gray-300 border-gray-700';
      }
    } else {
      switch (status) {
        case 'OPEN': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'ASSIGNED': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'IN_PROGRESS': return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'CLOSED': return 'bg-green-100 text-green-800 border-green-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-64 ${isDarkMode ? 'bg-gray-900' : ''}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
      </div>
    );
  }

  return (
    <div className={`p-6 min-h-screen flex justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <ClipboardList className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{isAdmin ? 'All Assigned Tickets' : 'My Assigned Tickets'}</h1>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{isAdmin ? 'View and manage all assigned tickets' : 'View and manage tickets assigned to you'}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className={`absolute left-3 top-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder={isAdmin ? "Search by title, description or technician..." : "Search tickets..."}
                className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600 transition-colors
                  ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600 transition-colors
                ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-900'}`}
            >
              <option value="ALL">All Status</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        {error && (
          <div className={`mb-4 p-4 flex items-start rounded-lg border ${isDarkMode ? 'bg-red-900/40 border-red-700' : 'bg-red-50 border-red-200'}`}> 
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
            <p className={`${isDarkMode ? 'text-red-300' : 'text-red-600'}`}>{error}</p>
          </div>
        )}

        {filteredTickets.length === 0 ? (
          <div className="text-center py-16">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>No assigned tickets found</p>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full border relative mx-auto max-w-md w-full
                  ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{ minHeight: 420, marginBottom: 32 }}
              >
                {/* Status badge at top right */}
                <span className={`absolute top-5 right-5 px-4 py-1 rounded-full text-xs font-bold shadow border uppercase tracking-wide ${getStatusColor(ticket.status)}`} style={{letterSpacing: 1}}>
                  {ticket.status.replace('_', ' ')}
                </span>

                {/* Image section */}
                {ticket.imageUrls && ticket.imageUrls.length > 0 && (
                  <div className="relative h-40 w-full rounded-t-3xl overflow-hidden">
                    <img
                      src={ticket.imageUrls[0]}
                      alt={ticket.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Content section */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{ticket.title}</h3>
                  <p className={`mb-4 text-base line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{ticket.description}</p>

                  {/* Location section */}
                  {ticket.latitude && ticket.longitude && isLoaded ? (
                    <div className="h-28 mb-4 rounded-xl overflow-hidden border shadow-sm">
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={{ lat: ticket.latitude, lng: ticket.longitude }}
                        zoom={15}
                      >
                        <Marker position={{ lat: ticket.latitude, lng: ticket.longitude }} />
                      </GoogleMap>
                    </div>
                  ) : (ticket.latitude && ticket.longitude &&
                    <div className="h-28 mb-4 flex items-center justify-center rounded-xl border text-xs">
                      <span className="text-gray-400">Map unavailable</span>
                    </div>
                  )}

                  {/* Ticket details */}
                  <div className="space-y-2 mb-4">
                    {/* Non-admin: Avatar, name, phone stacked, chat button right-aligned */}
                    {!isAdmin && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900' : 'bg-blue-200'}`}> 
                            <span className={`text-base font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}> 
                              {ticket.createdBy?.name?.charAt(0)?.toUpperCase() || '?'}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-base">{ticket.createdBy?.name || 'Unknown'}</span>
                            {ticket.createdBy?.phone && (
                              <span className={`flex items-center gap-1 text-xs mt-0.5 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.789 1.106l1.387 2.773a2 2 0 01-.327 2.327l-.94.94a16.001 16.001 0 006.586 6.586l.94-.94a2 2 0 012.327-.327l2.773 1.387A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" /></svg>
                                <button
                                  type="button"
                                  className={`focus:outline-none hover:underline transition-colors cursor-pointer`
                                    + (isDarkMode ? ' text-blue-200 hover:text-blue-400' : ' text-blue-600 hover:text-blue-800')}
                                  onClick={async () => {
                                    await navigator.clipboard.writeText(ticket.createdBy.phone);
                                    setCopiedPhone(ticket.id + '-creator');
                                    setTimeout(() => setCopiedPhone(null), 1200);
                                  }}
                                >
                                  {ticket.createdBy.phone}
                                  {copiedPhone === ticket.id + '-creator' && (
                                    <span className={`ml-2 font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>Copied!</span>
                                  )}
                                </button>
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedTicketForChat(ticket)}
                          className={`ml-2 p-2 rounded-full transition-colors duration-200 cursor-pointer border border-blue-600 flex items-center justify-center
                            ${isDarkMode ? 'text-blue-300 hover:text-blue-400 bg-blue-900' : 'text-blue-600 hover:text-blue-700 bg-blue-100'}`}
                          title="Chat"
                        >
                          <MessageSquare className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    {/* Admin: Avatar, name, phone stacked, chat button right-aligned */}
                    {isAdmin && (
                      <div className={`flex items-center justify-between p-2 rounded-md ${isDarkMode ? 'bg-blue-950' : 'bg-blue-50'}`}> 
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-900' : 'bg-blue-200'}`}> 
                            <span className={`text-base font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}> 
                              {ticket.assignedTo?.name?.charAt(0)?.toUpperCase() || '?'}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-base">{ticket.assignedTo?.name || 'Unassigned'}</span>
                            {ticket.assignedTo?.phone && (
                              <span className={`flex items-center gap-1 text-xs mt-0.5 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.789 1.106l1.387 2.773a2 2 0 01-.327 2.327l-.94.94a16.001 16.001 0 006.586 6.586l.94-.94a2 2 0 012.327-.327l2.773 1.387A2 2 0 0121 18.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z" /></svg>
                                <button
                                  type="button"
                                  className={`focus:outline-none hover:underline transition-colors cursor-pointer`
                                    + (isDarkMode ? ' text-blue-200 hover:text-blue-400' : ' text-blue-600 hover:text-blue-800')}
                                  onClick={async () => {
                                    await navigator.clipboard.writeText(ticket.assignedTo.phone);
                                    setCopiedPhone(ticket.id);
                                    setTimeout(() => setCopiedPhone(null), 1200);
                                  }}
                                >
                                  {ticket.assignedTo.phone}
                                  {copiedPhone === ticket.id && (
                                    <span className={`ml-2 font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>Copied!</span>
                                  )}
                                </button>
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedTicketForChat(ticket)}
                          className={`ml-2 p-2 rounded-full transition-colors duration-200 cursor-pointer border border-blue-600 flex items-center justify-center
                            ${isDarkMode ? 'text-blue-300 hover:text-blue-400 bg-blue-900' : 'text-blue-600 hover:text-blue-700 bg-blue-100'}`}
                          title="Chat"
                        >
                          <MessageSquare className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-500">Location:</span>
                      <span>{ticket.location || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-500">Created:</span>
                      <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-center mt-auto pt-4 border-t gap-3">
                    <div className="flex space-x-2 mb-2 sm:mb-0">
                      {!isAdmin && (
                        <button
                          onClick={() => handleUnassign(ticket.id)}
                          className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-colors duration-150 cursor-pointer
                            ${isDarkMode ? 'text-red-300 border-red-700 hover:bg-red-700 hover:text-white' : 'text-red-600 border-red-600 hover:bg-red-600 hover:text-white'}`}
                        >
                          Unassign
                        </button>
                      )}
                    </div>
                    <select
                      value={ticket.status}
                      onChange={(e) => handleStatusUpdate(ticket.id, e.target.value)}
                      className={`text-sm border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 font-medium transition-colors
                        ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-100 focus:ring-blue-800' : 'border-gray-300 bg-white text-gray-900 focus:ring-blue-200'}`}
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

      {/* Chat Modal */}
      {selectedTicketForChat && (
        <Chat
          ticketId={selectedTicketForChat.id}
          onClose={() => setSelectedTicketForChat(null)}
        />
      )}
    </div>
  );
};

export default AssignedTickets;
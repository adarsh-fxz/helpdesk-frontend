import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const OpenTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userRole = (localStorage.getItem('role') || '').toLowerCase();
  const userId = localStorage.getItem('userId');

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const fetchOpenTickets = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3000/api/ticket/open', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch open tickets');
      }

      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        setTickets(result.data);
        setFilteredTickets(result.data);
      } else {
        setTickets([]);
        setFilteredTickets([]);
      }
    } catch (error) {
      console.error('Error fetching open tickets:', error);
      setError('Failed to load open tickets. Please try again.');
      setTickets([]);
      setFilteredTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    if (status === 'ALL') {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(tickets.filter(ticket => ticket.status === status));
    }
  };

  const handleStatusUpdate = async (ticketId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ticket/${ticketId}/status`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }

      // Refresh the ticket list
      fetchOpenTickets();
    } catch (error) {
      console.error('Error updating ticket status:', error);
      setError('Failed to update ticket status. Please try again.');
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/ticket/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete ticket');
      }

      // Refresh the ticket list
      fetchOpenTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
      setError('Failed to delete ticket. Please try again.');
    }
  };

  // Assign ticket to self (for technicians)
  const handleAssignToSelf = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ticket/${ticketId}/assign`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ technicianId: userId })
      });
      if (!response.ok) {
        throw new Error('Failed to assign ticket');
      }
      fetchOpenTickets();
    } catch (error) {
      setError('Failed to assign ticket. Please try again.');
    }
  };

  useEffect(() => {
    fetchOpenTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm">
        {error}
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">No Open Tickets</h3>
        <p className="mt-1 text-sm text-gray-500">There are currently no open tickets to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Section */}
      <div className="flex justify-end px-4">
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="OPEN">Open</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-4 justify-center">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 relative mx-auto max-w-md w-full"
            style={{ minHeight: 520, maxHeight: 600 }}
          >
            {/* Status badge at top right */}
            <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-sm
              ${ticket.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                ticket.status === 'ASSIGNED' ? 'bg-blue-100 text-blue-800' :
                ticket.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'}
            `}>
              {ticket.status}
            </span>

            <div className="p-4 flex flex-col flex-1 overflow-y-auto">
              {/* Title & Description */}
              <h3 className="text-base font-bold text-gray-900 mb-1 truncate">{ticket.title}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2 min-h-[2.5em]">{ticket.description}</p>

              {/* Creator */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">
                    {ticket.createdBy?.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
                <span className="text-xs text-gray-600 font-medium">{ticket.createdBy?.name || 'Unknown'}</span>
              </div>

              {/* Location & Map */}
              {ticket.location && (
                <div className="mb-2">
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {ticket.location}
                  </div>
                  {ticket.latitude && ticket.longitude && isLoaded && (
                    <div className="h-28 rounded-lg overflow-hidden border border-gray-200 mb-1">
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={{ lat: ticket.latitude, lng: ticket.longitude }}
                        zoom={15}
                      >
                        <Marker position={{ lat: ticket.latitude, lng: ticket.longitude }} />
                      </GoogleMap>
                    </div>
                  )}
                </div>
              )}

              {/* Images */}
              {ticket.imageUrls && ticket.imageUrls.length > 0 && (
                <div className="mb-2">
                  <div className="grid grid-cols-1 gap-1">
                    {ticket.imageUrls.map((url, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={url}
                          alt={`Ticket image ${index + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-gray-100 my-1"></div>

              {/* Footer: Date & Actions */}
              <div className="flex items-center justify-between mt-auto pt-1">
                <div className="text-xs text-gray-500">
                  <span>Created on </span>
                  <span className="font-medium">{new Date(ticket.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => navigate(`/dashboard/ticket/${ticket.id}/edit`)}
                    className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                    title="Edit ticket"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  {/* Assign to Myself button for technicians */}
                  {userRole === 'technician' && String(ticket.assignedToId) !== String(userId) && (
                    <button
                      onClick={() => handleAssignToSelf(ticket.id)}
                      className="p-1 text-gray-400 hover:text-green-500 transition-colors duration-200"
                      title="Assign to Myself"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  )}
                  {userRole === 'admin' && (
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      title="Delete ticket"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenTickets; 
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { ClipboardList, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3000/api/ticket/my-tickets', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setTickets(result.data);
      } else {
        setTickets([]);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setError('Failed to load tickets. Please try again.');
      setTickets([]);
    } finally {
      setLoading(false);
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
      fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
      setError('Failed to delete ticket. Please try again.');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-64 ${isDarkMode ? 'bg-gray-800' : ''}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`border px-4 py-3 rounded-lg shadow-sm ${isDarkMode ? 'bg-red-900/40 border-red-700 text-red-300' : 'bg-red-100 border-red-400 text-red-700'}`}>{error}</div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className={`rounded-lg shadow-lg p-8 text-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>No Tickets Yet</h3>
        <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>You haven't created any tickets yet.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 p-2 sm:p-4 md:p-8 min-h-screen ${isDarkMode ? 'bg-gray-800' : ''}`}>
      {/* Topic Card Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
        <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-0">
          <ClipboardList className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
          <div>
            <h1 className={`text-xl md:text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>My Tickets</h1>
            <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage and view your tickets</p>
          </div>
        </div>
      </div>
      {/* Tickets Grid */}
      <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 sm:p-4 justify-center">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full border relative mx-auto w-full
              ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-100'}`}
            style={{ minHeight: 'auto', maxHeight: 'none' }}
          >
            {/* Status badge at top right */}
            <span className={`absolute top-3 right-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold shadow-sm
              ${ticket.status === 'OPEN' ? (isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                ticket.status === 'ASSIGNED' ? (isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800') :
                ticket.status === 'IN_PROGRESS' ? (isDarkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800') :
                isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800'}
            `}>
              {ticket.status}
            </span>

            <div className="p-3 sm:p-4 flex flex-col flex-1 overflow-y-auto">
              {/* Title & Description */}
              <h3 className={`text-sm sm:text-base font-bold mb-1 break-words whitespace-normal ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{ticket.title}</h3>
              <p className={`text-xs sm:text-sm mb-2 line-clamp-2 min-h-[2.5em] ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{ticket.description}</p>

              {/* Creator */}
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-blue-950' : 'bg-blue-100'}`}> 
                  <span className={`text-xs font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}> 
                    {ticket.createdBy?.name?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
                <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{ticket.createdBy?.name || 'Unknown'}</span>
              </div>

              {/* Assigned Technician */}
              {ticket.assignedTo?.name && (
                <div className={`flex flex-col rounded-md px-2 py-1 mb-2 ${isDarkMode ? 'bg-blue-950' : 'bg-blue-50'}`}>
                  <span className={`text-xs font-semibold ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                    Assigned to: {ticket.assignedTo.name}
                  </span>
                  {ticket.assignedTo.phone && (
                    <button
                      type="button"
                      className={`text-xs text-left focus:outline-none hover:underline ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
                      onClick={async () => {
                        await navigator.clipboard.writeText(ticket.assignedTo.phone);
                        setCopiedPhone(ticket.id);
                        setTimeout(() => setCopiedPhone(null), 1200);
                      }}
                    >
                      📞 {ticket.assignedTo.phone}
                      {copiedPhone === ticket.id && (
                        <span className={`ml-2 font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-600'}`}>Copied!</span>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Location & Map */}
              {ticket.location && (
                <div className="mb-2">
                  <div className={`flex items-center text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {ticket.location}
                  </div>
                  {ticket.latitude && ticket.longitude && isLoaded && (
                    <div className={`h-24 sm:h-28 rounded-lg overflow-hidden border mb-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
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
                      <div key={index} className={`relative aspect-video rounded-lg overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
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
              <div className={`border-t my-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}></div>

              {/* Footer: Date & Actions */}
              <div className="flex items-center justify-between mt-auto pt-1">
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}> 
                  <span>Created on </span>
                  <span className="font-medium">{new Date(ticket.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => navigate(`/dashboard/ticket/${ticket.id}/edit`)}
                    className={`p-1 transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-500'}`}
                    title="Edit ticket"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className={`p-1 transition-colors duration-200 ${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'}`}
                    title="Delete ticket"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets; 
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import TicketDetail from './TicketDetail';

const OpenTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchOpenTickets = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3000/api/ticket/open', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch open tickets');

      const result = await response.json();
      setTickets(result.success && Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error('Error fetching open tickets:', err);
      setError('Failed to load open tickets. Please try again.');
      setTickets([]);
    } finally {
      setLoading(false);
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

      if (!response.ok) throw new Error('Failed to update ticket status');

      fetchOpenTickets();
    } catch (err) {
      console.error('Error updating ticket status:', err);
      setError('Failed to update ticket status. Please try again.');
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/ticket/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete ticket');

      fetchOpenTickets();
    } catch (err) {
      console.error('Error deleting ticket:', err);
      setError('Failed to delete ticket. Please try again.');
    }
  };

  useEffect(() => {
    fetchOpenTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
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

  const statusCounts = {
    OPEN: tickets.filter(t => t.status === 'OPEN').length,
    IN_PROGRESS: tickets.filter(t => t.status === 'IN_PROGRESS').length,
    RESOLVED: tickets.filter(t => t.status === 'RESOLVED').length,
    CLOSED: tickets.filter(t => t.status === 'CLOSED').length,
  };
  const totalTickets = tickets.length;
  const getPercentage = (count) => totalTickets > 0 ? ((count / totalTickets) * 100).toFixed(0) + '%' : '0%';

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center p-4 bg-white rounded-lg shadow-md border border-gray-100">
      <input
          type="text"
          placeholder="Search tickets..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap gap-3">
          <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Statuses</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
          
        </div>
        
      </div>
      <div className="flex mb-6 space-x-4 text-sm">
        <div className="flex-1 text-center p-4 bg-white rounded-lg shadow">
          <span className="text-blue-600 font-bold">Open</span>
          <div className="text-gray-600">{getPercentage(statusCounts.OPEN)}</div>
          <div className="text-gray-500">{statusCounts.OPEN}</div>
        </div>
        <div className="flex-1 text-center p-4 bg-yellow-50 rounded-lg shadow">
          <span className="text-yellow-600 font-bold">In Progress</span>
          <div className="text-gray-600">{getPercentage(statusCounts.IN_PROGRESS)}</div>
          <div className="text-gray-500">{statusCounts.IN_PROGRESS}</div>
        </div>
        <div className="flex-1 text-center p-4 bg-green-50 rounded-lg shadow">
          <span className="text-green-600 font-bold">Resolved</span>
          <div className="text-gray-600">{getPercentage(statusCounts.RESOLVED)}</div>
          <div className="text-gray-500">{statusCounts.RESOLVED}</div>
        </div>
        <div className="flex-1 text-center p-4 bg-gray-50 rounded-lg shadow">
          <span className="text-gray-600 font-bold">Closed</span>
          <div className="text-gray-600">{getPercentage(statusCounts.CLOSED)}</div>
          <div className="text-gray-500">{statusCounts.CLOSED}</div>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <div 
            key={ticket._id} 
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 pr-4 cursor-pointer" onClick={() => navigate(`/dashboard/ticket/${ticket._id}`)}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{ticket.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2">Assigned to IT Team</p>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => navigate(`/dashboard/ticket/${ticket._id}/edit`)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                    title="Edit ticket"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(ticket._id, 'IN_PROGRESS')}
                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
                    title="Start working"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <NavLink
                    to={`/dashboard/ticket/${ticket._id}`}
                    className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
                    title="View details"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-inner">
                    <span className="text-sm font-medium text-blue-600">
                      {ticket.createdBy?.name?.[0]?.toUpperCase() || '?'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{ticket.createdBy?.name || 'Unknown'}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-800' :
                  ticket.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                  ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
              {Array.isArray(ticket.imageUrls) && ticket.imageUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {ticket.imageUrls.map((url, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={url}
                        alt={`Ticket image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Created on</span>
                  <span className="font-medium text-gray-600">
                    {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 mt-2">
                  <span>Updated</span>
                  <span className="font-medium text-gray-600">{ticket.updatedAt || 'Not updated'}</span>
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
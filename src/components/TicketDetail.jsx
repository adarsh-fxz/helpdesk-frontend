import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTicketDetails = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`http://localhost:3000/api/ticket/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch ticket details');

      const result = await response.json();
      if (result.success) {
        setTicket(result.data);
      } else {
        throw new Error('Ticket not found');
      }
    } catch (err) {
      console.error('Error fetching ticket details:', err);
      setError(err.message);
      setTicket(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ticket/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error('Failed to update ticket status');

      fetchTicketDetails();
    } catch (err) {
      console.error('Error updating ticket status:', err);
      setError('Failed to update ticket status. Please try again.');
    }
  };

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm">
          {error}
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg shadow-sm">
          Ticket not found
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ticket Details</h1>
          <p className="text-gray-500">Ticket ID: {ticket._id}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-800' :
            ticket.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
            ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {ticket.status.replace('_', ' ')}
          </span>
          <select
            value={ticket.status}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">User Information</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-24 text-gray-500">Name:</span>
              <span className="font-medium">{ticket.createdBy?.name || 'Unknown'}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-gray-500">Email:</span>
              <span className="font-medium">{ticket.createdBy?.email || 'Not provided'}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-gray-500">Phone:</span>
              <span className="font-medium">{ticket.createdBy?.phone || 'Not provided'}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Ticket Information</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="w-24 text-gray-500">Title:</span>
              <span className="font-medium">{ticket.title}</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-gray-500">Priority:</span>
              <span className={`font-medium ${
                ticket.priority === 'HIGH' ? 'text-red-600' :
                ticket.priority === 'MEDIUM' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {ticket.priority || 'Not specified'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-gray-500">Category:</span>
              <span className="font-medium">{ticket.category || 'Not specified'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Problem Description</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 whitespace-pre-line">{ticket.description}</p>
        </div>
      </div>

      {Array.isArray(ticket.imageUrls) && ticket.imageUrls.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Attachments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ticket.imageUrls.map((url, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={url}
                  alt={`Ticket attachment ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Created At</h2>
          <p className="text-gray-600">
            {new Date(ticket.createdAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Last Updated</h2>
          <p className="text-gray-600">
            {new Date(ticket.updatedAt).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => navigate(`/dashboard/ticket/${ticket._id}/edit`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Edit Ticket
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TicketDetail;
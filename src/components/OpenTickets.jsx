import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

      if (!response.ok) {
        throw new Error('Failed to fetch open tickets');
      }

      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        setTickets(result.data);
      } else {
        setTickets([]);
      }
    } catch (error) {
      console.error('Error fetching open tickets:', error);
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

      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }


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
      

      fetchOpenTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
      setError('Failed to delete ticket. Please try again.');
    }
  };

  useEffect(() => {
    fetchOpenTickets();
  }, []);

  // Group tickets by status
  const groupedTickets = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.status]) {
      acc[ticket.status] = [];
    }
    acc[ticket.status].push(ticket);
    return acc;
  }, {});

  // Define status columns in the order we want them displayed
  const statusColumns = [
    { id: 'OPEN', title: 'Open', color: 'orange' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'yellow' },
    { id: 'RESOLVED', title: 'Resolved', color: 'green' },
    { id: 'CLOSED', title: 'Closed', color: 'gray' }
  ];

  // Calculate percentages for each status
  const totalTickets = tickets.length;
  const statusPercentages = statusColumns.reduce((acc, status) => {
    const count = groupedTickets[status.id]?.length || 0;
    acc[status.id] = totalTickets > 0 ? Math.round((count / totalTickets) * 100) : 0;
    return acc;
  }, {});

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
    <div className="space-y-6">
      {/* Status Summary Section */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium">All Statuses</div>
          <div className="text-sm text-gray-500">Newest First</div>
        </div>
        <button className="text-sm text-blue-500 hover:text-blue-700">Advanced Filters</button>
      </div>
  
      {/* Status Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statusColumns.map((status) => (
          <div key={status.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">
                {status.title} <span className="text-gray-500">{groupedTickets[status.id]?.length || 0}</span>
              </h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {statusPercentages[status.id]}%
              </span>
            </div>
            
            {/* Ticket Cards */}
            <div className="space-y-4">
              {groupedTickets[status.id]?.map((ticket) => (
                <div key={ticket._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-blue-600">#{ticket.ticketId}</h4>
                    <span className={`text-xs bg-${status.color}-100 text-${status.color}-800 px-2 py-1 rounded`}>
                      {status.title}
                    </span>
                  </div>
                  <h5 className="font-medium mb-2">{ticket.title}</h5>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-2" checked={ticket.assignedTo} readOnly />
                      <span>Assigned to {ticket.assignedTo || 'IT Team'}</span>
                    </li>
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-2" checked={ticket.updatedAt} readOnly />
                      <span>
                        Updated {ticket.updatedAt ? 
                        new Date(ticket.updatedAt).toLocaleDateString() : 
                        'N/A'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <input type="checkbox" className="mr-2" checked={ticket.createdAt} readOnly />
                      <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </li>
                  </ul>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => navigate(`/dashboard/ticket/${ticket._id}/edit`)}
                      className="text-xs text-blue-500 hover:text-blue-700"
                      title="Edit ticket"
                    >
                      Edit
                    </button>
                    {status.id !== 'CLOSED' && (
                      <button
                        onClick={() => handleStatusUpdate(ticket._id, 
                          status.id === 'OPEN' ? 'IN_PROGRESS' : 
                          status.id === 'IN_PROGRESS' ? 'RESOLVED' : 'CLOSED')}
                        className="text-xs text-green-500 hover:text-green-700"
                        title="Update status"
                      >
                        {status.id === 'OPEN' ? 'Start' : 
                         status.id === 'IN_PROGRESS' ? 'Resolve' : 'Close'}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(ticket._id)}
                      className="text-xs text-red-500 hover:text-red-700"
                      title="Delete ticket"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenTickets;
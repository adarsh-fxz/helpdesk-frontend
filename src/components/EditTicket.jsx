import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    imageUrls: []
  });
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/ticket/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch ticket');
        }

        const result = await response.json();
        if (result.success) {
          setTicket(result.data);
          setFormData({
            title: result.data.title,
            description: result.data.description,
            status: result.data.status,
            imageUrls: result.data.imageUrls || []
          });
        }
      } catch (error) {
        console.error('Error fetching ticket:', error);
        setError('Failed to load ticket details');
      } finally {
        setLoading(false);
      }
    };

    // Fetch user role and ID
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const result = await response.json();
        if (result.success) {
          setUserRole(result.data.role);
          setUserId(result.data.id);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchTicket();
    fetchUserProfile();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // If user is not the creator, only send status update
      const updateData = isCreator 
        ? formData 
        : { status: formData.status };

      const response = await fetch(`http://localhost:3000/api/ticket/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update ticket');
      }

      setSuccess('Ticket updated successfully');
      // Refresh ticket data
      const updatedResponse = await fetch(`http://localhost:3000/api/ticket/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedResult = await updatedResponse.json();
      if (updatedResult.success) {
        setTicket(updatedResult.data);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      setError('Failed to update ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = value;
    setFormData(prev => ({ ...prev, imageUrls: newImageUrls }));
  };

  const addImageUrlField = () => {
    setFormData(prev => ({
      ...prev,
      imageUrls: [...prev.imageUrls, '']
    }));
  };

  const removeImageUrlField = (index) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-64 ${isDarkMode ? 'bg-gray-900' : ''}`}>
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-500'}`}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`border px-4 py-3 rounded-lg shadow-sm ${isDarkMode ? 'bg-red-900/40 border-red-700 text-red-300' : 'bg-red-100 border-red-400 text-red-700'}`}>{error}</div>
    );
  }

  if (!ticket) {
    return (
      <div className={`rounded-lg shadow-lg p-8 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-lg font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Ticket Not Found</h3>
        <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>The ticket you're looking for doesn't exist.</p>
      </div>
    );
  }

  const isCreator = ticket.createdBy.id === userId;
  const canUpdateStatus = userRole === 'ADMIN' || userRole === 'TECHNICIAN';
  const canEdit = isCreator || canUpdateStatus;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-2xl mx-auto mt-8 rounded-lg shadow p-6 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`mr-4 px-3 py-1 rounded-md border transition-colors focus:outline-none focus:ring-2
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 focus:ring-gray-600'
                : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 focus:ring-gray-200'
              }`}
          >
            ← Back
          </button>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Edit Ticket</h2>
        </div>

        {success && (
          <div className={`border px-4 py-3 rounded mb-4 ${isDarkMode ? 'bg-green-900/40 border-green-700 text-green-300' : 'bg-green-100 border-green-400 text-green-700'}`}>{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`mt-1 block w-full px-4 py-2 rounded-md border shadow-sm transition-colors
                ${isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-900'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-200'
                }`}
              required
              disabled={!isCreator}
            />
          </div>

          <div>
            <label htmlFor="description" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className={`mt-1 block w-full px-4 py-2 rounded-md border shadow-sm transition-colors
                ${isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-900'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-200'
                }`}
              required
              disabled={!isCreator}
            />
          </div>

          {(canUpdateStatus || isCreator) && (
            <div>
              <label htmlFor="status" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className={`mt-1 block w-full px-4 py-2 rounded-md border shadow-sm transition-colors
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-blue-500 focus:ring-blue-900'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-200'
                  }`}
              >
                <option value="OPEN">Open</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
          )}

          {isCreator && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Image URLs</label>
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    placeholder="Enter image URL"
                    className={`flex-1 px-4 py-2 rounded-md border shadow-sm transition-colors
                      ${isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-900'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-200'
                      }`}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeImageUrlField(index)}
                      className={`px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors
                        ${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageUrlField}
                className={`mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors
                  ${isDarkMode ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                + Add another image URL
              </button>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !canEdit}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-colors ${
                (loading || !canEdit) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Updating...' : 'Update Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTicket; 
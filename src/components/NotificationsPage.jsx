import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3000/api/notification', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch notifications');
      }

      const data = await response.json();
      if (data.success) {
        setNotifications(data.data);
      } else {
        throw new Error(data.message || 'Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError(error.message);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      setError(null);
      const response = await fetch(`http://localhost:3000/api/notification/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to mark notification as read');
      }

      await fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
      setError(error.message);
    }
  };

  const markAllAsRead = async () => {
    try {
      setError(null);
      const response = await fetch('http://localhost:3000/api/notification/read-all', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to mark all notifications as read');
      }

      await fetchNotifications();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'bg-gray-800' : ''}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-gray-900' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : ''}`}>Notifications</h1>
        {notifications.some(n => !n.isRead) && (
          <button
            onClick={markAllAsRead}
            className={`px-4 py-2 text-sm font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}
          >
            Mark all as read
          </button>
        )}
      </div>

      {error && (
        <div className={`mb-6 p-4 rounded-lg ${isDarkMode ? 'bg-red-900/40 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors
                ${isDarkMode
                  ? !notification.isRead
                    ? 'bg-blue-950 border-blue-900'
                    : 'bg-gray-800 border-gray-700'
                  : !notification.isRead
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white border-gray-200'}
              `}
            >
              <p className={`${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{notification.message}</p>
              <div className="flex justify-between items-center mt-3">
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(notification.createdAt).toLocaleString()}</span>
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className={`text-sm font-medium ${isDarkMode ? 'text-blue-400 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage; 
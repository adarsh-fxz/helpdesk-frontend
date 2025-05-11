import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, Send, Loader2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Feedback = () => {
  const { isDarkMode } = useTheme();
  const [feedback, setFeedback] = useState({
    subject: '',
    message: '',
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentFeedbacks();
  }, []);

  const fetchRecentFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/feedback', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRecentFeedbacks(data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(feedback),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFeedback({ subject: '', message: '', rating: 5 });
        fetchRecentFeedbacks(); // Refresh the list after submitting
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`p-6 min-h-screen font-sans ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="max-w-2xl mx-auto">
        <h1 className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Provide Feedback
        </h1>
        <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Help us improve by sharing your thoughts and suggestions
        </p>

        <form onSubmit={handleSubmit} className={`space-y-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {/* Subject Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Subject
            </label>
            <input
              type="text"
              value={feedback.subject}
              onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
              placeholder="What's your feedback about?"
              required
            />
          </div>

          {/* Rating Section */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              How would you rate your experience?
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFeedback({ ...feedback, rating: star })}
                  className={`p-2 rounded-full transition-colors ${
                    feedback.rating >= star
                      ? isDarkMode
                        ? 'text-yellow-400 hover:text-yellow-300'
                        : 'text-yellow-500 hover:text-yellow-400'
                      : isDarkMode
                      ? 'text-gray-600 hover:text-gray-500'
                      : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  <Star className="w-6 h-6" fill={feedback.rating >= star ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your Feedback
            </label>
            <textarea
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-300 dark:focus:border-blue-600
                ${isDarkMode 
                  ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
              rows="4"
              placeholder="Share your thoughts, suggestions, or concerns..."
              required
            />
          </div>

          {/* Status Message */}
          {submitStatus === 'success' && (
            <div className={`p-3 rounded-lg text-sm ${
              isDarkMode
                ? 'bg-green-900/50 text-green-400'
                : 'bg-green-50 text-green-700'
            }`}>
              <p className="font-medium">Thank you for your feedback!</p>
              <p className="text-sm mt-1">We appreciate your input and will use it to improve our service.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className={`p-3 rounded-lg text-sm ${
              isDarkMode
                ? 'bg-red-900/50 text-red-400'
                : 'bg-red-50 text-red-700'
            }`}>
              <p className="font-medium">Failed to submit feedback</p>
              <p className="text-sm mt-1">Please try again later or contact support if the problem persists.</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isSubmitting
                  ? isDarkMode
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : isDarkMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Recent Feedbacks Section */}
        <div className={`mt-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
          <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Recent Feedbacks</h3>
          
          {isLoading ? (
            <div className="text-center py-4">
              <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'} mx-auto`}></div>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading feedbacks...</p>
            </div>
          ) : recentFeedbacks.length === 0 ? (
            <p className={`text-center py-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No feedbacks yet. Be the first to share your thoughts!
            </p>
          ) : (
            <div className="space-y-6">
              {recentFeedbacks.map((item) => (
                <div 
                  key={item.id} 
                  className={`border rounded-lg p-6 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 hover:border-blue-600' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                        {item.subject}
                      </h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        By {item.user.name} • {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`}
                          fill={index < item.rating ? "currentColor" : isDarkMode ? "#4B5563" : "#E5E7EB"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback; 
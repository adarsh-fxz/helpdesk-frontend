import React, { useState, useEffect } from 'react';
import { MessageSquare, Star } from 'lucide-react';

const Feedback = () => {
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
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full">
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">Send Feedback</h2>
            <p className="text-gray-600">Help us improve by sharing your thoughts</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={feedback.subject}
              onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="What's your feedback about?"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Tell us more about your experience..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFeedback({ ...feedback, rating })}
                  className={`p-2 rounded-full transition-colors ${
                    feedback.rating >= rating
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  <Star className="w-6 h-6" fill={feedback.rating >= rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>

          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
              <p className="font-medium">Thank you for your feedback!</p>
              <p className="text-sm mt-1">We appreciate your input and will use it to improve our service.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              <p className="font-medium">Failed to submit feedback</p>
              <p className="text-sm mt-1">Please try again later or contact support if the problem persists.</p>
            </div>
          )}
        </form>
      </div>

      {/* Recent Feedbacks Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Feedbacks</h3>
        
        {isLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading feedbacks...</p>
          </div>
        ) : recentFeedbacks.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No feedbacks yet. Be the first to share your thoughts!</p>
        ) : (
          <div className="space-y-6">
            {recentFeedbacks.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.subject}</h4>
                    <p className="text-sm text-gray-600">
                      By {item.user.name} • {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-4 h-4"
                        fill={index < item.rating ? '#FCD34D' : '#E5E7EB'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{item.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback; 
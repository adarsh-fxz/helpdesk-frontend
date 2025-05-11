import React, { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Chat = ({ ticketId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const { isDarkMode } = useTheme();
  const userId = localStorage.getItem('userId');
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    // Connect to WebSocket
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onopen = () => {
      setIsConnected(true);
      // Join the room
      ws.send(JSON.stringify({
        type: 'join',
        payload: {
          roomId: ticketId,
          userId: userId
        }
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chat') {
        setMessages(prev => [...prev, data.data]);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    setSocket(ws);

    // Fetch existing messages
    fetchMessages();

    return () => {
      ws.close();
    };
  }, [ticketId]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/chat/${ticketId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
        // Find the other user from the messages
        const currentUserId = localStorage.getItem('userId');
        const otherMsg = data.data.find(m => m.sender.id !== currentUserId);
        if (otherMsg) {
          setOtherUser(otherMsg.sender);
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !isConnected) return;

    socket.send(JSON.stringify({
      type: 'chat',
      payload: {
        message: newMessage.trim()
      }
    }));

    setNewMessage('');
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      <div className={`w-full max-w-2xl h-[80vh] rounded-2xl shadow-xl flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className={`p-4 border-b flex flex-col gap-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Chat</h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full hover:bg-opacity-10 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Show other user's name and role at the top */}
          {otherUser && (
            <div className={`text-sm font-semibold opacity-80 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>{otherUser.name} ({otherUser.role})</div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => {
            const isCurrentUser = message.sender.id === userId;
            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-1`}
              >
                <div
                  className={`relative max-w-[75%] px-4 py-2 rounded-2xl shadow-md break-words whitespace-pre-line flex flex-col
                    ${isCurrentUser
                      ? 'bg-[#075e54] text-white rounded-br-md'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-100 rounded-bl-md'
                        : 'bg-gray-200 text-gray-900 rounded-bl-md'
                    }`}
                  style={{paddingBottom: 6}}
                >
                  <div className="flex items-end">
                    <span className="flex-1" style={{wordBreak: 'break-word', display: 'inline-block'}}>{message.message}</span>
                    <span className={`ml-3 text-[0.7em] opacity-70 ${isCurrentUser ? 'text-white' : (isDarkMode ? 'text-gray-300' : 'text-gray-600')}`}
                      style={{whiteSpace: 'nowrap', alignSelf: 'flex-end'}}>
                      {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className={`flex-1 px-4 py-2 rounded-full border-0 focus:border focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
              autoFocus
            />
            <button
              type="submit"
              disabled={!isConnected || !newMessage.trim()}
              className={`p-2 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer
                ${isConnected && newMessage.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : isDarkMode
                    ? 'bg-gray-700 text-gray-400'
                    : 'bg-gray-200 text-gray-400'}`}
              style={{ minWidth: 40, minHeight: 40 }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat; 
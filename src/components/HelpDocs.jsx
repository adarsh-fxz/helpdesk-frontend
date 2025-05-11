import React from 'react';
import { useTheme } from '../context/ThemeContext';

const HelpDocs = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`p-8 max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-8`}>Help & Documentation</h1>
      
      <section className="mb-8">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Getting Started</h2>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-md dark:shadow-gray-900/50 p-6`}>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            Welcome to the Helpdesk Application! This guide will help you understand how to use the system effectively.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Creating a Ticket</h2>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-md dark:shadow-gray-900/50 p-6`}>
          <ol className={`list-decimal list-inside space-y-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>Navigate to "Create Ticket" from the sidebar menu</li>
            <li>Fill in the required information:
              <ul className={`list-disc list-inside ml-6 mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>Title: Title of the ticket</li>
                <li>Description: Detailed explanation of the problem</li>
                <li>Image: Upload an image of the problem</li>
              </ul>
            </li>
            <li>Click "Submit" to create your ticket</li>
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Managing Tickets</h2>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-md dark:shadow-gray-900/50 p-6`}>
          <h3 className={`text-xl font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-3`}>Viewing Tickets</h3>
          <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>"My Tickets": View all tickets you've created</li>
            <li>"Open Tickets": View all active tickets in the system</li>
            <li>Click on any ticket to view its details and status</li>
          </ul>

          <h3 className={`text-xl font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mt-6 mb-3`}>Ticket Status</h3>
          <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>Open: New ticket awaiting assignment</li>
            <li>Assigned: Ticket has been assigned to a technician</li>
            <li>In Progress: Ticket is being worked on</li>
            <li>Closed: Ticket has been completed</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Notifications</h2>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-md dark:shadow-gray-900/50 p-6`}>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            Stay updated with your tickets through the notification system:
          </p>
          <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>Receive notifications when your ticket status changes</li>
            <li>Get updates when user create a new ticket</li>
            <li>View all notifications in the "Notifications" section</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Best Practices</h2>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-md dark:shadow-gray-900/50 p-6`}>
          <ul className={`list-disc list-inside space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>Provide clear and detailed descriptions when creating tickets</li>
            <li>Include relevant screenshots or attachments when applicable</li>
            <li>Respond promptly to requests for additional information</li>
            <li>Keep track of your ticket numbers for future reference</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>Need More Help?</h2>
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} rounded-lg shadow-md dark:shadow-gray-900/50 p-6`}>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            If you need additional assistance, please contact the system administrator or submit a feedback through the Feedback option in the sidebar.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HelpDocs; 
import React, { useState } from "react";
import {  Upload } from "lucide-react";

const UserProblem = () => {
  const [issue, setIssue] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState(null);

  const previousRequests = [
    { id: 1, title: "Tv screen not working", submittedTime: "Submitted 2 days ago" },
    { id: 2, title: "Phone Battery problem", submittedTime: "Submitted 4 days ago" },
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ issue, category, location, phoneNumber, file });
  };

  return (
    <div className="h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex flex-wrap items-center justify-between p-4 shadow-md bg-white z-50">
        <div className="flex items-center space-x-3 ml-4">
          <img src="/Logo.png" alt="Helpdesk Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-blue-700">Helpdesk</h1>
        </div>
    
        <div className="hidden md:flex items-center space-x-6 mr-6">
          <a href="#" className="text-gray-600 hover:text-blue-700 transition">Home</a>
          <a href="#" className="text-gray-600 hover:text-blue-700 transition">Feedback</a>
          <a href="#" className="text-gray-600 hover:text-blue-700 transition">Service Status</a>
          <a href="#" className="text-gray-600 hover:text-blue-700 transition">Contact Us</a>
          <img src="/foto-avatar.png" alt="User Profile" className="w-5 h-5" />
        </div>
      </nav>

      <main className="pt-20 px-4 md:px-16 max-w-4xl mx-auto">
        <h1 className="text-lg md:text-2xl font-bold">What do you need help with?</h1>
        <div className="mt-6">
          <h2 className="text-md md:text-lg font-semibold">Tell us more about your issue</h2>
          <div className="mt-4 p-4 bg-white shadow-md rounded-md w-full">
            <textarea 
              className="w-full p-2 border rounded h-24 text-sm" 
              placeholder="Describe your issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
            />
            <h3 className="mt-4 text-sm font-semibold">Upload Photos</h3>
            <div className="mt-2 flex flex-col items-center border-dashed border-2 p-4 rounded-md">
              <Upload className="w-8 h-8 text-gray-500" />
              <p className="text-sm text-gray-500">Drag and drop files here</p>
              <input type="file" className="mt-2" onChange={handleFileChange} />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold">Choose a category</h3>
            <select 
              className="mt-2 w-full p-2 border rounded" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="network">Network</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Where are you located?</h3>
            <input 
              type="text" 
              className="mt-2 w-full p-2 border rounded" 
              placeholder="Type your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Phone Number</h3>
            <input 
              type="text" 
              className="mt-2 w-full p-2 border rounded" 
              placeholder="Add a phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="mt-6 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          onClick={handleSubmit}
        >
          Submit Request
        </button>

        <div className="mt-10">
          <h3 className="text-md font-semibold">Previously submitted requests</h3>
          <div className="mt-4 space-y-4">
            {previousRequests.map((request) => (
              <div key={request.id} className="p-4 bg-white shadow-md rounded-md">
                <p className="font-semibold text-sm">{request.title}</p>
                <p className="text-xs text-gray-500">{request.submittedTime}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProblem;

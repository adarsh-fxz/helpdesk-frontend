import React from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here
    alert("Password reset link sent to your email!");
    navigate("/"); // Navigate back to login after submission
  };

  return (
    <div className="min-h-screen bg-white flex justify-center w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center">
        {/* Left Section - Illustration */}
        <div className="hidden md:flex w-1/2 bg-blue-700 min-h-screen justify-center items-center p-8">
          <div className="max-w-xl w-full">
            <img 
              src="/Helpdesk.png" 
              alt="Helpdesk Illustration" 
              className="w-full h-auto object-contain" 
            />
          </div>
        </div>
        
        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">Helpdesk</h1>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Forgot your password?</h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email Address"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  Send Reset Link
                </button>
              </div>
            </form>

            {/* Back to Login */}
            <div className="text-center text-sm text-gray-600">
              <button
                onClick={() => navigate("/")}
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
              >
                Back to login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
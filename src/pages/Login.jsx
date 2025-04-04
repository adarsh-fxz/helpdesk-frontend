import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/UserHomePage");
  };
  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-0 bg-white">
      {/* Left Side - Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-20 py-8 md:py-0">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">Helpdesk</h1>
            <p className="text-lg sm:text-xl text-blue-700 mt-2">Here to solve all your problems</p>
          </div>

          <p className="mt-6 text-gray-600 text-center md:text-left">Welcome back! Please login to your account.</p>

          <form className="mt-4" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700 text-left block" htmlFor="email">
                Email Address
              </label>
              <input 
                type="email"
                id="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="w-full mt-4">
              <label className="text-sm font-medium text-gray-700 text-left block" htmlFor="password">
                Password
              </label>
              <input 
                type="password"
                id="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-wrap justify-between items-center mt-4 text-sm w-full gap-2">
            {/* Remember Me Checkbox */}
            <div className="flex items-center flex-1 min-w-[120px]">
              <input 
                type="checkbox" 
                id="remember" 
                className="mr-2 rounded text-blue-600 focus:ring-blue-500" 
              />
              <label htmlFor="remember" className="text-gray-600 whitespace-nowrap">
                Remember Me
              </label>
            </div>

            {/* Forgot Password Link */}
            <a 
              href="/forgot-password" 
              onClick={handleForgotPassword}
              className="text-blue-600 hover:text-blue-800 w-full sm:w-auto text-center sm:text-right"
            >
            Forgot Password?
            </a>
          </div>

            {/* Login Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-2 rounded-md mt-6 hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          {/* Sign Up Navigation */}
          <div className="mt-6 text-center md:text-left">
            <p className="text-gray-600">
              New to Helpdesk? 
              <button 
                onClick={() => navigate("/SignUp")} 
                className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-600 hover:text-white transition duration-200 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* Social Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="hidden md:flex w-1/2 bg-blue-700 h-screen justify-center items-center p-8">
        <div className="max-w-xl w-full">
          <img 
            src="/Helpdesk.png" 
            alt="Helpdesk Illustration" 
            className="w-full h-auto object-contain" 
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
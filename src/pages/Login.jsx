import React from "react";

const Login = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-0">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 text-center md:text-left">
        <h1 className="text-4xl font-bold text-blue-700">Helpdesk</h1>
        <p className="text-xl text-blue-700 mt-2">Here to solve all your problems</p>
        
        <p className="mt-6">Welcome back! Please login to your account.</p>
        
        <form className="mt-4">
          <label className="block text-sm font-medium">Email Address</label>
          <input 
            type="email" 
            className="w-full mt-1 p-2 border rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your email"
          />

          <label className="block text-sm font-medium mt-4">Password</label>
          <input 
            type="password" 
            className="w-full mt-1 p-2 border rounded-md bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />

          <div className="flex flex-col md:flex-row justify-between items-center mt-4 text-sm">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a href="#" className="text-blue-600 mt-2 md:mt-0">Forgot Password?</a>
          </div>
          
          <button className="w-full bg-blue-600 text-white p-2 rounded-md mt-4 hover:bg-blue-700 transition">Login</button>
        </form>

        <div className="mt-4">
          <p>New to helpdesk? <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">Sign Up</button></p>
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <p>Or login with</p>
          <a href="#" className="text-blue-600 hover:text-blue-700 transition">Google</a>
          <a href="#" className="text-blue-600 hover:text-blue-700 transition">Github</a>
        </div>
      </div>
      
      {/* Right Side */}
      <div className="hidden md:flex w-1/2 bg-blue-700 justify-center items-center">
        <img src="/Helpdesk.png" alt="Helpdesk Illustration" className="w-3/4" />
      </div>
    </div>
  );
};

export default Login;

import React from "react";

const SignUp = () => {
  return (
    <div className="bg-white flex justify-center w-full min-h-screen px-4 md:px-0">
      <div className="bg-white w-full max-w-[1440px] flex flex-col md:flex-row items-center md:items-stretch">
        
        {/* Left Section - Illustration */}
        <div className="relative w-full md:w-1/2 h-80 md:h-auto bg-[#3751fe] flex items-center justify-center p-4 md:p-0">
          <img className="w-full h-full max-w-md md:max-w-none object-cover" alt="Helpdesk Support Illustration" src="Helpdesk.png" />
        </div>
        
        {/* Right Section - Signup Form */}
        <div className="flex flex-col w-full md:w-1/2 max-w-md mx-auto mt-10 px-6 md:px-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-blue-600">Helpdesk</h1>
          <h2 className="mt-4 text-2xl font-bold text-blue-600">Here to solve all your problems</h2>
          <h3 className="mt-2 text-lg font-semibold text-blue-600">Create your new account</h3>

          {/* Form */}
          <form className="space-y-4 mt-6">
            <div>
              <label className="text-lg text-black-600 block" htmlFor="full-name">Full Name</label>
              <input type="text" id="full-name" placeholder="Full Name" className="w-full p-3 border rounded-md" />
            </div>
            <div>
              <label className="text-lg text-black-600 block" htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Email Address" className="w-full p-3 border rounded-md" />
            </div>
            <div>
              <label className="text-lg text-black-600 block" htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" className="w-full p-3 border rounded-md" />
            </div>
            <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
              Sign Up
            </button>
          </form>

          {/* Log in Section */}
          <div className="mt-6 flex flex-col items-center">
            <span className="text-gray-600">Already have an account?</span>
            <button className="mt-2 border border-blue-600 text-blue-600 w-full p-3 rounded-md hover:bg-blue-100 transition">
              Log in
            </button>
          </div>

          {/* Sign Up Options */}
          <div className="mt-6 flex flex-col items-center">
            <span className="text-gray-600">Or Sign up with</span>
            <div className="flex space-x-4 mt-2">
              <button className="text-blue-600">Google</button>
              <button className="text-blue-600">Github</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
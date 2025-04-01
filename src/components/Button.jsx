import React from "react";

const Button = ({ children, className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      className={`bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
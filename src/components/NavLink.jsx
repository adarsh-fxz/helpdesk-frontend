import React from "react";

const NavLink = ({ href, children, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
    if (onClick) onClick(e);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="hover:underline transition-all duration-300 text-white dark:text-gray-200"
    >
      {children}
    </a>
  );
};

export default NavLink;
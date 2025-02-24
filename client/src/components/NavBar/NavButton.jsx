import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavButton.css";

export const NavButton = ({ text, to, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`button clicked!Navigating to:${to}`);
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  const isActive = location.pathname === to;

  return (
    <button
      className={`nav-button ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

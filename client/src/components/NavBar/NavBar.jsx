import React from "react";
import { NavButton } from "./NavButton";
import "./NavBar.css";

export const NavBar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-button">
        {!isLoggedIn ? (
          <>
            <NavButton text="login" to="/login" />
            <NavButton text="register" to="/register" />
          </>
        ) : (
          <>
            <NavButton text="dashboard" to="/tasks" />
            <NavButton text="add task" to="/add-tasks" />
            <NavButton text="logout" onClick={onLogout} to="/login" />
          </>
        )}
      </div>
    </nav>
  );
};

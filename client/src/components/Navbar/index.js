import "./index.scss";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import Logo from "../../assets/images/Logo.png";

const Sidebar = () => {
  return (
    <div className="nav-bar">
      <Link className="logo" to="/"></Link>
      <nav>
        <NavLink className="Major-Progress" to="/progress">
          Progress
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

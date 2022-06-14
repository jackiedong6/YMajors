import "./index.scss";
import { Link } from "react-router-dom";
import React from "react";
import Logo from "../../assets/images/Logo.png";

const Sidebar = () => {
  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      <nav></nav>
    </div>
  );
};

export default Sidebar;

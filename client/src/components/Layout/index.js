import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/navbar.js";
import "./index.scss";

const Layout = () => {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=yes"
      ></meta>
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;

import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import MajorProgress from "./components/MajorProgress";
import Semester from "./components/Semester";
function App() {
  return (
    // Setting up routes and elements
    <Routes>
      {/* Wrapping each page around Layout element */}
      <Route element={<Layout />}>
        {/* Login route at index */}
        <Route path="/" element={<Login />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/progress" element={<MajorProgress />} />
          <Route path="/semester" element={<Semester />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

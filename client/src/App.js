import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import MajorProgress from "./components/MajorProgress";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/progress" element={<MajorProgress />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

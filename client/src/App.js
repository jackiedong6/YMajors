import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Landing from "./components/Login";
import Home from "./components/Home";
import ProtectedRoutes from "./auth/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

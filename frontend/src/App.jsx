import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Trabajadores from "./components/Trabajadores";

function App() {
  // Estado de autenticación
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("auth") === "true");

  return (
    <Router>
      <Routes>
        {/* Landing con modal */}
        <Route
          path="/"
          element={<Landing onLoginSuccess={() => setLoggedIn(true)} />}
        />

        {/* Redirigir cualquier ruta inválida al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />

        {/* Dashboard protegido */}
        <Route
          path="/trabajadores"
          element={loggedIn ? <Trabajadores /> : <Navigate to="/trabajadores" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;

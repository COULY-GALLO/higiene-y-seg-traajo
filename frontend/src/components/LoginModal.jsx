import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginModal.css";

const LoginModal = ({ show, onClose, onLoginSuccess }) => {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, contrasena }),
      });

      // siempre parseamos JSON aunque sea 401
      const data = await response.json();
      console.log("Respuesta del backend:", data);


      if (data.success) {
        // login exitoso
        localStorage.setItem("auth", "true");
        if (onLoginSuccess) onLoginSuccess();
        onClose();
        navigate("/trabajadores");
      } else {
        // credenciales incorrectas
        setError(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error fetch:", err);
      setError("Error al conectar con el servidor");
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginModal;

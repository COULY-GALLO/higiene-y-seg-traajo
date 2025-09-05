import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

function Trabajadores() {
  const [trabajadores, setTrabajadores] = useState([]);

  // Traer la lista de trabajadores
  useEffect(() => {
    fetch("http://localhost:5000/api/trabajadores")
      .then(res => res.json())
      .then(data => setTrabajadores(data))
      .catch(err => console.error("Error fetching trabajadores:", err));
  }, []);

  // Manejar checkbox y actualizar DB
  const handleChange = (id, field, value) => {
    fetch(`http://localhost:5000/api/trabajadores/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTrabajadores(prev =>
            prev.map(t => (t.id === id ? { ...t, [field]: value } : t))
          );
        }
      })
      .catch(err => console.error("Error updating trabajador:", err));
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Trabajadores</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {trabajadores.map(t => (
            <div
              key={t.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                width: "200px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{t.nombre}</h3>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={t.casco}
                    onChange={e => handleChange(t.id, "casco", e.target.checked)}
                  />{" "}
                  Casco
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={t.guantes}
                    onChange={e => handleChange(t.id, "guantes", e.target.checked)}
                  />{" "}
                  Guantes
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={t.lentes}
                    onChange={e => handleChange(t.id, "lentes", e.target.checked)}
                  />{" "}
                  Lentes
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Trabajadores;

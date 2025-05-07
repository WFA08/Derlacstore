import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register clicked", { email, password });

    // Aquí puedes poner tu lógica de autenticación (ejemplo estático)
    if (email === "test@correo.com" && password === "1234") {
      alert("¡Registro exitoso!");
      // Redirigir a otra página (por ejemplo, login o home)
      navigate("/login");  // Redirige al login, o ajusta la ruta según tu flujo
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div>
      <div className="register-container">
        <h2>Registrar</h2>
        {error && <div className="error-message">{error}</div>} {/* Mostrar mensaje de error */}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  );
}

export default Register;

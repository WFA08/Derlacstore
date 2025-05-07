import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked", { email, password });
    // Aquí puedes poner tu lógica de autenticación
    if (email === "test@correo.com" && password === "1234") {
      alert("¡Login exitoso!");
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <a className="a-links" href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

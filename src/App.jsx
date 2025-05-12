import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login"; // Formulario login
import Register from "./register"; // Formulario

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  const [MostrarLogin, setMostrarLogin] = useState(false);
  const abrirLogin = () => setMostrarLogin(true);
  const cerrarLogin = () => setMostrarLogin(false);

  const [MostrarRegister, setMostrarRegister] = useState(false);
  const abrirRegister = () => setMostrarRegister(true);
  const cerrarRegister = () => setMostrarRegister(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const buscarPeliculas = async () => {
    if (!query.trim()) return;
    try {
      const respuesta = await fetch(`http://localhost:3000/movies?q=${query}`); // Filtra por título
      if (!respuesta.ok) throw new Error("Error al obtener los datos del servidor");

      const data = await respuesta.json();
      console.log("Películas obtenidas:", data);
      setResultados(data.slice(0, 4)); // Limita los resultados a 4
    } catch (error) {
      console.error("Error al buscar películas:", error);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") cerrarLogin();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc); // Limpia el evento al desmontar
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="main">
              <div className="top">
                <div className="nav">
                  <i
                    className={`fa ${menuOpen ? "fa-times" : "fa-bars"} menu-icon`}
                    aria-hidden="true"
                    onClick={toggleMenu}
                  ></i>
                  <div className={`links-div ${menuOpen ? "active" : ""}`}>
                    <ul className="link">
                      <li><Link to="pages/sobre-mi">Sobre mi</Link></li>
                      <li><Link to="pages/proyectos">Proyectos</Link></li>
                      <li><Link to="pages/investigaciones">Ciencia?</Link></li>
                      <li><a href="https://roadmap.sh/full-stack">ROADMAP</a></li>
                    </ul>
                  </div>
                </div>
                <div className="btnlogin-sign">
                  <ul>
                    <li><button className="Signup-btn" onClick={abrirRegister}>Register</button></li>
                    <li><button className="login-btn" onClick={abrirLogin}>Login</button></li>
                  </ul>
                </div>
              </div>

              <section className="center">
                <div>
                  <h1>DerlacStore</h1>
                  <p>Bienvenidos a mi Portfolio</p>
                </div>
                <div className="search-container">
                  <input
                    type="text"
                    className="search"
                    name="search"
                    placeholder="Buscador de Películas"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && buscarPeliculas()}
                  />
                  <span onClick={buscarPeliculas}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </span>

                  {!query.trim() && (
                    <ul className="links">
                      <li><a href="pages/sobre-mi">Sobre mi</a></li>
                      <li><a href="pages/proyectos">Proyectos</a></li>
                      <li><a href="pages/investigaciones">Ciencia?</a></li>
                      <li><a href="https://roadmap.sh/full-stack">ROADMAP</a></li>
                    </ul>
                  )}

                  {query.trim() && resultados.length > 0 && (
                    <div className="results-grid">
                      {resultados.map((movie, index) => (
                        <div className="grid-item" key={index}>
                          <strong>{movie.title}</strong>
                          <p>Año: {movie.year}</p>
                          {movie.genres?.length > 0 && <p>Género: {movie.genres.join(", ")}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {query.trim() && resultados.length === 0 && (
                    <p>No se encontraron películas con ese nombre.</p>
                  )}
                </div>
              </section>

              {/* Popup Login */}
              {MostrarLogin && (
                <div className="modal-overlay" onClick={cerrarLogin}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <Login />
                  </div>
                </div>
              )}

              {MostrarRegister && (
                <div className="modal-overlay" onClick={cerrarRegister}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <Register />
                  </div>
                </div>
              )}

              <footer className="bottom">
                <div className="social">
                  <ul>
                    <li><a href="https://linkedin.com/in/wfa1/"><i className="fa fa-linkedin"></i></a></li>
                    <li><a href="https://github.com/WFA08"><i className="fa fa-github"></i></a></li>
                    <li><a href="https://instagram.com/fernandoaf11"><i className="fa fa-instagram"></i></a></li>
                  </ul>
                </div>
                <a href="mailto:fernandojosearanafigueredo@gmail.com">
                  <p>¿Te quieres comunicar conmigo?</p>
                </a>
              </footer>
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

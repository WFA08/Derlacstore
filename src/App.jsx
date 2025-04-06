import { useState } from "react";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState(""); // Estado para la consulta
  const [resultados, setResultados] = useState([]); // Estado para los resultados

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  // Función para el buscador
  const buscarProyecto = async () => {
    if (!query.trim()) return; // Evitamos búsquedas vacías
    try {
      const respuesta = await fetch(`http://localhost:3000/buscar?q=${query}`);
      if (!respuesta.ok) throw new Error("Error al obtener los datos del servidor");
      const data = await respuesta.json();
      setResultados(data); // Actualiza los resultados
    } catch (error) {
      console.error("Error al buscar el proyecto:", error);
    }
  };

  return (
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
              <li>
                <a href="pages/sobre-mi">Sobre mi</a>
              </li>
              <li>
                <a href="pages/proyectos">Proyectos</a>
              </li>
              <li>
                <a href="pages/investigaciones">Ciencia?</a>
              </li>
              <li>
                <a href="https://roadmap.sh/full-stack">ROADMAP</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="signup">
          <ul>
            <li>
              <a href="./pages/Sign-up">Sign up</a>
            </li>
            <li>
              <a href="./pages/login">Login</a>
            </li>
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
            placeholder="Buscador de Proyectos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                buscarProyecto(); // Realizar búsqueda al presionar Enter
              }
            }}
          />
          <span onClick={buscarProyecto}>
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
          {/* Grilla de resultados */}
          {query.trim() && resultados.length > 0 ? (
            <div className="results-grid">
              {resultados.map((proyecto, index) => (
                <div className="grid-item" key={index}>
                  <strong>{proyecto.name}</strong>
                  <p>{proyecto.description}</p>
                </div>
              ))}
            </div>
          ) : null /* Ocultar la grilla si no hay texto en la barra */}
        </div>
      </section>

      <footer className="bottom">
        <div className="social">
          <ul>
            <li>
              <a href="https://linkedin.com/in/wfa1/">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/WFA08">
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="https://instagram.com/fernandoaf11">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
        <a href="mailto:fernandojosearanafigueredo@gmail.com">
          <p>¿Te quieres comunicar conmigo?</p>
        </a>
      </footer>
    </div>
  );
}

export default App;

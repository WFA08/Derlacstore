import { useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <div className="main">
      <div className="top">
        <div className="nav">
          <i
            className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'} menu-icon`}
            aria-hidden="true"
            onClick={toggleMenu}
          ></i>
          <div className={`links-div ${menuOpen ? 'active' : ''}`}>
            <ul className="link">
            <li><a href="pages/sobre-mi">Sobre mi</a></li>
          <li><a href="pages/proyectos">Proyectos</a></li>
          <li><a href="pages/investigaciones">Ciencia?</a></li>
          <li><a href="https://roadmap.sh/full-stack">ROADMAP</a></li>
            </ul>
          </div>
        </div>
        <div className="signup">
          <ul>
            <li><a href="./pages/Sign-up">Sign up</a></li>
            <li><a href="./pages/login">Login</a></li>
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
            placeholder="Buscador de Proyectos"/>
              <span><i class="fa fa-search" aria-hidden="true"></i></span>
<ul class="links">
          <li><a href="pages/sobre-mi">Sobre mi</a></li>
          <li><a href="pages/proyectos">Proyectos</a></li>
          <li><a href="pages/investigaciones">Ciencia?</a></li>
          <li><a href="https://roadmap.sh/full-stack">ROADMAP</a></li>
        </ul>
        </div>
      </section>

      <footer className="bottom">
        <div className="social">
          <ul>
            <li><a href="https://linkedin.com/in/wfa1/"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
            <li><a href="https://github.com/WFA08"><i className="fa fa-github" aria-hidden="true"></i></a></li>
            <li><a href="https://instagram.com/fernandoaf11"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
          </ul>
        </div>
        <a href="mailto:fernandojosearanafigueredo@gmail.com"><p>¿Te quieres comunicar conmigo?</p></a>
      </footer>
    </div>
  );
}

export default App;

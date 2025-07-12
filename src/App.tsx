import './App.css'
import { ApiExample } from './components/ApiExample'

function App() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <div className="logo">🌊 DevSurf!!</div>
          <div className="nav-links">
            <a href="#about">Sobre mí</a>
            <a href="#services">Servicios</a>
            <a href="#contact">Contacto</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Desarrollador Freelancer</h1>
            <p className="tagline">Código limpio, olas perfectas</p>
            <p className="description">
              Desarrollador apasionado que combina la creatividad del surf con la precisión del código.
              Creando soluciones digitales que fluyen como las mejores olas.
            </p>
            <button className="cta-button">¡Hablemos de tu proyecto!</button>
          </div>
          <div className="hero-image">
            <div className="surf-code-icon">🏄‍♂️💻</div>
          </div>
        </section>

        <section id="about" className="about">
          <h2>Sobre mí</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Soy un desarrollador freelancer que encuentra inspiración en el surf y la tecnología.
                Cuando no estoy programando, puedes encontrarme buscando las mejores olas.
              </p>
              <p>
                Mi enfoque combina la paciencia del surfista esperando la ola perfecta con la
                determinación de un desarrollador resolviendo problemas complejos.
              </p>
            </div>
            <div className="skills">
              <h3>Habilidades</h3>
              <div className="skill-tags">
                <span className="skill-tag">React</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Surf</span>
                <span className="skill-tag">Aventura</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <h2>Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>🌐 Desarrollo Web</h3>
              <p>Sitios web modernos y responsivos que destacan tu marca</p>
            </div>
            <div className="service-card">
              <h3>📱 Aplicaciones Móviles</h3>
              <p>Apps nativas y híbridas para iOS y Android</p>
            </div>
            <div className="service-card">
              <h3>⚡ APIs y Backend</h3>
              <p>Servicios robustos y escalables para tu aplicación</p>
            </div>
            <div className="service-card">
              <h3>🎨 UI/UX Design</h3>
              <p>Interfaces intuitivas y experiencias de usuario excepcionales</p>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <h2>¿Listo para surfear juntos?</h2>
          <p>Hablemos de tu proyecto y cómo puedo ayudarte a alcanzar tus objetivos</p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>hola@devsurf.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <span>+34 600 123 456</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>España (Remoto disponible)</span>
            </div>
          </div>
        </section>

        <section className="api-demo">
          <ApiExample />
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 DevSurf - Desarrollador Freelancer</p>
        <p>🌊 Código con pasión, vive con libertad</p>
      </footer>
    </div>
  )
}

export default App

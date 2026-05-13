import { useState } from 'react';
import { Link } from 'react-router-dom';
import VantaFog from '../components/VantaFog';
import ThreeCanvas from '../components/ThreeCanvas';
import { useReveal } from '../hooks/useReveal';

const portfolioProjects = [
  {
    thumb: '/project1/dist/images/1.webp',
    src: '/project1/dist/index.html',
    title: 'Darkness Theory',
  },
  {
    thumb: '/project2/dist2/mondragone.png',
    src: '/project2/dist2/index.html',
    title: 'Mondragone Apartments',
  },
  {
    thumb: '/project3/dist/backgrounds/berserk-bg.png',
    src: '/project3/dist/index.html',
    title: 'Spell Notes',
  },
  {
    thumb: '/project4/dist/image/Main.webp',
    src: '/project4/dist/index.html',
    title: 'New Beauty School',
  },
];

export default function Home({ introFinished }) {
  const [activeThumb, setActiveThumb] = useState(0);
  const activeProject = portfolioProjects[activeThumb];

  // Initialize intersection observers when DOM is ready
  useReveal();

  const handleProjectSelect = (idx) => {
    setActiveThumb(idx);
  };

  return (
    <div style={{ opacity: introFinished ? 1 : 0, transition: 'opacity 0.8s' }}>
      {/* Persistent ThreeJS Background */}
      <ThreeCanvas />

      {/* Main Home Sections */}
      <section className="hero" id="hero">
        <div>
          <div className="hero-title reveal visible"><span>Jame</span></div>
          <div className="hero-title line2 reveal visible"><span>katuro</span></div>
          <div className="hero-year reveal visible"><span>— 2025</span></div>
          <div className="hero-nav-line reveal visible"></div>
          
          <div className="hero-sub reveal visible">
            <div className="hero-sub-nav">
              <span className="hoverable" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>Jamekaturo</span>
              <span className="hoverable" onClick={() => window.location.href='/portfolio'}>Archive</span>
              <span className="hoverable">Journal</span>
              <span className="hoverable">Shop</span>
            </div>
          </div>
          
          <p className="hero-description reveal visible">
            Sometimes, to design also means to transform ideas not only into visuals, but into words; a type of design that does not serve the ideals of capitalist marketing, but the analogue society. To design means to reinvent oneself and, thus, the world.
          </p>
        </div>
        
        <div className="scroll-indicator reveal visible">
          <div className="scroll-line"></div>
          Scroll to explore
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          <span className="marquee-item filled">Design</span>
          <span className="marquee-item">Development</span>
          <span className="marquee-item filled">Art Direction</span>
          <span className="marquee-item">Strategy</span>
          <span className="marquee-item filled">Identity</span>
          <span className="marquee-item">Motion</span>
          <span className="marquee-item filled">Design</span>
          <span className="marquee-item">Development</span>
          <span className="marquee-item filled">Art Direction</span>
          <span className="marquee-item">Strategy</span>
          <span className="marquee-item filled">Identity</span>
          <span className="marquee-item">Motion</span>
        </div>
      </div>

      {/* WORK / SHOWCASE */}
      <section id="work" className="snap-section">
        <div className="work-showcase reveal full-screen">
          <div className="work-thumbnails">
            {portfolioProjects.map((project, idx) => {
              return (
                <div 
                  key={idx}
                  tabIndex={0}
                  className={`work-thumb hoverable ${activeThumb === idx ? 'active' : ''}`}
                  onMouseEnter={() => handleProjectSelect(idx)}
                  onClick={() => handleProjectSelect(idx)}
                  onFocus={() => handleProjectSelect(idx)}
                >
                  <img src={project.thumb} alt={`Project ${idx}`} />
                </div>
              );
            })}
          </div>

          <div className="work-preview-container">
            <div className="preview-item active" style={{ padding: 0, alignItems: 'stretch' }}>
              <iframe
                key={activeProject.src}
                src={activeProject.src}
                allow="autoplay; fullscreen"
                loading="eager"
                style={{ width: '100%', height: '100%', border: 'none', background: '#08080c' }}
                title={activeProject.title}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY / ABOUT etc */}
      <div className="philosophy reveal">
        <div className="section-label">Philosophy</div>
        <p className="philosophy-text">In a world where everything has a new, updated version, to design also means to discover the <em>essential values of humanity</em> and translate them into matters that can last. To design means to reinvent oneself and, thus, the world around us.</p>
      </div>

      <section id="about">
        <div className="section-label reveal">About</div>
        <div className="section-title reveal">Crafting digital<br />experiences</div>
        <div className="about-grid">
          <div className="about-text reveal">
            Jamekaturo is a multidisciplinary designer and creative director focused on building meaningful digital experiences. With a philosophy rooted in minimalism and intentionality, every project is an exploration of form, function, and human connection.
          </div>
          <div className="about-stats reveal">
            <div className="stat-item">
              <div className="stat-number" data-count="47">0</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-count="12">0</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-count="8">0</div>
              <div className="stat-label">Awards Won</div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="section-label reveal">Get In Touch</div>
        <div className="contact-title reveal">
          <a href="#" className="hoverable">Let's<br />work<br />together.</a>
        </div>
        <div className="contact-info reveal">
          <a href="#" className="hoverable">Instagram</a>
          <a href="#" className="hoverable">Twitter</a>
          <a href="#" className="hoverable">hello@jamekaturo.com</a>
        </div>
      </section>
    </div>
  );
}

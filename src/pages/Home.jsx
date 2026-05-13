import { useState, useEffect, useRef } from 'react';
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
  {
    thumb: '/project5/dist/images/e9e26e94-5a23-4643-9fea-1c31d96f569a.jpg',
    src: '/project5/dist/index.html',
    title: 'Ksenia Styling',
  },
  {
    thumb: '/project6/dist/beauty-school.png',
    src: '/project6/dist/index.html',
    title: 'Yulia Stasiv Beauty School',
  },
];

export default function Home({ introFinished }) {
  const [activeThumb, setActiveThumb] = useState(1);
  const activeProject = portfolioProjects[activeThumb];
  const [copiedTop, setCopiedTop] = useState(false);
  const [copiedBottom, setCopiedBottom] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [isFullyVisible, setIsFullyVisible] = useState(false);
  const showcaseRef = useRef(null);

  // Initialize intersection observers when DOM is ready
  useReveal();

  useEffect(() => {
    let timeoutId;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger when the section enters the viewport and begins its scroll-snap alignment
          if (entry.isIntersecting) {
            // Wait 800ms to guarantee the physical scroll/snap motion has completely stopped
            timeoutId = setTimeout(() => {
              setIsFullyVisible(true);
            }, 800);
          } else {
            // If scrolled away, cancel the pending animation trigger
            clearTimeout(timeoutId);
            setIsFullyVisible(false);
          }
        });
      },
      { threshold: 0.6 }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      if (showcaseRef.current) {
        observer.unobserve(showcaseRef.current);
      }
    };
  }, []);

  const handleProjectSelect = (idx) => {
    setActiveThumb(idx);
    setShowTutorial(false);
  };

  const handleCopyEmail = (e, isTop) => {
    e.preventDefault();
    navigator.clipboard.writeText('Jamekaturo@gmail.com');
    if (isTop) {
      setCopiedTop(true);
      setTimeout(() => setCopiedTop(false), 2000);
    } else {
      setCopiedBottom(true);
      setTimeout(() => setCopiedBottom(false), 2000);
    }
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
          <div className="hero-year reveal visible"><span>— 2026</span></div>
          <div className="hero-nav-line reveal visible"></div>

          <div className="hero-sub reveal visible">
            <div className="hero-sub-nav">
              <a
                className="hoverable"
                style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer', position: 'relative' }}
                onClick={(e) => handleCopyEmail(e, true)}
              >
                Jamekaturo@gmail.com
                <span style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#0a0a0a',
                  color: '#fff',
                  fontSize: '0.65rem',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  opacity: copiedTop ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                  textTransform: 'none',
                  letterSpacing: 'normal'
                }}>
                  Copy
                </span>
              </a>
              <a href="https://wa.me/393508807803" target="_blank" rel="noopener noreferrer" className="hoverable" style={{ color: 'inherit', textDecoration: 'none' }}>WhatsApp</a>
              <a href="https://t.me/JamekaturoWork" target="_blank" rel="noopener noreferrer" className="hoverable" style={{ color: 'inherit', textDecoration: 'none' }}>Telegram</a>
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
        <div
          ref={showcaseRef}
          className={`work-showcase full-screen ${isFullyVisible ? 'fully-visible' : ''}`}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
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

          {showTutorial && (
            <div
              className="tutorial-overlay-wrapper"
              onClick={() => setShowTutorial(false)}
            >
              <div className="tutorial-hole">
                <div className="tutorial-text">
                  Click
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ paddingBottom: '10rem' }}>
        <div className="section-label reveal">About</div>
        <div className="about-grid" style={{ alignItems: 'center' }}>
          <div>
            <div className="section-title reveal" style={{ marginBottom: '1.5rem' }}>Crafting digital<br />experiences</div>
            <p className="reveal" style={{ fontSize: '1.05rem', color: '#444', lineHeight: 1.6, maxWidth: '440px' }}>
              With deep expertise across a wide spectrum of programming languages and modern frameworks, I specialize in building responsive, state-of-the-art web applications and robust digital ecosystems.
            </p>
          </div>
          <div className="about-stats reveal">
            <div className="stat-item">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="stat-number" data-count="50">0</div>
                <span style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>+</span>
              </div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="stat-number" data-count="4">0</div>
                <span style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>+</span>
              </div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact" style={{ paddingTop: '4rem', minHeight: 'auto' }}>
        <div className="section-label reveal">Get In Touch</div>
        <div className="contact-title reveal">
          <a href="#" className="hoverable">Let's<br />work<br />together.</a>
        </div>
        <div className="contact-info reveal">
          <a
            className="hoverable"
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={(e) => handleCopyEmail(e, false)}
          >
            Jamekaturo@gmail.com
            <span style={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#0a0a0a',
              color: '#fff',
              fontSize: '0.65rem',
              padding: '2px 6px',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              opacity: copiedBottom ? 1 : 0,
              transition: 'opacity 0.2s ease',
              textTransform: 'none',
              letterSpacing: 'normal'
            }}>
              Copy
            </span>
          </a>
          <a href="https://wa.me/393508807803" target="_blank" rel="noopener noreferrer" className="hoverable">WhatsApp</a>
          <a href="https://t.me/JamekaturoWork" target="_blank" rel="noopener noreferrer" className="hoverable">Telegram</a>
        </div>
      </section>
    </div>
  );
}

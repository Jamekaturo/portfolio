import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WrenchCarousel from '../components/WrenchCarousel';
import Particles from '../components/Particles';
import { useReveal } from '../hooks/useReveal';

export default function Wrench() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="wrench-page">
      <Particles />

      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <div className="logo-icon">W</div>
          WRENCH
        </div>
        <div className="nav-links">
          <a href="#hero">Intro</a>
          <a href="#work">Collection</a>
          <a href="#process">Process</a>
          <a href="#services">Services</a>
        </div>
        <Link to="/" className="nav-back hoverable">
          Back to Portal →
        </Link>
      </nav>

      <section className="hero" id="hero">
        <div className="hero-bg">
          <img src="/workshop.png" alt="Workshop" />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-label reveal">Mastering the Machine</div>
          <h1 className="hero-title reveal">
            <span>Bespoke <em>Auto</em></span>
            <span>Restoration</span>
          </h1>
          <p className="hero-desc reveal">
            We breathe new life into automotive icons. From meticulous frame-off restorations to high-performance custom builds, WRENCH defines the summit of automotive craft.
          </p>
          <div className="hero-stats reveal">
            <div className="hero-stat">
              <div className="hero-stat-num" data-count="147">0<span className="suffix">+</span></div>
              <div className="hero-stat-label">Builds Completed</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num" data-count="100">0<span className="suffix">%</span></div>
              <div className="hero-stat-label">Craftsmanship</div>
            </div>
          </div>
        </div>
        <div className="hero-scroll reveal">
          Scroll to Explore
        </div>
      </section>

      <div id="work">
        <WrenchCarousel />
      </div>

      <section className="about-section reveal" id="about">
        <div className="about-image">
          <img src="/workshop.png" alt="Our Workshop" />
          <div className="about-badge">
            <div className="about-badge-num">12</div>
            <div className="about-badge-label">Masters on Site</div>
          </div>
        </div>
        <div className="about-text">
          <div className="section-label">Our Philosophy</div>
          <h3>Where <em>Art</em> meets Engineering</h3>
          <p>
            Every project that enters our workshop is treated as a masterpiece. We don't just fix cars; we restore history, one bolt at a time.
          </p>
          <p>
            Our team of specialists covers everything from traditional coachbuilding and leathercraft to advanced engine tuning and composite manufacturing.
          </p>
        </div>
      </section>

      <section className="process-section reveal" id="process">
        <div className="section-label" style={{ textAlign: 'center' }}>The Journey</div>
        <h2 style={{ textAlign: 'center', fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginTop: '1rem' }}>Our Process</h2>
        <div className="process-grid">
          {[
            { num: '01', title: 'Consultation', desc: 'Defining the vision, scope, and engineering requirements.' },
            { num: '02', title: 'Teardown', desc: 'Meticulous disassembly and cataloging of every single component.' },
            { num: '03', title: 'Restoration', desc: 'Frame correction, engine rebuild, and bespoke interior craft.' },
            { num: '04', title: 'Calibration', desc: 'Hundreds of hours of testing to ensure perfection on the road.' }
          ].map((s, i) => (
            <div key={i} className="process-step">
              <div className="process-step-num">{s.num}</div>
              <div className="process-step-title">{s.title}</div>
              <div className="process-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="services-section reveal" id="services">
        <div className="section-label">Capabilities</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem', marginTop: '1rem' }}>Our Services</h2>
        <div className="services-grid">
          {[
            { title: 'Concours Restoration', price: 'Premium', tags: ['Originality', 'Pebble Beach Std'], desc: 'Museum-quality restoration focused on absolute historical accuracy and perfection.' },
            { title: 'Restomod Builds', price: 'Custom', tags: ['Performance', 'Luxury'], desc: 'Classic aesthetics meets modern technology. New engines, suspension, and creature comforts.' },
            { title: 'Custom Fabrication', price: 'Bespoke', tags: ['Metalwork', 'Design'], desc: 'Unique automotive creations. Wide-body kits, roll cages, and one-off components.' }
          ].map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-card-price">{s.price}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
              <div className="service-card-tags">
                {s.tags.map((t, ti) => <span key={ti}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section reveal">
        <h2 className="cta-title">Ready to start your <em>Legacy</em>?</h2>
        <p className="cta-desc">Join the exclusive ranks of WRENCH owners and transform your automotive dreams into reality.</p>
        <a href="#" className="cta-btn hoverable">
          Book a Consultation
        </a>
      </section>

      <style>{`
        .wrench-page {
          --bg: #08080c;
          --bg2: #0e0e14;
          --accent: #ff6b35;
          --accent2: #6c63ff;
          --gold: #c8a45e;
          --text: #e8e6e3;
          --text-dim: #5a5868;
          --text-mid: #8a8898;
          --border: rgba(255,255,255,0.06);
          background: var(--bg);
          color: var(--text);
          font-family: 'Space Grotesk', sans-serif;
          min-height: 100vh;
        }
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; transition: all 0.4s; }
        .nav.scrolled { background: rgba(8,8,12,0.9); backdrop-filter: blur(20px); padding: 18px 48px; border-bottom: 1px solid var(--border); }
        .nav-logo { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; }
        .nav-logo .logo-icon { width: 36px; height: 36px; border: 1.5px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; color: var(--accent); font-weight: 700; }
        .nav-links { display: flex; gap: 36px; align-items: center; }
        .nav-links a { font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--text-mid); transition: color 0.3s; }
        .nav-links a:hover { color: var(--text); }
        .nav-back { font-size: 11px; font-weight: 500; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); transition: color 0.3s; }
        .nav-back:hover { color: var(--accent); }

        .hero { position: relative; height: 100vh; display: flex; align-items: flex-end; overflow: hidden; }
        .hero-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; }
        .hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.35); transform: scale(1.05); animation: heroZoom 20s infinite alternate; }
        @keyframes heroZoom { to { transform: scale(1.12); } }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(8,8,12,1) 100%); z-index: 1; }
        .hero-content { position: relative; z-index: 2; padding: 0 48px 80px; width: 100%; }
        .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 9vw, 8rem); font-weight: 800; line-height: 0.95; margin-bottom: 24px; }
        .hero-title em { font-style: italic; color: var(--accent); }
        .hero-stats { display: flex; gap: 48px; padding-top: 32px; border-top: 1px solid var(--border); }
        .hero-stat-num { font-size: 2.2rem; font-weight: 700; color: var(--text); }
        .hero-stat-num .suffix { color: var(--accent); }

        .carousel-section { padding: 120px 0 80px; position: relative; }
        .scene-container { position: relative; width: 100%; height: 580px; display: flex; align-items: center; justify-content: center; perspective: 1200px; }
        .book-wrapper { position: relative; width: 900px; height: 560px; transform-style: preserve-3d; }
        .card { position: absolute; width: 420px; height: 520px; border-radius: 16px; overflow: hidden; transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1); cursor: pointer; box-shadow: 0 30px 80px rgba(0,0,0,0.6); }
        .card-image { position: absolute; inset: 0; }
        .card-image img { width: 100%; height: 100%; object-fit: cover; }
        .card-gradient { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%); z-index: 2; }
        .card-big-text { font-family: 'Playfair Display', serif; font-size: 72px; font-weight: 700; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 3; opacity: 0.08; color: #fff; pointer-events: none; }
        .card-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 30px; z-index: 5; pointer-events: none; }
        .card-label { font-size: 10px; letter-spacing: 3px; color: var(--accent); margin-bottom: 10px; text-transform: uppercase; }
        .card-title { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 700; line-height: 1.15; color: #fff; }
        .card-subtitle { font-size: 12px; color: rgba(255,255,255,0.55); line-height: 1.5; max-width: 300px; }
        .stage-indicator { position: absolute; top: 20px; right: 20px; z-index: 10; display: flex; gap: 6px; }
        .stage-pip { width: 20px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.15); transition: all 0.5s; }
        .stage-pip.active { background: var(--accent); }
        .nav-arrow { width: 50px; height: 50px; border-radius: 50%; border: 1px solid var(--border); background: rgba(8,8,12,0.5); backdrop-filter: blur(10px); color: var(--text-dim); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; }
        .nav-arrow:hover { border-color: var(--accent); color: var(--text); }
        .nav-dots { display: flex; justify-content: center; gap: 8px; margin-top: 30px; }
        .nav-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--text-dim); transition: all 0.4s; border: none; cursor: pointer; }
        .nav-dot.active { background: var(--accent); width: 24px; border-radius: 3px; }
        .glow-sphere { position: absolute; width: 400px; height: 400px; border-radius: 50%; filter: blur(100px); opacity: 0.15; z-index: -1; pointer-events: none; }
        .glow-1 { top: 10%; right: -100px; }
        .glow-2 { bottom: 10%; left: -100px; }

        .about-section { padding: 140px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-image { position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 4/3; }
        .about-image img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.6); }
        .about-badge { position: absolute; bottom: 20px; right: 30px; background: var(--accent); color: #fff; padding: 18px 28px; border-radius: 8px; text-align: center; }
        .about-badge-num { font-size: 2.5rem; font-weight: 700; }
        .about-badge-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
        .about-text h3 { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 700; margin-bottom: 24px; }
        .about-text h3 em { font-style: italic; color: var(--accent); }
        .about-text p { font-size: 1rem; color: var(--text-mid); line-height: 1.9; margin-bottom: 24px; font-weight: 300; }

        .process-section { padding: 120px 48px; border-top: 1px solid var(--border); }
        .process-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-top: 60px; }
        .process-step { padding: 40px 30px; background: var(--bg2); transition: background 0.4s; }
        .process-step:hover { background: rgba(255,107,53,0.04); }
        .process-step-num { font-family: 'Playfair Display', serif; font-size: 3.5rem; color: rgba(255,107,53,0.1); margin-bottom: 20px; }
        .process-step-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 12px; }
        .process-step-desc { font-size: 0.85rem; color: var(--text-dim); line-height: 1.7; font-weight: 300; }

        .services-section { padding: 120px 48px; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 60px; }
        .service-card { border: 1px solid var(--border); border-radius: 12px; padding: 40px 32px; transition: all 0.4s; position: relative; }
        .service-card:hover { border-color: rgba(255,107,53,0.2); background: rgba(255,107,53,0.02); }
        .service-card-price { position: absolute; top: 24px; right: 24px; font-size: 10px; color: var(--gold); border: 1px solid rgba(200,164,94,0.1); padding: 4px 12px; border-radius: 4px; }
        .service-card h4 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin-bottom: 12px; }
        .service-card-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .service-card-tags span { font-size: 10px; color: var(--text-dim); background: rgba(255,255,255,0.03); padding: 4px 10px; border-radius: 4px; }

        .cta-section { padding: 160px 48px; text-align: center; }
        .cta-title { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 7vw, 5rem); font-weight: 800; margin-bottom: 24px; }
        .cta-title em { font-style: italic; color: var(--accent); }
        .cta-btn { display: inline-block; background: var(--accent); color: #fff; padding: 18px 48px; border-radius: 40px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; }
        
        @media (max-width: 1024px) {
          .process-grid { grid-template-columns: 1fr 1fr; }
          .services-grid { grid-template-columns: 1fr; }
          .about-section { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

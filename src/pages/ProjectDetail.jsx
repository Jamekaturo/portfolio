import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

export default function ProjectDetail() {
  const THREE = window.THREE;
  const canvasRef = useRef(null);
  useReveal();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    // Floating curved lines background
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    const lineMat = new THREE.LineBasicMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0.05 });

    for (let i = 0; i < 20; i++) {
        const points = [];
        const radius = 2 + Math.random() * 5;
        const segments = 100;
        const height = (Math.random() - 0.5) * 10;
        
        for (let j = 0; j <= segments; j++) {
            const theta = (j / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(
                Math.cos(theta) * radius + (Math.sin(i + j * 0.1) * 0.5),
                (j / segments - 0.5) * 15 + height,
                Math.sin(theta) * radius
            ));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, lineMat);
        line.rotation.x = Math.random() * Math.PI;
        line.rotation.y = Math.random() * Math.PI;
        lineGroup.add(line);
    }

    let animationFrameId;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const time = performance.now() * 0.0001;
        const scrollFactor = window.pageYOffset * 0.001;

        lineGroup.rotation.y = time * 0.2 + scrollFactor * 0.5;
        lineGroup.rotation.x = Math.sin(time * 0.1) * 0.2;

        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <header>
        <Link to="/" className="back-btn hoverable">
          <span></span> Back
        </Link>
        <div className="logo">Jamekaturo</div>
      </header>

      <canvas ref={canvasRef} id="three-canvas"></canvas>

      <section className="project-hero">
        <div className="project-cat">Brand Identity / Web Design</div>
        <h1 className="project-title">
          <span><em>Meridian</em></span><br />
          <span><em>Studio</em></span>
        </h1>

        <div className="project-details">
          <div className="detail-item">
            <label>Client</label>
            <span>Meridian Group</span>
          </div>
          <div className="detail-item">
            <label>Role</label>
            <span>Lead Designer</span>
          </div>
          <div className="detail-item">
            <label>Year</label>
            <span>2025</span>
          </div>
          <div className="detail-item">
            <label>Services</label>
            <span>UI/UX, Branding</span>
          </div>
        </div>
      </section>

      <section className="project-showcase">
        <div className="main-image reveal">
          <img src="/project1.png" alt="Meridian Studio Show" />
        </div>

        <div className="project-description">
          <div className="desc-large reveal">
            Redefining the digital boundary of architectural excellence.
          </div>
          <div className="desc-small reveal">
            Meridian Studio is a global architectural firm that specializes in sustainable, high-end residential and commercial spaces. The goal was to create a digital presence that reflects their commitment to minimalism, structural integrity, and environmental harmony.
            <br /><br />
            We focused on a typography-driven design system, utilizing a modular grid that allows their work to breath while maintaining a strong visual hierarchy.
          </div>
        </div>

        <div className="image-grid">
          <div className="grid-img reveal">
            <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)', width: '100%', height: '100%' }}></div>
          </div>
          <div className="grid-img reveal" style={{ marginTop: '4rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #0f3460, #533483)', width: '100%', height: '100%' }}></div>
          </div>
        </div>

        <div className="project-quote reveal">
          <div className="quote-text">
            "Design is not just what it looks like and feels like. Design is how it works."
          </div>
        </div>

        <div className="main-image reveal">
          <div style={{ background: '#2d132c', width: '100%', height: '100%' }}></div>
        </div>
      </section>

      <section className="next-project">
        <div className="next-label">Next Project</div>
        <Link to="/project" className="next-title hoverable">Noctis Gallery</Link>
      </section>

      <style>{`
        .project-hero { height: 100vh; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 3rem 5rem; position: relative; }
        .project-cat { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--muted); margin-bottom: 1rem; opacity: 0; animation: fadeIn 1s 0.2s forwards; }
        .project-title { font-size: clamp(3rem, 12vw, 10rem); font-weight: 900; letter-spacing: -0.05em; line-height: 0.9; margin-bottom: 2rem; }
        .project-title span { display: inline-block; overflow: hidden; }
        .project-title em { display: block; transform: translateY(120%); animation: slideUp 1s cubic-bezier(0.25, 1, 0.5, 1) forwards; font-style: normal; }
        .project-details { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3rem; border-top: 1px solid var(--border); padding-top: 2rem; opacity: 0; animation: fadeIn 1s 0.8s forwards; }
        .detail-item label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); display: block; margin-bottom: 0.5rem; }
        .detail-item span { font-size: 0.9rem; font-weight: 500; }
        .project-showcase { padding: 5rem 3rem; }
        .main-image { width: 100%; aspect-ratio: 16/9; background: #e0e0e0; margin-bottom: 5rem; overflow: hidden; position: relative; border-radius: 4px; }
        .main-image img { width: 100%; height: 100%; object-fit: cover; }
        .project-description { display: grid; grid-template-columns: 1fr 1fr; gap: 8rem; margin-bottom: 10rem; align-items: start; }
        .desc-large { font-size: 2.2rem; line-height: 1.3; font-weight: 500; letter-spacing: -0.02em; }
        .desc-small { font-size: 1.1rem; line-height: 1.8; color: #444; }
        .image-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 10rem; }
        .grid-img { aspect-ratio: 1; background: #eee; overflow: hidden; border-radius: 4px; }
        .project-quote { padding: 10rem 0; text-align: center; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-bottom: 10rem; }
        .quote-text { font-size: clamp(1.5rem, 5vw, 4rem); font-weight: 700; letter-spacing: -0.04em; max-width: 80%; margin: 0 auto; line-height: 1.1; }
        .next-project { padding: 10rem 3rem; text-align: center; display: flex; flex-direction: column; align-items: center; }
        .next-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.3em; color: var(--muted); margin-bottom: 2rem; }
        .next-title { font-size: clamp(3rem, 10vw, 8rem); font-weight: 900; letter-spacing: -0.04em; text-decoration: none; color: var(--text); line-height: 1; transition: opacity 0.3s; }
        .next-title:hover { opacity: 0.5; }
        @media (max-width: 768px) {
          .project-hero { padding: 0 1.5rem 3rem; }
          .project-details { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
          .project-description { grid-template-columns: 1fr; gap: 3rem; margin-bottom: 5rem; }
          .image-grid { grid-template-columns: 1fr; }
          .project-showcase { padding: 3rem 1.5rem; }
        }
        .back-btn { font-size: 0.8rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text); text-decoration: none; display: flex; align-items: center; gap: 0.8rem; }
        .back-btn span { width: 30px; height: 1px; background: var(--text); transition: width 0.3s ease; }
        .back-btn:hover span { width: 50px; }
      `}</style>
    </div>
  );
}

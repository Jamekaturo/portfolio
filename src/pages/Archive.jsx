import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

export default function Archive() {
  const THREE = window.THREE;
  const [activePreview, setActivePreview] = useState({ active: false, img: '', x: 0, y: 0 });
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
    camera.position.z = 8;

    const cubeCount = 40;
    const cubes = [];
    const cubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cubeMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a, wireframe: true, transparent: true, opacity: 0.03 });

    for (let i = 0; i < cubeCount; i++) {
        const cube = new THREE.Mesh(cubeGeo, cubeMat);
        cube.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10
        );
        cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        scene.add(cube);
        cubes.push({
            mesh: cube,
            rotSpeed: (Math.random() - 0.5) * 0.01
        });
    }

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      cubes.forEach(c => {
          c.mesh.rotation.x += c.rotSpeed;
          c.mesh.rotation.y += c.rotSpeed;
      });
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

  const handleMouseMove = (e) => {
    if (activePreview.active) {
      setActivePreview(prev => ({ ...prev, x: e.clientX + 20, y: e.clientY - 100 }));
    }
  };

  const projects = [
    { num: '00', title: 'WRENCH Auto', cat: 'Auto Restoration / Art', desc: 'Bespoke restoration portfolio', year: '2025', img: '/project1.png', link: '/wrench' },
    { num: '01', title: 'Meridian Studio', cat: 'Branding / Web', desc: 'Core identity and platform', year: '2025', img: '/project1.png', link: '/project' },
    { num: '02', title: 'Noctis Gallery', cat: 'Digital / Art', desc: 'Immersive VR experience', year: '2025', img: '/project2.png', link: '/project' },
    { num: '03', title: 'Forma Architecture', cat: 'Visual / Motion', desc: 'Dynamic structural visuals', year: '2024', img: '/project1.png', link: '/project' },
    { num: '04', title: 'Velvet Magazine', cat: 'Editorial / Type', desc: 'Interactive digital issue', year: '2024', img: '/project2.png', link: '/project' },
    { num: '05', title: 'Nebula App', cat: 'UI / Mobile', desc: 'Social finance platform', year: '2024', img: '/project1.png', link: '/project' },
    { num: '06', title: 'Ethereal Sound', cat: 'Branding / Audio', desc: 'Sonic brand identity', year: '2023', img: '/project2.png', link: '/project' },
    { num: '07', title: 'Silent Wood', cat: 'Packaging', desc: 'Sustainable perfume box', year: '2023', img: '/project1.png', link: '/project' },
  ];

  return (
    <div onMouseMove={handleMouseMove}>
      <header>
        <Link to="/" className="back-btn hoverable">
          <span></span> Home
        </Link>
      </header>

      <div className={`hover-preview ${activePreview.active ? 'active' : ''}`} style={{ left: activePreview.x, top: activePreview.y }}>
        <img src={activePreview.img || '/project1.png'} alt="Preview" />
      </div>

      <canvas ref={canvasRef} id="three-canvas"></canvas>

      <section className="archive-hero">
        <h1 className="archive-title">Archive</h1>
        <div className="archive-meta">
          <span className="archive-count">24 Selected Works</span>
          <span className="archive-count">2021 — 2025</span>
        </div>
      </section>

      <section className="project-list">
        {projects.map((p, i) => (
          <Link 
            key={i} 
            to={p.link} 
            className="project-row hoverable"
            onMouseEnter={() => setActivePreview({ active: true, img: p.img, x: 0, y: 0 })}
            onMouseLeave={() => setActivePreview(prev => ({ ...prev, active: false }))}
          >
            <span className="row-num">{p.num}</span>
            <span className="row-title">{p.title}</span>
            <span className="row-cat">{p.cat}</span>
            <span>{p.desc}</span>
            <span className="row-year">{p.year}</span>
          </Link>
        ))}
      </section>
      <style>{`
        .archive-hero { padding: 12rem 3rem 5rem; }
        .archive-title { font-size: clamp(3rem, 15vw, 12rem); font-weight: 900; letter-spacing: -0.05em; line-height: 0.85; margin-bottom: 2rem; }
        .archive-meta { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 1px solid var(--border); padding-bottom: 2rem; }
        .archive-count { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--muted); }
        .project-list { padding: 0 3rem 10rem; }
        .project-row { display: grid; grid-template-columns: 0.5fr 2fr 1fr 1fr 0.5fr; padding: 2.5rem 0; border-bottom: 1px solid var(--border); align-items: center; text-decoration: none; color: var(--text); transition: opacity 0.3s; position: relative; }
        .project-row:hover { opacity: 0.5; }
        .row-num { font-size: 0.8rem; color: var(--muted); }
        .row-title { font-size: 1.8rem; font-weight: 600; letter-spacing: -0.02em; }
        .row-cat { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); }
        .row-year { font-size: 0.8rem; text-align: right; }
        .hover-preview { position: fixed; width: 300px; height: 200px; pointer-events: none; z-index: 10; opacity: 0; transform: scale(0.8); transition: opacity 0.3s, transform 0.3s; overflow: hidden; border-radius: 4px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .hover-preview.active { opacity: 1; transform: scale(1); }
        .hover-preview img { width: 100%; height: 100%; object-fit: cover; }
        @media (max-width: 768px) {
          .project-row { grid-template-columns: 0.5fr 2fr 1fr; gap: 1rem; }
          .row-year, .project-row span:nth-child(4) { display: none; }
          .archive-hero { padding: 8rem 1.5rem 3rem; }
          .project-list { padding: 0 1.5rem 5rem; }
          .hover-preview { display: none; }
        }
        .back-btn { font-size: 0.8rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text); text-decoration: none; display: flex; align-items: center; gap: 0.8rem; }
        .back-btn span { width: 30px; height: 1px; background: var(--text); transition: width 0.3s ease; }
        .back-btn:hover span { width: 50px; }
      `}</style>
    </div>
  );
}

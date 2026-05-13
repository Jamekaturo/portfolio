import { useState, useEffect, useRef } from 'react';

const projects = [
  {
    title: "Classic\nRestoration",
    subtitle: "Full frame-off restoration of a 1967 fastback. Every bolt replaced, every panel perfected.",
    bigText: "MUSTANG",
    label: "Project 01 — Classic Muscle",
    tag: "Restored to Perfection",
    image: "/mustang.png",
    stages: ['Body Work', 'Paint', 'Engine', 'Interior'],
    glowAccent: '#ff6b35',
    glowWarm: '#c2410c'
  },
  {
    title: "Performance\nRebuild",
    subtitle: "Complete powertrain rebuild on a Porsche 911 air-cooled flat-six. Precision engineering at its finest.",
    bigText: "PORSCHE",
    label: "Project 02 — German Engineering",
    tag: "German Precision",
    image: "/porsche.png",
    stages: ['Teardown', 'Machine Work', 'Assembly', 'Dyno Test'],
    glowAccent: '#fb923c',
    glowWarm: '#f97316'
  },
  {
    title: "Custom\nFabrication",
    subtitle: "Bespoke wide-body kit and roll cage fabrication for a competition-ready drift build.",
    bigText: "SILVIA",
    label: "Project 03 — Drift Build",
    tag: "Drift Build",
    image: "/silvia.png",
    stages: ['Design', 'Fabrication', 'Welding', 'Fitment'],
    glowAccent: '#2dd4bf',
    glowWarm: '#14b8a6'
  },
  {
    title: "Paint\nPerfection",
    subtitle: "Multi-stage candy paint correction and ceramic coating on a vintage Jaguar E-Type.",
    bigText: "JAGUAR",
    label: "Project 04 — Concours Detail",
    tag: "Concours Detail",
    image: "/jaguar.png",
    stages: ['Strip', 'Prime', 'Color', 'Clear Coat'],
    glowAccent: '#e879f9',
    glowWarm: '#d946ef'
  },
  {
    title: "Suspension\nMastery",
    subtitle: "Air-ride conversion and corner-balanced setup for a slammed VIP-style luxury sedan build.",
    bigText: "LEXUS",
    label: "Project 05 — VIP Build",
    tag: "VIP Build",
    image: "/lexus.png",
    stages: ['Measure', 'Install', 'Align', 'Calibrate'],
    glowAccent: '#fbbf24',
    glowWarm: '#f59e0b'
  }
];

export default function WrenchCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardStages, setCardStages] = useState(projects.map(() => 0));
  const [isAnimating, setIsAnimating] = useState(false);
  const bookWrapperRef = useRef(null);

  const goTo = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const next = () => goTo((currentIndex + 1) % projects.length);
  const prev = () => goTo((currentIndex - 1 + projects.length) % projects.length);

  const cycleStage = (idx) => {
    setCardStages(prev => {
      const nextStages = [...prev];
      nextStages[idx] = (nextStages[idx] + 1) % 4;
      return nextStages;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    const timer = setInterval(() => {
      cycleStage(currentIndex);
    }, 3500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Mouse parallax
  useEffect(() => {
    let pmx = 0, pmy = 0;
    const onMouseMove = (e) => {
      pmx = (e.clientX / window.innerWidth - 0.5) * 2;
      pmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let frame;
    const parallaxLoop = () => {
      if (bookWrapperRef.current) {
        const rx = pmy * 3;
        const ry = pmx * -5;
        bookWrapperRef.current.style.transform = `rotateX(${2 + rx}deg) rotateY(${ry}deg)`;
      }
      frame = requestAnimationFrame(parallaxLoop);
    };
    parallaxLoop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <div>
          <div className="section-label" style={{ color: 'var(--accent)' }}>Masterworks</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '3rem' }}>The Collection</h2>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button onClick={prev} className="nav-arrow left" style={{ position: 'relative', top: 'auto', left: 'auto', transform: 'none' }}>←</button>
          <button onClick={next} className="nav-arrow right" style={{ position: 'relative', top: 'auto', right: 'auto', transform: 'none' }}>→</button>
        </div>
      </div>

      <div className="scene-container">
        <div className="book-wrapper" ref={bookWrapperRef}>
          {projects.map((proj, i) => {
            const offset = i - currentIndex;
            let x, z, rotY, opacity, scale, show = false;

            // Simplified logic for infinite feel (need to handle wrap around better for real production)
            // But let's stick to the original logic ported to React style
            const isNext = offset === 1 || (offset < 0 && offset === -(projects.length - 1));
            const isPrev = offset === -1 || (offset > 0 && offset === projects.length - 1);

            if (offset === 0) {
              x = -40; z = 0; rotY = 8; opacity = 1; scale = 1; show = true;
            } else if (isNext) {
              x = 180; z = -100; rotY = -20; opacity = 0.85; scale = 0.92; show = true;
            } else if (isPrev) {
              x = -260; z = -120; rotY = 30; opacity = 0.6; scale = 0.88; show = true;
            } else if (offset === 2) {
              x = 350; z = -200; rotY = -30; opacity = 0.3; scale = 0.8; show = true;
            } else {
              x = 0; z = -300; rotY = 0; opacity = 0; scale = 0.7; show = false;
            }

            return (
              <div 
                key={i} 
                className={`card ${offset === 0 ? 'active' : ''}`}
                style={{
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${scale})`,
                  opacity: opacity,
                  zIndex: offset === 0 ? 10 : isNext ? 5 : 1,
                  display: show ? 'block' : 'none'
                }}
                onClick={() => offset === 0 ? cycleStage(i) : goTo(i)}
              >
                <div className="card-image">
                  <img src={proj.image} alt={proj.bigText} />
                </div>
                <div className="card-gradient"></div>
                <div className="card-tag">{proj.tag}</div>
                <div className="card-big-text">{proj.bigText}</div>
                <div className="stage-indicator">
                  {proj.stages.map((_, si) => (
                    <div 
                      key={si} 
                      className={`stage-pip ${si <= cardStages[i] ? 'active' : ''}`}
                    ></div>
                  ))}
                </div>
                <div className="card-content">
                  <div className="card-label">{proj.label}</div>
                  <div className="card-title" style={{ whiteSpace: 'pre-line' }}>{proj.title}</div>
                  <div className="card-subtitle">{proj.subtitle}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="nav-dots">
        {projects.map((_, i) => (
          <button 
            key={i} 
            className={`nav-dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(i)}
          ></button>
        ))}
      </div>

      <div className="glow-sphere glow-1" style={{ background: projects[currentIndex].glowAccent }}></div>
      <div className="glow-sphere glow-2" style={{ background: projects[currentIndex].glowWarm }}></div>
    </section>
  );
}

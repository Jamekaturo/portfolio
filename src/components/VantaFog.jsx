import { useEffect, useRef, useState } from 'react';

export default function VantaFog({ onFinish }) {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [bushes, setBushes] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && window.VANTA) {
      setVantaEffect(
        window.VANTA.FOG({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true, touchControls: true, gyroControls: false,
          minHeight: 200.00, minWidth: 200.00,
          highlightColor: 0xcccccc, midtoneColor: 0x888888, lowlightColor: 0xaaaaaa, baseColor: 0xdddddd,
          blurFactor: 0.45, speed: 0.8, zoom: 1.0
        })
      );
    }
    
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleStart = () => {
    if (isActive) return;
    setIsActive(true);
    
    const NUM_RINGS = 4;
    const TOTAL_ANIMATION_TIME = 1500;
    const newBushes = [];
    const maxRadius = Math.sqrt(window.innerWidth*window.innerWidth + window.innerHeight*window.innerHeight) / 2 * 1.1;

    for (let ring = NUM_RINGS; ring >= 0; ring--) {
        const ringProg = ring / NUM_RINGS;
        const radius = ringProg * maxRadius;
        const numBushes = ring === 0 ? 1 : Math.floor(ring * 5); 

        for (let i = 0; i < numBushes; i++) {
            const angle = (i / numBushes) * Math.PI * 2;
            const offsetX = Math.cos(angle) * Math.max(radius, 1);
            const offsetY = Math.sin(angle) * Math.max(radius, 1);
            
            newBushes.push({
              id: `${ring}-${i}`,
              x: `calc(50% + ${offsetX + (Math.random()-0.5)*80}px)`,
              y: `calc(50% + ${offsetY + (Math.random()-0.5)*80}px)`,
              rot: `${Math.random()*360}deg`,
              scale: 1.6 + Math.random()*0.9,
              delay: (NUM_RINGS - ring) / NUM_RINGS
            });
        }
    }
    setBushes(newBushes);

    const renderAnim = () => {
        const bushNodes = document.querySelectorAll('.bush-element');
        bushNodes.forEach(bush => {
            const animDelay = parseFloat(bush.dataset.delay) * (TOTAL_ANIMATION_TIME - 500);
            setTimeout(() => bush.classList.add('visible'), animDelay);
        });

        setTimeout(() => {
            setIsHiding(true);
            if (vantaEffect) vantaEffect.destroy();
            if (onFinish) onFinish();
        }, TOTAL_ANIMATION_TIME - 400);

        setTimeout(() => {
            bushNodes.forEach((bush) => {
                const animDelay = (1.0 - parseFloat(bush.dataset.delay)) * 500;
                setTimeout(() => {
                    bush.classList.remove('visible');
                    bush.classList.add('hiding');
                }, animDelay);
            });
        }, TOTAL_ANIMATION_TIME + 200);

        setTimeout(() => {
            setIsActive(false);
            setBushes([]); // Clear DOM
        }, TOTAL_ANIMATION_TIME + 1200);
    };

    // Need a tiny delay for React to mount the bushes
    setTimeout(renderAnim, 50);
  };

  if (isHiding && bushes.length === 0) return null;

  return (
    <>
      <div id="intro-fog-container" className={isHiding ? 'hidden' : ''} style={{ zIndex: 2000, pointerEvents: isHiding ? 'none' : 'auto' }}>
        <div id="vanta-bg" ref={vantaRef}></div>
        <div className="intro-title-wrap">
          <h1 id="intro-title" onClick={handleStart}>Jamekaturo</h1>
        </div>
      </div>

      {(isActive || bushes.length > 0) && (
        <div className={`transition-overlay ${isActive ? 'active' : ''}`} style={{ display: 'block' }}>
          {bushes.map(b => (
            <div 
              key={b.id} 
              className="bush-element"
              data-delay={b.delay}
              style={{
                left: b.x, top: b.y,
                '--rot': b.rot, '--scale': b.scale
              }}
            ></div>
          ))}
        </div>
      )}
    </>
  );
}

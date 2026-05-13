import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;
    let animationFrameId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      
      cursor.style.left = `${cursorX - 8}px`;
      cursor.style.top = `${cursorY - 8}px`;
      ring.style.left = `${ringX - 24}px`;
      ring.style.top = `${ringY - 24}px`;
      
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    animationFrameId = requestAnimationFrame(updateCursor);

    // Add logic for hoverables
    const addHoverLinks = () => {
      const hoverables = document.querySelectorAll('.hoverable, a, button, .work-thumb');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hover');
          ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hover');
          ring.classList.remove('hover');
        });
      });
    };
    
    // We run it with a timeout to catch async rendered elements, or ideally use mutation observer.
    setTimeout(addHoverLinks, 1000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} id="cursor"></div>
      <div className="cursor-ring" ref={ringRef} id="cursorRing"></div>
    </>
  );
}

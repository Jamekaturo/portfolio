import { useEffect, useRef } from 'react';

export default function ThreeCanvas() {
  const THREE = window.THREE;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    // Particles
    const particleCount = 400;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i*3] = (Math.random()-0.5)*20;
        positions[i*3+1] = (Math.random()-0.5)*20;
        positions[i*3+2] = (Math.random()-0.5)*10;
    }
    const pGeo = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x0a0a0a, size: 0.02, transparent: true, opacity: 0.2 });
    scene.add(new THREE.Points(pGeo, pMat));

    // Wireframe geometries
    const geoGroup = new THREE.Group();
    scene.add(geoGroup);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0a0a0a,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });

    const torus = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.4, 16, 60), wireMat);
    torus.position.set(4, 1, -2);
    geoGroup.add(torus);

    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), wireMat.clone());
    ico.material.opacity = 0.08;
    ico.position.set(-4, -2, -1);
    geoGroup.add(ico);

    const octahedron = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), wireMat.clone());
    octahedron.material.opacity = 0.07;
    octahedron.position.set(2, -3, -3);
    geoGroup.add(octahedron);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.02, 8, 80), wireMat.clone());
    ring.material.opacity = 0.1;
    ring.position.set(-3, 3, -2);
    geoGroup.add(ring);

    // Lines connecting random points
    const lineCount = 30;
    const lineMat = new THREE.LineBasicMaterial({ color: 0x0a0a0a, transparent: true, opacity: 0.04 });
    for (let i = 0; i < lineCount; i++) {
      const pts = [];
      const segments = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < segments; j++) {
        pts.push(new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 6 - 3,
        ));
      }
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
    }

    // Animation variables
    const clock = new THREE.Clock();
    let mx = 0, my = 0;
    
    const onMouseMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animationFrameId;

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();
        const scrollFactor = window.pageYOffset * 0.001;
        
        // Rotate geometries
        torus.rotation.x = elapsed * 0.15 + scrollFactor;
        torus.rotation.y = elapsed * 0.1;
        ico.rotation.x = elapsed * 0.12;
        ico.rotation.y = elapsed * 0.18 + scrollFactor * 0.5;
        octahedron.rotation.x = elapsed * 0.2;
        octahedron.rotation.z = elapsed * 0.1;
        ring.rotation.x = Math.PI * 0.4 + Math.sin(elapsed * 0.3) * 0.2;
        ring.rotation.y = elapsed * 0.15;

        // Camera parallax & lookAt
        camera.position.x += (mx * 0.4 - camera.position.x) * 0.03;
        camera.position.y += (-my * 0.3 - scrollFactor * 3 - camera.position.y) * 0.03;
        camera.lookAt(0, -scrollFactor * 3, 0);

        renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      // Clean up WebGL resources
      renderer.dispose();
      geoGroup.children.forEach(c => {
        if (c.geometry) c.geometry.dispose();
        if (c.material) c.material.dispose();
      });
    };
  }, []);

  return <canvas id="three-canvas" ref={canvasRef}></canvas>;
}

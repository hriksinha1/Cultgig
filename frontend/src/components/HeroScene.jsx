/* HeroScene - Vanilla Three.js 3D canvas with floating objects, particles, and Bloom */
/* Uses raw Three.js to avoid conflicts with visual-edits wrapper injecting DOM attributes */
import { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

function HeroScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio < 2, // Only antialias on low-DPI screens
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Slightly higher than before but optimized
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Post-processing: Bloom for neon glow
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.2,  // strength
      0.8,  // radius
      0.1   // threshold
    );
    composer.addPass(bloomPass);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0xeaff00, 0.3, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xeaff00, 0.15, 50);
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    // Emissive wireframe material
    const neonMat = (opacity = 0.9, intensity = 0.8) =>
      new THREE.MeshStandardMaterial({
        color: 0xeaff00,
        emissive: 0xeaff00,
        emissiveIntensity: intensity,
        wireframe: true,
        transparent: true,
        opacity,
      });

    // ── Microphone ──
    const micGroup = new THREE.Group();
    const micHead = new THREE.Mesh(new THREE.IcosahedronGeometry(0.4, 1), neonMat(0.9, 0.8));
    micHead.position.y = 0.6;
    micGroup.add(micHead);
    const micBody = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 1, 8), neonMat(0.7, 0.5));
    micBody.position.y = -0.2;
    micGroup.add(micBody);
    micGroup.position.set(-3, 1, 0);
    scene.add(micGroup);

    // ── Camera 3D object ──
    const camGroup = new THREE.Group();
    const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.4), neonMat(0.8, 0.6));
    camGroup.add(camBody);
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 0.3, 12), neonMat(0.7, 0.7));
    lens.rotation.x = Math.PI / 2;
    lens.position.z = 0.35;
    camGroup.add(lens);
    camGroup.position.set(3.5, -0.5, -1);
    scene.add(camGroup);

    // ── Sound wave rings ──
    const ringsGroup = new THREE.Group();
    [0.5, 0.7, 0.9].forEach((r, i) => {
      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.02, 8, 32),
        neonMat(0.6 - i * 0.15, 0.6 - i * 0.15)
      );
      torus.rotation.x = Math.PI / 2;
      ringsGroup.add(torus);
    });
    ringsGroup.position.set(-2, -1.5, -2);
    scene.add(ringsGroup);

    // ── Musical notes ──
    const createNote = (pos, s) => {
      const g = new THREE.Group();
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), neonMat(0.9, 0.7));
      head.rotation.z = 0.3;
      g.add(head);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 6), neonMat(0.8, 0.5));
      stem.position.set(0.2, 0.6, 0);
      g.add(stem);
      g.position.set(...pos);
      g.scale.setScalar(s);
      scene.add(g);
      return g;
    };
    const note1 = createNote([2.5, 1.5, -1], 0.5);
    const note2 = createNote([-1.5, 2, -0.5], 0.5);

    // ── Instanced particle field ──
    const particleCount = 180;
    const particleGeo = new THREE.SphereGeometry(1, 6, 6);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xeaff00,
      emissive: 0xeaff00,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.8,
    });
    const instancedMesh = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    const dummy = new THREE.Object3D();
    const particleData = [];
    for (let i = 0; i < particleCount; i++) {
      particleData.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * 10,
        speed: 0.1 + Math.random() * 0.3,
        scale: 0.02 + Math.random() * 0.04,
      });
    }
    scene.add(instancedMesh);

    // Mouse tracking for parallax
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;

      // Animate microphone
      micGroup.rotation.y = t * 0.3;
      micGroup.position.y = 1 + Math.sin(t * 0.8) * 0.2;

      // Animate camera
      camGroup.rotation.y = t * 0.2 + Math.PI * 0.25;
      camGroup.rotation.x = Math.sin(t * 0.4) * 0.15;
      camGroup.position.y = -0.5 + Math.sin(t * 0.6) * 0.15;

      // Animate rings
      ringsGroup.rotation.z = t * 0.15;
      ringsGroup.position.y = -1.5 + Math.cos(t * 0.5) * 0.1;

      // Animate notes
      note1.rotation.z = Math.sin(t * 0.5) * 0.3;
      note1.position.y = 1.5 + Math.sin(t * 0.7) * 0.3;
      note2.rotation.z = Math.sin(t * 0.7) * 0.3;
      note2.position.y = 2 + Math.sin(t * 0.5) * 0.25;

      // Update particles
      particleData.forEach((p, i) => {
        dummy.position.set(
          p.x + Math.sin(t * p.speed + i) * 0.3,
          p.y + Math.cos(t * p.speed + i * 0.5) * 0.2,
          p.z
        );
        dummy.scale.setScalar(p.scale);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      });
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Parallax camera
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      composer.render();
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      composer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} data-testid="hero-3d-canvas" className="absolute inset-0 z-0" />;
}

const MemoizedHeroScene = memo(HeroScene);
export default MemoizedHeroScene;

import { useEffect, useRef } from 'react';

// ===== TYPES =====
interface Star {
  x: number; y: number; size: number; opacity: number;
  speed: number; layer: number; twinklePhase: number;
}

interface NeuralNode {
  x: number; y: number; vx: number; vy: number;
  radius: number; opacity: number; pulsePhase: number;
  connections: number[];
}

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; life: number; maxLife: number;
  type: 'data' | 'energy' | 'pulse';
  trail: { x: number; y: number }[];
}

interface SacredRing {
  x: number; y: number; radius: number; rotation: number;
  rotationSpeed: number; opacity: number;
  segments: number; petalCount: number;
}

interface CircuitPath {
  points: { x: number; y: number }[];
  pulsePositions: number[];
  pulseSpeeds: number[];
  opacity: number;
}

export function ThemeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;

    // ===== STATE =====
    const stars: Star[] = [];
    const nodes: NeuralNode[] = [];
    const particles: Particle[] = [];
    const sacredRings: SacredRing[] = [];
    const circuits: CircuitPath[] = [];
    const centerX = () => W * 0.5;
    const centerY = () => H * 0.5;

    // ===== INIT =====
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      regenerateAll();
    };

    const regenerateAll = () => {
      // Stars
      stars.length = 0;
      const starCount = Math.floor((W * H) / 2500);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          size: Math.random() * 1.5 + 0.2,
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.2 + 0.05,
          layer: Math.floor(Math.random() * 3),
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }

      // Neural nodes
      nodes.length = 0;
      const nodeCount = Math.floor(Math.min(W, H) / 25);
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
        });
      }

      // Sacred geometry rings
      sacredRings.length = 0;
      const ringCount = 3;
      for (let i = 0; i < ringCount; i++) {
        sacredRings.push({
          x: W * (0.3 + Math.random() * 0.4),
          y: H * (0.2 + Math.random() * 0.4),
          radius: 60 + i * 40,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.002,
          opacity: 0.08 - i * 0.02,
          segments: 6 + i * 6,
          petalCount: 6 + i * 6,
        });
      }

      // Circuit paths
      circuits.length = 0;
      const circuitCount = Math.floor(W / 200);
      for (let i = 0; i < circuitCount; i++) {
        const points: { x: number; y: number }[] = [];
        const startX = Math.random() * W;
        const startY = Math.random() * H;
        let cx = startX;
        let cy = startY;
        const segs = 3 + Math.floor(Math.random() * 4);
        for (let s = 0; s < segs; s++) {
          points.push({ x: cx, y: cy });
          cx += (Math.random() - 0.5) * 200;
          cy += (Math.random() - 0.5) * 200;
        }
        points.push({ x: cx, y: cy });

        const pulseCount = 1 + Math.floor(Math.random() * 2);
        const pulsePositions: number[] = [];
        const pulseSpeeds: number[] = [];
        for (let p = 0; p < pulseCount; p++) {
          pulsePositions.push(Math.random());
          pulseSpeeds.push(0.002 + Math.random() * 0.003);
        }

        circuits.push({
          points,
          pulsePositions,
          pulseSpeeds,
          opacity: 0.1 + Math.random() * 0.15,
        });
      }
    };

    // ===== DRAW FUNCTIONS =====
    const drawStars = (time: number) => {
      stars.forEach((star) => {
        const parallaxOffset = scrollRef.current * star.speed * (star.layer + 1) * 0.1;
        const y = ((star.y - parallaxOffset) % H + H) % H;
        const twinkle = Math.sin(time * 0.001 * star.speed + star.twinklePhase) * 0.4 + 0.6;
        const alpha = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 210, 255, ${alpha})`;
        ctx.fill();

        if (star.size > 1) {
          ctx.beginPath();
          ctx.arc(star.x, y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(53, 161, 255, ${alpha * 0.06})`;
          ctx.fill();
        }
      });
    };

    const drawNeuralNetwork = (time: number) => {
      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;

      // Update node positions and find connections
      nodes.forEach((node, i) => {
        // Gentle drift
        node.x += node.vx;
        node.y += node.vy;

        // Mouse influence (subtle repulsion)
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150 * 0.02;
          node.x += (dx / dist) * force;
          node.y += (dy / dist) * force;
        }

        // Boundary wrap
        if (node.x < -20) node.x = W + 20;
        if (node.x > W + 20) node.x = -20;
        if (node.y < -20) node.y = H + 20;
        if (node.y > H + 20) node.y = -20;

        // Build connections
        node.connections = [];
        nodes.forEach((other, j) => {
          if (i === j) return;
          const ddx = node.x - other.x;
          const ddy = node.y - other.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 120) {
            node.connections.push(j);
          }
        });
      });

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((otherIdx) => {
          const other = nodes[otherIdx];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const alpha = (1 - dist / 120) * 0.15 * node.opacity;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(53, 161, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 0.002 + node.pulsePhase) * 0.3 + 0.7;
        const alpha = node.opacity * pulse;

        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(53, 161, 255, ${alpha * 0.08})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 200, 255, ${alpha})`;
        ctx.fill();
      });
    };

    const drawSacredGeometry = (_time: number) => {
      sacredRings.forEach((ring) => {
        ring.rotation += ring.rotationSpeed;

        ctx.save();
        ctx.translate(ring.x, ring.y);
        ctx.rotate(ring.rotation);

        // Flower of Life pattern (overlapping circles)
        const r = ring.radius;
        const petalAngle = (Math.PI * 2) / ring.petalCount;

        for (let i = 0; i < ring.petalCount; i++) {
          const angle = petalAngle * i;
          const px = Math.cos(angle) * r * 0.5;
          const py = Math.sin(angle) * r * 0.5;

          ctx.beginPath();
          ctx.arc(px, py, r * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(53, 161, 255, ${ring.opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Center circle
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(53, 161, 255, ${ring.opacity * 1.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Outer ring
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(53, 161, 255, ${ring.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      });
    };

    const drawCircuits = (_time: number) => {
      circuits.forEach((circuit) => {
        // Draw path
        if (circuit.points.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(circuit.points[0].x, circuit.points[0].y);
        for (let i = 1; i < circuit.points.length; i++) {
          ctx.lineTo(circuit.points[i].x, circuit.points[i].y);
        }
        ctx.strokeStyle = `rgba(53, 161, 255, ${circuit.opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Draw energy pulses
        circuit.pulsePositions.forEach((_pos, pi) => {
          circuit.pulsePositions[pi] += circuit.pulseSpeeds[pi];
          if (circuit.pulsePositions[pi] > 1) circuit.pulsePositions[pi] = 0;

          const posVal = circuit.pulsePositions[pi];
          const totalLen = circuit.points.length - 1;
          const seg = Math.floor(posVal * totalLen);
          const segT = (posVal * totalLen) % 1;

          if (seg < circuit.points.length - 1) {
            const p0 = circuit.points[seg];
            const p1 = circuit.points[seg + 1];
            const px = p0.x + (p1.x - p0.x) * segT;
            const py = p0.y + (p1.y - p0.y) * segT;

            // Pulse glow
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(53, 161, 255, ${circuit.opacity * 0.3})`;
            ctx.fill();

            // Pulse core
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 220, 255, ${circuit.opacity * 0.8})`;
            ctx.fill();
          }
        });
      });
    };

    const drawParticles = (_time: number) => {
      // Spawn new particles
      if (particles.length < 80 && Math.random() < 0.3) {
        const cx = centerX();
        const cy = centerY();
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        const type = Math.random() < 0.4 ? 'data' : Math.random() < 0.7 ? 'energy' : 'pulse';

        particles.push({
          x: cx + (Math.random() - 0.5) * W * 0.8,
          y: cy + (Math.random() - 0.5) * H * 0.8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: type === 'pulse' ? 1.5 : 1,
          opacity: Math.random() * 0.5 + 0.3,
          life: 0,
          maxLife: 200 + Math.random() * 300,
          type,
          trail: [],
        });
      }

      // Update and draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Update position with slight intelligence (curve toward center softly)
        const cx = centerX();
        const cy = centerY();
        const dx = cx - p.x;
        const dy = cy - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 50) {
          p.vx += (dx / dist) * 0.005;
          p.vy += (dy / dist) * 0.005;
        }

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 2) {
          p.vx = (p.vx / speed) * 2;
          p.vy = (p.vy / speed) * 2;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.shift();

        const lifeRatio = p.life / p.maxLife;
        const alpha = p.opacity * (lifeRatio < 0.1 ? lifeRatio / 0.1 : lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : 1);

        // Draw trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }

          if (p.type === 'data') {
            ctx.strokeStyle = `rgba(53, 161, 255, ${alpha * 0.3})`;
          } else if (p.type === 'energy') {
            ctx.strokeStyle = `rgba(100, 220, 255, ${alpha * 0.25})`;
          } else {
            ctx.strokeStyle = `rgba(150, 240, 255, ${alpha * 0.4})`;
          }
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.type === 'data') {
          ctx.fillStyle = `rgba(53, 161, 255, ${alpha})`;
        } else if (p.type === 'energy') {
          ctx.fillStyle = `rgba(100, 220, 255, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(200, 250, 255, ${alpha})`;
        }
        ctx.fill();
      }
    };

    const drawScanningRings = (time: number) => {
      const cx = centerX();
      const cy = centerY();

      // Rotating data rings
      for (let i = 0; i < 2; i++) {
        const radius = 100 + i * 80;
        const rotation = time * 0.0003 * (i % 2 === 0 ? 1 : -1);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);

        // Draw ring segments
        const segCount = 12 + i * 8;
        for (let s = 0; s < segCount; s++) {
          const angle = (Math.PI * 2 / segCount) * s;
          const nextAngle = (Math.PI * 2 / segCount) * (s + 0.6);

          ctx.beginPath();
          ctx.arc(0, 0, radius, angle, nextAngle);
          ctx.strokeStyle = `rgba(53, 161, 255, ${0.06 + i * 0.02})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      }

      // Radar sweep
      const sweepAngle = (time * 0.0005) % (Math.PI * 2);
      const sweepGrad = ctx.createConicGradient(sweepAngle, cx, cy);
      sweepGrad.addColorStop(0, 'rgba(53, 161, 255, 0)');
      sweepGrad.addColorStop(0.02, 'rgba(53, 161, 255, 0.08)');
      sweepGrad.addColorStop(0.1, 'rgba(53, 161, 255, 0)');

      ctx.fillStyle = sweepGrad;
      ctx.fillRect(cx - 200, cy - 200, 400, 400);
    };

    // ===== MAIN LOOP =====
    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, W, H);

      drawStars(timestamp);
      drawSacredGeometry(timestamp);
      drawCircuits(timestamp);
      drawScanningRings(timestamp);
      drawNeuralNetwork(timestamp);
      drawParticles(timestamp);

      rafRef.current = requestAnimationFrame(draw);
    };

    // ===== EVENTS =====
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / W;
      mouseRef.current.y = e.clientY / H;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    resize();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, width: '100%', height: '100%' }}
    />
  );
}

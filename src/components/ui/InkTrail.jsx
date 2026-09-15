import { useEffect, useRef } from 'react';

class InkParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 14 + 3;
    this.life = 1.0;
    this.decay = Math.random() * 0.015 + 0.008;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.04;
  }

  update() {
    this.life -= this.decay;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.98;
    this.vy *= 0.98;
    this.size *= 0.997;
    this.rotation += this.rotSpeed;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.life * 0.6;

    // Main ink blob
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 0.7, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#111827';
    ctx.fill();

    // Smaller satellite blob for organic feel
    if (this.size > 5) {
      ctx.beginPath();
      ctx.ellipse(
        this.size * 0.5,
        this.size * 0.3,
        this.size * 0.3,
        this.size * 0.2,
        0.5,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = '#1f2937';
      ctx.fill();
    }

    ctx.restore();
  }
}

export default function InkTrail() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const prevMouseRef = useRef({ x: -100, y: -100 });
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Calculate distance for density control
      const dx = mouseRef.current.x - prevMouseRef.current.x;
      const dy = mouseRef.current.y - prevMouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn particles along the path for smooth trails
      const steps = Math.max(1, Math.floor(dist / 4));
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const px = prevMouseRef.current.x + dx * t + (Math.random() - 0.5) * 8;
        const py = prevMouseRef.current.y + dy * t + (Math.random() - 0.5) * 8;
        particlesRef.current.push(new InkParticle(px, py));
      }

      // Also add a couple of splatter particles at speed
      if (dist > 10) {
        for (let i = 0; i < 2; i++) {
          const splatter = new InkParticle(
            mouseRef.current.x + (Math.random() - 0.5) * 20,
            mouseRef.current.y + (Math.random() - 0.5) * 20
          );
          splatter.size = Math.random() * 4 + 1;
          splatter.decay = Math.random() * 0.02 + 0.015;
          particlesRef.current.push(splatter);
        }
      }

      // Limit particles for performance
      if (particlesRef.current.length > 500) {
        particlesRef.current = particlesRef.current.slice(-400);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting ink streaks between close particles
      const particles = particlesRef.current;
      for (let i = 1; i < particles.length; i++) {
        const p1 = particles[i - 1];
        const p2 = particles[i];
        if (p1.life > 0.3 && p2.life > 0.3) {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 30) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#111827';
            ctx.globalAlpha = Math.min(p1.life, p2.life) * 0.25;
            ctx.lineWidth = Math.min(p1.size, p2.size) * 0.4;
            ctx.lineCap = 'round';
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Update and draw particles
      for (const p of particles) {
        p.update();
        p.draw(ctx);
      }

      // Remove dead particles
      particlesRef.current = particles.filter((p) => p.life > 0);

      frameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}

import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  
  // Usamos una referencia para el mouse para que la animación sea fluida
  const mouseRef = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(); // Re-inicializar si cambia el tamaño
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        // VELOCIDAD BASE: Aquí controlas qué tan rápido flotan solas
        this.baseSpeedX = (Math.random() - 0.5) * 0.8;
        this.baseSpeedY = (Math.random() - 0.5) * 0.8;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        // Movimiento constante
        this.x += this.speedX;
        this.y += this.speedY;

        // Rebote o teletransporte en bordes
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        // INTERACCIÓN CON EL MOUSE
        const mX = mouseRef.current.x;
        const mY = mouseRef.current.y;
        const radius = mouseRef.current.radius;

        if (mX !== null && mY !== null) {
          let dx = mX - this.x;
          let dy = mY - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < radius) {
            // Fuerza de empuje (Repulsión)
            const force = (radius - distance) / radius;
            const directionX = (dx / distance) * force * 10; // El '10' es la fuerza de escape
            const directionY = (dy / distance) * force * 10;

            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const quantity = (canvas.width * canvas.height) / 6000;
      for (let i = 0; i < quantity; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // El array vacío es clave: Solo se ejecuta una vez al montar

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        /* background: '#13011f' */
      }}
    />
  );
};

export default ParticleBackground;
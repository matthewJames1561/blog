import React, { useEffect, useRef, useState } from 'react';
import './Orbit.css';

const Orbit = ({ onToggleContent, contentVisible = true }) => {
  const canvasRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [isPlanetMode, setIsPlanetMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const animationFrameRef = useRef(null);
  const planetsRef = useRef([]);
  const sunRef = useRef(null);
  const mousePlanetRef = useRef(null);

  // Constants
  const G = 1; // Gravitational constant (adjusted for visual effect)
  const SUN_MASS = 1000;
  const MOUSE_PLANET_MASS = 500;

  // Initialize once on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Update sun position on resize
      if (sunRef.current) {
        sunRef.current.x = canvas.width / 2;
        sunRef.current.y = canvas.height / 2;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Sun position (center of canvas)
    sunRef.current = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 30,
      mass: SUN_MASS,
      color: '#FDB813'
    };

    // Initialize planets with different orbits
    const sun = sunRef.current;
    
    // Helper function to calculate circular orbital velocity
    const calculateOrbitalVelocity = (distance, sunMass) => {
      return Math.sqrt((G * sunMass) / distance);
    };
    
    // Helper function to add some randomness to orbit
    const addRandomVariation = (value, variationPercent = 0.2) => {
      const variation = value * variationPercent * (Math.random() - 0.5) * 2;
      return value + variation;
    };
    
    const planetConfigs = [
      { distance: 120, radius: 8, mass: 50, color: '#8B7355' },
      { distance: 180, radius: 12, mass: 80, color: '#FFA500' },
      { distance: 250, radius: 10, mass: 60, color: '#4169E1' },
      { distance: 320, radius: 9, mass: 55, color: '#DC143C' },
      { distance: 400, radius: 16, mass: 120, color: '#DAA520' },
      { distance: 480, radius: 14, mass: 100, color: '#87CEEB' }
    ];
    
    planetsRef.current = planetConfigs.map(config => {
      const angle = Math.random() * Math.PI * 2; // Random starting angle
      const distance = config.distance;
      
      // Position planet at random angle around sun
      const x = sun.x + Math.cos(angle) * distance;
      const y = sun.y + Math.sin(angle) * distance;
      
      // Calculate orbital velocity (perpendicular to radius)
      const orbitalSpeed = calculateOrbitalVelocity(distance, SUN_MASS);
      const speedWithVariation = addRandomVariation(orbitalSpeed, 0.15);
      
      // Velocity perpendicular to the radius (for circular orbit)
      const vx = -Math.sin(angle) * speedWithVariation;
      const vy = Math.cos(angle) * speedWithVariation;
      
      return {
        x,
        y,
        vx,
        vy,
        radius: config.radius,
        mass: config.mass,
        color: config.color,
        trail: []
      };
    });

    // Mouse planet
    mousePlanetRef.current = {
      x: canvas.width / 2 + 200,
      y: canvas.height / 2,
      radius: 15,
      mass: MOUSE_PLANET_MASS,
      color: '#FF1493'
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!sunRef.current || !mousePlanetRef.current) return;

    const sun = sunRef.current;
    const mousePlanet = mousePlanetRef.current;

    // Calculate gravitational force between two bodies
    const calculateGravity = (body1, body2) => {
      const dx = body2.x - body1.x;
      const dy = body2.y - body1.y;
      const distanceSquared = dx * dx + dy * dy;
      const distance = Math.sqrt(distanceSquared);
      
      // Prevent division by zero and extreme forces at close distances
      const minDistance = 20;
      const effectiveDistance = Math.max(distance, minDistance);
      
      const force = (G * body1.mass * body2.mass) / (effectiveDistance * effectiveDistance);
      const angle = Math.atan2(dy, dx);
      
      return {
        fx: Math.cos(angle) * force,
        fy: Math.sin(angle) * force
      };
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Save context and apply transformations
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(zoom, zoom);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Update mouse planet position (account for zoom)
      const worldMouseX = (mousePosRef.current.x - canvas.width / 2) / zoom + canvas.width / 2;
      const worldMouseY = (mousePosRef.current.y - canvas.height / 2) / zoom + canvas.height / 2;
      mousePlanet.x = worldMouseX || canvas.width / 2 + 200;
      mousePlanet.y = worldMouseY || canvas.height / 2;

      // Draw sun
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
      ctx.fillStyle = sun.color;
      ctx.shadowBlur = 20;
      ctx.shadowColor = sun.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Update and draw planets
      planetsRef.current.forEach((planet, index) => {
        // Check if planet hit the sun (only if not already exploding)
        if (!planet.exploding) {
          const distanceToSun = Math.sqrt(
            Math.pow(planet.x - sun.x, 2) + Math.pow(planet.y - sun.y, 2)
          );
          
          if (distanceToSun < sun.radius + planet.radius) {
            // Explosion effect
            planet.exploding = true;
            planet.explosionTime = 0;
            planet.explosionParticles = [];
            
            // Create explosion particles
            const particleCount = 30;
            for (let i = 0; i < particleCount; i++) {
              const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.2;
              const speed = 3 + Math.random() * 5;
              planet.explosionParticles.push({
                x: planet.x,
                y: planet.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                size: 3 + Math.random() * 3
              });
            }
          }
        }
        
        // Handle explosion animation
        if (planet.exploding) {
          planet.explosionTime += 1;
          
          // Draw explosion particles
          planet.explosionParticles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98; // Slow down over time
            particle.vy *= 0.98;
            particle.life -= 0.015;
            
            if (particle.life > 0) {
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
              ctx.fillStyle = planet.color;
              ctx.globalAlpha = particle.life;
              ctx.shadowBlur = 8;
              ctx.shadowColor = planet.color;
              ctx.fill();
              ctx.shadowBlur = 0;
              ctx.globalAlpha = 1.0;
            }
          });
          
          // After explosion, reset planet
          if (planet.explosionTime > 50) {
            const planetConfigs = [
              { distance: 120, radius: 8, mass: 50, color: '#8B7355' },
              { distance: 180, radius: 12, mass: 80, color: '#FFA500' },
              { distance: 250, radius: 10, mass: 60, color: '#4169E1' },
              { distance: 320, radius: 9, mass: 55, color: '#DC143C' },
              { distance: 400, radius: 16, mass: 120, color: '#DAA520' },
              { distance: 480, radius: 14, mass: 100, color: '#87CEEB' }
            ];
            
            const config = planetConfigs[index];
            const angle = Math.random() * Math.PI * 2;
            const distance = config.distance;
            
            planet.x = sun.x + Math.cos(angle) * distance;
            planet.y = sun.y + Math.sin(angle) * distance;
            
            const orbitalSpeed = Math.sqrt((G * SUN_MASS) / distance);
            const speedWithVariation = orbitalSpeed + (orbitalSpeed * 0.15 * (Math.random() - 0.5) * 2);
            
            planet.vx = -Math.sin(angle) * speedWithVariation;
            planet.vy = Math.cos(angle) * speedWithVariation;
            planet.trail = [];
            planet.exploding = false;
            planet.explosionParticles = [];
          }
          
          return; // Skip normal physics when exploding
        }
        
        // Calculate force from sun
        const sunForce = calculateGravity(planet, sun);
        
        // Calculate force from mouse planet (only if in planet mode)
        const mouseForce = isPlanetMode ? calculateGravity(planet, mousePlanet) : { fx: 0, fy: 0 };
        
        // Calculate forces from other planets
        let otherPlanetsFx = 0;
        let otherPlanetsFy = 0;
        planetsRef.current.forEach((otherPlanet, otherIndex) => {
          if (index !== otherIndex) {
            const force = calculateGravity(planet, otherPlanet);
            otherPlanetsFx += force.fx;
            otherPlanetsFy += force.fy;
          }
        });

        // Total force
        const totalFx = sunForce.fx + mouseForce.fx + otherPlanetsFx;
        const totalFy = sunForce.fy + mouseForce.fy + otherPlanetsFy;

        // Update velocity (F = ma, so a = F/m)
        planet.vx += totalFx / planet.mass;
        planet.vy += totalFy / planet.mass;

        // Update position
        planet.x += planet.vx;
        planet.y += planet.vy;

        // Check if planet is out of bounds and reset if needed
        const margin = 500; // Extra margin beyond canvas
        if (planet.x < -margin || planet.x > canvas.width + margin ||
            planet.y < -margin || planet.y > canvas.height + margin) {
          // Reset planet to a new orbital position
          const planetConfigs = [
            { distance: 120, radius: 8, mass: 50, color: '#8B7355' },
            { distance: 180, radius: 12, mass: 80, color: '#FFA500' },
            { distance: 250, radius: 10, mass: 60, color: '#4169E1' },
            { distance: 320, radius: 9, mass: 55, color: '#DC143C' },
            { distance: 400, radius: 16, mass: 120, color: '#DAA520' },
            { distance: 480, radius: 14, mass: 100, color: '#87CEEB' }
          ];
          
          const config = planetConfigs[index];
          const angle = Math.random() * Math.PI * 2;
          const distance = config.distance;
          
          planet.x = sun.x + Math.cos(angle) * distance;
          planet.y = sun.y + Math.sin(angle) * distance;
          
          const orbitalSpeed = Math.sqrt((G * SUN_MASS) / distance);
          const speedWithVariation = orbitalSpeed + (orbitalSpeed * 0.15 * (Math.random() - 0.5) * 2);
          
          planet.vx = -Math.sin(angle) * speedWithVariation;
          planet.vy = Math.cos(angle) * speedWithVariation;
          planet.trail = [];
        }

        // Add to trail (only if not exploding)
        if (!planet.exploding) {
          planet.trail.push({ x: planet.x, y: planet.y });
          if (planet.trail.length > 80) {
            planet.trail.shift();
          }

          // Draw trail
          if (planet.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(planet.trail[0].x, planet.trail[0].y);
            for (let i = 1; i < planet.trail.length; i++) {
              ctx.lineTo(planet.trail[i].x, planet.trail[i].y);
            }
            ctx.strokeStyle = planet.color + '40'; // Add transparency
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Draw planet
          ctx.beginPath();
          ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
          ctx.fillStyle = planet.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = planet.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw mouse planet (only if in planet mode)
      if (isPlanetMode) {
        ctx.beginPath();
        ctx.arc(mousePlanet.x, mousePlanet.y, mousePlanet.radius, 0, Math.PI * 2);
        ctx.fillStyle = mousePlanet.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = mousePlanet.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw glow ring around mouse planet
        ctx.beginPath();
        ctx.arc(mousePlanet.x, mousePlanet.y, mousePlanet.radius + 5, 0, Math.PI * 2);
        ctx.strokeStyle = mousePlanet.color + '60';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Restore context
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlanetMode, zoom]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const currentPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    mousePosRef.current = currentPos;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSpeed = 0.001;
    const delta = -e.deltaY * zoomSpeed;
    setZoom(prev => Math.max(0.1, Math.min(5, prev + delta)));
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(5, prev * 1.2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.1, prev / 1.2));
  };

  const handleResetView = () => {
    setZoom(1);
  };

  const handleResetSimulation = () => {
    // Re-initialize planets
    const canvas = canvasRef.current;
    const sun = sunRef.current;
    
    const calculateOrbitalVelocity = (distance, sunMass) => {
      return Math.sqrt((G * sunMass) / distance);
    };
    
    const addRandomVariation = (value, variationPercent = 0.2) => {
      const variation = value * variationPercent * (Math.random() - 0.5) * 2;
      return value + variation;
    };
    
    const planetConfigs = [
      { distance: 120, radius: 8, mass: 50, color: '#8B7355' },
      { distance: 180, radius: 12, mass: 80, color: '#FFA500' },
      { distance: 250, radius: 10, mass: 60, color: '#4169E1' },
      { distance: 320, radius: 9, mass: 55, color: '#DC143C' },
      { distance: 400, radius: 16, mass: 120, color: '#DAA520' },
      { distance: 480, radius: 14, mass: 100, color: '#87CEEB' }
    ];
    
    planetsRef.current = planetConfigs.map(config => {
      const angle = Math.random() * Math.PI * 2;
      const distance = config.distance;
      
      const x = sun.x + Math.cos(angle) * distance;
      const y = sun.y + Math.sin(angle) * distance;
      
      const orbitalSpeed = calculateOrbitalVelocity(distance, SUN_MASS);
      const speedWithVariation = addRandomVariation(orbitalSpeed, 0.15);
      
      const vx = -Math.sin(angle) * speedWithVariation;
      const vy = Math.cos(angle) * speedWithVariation;
      
      return {
        x,
        y,
        vx,
        vy,
        radius: config.radius,
        mass: config.mass,
        color: config.color,
        trail: []
      };
    });
    
    // Reset view as well
    setZoom(1);
  };

  return (
    <>
      <div className="orbit-container">
        <canvas
          ref={canvasRef}
          className="orbit-canvas"
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          style={{ display: 'block', cursor: isPlanetMode ? 'none' : 'default' }}
        />
      </div>
      <button 
        className="menu-toggle-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        title="Toggle Menu"
      >
        ☰
      </button>
      {menuOpen && (
        <div className="orbit-info">
          <h3>Gravitational Orbit Simulator</h3>
          <p>{isPlanetMode ? 'Move your mouse to control the pink planet\'s gravity' : 'Use zoom controls to explore'}</p>
          <div className="controls">
            <button 
              className="planet-toggle-btn"
              onClick={() => setIsPlanetMode(!isPlanetMode)}
            >
              {isPlanetMode ? 'Deactivate Planet Mode' : 'Activate Planet Mode'}
            </button>
            <button 
              className="reset-simulation-btn"
              onClick={handleResetSimulation}
            >
              Reset Simulation
            </button>
            {onToggleContent && (
              <button 
                className="toggle-content-btn"
                onClick={onToggleContent}
              >
                {contentVisible ? 'Hide Content' : 'Show Content'}
              </button>
            )}
            <div className="zoom-controls">
              <button className="zoom-btn" onClick={handleZoomOut} title="Zoom Out">−</button>
              <button className="zoom-btn reset-btn" onClick={handleResetView} title="Reset View">⟲</button>
              <button className="zoom-btn" onClick={handleZoomIn} title="Zoom In">+</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orbit;

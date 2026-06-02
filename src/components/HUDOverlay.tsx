import { useEffect, useRef } from 'react';

export function HUDOverlay() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Subtle rotation of corner elements
    const interval = setInterval(() => {
      if (svgRef.current) {
        const time = Date.now() * 0.0001;
        const corners = svgRef.current.querySelectorAll('.hud-corner');
        corners.forEach((corner, i) => {
          const el = corner as SVGGraphicsElement;
          const rot = Math.sin(time + i * 0.5) * 2;
          el.setAttribute('transform', `rotate(${rot} ${el.getAttribute('data-cx')} ${el.getAttribute('data-cy')})`);
        });
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 50 }}
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Top-left corner tick */}
      <g className="hud-corner" data-cx="40" data-cy="40">
        <line x1="30" y1="40" x2="50" y2="40" stroke="rgba(53,161,255,0.3)" strokeWidth="1" />
        <line x1="40" y1="30" x2="40" y2="50" stroke="rgba(53,161,255,0.3)" strokeWidth="1" />
        <circle cx="40" cy="40" r="2" fill="rgba(53,161,255,0.5)" />
      </g>

      {/* Top-right corner tick */}
      <g className="hud-corner" data-cx="1880" data-cy="40">
        <line x1="1870" y1="40" x2="1890" y2="40" stroke="rgba(53,161,255,0.3)" strokeWidth="1" />
        <line x1="1880" y1="30" x2="1880" y2="50" stroke="rgba(53,161,255,0.3)" strokeWidth="1" />
        <circle cx="1880" cy="40" r="2" fill="rgba(53,161,255,0.5)" />
      </g>

      {/* Bottom-left corner tick */}
      <g className="hud-corner" data-cx="40" data-cy="1040">
        <line x1="30" y1="1040" x2="50" y2="1040" stroke="rgba(53,161,255,0.3)" strokeWidth="1" />
        <line x1="40" y1="1030" x2="40" y2="1050" stroke="rgba(53,161,255,0.3)" strokeWidth="1" />
        <circle cx="40" cy="1040" r="2" fill="rgba(53,161,255,0.5)" />
      </g>

      {/* Bottom-right corner tick */}
      <g className="hud-corner" data-cx="1880" data-cy="1040">
        <line x1="1870" y1="1040" x2="1890" y2="1040" stroke="rgba(53,161,255,0.3)" strokeWidth="1" />
        <line x1="1880" y1="1030" x2="1880" y2="1050" stroke="rgba(53,161,255,0.3)" strokeWidth="1" />
        <circle cx="1880" cy="1040" r="2" fill="rgba(53,161,255,0.5)" />
      </g>

      {/* Decorative arc - top */}
      <path
        d="M 860 80 Q 960 40 1060 80"
        fill="none"
        stroke="rgba(53,161,255,0.15)"
        strokeWidth="1"
        className="animate-pulse-arc"
      />

      {/* Small dot marks along sides */}
      <circle cx="100" cy="540" r="1.5" fill="rgba(53,161,255,0.4)" />
      <circle cx="1820" cy="540" r="1.5" fill="rgba(53,161,255,0.4)" />
      <circle cx="960" cy="100" r="1.5" fill="rgba(53,161,255,0.3)" />
      <circle cx="960" cy="980" r="1.5" fill="rgba(53,161,255,0.3)" />

      {/* Horizontal reference lines */}
      <line x1="60" y1="540" x2="120" y2="540" stroke="rgba(53,161,255,0.12)" strokeWidth="0.5" />
      <line x1="1800" y1="540" x2="1860" y2="540" stroke="rgba(53,161,255,0.12)" strokeWidth="0.5" />
    </svg>
  );
}

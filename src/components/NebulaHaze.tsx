export function NebulaHaze() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {/* Primary cyan nebula - center-left */}
      <div
        className="absolute animate-nebula-drift"
        style={{
          width: '80vw',
          height: '80vh',
          left: '10%',
          top: '10%',
          background: 'radial-gradient(ellipse at center, rgba(53, 161, 255, 0.08) 0%, rgba(53, 161, 255, 0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Secondary subtle haze - bottom right */}
      <div
        className="absolute"
        style={{
          width: '60vw',
          height: '60vh',
          right: '-10%',
          bottom: '5%',
          background: 'radial-gradient(ellipse at center, rgba(53, 161, 255, 0.05) 0%, transparent 60%)',
          filter: 'blur(80px)',
          animation: 'nebula-drift 25s ease-in-out infinite reverse',
        }}
      />
      {/* Top edge glow */}
      <div
        className="absolute animate-pulse-glow"
        style={{
          width: '100%',
          height: '30vh',
          top: 0,
          left: 0,
          background: 'linear-gradient(180deg, rgba(53, 161, 255, 0.04) 0%, transparent 100%)',
        }}
      />
    </div>
  );
}

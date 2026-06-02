interface CurvedTextProps {
  text: string;
  radius?: number;
  className?: string;
}

export function CurvedText({ text, radius = 320, className = '' }: CurvedTextProps) {
  const svgWidth = radius * 2 + 100;
  const svgHeight = radius * 0.6 + 40;
  const centerX = svgWidth / 2;
  const centerY = radius * 0.55;

  // Create arc path
  const startAngle = -60;
  const endAngle = -120;
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY + radius * Math.sin(startRad);
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY + radius * Math.sin(endRad);

  const largeArcFlag = 0;
  const sweepFlag = 1;

  const pathId = `arc-${text.replace(/\s/g, '-')}`;
  const pathD = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className={`w-full max-w-2xl ${className}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <path id={pathId} d={pathD} fill="none" />
      </defs>
      <text
        fill="white"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
        fontSize="42"
        fontWeight="500"
        letterSpacing="0.15em"
        className="glow-cyan-text"
      >
        <textPath
          href={`#${pathId}`}
          startOffset="50%"
          textAnchor="middle"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
}

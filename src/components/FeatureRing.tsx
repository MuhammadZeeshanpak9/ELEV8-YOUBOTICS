import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CurvedText } from './CurvedText';

gsap.registerPlugin(ScrollTrigger);

interface FeatureRingProps {
  image: string;
  curvedText: string;
  centerText: string;
  caption: string;
  paragraph: string;
  label: string;
  entranceDirection: 'left' | 'right';
  sectionId: string;
}

export function FeatureRing({
  image,
  curvedText,
  centerText,
  caption,
  paragraph,
  label,
  entranceDirection,
  sectionId,
}: FeatureRingProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const curvedTextRef = useRef<HTMLDivElement>(null);
  const centerTextRef = useRef<HTMLDivElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const enterX = entranceDirection === 'right' ? '60vw' : '-60vw';
      const exitX = entranceDirection === 'right' ? '-55vw' : '55vw';
      const enterRotate = entranceDirection === 'right' ? 10 : -10;
      const exitRotate = entranceDirection === 'right' ? -12 : 12;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      tl.fromTo(
        circleRef.current,
        { x: enterX, y: '10vh', scale: 0.72, rotation: enterRotate, opacity: 0 },
        { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, ease: 'none' },
        0
      );
      tl.fromTo(
        curvedTextRef.current,
        { y: '-40vh', opacity: 0, rotation: -6 },
        { y: 0, opacity: 1, rotation: 0, ease: 'none' },
        0
      );
      tl.fromTo(
        centerTextRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.08
      );
      tl.fromTo(
        bottomContentRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // SETTLE (30-70%) - no animation, just hold

      // EXIT (70-100%)
      tl.to(
        circleRef.current,
        { x: exitX, y: '-8vh', scale: 0.78, rotation: exitRotate, opacity: 0, ease: 'power2.in' },
        0.7
      );
      tl.to(
        curvedTextRef.current,
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      tl.to(
        centerTextRef.current,
        { scale: 0.95, opacity: 0, ease: 'power2.in' },
        0.75
      );
      tl.to(
        bottomContentRef.current,
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, [entranceDirection]);

  return (
    <div
      ref={sectionRef}
      id={sectionId}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ background: 'transparent' }}
    >
      {/* Curved text above */}
      <div
        ref={curvedTextRef}
        className="absolute top-[12vh] left-1/2 -translate-x-1/2 z-10"
      >
        <CurvedText text={curvedText} radius={280} />
      </div>

      {/* Circle container */}
      <div
        ref={circleRef}
        className="relative flex items-center justify-center"
        style={{ width: 'min(56vw, 56vh)', height: 'min(56vw, 56vh)' }}
      >
        {/* Rotating ring outline */}
        <div className="absolute inset-0 animate-rotate-slow">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Main ring */}
            <circle
              cx="200"
              cy="200"
              r="198"
              fill="none"
              stroke="rgba(53, 161, 255, 0.3)"
              strokeWidth="1"
            />
            {/* Accent arc segments */}
            <path
              d="M 200 2 A 198 198 0 0 1 398 200"
              fill="none"
              stroke="rgba(53, 161, 255, 0.6)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 2 200 A 198 198 0 0 1 200 398"
              fill="none"
              stroke="rgba(53, 161, 255, 0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Small tick marks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const innerR = 190;
              const outerR = 198;
              return (
                <line
                  key={angle}
                  x1={200 + innerR * Math.cos(rad)}
                  y1={200 + innerR * Math.sin(rad)}
                  x2={200 + outerR * Math.cos(rad)}
                  y2={200 + outerR * Math.sin(rad)}
                  stroke="rgba(53, 161, 255, 0.4)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>

        {/* Photo circle */}
        <div
          className="absolute inset-4 rounded-full overflow-hidden"
          style={{
            boxShadow: 'inset 0 0 60px rgba(53, 161, 255, 0.1), 0 0 40px rgba(53, 161, 255, 0.1)',
          }}
        >
          <img
            src={image}
            alt={centerText}
            className="w-full h-full object-cover"
            style={{ filter: 'contrast(1.1) saturate(0.85)' }}
          />
          {/* Cyan tint overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(53, 161, 255, 0.08) 0%, transparent 50%, rgba(53, 161, 255, 0.05) 100%)',
            }}
          />
        </div>

        {/* Center text overlay */}
        <div
          ref={centerTextRef}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <h2
            className="font-display text-white font-semibold tracking-wider glow-cyan-text"
            style={{ fontSize: 'clamp(28px, 5vw, 64px)' }}
          >
            {centerText}
          </h2>
        </div>

        {/* Decorative node */}
        <div className="absolute -top-2 right-1/4">
          <div className="w-3 h-3 rounded-full bg-cyan-500/60 animate-pulse" />
        </div>
      </div>

      {/* Bottom content */}
      <div
        ref={bottomContentRef}
        className="absolute bottom-[8vh] left-0 right-0 px-6 lg:px-12 flex flex-col md:flex-row items-end justify-between gap-6"
      >
        {/* Caption + Paragraph */}
        <div className="max-w-md">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-cyan-400/80 mb-2">
            {caption}
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            {paragraph}
          </p>
        </div>

        {/* Label */}
        <div className="font-mono text-xs uppercase tracking-[0.12em] text-white/40">
          {label}
        </div>
      </div>
    </div>
  );
}

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroWordRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);
  const arcsRef = useRef<SVGSVGElement>(null);
  const loadCompleteRef = useRef(false);

  // Load animation (auto-play on mount)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({
        onComplete: () => {
          loadCompleteRef.current = true;
        },
      });

      // Arcs draw on
      const arcPaths = arcsRef.current?.querySelectorAll('.arc-path');
      if (arcPaths && arcPaths.length > 0) {
        loadTl.fromTo(
          arcPaths,
          { strokeDashoffset: 1000, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.1 },
          0.2
        );
      }

      // Hero word rises in
      loadTl.fromTo(
        heroWordRef.current,
        { y: '18vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
        0.3
      );

      // Tagline slides in
      loadTl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.6
      );

      // Micro copy fades in
      loadTl.fromTo(
        microRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven EXIT animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set(heroWordRef.current, { y: 0, opacity: 1 });
            gsap.set(taglineRef.current, { y: 0, opacity: 1 });
            gsap.set(microRef.current, { y: 0, opacity: 1 });
            gsap.set(arcsRef.current, { rotation: 0, opacity: 1 });
          },
        },
      });

      // ENTRANCE (0-30%): Hold visible state (load animation already handled this)
      // No animation needed - elements are already visible

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        heroWordRef.current,
        { y: 0, opacity: 1 },
        { y: '-35vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        taglineRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      scrollTl.fromTo(
        microRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );
      scrollTl.fromTo(
        arcsRef.current,
        { rotation: 0, opacity: 1 },
        { rotation: 25, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden flex items-center justify-center"
      style={{ background: 'transparent', zIndex: 10 }}
    >
      {/* Decorative arcs */}
      <svg
        ref={arcsRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Large sweeping arc */}
        <path
          className="arc-path"
          d="M 400 700 Q 960 200 1520 700"
          fill="none"
          stroke="rgba(53, 161, 255, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          strokeLinecap="round"
        />
        {/* Inner arc */}
        <path
          className="arc-path"
          d="M 550 650 Q 960 320 1370 650"
          fill="none"
          stroke="rgba(53, 161, 255, 0.15)"
          strokeWidth="1"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          strokeLinecap="round"
        />
        {/* Small accent arc */}
        <path
          className="arc-path"
          d="M 700 600 Q 960 450 1220 600"
          fill="none"
          stroke="rgba(53, 161, 255, 0.25)"
          strokeWidth="1.5"
          strokeDasharray="1000"
          strokeDashoffset="1000"
          strokeLinecap="round"
        />
        {/* Decorative circles */}
        <circle cx="400" cy="700" r="4" fill="none" stroke="rgba(53, 161, 255, 0.4)" strokeWidth="1" className="arc-path" />
        <circle cx="1520" cy="700" r="4" fill="none" stroke="rgba(53, 161, 255, 0.4)" strokeWidth="1" className="arc-path" />
      </svg>

      {/* Center hero word */}
      <h1
        ref={heroWordRef}
        className="font-display font-bold text-white tracking-[-0.02em] glow-cyan-text select-none"
        style={{ fontSize: 'clamp(80px, 14vw, 220px)' }}
      >
        ELEV8
      </h1>

      {/* Bottom-left tagline */}
      <p
        ref={taglineRef}
        className="absolute left-[6vw] bottom-[16vh] max-w-[34vw] text-sm md:text-base text-white/70 leading-relaxed"
      >
        Intelligent machines built for real-world complexity.
      </p>

      {/* Bottom-right micro copy */}
      <p
        ref={microRef}
        className="absolute right-[6vw] bottom-[16vh] max-w-[20vw] text-xs md:text-sm text-white/50 leading-relaxed text-right"
      >
        Adaptive autonomy. Human-aware collaboration. Safety-first design.
      </p>
    </div>
  );
}

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FrostedCard } from '@/components/FrostedCard';
import { ArrowRight, Brain, Cpu, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Body
      gsap.fromTo(
        bodyRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );

      // Stats
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 24, scale: 0.98, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      }

      // Quote
      gsap.fromTo(
        quoteRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );

      // Decorative arcs
      gsap.fromTo(
        decorRef.current,
        { rotation: 0 },
        {
          rotation: 25,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Brain, value: '12+', label: 'Years of Research' },
    { icon: Cpu, value: '3', label: 'Prototypes Field-Tested' },
    { icon: Shield, value: '200+', label: 'Safety Scenarios Validated' },
  ];

  return (
    <div
      ref={sectionRef}
      id="mission"
      className="relative min-h-screen py-24 lg:py-32 px-6 lg:px-12"
      style={{ background: 'transparent', zIndex: 50 }}
    >
      {/* Decorative arcs */}
      <svg
        ref={decorRef}
        className="absolute left-0 top-1/4 pointer-events-none opacity-10"
        width="300"
        height="600"
        viewBox="0 0 300 600"
      >
        <path
          d="M 0 0 Q 300 300 0 600"
          fill="none"
          stroke="rgba(53,161,255,0.4)"
          strokeWidth="1"
        />
        <path
          d="M 50 50 Q 250 300 50 550"
          fill="none"
          stroke="rgba(53,161,255,0.3)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Stronger nebula on left */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(53, 161, 255, 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-4xl" style={{ marginLeft: '8vw' }}>
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-8"
        >
          We're building the{' '}
          <span className="text-gradient-cyan">nervous system</span> for the
          next generation of robotics.
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mb-12"
        >
          ELEV8 is an AI + robotics company focused on adaptive humanoid systems.
          Our platform combines multi-modal perception, learned control, and
          human-aware safety to operate in real workplaces.
        </p>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <FrostedCard className="p-6 flex flex-col items-start">
                <stat.icon className="w-5 h-5 text-cyan-400/70 mb-3" />
                <span className="font-display text-4xl md:text-5xl font-semibold text-white mb-1">
                  {stat.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-white/50">
                  {stat.label}
                </span>
              </FrostedCard>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div ref={quoteRef} className="max-w-xl">
          <FrostedCard strong className="p-6 md:p-8">
            <blockquote className="text-lg md:text-xl text-white/80 italic leading-relaxed mb-4">
              "Our goal is not to replace people—it's to extend what teams can do."
            </blockquote>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-cyan-400/80 hover:text-cyan-400 transition-colors group"
            >
              Read our safety principles
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </FrostedCard>
        </div>
      </div>
    </div>
  );
}

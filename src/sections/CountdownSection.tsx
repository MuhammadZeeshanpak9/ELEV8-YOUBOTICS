import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CountdownTimer } from '@/components/CountdownTimer';
import { FrostedCard } from '@/components/FrostedCard';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CountdownSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<SVGSVGElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const targetDate = new Date('2026-12-31T23:59:59');

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

      // Subhead
      gsap.fromTo(
        subheadRef.current,
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

      // Countdown
      gsap.fromTo(
        countdownRef.current,
        { y: 30, scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 35%',
            scrub: true,
          },
        }
      );

      // Form
      gsap.fromTo(
        formRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            end: 'top 30%',
            scrub: true,
          },
        }
      );

      // Decorative rings rotation
      gsap.fromTo(
        decorRef.current,
        { rotation: 0 },
        {
          rotation: 45,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <div
      ref={sectionRef}
      id="join"
      className="relative min-h-screen flex items-center justify-center py-24 px-6"
      style={{ background: 'transparent', zIndex: 50 }}
    >
      {/* Decorative rings */}
      <svg
        ref={decorRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20"
        width="600"
        height="600"
        viewBox="0 0 600 600"
      >
        <circle cx="300" cy="300" r="250" fill="none" stroke="rgba(53,161,255,0.3)" strokeWidth="0.5" />
        <circle cx="300" cy="300" r="200" fill="none" stroke="rgba(53,161,255,0.25)" strokeWidth="0.5" />
        <circle cx="300" cy="300" r="150" fill="none" stroke="rgba(53,161,255,0.2)" strokeWidth="0.5" />
      </svg>

      {/* Cyan glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 animate-pulse-glow pointer-events-none"
        style={{
          width: '60vw',
          height: '40vh',
          background: 'radial-gradient(ellipse at center, rgba(53, 161, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-4"
        >
          The future is being built—
          <br />
          <span className="text-gradient-cyan">before the world catches up.</span>
        </h2>

        {/* Subhead */}
        <p
          ref={subheadRef}
          className="text-base md:text-lg text-white/60 mb-10"
        >
          Join the waitlist for early access to ELEV8.
        </p>

        {/* Countdown */}
        <div ref={countdownRef} className="mb-10">
          <CountdownTimer targetDate={targetDate} />
        </div>

        {/* Email Form */}
        <div ref={formRef} className="w-full max-w-md">
          <FrostedCard strong className="p-2">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-white placeholder:text-white/30 font-body text-sm"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-[0.12em] hover:bg-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
                >
                  Join Waitlist
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="py-3 px-4 text-center">
                <p className="text-cyan-400 font-mono text-sm uppercase tracking-[0.12em]">
                  You're on the list. We'll be in touch.
                </p>
              </div>
            )}
          </FrostedCard>
          <p className="text-xs text-white/30 mt-3 font-mono">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

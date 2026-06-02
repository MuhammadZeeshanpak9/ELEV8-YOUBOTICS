import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Youtube, Mail, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Contacts
      gsap.fromTo(
        contactsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Socials
      const socialIcons = socialsRef.current?.querySelectorAll('.social-icon');
      if (socialIcons) {
        gsap.fromTo(
          socialIcons,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.08,
            scrollTrigger: {
              trigger: socialsRef.current,
              start: 'top 90%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      }

      // Footer line
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            end: 'top 70%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const socials = [
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'X (Twitter)', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center py-24 px-6"
      style={{ background: 'transparent', zIndex: 50 }}
    >
      {/* Decorative ring */}
      <svg
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10"
        width="500"
        height="500"
        viewBox="0 0 500 500"
      >
        <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(53,161,255,0.3)" strokeWidth="0.5" />
        <circle cx="250" cy="250" r="180" fill="none" stroke="rgba(53,161,255,0.2)" strokeWidth="0.5" strokeDasharray="10 5" />
      </svg>

      {/* Crosshair marks */}
      <div className="absolute top-20 left-20 opacity-20">
        <div className="w-4 h-4 border border-cyan-400/40" />
      </div>
      <div className="absolute bottom-32 right-24 opacity-20">
        <div className="w-4 h-4 border border-cyan-400/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-12"
        >
          Let's build the future—
          <br />
          <span className="text-gradient-cyan">together.</span>
        </h2>

        {/* Contact methods */}
        <div ref={contactsRef} className="flex flex-col md:flex-row gap-6 md:gap-12 mb-12">
          <a
            href="mailto:partnerships@elev8robotics.ai"
            className="group flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
              <Mail size={16} className="text-cyan-400/70" />
            </div>
            <div className="text-left">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-0.5">
                Partnerships & pilots
              </p>
              <p className="text-sm group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                partnerships@elev8robotics.ai
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>
          </a>

          <a
            href="mailto:press@elev8robotics.ai"
            className="group flex items-center gap-3 text-white/70 hover:text-cyan-400 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center group-hover:border-cyan-500/30 transition-colors">
              <Mail size={16} className="text-cyan-400/70" />
            </div>
            <div className="text-left">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40 mb-0.5">
                Press & media
              </p>
              <p className="text-sm group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                press@elev8robotics.ai
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </div>
          </a>
        </div>

        {/* Social icons */}
        <div ref={socialsRef} className="flex items-center gap-4 mb-16">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              className="social-icon w-12 h-12 rounded-xl glass-panel flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <social.icon size={18} className="text-white/50 group-hover:text-cyan-400 transition-colors" />
            </a>
          ))}
        </div>

        {/* Footer line */}
        <div
          ref={footerRef}
          className="w-full border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border border-cyan-500/40 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-500/60" />
              </div>
              <span className="font-display text-sm font-medium text-white/80">
                ELEV8
              </span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
              © ELEV8 Robotics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/80 backdrop-blur-xl border-b border-cyan-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-cyan-500/40 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-cyan-500/60" />
          </div>
          <span className="font-display text-xl font-semibold tracking-wider text-white">
            ELEV8
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('mission')}
            className="font-mono text-xs uppercase tracking-[0.12em] text-white/60 hover:text-cyan-400 transition-colors duration-300 relative group"
          >
            Mission
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('technology')}
            className="font-mono text-xs uppercase tracking-[0.12em] text-white/60 hover:text-cyan-400 transition-colors duration-300 relative group"
          >
            Technology
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollToSection('join')}
            className="font-mono text-xs uppercase tracking-[0.12em] text-white/60 hover:text-cyan-400 transition-colors duration-300 relative group"
          >
            Join
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection('join')}
            className="px-5 py-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-[0.12em] hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            Request Access
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-navy-900/95 backdrop-blur-xl border-b border-cyan-500/10 py-6 px-6">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('mission')}
              className="font-mono text-sm uppercase tracking-[0.12em] text-white/60 hover:text-cyan-400 transition-colors text-left"
            >
              Mission
            </button>
            <button
              onClick={() => scrollToSection('technology')}
              className="font-mono text-sm uppercase tracking-[0.12em] text-white/60 hover:text-cyan-400 transition-colors text-left"
            >
              Technology
            </button>
            <button
              onClick={() => scrollToSection('join')}
              className="font-mono text-sm uppercase tracking-[0.12em] text-white/60 hover:text-cyan-400 transition-colors text-left"
            >
              Join
            </button>
            <button
              onClick={() => scrollToSection('join')}
              className="mt-2 px-5 py-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-[0.12em]"
            >
              Request Access
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

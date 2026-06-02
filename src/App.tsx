import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ThemeBackground } from '@/components/ThemeBackground';
import { NoiseOverlay } from '@/components/NoiseOverlay';
import { HUDOverlay } from '@/components/HUDOverlay';
import { Header } from '@/components/Header';

import { HeroSection } from '@/sections/HeroSection';
import { FeatureInterface } from '@/sections/FeatureInterface';
import { FeatureBuild } from '@/sections/FeatureBuild';
import { CountdownSection } from '@/sections/CountdownSection';
import { FeatureLocomotion } from '@/sections/FeatureLocomotion';
import { FeatureNavigation } from '@/sections/FeatureNavigation';
import { FeatureCollaboration } from '@/sections/FeatureCollaboration';
import { AboutSection } from '@/sections/AboutSection';
import { FooterSection } from '@/sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const snapInitialized = useRef(false);

  // Global scroll snap for pinned sections
  useEffect(() => {
    if (snapInitialized.current) return;

    const initSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => {
        const start = st.start / maxScroll;
        const end = (st.end ?? st.start) / maxScroll;
        const center = start + (end - start) * 0.5;
        return { start, end, center };
      });

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });

      snapInitialized.current = true;
    };

    const timer = setTimeout(initSnap, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: '#05070A' }}>
      {/* Living Intelligence Background System */}
      <ThemeBackground />

      {/* Film Grain */}
      <NoiseOverlay />

      {/* HUD Decorative Elements */}
      <HUDOverlay />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - z-index 10 */}
        <div className="relative" style={{ zIndex: 10 }}>
          <HeroSection />
        </div>

        {/* Section 2: Feature Interface - z-index 20 */}
        <div className="relative" style={{ zIndex: 20 }}>
          <FeatureInterface />
        </div>

        {/* Section 3: Feature Build - z-index 30 */}
        <div className="relative" style={{ zIndex: 30 }}>
          <FeatureBuild />
        </div>

        {/* Section 4: Countdown - z-index 40 (flowing) */}
        <div className="relative" style={{ zIndex: 40 }}>
          <CountdownSection />
        </div>

        {/* Section 5: Feature Locomotion - z-index 50 */}
        <div className="relative" style={{ zIndex: 50 }}>
          <FeatureLocomotion />
        </div>

        {/* Section 6: Feature Navigation - z-index 60 */}
        <div className="relative" style={{ zIndex: 60 }}>
          <FeatureNavigation />
        </div>

        {/* Section 7: Feature Collaboration - z-index 70 */}
        <div className="relative" style={{ zIndex: 70 }}>
          <FeatureCollaboration />
        </div>

        {/* Section 8: About - z-index 80 (flowing) */}
        <div className="relative" style={{ zIndex: 80 }}>
          <AboutSection />
        </div>

        {/* Section 9: Footer - z-index 90 (flowing) */}
        <div className="relative" style={{ zIndex: 90 }}>
          <FooterSection />
        </div>
      </main>
    </div>
  );
}

export default App;

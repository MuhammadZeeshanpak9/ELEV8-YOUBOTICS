import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeatureRing } from '@/components/FeatureRing';

gsap.registerPlugin(ScrollTrigger);

export function FeatureCollaboration() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Override the default exit to go upward
      const ring = section.querySelector('[data-feature-ring]');
      if (ring) {
        gsap.to(ring, {
          y: '-10vh',
          scrollTrigger: {
            trigger: section,
            start: '70% top',
            end: '100% top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} data-feature-ring>
      <FeatureRing
        image="/images/collaboration_handoff.jpg"
        curvedText="AUTONOMOUS"
        centerText="COLLABORATION"
        caption="Works alongside people, not around them."
        paragraph="Intent recognition, safe physical interaction, and clear communication through motion and light."
        label="05 / 05"
        entranceDirection="right"
        sectionId="feature-collaboration"
      />
    </div>
  );
}

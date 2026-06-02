import { FeatureRing } from '@/components/FeatureRing';

export function FeatureLocomotion() {
  return (
    <FeatureRing
      image="/images/locomotion_legs.jpg"
      curvedText="ADVANCED"
      centerText="LOCOMOTION"
      caption="Balance on uneven ground. Recover in milliseconds."
      paragraph="Dynamic gait planning, terrain-aware foot placement, and real-time impedance control."
      label="03 / 05"
      entranceDirection="right"
      sectionId="feature-locomotion"
    />
  );
}

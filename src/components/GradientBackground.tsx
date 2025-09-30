// components/GradientBackground.tsx
interface GradientOrb {
  left: string;
  top: string;
  width: string;
  height: string;
  color: string;
  opacity: string;
  blur: string;
  rotate: string;
}

interface GradientBackgroundProps {
  lightOrbs: GradientOrb[];
  darkOrbs: GradientOrb[];
}

export default function GradientBackground({ lightOrbs, darkOrbs }: GradientBackgroundProps) {
  return (
    <>
      {/* Light mode */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 dark:hidden">
        {lightOrbs.map((orb, index) => (
          <div
            key={`light-${index}`}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full`}
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.width,
              height: orb.height,
              backgroundColor: orb.color,
              opacity: orb.opacity,
              filter: `blur(${orb.blur})`,
              transform: `translate(-50%, -50%) rotate(${orb.rotate})`,
            }}
          />
        ))}
      </div>

      {/* Dark mode */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden dark:block">
        {darkOrbs.map((orb, index) => (
          <div
            key={`dark-${index}`}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full`}
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.width,
              height: orb.height,
              backgroundColor: orb.color,
              opacity: orb.opacity,
              filter: `blur(${orb.blur})`,
              transform: `translate(-50%, -50%) rotate(${orb.rotate})`,
            }}
          />
        ))}
      </div>
    </>
  );
}
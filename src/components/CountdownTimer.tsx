import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const time = useCountdown(targetDate);

  const boxes = [
    { value: time.days, label: 'DAYS' },
    { value: time.hours, label: 'HOURS' },
    { value: time.minutes, label: 'MINUTES' },
    { value: time.seconds, label: 'SECONDS' },
  ];

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {boxes.map((box, i) => (
        <div key={box.label} className="flex items-center gap-3 md:gap-4">
          <div className="glass-panel-strong rounded-xl px-4 py-3 md:px-6 md:py-4 flex flex-col items-center min-w-[70px] md:min-w-[90px]">
            <span className="font-display text-3xl md:text-5xl font-semibold text-white tabular-nums">
              {String(box.value).padStart(2, '0')}
            </span>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-white/40 mt-1">
              {box.label}
            </span>
          </div>
          {i < boxes.length - 1 && (
            <span className="font-display text-2xl md:text-4xl text-cyan-400/50 -mt-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

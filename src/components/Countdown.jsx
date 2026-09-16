import { useEffect, useMemo, useState } from 'react';
import { EVENT_DETAILS } from '../data/eventDetails';

function calculateTimeLeft(target) {
  const distance = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

export default function Countdown() {
  const target = useMemo(() => EVENT_DETAILS.weddingDate, []);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(target));

  useEffect(() => {
    const id = window.setInterval(() => setTimeLeft(calculateTimeLeft(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    ['Days', timeLeft.days],
    ['Hours', timeLeft.hours],
    ['Minutes', timeLeft.minutes],
    ['Seconds', timeLeft.seconds],
  ];

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:gap-4" aria-label="Countdown to the wedding">
      {units.map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-navy-900/10 bg-cream/75 px-2 py-4 shadow-sm backdrop-blur sm:px-4 sm:py-5">
          <div className="font-display text-3xl font-medium text-navy-900 sm:text-5xl">
            {String(value).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-navy-800/60 sm:text-[10px]">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

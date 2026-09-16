import { useEffect, useRef, useState } from 'react';
import { Music2, VolumeX } from 'lucide-react';

const NOTE_FREQUENCIES = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 293.66, 369.99, 440.0, 587.33, 440.0, 369.99];

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const loopRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearInterval(loopRef.current);
      audioContextRef.current?.close?.();
    };
  }, []);

  const playSequence = (context) => {
    const master = context.createGain();
    master.gain.setValueAtTime(0.035, context.currentTime);
    master.connect(context.destination);

    NOTE_FREQUENCIES.forEach((frequency, index) => {
      const start = context.currentTime + index * 0.48;
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.24, start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.2);

      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(start);
      oscillator.stop(start + 1.25);
    });
  };

  const startMusic = async () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = audioContextRef.current || new AudioContext();
    audioContextRef.current = context;

    if (context.state === 'suspended') await context.resume();
    playSequence(context);
    loopRef.current = window.setInterval(() => playSequence(context), NOTE_FREQUENCIES.length * 480);
    setPlaying(true);
  };

  const stopMusic = () => {
    window.clearInterval(loopRef.current);
    loopRef.current = null;
    audioContextRef.current?.suspend?.();
    setPlaying(false);
  };

  const toggle = () => {
    if (playing) stopMusic();
    else startMusic();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-gold/35 bg-navy-900/95 text-cream shadow-lg backdrop-blur transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-200"
      aria-label={playing ? 'Mute background instrumental' : 'Play background instrumental'}
      aria-pressed={playing}
      title={playing ? 'Mute instrumental' : 'Play instrumental'}
    >
      {playing ? <Music2 size={19} aria-hidden="true" /> : <VolumeX size={19} aria-hidden="true" />}
    </button>
  );
}

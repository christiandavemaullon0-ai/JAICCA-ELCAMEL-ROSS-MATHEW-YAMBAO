import { Heart } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventDetails';

export default function Footer() {
  return (
    <footer className="bg-navy-900 px-5 py-20 text-center text-cream">
      <p className="text-[10px] uppercase tracking-[0.4em] text-blush-100/80">With love</p>
      <p className="mt-4 font-display text-5xl italic">Jaicca & Ross</p>
      <Heart className="mx-auto my-6 text-gold" size={18} fill="currentColor" aria-hidden="true" />
      <p className="text-xs tracking-[0.16em] text-beige-100/65">{EVENT_DETAILS.hashtag}</p>
      <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-beige-100/35">
        October 28, 2026
      </p>
    </footer>
  );
}

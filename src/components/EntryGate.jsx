import { useState } from 'react';
import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';
import { EVENT_DETAILS } from '../data/eventDetails';

const ENVELOPE_IMAGE =
  'https://images.unsplash.com/photo-1646568780034-52b944cd01ae?auto=format&fit=crop&w=1800&q=88';

export default function EntryGate({ onOpen }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1050);
  };

  return (
    <motion.section
      className="fixed inset-0 z-[80] overflow-hidden bg-navy-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85 }}
      aria-label="Wedding invitation opening"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url("${ENVELOPE_IMAGE}")` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,200,220,0.14),transparent_42%),linear-gradient(180deg,rgba(10,31,68,0.45),rgba(10,31,68,0.96))]" />

      <motion.div
        className="relative z-10 flex h-full items-center justify-center px-5"
        animate={opening ? { scale: 1.08, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full max-w-3xl text-center text-cream">
          <p className="mb-6 text-[10px] uppercase tracking-[0.45em] text-blush-100 sm:text-xs">
            You are cordially invited
          </p>

          <motion.div
            className="mx-auto mb-8 w-full max-w-xl"
            animate={opening ? { rotateX: -82, y: -40 } : { rotateX: 0, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            style={{ perspective: 1200 }}
          >
            <div className="relative rounded-[2rem] border border-cream/20 bg-cream/95 px-6 py-12 text-navy-900 shadow-2xl sm:px-12 sm:py-14">
              <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
              <img
                src="/images/floral-divider.svg"
                alt=""
                className="mx-auto mb-6 h-9 w-44 opacity-70"
              />
              <p className="font-display text-4xl leading-none sm:text-6xl">
                {EVENT_DETAILS.couple.partnerOne}
              </p>
              <p className="my-3 font-display text-3xl italic text-gold">&</p>
              <p className="font-display text-4xl leading-none sm:text-6xl">
                {EVENT_DETAILS.couple.partnerTwo}
              </p>
              <p className="mt-7 text-xs uppercase tracking-[0.35em] text-navy-800/65">
                {EVENT_DETAILS.displayDate}
              </p>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={handleOpen}
            disabled={opening}
            className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-gold/60 bg-gold px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-navy-900 shadow-[0_0_0_0_rgba(199,166,107,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_0_32px_4px_rgba(199,166,107,0.32)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-200 disabled:cursor-wait"
          >
            <MailOpen size={18} aria-hidden="true" />
            {opening ? 'Opening…' : 'Open Invitation'}
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
}

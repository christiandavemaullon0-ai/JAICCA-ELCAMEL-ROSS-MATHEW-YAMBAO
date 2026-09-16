import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-navy-900 text-cream"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      aria-live="polite"
      aria-label="Loading wedding invitation"
    >
      <div className="text-center">
        <motion.div
          className="mx-auto mb-5 grid h-24 w-24 place-items-center rounded-full border border-gold/50 font-display text-4xl italic"
          animate={{ scale: [1, 1.04, 1], opacity: [0.72, 1, 0.72] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          J & R
        </motion.div>
        <p className="text-[10px] uppercase tracking-[0.45em] text-beige-100/75">
          Preparing your invitation
        </p>
      </div>
    </motion.div>
  );
}

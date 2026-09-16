import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import EntryGate from './components/EntryGate';
import EventDetails from './components/EventDetails';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import MusicToggle from './components/MusicToggle';
import NotFound from './components/NotFound';
import RSVP from './components/RSVP';
import ScrollProgress from './components/ScrollProgress';
import Story from './components/Story';
import { GUEST_LIST } from './data/guestList';
import { fetchGuestList } from './utils/sheets';

const ENTRY_KEY = 'jaicca-ross-invitation-opened';

function shouldShowEntryGate() {
  const everyVisit = import.meta.env.VITE_ENTRY_GATE_EVERY_VISIT === 'true';
  if (everyVisit) return true;
  return sessionStorage.getItem(ENTRY_KEY) !== 'true';
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showEntryGate, setShowEntryGate] = useState(() => shouldShowEntryGate());
  const [guestList, setGuestList] = useState(GUEST_LIST);
  const [verifiedName, setVerifiedName] = useState('');

  const closeEntry = useCallback(() => {
    sessionStorage.setItem(ENTRY_KEY, 'true');
    setShowEntryGate(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const pageReady = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));

    const fontReady = document.fonts?.ready ?? Promise.resolve();

    Promise.all([pageReady, fontReady]).finally(() => {
      window.setTimeout(() => {
        if (!cancelled) setLoading(false);
      }, 350);
    });

    const failsafe = window.setTimeout(() => {
      if (!cancelled) setLoading(false);
    }, 3500);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    if (import.meta.env.VITE_USE_LIVE_GUEST_LIST !== 'true') return;

    fetchGuestList()
      .then((names) => {
        if (names.length) setGuestList(names);
      })
      .catch(() => {
        // The local guest list remains active if the optional live endpoint is unavailable.
      });
  }, []);

  if (window.location.pathname !== '/') {
    return <NotFound />;
  }

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen key="loading" />}</AnimatePresence>

      <AnimatePresence>
        {!loading && showEntryGate && <EntryGate key="entry" onOpen={closeEntry} />}
      </AnimatePresence>

      <div className={loading || showEntryGate ? 'pointer-events-none max-h-screen overflow-hidden' : ''}>
        <ScrollProgress />
        <main>
          <Hero />
          <Story />
          <EventDetails />
          <Gallery />
          <RSVP
            guestList={guestList}
            verifiedName={verifiedName}
            onVerifiedName={setVerifiedName}
          />
        </main>
        <Footer />
        <MusicToggle />
      </div>
    </>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Search, X, XCircle } from 'lucide-react';

const normalize = (value) => value.trim().toLocaleLowerCase();

export default function GuestCheckerModal({
  open,
  onClose,
  guestList,
  onConfirmed,
}) {
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const returnFocusRef = useRef(null);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [matchedName, setMatchedName] = useState('');

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQuery(query), 200);
    return () => window.clearTimeout(id);
  }, [query]);

  const suggestions = useMemo(() => {
    const needle = normalize(debouncedQuery);
    if (needle.length < 2) return [];
    return guestList
      .filter((name) => normalize(name).includes(needle))
      .slice(0, 6);
  }, [debouncedQuery, guestList]);

  useEffect(() => {
    if (!open) return undefined;

    returnFocusRef.current = document.activeElement;
    setQuery('');
    setDebouncedQuery('');
    setStatus('idle');
    setMatchedName('');

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => inputRef.current?.focus(), 20);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const selectSuggestion = (name) => {
    setQuery(name);
    setDebouncedQuery(name);
    setStatus('idle');
  };

  const handleCheck = (event) => {
    event.preventDefault();
    const needle = normalize(query);

    if (!needle) {
      setStatus('not-found');
      return;
    }

    const exact = guestList.find((name) => normalize(name) === needle);
    const partialMatches = guestList.filter((name) => normalize(name).includes(needle));
    const resolved = exact || (partialMatches.length === 1 ? partialMatches[0] : '');

    if (resolved) {
      setMatchedName(resolved);
      setQuery(resolved);
      setStatus('found');
    } else {
      setMatchedName('');
      setStatus('not-found');
    }
  };

  const proceedToRsvp = () => {
    onConfirmed(matchedName);
    onClose();
    window.setTimeout(() => {
      document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-navy-900/70 p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guest-checker-title"
        className="relative z-[100] w-full max-w-lg rounded-[2rem] bg-cream p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full text-navy-800/60 transition hover:bg-beige-100 hover:text-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="Close guest list checker"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <p className="section-kicker text-left">Guest list</p>
        <h2 id="guest-checker-title" className="pr-10 font-display text-4xl text-navy-900">
          Are you on the list?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-navy-800/65">
          Enter your full name. Matching invitations will appear as you type.
        </p>

        <form onSubmit={handleCheck} className="mt-7">
          <label htmlFor="guest-name" className="sr-only">
            Enter your full name
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold" size={18} aria-hidden="true" />
            <input
              ref={inputRef}
              id="guest-name"
              type="text"
              autoComplete="name"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setStatus('idle');
                setMatchedName('');
              }}
              placeholder="Enter your full name"
              className="field pl-11 pr-4"
              aria-controls="guest-suggestions"
              aria-expanded={suggestions.length > 0}
              aria-autocomplete="list"
            />

            {suggestions.length > 0 && status === 'idle' && (
              <ul
                id="guest-suggestions"
                role="listbox"
                className="absolute left-0 top-full z-[999] mt-2 max-h-56 w-full overflow-auto rounded-2xl border border-navy-900/10 bg-white p-2 shadow-xl"
              >
                {suggestions.map((name) => (
                  <li key={name} role="option" aria-selected="false">
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectSuggestion(name);
                      }}
                      className="relative z-[1000] w-full rounded-xl px-4 py-3 text-left text-sm text-navy-900 transition hover:bg-beige-100 focus:bg-beige-100 focus:outline-none"
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" className="button-primary mt-4 w-full">
            Check Guest List
          </button>
        </form>

        <div className="mt-5 min-h-20" aria-live="polite">
          {status === 'found' && (
            <div className="rounded-2xl border border-gold/30 bg-beige-100 p-4 text-navy-900">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 shrink-0" size={21} aria-hidden="true" />
                <div>
                  <p className="font-semibold">You&apos;re on the list!</p>
                  <p className="mt-1 text-sm">Please proceed to RSVP as {matchedName}.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={proceedToRsvp}
                className="mt-4 rounded-full bg-navy-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Proceed to RSVP
              </button>
            </div>
          )}

          {status === 'not-found' && (
            <div className="flex gap-3 rounded-2xl border border-blush-200 bg-blush-100 p-4 text-navy-900">
              <XCircle className="mt-0.5 shrink-0" size={21} aria-hidden="true" />
              <div>
                <p className="font-semibold">We couldn&apos;t find that name.</p>
                <p className="mt-1 text-sm">
                  Please check the spelling or contact Jaicca and Ross for assistance.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

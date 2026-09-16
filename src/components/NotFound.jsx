import { ArrowLeft, Heart } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-beige-100 px-5 text-center text-navy-900">
      <div>
        <Heart className="mx-auto mb-5 text-gold" fill="currentColor" size={25} />
        <p className="text-xs uppercase tracking-[0.4em] text-navy-800/50">404</p>
        <h1 className="mt-4 font-display text-6xl">This page wandered off.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-navy-800/65">
          The invitation is still waiting for you at the main page.
        </p>
        <a href="/" className="button-primary mt-7">
          <ArrowLeft size={17} aria-hidden="true" />
          Return to Invitation
        </a>
      </div>
    </main>
  );
}

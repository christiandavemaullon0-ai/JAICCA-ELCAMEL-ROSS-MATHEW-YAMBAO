const SHEETS_URL = import.meta.env.VITE_SHEETS_URL?.trim();

export async function submitRsvp(payload) {
  if (!SHEETS_URL) {
    // Local demo mode keeps the UI testable before Apps Script is configured.
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { ok: true, demo: true };
  }

  const response = await fetch(SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  // Google Apps Script commonly requires no-cors from static frontends.
  // An opaque response means the browser could send the request but cannot
  // inspect the cross-origin response body.
  if (response.type === 'opaque') {
    return { ok: true, opaque: true };
  }

  if (!response.ok) {
    throw new Error(`RSVP request failed with HTTP ${response.status}.`);
  }

  return response.json().catch(() => ({ ok: true }));
}

export async function fetchGuestList() {
  if (!SHEETS_URL) {
    throw new Error('VITE_SHEETS_URL is not configured.');
  }

  const url = new URL(SHEETS_URL);
  url.searchParams.set('action', 'guest-list');

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Guest list request failed with HTTP ${response.status}.`);
  }

  const data = await response.json();
  if (!data?.ok || !Array.isArray(data.guests)) {
    throw new Error('Guest list response had an invalid shape.');
  }

  return data.guests.filter((name) => typeof name === 'string' && name.trim());
}

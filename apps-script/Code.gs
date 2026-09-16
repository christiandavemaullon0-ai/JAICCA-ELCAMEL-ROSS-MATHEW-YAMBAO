const RSVP_SHEET_NAME = 'RSVP Responses';
const GUEST_SHEET_NAME = 'Guest List';

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_(name, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(name);
  }

  if (sheet.getLastRow() === 0 && headers && headers.length) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: 'Missing request body.' });
    }

    const data = JSON.parse(e.postData.contents);

    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const guests = Number(data.guests || 0);
    const attending = String(data.attending || '').trim();
    const message = String(data.message || '').trim();

    if (!name || !email || !Number.isInteger(guests) || guests < 1 || guests > 5) {
      return jsonResponse({ ok: false, error: 'Invalid RSVP payload.' });
    }

    if (!['Yes', 'No'].includes(attending)) {
      return jsonResponse({ ok: false, error: 'Attending must be Yes or No.' });
    }

    const sheet = getOrCreateSheet_(RSVP_SHEET_NAME, [
      'Timestamp',
      'Name',
      'Email',
      'Guests',
      'Attending',
      'Message',
    ]);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([
        new Date(),
        name,
        email,
        guests,
        attending,
        message,
      ]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({
      ok: false,
      error: error && error.message ? error.message : 'Unknown server error.',
    });
  }
}

function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : '';

    if (action !== 'guest-list') {
      return jsonResponse({
        ok: true,
        service: 'Jaicca & Ross Wedding RSVP',
      });
    }

    const sheet = getOrCreateSheet_(GUEST_SHEET_NAME, ['Name']);
    const lastRow = sheet.getLastRow();

    if (lastRow < 2) {
      return jsonResponse({ ok: true, guests: [] });
    }

    const guests = sheet
      .getRange(2, 1, lastRow - 1, 1)
      .getDisplayValues()
      .flat()
      .map((name) => String(name).trim())
      .filter(Boolean);

    return jsonResponse({ ok: true, guests: guests });
  } catch (error) {
    console.error(error);
    return jsonResponse({
      ok: false,
      error: error && error.message ? error.message : 'Unknown server error.',
    });
  }
}

import { strategy } from '../helpers/flutter.js';

// Smoke check of the Appium test build: the app starts and the Flutter
// server inside it answers. Needs no widget keys.
describe('00 Launch', () => {
  it('TC00 app starts and the Flutter server finds widgets', async () => {
    const end = Date.now() + 60000;
    let found = [];
    while (Date.now() < end) {
      found = await browser.findElements(strategy.TYPE, 'MaterialApp');
      if (Array.isArray(found) && found.length > 0) break;
      await browser.pause(500);
    }
    expect(found.length).toBeGreaterThan(0);
  });
});

import { isKeyGone, tapKey, typeKey, waitKey } from '../helpers/flutter.js';
import { Common, Home, Login, Orders, Profile, Search } from '../helpers/keys.js';

// Smoke check of the test build with the widget keys: login screen (no OTP is
// sent, Continue is never tapped), then Skip into the app as a guest and walk
// the main tabs and Search. Starts on a fresh install (after 00-launch) and
// ends on Home.
describe('01 Smoke', () => {
  it('TC01 login screen shows the phone field and buttons', async () => {
    await waitKey(Login.page, 60000);
    await waitKey(Login.phoneField);
    await waitKey(Login.continueButton);
    await waitKey(Login.googleButton);
  });

  it('TC02 phone field takes a number and ✕ clears it', async () => {
    await typeKey(Login.phoneField, '8031234567');
    await tapKey(Common.phoneClearButton);
    expect(await isKeyGone(Common.phoneClearButton, 5000)).toBe(true);
  });

  it('TC03 country picker: search and pick Nigeria', async () => {
    await tapKey(Common.phoneCountryCodeButton);
    await typeKey(Common.countryPickerSearchField, 'Nigeria');
    await tapKey(Common.countryPickerOption('NG'));
    expect(await isKeyGone(Common.countryPickerSearchField, 5000)).toBe(true);
  });

  it('TC04 Skip opens Home as a guest with the search bar and 4 tabs', async () => {
    await tapKey(Login.skipButton);
    await waitKey(Home.page, 30000);
    await waitKey(Home.searchBar);
    for (const tab of ['home', 'explore', 'order_history', 'profile']) {
      await waitKey(Common.bottomNavTab(tab));
    }
  });

  it('TC05 Profile and Orders tabs open their guest pages', async () => {
    await tapKey(Common.bottomNavTab('profile'));
    await waitKey(Profile.guestPage, 15000);
    await tapKey(Common.bottomNavTab('order_history'));
    await waitKey(Orders.guestPage, 15000);
    await tapKey(Common.bottomNavTab('home'));
    await waitKey(Home.page, 15000);
  });

  it('TC06 Search opens, takes text, and Back returns Home', async () => {
    await tapKey(Home.searchBar);
    await waitKey(Search.page, 15000);
    await typeKey(Search.searchField, 'rice');
    await tapKey(Common.backButton);
    await waitKey(Home.page, 15000);
  });

});

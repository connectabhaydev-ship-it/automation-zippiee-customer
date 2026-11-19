// Widget keys used by the specs. Values must match the customer app's
// lib/core/constants/app_test_keys.dart (and lib/common/chat/chat_keys.dart);
// the full list is in the app repo: docs/appium_keys_mapping.md / .xlsx.

export const Common = {
  backButton: 'common_backButton_button',
  crossButton: 'common_crossButton_button',
  phoneCountryCodeButton: 'common_phoneField_countryCodeButton',
  phoneClearButton: 'common_phoneField_clearButton',
  countryPickerSearchField: 'common_countryPicker_searchField',
  countryPickerOption: (isoCode) => `common_countryPicker_option_${isoCode}`,
  // Bottom nav tabs, by the tab's label key.
  bottomNavTab: (tab) => `common_bottomNav_tab_${tab}`, // home, explore, order_history, profile
};

export const Login = {
  page: 'auth_login_page',
  skipButton: 'auth_login_skipButton',
  phoneField: 'auth_login_phoneField',
  continueButton: 'auth_login_continueButton',
  googleButton: 'auth_login_googleButton',
  appleButton: 'auth_login_appleButton', // iOS only
};

export const Home = {
  page: 'home_home_page',
  searchBar: 'home_header_searchBar',
  locationButton: 'home_header_locationButton',
};

export const Search = {
  page: 'search_search_page',
  searchField: 'search_search_searchField',
};

export const Orders = {
  guestPage: 'orders_list_guestPage',
};

export const Profile = {
  guestPage: 'profile_profile_guestPage',
};

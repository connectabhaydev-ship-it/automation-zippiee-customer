import 'dotenv/config';

// Test account values come from .env (see .env.example). Never hardcode a
// real phone number or OTP in a spec.
const env = (key, fallback = '') => process.env[key]?.trim() || fallback;

export const TestData = {
  /** ISO code of the country to pick on login, e.g. NG. */
  countryIso: env('TEST_COUNTRY_ISO', 'NG'),
  /** Country name typed into the picker search, e.g. Nigeria. */
  countryName: env('TEST_COUNTRY_NAME', 'Nigeria'),
  /** Dial code shown after picking the country, e.g. +234. */
  dialCode: env('TEST_DIAL_CODE', '+234'),
  /** Staging customer number WITHOUT the dial code. */
  phone: env('TEST_PHONE_NUMBER'),
  /** Fixed staging OTP for that number (4 digits). */
  otp: env('TEST_OTP'),
  /** A wrong OTP for the negative case; empty = that case is skipped. */
  wrongOtp: env('TEST_WRONG_OTP'),
  /** A number that is too short to be valid. */
  invalidPhone: env('TEST_INVALID_PHONE', '123'),
};

export function requireTestAccount() {
  if (!TestData.phone || !TestData.otp) {
    throw new Error(
      'Set TEST_PHONE_NUMBER and TEST_OTP in .env (staging test customer with a fixed OTP).',
    );
  }
}

# Zippiee Customer – Appium UI tests (JS)

WebdriverIO + Mocha + Appium **Flutter Integration** driver, for the Zippiee
**customer** app. Same setup as `../zippiee-driver-automation`, kept separate.

App repo guide: `zippiee_mobile_user/docs/appium_release_build_guide.md`
(how to build the test APK / IPA that go into `apps/`).

## Prerequisites (one time per machine)

| Tool | Version | Check |
|---|---|---|
| Node.js | 20+ | `node -v` |
| Java JDK | 17 | `java -version` |
| Android Studio + SDK (platform-tools, build-tools, an emulator or USB phone) | latest | `adb devices` |
| Xcode + command line tools (iOS only, macOS only) | latest | `xcodebuild -version` |

Add to `~/.zshrc` (Android), then `source ~/.zshrc`:
```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"
export JAVA_HOME="$(/usr/libexec/java_home -v 17)"
export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/latest/bin"
```

### Appium server + drivers
Appium is installed globally, not inside this project.
```bash
npm install -g appium                       # Appium server (3.x)
appium driver install --source npm appium-flutter-integration-driver
appium driver install uiautomator2          # Android
appium driver install xcuitest              # iOS (macOS only)
appium driver list --installed              # flutter-integration, uiautomator2, xcuitest
npm run doctor
```

Start it in its own terminal and leave it running:
```bash
appium                                       # http://127.0.0.1:4723
```

## Project setup
```bash
cd ~/Documents/Automation/zippiee-customer-automation
npm ci                  # exact versions from package-lock.json
cp .env.example .env    # then fill in your values
```

1. Put the test builds in `apps/` (built from the app branch `appium_setup`,
   entry point `integration_test/appium_test.dart`, **staging**):
   - `apps/app-staging-release.apk`: package `dev.zippiee.android`
   - `apps/zippiee-staging-release.ipa`: bundle `com.zippiee.ios` (registered iPhones only)
2. Fill in `.env`: device UDID / name / OS version, app file names, Apple Team
   ID, Appium host / port and the **staging test customer** (`TEST_PHONE_NUMBER`,
   `TEST_OTP`). No edits to `wdio.conf.js` needed.

## Run
```bash
appium                 # terminal 1, leave running
npm run test:android   # terminal 2 (emulator/phone must show in `adb devices`)
npm run test:ios       # real iPhone, unlocked, Developer Mode on
```

Specs today (build from app branch `appium_value_keys`, which has the widget keys):

| File | Cases |
|---|---|
| `00-launch` | TC00 app starts and the Flutter server answers |
| `01-smoke` | TC01–TC06 login screen (phone field, ✕, country picker; no OTP is sent), Skip as guest → Home, 4 tabs, Profile / Orders guest pages, Search, Back |

Expected: **7 passing**. Run only these with `npx wdio run wdio.conf.js --suite smoke`.

## How the specs run
Spec files run **in order, in one app session**, as listed in `MAIN_FLOW` in
`wdio.conf.js`. Each file starts where the previous one ended. To add one:
create `test/specs/NN-<name>.spec.js`, add it to the end of `MAIN_FLOW`, and add
a suite if it should run alone (`npx wdio run wdio.conf.js --suite <name>`).
Put `PLATFORM=ios` in front for iOS.

## Layout
```
wdio.conf.js                  # one config, PLATFORM=ios switches platform
test/helpers/flutter.js       # byKey / byText ... + waitKey / tapKey / typeKey / isKeyVisible / goBack
test/helpers/keys.js          # widget keys used by the specs (match the app's AppTestKeys)
test/helpers/test-data.js     # test account values from .env
test/pages/                   # page objects
test/specs/                   # NN- spec files, run in order (see MAIN_FLOW)
```

## Rules
- Use **keys** (`test/helpers/keys.js`), not text.
- Only use the staging **test** number from `.env`: login sends a real OTP.
- One run per device at a time. No fixed `browser.pause` waits in specs; poll with the helpers.
- The app build uses the **staging** backend.
- Installing the test APK replaces any dev **or** staging build on the device:
  both flavors use `dev.zippiee.android`.
# automation-zippiee-customer

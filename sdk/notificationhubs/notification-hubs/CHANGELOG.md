# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

- Added implementation for `enableTestSend` to gather detailed statistics.

### Breaking Changes

The largest breaking change comes to GCM/FCM compatibility.  Azure Notification Hubs does not support the FCM V1 API, and instead is using the Firebase Legacy HTTP API.  As the GCM name is considered obsolete, we are renaming GCM specific things to `FcmLegacy` across the board, except for the XML types such as `GcmRegistrationDescription` and `GcmTemplateRegistrationDescription`.  Helper methods are created for the registration descriptions to be `createFcmLegacyRegistrationDescription` and `createFcmLegacyTemplateRegistrationDescription`.  Azure Notification Hubs will eventually support the V1 API and we are reserving the `FcmRegistrationDescription` and related classes for this functionality.

List of breaking changes:

- FCM/GCM Compatibility:
  - Removed `FcmRegistrationDescription` and `FcmTemplateRegistrationDescription`
  - Removed deprecations from `GcmRegistrationDescription` and `GcmTemplateRegistrationDescription`
  - Created `createFcmLegacyRegistrationDescription` and `createFcmLegacyTemplateRegistrationDescription`
  - `FirebaseLegacyNotification` and associated factory method renamed to `FcmLegacyNotification`
  - `FirebaseLegacyInstallation` and associated factory method renamed to `FcmLegacyInstallation`
- `enableTestSend` option is no longer available for `sendDirectNotification`.

### Bugs Fixed

- #23065
- #23089

### Other Changes

## 1.0.0-beta.3 (2022-08-25)

- Fixed bug of `signKey` to use `encodeURIComponent`.

## 1.0.0-beta.2 (2022-08-17)

- Removed internal dependencies of `@azure/core-amqp` and inlined code
- Added Telemetry using the `x-ms-azsdk-telemetry` header.
- Added the `User-Agent` for Notification Hubs `azsdk-js-messaging-notificationhubs`
- Renamed the `/dist/index.js` to `/dis/index.cjs` for better CommonJS support.

## 1.0.0-beta.1 (2022-08-04)

- Initial release

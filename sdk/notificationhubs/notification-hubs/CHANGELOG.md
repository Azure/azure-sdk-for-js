# Release History

## 1.0.0-beta.7 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.6 (2022-10-12)

### Features Added

- Added support for direct batch send for multiple device handles
- Collapsed `sendDirectNotification` and `sendBroadcastNotification` into `sendNotification` with options for tags and device handles.
- Collapsed `scheduleBroadcastNotification` into `scheduleNotification` with options for tags.
- Add a polled `beginSubmitNotificationHubJob` which submits a notification hub job and then can be polled to completion.

### Breaking Changes

- Removed `sendDirectNotification` and `sendBroadcastNotification` in favor of `sendNotification` with `DirectSendNotificationOptions` options for a single or multiple device handles, or `SendNotificationOptions` options for tag based send or null/undefined/empty options for a broadcast notification.
- Removed `scheduleBroadcastNotification` in favor of `scheduleNotification` with `ScheduleNotificationOptions` options for tag based send or null/undefined/empty option for a scheduled broadcast notification.

## 1.0.0-beta.5 (2022-09-16)

### Bugs Fixed

- #23222 - `deleteRegistration` not exported on service client.
- #23218 - single item on registration feed causes error.

## 1.0.0-beta.4 (2022-09-09)

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

- #23065 - Update @azure/core-util package on npm
- #23089 - xml.feed.entry is not iterable
- #23149 - Cannot register FCM device
- #23139 - Add support for Test Send for Tag-Based Send Only

## 1.0.0-beta.3 (2022-08-25)

- Fixed bug of `signKey` to use `encodeURIComponent`.

## 1.0.0-beta.2 (2022-08-17)

- Removed internal dependencies of `@azure/core-amqp` and inlined code
- Added Telemetry using the `x-ms-azsdk-telemetry` header.
- Added the `User-Agent` for Notification Hubs `azsdk-js-messaging-notificationhubs`
- Renamed the `/dist/index.js` to `/dis/index.cjs` for better CommonJS support.

## 1.0.0-beta.1 (2022-08-04)

- Initial release

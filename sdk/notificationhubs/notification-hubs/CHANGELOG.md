# Release History

## 2.0.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.2 (2025-10-07)

### Bugs Fixed

- Properly handle single-element headers of template registrations [PR #36114](https://github.com/Azure/azure-sdk-for-js/pull/36114).

## 2.0.0 (2024-10-14)

### Features Added

- Added `scheduledBroadcastNotification` to send a scheduled broadcast notification.
- Added `sendBroadcastNotification` to send a broadcast notification.
- Moved to `@azure/core-lro` v3 for long running operations.

### Breaking Changes

- Moving from `@azure/core-lro` v2 to v3 for long running operations.  For APIs such as `beginSubmitNotificationHubJob`, this is a breaking change as it uses the new `PollerLike` interface instead of the old `SimplePollerLike` interface.  See the [Polling API](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-lro/docs/MIGRATION.md#poller-api) migration guide for more information.
- Sending broadcast notifications are now separated into `sendBroadcastNotification` for immediate sends and `scheduleBroadcastNotification` for scheduled sends.  The `sendNotification` method now only supports direct sends and tag based sends, and the `scheduleNotification` method now only supports scheduled tag based sends.

### Bugs Fixed

- Added `pushChannelExpired` and `pushVariables` to the `Installation` type.
  - [#30439](https://github.com/Azure/azure-sdk-for-js/issues/30439)

### Other Changes

- Added top level `browser` and `react-native` support in the `package.json` and a common implementation for WebCrypto for both.
  - [#30697]((https://github.com/Azure/azure-sdk-for-js/issues/30697)

## 1.2.3 (2024-05-21)

### Bugs Fixed

- Added outcome counts to the `NotificationOutcomeDetails` response for browser and FCMV1 notifications.
  - [#29404](https://github.com/Azure/azure-sdk-for-js/issues/29777)

## 1.2.2 (2024-04-29)

### Bugs Fixed

- Fixed FirebaseV1 Notification to use the correct `data` and create the wrapper `message`.
  - [#29404](https://github.com/Azure/azure-sdk-for-js/issues/29404)
  - [#29371](https://github.com/Azure/azure-sdk-for-js/issues/29371)

## 1.2.1 (2024-04-25)

### Bugs Fixed

- Fixed Firebase query for `listRegistrationsByChannel` to use the correct `channel` query parameter.
  - [#29372](https://github.com/Azure/azure-sdk-for-js/issues/29372)

## 1.2.0 (2024-03-28)

### Features Added

- Added overloads to create notifications for ADM, Baidu, Template, Xiaomi and WebPush accepting either a string or a custom object that is transformed into the JSON notification body.

### Bugs Fixed

- Fix ordering of XML `BrowserRegistrationDescription` properties.

## 1.1.1 (2024-03-19)

### Bugs Fixed

- Fixed to allow `FcmV1Notification` as part of the `Notification` and `sendNotification` parameters.

## 1.1.0 (2024-03-01)

### Features Added

- Added Support for [Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging) V1 API with the following:
  - `FcmV1RegistrationDescription` and `FcmV1TemplateRegistrationDescription` for registrations with associated factory methods.
  - `FcmV1Installation` for installation operations and associated factory methods.
  - `FcmV1Notification` for notification send support and associated factory methods.

## 1.0.3 (2023-11-13)

### Features Added

- Added support for [Live Activity Apple message types](https://developer.apple.com/documentation/activitykit/updating-and-ending-your-live-activity-with-activitykit-push-notifications).
- Added typings for APNs and WNS headers via the `createAppleNotification` and the `createWindowsNotification` factory methods.

### Bugs Fixed

- Fixed WNS Message Platform to use the correct `platform`


## 1.0.2 (2023-06-15)

### Features Added

- Removed `uuid` in favor of `@azure/core-util` for `randomUUID`.

### Features Added

- [#25230](ttps://github.com/Azure/azure-sdk-for-js/issues/25230) - Added section for React Native support in troubleshooting.

### Bugs Fixed

- [#25316](https://github.com/Azure/azure-sdk-for-js/issues/25914) - Fix `parseXMLError` to properly handle the XML document response.

## 1.0.1 (2023-03-21)

### Features Added

- [#25230](ttps://github.com/Azure/azure-sdk-for-js/issues/25230) - Added section for React Native support in troubleshooting.

### Bugs Fixed

- [#25316](https://github.com/Azure/azure-sdk-for-js/issues/25316) - Fix `isSendNotificationOptions` to check for `tagExpression` instead of `tags`.

## 1.0.0 (2023-03-15)

### Features Added

- Added Xiaomi support with the following:
  - `XiaomiRegistrationDescription` and `XiaomiTemplateRegistrationDescription` for registrations with associated factory methods.
  - `XiaomiInstallation` for installation operations and associated factory methods.
  - `XiaomiNotification` for notification send support and associated factory methods.

### Bugs Fixed

- Rollup configuration fixed [#24839](https://github.com/Azure/azure-sdk-for-js/pull/24839)

## 1.0.0-beta.8 (2022-11-21)

### Bugs Fixed

- #23733 `notificationBody` now added to the response for `getNotificationOutcomeDetails`

## 1.0.0-beta.7 (2022-11-04)

### Features Added

- Added a tag expression builder from arrays with `createTagExpression` from the `@azure/notification-hubs/models/tagExpressionBuilder` modular import or regular `@azure/notification-hubs` top level import.
- Added the `listRegistrationsByChannel` to list all registrations for a given channel.
- Moved all API methods to the `/api` subpath export.
- Moved all models to the `/models` subpath export.
- Added notification body creation methods per PNS type, removing the old `build` methods.
- Created `Common` types for `Notification`, `Installation` and `Registrations` to get rid of `Omit<>` usage.

### Breaking Changes

- `sendNotification` and `scheduleNotification` options no longer accept a string array for `tags`.  This has been changed to `tagExpression`.  If you need to create a tag expression, use the`createTagExpression`from the`@azure/notification-hubs/models/tagExpressionBuilder`modular import or regular`@azure/notification-hubs` top level import.
- `listRegistrations` no longer accepts a `filter`.  This has been replaced with the `listRegistrationsByChannel` which then queries channel specific information.
- Changed `/client` to `/api` for the client context and methods.  All methods are now exported at the top level `/api` subpath export for external references instead of per file.
- All interfaces and factory functions are now exported at the top level `/model` subpath export for external references instead of per file.
- `build*NativeNotification` methods removed in favor of `create*NotificationBody` methods which return a string instead of the `Notification`.

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

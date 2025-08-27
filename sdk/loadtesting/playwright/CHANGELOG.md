# Release History

## 1.0.0 (2025-08-29)

This release marks the general availability of the `@azure/playwright` package.

### Breaking Changes

- Renamed getServiceConfig to createAzurePlaywrightConfig .
- Renamed timeout to connectTimeout .

## 1.0.0-beta.3 (2025-08-22)

### Breaking Changes

- Removed useCloudHostedBrowsers.

### Bugs Fixed

- Fixed an issue where getConnectOption did not correctly handle serviceAuthType.

- Fixed an issue where an error was thrown when using the ESM version of this package. [#35553](https://github.com/Azure/azure-sdk-for-js/pull/35553)

## 1.0.0-beta.2 (2025-08-06)

### Features Added

- Added Support for activity log.

### Bugs Fixed

- Updated all README documents for better clarity and accuracy.
- Improved error handling.

## 1.0.0-beta.1 (2025-06-30)

### Features Added

- Added authentication using Entra ID for the service.

# Release History

## 1.1.2 (2026-02-13)

### Bugs Fixed

- Fixed Report URLs to use correct Azure AD tenant domain

## 1.1.1 (2026-01-28)

### Bugs Fixed

- Improved error messages for better clarity and troubleshooting.
- Fixed trace viewer logic for HTML reporter to correctly handle Azure Portal and local scenarios.

## 1.1.0 (2026-01-06)

### Features Added

- Added Azure Playwright Reporter that uploads Playwright HTML test reports to Azure Storage after test execution completes.

### Bugs Fixed

- Improved error handling for authentication scenarios.
- Changed test run creation failures from fatal to non-fatal errors.

## 1.0.0 (2025-08-28)

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

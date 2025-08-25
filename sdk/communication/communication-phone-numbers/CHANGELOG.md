# Release History

## 1.5.0 (unreleased)

### Features Added
- GA release of mobile number types

## 1.5.0-beta.1 (2025-07-22)

### Features Added
- Adds support for mobile number types
  - mobile numbers are location associated phone numbers with SMS capabilities
- API version `2025-06-01` is the default.

## 1.4.0 (2025-06-20)

### Features Added

- GA release of the reservations functionality.
- GA support for automated purchases of phone numbers from countries requiring a do not resell agreement.
  - For more information, refer to: https://learn.microsoft.com/azure/communication-services/concepts/numbers/sub-eligibility-number-capability

## 1.4.0-beta.1 (2025-05-21)

### Features Added
- Adds support for the Browse Available Phone Numbers and Reservations APIs
  - This adds an alternate way to search and purchase phone numbers that allows customers to select which phone numbers they want to reserve and purchase.
- Adds support for automated purchases of phone numbers from countries requiring a Do Not Resell agreement.
  - For more information, refer to: https://learn.microsoft.com/azure/communication-services/concepts/numbers/sub-eligibility-number-capability
- API version `2025-04-01` is the default.

## 1.3.0 (2025-02-11)

### Features Added

- GA release of Number Insight.
- API version `2025-02-11` is the default

### Bugs Fixed

- OperatorDetails.Name is now optional in OperatorInformation Response.

## 1.3.0-beta.4 (2024-03-01)

### Features Added

- Add support for number lookup
  - Format only can be returned for no cost
  - Additional number details can be returned for a cost

## 1.3.0-beta.1 (2023-07-21)

### Features Added

- Number Lookup API public preview
- API version `2023-05-01-preview` is the default

## 1.2.0 (2023-03-28)

### Features Added

- Added support for SIP routing API version `2023-03-01`, releasing SIP routing functionality from public preview to GA.
- Added environment variable `AZURE_TEST_DOMAIN` for SIP routing tests to support domain verification.

### Breaking Changes

- Changed public methods `getTrunks` to `listTrunks` and `getRoutes` to `listRoutes`.

## 1.2.0-beta.4 (2023-01-10)

- Adds support for Azure Communication Services Phone Numbers Browse API Methods.
- Adds support for Direct routing configuration management.

### Features Added

- Added support for API version `2022-12-01`, giving users the ability to:
  - Get all supported countries
  - Get all supported localities given a country code.
  - Get all Toll-Free area codes from a given country code.
  - Get all Geographic area codes from a given country code / locality.
  - Get all offerings from a given country code.
- Added new SIP routing client for handling Direct routing numbers.

### Other Changes

- Updated to `@azure/core-tracing` 1.0.
- Updated to `@azure/communication-common` 2.2.0.
- Updated to `@azure-tools/test-recorder` 2.0.0.

## 1.2.0-alpha.20220517.1 (2022-05-17)

- Added support for the API version `2022-06-01-preview`
- Added `operatorId`, `operatorName` and `phoneNumberSource` properties to the `PurchasedPhoneNumber` model.

## 1.2.0-beta.3 (2022-04-06)

### Features Added

- Added environment variable `AZURE_USERAGENT_OVERRIDE` that overrides the HTTP header `x-ms-useragent` during tests

### Other Changes

- Update minimum version of dependency "@azure/core-client" to "1.5.0", which allows adding additional policies to the rest pipeline after initialization.

## 1.2.0-beta.2 (2022-03-10)

### Features Added

- Upgraded the package to use the Azure Core V2, bringing several improvements to the package's HTTP pipeline architecture.

## 1.2.0-beta.1 (2022-01-24)

- Users can now purchase United Kingdom (GB) toll free and geographic phone numbers for PSTN Calling
- Users can now purchase Denmark (DK) toll free and geographic phone numbers for PSTN Calling

### Features Added

- Added support for the API version `2022-01-11-preview2`

## 1.1.0 (2021-10-05)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features

## 1.0.0 (2021-04-26)

- Update version to 1.0.0

## 1.0.0-beta.5 (2021-03-29)

### Breaking Changes

- Renamed `AcquiredPhoneNumber` to `PurchasedPhoneNumber`.
- Renamed `getPhoneNumber` to `getPurchasedPhoneNumber` on `PhoneNumbersClient`.
- Renamed `listPhoneNumbers` to `listPurchasedPhoneNumbers` on `PhoneNumbersClient`.
- Replaced `VoidResult` with method specific interfaces `PurchasePhoneNumbersResult` and `ReleasePhoneNumberResult`.

## 1.0.0-beta.4 (2021-03-09)

The Azure Communication Phone Numbers Client library contains code which facilitates phone number management.

### Breaking Changes

- Removed `dist-browser` from the output folders. To bundle the Azure SDK libraries, please read our bundling guide: [link](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md)

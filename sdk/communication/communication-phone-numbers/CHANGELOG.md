# Release History

## 1.2.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

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

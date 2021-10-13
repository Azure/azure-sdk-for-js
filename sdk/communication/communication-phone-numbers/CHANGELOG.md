# Release History

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

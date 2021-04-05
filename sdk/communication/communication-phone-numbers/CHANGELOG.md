# Release History

## 1.0.0-beta.5 (2021-03-29)

### Breaking Changes

- Renamed `AcquiredPhoneNumber` to `PurchasedPhoneNumber`.
- Renamed `getPhoneNumber` to `getPurchasedPhoneNumber` on `PhoneNumbersClient`.
- Renamed `listPhoneNumbers` to `listPurchasedPhoneNumbers` on `PhoneNumbersClient`.
- Replaced `VoidResult` with method specific interfaces `PurchasePhoneNumbersResult` and `ReleasePhoneNumberResult`.

## 1.0.0-beta.4 (2021-03-09)

The Azure Communication Phone Numbers Client library contains code which facilitates phone number management.

### Breaking Changes

- Removed `dist-browser` from the output folders. To bundle the Azure SDK libraries, please read our bundling guide: [link](https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/Bundling.md)

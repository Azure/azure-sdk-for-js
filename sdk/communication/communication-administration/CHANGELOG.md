# Release History

## 1.0.0-beta.3 (2020-11-16)

### Added

- Added support for long-running operations.

### Breaking Changes

- Renamed `PhoneNumberSearch` to `PhoneNumberReservation` and renamed its `searchId` property to `reservationId`.
- Renamed `cancelSearch` to `cancelReservation`.
- Renamed `CancelSearchOptions` to `CancelReservationOptions`.
- Removed `getRelease` and `GetReleaseOptions`.
- Removed `getSearch` and `GetSearchOptions`.
- Replaced `createSearch` with `beginReservePhoneNumbers` which returns a poller for the long-running operation.
- Replaced `CreateSearchOptions` with `BeginReservePhoneNumbersOptions`.
- Replaced `purchaseSearch` with `beginPurchaseReservation` which returns a poller for the long-running operation.
- Replaced `PurchaseSearchOptions` with `BeginPurchaseReservationOptions`.
- Replaced `releasePhoneNumbers` with `beginReleasePhoneNumbers` which returns a poller for the long-running operation.
- Replaced `ReleasePhoneNumbersOptions` with `BeginReleasePhoneNumbersOptions`.

## 1.0.0-beta.2 (2020-10-06)

Added support for phone number administration.

## 1.0.0-beta.1 (2020-09-22)

The Azure Communication Administration Client library contains code which facilitates user token administration.

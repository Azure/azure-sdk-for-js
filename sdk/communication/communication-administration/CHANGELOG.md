# Release History

## 1.0.0-beta.4 (2021-01-25)

### Added

- `PhoneNumberAdministrationClient` added a constructor that supports `TokenCredential`.

### Breaking Changes

- `CommunicationIdentityClient` moved to the new `@azure/communication-identity` package.

### Key bug fixes

- Fixed a bug where poller options were ignored for `beginReleasePhoneNumbers`, `beginReservePhoneNumbers` and `beginPurchaseReservation`.
- Fixed paging for `listPhoneNumbers`, `listPhonePlanGroups`, `listPhonePlans`, `listReleases`, `listSearches`, `listSupportedCountries`.

## 1.0.0-beta.3 (2020-11-16)

### Added

- Added support for long-running operations. See details under Breaking Changes.

### Breaking Changes

#### Model types

- Renamed `CancelSearchOptions` to `CancelReservationOptions`.
- Removed `GetReleaseOptions`.
- Removed `GetSearchOptions`.
- Replaced `CreateSearchOptions` with `BeginReservePhoneNumbersOptions`.
- Replaced `PurchaseSearchOptions` with `BeginPurchaseReservationOptions`.
- Replaced `ReleasePhoneNumbersOptions` with `BeginReleasePhoneNumbersOptions`.
- Renamed `PhoneNumberSearch` to `PhoneNumberReservation`.

#### `PhoneNumberReservation`

- Renamed `searchId` property to `reservationId`.

#### `PhoneNumberAdministrationClient`

- Renamed `cancelSearch` to `cancelReservation`.
- Removed `getRelease` and `GetReleaseOptions`.
- Removed `getSearch` and `GetSearchOptions`.
- Replaced `createSearch` with `beginReservePhoneNumbers` which returns a poller for the long-running operation.
- Replaced `purchaseSearch` with `beginPurchaseReservation` which returns a poller for the long-running operation.
- Replaced `releasePhoneNumbers` with `beginReleasePhoneNumbers` which returns a poller for the long-running operation.

## 1.0.0-beta.2 (2020-10-06)

Added support for phone number administration.

## 1.0.0-beta.1 (2020-09-22)

The Azure Communication Administration Client library contains code which facilitates user token administration.

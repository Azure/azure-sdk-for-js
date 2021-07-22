# Release History

## 1.1.0 (2021-07-22)

### Features Added
- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

## 1.0.0 (2021-03-22)

Updated `@azure/communication-common` version.

## 1.0.0-beta.6 (2021-03-09)

Updated `@azure/communication-common` version.

## 1.0.0-beta.5 (2021-02-09)

### Breaking Changes

- Removed `CallingApplicationIdentifier` and `isCallingApplicationIdentifier`.
- Removed `id` from `CommunicationUserIdentifier`.
- Renamed `id` to `rawId` in `PhoneNumberIdentifier`.
- Renamed `id` to `rawId` in `MicrosoftTeamsUserIdentifier`.
- Replaced `abortSignal?` argument in `CommunicationTokenCredential.getToken` with `options?: CommunicationGetTokenOptions`.

## 1.0.0-beta.4 (2021-01-25)

### Added

- Added `MicrosoftTeamsUserIdentifier` and `isMicrosoftTeamsUserIdentifier`.
- Added optional `id` property to communication identifiers.

### Breaking Changes

- Changed identifier `kind` property to use lowerCamelCase.
- Renamed `CommunicationUserCredential` to `CommunicationTokenCredential`.
- Renamed `RefreshOptions` to `CommunicationTokenRefreshOptions`.
- Renamed `Identifier` to `CommunicationIdentifier`.
- Renamed `IdentifierKind` to `CommunicationIdentifierKind`.
- Renamed `PhoneNumber` to `PhoneNumberIdentifier`.
- Renamed `isPhoneNumber` to `isPhoneNumberIdentifier`.
- Renamed `CommunicationUser` to `CommunicationUserIdentifier`.
- Renamed `isCommunicationUser` to `isCommunicationUserIdentifier`.
- Renamed `CallingApplication` to `CallingApplicationIdentifier`.
- Renamed `isCallingApplication` to `isCallingApplicationIdentifier`.

## 1.0.0-beta.3 (2020-11-16)

Updated `@azure/communication-common` version.

## 1.0.0-beta.2 (2020-10-06)

Updated `@azure/communication-common` version.

## 1.0.0-beta.1 (2020-09-22)

The Azure Communication Common Client library contains common code such as the CommunicationUserCredential that is being used by other Azure Communication Services.

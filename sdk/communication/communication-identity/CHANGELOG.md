# Release History

## 1.0.0-beta.5 (Unreleased)

### Breaking Changes

- `CommunicationIdentityClient` method `issueToken` renamed to `getToken`.
- `CommunicationIdentityClient` method `createUserWithToken` renamed to `createUserAndToken`.
- Renamed `CommunicationIdentityOptions` to `CommunicationIdentityClientOptions`.
- Removed `_response` from returned models.

## 1.0.0-beta.4 (2021-02-09)

### Added

- Added `CommunicationIdentityClient` (originally part of the `@azure/communication-administration` package).
- `CommunicationIdentityClient` added a constructor that supports `TokenCredential`.
- `CommunicationIdentityClient` added a new method `createUserWithToken`.

### Breaking Changes

- Replaced `CommunicationUser` with `CommunicationUserIdentifier`.
- `CommunicationIdentityClient` method `revokeTokens` no longer accepts `tokensValidFrom` as an argument.
- `pstn` is removed from `TokenScope`
- `issueToken` no longer returns the `CommunicationUser` alongside the token.

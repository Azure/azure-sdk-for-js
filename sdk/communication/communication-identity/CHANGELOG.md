# Release History

## 1.3.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.3.1 (2024-03-26)

### Other Changes

- Updated to `@azure/communication-common` 2.3.1.

## 1.3.0 (2023-11-30)

### Features Added

- Introduction of new scopes for token generation.
    - `chat.join` (Access to Chat APIs but without the authorization to create, delete or update chat threads)
    - `chat.join.limited` (A more limited version of `chat.join` that doesn't allow to add or remove participants)
    - `voip.join` (Access to Calling APIs but without the authorization to start new calls)
- Added a new API version `2023_10_01` that is now the default API version.

### Other Changes

- Updated to `@azure/communication-common` 2.2.0.

## 1.2.0 (2022-10-12)

### Features Added

- Added support to customize the Communication Identity access token's validity period:
    - `createUserAndToken` and `getToken` methods now accept `CreateUserAndTokenOptions` and `GetTokenOptions` that provide the ability to create a Communication Identity access token with custom expiration via optional `tokenExpiresInMinutes` property:
        - `createUserAndToken(scopes: TokenScope[], options: CreateUserAndTokenOptions = {})`
        - `getToken(user: CommunicationUserIdentifier, scopes: TokenScope[], options: GetTokenOptions = {})`
        - `interface CreateUserAndTokenOptions extends OperationOptions { tokenExpiresInMinutes?: number; }`
        - `interface GetTokenOptions extends OperationOptions { tokenExpiresInMinutes?: number; }`
    - Added a new API version `2022-10-01` that is now the default API version.

### Other Changes

- Updated to `@azure/core-tracing` 1.0.

## 1.1.0 (2022-07-21)

### Features Added

- Added support to integrate communication as Teams user with Azure Communication Services:
  - Added `getTokenForTeamsUser(teamsUserAadToken: string, appId: string, userId: string, options: OperationOptions = {})` method that provides the ability to exchange an AAD access token of a Teams user for a Communication Identity access token to `CommunicationIdentityClient`.

## 1.1.0-beta.2 (2022-04-05)

### Features Added

- Migrated from using `@azure/core-http` to `@azure/core-rest-pipeline` for the handling of HTTP requests. See [Azure Core v1 vs v2](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md) for more on the difference and benefits of the move.

## 1.1.0-beta.1 (2021-10-29)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- Added support to integrate communication as Teams user with Azure Communication Services:
  - `CommunicationIdentityClient` added a new method `getTokenForTeamsUser` that provides the ability to exchange an AAD access token of a Teams user for a Communication Identity access token

## 1.0.0 (2021-03-29)

- Stable release of `@azure/communication-identity`.

## 1.0.0-beta.5 (2021-03-09)

### Breaking Changes

- `CommunicationIdentityClient` method `issueToken` renamed to `getToken`.
- `CommunicationIdentityClient` method `createUserWithToken` renamed to `createUserAndToken`.
- Renamed `CommunicationIdentityOptions` to `CommunicationIdentityClientOptions`.
- Removed `_response` from returned models.
- Removed `dist-browser` from the output folders. To bundle the Azure SDK libraries, please read our bundling guide: [link](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md).

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

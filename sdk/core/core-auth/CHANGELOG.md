# Release History

## 1.10.1 (2025-09-11)

### Other Changes

- Upgrade `@azure/*` dependencies to latest versions.

## 1.10.0 (2025-07-10)

### Other Changes

- Update `engines` to `"node": ">=20.0.0"`. Please refer to our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more information on our supported Node.js versions.

## 1.9.0 (2024-10-15)

### Features Added

- Added Proof-of-Possession via Signed HTTP Request (SHR) support to `AccessToken` and `GetTokenOptions` for `TokenCredential`. #30961

## 1.8.0 (2024-09-12)

### Features Added

- `AccessToken` now has an optional `refreshAfterTimestamp` attribute that can be used to specify when the token should be refreshed. #30402

## 1.7.2 (2024-04-09)

### Other Changes

- Revert TypeScript output target to ES2017.

## 1.7.1 (2024-03-20)

### Other Changes

- Add top-level `browser` field to `package.json` as fallback for legacy bundlers that do not support the `exports` field.

## 1.7.0 (2024-03-12)

### Other Changes

- Migrated the codebase to ESM. This change is internal and should not affect customers.
- Migrated unit tests to vitest.

## 1.6.0 (2024-02-01)

### Features Added

- Added the `isKeyCredential` typeguard function similar to the existing `isTokenCredential`.

### Other Changes

- Upgrade dependency `@azure/abort-controller` version to `^2.0.0`.

## 1.5.0 (2023-08-03)

### Features Added

- Added `enableCae` option to `GetTokenOptions` to enable Continuous Access Evaluation in [PR #26614](https://github.com/Azure/azure-sdk-for-js/pull/26614).

## 1.4.0 (2022-08-04)

### Features Added

- Added `claims` optional property to the `GetTokenOptions` interface. If `claims` is set, it indicates that we are in challenge process and force to refresh the token.

## 1.3.2 (2021-07-01)

- Added `tenantId` optional property to the `GetTokenOptions` interface. If `tenantId` is set, credentials will be able to use multi-tenant authentication, in the cases when it's enabled.

## 1.3.0 (2021-03-30)

- Adds the `AzureNamedKeyCredential` class which supports credential rotation and a corresponding `NamedKeyCredential` interface to support the use of static string-based names and keys in Azure clients.
- Adds the `isNamedKeyCredential` and `isSASCredential` typeguard functions similar to the existing `isTokenCredential`.

## 1.2.0 (2021-02-08)

- Add `AzureSASCredential` and `SASCredential` for use by service clients which allow authenticiation using a shared access signature.

## 1.1.4 (2021-01-07)

- Removed direct dependency on `@opentelemetry/api` and `@azure/core-tracing`.

## 1.1.3 (2020-06-30)

- Fix this library to be compatible with ES5 ([#8975](https://github.com/Azure/azure-sdk-for-js/pull/8975))

## 1.1.2 (2020-04-28)

- Remove the below interfaces from the public API of this package as they are defined elsewhere.
  Fixes [bug 8301](https://github.com/Azure/azure-sdk-for-js/issues/8301).
  - OperationOptions
  - OperationRequestOptions
  - OperationTracingOptions
  - AbortSignalLike

## 1.1.1 (2020-04-01)

- Provided down-leveled type declaration files for users of older TypeScript versions between 3.1 and 3.6.

## 1.1.0 (2020-03-31)

- Added an `AzureKeyCredential` class that supports credential rotation and a corresponding `KeyCredential` interface to support the use of static string-based keys in Azure clients.

## 1.0.2 (2019-12-03)

- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`

## 1.0.0 (2019-10-29)

This release marks the general availability of the `@azure/core-auth` package.

- Standardizes API to be more consistent with other SDK packages.
  ([PR #5899](https://github.com/Azure/azure-sdk-for-js/pull/5899))
- Removed the browser bundle. A browser-compatible library can still be created through the use of a bundler such as Rollup, Webpack, or Parcel.
  ([#5860](https://github.com/Azure/azure-sdk-for-js/pull/5860))

## 1.0.0-preview.4 (2019-10-22)

- Removed the `SimpleTokenCredential` implementation since it is not useful outside of test scenarios
- Updated to use the latest version of `@azure/core-tracing` package

## 1.0.0-preview.3 (2019-09-09)

- Fixed a ping timeout issue. The timeout is now configurable. ([PR #4941](https://github.com/Azure/azure-sdk-for-js/pull/4941))

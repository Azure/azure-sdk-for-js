# Release History

## 2.3.1 (2025-09-11)

### Other Changes

- Upgrade `@azure/*` dependencies to latest versions.

## 2.3.0 (2025-05-01)

### Features Added

- Add an optional `requestOverrides` property to `WebResourceLike` [PR #33724](https://github.com/Azure/azure-sdk-for-js/pull/33724).

## 2.2.0 (2025-02-06)

### Features Added

- Add optional `agent` option to `WebResourceLike` [PR #32590](https://github.com/Azure/azure-sdk-for-js/pull/32590)

## 2.1.2 (2024-04-09)

### Other Changes

- Revert TypeScript output target to ES2017.

## 2.1.1 (2024-03-20)

### Other Changes

- Add top-level `browser` field to `package.json` as fallback for legacy bundlers that do not support the `exports` field.

## 2.1.0 (2024-03-12)

### Other Changes

- Migrated the codebase to ESM. This change is internal and should not affect customers.
- Migrated unit tests to vitest.

## 2.0.1 (2023-04-06)

### Bugs Fixed

- Fix issue with disable keep alive policy being added multiple times [PR #25110](https://github.com/Azure/azure-sdk-for-js/pull/25110)

## 2.0.0 (2023-01-05)

### Features Added

- Added support for `clone` on `WebResourceLike`s.
- Added support for using a `core-http` style HttpClient as a `core-rest-pipeline` HttpClient called `convertHttpClient`.
- Expose helper for converting `HttpHeaders` from `core-rest-pipeline` into the same shape as `core-http`.

### Breaking Changes

- renamed property `disbaleKeepAlivePolicyName` to `disableKeepAlivePolicyName`

## 1.3.0 (2022-05-05)

### Features Added

- Introduces `CompatResponse` type for the `_response` property that is compatible with the response in `@azure/core-http`. Please refer [#20766](https://github.com/Azure/azure-sdk-for-js/pull/20766) for further details.

## 1.2.0 (2022-03-28)

### Features Added

- Updated response object to have a custom `_response` property. Please refer [#21004](https://github.com/Azure/azure-sdk-for-js/pull/21004) for further details.

## 1.1.0 (2022-02-25)

- Updated package dependency of `core-client` and `core-rest-pipeline` packages to `1.3.0` version.

## 1.0.0 (2022-02-18)

- First release of package, see README.md for details.
- Introduced `ExtendedServiceClient`, `ExtendedServiceClientOptions` & `ExtendedCommonClientOptions` to provide compatibility for packages depending on `@azure/core-http` to move to using `@azure/core-client` and `@azure/core-rest-pipeline` without breaking changes.

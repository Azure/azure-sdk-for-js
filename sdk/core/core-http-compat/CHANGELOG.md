# Release History

## 2.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

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

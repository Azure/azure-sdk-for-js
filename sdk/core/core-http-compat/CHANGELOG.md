# Release History

## 1.2.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.2.0 (2022-03-28)

### Features Added

- Updated response object to have a custom `_response` property. Please refer [#21004](https://github.com/Azure/azure-sdk-for-js/pull/21004) for further details.

## 1.1.0 (2022-02-25)

- Updated package dependency of `core-client` and `core-rest-pipeline` packages to `1.3.0` version.

## 1.0.0 (2022-02-18)

- First release of package, see README.md for details.
- Introduced `ExtendedServiceClient`, `ExtendedServiceClientOptions` & `ExtendedCommonClientOptions` to provide compatibility for packages depending on `@azure/core-http` to move to using `@azure/core-client` and `@azure/core-rest-pipeline` without breaking changes.

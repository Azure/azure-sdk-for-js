# Release History

## 1.1.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.1.4 (2024-08-01)

### Other Changes

- Adding React-Native support at top level [PR #30521](https://github.com/Azure/azure-sdk-for-js/pull/30521)

## 1.1.3 (2024-07-10)

### Features Added

- Adding react-native logger support [PR #30076](https://github.com/Azure/azure-sdk-for-js/pull/30076)

## 1.1.2 (2024-04-09)

### Other Changes

- Revert TypeScript output target to ES2017.

## 1.1.1 (2024-03-20)

### Other Changes

- Add top-level `browser` field to `package.json` as fallback for legacy bundlers that do not support the `exports` field.

## 1.1.0 (2024-03-12)

### Other Changes

- Migrated the codebase to ESM. This change is internal and should not affect customers.
- Migrated unit tests to vitest.

## 1.0.4 (2023-03-02)

### Other Changes

- Improve docstring for setLogLevel [PR #24998](https://github.com/Azure/azure-sdk-for-js/pull/24998)

## 1.0.3 (2021-09-30)

### Other Changes

- Updates package to work with the react native bundler. [PR #17783](https://github.com/Azure/azure-sdk-for-js/pull/17783)

## 1.0.2 (2021-03-04)

- When logging in the browser, the default log function will now log messages to the corresponding console log function (e.g. `info` level is sent to `console.info()`.) PR [#14103](https://github.com/Azure/azure-sdk-for-js/pull/14103)

## 1.0.1 (2021-01-07)

- Updates the `tslib` dependency to version 2.x.

## 1.0.0 (2019-10-29)

This release marks the general availability of the `@azure/logging` package.

- Removed the browser bundle. A browser-compatible library can still be created through the use of a bundler such as Rollup, Webpack, or Parcel.
  ([#5860](https://github.com/Azure/azure-sdk-for-js/pull/5860))

## 1.0.0-preview.1 (2019-10-22)

Provides methods to set log levels that enable logs in Azure SDKs that support logging.
Also supports redirecting log outputs via a method override.

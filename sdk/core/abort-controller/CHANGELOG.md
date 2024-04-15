# Release History

## 2.1.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

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

## 2.0.0 (2024-01-05)

### Breaking Changes

- Removed our polyfill implementation for `AbortSignal` and `AbortController` as these are now supported across our minimum required runtime environments.

## 1.1.0 (2022-05-05)

- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

## 1.0.4 (2021-03-04)

Fixes issue [13985](https://github.com/Azure/azure-sdk-for-js/issues/13985) where abort event listeners that removed themselves when invoked could prevent other event listeners from being invoked.

## 1.0.3 (2021-02-23)

Support Typescript version < 3.6 by down-leveling the type definition files. ([PR 12793](https://github.com/Azure/azure-sdk-for-js/pull/12793))

## 1.0.2 (2020-01-07)

Updates the `tslib` dependency to version 2.x.

## 1.0.1 (2019-12-04)

Fixes the [bug 6271](https://github.com/Azure/azure-sdk-for-js/issues/6271) that can occur with angular prod builds due to triple-slash directives.
([PR 6344](https://github.com/Azure/azure-sdk-for-js/pull/6344))

## 1.0.0 (2019-10-29)

This release marks the general availability of the `@azure/abort-controller` package.

Removed the browser bundle. A browser-compatible library can still be created through the use of a bundler such as Rollup, Webpack, or Parcel.
([#5860](https://github.com/Azure/azure-sdk-for-js/pull/5860))

## 1.0.0-preview.2 (2019-09-09)

Listeners attached to an `AbortSignal` now receive an event with the type `abort`. (PR #4756)

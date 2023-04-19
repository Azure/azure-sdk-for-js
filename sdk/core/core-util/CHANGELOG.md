# Release History

## 1.3.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.3.1 (2023-04-13)

### Bugs Fixed

- UUID fix for older versions of Node.js
  - [#25501](https://github.com/Azure/azure-sdk-for-js/issues/25501)
  - [#25541](https://github.com/Azure/azure-sdk-for-js/issues/25541)
  - [#25538](https://github.com/Azure/azure-sdk-for-js/issues/25538)
  - [#25532](https://github.com/Azure/azure-sdk-for-js/issues/25532)

## 1.3.0 (2023-04-06)

### Features Added

- Add `randomUUID` to generate a random UUID. [PR #25408](https://github.com/Azure/azure-sdk-for-js/pull/25408)

## 1.2.0 (2023-03-02)

### Features Added

- Add `createAbortablePromise` which creates promises that can be aborted.

## 1.1.1 (2022-10-06)

### Features Added

- Update `delay` method to handle `abortSignal` functionality

## 1.1.0 (2022-09-01)

### Features Added

- Add helper type guards `isDefined`, `isObjectWithProperties`, `objectHasProperty`.

## 1.0.0 (2022-05-05)

### Features Added

- Add helpers `isObject`, `isError`, `getErrorMessage` for handling unknown Error objects.
- Add helper `getRandomIntegerInclusive` for randomly selecting a whole integer value from a given range.

### Other Changes

- Updates package to work with the react native bundler. [PR #17783](https://github.com/Azure/azure-sdk-for-js/pull/17783)

## 1.0.0-beta.1 (2021-05-06)

### Features Added

- First release of package. This package is intended to provide various shared utility functions for client SDK packages.

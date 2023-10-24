# Release History

## 1.6.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.6.1 (2023-11-07)

### Bugs Fixed

- Fixed Base64 decode in `stringToUint8Array` in browser so that it supports binary that contains UTF-16 characters which have a continuation token.

## 1.6.0 (2023-10-23)

### Features Added

- Add support for hex encoding to `uint8ArrayToString` and `stringToUint8Array`
- Fix bug when `uint8ArrayToString` with Base64 encoding would not decode binary data 
  containing bytes which are not valid ISO/IEC 8859-1 (latin1) characters.

### Bugs Fixed

- Improved `isNode` to be false when `isDeno` is true due to Deno implementing `process.version.node`

## 1.5.0 (2023-09-25)

### Features Added

- Adds helper method `cancelablePromiseRace`, an abstraction that leverages `"promise.race()"` and aborts the losers of the race as soon as the first promise settles.
  [PR #26748](https://github.com/Azure/azure-sdk-for-js/pull/26748)

## 1.4.0 (2023-08-03)

### Features Added

- Adds extra environment checks for browser or other environments [PR #26018](https://github.com/Azure/azure-sdk-for-js/pull/26018)
- Add helper functions `uint8ArrayToString` and `stringToUint8Array` for transform between string and bytes array with different character encodings.

## 1.3.2 (2023-05-05)

### Bugs Fixed

- Fix an issue where `randomUUID()` is not exported for react-native [issue #25754](https://github.com/Azure/azure-sdk-for-js/issues/25754)

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

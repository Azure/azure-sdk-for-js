# Release History

## 1.13.1 (2025-09-11)

### Other Changes

- Upgrade `@azure/*` dependencies to latest versions.

## 1.13.0 (2025-07-10)

### Other Changes

- Update `engines` to `"node": ">=20.0.0"`. Please refer to our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more information on our supported Node.js versions.

## 1.12.0 (2025-05-01)

### Other Changes

- Depend on `@typespec/ts-http-runtime`. [PR #33721](https://github.com/Azure/azure-sdk-for-js/pull/33721)

## 1.11.0 (2024-10-15)

### Features Added

- Added support for `HttpMethods` type

## 1.10.0 (2024-09-12)

### Features Added

- Added `calculateRetryDelay` helper that can be used to calculate the next delay interval for exponential delay with jitter. [#30572](https://github.com/Azure/azure-sdk-for-js/pull/30572)

## 1.9.2 (2024-08-01)

### Other Changes

- Adding React-Native support at top level [PR #30521](https://github.com/Azure/azure-sdk-for-js/pull/30521)

## 1.9.1 (2024-07-10)

### Bugs Fixed

- Address React-Native regression after ESM migration [Issue #30065](https://github.com/Azure/azure-sdk-for-js/issues/30065)

## 1.9.0 (2024-04-09)

### Features Added

- Add new `isNodeLike` and `isNodeRuntime` helpers. [PR #29086](https://github.com/Azure/azure-sdk-for-js/pull/29086/files)
  - `isNodeLike` can be used to test if the current environment is compatible with Node.
  - `isNodeRuntime` can be used to test if the current environment is strictly Node.js.
  - Deprecated the existing `isNode` helper. Use `isNodeLike` instead.

### Other Changes

- Revert TypeScript output target to ES2017.

## 1.8.1 (2024-03-20)

### Other Changes

- Add top-level `browser` field to `package.json` as fallback for legacy bundlers that do not support the `exports` field.

## 1.8.0 (2024-03-12)

### Other Changes

- Migrated the codebase to ESM. This change is internal and should not affect customers.
- Migrated unit tests to vitest.

## 1.7.0 (2024-02-01)

### Other Changes

- Upgrade dependency `@azure/abort-controller` version to `^2.0.0`.

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

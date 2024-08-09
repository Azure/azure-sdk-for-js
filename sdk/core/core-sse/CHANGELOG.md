# Release History

## 2.1.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

- Fixes a bug in NodeJS where we attempt to close the underlying socket despite it being set to null when the stream has been consumed [BUG [#30414](https://github.com/Azure/azure-sdk-for-js/issues/30414)].

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

## 2.0.0 (2024-01-02)

### Features Added

- `createSseStream` returns a `ReadableStream` that is iterable and can also be disposed.

### Breaking Changes

- `iterateSseStream` is renamed to `createSseStream` and no longer takes arbitrary `AsyncIterable<Uint8Array>` as input and instead only accepts `ReadableStream<Uint8Array>` and `http.IncomingMessage` as input.

## 1.0.0 (2023-09-07)

- First release of package, see README.md for details.

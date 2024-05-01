# Release History

## 2.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0 (2024-01-02)

### Features Added

- `createSseStream` returns a `ReadableStream` that is iterable and can also be disposed.

### Breaking Changes

- `iterateSseStream` is renamed to `createSseStream` and no longer takes arbitrary `AsyncIterable<Uint8Array>` as input and instead only accepts `ReadableStream<Uint8Array>` and `http.IncomingMessage` as input.

## 1.0.0 (2023-09-07)

- First release of package, see README.md for details.

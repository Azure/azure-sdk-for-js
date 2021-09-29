# Release History

## 2.2.1 (2021-09-30)

### Bugs Fixed

- Check for string type before calling toLowerCase(). [PR #17573](https://github.com/Azure/azure-sdk-for-js/pull/17573)

### Other Changes

- Updates package to work with the react native bundler. [PR #17783](https://github.com/Azure/azure-sdk-for-js/pull/17783)

## 2.2.0 (2021-08-05)

### Features Added

- `LroEngine` supports a new `isDone()` function in its options bag which can be used to provide a custom logic for determining when an LRO finished processing.

## 2.1.0 (2021-07-19)

### Features Added

- Provides a long-running operation engine.

## 2.0.0 (2021-06-30)

### New Features

- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features

## 1.0.5 (2021-04-12)

- No functionality changes from 1.0.4. This release is to correct an issue where 1.0.4 shipped with modules in the wrong format (cjs instead of es6.)

## 1.0.4 (2021-03-30)

- Bug fix: Fix an issue where we might return stale state if the `update` implementation reassigns `operation.state`.

### Breaking Changes

- Updated @azure/core-tracing to version `1.0.0-preview.11`. See [@azure/core-tracing CHANGELOG](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-tracing/CHANGELOG.md) for details about breaking changes with tracing.

## 1.0.3 (2021-01-07)

- Updates the `tslib` dependency to version 2.x.

## 1.0.2 (2020-04-28)

- Moved `@opentelemetry/types` to the `devDependencies`.

## 1.0.1 (2020-02-28)

- `getOperationState()` now returns `TState`.
- `TState` of `PollerLike` can be a subset of `TState` of `Poller`,

## 1.0.0 (2019-10-29)

This release marks the general availability of the `@azure/core-lro` package.

- Updated PollOperation to be more strictly typed.

## 1.0.0-preview.1 (2019-10-22)

- Initial implementation of an abstraction for Long Running Operations (LROs).

# Release History

## 3.0.0-beta.1 (2024-02-25)

Initial implementation of next-generation for Long Running Operations (LROs) in which we deprecate the `LroEngine` support and change poller creation to a synchronized way.

- `LroEngine` is deprecated and no long supported
- The return type of `createHttpPoller` is changed from `Promise<SimplePollerLike>` to `PollerLike`
- Some interfaces are renamed. `SimplePollerLike` is renamed as `PollerLike`, `LroResponse` is renamed as `OperationResponse` and `LroResourceLocationConfig` is to `ResourceLocationConfig`
- Functions `getOperationState()`, `getResult()`, `isDone()` and `isStopped()` is changed to read-only attributes `operationState`, `result`, `isDone` and `isStopped`
- Deprecated the attributes `requestMethod` and `requestPath` in `LongRunningOperation`
- Added a new function `serialize` to help serialize the poller
- Added a new function `submitted` to help wait for the poller submitted succesffully
- Added a new parameter `TRequest` for `OperationResponse` to accept the raw request
- Export the function `deserializeState` to the public

## 2.6.0 (2024-02-01)

### Other Changes

- Search for the `resourceLocation` property in the raw response body if it cannot be found in the parsed response body.
- Upgrade dependency `@azure/abort-controller` version to `^2.0.0`.

## 2.5.4 (2023-07-24)

### Bugs Fixed

- Support non-standard PATCH operations.

## 2.5.3 (2023-05-04)

### Other Changes

- Include detailed error information in failed polling error messages.

## 2.5.2 (2023-04-06)

### Bugs Fixed

- Change the logging level for unrecognized operation statuses from warning to verbose.

## 2.5.1 (2023-02-02)

### Bugs Fixed

- The operation will be considered failed when an HTTP response error is received and not when any arbitrary error is raised.

## 2.5.0 (2023-01-10)

### Other Changes

- poll() is optimized to no longer send a polling request if the operation is already in a terminal state.

## 2.4.0 (2022-09-29)

### Features Added

- Add `resolveOnUnsuccessful` to `CreateHttpPollerOptions` and `LroEngineOptions` to control whether to throw an error if the operation failed or was canceled.

### Bugs Fixed

- Precisely detect when an operation failed without relying on exceptions raised by the underlying core library.
- Handle bad status fields.

## 2.3.1 (2022-09-09)

### Bugs Fixed

- Add missing support for fetching resources linked to in the body of the final polling response.

## 2.3.0 (2022-09-01)

### Features Added

- Provides `createHttpPoller` which creates a simple poller that can work out of the box for most Azure long-running operations.
- Deprecates `cancelOperation` in `PollerLike` because not every operation supports cancellation.

## 2.2.5 (2022-08-08)

### Bugs Fixed

- `LroEngine` no longer throws an error when it receives a 204 polling response.

### Other Changes

- Support LROs with GET as the initial request method.
- Better logging support for the operation and the poller.
- Removed the unused dependency `@azure/core-tracing`.

## 2.3.0-beta.1 (2022-05-18)

### Features Added

- `lroEngine` now supports cancellation of the long-running operation.

### Other Changes

- Removed the unused dependency `@azure/core-tracing`.

## 2.2.4 (2022-03-07)

### Bugs Fixed

- Fix polling so that resources created in a different URL will be retrieved once polling is done. [PR #20656](https://github.com/Azure/azure-sdk-for-js/pull/20656)

## 2.2.3 (2022-01-06)

### Bugs Fixed

- Fix an issue where we treat Retry-After value as milliseconds. It is actually in seconds. [PR #19479](https://github.com/Azure/azure-sdk-for-js/pull/19479)

## 2.2.2 (2021-12-02)

### Bugs Fixed

- Fix LRO PATCH operations when their results are located in a different URL. [PR #18820](https://github.com/Azure/azure-sdk-for-js/pull/18820)

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

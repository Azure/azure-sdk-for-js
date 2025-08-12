# Release History

## 1.2.0 (2025-07-16)

### Features Added

- Generate code from TypeSpec. This is an internal change that should not affect customers.
  - Migrates client interfaces to use types from `@azure-rest/core-client` and `@azure/core-rest-pipeline` instead of `@azure/core-client`.
  - Adds support for specifying `clientRequestId` and `contentEncoding` in `LogsUploadOptions` to provide more control over upload requests.
  - Adds the `KnownVersions` enum for API versioning, starting with V20230101.
  - Adds the `pipeline` property on `LogsIngestionClient` for advanced customization.

## 1.1.0 (2024-06-11)

### Features Added

- Added `audience` support for the logs ingestion client to specify the audience for the authentication token. This feature is necessary to use a sovereign cloud. Refer to [#27280](https://github.com/Azure/azure-sdk-for-js/issues/27280) for further details.

### Bugs Fixed

- React-Native support for `zlib` via the `pako` package.

## 1.0.0 (2023-02-15)

### Features Added

- Added an error callback functionality for inspecting individual log uploads via `LogsUploadOptions`.

### Breaking Changes

- The `upload` API throws an `AggregateLogsUploadError` in case of an error and returns `void` when operation succeeds.
- Renamed `LogsUploadError` to `LogsUploadFailure`.

### Other Changes

- `LogsUploadOptions` supports the `OperationOptions` from @azure/core-client, allowing users to abort operations when needed.
- Added samples for all error handling scenarios.
## 1.0.0-beta.3 (2022-10-13)

### Breaking Changes

- Renamed the following types:
  - `UploadOptions` to `UploadLogsOptions`
  - `UploadResult` to `UploadLogsResult`
  - `UploadStatus` to `UploadLogsStatus`
- The `uploadStatus` property on the previous `UploadResult` type (now `UploadLogsResult`) has been renamed to `status`.
- The `responseError` property on `UploadLogsError` has been renamed to `cause`.

### Other Changes

- Increased the default maximum number of concurrent requests to 5 when uploading in batches. The level of concurrency can
  be customized using the `maxConcurrency` option passed to the `upload` method.

## 1.0.0-beta.2 (2022-08-22)

### Features Added

- Added gzip support for browser

## 1.0.0-beta.1 (2022-07-19)

### Features Added

- First beta release for the @azure/monitor-ingestion library.

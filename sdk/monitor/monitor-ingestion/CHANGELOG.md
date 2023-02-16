# Release History

## 1.0.0 (2023-02-15)

### Features Added

- Added an error callback functionality for inspecting individual log uploads via `UploadLogsOptions`.

### Breaking Changes

- The `upload` API throws an `AggregateUploadLogsError` in case of an error and returns `void` when operation succeeds.
- Renamed `UploadLogsError` to `UploadLogsFailure`.

### Other Changes

- `UploadLogsOptions` supports the `OperationOptions` from @azure/core-client, allowing users to abort operations when needed.
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

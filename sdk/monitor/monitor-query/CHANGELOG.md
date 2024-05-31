# Release History

## 1.3.0 (2024-06-11)

### Features Added

- Added `audience` support for all the clients  to specify the audience for the authentication token. This is useful when working  in sovereign clouds. Refer [#28821](https://github.com/Azure/azure-sdk-for-js/issues/28821) for further details.

## 1.2.0 (2024-03-25)

### Features Added

- Added a new `MetricsClient` to query metrics for multiple resources.
- Added `autoAdjustTimegrain`, `rollUpBy` and `validateDimensions` properties to the `MetricsQueryOptions` object.
- Added `resourceId` property to the `MetricsQueryResult` object.

## 1.2.0-beta.3 (2023-11-20)

### Other Changes

- The Monitor Query service has done some internal changes and we have updated the service versions. A detailed list of changes could be found at [PR #27825](https://github.com/Azure/azure-sdk-for-js/pull/27825/).

## 1.2.0-beta.2 (2023-08-21)

- Added `batchMetricsAuthScope` property to `MetricsBatchQueryClientOptions` object.
- Added integration test cases for `MetricsBatchQueryClient`.

### Breaking Changes

- In the `MetricsBatchOptionalParams` object, the casing of property names `endtime`, `orderby`, and `starttime` changed to `endTime`, `orderBy`, and `startTime` respectively.
- In the `MetricsBatchQueryClientOptions` object, the `batchEndPoint` has been removed as optional property. Instead, this has been changed to mandatory parameter in the `MetricsBatchQueryClient` class.
- In the `MetricsBatchOptionalParams` object, the data type properties of `startTime` & `endTime` have been changed from `string` to `Date`.

## 1.2.0-beta.1 (2023-08-11)

- Added `MetricsBatchQueryClient` to support batch querying of metrics.

## 1.1.1 (2023-06-08)

### Bugs Fixed

- Fixed the ISO8601 value for `twentyFourHours`to `PT24H`, instead of the incorrect `P24H` under `Durations` object.
- Fixed the ISO8601 value for `fortyEightHours`to `PT48H`, instead of the incorrect `P48H` under `Durations` object.

## 1.1.0 (2023-05-09)

### Features Added

- Added Resource centric query logs api for `LogsIngestionClient` from (`1.1.0-beta.1` release).

## 1.0.4 (2023-05-05)

### Bugs Fixed

- Fixed the ISO8601 value for `twentyFourHours`to reflect `P24H`, instead of `P1D` under `Durations` object.

### Other Changes

- Added alias `fortyEightHours` for ISO8601 value `P48H` under `Durations` object.
- Deprecated alias name `fourtyEightHours` and fixed the ISO8601 value to be `P48H` instead of `P2D` under `Durations` object.

## 1.1.0-beta.1 (2023-05-02)

### Features Added

- Added Resource centric query logs api for `LogsIngestionClient`.

## 1.0.3 (2022-10-05)

### Bugs Fixed

- #23349 Fixed endpoint resolution to allow endpoints from sovereign clouds

## 1.0.2 (2022-06-07)

### Bugs Fixed

- Fixed a typo in the string for user-provided scope for `MetricsQueryClient` and `LogsQueryClient`.

## 1.0.1 (2022-02-10)

### Bugs Fixed

- Fixed the `timeInterval` field of `MetricsQueryResult` object to correctly return all the fields of `QueryTimeInterval`.

## 1.0.0 (2021-10-07)

### Features Added

- Enabled browser support
- Added different result objects `LogsQueryPartialResult`, `LogsQuerySuccessfulResult` or `LogsQueryError` based on the success scenarios for log queries.

### Breaking Changes

- Renamed `ErrorInfo` to `LogsErrorInfo`, which now extends the `Error` class and `code` as an additional property. Removed all the other properties.
- `query` method in `LogsQueryClient` renamed to `queryWorkspace`
- `query` method in `MetricsQueryClient` renamed to `queryResource`
- Renamed the status types in `LogsQueryResultStatus`. `Partial` to `PartialFailure` and `Failed` to `Failure`.
- Renamed `timeGrain` in `MetricAvailability` to `granularity`
- Renamed `TimeInterval` to `QueryTimeInterval`
- Updated constants in `Durations` to camel-case.
- Removed `credentialOptions.credentialScopes` property in `LogsQueryClientOptions` since scopes other than default are not supported yet.
- Removed `throwOnAnyError` flag from `LogsQueryOptions` and `LogsQueryBatchOptions`
- Removed the error classes `BatchError` and `AggregateBatchError`
- Updated `LogsQueryBatchResult` object to be a list of objects with the following possible types:
  - `LogsQueryPartialResult`
  - `LogsQuerySuccessfulResult`
  - `LogsQueryError`
- Updated `LogsQueryResult` object to be of type `LogsQuerySuccessfulResult` or `LogsQueryPartialResult`

### Bugs Fixed

- Updated `listMetricNamespaces` signature to return the list of appropriate `MetricsNamespaces` object type

## 1.0.0-beta.5 (2021-09-09)

### Features Added

- Added convenience method `getMetricByName` in `MetricsQueryResult` to allow users to fetch results of a particular metric
- Added a flag `throwOnAnyFailure` to be set by user for methods `queryLogs` and `queryLogsBatch` to enable error throwing
- Defining `AggregateBatchError` class for throwing batch errors
- Added status with potential values `("Partial" | "Success" | "Failed")` for responses of `query` and `queryBatch` APIs to indicate whether the status of results of each query.

### Breaking Changes

- Updated methods `getMetricDefinitions` and `getMetricNamespaces` to return paginated list of items and renamed to `listMetricDefinitions` and `listMetricNames` respectively
- Renamed methods `queryLogs` and `queryLogsBatch` in `LogsQueryClient` to `query` and `queryBatch`
- Updated the constant names inside `Durations` to drop the `last` prefix
- Updated method `queryBatch` to take argument of `QueryBatch` model instead of `QueryLogsBatch` model
- Renamed `QueryLogsOptions` to `LogsQueryOptions`
- Renamed `QueryLogsBatchResult` to `LogsQueryBatchResult`
- Renamed `QueryMetricsResult` to `MetricsQueryResult`
- Renamed `QueryLogsResult` to `LogsQueryResult`, `QueryLogsBatchOptions` to `LogsQueryBatchOptions`
- Updated type for `timespan` property from `string` to `TimeInterval` type in `query` and `queryBatch` methods of `LogsQueryClient` and in `MetricsQueryResult` interface
- Renamed `MetricColumn` to `LogsColumn` and `column` to `columnDescriptors` in `LogsTable` model
- Renamed `displayDescription` property to `description` in `Metric` and `MetricNames`
- Flattened the `metricNamespaceName` property for `MetricNamespace`
- Renamed `innererror` to `innerError` in `ErrorInfo`

## 1.0.0-beta.4 (2021-08-10)

### Features Added

- Added `additionalWorkspaces` as an optional parameter to `QueryLogsOptions` and `BatchQuery` for the `queryLogs` and `queryLogsBatch` API to allow multiple workspaces
- Allow returning statistics and visualization information to user for each query result in `QueryLogsBatchResult`
- Adding Error information in `QueryLogsResult`.

### Breaking Changes

- Renamed `workspace` to `workspaceId` in querybatch

## 1.0.0-beta.3 (2021-07-06)

### Features Added

- The `include-render` header can now be specified via `QueryLogsOption.includeVisualization`, allowing
  visualization information to be returned in `QueryLogsResult.visualization`. The results are currently
  unmodeled and reflect the underlying JSON structure.

## 1.0.0-beta.2 (2021-06-15)

- Fixing issue using non-commercial clouds, where it wasn't possible to pass in an endpoint and custom
  scope, both of which are needed.
  [PR#15705](https://github.com/Azure/azure-sdk-for-js/pull/15705)
- Adding a mitigation for LogsQueryClient.queryLogsBatch() where an invalidly encoded response could lead
  to no results being surfaced to the user. This should allow for the result to be properly parsed.
  [PR#15718](https://github.com/Azure/azure-sdk-for-js/pull/15718)

## 1.0.0-beta.1 (2021-06-08)

- Initial release of the monitor-query library, allowing you to query Log Analytics Workspaces
  for logs and metrics.

# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

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

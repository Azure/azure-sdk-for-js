# Release History

## 1.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

- Fixed `LogsQueryClient.queryResource()` building a malformed URL with a double slash (e.g. `.../v1//subscriptions/...`) when the resource ID starts with a leading slash (the standard ARM resource ID format). The leading slash is now normalized so the request URL is well-formed. [#39361](https://github.com/Azure/azure-sdk-for-js/issues/39361)

### Other Changes

## 1.0.0 (2025-07-29)

### Features Added

- Initial release of `@azure/monitor-query-logs` package
- This package contains the logs querying functionality split from `@azure/monitor-query`
- Provides `LogsQueryClient` for querying Azure Monitor Logs using KQL (Kusto Query Language)
- Supports querying Azure Log Analytics workspaces and resource-centric queries
- Includes batch query capabilities for multiple queries

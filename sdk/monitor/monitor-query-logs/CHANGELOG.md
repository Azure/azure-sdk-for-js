# Release History

## 2.0.0 (2025-07-23)

### Features Added

- Initial release of `@azure/monitor-query-logs` package
- This package contains the logs querying functionality split from `@azure/monitor-query`
- Provides `LogsQueryClient` for querying Azure Monitor Logs using KQL (Kusto Query Language)
- Supports querying Azure Log Analytics workspaces and resource-centric queries
- Includes batch query capabilities for multiple queries

### Breaking Changes

- This is a new package split from `@azure/monitor-query`
- Users migrating from `@azure/monitor-query` should update their import statements
- See [MIGRATION.md](MIGRATION.md) for detailed migration guidance

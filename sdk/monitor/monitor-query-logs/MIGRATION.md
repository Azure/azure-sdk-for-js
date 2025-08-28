<!-- dev-tool snippets ignore -->

# Migration Guide: From @azure/monitor-query to @azure/monitor-query-logs

This guide helps you migrate from the `@azure/monitor-query` package to the new `@azure/monitor-query-logs` package, which contains only the logs querying functionality.

## Why the split?

The `@azure/monitor-query` package has been split into separate packages to provide better modularity:

- `@azure/monitor-query-logs` - For Azure Monitor Logs querying (this package)
- `@azure/monitor-query` - Will be retired; metrics functionality moved to dedicated metrics packages

This allows users to install only the functionality they need, reducing bundle size and dependencies. The original `@azure/monitor-query` package will be deprecated and eventually retired.

## Installation

### Before (using @azure/monitor-query)

```bash
npm install @azure/monitor-query
```

### After (using @azure/monitor-query-logs)

```bash
npm install @azure/monitor-query-logs
```

## Import Changes

### Before (using @azure/monitor-query)

```typescript
import {
  LogsQueryClient,
  LogsQueryOptions,
  LogsQueryResult,
  LogsQueryResultStatus,
  Durations,
} from "@azure/monitor-query";
```

### After (using @azure/monitor-query-logs)

```typescript
import {
  LogsQueryClient,
  LogsQueryOptions,
  LogsQueryResult,
  LogsQueryResultStatus,
  Durations,
} from "@azure/monitor-query-logs";
```

## Code Changes

The API remains exactly the same - only the package name changes. All your existing code should work without modification after updating the import statement.

### Example Migration

#### Before

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, Durations } from "@azure/monitor-query";

const credential = new DefaultAzureCredential();
const logsClient = new LogsQueryClient(credential);

const result = await logsClient.queryWorkspace(
  workspaceId,
  "AzureActivity | limit 10",
  Durations.oneDay
);
```

#### After

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, Durations } from "@azure/monitor-query-logs";

const credential = new DefaultAzureCredential();
const logsClient = new LogsQueryClient(credential);

const result = await logsClient.queryWorkspace(
  workspaceId,
  "AzureActivity | limit 10",
  Durations.oneDay
);
```

## What's Included

The `@azure/monitor-query-logs` package includes all logs-related functionality from the original package:

### Classes

- `LogsQueryClient` - Main client for querying logs

### Types and Interfaces

- `LogsQueryOptions` - Options for log queries
- `LogsQueryResult` - Query result types
- `LogsQueryResultStatus` - Status enumeration
- `LogsTable` - Table data structure
- `LogsColumn` - Column definitions
- `QueryTimeInterval` - Time interval types
- `QueryBatch` - Batch query types
- And all related types and interfaces

### Constants

- `Durations` - Helper constants for common time intervals
- `KnownMonitorLogsQueryAudience` - Known audience values for different clouds

## Compatibility

- **API Compatibility**: 100% compatible - no breaking changes to the logs querying API
- **TypeScript**: Full TypeScript support maintained
- **Node.js**: Same Node.js version support as the original package
- **Browser**: Same browser support as the original package

## Getting Help

- [GitHub Issues](https://github.com/Azure/azure-sdk-for-js/issues)
- [Azure Documentation](https://docs.microsoft.com/azure/azure-monitor/)

## Timeline

- The `@azure/monitor-query` package is deprecated and will be retired
- Migrate to `@azure/monitor-query-logs` for logs functionality
- For metrics functionality, dedicated metrics packages will be available separately
- We recommend migrating from `@azure/monitor-query` as soon as possible

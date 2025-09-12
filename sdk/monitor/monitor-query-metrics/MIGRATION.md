<!-- dev-tool snippets ignore -->

# Migration Guide: From @azure/monitor-query to @azure/monitor-query-metrics

This guide helps you migrate from the `@azure/monitor-query` package to the new `@azure/monitor-query-metrics` package, which contains only the metrics querying functionality.

## Why the split?

The `@azure/monitor-query` package has been split into separate packages to provide better modularity:

- `@azure/monitor-query-logs` - For Azure Monitor Logs querying
- `@azure/monitor-query-metrics` - For Azure Monitor Metrics querying (this package)
- `@azure/monitor-query` - Will be retired

This allows users to install only the functionality they need, reducing bundle size and dependencies. The original `@azure/monitor-query` package will be deprecated and eventually retired.

## Installation

### Before (using @azure/monitor-query)

```bash
npm install @azure/monitor-query
```

### After (using @azure/monitor-query-metrics)

```bash
npm install @azure/monitor-query-metrics
```

## Import Changes

### Before - using @azure/monitor-query

```typescript
import {
  MetricsClient,
  MetricsQueryResult,
  MetricsQueryResourcesOptions,
  Durations,
} from "@azure/monitor-query";
```

### After - using @azure/monitor-query-metrics

```typescript
import {
  MetricsClient,
  MetricsQueryResult,
  MetricsQueryResourcesOptions,
  Durations,
} from "@azure/monitor-query-metrics";
```

## Code Changes

The `MetricsClient` API remains exactly the same - only the package name changes. All your existing code should work without modification after updating the import statement.

**Note**: This migration guide covers only the `MetricsClient` class.

### Example Migration

#### Old Code - using @azure/monitor-query

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { MetricsClient, Durations } from "@azure/monitor-query";

const endpoint = "https://westus3.metrics.monitor.azure.com";
const credential = new DefaultAzureCredential();
const metricsClient = new MetricsClient(endpoint, credential);

const resourceIds = [
  "/subscriptions/<id>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/<name1>",
  "/subscriptions/<id>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/<name2>"
];

const result = await metricsClient.queryResources(
  resourceIds,
  ["UsedCapacity"],
  "Microsoft.Storage/storageAccounts",
  {
    aggregation: "Average",
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    endTime: new Date(),
    interval: Durations.fiveMinutes,
  }
);
```

#### New Code - using @azure/monitor-query-metrics

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { MetricsClient, Durations } from "@azure/monitor-query-metrics";

const endpoint = "https://westus3.metrics.monitor.azure.com";
const credential = new DefaultAzureCredential();
const metricsClient = new MetricsClient(endpoint, credential);

const resourceIds = [
  "/subscriptions/<id>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/<name1>",
  "/subscriptions/<id>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/<name2>"
];

const result = await metricsClient.queryResources(
  resourceIds,
  ["UsedCapacity"],
  "Microsoft.Storage/storageAccounts",
  {
    aggregation: "Average",
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    endTime: new Date(),
    interval: Durations.fiveMinutes,
  }
);
```

## Key API Changes

### No Breaking Changes

The `MetricsClient` API is 100% compatible between packages:

- **Constructor**: `new MetricsClient(endpoint, credential, options?)` - Same signature
- **Methods**: `queryResources(resourceIds, metricNames, metricNamespace, options?)` - Same signature  
- **Options**: All option properties remain the same

### What Changed

- **Package name**: `@azure/monitor-query` → `@azure/monitor-query-metrics`
- **Import statement**: Only the package name in the import changes

### What's Not Included

This package only includes the `MetricsClient` class. If you were using `MetricsQueryClient` (the other metrics client from the original package), that functionality is not included here.

## Compatibility

- **TypeScript**: Full TypeScript support maintained
- **Node.js**: Same Node.js version support as the original package
- **Browser**: Same browser support as the original package

## Getting Help

- [GitHub Issues](https://github.com/Azure/azure-sdk-for-js/issues)
- [Azure Documentation](https://docs.microsoft.com/azure/azure-monitor/)

## Timeline

- The `@azure/monitor-query` package is deprecated and will be retired
- Migrate to `@azure/monitor-query-metrics` for metrics functionality
- For logs functionality, use the `@azure/monitor-query-logs` package
- We recommend migrating from `@azure/monitor-query` as soon as possible

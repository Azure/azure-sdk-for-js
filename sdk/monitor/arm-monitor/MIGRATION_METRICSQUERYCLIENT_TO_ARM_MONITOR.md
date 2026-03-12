<!-- dev-tool snippets ignore -->

# Migration Guide: From MetricsQueryClient in @azure/monitor-query to @azure/arm-monitor

This guide helps you migrate code that uses `MetricsQueryClient` from `@azure/monitor-query` to the management library `@azure/arm-monitor`.

## Why migrate?

The `MetricsQueryClient` is being deprecated in `@azure/monitor-query`. The resource-centric metrics APIs are fully supported in `@azure/arm-monitor`, which exposes the same Azure Monitor metrics endpoints via the ARM SDK.

## Installation

```bash
npm install @azure/arm-monitor
```

## Auth differences

Both libraries use credentials from `@azure/identity`. With `@azure/arm-monitor`, you pass the subscription ID and use `MonitorClient` to access operations.

```ts
import { DefaultAzureCredential } from "@azure/identity";
import { MonitorClient } from "@azure/arm-monitor";

const credential = new DefaultAzureCredential();
const subscriptionId = "<subscription-id>";
const monitor = new MonitorClient(credential, subscriptionId);
```

## Query metrics for a resource

### Query metrics — Before (MetricsQueryClient)

```ts
import { DefaultAzureCredential } from "@azure/identity";
import { MetricsQueryClient } from "@azure/monitor-query";

const credential = new DefaultAzureCredential();
const client = new MetricsQueryClient(credential);

const resourceId = "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/<name>";
const result = await client.queryResource(resourceId, ["UsedCapacity"], {
  timespan: { duration: "P1D" },
  aggregations: ["Average"],
  granularity: "PT5M",
});
```

### Query metrics — After (arm-monitor)

```ts
import { DefaultAzureCredential } from "@azure/identity";
import { MonitorClient } from "@azure/arm-monitor";

const credential = new DefaultAzureCredential();
const subscriptionId = "<subscription-id>";
const monitor = new MonitorClient(credential, subscriptionId);

const resourceId = "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/<name>";

const response = await monitor.metricsOperations.list(resourceId, {
  // timespan format: "startTime/endTime" in ISO8601 or duration like "P1D"
  timespan: "P1D",
  metricnames: "UsedCapacity",
  aggregation: "Average",
  interval: "PT5M",
});

// response.value contains the metrics series
```

## List metric definitions

### Metric definitions — Before (MetricsQueryClient)

```ts
const defs = client.listMetricDefinitions(resourceId);
for await (const def of defs) {
  console.log(def.name, def.primaryAggregationType);
}
```

### Metric definitions — After (arm-monitor)

```ts
const defs = await monitor.metricDefinitions.list(resourceId);
for (const def of defs.value) {
  console.log(def.name?.value, def.primaryAggregationType);
}
```

## List metric namespaces

### Metric namespaces — Before (MetricsQueryClient)

```ts
const names = client.listMetricNamespaces(resourceId);
for await (const n of names) {
  console.log(n.metricNamespaceName);
}
```

### Metric namespaces — After (arm-monitor)

```ts
const names = await monitor.metricNamespaces.list(resourceId, { startTime: new Date().toISOString() });
for (const n of names.value) {
  console.log(n.properties?.metricNamespaceName);
}
```

## Key option mappings

- `timespan` → same name in `metricsOperations.list` (string)
- `aggregations` → `aggregation` (comma-separated string)
- `granularity` → `interval` (ISO8601 duration string)
- `metricNamespace` → `metricnamespace`
- `orderBy` → `orderby`
- `top` → `top`

## Getting help

- Issues: [Azure SDK for JavaScript issues](https://github.com/Azure/azure-sdk-for-js/issues)
- Azure Monitor docs: [Azure Monitor documentation](https://learn.microsoft.com/azure/azure-monitor/)

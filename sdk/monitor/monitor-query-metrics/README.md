# Azure Monitor Query Metrics client library for JavaScript

The Azure Monitor Query Metrics client library is used to execute read-only queries against [Azure Monitor][azure_monitor_overview]'s metrics data platform:

- [Metrics](https://learn.microsoft.com/azure/azure-monitor/essentials/data-platform-metrics) - Collects numeric data from monitored resources into a time series database. Metrics are numerical values that are collected at regular intervals and describe some aspect of a system at a particular time. Metrics are lightweight and capable of supporting near real-time scenarios, making them useful for alerting and fast detection of issues.

## Migrating from @azure/monitor-query advisory ⚠️

Checkout the [Migration Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/MIGRATION.md) for detailed instructions on how to update your application code from the original `@azure/monitor-query` package to the `@azure/monitor-query-metrics` library.

**Resources:**

- [Source code][source]
- [Package (npm)][package]
- [API reference documentation][msdocs_apiref]
- [Service documentation][azure_monitor_overview]
- [Samples][samples]
- [Change log][changelog]

## Getting started

### Supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Microsoft Edge, and Firefox

For more information, see our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md).

### Prerequisites

- An [Azure subscription][azure_subscription]
- A [TokenCredential](https://learn.microsoft.com/javascript/api/@azure/core-auth/tokencredential?view=azure-node-latest) implementation, such as an [Azure Identity library credential type](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest#credential-classes).
- To query Metrics, you need an Azure resource of any kind (Storage Account, Key Vault, Cosmos DB, etc.).

### Install the package

Install the Azure Monitor Query Metrics client library for JavaScript with npm:

```bash
npm install --save @azure/monitor-query-metrics
```

### Create the client

An authenticated client is required to query Metrics. To authenticate, the following example uses [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential) from the [@azure/identity](https://www.npmjs.com/package/@azure/identity) package.

```ts snippet:ReadmeSampleCreateClient
import { DefaultAzureCredential } from "@azure/identity";
import { MetricsClient } from "@azure/monitor-query-metrics";

const credential = new DefaultAzureCredential();

// Create a MetricsClient
const endpoint = " https://<endpoint>.monitor.azure.com/";
const metricsClient = new MetricsClient(endpoint, credential);
```

#### Configure client for Azure sovereign cloud

By default, the library's clients are configured to use the Azure Public Cloud. To use a sovereign cloud instead, provide the correct endpoint and audience value when instantiating a client. For example:

```ts snippet:ReadmeSampleCreateClientSovereign
import { DefaultAzureCredential } from "@azure/identity";
import { MetricsClient } from "@azure/monitor-query-metrics";

const credential = new DefaultAzureCredential();

// Create a MetricsClient
const endpoint = " https://<endpoint>.monitor.azure.cn/";
const metricsClient = new MetricsClient(endpoint, credential, {
  audience: "https://monitor.azure.cn/.default",
});
```

### Execute the query

For examples of Metrics queries, see the [Examples](#examples) section.

## Key concepts

### Metrics data structure

Each set of metric values is a time series with the following characteristics:

- The time the value was collected
- The resource associated with the value
- A namespace that acts like a category for the metric
- A metric name
- The value itself
- Some metrics have multiple dimensions as described in multi-dimensional metrics. Custom metrics can have up to 10 dimensions.

## Examples

- [Metrics query](#metrics-query)
  - [Handle metrics query response](#handle-metrics-query-response)

### Metrics query

To query metrics for one or more Azure resources, use the `queryResources` method of `MetricsClient`. This method requires a regional endpoint when creating the client. For example, `https://westus3.metrics.monitor.azure.com`.

Each Azure resource must reside in:

- The same region as the endpoint specified when creating the client.
- The same Azure subscription.

The resource IDs must be that of the resources for which metrics are being queried. It's normally of the format `/subscriptions/<id>/resourceGroups/<rg-name>/providers/<source>/topics/<resource-name>`.

To find the resource ID/URI:

1. Navigate to your resource's page in the Azure portal.
2. Select the **JSON View** link in the **Overview** section.
3. Copy the value in the **Resource ID** text box at the top of the JSON view.

Furthermore:

- The user must be authorized to read monitoring data at the Azure subscription level. For example, the [Monitoring Reader role](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/monitor#monitoring-reader) on the subscription to be queried.
- The metric namespace containing the metrics to be queried must be provided. For a list of metric namespaces, see [Supported metrics and log categories by resource type][metric_namespaces].

```ts snippet:ReadmeSampleMetricsQueryMultipleResources
import { DefaultAzureCredential } from "@azure/identity";
import { MetricsClient } from "@azure/monitor-query-metrics";

const resourceIds = [
  "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs",
  "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs2",
];
const metricsNamespace = "Microsoft.OperationalInsights/workspaces";
const metricNames = ["Heartbeat"];
const endpoint = "https://westus3.metrics.monitor.azure.com";

const credential = new DefaultAzureCredential();
const metricsClient = new MetricsClient(endpoint, credential);

const result = await metricsClient.queryResources(resourceIds, metricNames, metricsNamespace, {
  aggregation: "Count",
});

console.log(`Retrieved metrics for ${result.length} resources`);
for (const resource of result) {
  console.log(`Resource: ${resource.resourceId}`);
  console.log(`Metrics: ${resource.metrics.length}`);
}
```

#### Handle metrics query response

The metrics query API returns a list of `MetricsQueryResult` objects. The `MetricsQueryResult` object contains properties such as a list of `Metric`-typed objects, `granularity`, `namespace`, and `timespan`. The `Metric` objects list can be accessed using the `metrics` property. Each `Metric` object in this list contains a list of `TimeSeriesElement` objects. Each `TimeSeriesElement` object contains `data` and `metadatavalues` properties. In visual form, the object hierarchy of the response resembles the following structure:

```text
MetricsQueryResult
|---granularity
|---timespan
|---cost
|---namespace
|---resourceRegion
|---metrics (list of `Metric` objects)
    |---id
    |---type
    |---name
    |---unit
    |---timeseries (list of `TimeSeriesElement` objects)
        |---metadatavalues
        |---data (list of data points)
```

**Note:** Each `MetricsQueryResult` is returned in the same order as the corresponding resource in the `resourceIds` parameter. If multiple different metrics are queried, the metrics are returned in the order of the `metricNames` sent.

Example of handling response:

```ts snippet:ReadmeSampleMetricsAdvanced
import { DefaultAzureCredential } from "@azure/identity";
import { MetricsClient, Durations } from "@azure/monitor-query-metrics";

const resourceIds = [
  "/subscriptions/0000000-0000-000-0000-000000/resourceGroups/test/providers/Microsoft.OperationalInsights/workspaces/test-logs",
];
const metricsNamespace = "Microsoft.OperationalInsights/workspaces";
const metricNames = ["Heartbeat"];
const endpoint = "https://westus3.metrics.monitor.azure.com";

const credential = new DefaultAzureCredential();
const metricsClient = new MetricsClient(endpoint, credential);

const endTime = new Date();
const startTime = new Date(endTime.getTime() - 60 * 60 * 1000); // 1 hour ago

const result = await metricsClient.queryResources(resourceIds, metricNames, metricsNamespace, {
  aggregation: "Count,Average", // Multiple aggregations
  startTime: startTime,
  endTime: endTime,
  interval: Durations.fiveMinutes,
  top: 10, // Limit results
  orderBy: "count desc", // Sort by count descending
  filter: "Computer eq '*'", // Filter criteria
});

console.log(`Retrieved ${result.length} resources with advanced filtering`);
for (const resource of result) {
  for (const metric of resource.metrics) {
    console.log(`Metric: ${metric.name}`);
    console.log(`Time series count: ${metric.timeseries.length}`);
  }
}
```

For an inventory of metrics and dimensions available for each Azure resource type, see [Supported metrics with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-supported).

## Troubleshooting

To diagnose various failure scenarios, see the [troubleshooting guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/TROUBLESHOOTING.md).

## Next steps

To learn more about Azure Monitor, see the [Azure Monitor service documentation][azure_monitor_overview].

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure Monitor instance. To execute the tests, you'll need to run:

1. `pnpm install`
2. `pnpm build --filter @azure/monitor-query-metrics...`
3. `cd into sdk/monitor/monitor-query-metrics`
4. Copy the `sample.env` file to `.env`
5. Open the `.env` file in an editor and fill in the values.
6. `npm run test`.

For more details, view our [tests](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/test) folder.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure Monitor][azure_monitor_overview]

[azure_monitor_overview]: https://learn.microsoft.com/azure/azure-monitor/overview
[azure_subscription]: https://azure.microsoft.com/free/
[changelog]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/CHANGELOG.md
[metric_namespaces]: https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/metrics-index#supported-metrics-and-log-categories-by-resource-type
[msdocs_apiref]: https://learn.microsoft.com/javascript/api/@azure/monitor-query
[package]: https://www.npmjs.com/package/@azure/monitor-query-metrics
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-query-metrics/samples
[source]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/

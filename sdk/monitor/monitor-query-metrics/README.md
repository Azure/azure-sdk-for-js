# Azure Monitor Query Metrics client library for JavaScript

The Azure Monitor Query Metrics client library is used to execute read-only queries against [Azure Monitor][azure_monitor_overview]'s metrics data platform:

- [Metrics](https://learn.microsoft.com/azure/azure-monitor/essentials/data-platform-metrics) - Collects numeric data from monitored resources into a time series database. Metrics are numerical values that are collected at regular intervals and describe some aspect of a system at a particular time. Metrics are lightweight and capable of supporting near real-time scenarios, making them useful for alerting and fast detection of issues.

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

- [Query metrics for multiple resources](#query-metrics-for-multiple-resources)

### Query metrics for multiple resources

To query metrics for multiple Azure resources in a single request, use the `MetricsClient.queryResources` method. This method:

- Calls a different API than the `MetricsClient` methods.
- Requires a regional endpoint when creating the client. For example, `https://westus3.metrics.monitor.azure.com`.

Each Azure resource must reside in:

- The same region as the endpoint specified when creating the client.
- The same Azure subscription.

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
const metricsNamespace = "<YOUR_METRICS_NAMESPACE>";
const metricNames = ["requests", "count"];
const endpoint = " https://<endpoint>.monitor.azure.com/";

const credential = new DefaultAzureCredential();
const metricsClient = new MetricsClient(endpoint, credential);

const result = await metricsClient.queryResources(resourceIds, metricNames, metricsNamespace);
```

For an inventory of metrics and dimensions available for each Azure resource type, see [Supported metrics with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/metrics-supported).

## Troubleshooting

To diagnose various failure scenarios, see the [troubleshooting guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/TROUBLESHOOTING.md).

## Next steps

To learn more about Azure Monitor, see the [Azure Monitor service documentation][azure_monitor_overview].

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure Monitor instance. To execute the tests, you'll need to run:

1. `rush update`
2. `rush build -t @azure/monitor-query-metrics`
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
[msdocs_apiref]: https://learn.microsoft.com/javascript/api/@azure/monitor-query-metrics
[package]: https://www.npmjs.com/package/@azure/monitor-query-metrics
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-query-metrics/samples
[source]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/

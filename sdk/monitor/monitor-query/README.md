# Azure Monitor Workspace query client library for JavaScript

[Azure Monitor](https://docs.microsoft.com/azure/azure-monitor/overview) is a comprehensive solution for collecting, analyzing, and acting on telemetry from your cloud and on-premises environments. This service helps you maximize the availability and performance of your apps.

All data collected by Azure Monitor fits into one of two fundamental types:

- Metrics - Numerical values that describe some aspect of a system at a particular time. They're lightweight and can support near real-time scenarios.
- Logs - Disparate types of data organized into records with different sets of properties for each type. Performance data and telemetry such as events, exceptions, and traces are stored as logs.

To programmatically analyze these data sources, the Azure Monitor Query client library can be used.
Use the client library for Azure Monitor to:

- Query logs using the [Kusto query language][kusto_query_language]
- Query metrics

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/monitor-query)
- [API reference documentation][msdocs_apiref]
- [Product documentation][azure_monitor_product_documentation]
- [Samples][samples]

## Getting started

### Install the package

```bash
npm install @azure/monitor-query
```

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure Subscription](https://azure.microsoft.com)
- An [Azure Monitor][azure_monitor_product_documentation] resource

### Create an Azure Monitor resource

You can use the [Azure Portal][azure_monitor_create_using_portal] or the [Azure CLI][azure_monitor_create_using_cli] to create an Azure Monitor resource.

Instructions:

- [Using the Azure Portal][azure_monitor_create_using_portal]
- [Using the Azure CLI][azure_monitor_create_using_cli]

### Authenticate the client

[LogsQueryClient][msdocs_logs_client] and [MetricsQueryClient][msdocs_metrics_client] authenticate using a [service principal](#authenticating-with-a-service-principal).

#### Authenticating with a service principal

Authentication via service principal is done by:

- Creating a credential using the `@azure/identity` package.
- Setting appropriate RBAC rules on your Azure Monitor resource.
  More information on Azure Monitor roles can be found [here][azure_monitor_roles].

Using [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential)

```ts
const { DefaultAzureCredential } = require("@azure/identity");
const { LogsQueryClient, MetricsQueryClient } = require("@azure/monitor-query");

const credential = new DefaultAzureCredential();

const logsQueryClient = new LogsQueryClient(credential);
// or
const metricsQueryClient = new MetricsQueryClient(credential);
```

More information about `@azure/identity` can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md)

## Key concepts

### Logs

Azure Monitor Logs collects and organizes log and performance data from monitored resources. Data from different sources can be consolidated into a single workspace. Examples of data sources include:

- Platform logs from Azure services.
- Log and performance data from virtual machine agents.
- Usage and performance data from apps.

#### Azure Log Analytics workspaces

Data collected by Azure Monitor Logs is stored in one or more [Log Analytics workspaces](https://docs.microsoft.com/azure/azure-monitor/logs/data-platform-logs#log-analytics-workspaces). The workspace defines the:

- Geographic location of the data.
- Access rights defining which users can access data.
- Configuration settings, such as the pricing tier and data retention.

#### Log queries

Data from the disparate sources can be analyzed together using [Kusto Query Language (KQL)](https://docs.microsoft.com/azure/data-explorer/kusto/query/)&mdash;the same query language used by [Azure Data Explorer](https://docs.microsoft.com/azure/data-explorer/data-explorer-overview). Data is retrieved from a Log Analytics workspace using a KQL query&mdash;a read-only request to process data and return results. For more information, see [Log queries in Azure Monitor](https://docs.microsoft.com/azure/azure-monitor/logs/log-query-overview).

#### Logs Query Client

The [`LogsQueryClient`][msdocs_logs_client] allows you to query logs, using the [Kusto query language][kusto_query_language]. This data can be queried in the
portal using tables like `AppEvents`, `AppDependencies` and others.

### Metrics

Azure Monitor Metrics collects numeric data from monitored resources into a time series database. Metrics are collected at regular intervals and describe some aspect of a system at a particular time. Metrics in Azure Monitor are lightweight and can support near real-time scenarios. They're useful for alerting and fast detection of issues. Metrics can be:

- Analyzed interactively with [Metrics Explorer](https://docs.microsoft.com/azure/azure-monitor/essentials/metrics-getting-started).
- Used to receive notifications with an alert when a value crosses a threshold.
- Visualized in a workbook or dashboard.

#### Metrics data structure

Each set of metric values is a time series with the following characteristics:

- The time the value was collected
- The resource associated with the value
- A namespace that acts like a category for the metric
- A metric name
- The value itself
- Some metrics may have multiple dimensions as described in multi-dimensional metrics. Custom metrics can have up to 10 dimensions.

#### Metrics Query Client

The [`MetricsQueryClient`][msdocs_metrics_client] allows you to query metrics.

## Examples

### Querying logs

The `LogsQueryClient` can be used to query a Monitor workspace using the [Kusto Query Language](https://docs.microsoft.com/azure/data-explorer/kusto/query). The `timespan.duration` can be specified as a string in an ISO8601 duration format.
You can use the `Durations` constants provided for some commonly used ISO8601 durations.

```ts
const { LogsQueryClient, Durations } = require("@azure/monitor-query");
const { DefaultAzureCredential } = require("@azure/identity");

const azureLogAnalyticsWorkspaceId = "<the Workspace Id for your Azure Log Analytics resource>";
const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());

async function run() {
  const kustoQuery = "AppEvents | limit 1";
  const result = await logsQueryClient.query(azureLogAnalyticsWorkspaceId, kustoQuery, {
    duration: Durations.TwentFourHours
  });
  const tablesFromResult = result.tables;

  if (tablesFromResult == null) {
    console.log(`No results for query '${kustoQuery}'`);
    return;
  }

  console.log(`Results for query '${kustoQuery}'`);

  for (const table of tablesFromResult) {
    const columnHeaderString = table.columnDescriptors
      .map((column) => `${column.name}(${column.type}) `)
      .join("| ");
    console.log("| " + columnHeaderString);

    for (const row of table.rows) {
      const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
      console.log("| " + columnValuesString);
    }
  }
}
run().catch((err) => console.log("ERROR:", err));
```

#### Handling the response for Logs Query

The `query` API for `LogsQueryClient` returns the `LogsQueryResult`.

Here is a hierarchy of the response:

```
LogsQueryResult
|---statistics
|---visualization
|---error
|---status ("Partial" | "Success" | "Failed")
|---tables (list of `LogsTable` objects)
    |---name
    |---rows
    |---columnDescriptors (list of `LogsColumn` objects)
        |---name
        |---type
```

So, to handle a response with tables,

```ts
const tablesFromResult = result.tables;
for (const table of tablesFromResult) {
  const columnHeaderString = table.columnDescriptors
    .map((column) => `${column.name}(${column.type}) `)
    .join("| ");
  console.log("| " + columnHeaderString);

  for (const row of table.rows) {
    const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
    console.log("| " + columnValuesString);
  }
}
```

A full sample can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/logsQuery.ts).

#### Set logs query timeout

```ts
// setting optional parameters
const queryLogsOptions: LogsQueryOptions = {
  // explicitly control the amount of time the server can spend processing the query.
  serverTimeoutInSeconds: 60
};

const result = await logsQueryClient.query(
  azureLogAnalyticsWorkspaceId,
  kustoQuery,
  { duration: Durations.TwentyFourHours },
  queryLogsOptions
);

const tablesFromResult = result.tables;
```

### Batch logs query

The following example demonstrates sending multiple queries at the same time using the batch query API. The queries can be represented as a list of `BatchQuery` objects.

```ts
export async function main() {
  if (!monitorWorkspaceId) {
    throw new Error("MONITOR_WORKSPACE_ID must be set in the environment for this sample");
  }

  const tokenCredential = new DefaultAzureCredential();
  const logsQueryClient = new LogsQueryClient(tokenCredential);

  const kqlQuery = "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1";
  const queriesBatch = [
    {
      workspaceId: monitorWorkspaceId,
      query: kqlQuery,
      timespan: { duration: "P1D" }
    },
    {
      workspaceId: monitorWorkspaceId,
      query: "AzureActivity | summarize count()",
      timespan: { duration: "PT1H" }
    },
    {
      workspaceId: monitorWorkspaceId,
      query:
        "AppRequests | take 10 | summarize avgRequestDuration=avg(DurationMs) by bin(TimeGenerated, 10m), _ResourceId",
      timespan: { duration: "PT1H" }
    },
    {
      workspaceId: monitorWorkspaceId,
      query: "AppRequests | take 2",
      timespan: { duration: "PT1H" },
      includeQueryStatistics: true
    }
  ];

  const result = await logsQueryClient.queryBatch(queriesBatch);

  if (result.results == null) {
    throw new Error("No response for query");
  }

  let i = 0;
  for (const response of result.results) {
    console.log(`Results for query with query: ${queriesBatch[i]}`);

    if (response.error) {
      console.log(` Query had errors:`, response.error);
    } else {
      if (response.tables == null) {
        console.log(`No results for query`);
      } else {
        console.log(
          `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
        );

        for (const table of response.tables) {
          const columnHeaderString = table.columnDescriptors
            .map((column) => `${column.name}(${column.type}) `)
            .join("| ");
          console.log(columnHeaderString);

          for (const row of table.rows) {
            const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
            console.log(columnValuesString);
          }
        }
      }
    }
    // next query
    i++;
  }
}
```

#### Handling the response for Query Logs Batch

The `queryLogsBatch` API returns the `LogsQueryBatchResult`.

Here is a hierarchy of the response:

```
LogsQueryBatchResult
|---results (list of following objects)
    |---statistics
    |---visualization
    |---error
    |---status ("Partial" | "Success" | "Failed")
    |---tables (list of `LogsTable` objects)
        |---name
        |---rows
        |---columnDescriptors (list of `LogsColumn` objects)
            |---name
            |---type
```

To handle a batch response:

```ts
let i = 0;
for (const response of result.results) {
  console.log(`Results for query with query: ${queriesBatch[i]}`);

  if (response.error) {
    console.log(` Query had errors:`, response.error);
  } else {
    if (response.tables == null) {
      console.log(`No results for query`);
    } else {
      console.log(
        `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
      );

      for (const table of response.tables) {
        const columnHeaderString = table.columnDescriptors
          .map((column) => `${column.name}(${column.type}) `)
          .join("| ");
        console.log(columnHeaderString);

        for (const row of table.rows) {
          const columnValuesString = row.map((columnValue) => `'${columnValue}' `).join("| ");
          console.log(columnValuesString);
        }
      }
    }
  }
  // next query
  i++;
}
```

A full sample can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/logsQueryBatch.ts)

For information on request throttling at the Log Analytics service level, see [Rate limits](https://dev.loganalytics.io/documentation/Using-the-API/Limits).

### Query metrics

The following example gets metrics for an [Azure Metrics Advisor](https://docs.microsoft.com/azure/applied-ai-services/metrics-advisor/overview) subscription.
The resource URI must be that of the resource for which metrics are being queried. It's normally of the format `/subscriptions/<id>/resourceGroups/<rg-name>/providers/<source>/topics/<resource-name>`.

To find the resource URI:

1. Navigate to your resource's page in the Azure portal.
2. From the **Overview** blade, select the **JSON View** link.
3. In the resulting JSON, copy the value of the `id` property.

```ts
import { DefaultAzureCredential } from "@azure/identity";
import { Durations, Metric, MetricsQueryClient } from "@azure/monitor-query";
import * as dotenv from "dotenv";

dotenv.config();

const metricsResourceId = process.env.METRICS_RESOURCE_ID;

export async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const metricsQueryClient = new MetricsQueryClient(tokenCredential);

  if (!metricsResourceId) {
    throw new Error("METRICS_RESOURCE_ID must be set in the environment for this sample");
  }

  const iterator = metricsQueryClient.listMetricDefinitions(metricsResourceId);
  let result = await iterator.next();
  let metricNames: string[] = [];
  for await (const result of iterator) {
    console.log(` metricDefinitions - ${result.id}, ${result.name}`);
    if (result.name) {
      metricNames.push(result.name);
    }
  }
  const firstMetricName = metricNames[0];
  const secondMetricName = metricNames[1];
  if (firstMetricName && secondMetricName) {
    console.log(`Picking an example metric to query: ${firstMetricName} and ${secondMetricName}`);
    const metricsResponse = await metricsQueryClient.query(
      metricsResourceId,
      [firstMetricName, secondMetricName],
      {
        granularity: "PT1M",
        timespan: { duration: Durations.FiveMinutes }
      }
    );

    console.log(
      `Query cost: ${metricsResponse.cost}, interval: ${metricsResponse.granularity}, time span: ${metricsResponse.timespan}`
    );

    const metrics: Metric[] = metricsResponse.metrics;
    console.log(`Metrics:`, JSON.stringify(metrics, undefined, 2));
    const metric = metricsResponse.getMetricByName(firstMetricName);
    console.log(`Selected Metric: ${firstMetricName}`, JSON.stringify(metric, undefined, 2));
  } else {
    console.error(`Metric names are not defined - ${firstMetricName} and ${secondMetricName}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
```

In the preceding sample, the ordering of results for the metrics in the `metricResponse` will be in the order in which the user specifies the metric names in the `metricNames` array argument for the query method. If user specifies `[firstMetricName,secondMetricName]`, the result for `firstMetricName` will appear before the result for `secondMetricName` in the `metricResponse`.

### Handle metrics response

The metrics query API returns a `QueryMetricsResult` object. The `QueryMetricsResult` object contains properties such as a list of `Metric`-typed objects, `interval`, `namespace`, and `timespan`. The `Metric` objects list can be accessed using the `metrics` property. Each `Metric` object in this list contains a list of `TimeSeriesElement` objects. Each `TimeSeriesElement` contains `data` and `metadataValues` properties. In visual form, the object hierarchy of the response resembles the following structure:

```
QueryMetricsResult
|---cost
|---timespan (of type `TimeInterval`)
|---granularity
|---namespace
|---resourceRegion
|---metrics (list of `Metric` objects)
    |---id
    |---type
    |---name
    |---unit
    |---displayDescription
    |---errorCode
    |---timeseries (list of `TimeSeriesElement` objects)
        |---metadataValues
        |---data (list of data points represented by `MetricValue` objects)
            |---timeStamp
            |---average
            |---minimum
            |---maximum
            |---total
            |---count
|---getMetricByName(metricName): Metric | undefined (convenience method)
```

#### Example of handling response

```ts
import { DefaultAzureCredential } from "@azure/identity";
import { Durations, Metric, MetricsQueryClient } from "@azure/monitor-query";
import * as dotenv from "dotenv";
dotenv.config();

const metricsResourceId = process.env.METRICS_RESOURCE_ID;
export async function main() {
  const tokenCredential = new DefaultAzureCredential();
  const metricsQueryClient = new MetricsQueryClient(tokenCredential);

  if (!metricsResourceId) {
    throw new Error("METRICS_RESOURCE_ID must be set in the environment for this sample");
  }

  console.log(`Picking an example metric to query: ${firstMetricName}`);

  const metricsResponse = await metricsQueryClient.queryMetrics(
    metricsResourceId,
    { duration: Durations.FiveMinutes },
    {
      metricNames: ["MatchedEventCount"],
      interval: "PT1M",
      aggregations: [AggregationType.Count]
    }
  );

  console.log(
    `Query cost: ${metricsResponse.cost}, interval: ${metricsResponse.interval}, time span: ${metricsResponse.timespan}`
  );

  const metrics: Metric[] = metricsResponse.metrics;
  for (const metric of metrics) {
    console.log(metric.name);
    for (const timeseriesElement of metric.timeseries) {
      for (const metricValue of timeseriesElement.data!) {
        if (metricValue.count !== 0) {
          console.log(`There are ${metricValue.count} matched events at ${metricValue.timeStamp}`);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
```

A full sample can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/metricsQuery.ts)

### Advanced scenarios

#### Query multiple workspaces

The same log query can be executed across multiple Log Analytics workspaces. In addition to the KQL query, the following parameters are required:

- `workspaceId` - The first (primary) workspace ID.
- `additionalWorkspaces` - A list of workspaces, excluding the workspace provided in the `workspaceId` parameter. The parameter's list items may consist of the following identifier formats:
  - Qualified workspace names
  - Workspace IDs
  - Azure resource IDs

For example, the following query executes in three workspaces:

```ts
const queryLogsOptions: LogsQueryOptions = {
  additionalWorkspaces: ["<workspace2>", "<workspace3>"]
};

const kustoQuery = "AppEvents | limit 10";
const result = await logsQueryClient.queryLogs(
  azureLogAnalyticsWorkspaceId,
  kustoQuery,
  { duration: Durations.TwentyFourHours },
  queryLogsOptions
);
```

To view the results for each workspace, use the `TenantId` column to either order the results or filter them in the Kusto query.
**Order results by TenantId**

```
AppEvents | order by TenantId
```

**Filter results by TenantId**

```
AppEvents | filter TenantId == "<workspace2>"
```

A full sample can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/logsQueryMultipleWorkspaces.ts)

For more samples see here: [samples][samples].

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

The following samples show you the various ways you can query your Log Analytics workspace:

- [`logsQuery.ts`][samples_logsquery_ts] - Query logs in a Monitor workspace
- [`logsQueryMultipleWorkspaces.ts`][samples_logquerymultipleworkspaces_ts] - Query logs in multiple workspaces
- [`logsQueryBatch.ts`][samples_logquerybatch_ts] - Run multiple queries, simultaneously, with a batch in a Monitor workspace
- [`metricsQuery.ts`][samples_metricsquery_ts] - Query metrics in a Monitor workspace

More in-depth examples can be found in the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-query/samples/v1/) folder on GitHub.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure Monitor instance. To execute the tests you'll need to run:

1. `rush update`
2. `rush build -t @azure/monitor-query`
3. `cd into sdk/monitor/monitor-query`
4. Copy the `sample.env` file to `.env`
5. Open the `.env` file in an editor and fill in the values.
6. `npm run test`.

View our [tests](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/test)
folder for more details.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure Monitor][azure_monitor_overview]

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmonitor%2Fmonitor-query%2FREADME.png)

[azure_monitor_overview]: https://docs.microsoft.com/azure/azure-monitor/overview
[azure_monitor_create_workspace]: https://docs.microsoft.com/azure/azure-monitor/logs/quick-create-workspace
[azure_monitor_product_documentation]: https://docs.microsoft.com/azure/azure-monitor
[azure_monitor_logs_overview]: https://docs.microsoft.com/azure/azure-monitor/logs/data-platform-logs
[azure_monitor_create_using_portal]: https://docs.microsoft.com/azure/azure-monitor/logs/quick-create-workspace
[azure_monitor_create_using_cli]: https://docs.microsoft.com/azure/azure-monitor/logs/quick-create-workspace-cli
[azure_monitor_roles]: https://docs.microsoft.com/azure/azure-monitor/roles-permissions-security
[kusto_query_language]: https://docs.microsoft.com/azure/data-explorer/kusto/query/
[msdocs_metrics_client]: https://docs.microsoft.com/javascript/api/@azure/monitor-query/metricsqueryclient
[msdocs_logs_client]: https://docs.microsoft.com/javascript/api/@azure/monitor-query/logsqueryclient
[msdocs_apiref]: https://docs.microsoft.com/javascript/api/@azure/monitor-query
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-query/samples
[samples_logsquery_ts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/logsQuery.ts
[samples_logquerybatch_ts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/logsQueryBatch.ts
[samples_logquerymultipleworkspaces_ts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/logsQueryMultipleWorkspaces.ts
[samples_metricsquery_ts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/metricsQuery.ts

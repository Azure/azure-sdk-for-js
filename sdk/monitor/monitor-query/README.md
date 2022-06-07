# Azure Monitor Query client library for JavaScript

The Azure Monitor Query client library is used to execute read-only queries against [Azure Monitor][azure_monitor_overview]'s two data platforms:

- [Logs](https://docs.microsoft.com/azure/azure-monitor/logs/data-platform-logs) - Collects and organizes log and performance data from monitored resources. Data from different sources such as platform logs from Azure services, log and performance data from virtual machines agents, and usage and performance data from apps can be consolidated into a single [Azure Log Analytics workspace](https://docs.microsoft.com/azure/azure-monitor/logs/data-platform-logs#log-analytics-and-workspaces). The various data types can be analyzed together using the [Kusto Query Language][kusto_query_language].
- [Metrics](https://docs.microsoft.com/azure/azure-monitor/essentials/data-platform-metrics) - Collects numeric data from monitored resources into a time series database. Metrics are numerical values that are collected at regular intervals and describe some aspect of a system at a particular time. Metrics are lightweight and capable of supporting near real-time scenarios, making them particularly useful for alerting and fast detection of issues.

**Resources:**

- [Source code][source]
- [Package (npm)][package]
- [API reference documentation][msdocs_apiref]
- [Service documentation][azure_monitor_overview]
- [Samples][samples]
- [Change log][changelog]

## Getting started

### Supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox

For more details, see our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md).

### Prerequisites

- An [Azure subscription][azure_subscription]
- To query Logs, you need an [Azure Log Analytics workspace][azure_monitor_create_using_portal].
- To query Metrics, you need an Azure resource of any kind (Storage Account, Key Vault, Cosmos DB, etc.).

### Install the package

Install the Azure Monitor Query client library for JavaScript with npm:

```bash
npm install @azure/monitor-query
```

### Create the client

An authenticated client is required to query Logs or Metrics. To authenticate, the following example uses [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential) from the [@azure/identity](https://www.npmjs.com/package/@azure/identity) package.

```ts
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, MetricsQueryClient } from "@azure/monitor-query";

const credential = new DefaultAzureCredential();

const logsQueryClient = new LogsQueryClient(credential);
// or
const metricsQueryClient = new MetricsQueryClient(credential);
```

### Execute the query

For examples of Logs and Metrics queries, see the [Examples](#examples) section.

## Key concepts

### Logs query rate limits and throttling

The Log Analytics service applies throttling when the request rate is too high. Limits, such as the maximum number of rows returned, are also applied on the Kusto queries. For more information, see [Query API](https://docs.microsoft.com/azure/azure-monitor/service-limits#la-query-api).

### Metrics data structure

Each set of metric values is a time series with the following characteristics:

- The time the value was collected
- The resource associated with the value
- A namespace that acts like a category for the metric
- A metric name
- The value itself
- Some metrics may have multiple dimensions as described in multi-dimensional metrics. Custom metrics can have up to 10 dimensions.

## Examples

- [Logs query](#logs-query)
  - [Handle logs query response](#handle-logs-query-response)
- [Batch logs query](#batch-logs-query)
  - [Handle logs batch query response](#handle-logs-batch-query-response)
- [Advanced logs query scenarios](#advanced-logs-query-scenarios)
  - [Set logs query timeout](#set-logs-query-timeout)
  - [Query multiple workspaces](#query-multiple-workspaces)
- [Metrics query](#metrics-query)
  - [Handle metrics query response](#handle-metrics-query-response)
  - [Example of handling response](#example-of-handling-response)

### Logs query

The `LogsQueryClient` can be used to query a Log Analytics workspace using the [Kusto Query Language][kusto_query_language]. The `timespan.duration` can be specified as a string in an ISO 8601 duration format. You can use the `Durations` constants provided for some commonly used ISO 8601 durations.

```ts
import { DefaultAzureCredential } from "@azure/identity";
import { Durations, LogsQueryClient, LogsQueryResultStatus, LogsTable } from "@azure/monitor-query";

const azureLogAnalyticsWorkspaceId = "<the Workspace Id for your Azure Log Analytics resource>";
const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());

async function run() {
  const kustoQuery = "AppEvents | limit 1";
  const result = await logsQueryClient.queryWorkspace(azureLogAnalyticsWorkspaceId, kustoQuery, {
    duration: Durations.twentyFourHours
  });

  if (result.status === LogsQueryResultStatus.Success) {
    const tablesFromResult: LogsTable[] = result.tables;

    if (tablesFromResult.length === 0) {
      console.log(`No results for query '${kustoQuery}'`);
      return;
    }
    console.log(`This query has returned table(s) - `);
    processTables(tablesFromResult);
  } else {
    console.log(`Error processing the query '${kustoQuery}' - ${result.partialError}`);
    if (result.partialTables.length > 0) {
      console.log(`This query has also returned partial data in the following table(s) - `);
      processTables(result.partialTables);
    }
  }
}

async function processTables(tablesFromResult: LogsTable[]) {
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

#### Handle logs query response

The `queryWorkspace` function of `LogsQueryClient` returns a `LogsQueryResult` object. The object type can be `LogsQuerySuccessfulResult` or `LogsQueryPartialResult`. Here's a hierarchy of the response:

```
LogsQuerySuccessfulResult
|---statistics
|---visualization
|---status ("Success")
|---tables (list of `LogsTable` objects)
    |---name
    |---rows
    |---columnDescriptors (list of `LogsColumn` objects)
        |---name
        |---type

LogsQueryPartialResult
|---statistics
|---visualization
|---status ("PartialFailure")
|---partialError
    |--name
    |--code
    |--message
    |--stack
|---partialTables (list of `LogsTable` objects)
    |---name
    |---rows
    |---columnDescriptors (list of `LogsColumn` objects)
        |---name
        |---type
```

For example, to handle a response with tables:

```ts
async function processTables(tablesFromResult: LogsTable[]) {
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
```

A full sample can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/logsQuery.ts).

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

  if (result == null) {
    throw new Error("No response for query");
  }

  let i = 0;
  for (const response of result) {
    console.log(`Results for query with query: ${queriesBatch[i]}`);
    if (response.status === LogsQueryResultStatus.Success) {
      console.log(
        `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
      );
      processTables(response.tables);
    } else if (response.status === LogsQueryResultStatus.PartialFailure) {
      console.log(
        `Printing partial results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
      );
      processTables(response.partialTables);
      console.log(
        ` Query had errors:${response.partialError.message} with code ${response.partialError.code}`
      );
    } else {
      console.log(`Printing errors from query '${queriesBatch[i].query}'`);
      console.log(` Query had errors:${response.message} with code ${response.code}`);
    }
    // next query
    i++;
  }
}

async function processTables(tablesFromResult: LogsTable[]) {
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
```

#### Handle logs batch query response

The `queryBatch` function of `LogsQueryClient` returns a `LogsQueryBatchResult` object. `LogsQueryBatchResult` contains a list of objects with the following possible types:

- `LogsQueryPartialResult`
- `LogsQuerySuccessfulResult`
- `LogsQueryError`

Here's a hierarchy of the response:

```

LogsQuerySuccessfulResult
|---statistics
|---visualization
|---status ("Success")
|---tables (list of `LogsTable` objects)
    |---name
    |---rows
    |---columnDescriptors (list of `LogsColumn` objects)
        |---name
        |---type

LogsQueryPartialResult
|---statistics
|---visualization
|---status ("PartialFailure")
|---partialError
    |--name
    |--code
    |--message
    |--stack
|---partialTables (list of `LogsTable` objects)
    |---name
    |---rows
    |---columnDescriptors (list of `LogsColumn` objects)
        |---name
        |---type

LogsQueryError
|--name
|--code
|--message
|--stack
|--status ("Failure")
```

For example, the following code handles a batch logs query response:

```ts
async function processBatchResult(result: LogsQueryBatchResult) {
  let i = 0;
  for (const response of result) {
    console.log(`Results for query with query: ${queriesBatch[i]}`);
    if (response.status === LogsQueryResultStatus.Success) {
      console.log(
        `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
      );
      processTables(response.tables);
    } else if (response.status === LogsQueryResultStatus.PartialFailure) {
      console.log(
        `Printing partial results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`
      );
      processTables(response.partialTables);
      console.log(
        ` Query had errors:${response.partialError.message} with code ${response.partialError.code}`
      );
    } else {
      console.log(`Printing errors from query '${queriesBatch[i].query}'`);
      console.log(` Query had errors:${response.message} with code ${response.code}`);
    }
    // next query
    i++;
  }
}

async function processTables(tablesFromResult: LogsTable[]) {
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
```

A full sample can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/logsQueryBatch.ts).

For information on request throttling at the Log Analytics service level, see [Rate limits](https://dev.loganalytics.io/documentation/Using-the-API/Limits).

### Advanced logs query scenarios

#### Set logs query timeout

Some logs queries take longer than 3 minutes to execute. The default server timeout is 3 minutes. You can increase the server timeout to a maximum of 10 minutes. In the following example, the `LogsQueryOptions` object's `serverTimeoutInSeconds` property is used to decrease the server timeout to 1 minute:

```ts
// setting optional parameters
const queryLogsOptions: LogsQueryOptions = {
  // explicitly control the amount of time the server can spend processing the query.
  serverTimeoutInSeconds: 60
};

const result = await logsQueryClient.queryWorkspace(
  azureLogAnalyticsWorkspaceId,
  kustoQuery,
  { duration: Durations.twentyFourHours },
  queryLogsOptions
);

const tablesFromResult = result.tables;
```

#### Query multiple workspaces

The same logs query can be executed across multiple Log Analytics workspaces. In addition to the Kusto query, the following parameters are required:

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
const result = await logsQueryClient.queryWorkspace(
  azureLogAnalyticsWorkspaceId,
  kustoQuery,
  { duration: Durations.twentyFourHours },
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

A full sample can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/logsQueryMultipleWorkspaces.ts).

#### Include statistics

To get logs query execution statistics, such as CPU and memory consumption:

1. Set the `LogsQueryOptions.includeQueryStatistics` property to `true`.
1. Access the `statistics` field inside the `LogsQueryResult` object.

The following example prints the query execution time:

```ts
const workspaceId = "<workspace_id>";
const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());
const kustoQuery = "AzureActivity | top 10 by TimeGenerated";

const result = await logsQueryClient.queryWorkspace(
    monitorWorkspaceId,
    kustoQuery,
    { duration: Durations.oneDay },
    {
      includeQueryStatistics: true
    }
  );

const executionTime =
    result.statistics && result.statistics.query && result.statistics.query.executionTime;

console.log(
    `Results for query '${kustoQuery}', execution time: ${
      executionTime == null ? "unknown" : executionTime
    }`
  );
```

Because the structure of the `statistics` payload varies by query, a `Record<string, unknown>` return type is used. It contains the raw JSON response. The statistics are found within the `query` property of the JSON. For example:

```json
{
  "query": {
    "executionTime": 0.0156478,
    "resourceUsage": {...},
    "inputDatasetStatistics": {...},
    "datasetStatistics": [{...}]
  }
}
```

#### Include visualization

To get visualization data for logs queries using the [render operator](https://docs.microsoft.com/azure/data-explorer/kusto/query/renderoperator?pivots=azuremonitor):

1. Set the `LogsQueryOptions.includeVisualization` property to `true`.
1. Access the `visualization` field inside the `LogsQueryResult` object.

For example:

```ts
const workspaceId = "<workspace_id>";
const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());

const result = await logsQueryClient.queryWorkspace(
    monitorWorkspaceId,
    @"StormEvents
        | summarize event_count = count() by State
        | where event_count > 10
        | project State, event_count
        | render columnchart",
    { duration: Durations.oneDay },
    {
      includeVisualization: true
    }
  );
console.log("visualization result:", result.visualization);
```

Because the structure of the `visualization` payload varies by query, a `Record<string, unknown>` return type is used. It contains the raw JSON response. For example:

```json
{
  "visualization": "columnchart",
  "title": "the chart title",
  "accumulate": false,
  "isQuerySorted": false,
  "kind": null,
  "legend": null,
  "series": null,
  "yMin": "NaN",
  "yMax": "NaN",
  "xAxis": null,
  "xColumn": null,
  "xTitle": "x axis title",
  "yAxis": null,
  "yColumns": null,
  "ySplit": null,
  "yTitle": null,
  "anomalyColumns": null
}
```

### Metrics query

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
    const metricsResponse = await metricsQueryClient.queryResource(
      metricsResourceId,
      [firstMetricName, secondMetricName],
      {
        granularity: "PT1M",
        timespan: { duration: Durations.fiveMinutes }
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

In the preceding sample, metric results in `metricsResponse` are ordered according to the order in which the user specifies the metric names in the `metricNames` array argument for the `queryResource` function. If the user specifies `[firstMetricName, secondMetricName]`, the result for `firstMetricName` will appear before the result for `secondMetricName` in the `metricResponse`.

#### Handle metrics query response

The metrics `queryResource` function returns a `QueryMetricsResult` object. The `QueryMetricsResult` object contains properties such as a list of `Metric`-typed objects, `interval`, `namespace`, and `timespan`. The `Metric` objects list can be accessed using the `metrics` property. Each `Metric` object in this list contains a list of `TimeSeriesElement` objects. Each `TimeSeriesElement` contains `data` and `metadataValues` properties. In visual form, the object hierarchy of the response resembles the following structure:

```
QueryMetricsResult
|---cost
|---timespan (of type `QueryTimeInterval`)
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
    throw new Error(
      "METRICS_RESOURCE_ID for an Azure Metrics Advisor subscription must be set in the environment for this sample"
    );
  }

  console.log(`Picking an example metric to query: MatchedEventCount`);

  const metricsResponse = await metricsQueryClient.queryResource(
    metricsResourceId,
    ["MatchedEventCount"],
    {
      timespan: {
        duration: Durations.fiveMinutes
      },
      granularity: "PT1M",
      aggregations: ["Count"]
    }
  );

  console.log(
    `Query cost: ${metricsResponse.cost}, granularity: ${metricsResponse.granularity}, time span: ${metricsResponse.timespan}`
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

A full sample can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/metricsQuery.ts).

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. To see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For detailed instructions on how to enable logs, see the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

To learn more about Azure Monitor, see the [Azure Monitor service documentation][azure_monitor_overview].

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure Monitor instance. To execute the tests, you'll need to run:

1. `rush update`
2. `rush build -t @azure/monitor-query`
3. `cd into sdk/monitor/monitor-query`
4. Copy the `sample.env` file to `.env`
5. Open the `.env` file in an editor and fill in the values.
6. `npm run test`.

For more details, view our [tests](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/test) folder.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure Monitor][azure_monitor_overview]

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmonitor%2Fmonitor-query%2FREADME.png)

[azure_monitor_create_using_portal]: https://docs.microsoft.com/azure/azure-monitor/logs/quick-create-workspace
[azure_monitor_overview]: https://docs.microsoft.com/azure/azure-monitor/overview
[azure_subscription]: https://azure.microsoft.com/free/
[changelog]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/CHANGELOG.md
[kusto_query_language]: https://docs.microsoft.com/azure/data-explorer/kusto/query/
[msdocs_apiref]: https://docs.microsoft.com/javascript/api/@azure/monitor-query
[package]: https://www.npmjs.com/package/@azure/monitor-query
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-query/samples
[source]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/

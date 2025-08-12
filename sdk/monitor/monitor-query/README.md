## Deprecated ⚠️: This package has been deprecated and is no longer under active development. Please migrate to the following packages:
>
> - `LogsQueryClient`: `@azure/monitor-query-logs` - migration guide: [Monitor Query Logs migration](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-logs/MIGRATION.md) • npm: [@azure/monitor-query-logs](https://www.npmjs.com/package/@azure/monitor-query-logs)
> - `MetricsClient`: `@azure/monitor-query-metrics` - migration guide: [Monitor Query Metrics migration](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-metrics/MIGRATION.md) • npm: [@azure/monitor-query-metrics](https://www.npmjs.com/package/@azure/monitor-query-metrics)
> - `MetricsQueryClient`: migrate to the management library `@azure/arm-monitor` - guide: [MetricsQueryClient → @azure/arm-monitor](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitor/MIGRATION_METRICSQUERYCLIENT_TO_ARM_MONITOR.md)
>
> New features and non-security bug fixes will be added to the replacement libraries listed above.

The Azure Monitor Query client library is used to execute read-only queries against [Azure Monitor][azure_monitor_overview]'s two data platforms:

- [Logs](https://learn.microsoft.com/azure/azure-monitor/logs/data-platform-logs) - Collects and organizes log and performance data from monitored resources. Data from different sources such as platform logs from Azure services, log and performance data from virtual machines agents, and usage and performance data from apps can be consolidated into a single [Azure Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/data-platform-logs#log-analytics-and-workspaces). The various data types can be analyzed together using the [Kusto Query Language][kusto_query_language].
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
- To query Logs, you need one of the following things:
  - An [Azure Log Analytics workspace][azure_monitor_create_using_portal]
  - An Azure resource of any kind (Storage Account, Key Vault, Cosmos DB, etc.)
- To query Metrics, you need an Azure resource of any kind (Storage Account, Key Vault, Cosmos DB, etc.).

### Install the package

Install the Azure Monitor Query client library for JavaScript with npm:

```bash
npm install --save @azure/monitor-query
```

### Create the client

An authenticated client is required to query Logs or Metrics. To authenticate, the following example uses [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential) from the [@azure/identity](https://www.npmjs.com/package/@azure/identity) package.

```ts snippet:ReadmeSampleCreateClient
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, MetricsQueryClient, MetricsClient } from "@azure/monitor-query";

const credential = new DefaultAzureCredential();

// Create a LogsQueryClient
const logsQueryClient = new LogsQueryClient(credential);

// Create a MetricsQueryClient
const metricsQueryClient = new MetricsQueryClient(credential);

// Create a MetricsClient
const endpoint = " https://<endpoint>.monitor.azure.com/";
const metricsClient = new MetricsClient(endpoint, credential);
```

#### Configure client for Azure sovereign cloud

By default, the library's clients are configured to use the Azure Public Cloud. To use a sovereign cloud instead, provide the correct endpoint and audience value when instantiating a client. For example:

```ts snippet:ReadmeSampleCreateClientSovereign
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, MetricsQueryClient, MetricsClient } from "@azure/monitor-query";

const credential = new DefaultAzureCredential();

// Create a LogsQueryClient
const logsQueryClient: LogsQueryClient = new LogsQueryClient(credential, {
  endpoint: "https://api.loganalytics.azure.cn/v1",
  audience: "https://api.loganalytics.azure.cn/.default",
});

// Create a MetricsQueryClient
const metricsQueryClient: MetricsQueryClient = new MetricsQueryClient(credential, {
  endpoint: "https://management.chinacloudapi.cn",
  audience: "https://monitor.azure.cn/.default",
});

// Create a MetricsClient
const endpoint = " https://<endpoint>.monitor.azure.cn/";
const metricsClient = new MetricsClient(endpoint, credential, {
  audience: "https://monitor.azure.cn/.default",
});
```

**Note**: Currently, `MetricsQueryClient` uses the Azure Resource Manager (ARM) endpoint for querying metrics. You need the corresponding management endpoint for your cloud when using this client. This detail is subject to change in the future.

### Execute the query

For examples of Logs and Metrics queries, see the [Examples](#examples) section.

## Key concepts

### Logs query rate limits and throttling

The Log Analytics service applies throttling when the request rate is too high. Limits, such as the maximum number of rows returned, are also applied on the Kusto queries. For more information, see [Query API](https://learn.microsoft.com/azure/azure-monitor/service-limits#la-query-api).

### Metrics data structure

Each set of metric values is a time series with the following characteristics:

- The time the value was collected
- The resource associated with the value
- A namespace that acts like a category for the metric
- A metric name
- The value itself
- Some metrics have multiple dimensions as described in multi-dimensional metrics. Custom metrics can have up to 10 dimensions.

## Examples

- [Logs query](#logs-query)
  - [Workspace-centric logs query](#workspace-centric-logs-query)
  - [Resource-centric logs query](#resource-centric-logs-query)
  - [Handle logs query response](#handle-logs-query-response)
- [Batch logs query](#batch-logs-query)
  - [Handle logs batch query response](#handle-logs-batch-query-response)
- [Advanced logs query scenarios](#advanced-logs-query-scenarios)
  - [Set logs query timeout](#set-logs-query-timeout)
  - [Query multiple workspaces](#query-multiple-workspaces)
  - [Include statistics](#include-statistics)
  - [Include visualization](#include-visualization)
- [Metrics query](#metrics-query)
  - [Handle metrics query response](#handle-metrics-query-response)
  - [Example of handling response](#example-of-handling-response)
  - [Query metrics for multiple resources](#query-metrics-for-multiple-resources)

### Logs query

The `LogsQueryClient` can be used to query a Log Analytics workspace using the [Kusto Query Language][kusto_query_language]. The `timespan.duration` can be specified as a string in an ISO 8601 duration format. You can use the `Durations` constants provided for some commonly used ISO 8601 durations.

You can query logs by Log Analytics workspace ID or Azure resource ID. The result is returned as a table with a collection of rows.

#### Workspace-centric logs query

To query by workspace ID, use the `LogsQueryClient.queryWorkspace` method:

```ts snippet:ReadmeSampleLogsQuery
import { LogsQueryClient, Durations, LogsQueryResultStatus } from "@azure/monitor-query";
import { DefaultAzureCredential } from "@azure/identity";

const azureLogAnalyticsWorkspaceId = "<workspace_id>";
const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());

const kustoQuery = "AppEvents | limit 1";
const result = await logsQueryClient.queryWorkspace(azureLogAnalyticsWorkspaceId, kustoQuery, {
  duration: Durations.twentyFourHours,
});

if (result.status === LogsQueryResultStatus.Success) {
  const tablesFromResult = result.tables;

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

function processTables(tablesFromResult) {
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

#### Resource-centric logs query

The following example demonstrates how to query logs directly from an Azure resource. Here, the `queryResource` method is used and an Azure resource ID is passed in. For example, `/subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/{resource-provider}/{resource-type}/{resource-name}`.

To find the resource ID:

1. Navigate to your resource's page in the Azure portal.
2. From the **Overview** blade, select the **JSON View** link.
3. In the resulting JSON, copy the value of the `id` property.

```ts snippet:ReadmeSampleLogsQueryResource
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, Durations, LogsQueryResultStatus } from "@azure/monitor-query";

const logsResourceId = "<the Resource Id for your logs resource>";

const tokenCredential = new DefaultAzureCredential();
const logsQueryClient = new LogsQueryClient(tokenCredential);

const kustoQuery = `MyTable_CL | summarize count()`;

console.log(`Running '${kustoQuery}' over the last One Hour`);
const queryLogsOptions = {
  // explicitly control the amount of time the server can spend processing the query.
  serverTimeoutInSeconds: 600, // sets the timeout to 10 minutes
  // optionally enable returning additional statistics about the query's execution.
  // (by default, this is off)
  includeQueryStatistics: true,
};

const result = await logsQueryClient.queryResource(
  logsResourceId,
  kustoQuery,
  { duration: Durations.sevenDays },
  queryLogsOptions,
);

const executionTime = (result as any)?.statistics?.query?.executionTime;

console.log(
  `Results for query '${kustoQuery}', execution time: ${executionTime == null ? "unknown" : executionTime}`,
);

if (result.status === LogsQueryResultStatus.Success) {
  const tablesFromResult = result.tables;

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

function processTables(tablesFromResult) {
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

```ts snippet:ReadmeSampleProcessTables
function processTables(tablesFromResult) {
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

```ts snippet:ReadmeSampleLogsQueryBatch
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, LogsQueryResultStatus } from "@azure/monitor-query";

const monitorWorkspaceId = "<workspace_id>";

const tokenCredential = new DefaultAzureCredential();
const logsQueryClient = new LogsQueryClient(tokenCredential);

const kqlQuery = "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1";
const queriesBatch = [
  {
    workspaceId: monitorWorkspaceId,
    query: kqlQuery,
    timespan: { duration: "P1D" },
  },
  {
    workspaceId: monitorWorkspaceId,
    query: "AzureActivity | summarize count()",
    timespan: { duration: "PT1H" },
  },
  {
    workspaceId: monitorWorkspaceId,
    query:
      "AppRequests | take 10 | summarize avgRequestDuration=avg(DurationMs) by bin(TimeGenerated, 10m), _ResourceId",
    timespan: { duration: "PT1H" },
  },
  {
    workspaceId: monitorWorkspaceId,
    query: "AppRequests | take 2",
    timespan: { duration: "PT1H" },
    includeQueryStatistics: true,
  },
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
      `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`,
    );
    processTables(response.tables);
  } else if (response.status === LogsQueryResultStatus.PartialFailure) {
    console.log(
      `Printing partial results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`,
    );
    processTables(response.partialTables);
    console.log(
      ` Query had errors:${response.partialError.message} with code ${response.partialError.code}`,
    );
  } else {
    console.log(`Printing errors from query '${queriesBatch[i].query}'`);
    console.log(` Query had errors:${response.message} with code ${response.code}`);
  }
  // next query
  i++;
}

function processTables(tablesFromResult) {
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

```ts snippet:ReadmeSampleProcessBatchResult
import { LogsQueryResultStatus } from "@azure/monitor-query";

async function processBatchResult(result, queriesBatch) {
  let i = 0;
  for (const response of result) {
    console.log(`Results for query with query: ${queriesBatch[i]}`);
    if (response.status === LogsQueryResultStatus.Success) {
      console.log(
        `Printing results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`,
      );
      processTables(response.tables);
    } else if (response.status === LogsQueryResultStatus.PartialFailure) {
      console.log(
        `Printing partial results from query '${queriesBatch[i].query}' for '${queriesBatch[i].timespan}'`,
      );
      processTables(response.partialTables);
      console.log(
        ` Query had errors:${response.partialError.message} with code ${response.partialError.code}`,
      );
    } else {
      console.log(`Printing errors from query '${queriesBatch[i].query}'`);
      console.log(` Query had errors:${response.message} with code ${response.code}`);
    }
    // next query
    i++;
  }
}

function processTables(tablesFromResult) {
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

### Advanced logs query scenarios

#### Set logs query timeout

Some logs queries take longer than 3 minutes to execute. The default server timeout is 3 minutes. You can increase the server timeout to a maximum of 10 minutes. In the following example, the `LogsQueryOptions` object's `serverTimeoutInSeconds` property is used to increase the server timeout to 10 minutes:

```ts snippet:ReadmeSampleLogsQueryTimeout
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, Durations } from "@azure/monitor-query";

const azureLogAnalyticsWorkspaceId = "<workspace_id>";

const tokenCredential = new DefaultAzureCredential();
const logsQueryClient = new LogsQueryClient(tokenCredential);

const kqlQuery = "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1";

// setting optional parameters
const queryLogsOptions = {
  // explicitly control the amount of time the server can spend processing the query.
  serverTimeoutInSeconds: 600, // 600 seconds = 10 minutes
};

const result = await logsQueryClient.queryWorkspace(
  azureLogAnalyticsWorkspaceId,
  kqlQuery,
  { duration: Durations.twentyFourHours },
  queryLogsOptions,
);

const status = result.status;
```

#### Query multiple workspaces

The same logs query can be executed across multiple Log Analytics workspaces. In addition to the Kusto query, the following parameters are required:

- `workspaceId` - The first (primary) workspace ID.
- `additionalWorkspaces` - A list of workspaces, excluding the workspace provided in the `workspaceId` parameter. The parameter's list items can consist of the following identifier formats:
  - Qualified workspace names
  - Workspace IDs
  - Azure resource IDs

For example, the following query executes in three workspaces:

```ts snippet:ReadmeSampleLogsQueryMultipleWorkspaces
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, Durations } from "@azure/monitor-query";

const azureLogAnalyticsWorkspaceId = "<workspace_id>";

const tokenCredential = new DefaultAzureCredential();
const logsQueryClient = new LogsQueryClient(tokenCredential);

const kqlQuery = "AppEvents | project TimeGenerated, Name, AppRoleInstance | limit 1";

// setting optional parameters
const queryLogsOptions = {
  additionalWorkspaces: ["<workspace2>", "<workspace3>"],
};

const result = await logsQueryClient.queryWorkspace(
  azureLogAnalyticsWorkspaceId,
  kqlQuery,
  { duration: Durations.twentyFourHours },
  queryLogsOptions,
);

const status = result.status;
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

```ts snippet:ReadmeSampleLogsQueryStatistics
import { LogsQueryClient, Durations } from "@azure/monitor-query";
import { DefaultAzureCredential } from "@azure/identity";

const monitorWorkspaceId = "<workspace_id>";
const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());
const kustoQuery = "AzureActivity | top 10 by TimeGenerated";

const result = await logsQueryClient.queryWorkspace(
  monitorWorkspaceId,
  kustoQuery,
  { duration: Durations.oneDay },
  {
    includeQueryStatistics: true,
  },
);

const executionTime = (result as any)?.statistics?.query?.executionTime;

console.log(
  `Results for query '${kustoQuery}', execution time: ${executionTime == null ? "unknown" : executionTime}`,
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

To get visualization data for logs queries using the [render operator](https://learn.microsoft.com/azure/data-explorer/kusto/query/renderoperator?pivots=azuremonitor):

1. Set the `LogsQueryOptions.includeVisualization` property to `true`.
1. Access the `visualization` field inside the `LogsQueryResult` object.

For example:

```ts snippet:ReadmeSampleLogsQueryVisualization
import { LogsQueryClient, Durations } from "@azure/monitor-query";
import { DefaultAzureCredential } from "@azure/identity";

const monitorWorkspaceId = "<workspace_id>";
const logsQueryClient = new LogsQueryClient(new DefaultAzureCredential());

const result = await logsQueryClient.queryWorkspace(
  monitorWorkspaceId,
  `StormEvents
        | summarize event_count = count() by State
        | where event_count > 10
        | project State, event_count
        | render columnchart`,
  { duration: Durations.oneDay },
  {
    includeVisualization: true,
  },
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

The following example gets metrics for an [Azure Metrics Advisor](https://learn.microsoft.com/azure/applied-ai-services/metrics-advisor/overview) subscription.
The resource URI must be that of the resource for which metrics are being queried. It's normally of the format `/subscriptions/<id>/resourceGroups/<rg-name>/providers/<source>/topics/<resource-name>`.

To find the resource URI:

1. Navigate to your resource's page in the Azure portal.
2. From the **Overview** blade, select the **JSON View** link.
3. In the resulting JSON, copy the value of the `id` property.

```ts snippet:ReadmeSampleMetricsQuery
import { DefaultAzureCredential } from "@azure/identity";
import { MetricsQueryClient, Durations } from "@azure/monitor-query";

const metricsResourceId = "<the Resource Id for your metrics resource>";

const tokenCredential = new DefaultAzureCredential();
const metricsQueryClient = new MetricsQueryClient(tokenCredential);

const metricNames = [];
const metricDefinitions = metricsQueryClient.listMetricDefinitions(metricsResourceId);
for await (const { id, name } of metricDefinitions) {
  console.log(` metricDefinitions - ${id}, ${name}`);
  if (name) {
    metricNames.push(name);
  }
}

const [firstMetricName, secondMetricName] = metricNames;
if (firstMetricName && secondMetricName) {
  console.log(`Picking an example metric to query: ${firstMetricName} and ${secondMetricName}`);
  const metricsResponse = await metricsQueryClient.queryResource(
    metricsResourceId,
    [firstMetricName, secondMetricName],
    {
      granularity: "PT1M",
      timespan: { duration: Durations.fiveMinutes },
    },
  );

  console.log(
    `Query cost: ${metricsResponse.cost}, interval: ${metricsResponse.granularity}, time span: ${metricsResponse.timespan}`,
  );

  const metrics = metricsResponse.metrics;
  console.log(`Metrics:`, JSON.stringify(metrics, undefined, 2));
  const metric = metricsResponse.getMetricByName(firstMetricName);
  console.log(`Selected Metric: ${firstMetricName}`, JSON.stringify(metric, undefined, 2));
} else {
  console.error(`Metric names are not defined - ${firstMetricName} and ${secondMetricName}`);
}
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

```ts snippet:ReadmeSampleProcessMetricsResponse
import { DefaultAzureCredential } from "@azure/identity";
import { MetricsQueryClient, Durations } from "@azure/monitor-query";

const metricsResourceId = "<the Resource Id for your metrics resource>";

const tokenCredential = new DefaultAzureCredential();
const metricsQueryClient = new MetricsQueryClient(tokenCredential);

console.log(`Picking an example metric to query: MatchedEventCount`);

const metricsResponse = await metricsQueryClient.queryResource(
  metricsResourceId,
  ["MatchedEventCount"],
  {
    timespan: {
      duration: Durations.fiveMinutes,
    },
    granularity: "PT1M",
    aggregations: ["Count"],
  },
);

console.log(
  `Query cost: ${metricsResponse.cost}, granularity: ${metricsResponse.granularity}, time span: ${metricsResponse.timespan}`,
);

const metrics = metricsResponse.metrics;
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
```

A full sample can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/samples/v1/typescript/src/metricsQuery.ts).

#### Query metrics for multiple resources

To query metrics for multiple Azure resources in a single request, use the `MetricsClient.queryResources` method. This method:

- Calls a different API than the `MetricsClient` methods.
- Requires a regional endpoint when creating the client. For example, "https://westus3.metrics.monitor.azure.com".

Each Azure resource must reside in:

- The same region as the endpoint specified when creating the client.
- The same Azure subscription.

Furthermore:

- The user must be authorized to read monitoring data at the Azure subscription level. For example, the [Monitoring Reader role](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/monitor#monitoring-reader) on the subscription to be queried.
- The metric namespace containing the metrics to be queried must be provided. For a list of metric namespaces, see [Supported metrics and log categories by resource type][metric_namespaces].

```ts snippet:ReadmeSampleMetricsQueryMultipleResources
import { DefaultAzureCredential } from "@azure/identity";
import { MetricsClient } from "@azure/monitor-query";

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

To diagnose various failure scenarios, see the [troubleshooting guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/TROUBLESHOOTING.md).

## Next steps

To learn more about Azure Monitor, see the [Azure Monitor service documentation][azure_monitor_overview].

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure Monitor instance. To execute the tests, you'll need to run:

1. `pnpm install`
2. `pnpm build --filter @azure/monitor-query...`
3. `cd into sdk/monitor/monitor-query`
4. Copy the `sample.env` file to `.env`
5. Open the `.env` file in an editor and fill in the values.
6. `npm run test`.

For more details, view our [tests](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/test) folder.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)
- [Azure Monitor][azure_monitor_overview]

[azure_monitor_create_using_portal]: https://learn.microsoft.com/azure/azure-monitor/logs/quick-create-workspace
[azure_monitor_overview]: https://learn.microsoft.com/azure/azure-monitor/overview
[azure_subscription]: https://azure.microsoft.com/free/
[changelog]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/CHANGELOG.md
[kusto_query_language]: https://learn.microsoft.com/azure/data-explorer/kusto/query/
[metric_namespaces]: https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/metrics-index#supported-metrics-and-log-categories-by-resource-type
[msdocs_apiref]: https://learn.microsoft.com/javascript/api/@azure/monitor-query
[package]: https://www.npmjs.com/package/@azure/monitor-query
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-query/samples
[source]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/

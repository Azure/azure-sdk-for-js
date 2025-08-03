# Azure Monitor Query Logs client library for JavaScript

The Azure Monitor Query Logs client library is used to execute read-only queries against [Azure Monitor][azure_monitor_overview]'s Logs data platform:

- [Logs](https://learn.microsoft.com/azure/azure-monitor/logs/data-platform-logs) - Collects and organizes log and performance data from monitored resources. Data from different sources such as platform logs from Azure services, log and performance data from virtual machines agents, and usage and performance data from apps can be consolidated into a single [Azure Log Analytics workspace](https://learn.microsoft.com/azure/azure-monitor/logs/data-platform-logs#log-analytics-and-workspaces). The various data types can be analyzed together using the [Kusto Query Language][kusto_query_language].

#### Migrating from @azure/monitor-query advisory ⚠️

Checkout the [Migration Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-logs/MIGRATION.md) for detailed instructions on how to update your application code from the original `@azure/monitor-query` package to the `@azure/monitor-query-logs` library.

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

### Install the package

Install the Azure Monitor Query client library for JavaScript with npm:

```bash
npm install --save @azure/monitor-query-logs
```

### Create the client

An authenticated client is required to query Logs. To authenticate, the following example uses [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential) from the [@azure/identity](https://www.npmjs.com/package/@azure/identity) package.

```ts snippet:ReadmeSampleCreateClient
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient } from "@azure/monitor-query-logs";

const credential = new DefaultAzureCredential();

// Create a LogsQueryClient
const logsQueryClient = new LogsQueryClient(credential);
```

#### Configure client for Azure sovereign cloud

By default, the library's clients are configured to use the Azure Public Cloud. To use a sovereign cloud instead, provide the correct endpoint and audience value when instantiating a client. For example:

```ts snippet:ReadmeSampleCreateClientSovereign
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient } from "@azure/monitor-query-logs";

const credential = new DefaultAzureCredential();

// Create a LogsQueryClient
const logsQueryClient: LogsQueryClient = new LogsQueryClient(credential, {
  endpoint: "https://api.loganalytics.azure.cn/v1",
  audience: "https://api.loganalytics.azure.cn/.default",
});
```

### Execute the query

For examples of Logs queries, see the [Examples](#examples) section.

## Key concepts

### Logs query rate limits and throttling

The Log Analytics service applies throttling when the request rate is too high. Limits, such as the maximum number of rows returned, are also applied on the Kusto queries. For more information, see [Query API](https://learn.microsoft.com/azure/azure-monitor/service-limits#la-query-api).

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

### Logs query

The `LogsQueryClient` can be used to query a Log Analytics workspace using the [Kusto Query Language][kusto_query_language]. The `timespan.duration` can be specified as a string in an ISO 8601 duration format. You can use the `Durations` constants provided for some commonly used ISO 8601 durations.

You can query logs by Log Analytics workspace ID or Azure resource ID. The result is returned as a table with a collection of rows.

#### Workspace-centric logs query

To query by workspace ID, use the `LogsQueryClient.queryWorkspace` method:

```ts snippet:ReadmeSampleLogsQuery
import { LogsQueryClient, Durations, LogsQueryResultStatus } from "@azure/monitor-query-logs";
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
```

#### Resource-centric logs query

The following example demonstrates how to query logs directly from an Azure resource. Here, the `queryResource` method is used and an Azure resource ID is passed in. For example, `/subscriptions/{subscription-id}/resourceGroups/{resource-group-name}/providers/{resource-provider}/{resource-type}/{resource-name}`.

To find the resource ID:

1. Navigate to your resource's page in the Azure portal.
2. From the **Overview** blade, select the **JSON View** link.
3. In the resulting JSON, copy the value of the `id` property.

```ts snippet:ReadmeSampleLogsQueryResource
import { DefaultAzureCredential } from "@azure/identity";
import { LogsQueryClient, Durations, LogsQueryResultStatus } from "@azure/monitor-query-logs";

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

console.log(`Results for query '${kustoQuery}'`);

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
import { LogsQueryClient, LogsQueryResultStatus } from "@azure/monitor-query-logs";

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
import { LogsQueryResultStatus } from "@azure/monitor-query-logs";

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
import { LogsQueryClient, Durations } from "@azure/monitor-query-logs";

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
import { LogsQueryClient, Durations } from "@azure/monitor-query-logs";

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
import { LogsQueryClient, Durations } from "@azure/monitor-query-logs";
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

console.log(`Results for query '${kustoQuery}'`);
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
import { LogsQueryClient, Durations } from "@azure/monitor-query-logs";
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

## Troubleshooting

To diagnose various failure scenarios, see the [troubleshooting guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query-logs/TROUBLESHOOTING.md).

## Next steps

To learn more about Azure Monitor, see the [Azure Monitor service documentation][azure_monitor_overview].

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure Monitor instance. To execute the tests, you'll need to run:

1. `rush update`
2. `rush build -t @azure/monitor-query-logs`
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
[msdocs_apiref]: https://learn.microsoft.com/javascript/api/@azure/monitor-query
[package]: https://www.npmjs.com/package/@azure/monitor-query-logs
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-query/samples
[source]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-query/

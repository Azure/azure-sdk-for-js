# Azure Monitor Workspace query client library for JavaScript

[Azure Monitor](https://docs.microsoft.com/azure/azure-monitor/overview) is a comprehensive solution for collecting, analyzing, and acting on telemetry from your cloud and on-premises environments.

Use the client library for Azure Monitor to:

- Query logs using the [Kusto query language][kusto_query_language]
- Query metrics

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/monitor/monitor-query/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/monitor-query) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/monitor-query) |
[Product documentation][azure_monitor_product_documentation]
[Samples][samples]

## Getting started

### Install the package

```bash
npm install @azure/monitor-query
```

### Prerequisites

- You must have an [Azure Subscription](https://azure.microsoft.com) and an [Azure Monitor][azure_monitor_product_documentation] resource to use this package.
- Node.js version 10.x.x or higher

### Create an Azure Monitor resource

You can use the [Azure Portal][azure_monitor_create_using_portal] or the [Azure CLI][azure_monitor_create_using_cli] to create an Azure Monitor resource.

Instructions:

- [Using the Azure Portal][azure_monitor_create_using_portal]
- [Using the Azure CLI][azure_monitor_create_using_cli]

### Authenticate the client

[LogsClient][msdocs_logs_client] and [MetricsClient][msdocs_metrics_client] authenticate using a [service principal](#authenticating-with-a-service-principal).

#### Authenticating with a service principal

Authentication via service principal is done by:

- Creating a credential using the `@azure/identity` package.
- Setting appropriate RBAC rules on your Azure Monitor resource.
  More information on Azure Monitor roles can be found [here][azure_monitor_roles].

Using [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md#defaultazurecredential)

```javascript
const azureIdentity = require("@azure/identity");
const monitorQuery = require("@azure/monitor-query");

const credential = new azureIdentity.DefaultAzureCredential();

const logsClient = new monitorQuery.LogClient(credential);
// or
const metricsClient = new monitorQuery.MetricsClient(credential);
```

More information about `@azure/identity` can be found [here](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md)

## Key concepts

The [`LogsClient`](msdocs_logs_client) allows you to query logs, using the [Kusto query language][kusto_query_language]. This data can be queried in the
portal using tables like `AppEvents`, `AppDependencies` and others.

The [`MetricsClient`][msdocs_metrics_client] allows you to query metrics.

## Examples

#### Querying logs

The LogsClient can be used to query a Monitor workspace using the Kusto Query language.

```javascript
const monitorQuery = require("@azure/monitor-query");
const { DefaultAzureCredential } = require("@azure/identity");

const azureLogAnalyticsWorkspaceId = "<the Workspace Id for your Azure Log Analytics resource>";
const logsClient = new monitorQuery.LogsClient(new DefaultAzureCredential());

async function run() {
  const kustoQuery = "AppEvents | limit 1";
  const result = logsClient.queryLogs(azureLogAnalyticsWorkspaceId, kustoQuery);
  const tablesFromResult: Table[] | undefined = result.tables;

  if (tablesFromResult == null) {
    console.log(`No results for query '${kustoQuery}'`);
    return;
  }

  console.log(`Results for query '${kustoQuery}'`);

  for (const table of tablesFromResult) {
    const columnHeaderString = table.columns
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

For more samples see here: [samples][samples].

## Next steps

The following samples show you the various ways you can query your Log Analytics workspace:

- [`logsQuery.ts`][samples_logsquery_ts] - Query logs in a Monitor workspace
- [`logsQueryBatchSample.ts`][samples_logquerybatch_ts] - Run multiple queries, simultaneously, with a batch in a Monitor workspace
- [`metricsQuerySample.ts`][samples_metricsquery_ts] - Query metrics in a Monitor workspace

More in-depth examples can be found in the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples/v1/) folder on GitHub.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

This module's tests are a mixture of live and unit tests, which require you to have an Azure Monitor instance. To execute the tests you'll need to run:

1. `rush update`
2. `rush build -t @azure/monitor-query`
3. `cd into sdk/monitor/monitor-query`
4. Copy the `sample.env` file to `.env`
5. Open the `.env` file in an editor and fill in the values.
6. `npm run test`.

View our [tests](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/monitor/monitor-query/test)
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
[msdocs_metrics_client]: https://docs.microsoft.com/javascript/api/@azure/monitor-query/metricsclient
[msdocs_logs_client]: https://docs.microsoft.com/javascript/api/@azure/monitor-query/logsclient
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples
[samples_logsquery_ts]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples/v1/typescript/src/logQuery.ts
[samples_logquerybatch_ts]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples/v1/typescript/src/logQueryBatch.ts
[samples_metricsquery_ts]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples/v1/typescript/src/metricsQuery.ts

# Azure Monitor Workspace query client library for JavaScript

[Azure Monitor](https://docs.microsoft.com/azure/azure-monitor/overview) is a comprehensive solution for collecting, analyzing, and acting on telemetry from your cloud and on-premises environments.

Use the client library for Azure Monitor to:

- Query logs using the [Kusto query language][kusto_query_language]
- Query metrics

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/monitor/monitor-query/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/monitor-query) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/monitor-query) |
[Product documentation][azure_monitor_product_documentation]
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples)

## Getting started

### Install the package

```bash
npm install @azure/monitor-query
```

### Prerequisites

- You must have an [Azure Subscription](https://azure.microsoft.com) and an [Azure Monitor][azure_monitor_product_documentation] resource to use this package.
- Node.js version 10.x.x or higher

### Create an App Configuration resource

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
  More information on App Configuration roles can be found [here](https://docs.microsoft.com/azure/azure-app-configuration/concept-enable-rbac#azure-built-in-roles-for-azure-app-configuration).

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

#### Create and get a setting

```javascript
const appConfig = require("@azure/monitor-query");

const client = new appConfig.AppConfigurationClient(
  "<App Configuration connection string goes here>"
);

async function run() {
  const newSetting = await client.setConfigurationSetting({
    key: "testkey",
    value: "testvalue",
    // Labels allow you to create variants of a key tailored
    // for specific use-cases like supporting multiple environments.
    // https://docs.microsoft.com/azure/azure-app-configuration/concept-key-value#label-keys
    label: "optional-label"
  });

  let retrievedSetting = await client.getConfigurationSetting({
    key: "testkey",
    label: "optional-label"
  });

  console.log("Retrieved value:", retrievedSetting.value);
}

run().catch((err) => console.log("ERROR:", err));
```

## Next steps

The following samples show you the various ways you can interact with App Configuration:

- [`helloworld.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples/v1/typescript/src/helloworld.ts) - Get, set, and delete configuration values.
- [`helloworldWithLabels.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples/v1/typescript/src/helloworldWithLabels.ts) - Use labels to add additional dimensions to your settings for scenarios like beta vs production.
- [`optimisticConcurrencyViaEtag.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples/v1/typescript/src/optimisticConcurrencyViaEtag.ts) - Set values using etags to prevent accidental overwrites.
- [`setReadOnlySample.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples/v1/typescript/src/setReadOnlySample.ts) - Marking settings as read-only to prevent modification.
- [`getSettingOnlyIfChanged.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples/v1/typescript/src/getSettingOnlyIfChanged.ts) - Get a setting only if it changed from the last time you got it.
- [`listRevisions.ts`](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/monitor/monitor-query/samples/v1/typescript/src/listRevisions.ts) - List the revisions of a key, allowing you to see previous values and when they were set.

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fappconfiguration%2Fapp-configuration%2FREADME.png)

[azure_monitor_overview]: https://docs.microsoft.com/azure/azure-monitor/overview
[azure_monitor_create_workspace]: https://docs.microsoft.com/en-us/azure/azure-monitor/logs/quick-create-workspace
[azure_monitor_product_documentation]: https://docs.microsoft.com/azure/azure-monitor
[azure_monitor_logs_overview]: https://docs.microsoft.com/en-us/azure/azure-monitor/logs/data-platform-logs
[azure_monitor_create_using_portal]: https://docs.microsoft.com/en-us/azure/azure-monitor/logs/quick-create-workspace
[azure_monitor_create_using_cli]: https://docs.microsoft.com/en-us/azure/azure-monitor/logs/quick-create-workspace-cli
[kusto_query_language]: https://docs.microsoft.com/azure/data-explorer/kusto/query/
[msdocs_metrics_client]: https://docs.microsoft.com/javascript/api/@azure/monitor-query/metricsclient
[msdocs_logs_client]: https://docs.microsoft.com/javascript/api/@azure/monitor-query/logsclient

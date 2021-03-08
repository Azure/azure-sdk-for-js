# Azure Metrics Advisor client library for JavaScript

Metrics Advisor is a part of Azure Cognitive Services that uses AI perform data monitoring and anomaly detection in time series data. The service automates the process of applying models to your data, and provides a set of APIs web-based workspace for data ingestion, anomaly detection, and diagnostics - without needing to know machine learning. Use Metrics Advisor to:

- Analyze multi-dimensional data from multiple data sources
- Identify and correlate anomalies
- Configure and fine-tune the anomaly detection model used on your data
- Diagnose anomalies and help with root cause analysis.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/metricsadvisor/ai-metrics-advisor/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/ai-metrics-advisor) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/ai-metrics-advisor) |
[Product documentation](https://docs.microsoft.com/azure/cognitive-services/metrics-advisor/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples)

## Getting started

### Currently supported environments

- Node.js version 8.x.x or higher

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing [Cognitive Services][cognitive_resource] or Metrics Advisor resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```bash
az cognitiveservices account create --kind MetricsAdvisor --resource-group <your-resource-group-name> --name <your-resource-name> --sku <sku level> --location <location>
```

### Install the `@azure/ai-metrics-advisor` package

Install the Azure Metrics Advisor client library for JavaScript with `npm`:

```bash
npm install @azure/ai-metrics-advisor
```

### Create and authenticate `MetricsAdvisorClient` or `MetricsAdvisorAdministrationClient`

To create a client object to access the Metrics Advisor API, you will need the `endpoint` of your Metrics Advisor resource and a `credential`. The Metrics Advisor clients use a Metrics Advisor key credential to authenticate.

You can find the endpoint for your Metrics Advisor resource either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az cognitiveservices account show --name <your-resource-name> --resource-group <your-resource-group-name> --query "endpoint"
```

#### Using Subscription Key and API Key

You will need two keys to authenticate the client:

- The subscription key to your Metrics Advisor resource. You can find this in the **Keys and Endpoint** section of your resource in the [Azure Portal][azure_portal].
- The API key for your Metrics Advisor instance. You can find this in the web portal for Metrics Advisor, in **API keys** on the left navigation menu. The url of your web portal can be found in the **Overview** section of your resource in the [Azure Portal][azure_portal].

Use the [Azure Portal][azure_portal] to browse to your Metrics Advisor resource and retrieve an subscription key, or use the [Azure CLI][azure_cli] snippet below:

```PowerShell
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

In addition, you will also need the per-user api key from your Metrics Advisor web portal.

Once you have the two keys and endpoint, you can use the `MetricsAdvisorKeyCredential` class to authenticate the clients as follows:

```javascript
const {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorClient,
  MetricsAdvisorAdministrationClient
} = require("@azure/ai-metrics-advisor");

const credential = new MetricsAdvisorKeyCredential("<subscription Key>", "<API key>");

const client = new MetricsAdvisorClient("<endpoint>", credential);
const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
```

#### Using Azure Service Directory

API key authorization is used in most of the examples, but you can also authenticate the client with Azure Active Directory using the Azure Identity library. To use the DefaultAzureCredential provider shown below or other credential providers provided with the Azure SDK, please install the @azure/identity package:

```
npm install @azure/identity
```

To authenticate using a service principal, you will also need to register an AAD application and grant access to Metrics Advisor by assigning the "Cognitive Services User" role to your service principal (note: other roles such as "Owner" will not grant the necessary permissions, only "Cognitive Services User" will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET.
We also support Authentication by Azure Active Directoty Credential. You will need the Azure Tenant ID, Azure Client ID and Azure Client Secret as environment variables.

```javascript
const {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorClient,
  MetricsAdvisorAdministrationClient
} = require("@azure/ai-metrics-advisor");
import { DefaultAzureCredential } from "@azure/identity";
const credential = new DefaultAzureCredential();
const client = new MetricsAdvisorClient("<endpoint>", credential);
const adminClient = new MetricsAdvisorAdministrationClient("<endpoint>", credential);
```

## Key concepts

### MetricsAdvisorClient

`MetricsAdvisorClient` is the primary querying interface for developers using the Metrics Advisor client library. It provides asynchronous methods to access a specific use of Metrics Advisor, such as listing incidents, retrive root causes of incidents, retrieving original time series data and time series data enriched by the service.

### MetricsAdvisorAdministrationClient

`MetricsAdvisorAdministrationClient` is the interface responsible for managing entities in the Metrics Advisor resources, such as managing data feeds, anomaly detection configurations, anomaly alerting configurations.

### DataFeed

A `DataFeed` is what Metrics Advisor ingests from your data source, such as Cosmos DB or a SQL server. A data feed contains rows of:

- timestamps
- zero or more dimensions
- one or more measures

### Metric

A `Metric` is a quantifiable measure that is used to monitor and assess the status of a specific business process. It can be a combination of multiple time series values divided into dimensions. For example a web health metric might contain dimensions for user count and the en-us market.

### AnomalyDetectionConfiguration

`AnomalyDetectionConfiguration` is required for every time series, and determines whether a point in the time series is an anomaly.

### Anomaly & Incident

After a detection configuration is applied to metrics, `Incident`s are generated whenever any series within it has an `Anomaly`.

### Alert

You can configure which anomalies should trigger an `Alert`. You can set multiple alerts with different settings. For example, you could create an alert for anomalies with lower business impact, and another for more important alerts.

### Hook

Metrics Advisor lets you create and subscribe to real-time alerts. These alerts are sent over the internet, using a `Hook`.

Please refer to [the Metrics Advisory Glossary][metrics_advisor_glossary] documentation page for a comprehensive list of concepts.

## Examples

The following section provides several JavaScript code snippets illustrating common patterns used in the Metrics Advisor client libraries.

- [Add a data feed from a sample data source](#add-a-data-feed-from-a-sample-data-source "Add a data feed from a sample or data source")
- [Check ingestion status](#check-ingestion-status "Check ingestion status")
- [Configure anomaly detection configuration](#configure-anomaly-detection-configuration "Configure anomaly detection configuration")
- [Add hooks for receiving anomaly alerts](#add-hooks-for-receiving-anomaly-alerts "Add hooks for receiving anomaly alerts")
- [Configure alert configuration](#configure-alert-configuration "Configure alert configuration")
- [Query anomaly detection results](#query-anomaly-detection-results "Query anomaly detection results")

### Add a data feed from a sample data source

Metrics Advisor supports connecting different types of data sources. Here is a sample to ingest data from SQL Server.

```javascript
const {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient
} = require("@azure/ai-metrics-advisor");

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const sqlServerConnectionString =
    process.env["METRICS_ADVISOR_SQL_SERVER_CONNECTION_STRING"] ||
    "<connection string to SQL Server>";
  const sqlServerQuery =
    process.env["METRICS_ADVISOR_AZURE_SQL_SERVER_QUERY"] || "<SQL Server query to retrive data>";
  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  const created = await createDataFeed(adminClient, sqlServerConnectionString, sqlServerQuery);
  console.log(`Data feed created: ${created.id}`);
}

async function createDataFeed(adminClient, sqlServerConnectionString, sqlServerQuery) {
  console.log("Creating Datafeed...");
  const dataFeed = {
    name: "test_datafeed_" + new Date().getTime().toString(),
    source: {
      dataSourceType: "SqlServer",
      dataSourceParameter: {
        connectionString: sqlServerConnectionString,
        query: sqlServerQuery
      }
    },
    granularity: {
      granularityType: "Daily"
    },
    schema: {
      metrics: [
        {
          name: "revenue",
          displayName: "revenue",
          description: "Metric1 description"
        },
        {
          name: "cost",
          displayName: "cost",
          description: "Metric2 description"
        }
      ],
      dimensions: [
        { name: "city", displayName: "city display" },
        { name: "category", displayName: "category display" }
      ],
      timestampColumn: null
    },
    ingestionSettings: {
      ingestionStartTime: new Date(Date.UTC(2020, 5, 1)),
      ingestionStartOffsetInSeconds: 0,
      dataSourceRequestConcurrency: -1,
      ingestionRetryDelayInSeconds: -1,
      stopRetryAfterInSeconds: -1
    },
    rollupSettings: {
      rollupType: "AutoRollup",
      rollupMethod: "Sum",
      rollupIdentificationValue: "__CUSTOM_SUM__"
    },
    missingDataPointFillSettings: {
      fillType: "SmartFilling"
    },
    accessMode: "Private",
    adminEmails: ["xyz@example.com"]
  };
  const result = await adminClient.createDataFeed(dataFeed);

  return result;
}
```

### Check ingestion status

After we start the data ingestion, we can check the ingestion status.

```javascript
const {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient
} = require("@azure/ai-metrics-advisor");

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const dataFeedId = process.env["METRICS_DATAFEED_ID"] || "<data feed id>";
  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);
  await checkIngestionStatus(
    adminClient,
    dataFeedId,
    new Date(Date.UTC(2020, 8, 1)),
    new Date(Date.UTC(2020, 8, 12))
  );
}

async function checkIngestionStatus(adminClient, datafeedId, startTime, endTime) {
  // This shows how to use for-await-of syntax to list status
  console.log("Checking ingestion status...");
  const iterator = adminClient.listDataFeedIngestionStatus(datafeedId, startTime, endTime);
  for await (const status of iterator) {
    console.log(`  [${status.timestamp}] ${status.status} - ${status.message}`);
  }
}
```

### Configure anomaly detection configuration

We need an anomaly detection configuration to determine whether a point in the time series is an anomaly.
While a default detection configuration is automatically applied to each metric, you can tune the detection modes used on your data by creating a customized anomaly detection configuration.

```javascript
const {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient
} = require("@azure/ai-metrics-advisor");

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const metricId = process.env["METRICS_ADVISOR_METRIC_ID"] || "<metric id>";
  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  const detectionConfig = await configureAnomalyDetectionConfiguration(adminClient, metricId);
  console.log(`Detection configuration created: ${detectionConfig.id}`);
}

async function configureAnomalyDetectionConfiguration(adminClient, metricId) {
  console.log(`Creating an anomaly detection configuration on metric '${metricId}'...`);
  const anomalyConfig = {
    name: "test_detection_configuration" + new Date().getTime().toString(),
    metricId,
    wholeSeriesDetectionCondition: {
      smartDetectionCondition: {
        sensitivity: 100,
        anomalyDetectorDirection: "Both",
        suppressCondition: {
          minNumber: 1,
          minRatio: 1
        }
      }
    },
    description: "Detection configuration description"
  };
  return await adminClient.createDetectionConfig(anomalyConfig);
}
```

### Add hooks for receiving anomaly alerts

We use hooks subscribe to real-time alerts. In this example, we create a webhook for the Metrics Advisor service to POST the alert to.

```javascript
const {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient
} = require("@azure/ai-metrics-advisor");

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);
  const hook = await createWebhookHook(adminClient);
  console.log(`Webhook hook created: ${hook.id}`);
}

async function createWebhookHook(adminClient) {
  console.log("Creating a webhook hook");
  const hook = {
    hookType: "Webhook",
    name: "web hook " + new Date().getTime().toString(),
    description: "description",
    hookParameter: {
      endpoint: "https://example.com/handleAlerts",
      username: "username",
      password: "password"
      // certificateKey: "certificate key",
      // certificatePassword: "certificate password"
    }
  };

  return await adminClient.createHook(hook);
}
```

### Configure alert configuration

Then let's configure in which conditions an alert needs to be triggered and which hooks to send the alert.

```javascript
const {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient
} = require("@azure/ai-metrics-advisor");

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const detectionConfigId = process.env["METRICS_ADVISOR_DETECTION_CONFIG_ID"] || "<detection id>";
  const hookId = process.env["METRICS_ADVISOR_HOOK_ID"] || "<hook id>";
  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);
  const alertConfig = await configureAlertConfiguration(adminClient, detectionConfigId, [hookId]);
  console.log(`Alert configuration created: ${alertConfig.id}`);
}

async function configureAlertConfiguration(adminClient, detectionConfigId, hookIds) {
  console.log("Creating a new alerting configuration...");
  const anomalyAlertConfig = {
    name: "test_alert_config_" + new Date().getTime().toString(),
    crossMetricsOperator: "AND",
    metricAlertConfigurations: [
      {
        detectionConfigurationId: detectionConfigId,
        alertScope: {
          scopeType: "All"
        },
        alertConditions: {
          severityCondition: { minAlertSeverity: "Medium", maxAlertSeverity: "High" }
        },
        snoozeCondition: {
          autoSnooze: 0,
          snoozeScope: "Metric",
          onlyForSuccessive: true
        }
      }
    ],
    hookIds,
    description: "Alerting config description"
  };
  return await adminClient.createAlertConfig(anomalyAlertConfig);
}
```

### Query anomaly detection results

We can query the alerts and anomalies.

```javascript
const { MetricsAdvisorKeyCredential, MetricsAdvisorClient } = require("@azure/ai-metrics-advisor");

async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const alertConfigId = process.env["METRICS_ADVISOR_ALERT_CONFIG_ID"] || "<alert config id>";
  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const client = new MetricsAdvisorClient(endpoint, credential);

  const alerts = await queryAlerts(
    client,
    alertConfigId,
    new Date(Date.UTC(2020, 8, 1)),
    new Date(Date.UTC(2020, 8, 12))
  );

  if (alerts.length > 1) {
    // query anomalies using an alert id.
    await queryAnomaliesByAlert(client, alerts[0]);
  } else {
    console.log("No alerts during the time period");
  }
}

async function queryAlerts(client, alertConfigId, startTime, endTime) {
  let alerts = [];
  const iterator = client.listAlerts(alertConfigId, startTime, endTime, "AnomalyTime");
  for await (const alert of iterator) {
    alerts.push(alert);
  }

  return alerts;
}

async function queryAnomaliesByAlert(client, alert) {
  console.log(
    `Listing anomalies for alert configuration '${alert.alertConfigId}' and alert '${alert.id}'`
  );
  const iterator = client.listAnomalies(alert);
  for await (const anomaly of iterator) {
    console.log(
      `  Anomaly ${anomaly.severity} ${anomaly.status} ${anomaly.seriesKey.dimension} ${anomaly.timestamp}`
    );
  }
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test \
the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fmetricsadvisor%2Fai-metrics-advisor%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[cognitive_resource]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential
[metrics_advisor_glossary]: https://docs.microsoft.com/azure/cognitive-services/metrics-advisor/glossary

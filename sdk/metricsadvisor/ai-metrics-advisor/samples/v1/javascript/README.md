---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
  - azure-metrics-advisor
urlFragment: ai-metrics-advisor-javascript
---

# Azure Metrics Advisor client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Metrics Advisor in some common scenarios.

| **File Name**                                   | **Description**                                                                                                                                                                        |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [quickstart.js][quickstart]                     | This sample demonstrates how to get started by creating a data feed, checking ingestion status, creating detection and alerting configurations, and querying for alerts and anomalies. |
| [dataFeed.js][datafeed]                         | This sample demonstrates data feed management operations.                                                                                                                              |
| [dataSourceCredential.js][datasourcecredential] | This sample demonstrates data source credential operations                                                                                                                             |
| [detectionConfig.js][detectionconfig]           | This sample demonstrates Detection Configuration CRUD operations.                                                                                                                      |
| [incidentsAndAlerts.js][incidentsandalerts]     | This sample demonstrates how to query incidents and alerts.                                                                                                                            |
| [ingestionStatus.js][ingestionstatus]           | This sample demonstrates operations related to ingestion status.                                                                                                                       |
| [alertingConfig.js][alertingconfig]             | This sample demonstrates Alerting Configuration CRUD operations.                                                                                                                       |
| [hooks.js][hooks]                               | This sample demonstrates Metrics Advisor Hooks CRUD operations.                                                                                                                        |
| [metricFeedback.js][metricfeedback]             | This sample demonstrates how to provide feedback for a metric.                                                                                                                         |
| [metricQueries.js][metricqueries]               | This sample demonstrates querying methods related to metric.                                                                                                                           |
| [seriesData.js][seriesdata]                     | This sample demonstrates how to retrieve time series data.                                                                                                                             |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Cognitive Services account][createinstance_azurecognitiveservicesaccount]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node quickstart.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env METRICS_ADVISOR_ENDPOINT="<metrics advisor endpoint>" METRICS_ADVISOR_SUBSCRIPTION_KEY="<metrics advisor subscription key>" METRICS_ADVISOR_API_KEY="<metrics advisor api key>" METRICS_ADVISOR_SQL_SERVER_CONNECTION_STRING="<metrics advisor sql server connection string>" METRICS_ADVISOR_AZURE_SQL_SERVER_QUERY="<metrics advisor azure sql server query>" node quickstart.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[quickstart]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/quickstart.js
[datafeed]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/dataFeed.js
[datasourcecredential]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/dataSourceCredential.js
[detectionconfig]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/detectionConfig.js
[incidentsandalerts]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/incidentsAndAlerts.js
[ingestionstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/ingestionStatus.js
[alertingconfig]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/alertingConfig.js
[hooks]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/hooks.js
[metricfeedback]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/metricFeedback.js
[metricqueries]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/metricQueries.js
[seriesdata]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/metricsadvisor/ai-metrics-advisor/samples/v1/javascript/seriesData.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-metrics-advisor/
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesaccount]: https://learn.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/metricsadvisor/ai-metrics-advisor/README.md

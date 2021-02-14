---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-cognitive-services
urlFragment: ai-metrics-advisor-javascript
---

# Azure Metrics Advisor client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Cognitive Services Metrics Advisor in some common scenarios.

| **File Name**                               | **Description**                                                                                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dataFeed.js][datafeed]                     | CRUD operations for datafeed - Create datafeed, get datafeed, list datafeed, update datafeed and delete datafeed                                              |
| [alertingConfig.js][alertingconfig]         | CRUD operations for alerting Configuration - Create, list, update and delete alert configuration                                                              |
| [detectionConfig.js][detectionconfig]       | CRUD operations for detection Configuration - Create, list, update and delete detection configuration                                                         |
| [seriesData.js][seriesdata]                 | Get metric series data and Get enriched series data                                                                                                           |
| [hooks.js][hooks]                           | CRUD operations for hooks - create email hook, create webhook, update email hook, list hooks, delete hook                                                     |
| [incidentsAndAlerts.js][incidentsandalerts] | Listing various Incidents and alerts: list alerts, list incidents/anomalies for an alert, get root causes, list anomalies/incidents for detection config data |
| [metricFeedback.js][metricfeedback]         | creating all four types of feedback, get feedback and list feedbacks                                                                                          |
| [metricQueries.js][metricqueries]           | Listing metric queries: list metric series definition, list enrichment status                                                                                 |
| [ingestionStatus.js][ingestionstatus]       | operations for Ingestion data - list ingestion status, refresh ingestion                                                                                      |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Cognitive Services Instance][azcogsvc] to run these sample programs. Samples retrieve credentials to access the Cognitive Services endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Not all environment variables are required. Read the relevant sample sources and the `sample.env` file to determine which ones are required. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dataFeed.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[datafeed]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/javascript/dataFeed.js
[alertingconfig]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/javascript/alertingConfig.js
[detectionconfig]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/javascript/detectionConfig.js
[seriesdata]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/javascript/seriesData.js
[hooks]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/javascript/hooks.js
[incidentsandalerts]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/javascript/incidentsAndAlerts.js
[metricfeedback]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/javascript/metricFeedback.js
[metricqueries]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/javascript/metricQueries.js
[ingestionstatus]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/javascript/ingestionStatus.js
[azcogsvc]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

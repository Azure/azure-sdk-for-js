---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
urlFragment: ai-metrics-advisor-typescript
---

# Azure Metrics Advisor client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Cognitive Services Metrics Advisor in some common scenarios.

| **File Name**                               | **Description**                                                                                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [dataFeed.ts][datafeed]                     | CRUD operations for datafeed - Create datafeed, get datafeed, list datafeed, update datafeed and delete datafeed                                              |
| [alertingConfig.ts][alertingconfig]         | CRUD operations for alerting Configuration - Create, list, update and delete alert configuration                                                              |
| [detectionConfig.ts][detectionconfig]       | CRUD operations for detection Configuration - Create, list, update and delete detection configuration                                                         |
| [seriesData.ts][seriesdata]                 | Get metric series data and Get enriched series data                                                                                                           |
| [hooks.ts][hooks]                           | CRUD operations for hooks - create email hook, create webhook, update email hook, list hooks, delete hook                                                     |
| [incidentsAndAlerts.ts][incidentsandalerts] | Listing various Incidents and alerts: list alerts, list incidents/anomalies for an alert, get root causes, list anomalies/incidents for detection config data |
| [metricFeedback.ts][metricfeedback]         | creating all four types of feedback, get feedback and list feedbacks                                                                                          |
| [metricQueries.ts][metricqueries]           | Listing metric queries: list metric series definition, list enrichment status                                                                                 |
| [ingestionStatus.ts][ingestionstatus]       | operations for Ingestion data - list ingestion status, refresh ingestion                                                                                      |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Cognitive Services Instance][azcogsvc] to run these sample programs. Samples retrieve credentials to access the Cognitive Services endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Not all environment variables are required. Read the relevant sample sources and the `sample.env` file to determine which ones are required. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/dataFeed.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[datafeed]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/typescript/src/dataFeed.ts
[alertingconfig]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/typescript/src/alertingConfig.ts
[detectionconfig]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/typescript/src/detectionConfig.ts
[seriesdata]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/typescript/src/seriesData.ts
[hooks]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/typescript/src/hooks.ts
[incidentsandalerts]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/typescript/src/incidentsAndAlerts.ts
[metricfeedback]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/typescript/src/metricFeedback.ts
[metricqueries]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/typescript/src/metricQueries.ts
[ingestionstatus]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/samples/typescript/src/ingestionStatus.ts
[azcogsvc]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/metricsadvisor/ai-metrics-advisor/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

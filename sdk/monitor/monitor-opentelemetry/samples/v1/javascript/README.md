---
page_type: sample
languages:
  - javascript
products:
  - azure-monitor
urlFragment: monitor-opentelemetry-javascript
---

# Azure Monitor OpenTelemetry client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Monitor OpenTelemetry in some common scenarios.

| **File Name**                               | **Description**                                                                                          |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [basicConnection.js][basicconnection]       | Demonstrates how to configure Azure Monitor OpenTelemetry using a connection string.                     |
| [cloudRole.js][cloudrole]                   | Demonstrates how to set Cloud Role Name and Cloud Role Instance using OpenTelemetry Resource attributes. |
| [customMetric.js][custommetric]             | Demonstrates how to generate custom metrics that will be sent to Azure Monitor.                          |
| [customTrace.js][customtrace]               | Demonstrates how to generate custom traces that will be sent to Azure Monitor.                           |
| [liveMetrics.js][livemetrics]               | Demonstrates how to enable or disable Live Metrics for real-time monitoring.                             |
| [offlineStorage.js][offlinestorage]         | Demonstrates how to configure offline storage and automatic retries for telemetry.                       |
| [otlpExporter.js][otlpexporter]             | Demonstrates how to enable the OTLP exporter alongside Azure Monitor to send telemetry to two locations. |
| [redactQueryStrings.js][redactquerystrings] | Demonstrates how to redact URL query strings from telemetry to protect sensitive information.            |
| [sampling.js][sampling]                     | Demonstrates how to enable sampling to reduce data ingestion volume and control costs.                   |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Application Insights workspace instance][createinstance_azureapplicationinsightsworkspaceinstance]

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
node basicConnection.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env APPLICATIONINSIGHTS_CONNECTION_STRING="<applicationinsights connection string>" node basicConnection.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basicconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/javascript/basicConnection.js
[cloudrole]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/javascript/cloudRole.js
[custommetric]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/javascript/customMetric.js
[customtrace]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/javascript/customTrace.js
[livemetrics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/javascript/liveMetrics.js
[offlinestorage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/javascript/offlineStorage.js
[otlpexporter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/javascript/otlpExporter.js
[redactquerystrings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/javascript/redactQueryStrings.js
[sampling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/javascript/sampling.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/monitor-opentelemetry
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureapplicationinsightsworkspaceinstance]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-opentelemetry/README.md

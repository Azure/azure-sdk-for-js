---
page_type: sample
languages:
  - typescript
products:
  - azure-monitor
urlFragment: monitor-opentelemetry-typescript
---

# Azure Monitor OpenTelemetry client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Monitor OpenTelemetry in some common scenarios.

| **File Name**                               | **Description**                                                                                          |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [basicConnection.ts][basicconnection]       | Demonstrates how to configure Azure Monitor OpenTelemetry using a connection string.                     |
| [cloudRole.ts][cloudrole]                   | Demonstrates how to set Cloud Role Name and Cloud Role Instance using OpenTelemetry Resource attributes. |
| [customMetric.ts][custommetric]             | Demonstrates how to generate custom metrics that will be sent to Azure Monitor.                          |
| [customTrace.ts][customtrace]               | Demonstrates how to generate custom traces that will be sent to Azure Monitor.                           |
| [liveMetrics.ts][livemetrics]               | Demonstrates how to enable or disable Live Metrics for real-time monitoring.                             |
| [offlineStorage.ts][offlinestorage]         | Demonstrates how to configure offline storage and automatic retries for telemetry.                       |
| [otlpExporter.ts][otlpexporter]             | Demonstrates how to enable the OTLP exporter alongside Azure Monitor to send telemetry to two locations. |
| [redactQueryStrings.ts][redactquerystrings] | Demonstrates how to redact URL query strings from telemetry to protect sensitive information.            |
| [sampling.ts][sampling]                     | Demonstrates how to enable sampling to reduce data ingestion volume and control costs.                   |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/basicConnection.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env APPLICATIONINSIGHTS_CONNECTION_STRING="<applicationinsights connection string>" node dist/basicConnection.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[basicconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/typescript/src/basicConnection.ts
[cloudrole]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/typescript/src/cloudRole.ts
[custommetric]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/typescript/src/customMetric.ts
[customtrace]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/typescript/src/customTrace.ts
[livemetrics]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/typescript/src/liveMetrics.ts
[offlinestorage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/typescript/src/offlineStorage.ts
[otlpexporter]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/typescript/src/otlpExporter.ts
[redactquerystrings]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/typescript/src/redactQueryStrings.ts
[sampling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/monitor-opentelemetry/samples/v1/typescript/src/sampling.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/monitor-opentelemetry
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureapplicationinsightsworkspaceinstance]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-opentelemetry/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

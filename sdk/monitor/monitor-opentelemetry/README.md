# Azure Monitor OpenTelemetry client library for JavaScript

[![npm version](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry.svg)](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry)

## Getting started

### Install the package

`npm install @azure/monitor-opentelemetry`

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- An [Application Insights workspace](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview/)

### Enable Azure Monitor OpenTelemetry Client

> *Important:* `AzureMonitorOpenTelemetryClient` must be setup *and* started *before* you import anything else. There may be resulting telemetry loss if other libraries are imported first.


```typescript
const { AzureMonitorOpenTelemetryClient, AzureMonitorOpenTelemetryOptions } = require("@azure/monitor-opentelemetry");

const options: AzureMonitorOpenTelemetryOptions = {
  azureMonitorExporterConfig: {
    connectionString:
      process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
  },
}
const client = new AzureMonitorOpenTelemetryClient(options);
```

* Connection String could be set using the environment variable APPLICATIONINSIGHTS\_CONNECTION\_STRING

## Examples

For complete samples of a few champion scenarios, see the [`samples/`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-opentelemetry/samples-dev/) folder.

## Key concepts

For more information on the OpenTelemetry project, please review the [**OpenTelemetry Specifications**](https://github.com/open-telemetry/opentelemetry-specification#opentelemetry-specification).

## Troubleshooting

### Enable debug logging

You can enable debug logging by changing the logging level of your provider.

```js
const { DiagConsoleLogger, DiagLogLevel, diag } = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");

const provider = new NodeTracerProvider();
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
provider.register();
```

### Plugin Registry

To see if a plugin has already been made for a library you are using, please check out the [OpenTelemetry Registry](https://opentelemetry.io/registry/).

If you cannot your library in the registry, feel free to suggest a new plugin request at [`opentelemetry-js-contrib`](https://github.com/open-telemetry/opentelemetry-js-contrib).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/monitor/monitor-opentelemetry/README.png)

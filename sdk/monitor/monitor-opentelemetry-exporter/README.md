# Azure Monitor OpenTelemetry Exporter client library for JavaScript

[![npm version](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry-exporter.svg)](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry-exporter)

## Getting started

This exporter package assumes your application is [already instrumented](https://opentelemetry.io/docs/js/getting-started/) with the OpenTelemetry SDK. Once you are ready to export OpenTelemetry data, you can add this exporter to your application.

### Install the package

`npm install @azure/monitor-opentelemetry-exporter`

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- An [Application Insights workspace](https://docs.microsoft.com/azure/azure-monitor/app/app-insights-overview/)

### Distributed Tracing

Add the exporter to your existing OpenTelemetry tracer provider (`NodeTracerProvider` / `BasicTracerProvider`)

```js
const { AzureMonitorTraceExporter } = require("@azure/monitor-opentelemetry-exporter");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");


const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
  }),
});
provider.register();

// Create an exporter instance
const exporter = new AzureMonitorTraceExporter({
  connectionString:
    process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>"
});

// Add the exporter to the provider
provider.addSpanProcessor(
  new BatchSpanProcessor(exporter, {
    bufferTimeout: 15000,
    bufferSize: 1000
  })
);
```

### Metrics

Add the exporter to your existing OpenTelemetry tracer provider (`NodeTracerProvider` / `BasicTracerProvider`)

```js
const { MeterProvider, PeriodicExportingMetricReader } = require("@opentelemetry/sdk-metrics");
const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { AzureMonitorMetricExporter } = require("@azure/monitor-opentelemetry-exporter");

// Add the exporter into the MetricReader and register it with the MeterProvider
const provider = new MeterProvider();
const exporter = new AzureMonitorMetricExporter({
  connectionString:
    process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "<your connection string>",
});
const metricReaderOptions = {
  exporter: exporter,
};
const metricReader = new PeriodicExportingMetricReader(metricReaderOptions);
provider.addMetricReader(metricReader);
);
```

### Logs

Coming Soon

### Sampling

You can enable sampling to limit the amount of telemetry records you receive. In order to enable correct sampling in Application Insights, use the `ApplicationInsightsSampler` as shown below.

```js
const { ApplicationInsightsSampler } = require("@azure/monitor-opentelemetry-exporter");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");

// Sampler expects a sample rate of between 0 and 1 inclusive
// A rate of 0.75 means approximately 75 % of your traces will be sent
const aiSampler = new ApplicationInsightsSampler(0.75);
const provider = new NodeTracerProvider({
  sampler: aiSampler,
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "basic-service",
  }),
});
provider.register();
```

## Examples

For complete samples of a few champion scenarios, see the [`samples/`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/monitor-opentelemetry-exporter/samples/) folder.

## Key concepts

For more information on the OpenTelemetry project, please review the [**OpenTelemetry Specifications**](https://github.com/open-telemetry/opentelemetry-specification#opentelemetry-specification).

## Troubleshooting

### Enable debug logging

You can enable debug logging by changing the logging level of your provider.

```js
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");

const provider = new NodeTracerProvider();
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);
provider.register();
```

## Next steps

This exporter is made to be used with the [OpenTelemetry JS](https://github.com/open-telemetry/opentelemetry-js).

### Plugin Registry

To see if a plugin has already been made for a library you are using, please check out the [OpenTelemetry Registry](https://opentelemetry.io/registry/).

If you cannot your library in the registry, feel free to suggest a new plugin request at [`opentelemetry-js-contrib`](https://github.com/open-telemetry/opentelemetry-js-contrib).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/monitor/monitor-opentelemetry-exporter/README.png)

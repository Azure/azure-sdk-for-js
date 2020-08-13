# Azure Monitor OpenTelemetry Exporter client library for JavaScript

[![npm version](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry-exporter.svg)](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry-exporter)

## Getting started

This exporter package assumes your application is [already instrumented](https://github.com/open-telemetry/opentelemetry-js/blob/master/getting-started/README.md) with the OpenTelemetry SDK. Once you are ready to export OpenTelemetry data, you can add this exporter to your application.

### Install the package

`npm install @azure/monitor-opentelemetry-exporter`

### Prerequisites

You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Application Insights workspace](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview/) to use this package.
If you are using this package in a Node.js application, then use Node.js 8.x or higher.

### Distributed Tracing

Add the exporter to your existing OpenTelemetry tracer provider (`NodeTracerProvider` / `BasicTracerProvider`)

```js
const { AzureMonitorTraceExporter } = require("@azure/monitor-opentelemetry-exporter");
const { NodeTracerProvider } = require("@opentelemetry/node");
const { BatchSpanProcessor } = require("@opentelemetry/tracing");

// Use your existing provider
const provider = new NodeTracerProvider({
  plugins: {
    https: {
      // Ignore Application Insights Ingestion Server
      ignoreOutgoingUrls: [new RegExp(/dc.services.visualstudio.com/i)],
    },
  },
});
provider.register();

// Create an exporter instance
const exporter = new AzureMonitorTraceExporter({
  logger: provider.logger,
  instrumentationKey: "ikey",
});

// Add the exporter to the provider
provider.addSpanProcessor(
  new BatchSpanProcessor(exporter, {
    bufferTimeout: 15000,
    bufferSize: 1000,
  }),
);
```

### Metrics

Coming Soon

### Logs

Coming Soon

## Examples

Coming soon // TODO: Update this with link to samples when we have some

## Key concepts

For more information on the OpenTelemetry project, please review the [**OpenTelemetry Specifications**](https://github.com/open-telemetry/opentelemetry-specification#opentelemetry-specification).

## Troubleshooting

### Enable debug logging

You can enable debug logging by changing the logging level of your provider.

```js
const provider = new NodeTracerProvider({
  logLevel: LogLevel.DEBUG,
  plugins: {
    https: {
      // Ignore Application Insights Ingestion Server
      ignoreOutgoingUrls: [new RegExp(/dc.services.visualstudio.com/i)],
    },
  },
});
```

## Next steps

This exporter is made to be used with the [OpenTelemetry JS](http://github.com/open-telemetry/opentelemetry-js).

### Plugin Registry

To see if a plugin has already been made for a library you are using, please check out the [OpenTelemetry Registry](https://opentelemetry.io/registry/).

If you cannot your library in the registry, feel free to suggest a new plugin request at [`opentelemetry-js-contrib`](http://github.com/open-telemetry/opentelemetry-js-contrib).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/monitor/opentelemetry-exporter/README.png)

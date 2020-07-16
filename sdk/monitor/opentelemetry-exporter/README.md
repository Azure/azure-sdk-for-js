
# Azure Monitor JavaScript Exporter for OpenTelemetry

[![npm version](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry-exporter.svg)](https://badge.fury.io/js/%40azure%2Fmonitor-opentelemetry-exporter)
[![codecov](https://codecov.io/gh/microsoft/opentelemetry-azure-monitor-js/branch/master/graph/badge.svg)](https://codecov.io/gh/microsoft/opentelemetry-azure-monitor-js)
![Node.js CI](https://github.com/microsoft/opentelemetry-azure-monitor-js/workflows/Node.js%20CI/badge.svg)

## Getting Started

This exporter package assumes your application is [already instrumented](https://github.com/open-telemetry/opentelemetry-js/blob/master/getting-started/README.md) with the OpenTelemetry SDK. Once you are ready to export OpenTelemetry data, you can add this exporter to your application:

```zsh
npm i --save @azure/monitor-opentelemetry-exporter
```

### Distributed Tracing

Add the exporter to your existing OpenTelemetry tracer provider (`NodeTracerProvider` / `BasicTracerProvider`)

```js
const { AzureMonitorTraceExporter } = require('@azure/monitor-opentelemetry-exporter');
const { NodeTracerProvider } = require('@opentelemetry/node');
const { BatchSpanProcessor } = require('@opentelemetry/tracing');

// Use your existing provider
const provider = new NodeTracerProvider();

// Create an exporter instance
const exporter = new AzureMonitorTraceExporter({
  logger: provider.logger,
  instrumentationKey: 'ikey',
});

// Add the exporter to the provider
provider.addSpanProcessor(new BatchSpanProcessor(exporter, {
  bufferTimeout: 15000,
  bufferSize: 1000,
}));
```

### Metrics

Coming Soon

### Logs

Coming Soon

## Examples

Please take a look at the [examples](../examples) to see how to add the Azure Monitor Exporter to your existing OpenTelemetry instrumented project.

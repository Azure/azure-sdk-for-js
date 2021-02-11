# Azure Core tracing library for JavaScript

This is the core tracing library that provides low-level interfaces and helper methods for tracing in Azure SDK JavaScript libraries which work in the browser and Node.js.

## Getting started

### Installation

Install this library using npm as follows

```
npm install @azure/core-tracing
```

## Key Concepts

The `@azure/core-tracing` package supports enabling tracing for Azure SDK packages, using an [OpenTelemetry](https://opentelemetry.io/) `Tracer`. If you are using [OpenCensus](https://opencensus.io/) instead, we provide an `OpenCensusTracerWrapper` that allows you to convert an OpenCensus `Tracer` into an OpenTelemetry `Tracer`.

By default, all libraries log with a `NoOpTracer` that takes no action.
To change this, you have to use `setTracer` to set a new default `Tracer`.

## Examples

### Example 1 - Setting an OpenTelemetry Tracer

```js
const opentelemetry = require("@opentelemetry/core");
const { BasicTracer, SimpleSpanProcessor } = require("@opentelemetry/tracing");
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { setTracer } = require("@azure/core-tracing");

const exporter = new ZipkinExporter({
  serviceName: "azure-tracing-sample"
});
const tracer = new BasicTracer();
tracer.addSpanProcessor(new SimpleSpanProcessor(exporter));

opentelemetry.initGlobalTracer(tracer);

const rootSpan = opentelemetry.getTracer().startSpan("root");

// Call some client library methods and pass rootSpan via tracingOptions.

rootSpan.end();
exporter.shutdown();
```

### Example 2 - Setting an OpenCensus Tracer

```js
const tracing = require("@opencensus/nodejs");
const { ZipkinTraceExporter } = require("@opencensus/exporter-zipkin");
const {
  setTracer,
  OpenCensusTracerWrapper,
  OpenCensusSpanWrapper
} = require("@azure/core-tracing");

const tracer = tracing.start({ samplingRate: 1 }).tracer;

tracer.registerSpanEventListener(
  new ZipkinTraceExporter({
    serviceName: "azure-tracing-sample",
    bufferTimeout: 2
  })
);
setTracer(new OpenCensusTracerWrapper(tracer));
tracer.startRootSpan({ name: "root" }, async (rootSpanEx) => {
  const rootSpan = new OpenCensusSpanWrapper(rootSpanEx);
  // Call some client library methods and pass rootSpan via tracingOptions.
  rootSpanEx.end(); // rootSpan.end() should work as well
});
```

### Example 3 - Passing parent Spans to library operations

```js
// Given a BlobClient from @azure/storage-blob
const result = await blobClient.download(undefined, undefined, {
  tracingOptions: {
    spanOptions: { parent: rootSpan }
  }
});
```

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcore%2Fcore-tracing%2FREADME.png)

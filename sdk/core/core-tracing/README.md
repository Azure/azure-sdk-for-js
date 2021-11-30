# Azure Core tracing library for JavaScript

This is the core tracing library that provides low-level interfaces and helper methods for tracing in Azure SDK JavaScript libraries which work in the browser and Node.js.

## Getting started

### Installation

Install this library using npm as follows

```
npm install @azure/core-tracing
```

## Key Concepts

The `@azure/core-tracing` package supports enabling tracing for Azure SDK packages, using an [OpenTelemetry](https://opentelemetry.io/) `Tracer`.

By default, all libraries log with a `NoOpTracer` that takes no action. To enable tracing, you will need to set a global tracer provider following the instructions in the [OpenTelemetry getting started guide](https://opentelemetry.io/docs/js/getting_started/nodejs) or the [Enabling Tracing using OpenTelemetry example](#enabling-tracing-using-opentelemetry) below.

### Span Propagation

Core Tracing supports both automatic and manual span propagation. Automatic propagation is handled using OpenTelemetry's API and will work well in most scenarios when run in `Node.js`.

For customers who require manual propagation, or to provide context propagation in the browser, all client library operations accept an optional options collection where a tracingContext can be passed in and used as the currently active context. Please see the [Manual Span Propagation example](#manual-span-propagation-using-opentelemetry) below for more details.

### OpenTelemetry Compatibility

Most Azure SDKs and Microsoft's [Application Insights](https://www.npmjs.com/package/applicationinsights) use [OpenTelemetry](https://opentelemetry.io/) to support tracing. Specifically, we depend on the [@opentelemetry/api](https://www.npmjs.com/package/@opentelemetry/api) npm package.

As OpenTelemetry iterated on their API towards their 1.0 GA release, our libraries were updated to match.

Some incompatibility between the libraries is due to mismatches between the OpenTelemetry versions used in either `@azure/core-tracing` or `applicationinsights` when the two are used side-by-side. For folks who are using both an Azure Client Library (and transitively, `@azure/core-tracing`) and Application Insights in the same application, we recommend using the same version of OpenTelemetry for both libraries by upgrading to their latest versions.

> Please note that we do not foresee any future compatibility concerns now that OpenTelemetry 1.0.0 has been released and the API considered stable.

#### Compatibility Matrix

| Core Tracing     | Application Insights | @opentelemetry/api |
| ---------------- | -------------------- | ------------------ |
| 1.0.0-preview.10 |                      | 0.10.2             |
| 1.0.0-preview.11 | 2.1.0-2.1.3          | 1.0.0-rc.0         |
| 1.0.0-preview.12 | ^2.1.4               | ^1.0.0             |
| 1.0.0-preview.13 | ^2.1.4               | ^1.0.0             |

Please see the [troubleshooting](#troubleshooting) section for additional information about handling compatibility errors.

## Examples

### Enabling tracing using OpenTelemetry

```ts
const opentelemetry = require("@opentelemetry/api");
const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/tracing");

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

// Call some client library methods using automatic span propagation.
```

### Manual Span Propagation using OpenTelemetry

```ts
const opentelemetry = require("@opentelemetry/api");
// Get a tracer from a registered provider, create a span, and get the current context
const tracer = opentelemetry.trace.getTracer("my-tracer");
const span = tracer.startSpan("main");
const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), span);

// Assuming we have an existing BlobClient, let's see if the blob exists.
// The context is passed to the client library as a tracingContext option and will be propagated downstream to any child spans.
const result = await blobClient.exists({
  tracingOptions: {
    tracingContext: ctx
  }
});
```

## Next steps

You can build and run the tests locally by executing `rushx test`. Explore the `test` folder to see advanced usage and behavior of the public classes.

## Troubleshooting

If you run into issues while using this library, please feel free to [file an issue](https://github.com/Azure/azure-sdk-for-js/issues/new).

### OpenTelemetry Compatibility Errors

Errors such as `span.spanContext is not a function` or `span.context is not a function` are likely due to a mismatch of OpenTelemetry versions between two libraries.

To resolve this, please ensure that all Azure client libraries are using a compatible version of OpenTelemetry as per the [compatibility matrix](#compatibility-matrix). If you are using `applicationinsights` please ensure that you are using the same version of OpenTelemetry as the Azure client libraries.

> Ideally you'd want to use OpenTelemetry 1.0.0 or higher.

- If you are using `npm` you may run `npm ls @opentelemetry/api` to see the version of OpenTelemetry you are using and which client libraries are using it.
- For `yarn` users, `yarn why @opentelemetry/api` will show you the version of OpenTelemetry you are using and which client libraries are using it.

You may then upgrade client libraries as needed to ensure compatibility. Things should work as expected when the above command returns a version of OpenTelemetry that is >= 1.0.0.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcore%2Fcore-tracing%2FREADME.png)

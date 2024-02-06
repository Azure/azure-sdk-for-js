# Azure OpenTelemetry Instrumentation library for JavaScript

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].
- The [@opentelemetry/instrumentation][otel_instrumentation] package.

You'll need to configure the OpenTelemetry SDK in order to produce Telemetry data. While configuring OpenTelemetry is outside the scope of this README, we encourage you to review the [OpenTelemetry documentation][otel_documentation] in order to get started using OpenTelemetry.

### Install the `@azure/opentelemetry-instrumentation-azure-sdk` package

Install the Azure OpenTelemetry Instrumentation client library with `npm`:

```bash
npm install @azure/opentelemetry-instrumentation-azure-sdk
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

- The **createAzureSdkInstrumentation** function is the main hook exported by this library which provides a way to create an Azure SDK Instrumentation object to be registered with OpenTelemetry.

## Examples

### Enable OpenTelemetry instrumentation

```javascript
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { createAzureSdkInstrumentation } = require("@azure/opentelemetry-instrumentation-azure-sdk");

// Set-up and configure a Node Tracer Provider using OpenTelemetry
const opentelemetry = require("@opentelemetry/api");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/tracing");

const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();

registerInstrumentations({
  instrumentations: [createAzureSdkInstrumentation()],
});

// Continue to import any Azure SDK client libraries after registering the instrumentation.

const { KeyClient } = require("@azure/keyvault-keys");
const keyClient = new KeyClient(url, new DefaultAzureCredential()); 

async function main() {
  // Tracing is now enabled using automatic span propagation with an active context.
  await keyClient.getKey("MyKeyName");

  // If your scenario requires manual span propagation, all Azure client libraries
  // support explicitly passing a parent context via an `options` parameter.
  // Get a tracer from a registered provider, create a span, and get the current context.
  const tracer = opentelemetry.trace.getTracer("my-tracer");
  const span = tracer.startSpan("main");
  const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), span);

  await keyClient.getKey("MyKeyName", {
    tracingOptions: {
      // ctx will be used as the parent context for all operations.
      tracingContext: ctx,
    },
  });
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftemplate%2Ftemplate%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[otel_instrumentation]: https://www.npmjs.com/package/@opentelemetry/instrumentation
[otel_documentation]: https://opentelemetry.io/docs/js/

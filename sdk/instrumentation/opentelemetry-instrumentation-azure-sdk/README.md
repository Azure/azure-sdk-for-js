# Azure OpenTelemetry Instrumentation library for JavaScript

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].
- Node.js >=22.15.0 when running on Node.js.
- OpenTelemetry SDK 3.x, API 1.10.x, and SDK-generation 0.300.x experimental packages.
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

```ts snippet:enable_instrumentation
import { NodeSDK } from "@opentelemetry/sdk-node";
import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace";
import { createAzureSdkInstrumentation } from "@azure/opentelemetry-instrumentation-azure-sdk";
import { trace, context } from "@opentelemetry/api";

// Configure and start the SDK before importing any Azure client libraries.
const sdk = new NodeSDK({
  spanProcessors: [new SimpleSpanProcessor({ exporter: new ConsoleSpanExporter() })],
  instrumentations: [createAzureSdkInstrumentation()],
});
sdk.start();

const { KeyClient } = await import("@azure/keyvault-keys");
const { DefaultAzureCredential } = await import("@azure/identity");

const keyClient = new KeyClient("https://my.keyvault.azure.net", new DefaultAzureCredential());

// Tracing is now enabled using automatic span propagation with an active context.
await keyClient.getKey("MyKeyName");

// If your scenario requires manual span propagation, all Azure client libraries
// support explicitly passing a parent context via an `options` parameter.
// Get a tracer from a registered provider, create a span, and get the current context.
const tracer = trace.getTracer("my-tracer");
const span = tracer.startSpan("main");
const ctx = trace.setSpan(context.active(), span);

try {
  await keyClient.getKey("MyKeyName", {
    tracingOptions: {
      // ctx will be used as the parent context for all operations.
      tracingContext: ctx,
    },
  });
} finally {
  span.end();
  await sdk.shutdown();
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:logging
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

### Instrumentation for ES Modules

CommonJS and native ES modules are supported. Initialize telemetry before loading Azure clients.
For native ESM, register the OpenTelemetry loader before the application is evaluated:

```js
// loader.mjs
import { register } from "node:module";
register("@opentelemetry/instrumentation/hook.mjs", import.meta.url);
```

```sh
node --import ./loader.mjs --import ./instrumentation.mjs ./app.mjs
```

`instrumentation.mjs` configures the SDK and registers `createAzureSdkInstrumentation()`.
The loader and all loader-based instrumentations must resolve the same physical
`import-in-the-middle` instance; an SDK 3 dependency alignment permits sharing with other
SDK-generation 0.300.x instrumentations. Successful imports alone do not prove that Azure
operation spans are emitted. See the [OpenTelemetry ESM guide](https://github.com/open-telemetry/opentelemetry-js/blob/main/doc/esm-support.md)
for loader configuration details.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[otel_instrumentation]: https://www.npmjs.com/package/@opentelemetry/instrumentation
[otel_documentation]: https://opentelemetry.io/docs/languages/js/

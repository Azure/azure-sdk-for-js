# Azure Azure Digital Twins Core client library for JavaScript

This package contains an isomorphic SDK for Azure Digital Twins API to provide access to the Azure Digital Twins service for managing twins, models, relationships, etc.

## Getting started

### Currently supported environments

- Node.js version 6.x.x or higher
- Browser JavaScript

### Prerequisites

- An [Azure Digital Twins instance](https://docs.microsoft.com/azure/digital-twins/how-to-set-up-instance-portal).

### Install the `@azure/digital-twins-core` package

Install the Digital Twins Core client library for JavaScript with `npm`:

```bash
npm install @azure/digital-twins-core
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

#### CORS

Azure Digital Twins doesn't currently support Cross-Origin Resource Sharing (CORS). As a result, this library cannot be used to make direct calls to the template service from a browser. Please refer to [this document](https://github.com/Azure/azure-sdk-for-js/blob/master/samples/cors/ts/README.md) for guidance.

## Key concepts

### Azure Digital Twins

Azure Digital Twins is an Azure IoT service that creates comprehensive models of the physical environment. It can create spatial intelligence graphs to model the relationships and interactions between people, spaces, and devices.
You can learn more about Azure Digital Twins by visiting [Azure Digital Twins Documentation](https://docs.microsoft.com/azure/digital-twins/)

### `DigitalTwinsClient`

`DigitalTwinsClient` is the client object that users of this library use to manage their Azure Digital Twins instance.

## Examples

### TypeScript example for authentication, client creation and listing models in an Azure Digital Twins instance.

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { inspect } from "util";

async function main() {
  const url = "<URL to Azure Digital Twins instance>";

  // DefaultAzureCredential is provided by @azure/identity. It supports
  // different authentication mechanisms and determines the appropriate
  // credential type based of the environment it is executing in. See
  // https://www.npmjs.com/package/@azure/identity for more information on
  // authenticating with DefaultAzureCredential or other implementations of
  // TokenCredential.
  const credential = new DefaultAzureCredential();
  const serviceClient = new DigitalTwinsClient(url, credential);

  // List models
  const models = serviceClient.listModels();
  for await (const model of models) {
    console.log(`Model:`);
    console.log(inspect(model));
  }
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
```

### Additional Examples

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/digitaltwins/digital-twins-core/samples)
directory for additional examples on how to use this library.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

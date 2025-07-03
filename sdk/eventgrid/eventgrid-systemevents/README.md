# Azure SystemEvents client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure SystemEvents client.

Azure Messaging EventGrid SystemEvents

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventgrid/eventgrid-systemevents)
- [Package (NPM)](https://www.npmjs.com/package/@azure/eventgrid-systemevents)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/eventgrid-systemevents?view=azure-node-preview)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/eventgrid-systemevents` package

Install the Azure SystemEvents client library for JavaScript with `npm`:

```bash
npm install @azure/eventgrid-systemevents
```



### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### SystemEventsClient

`SystemEventsClient` is the primary interface for developers using the Azure SystemEvents client library. Explore the methods on this client object to understand the different features of the Azure SystemEvents service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts 
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).


## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential

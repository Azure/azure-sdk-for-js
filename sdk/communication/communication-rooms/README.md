# Azure RoomsApi client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure RoomsApi client.

Communication Rooms Client

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-rooms) |
[Package (NPM)](https://www.npmjs.com/package/@azure/communication-rooms) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/communication-rooms?view=azure-node-preview) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-rooms/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge and Firefox.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/communication-rooms` package

Install the Azure RoomsApi client library for JavaScript with `npm`:

```bash
npm install @azure/communication-rooms
```



### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### RoomsApiClient

`RoomsApiClient` is the primary interface for developers using the Azure RoomsApi client library. Explore the methods on this client object to understand the different features of the Azure RoomsApi service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-rooms/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-rooms%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential

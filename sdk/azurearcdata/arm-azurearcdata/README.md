# AzureArcData client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for AzureArcData client.

The AzureArcData management API provides a RESTful set of web APIs to manage Azure Data Services on Azure Arc Resources.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azurearcdata/arm-azurearcdata)
- [Package (NPM)](https://www.npmjs.com/package/@azure/arm-arcdata)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/arm-arcdata?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azurearcdata/arm-azurearcdata/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/arm-arcdata` package

Install the AzureArcData client library for JavaScript with `npm`:

```bash
npm install @azure/arm-arcdata
```

### Create and authenticate a `AzureArcDataClient`

To create a client object to access the AzureArcData API, you will need the `endpoint` of your AzureArcData resource and a `credential`. The AzureArcData client can use Microsoft Entra credentials to authenticate.
You can find the endpoint for your AzureArcData resource in the [Azure Portal][azure_portal].

You can authenticate with Microsoft Entra ID using a credential from the [@azure/identity][azure_identity] library or [an existing Microsoft Entra token](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new Microsoft Entra application and grant access to AzureArcData** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).

For more information about how to create a Microsoft Entra application check out [this guide](https://learn.microsoft.com/entra/identity-platform/howto-create-service-principal-portal).

Using Node.js and Node-like environments, you can use the `DefaultAzureCredential` class to authenticate the client.

```ts snippet:ReadmeSampleCreateClient_Node
import { AzureArcDataClient } from "@azure/arm-arcdata";
import { DefaultAzureCredential } from "@azure/identity";

const subscriptionId = "00000000-0000-0000-0000-000000000000";
const client = new AzureArcDataClient(new DefaultAzureCredential(), subscriptionId);
```

For browser environments, use the `InteractiveBrowserCredential` from the `@azure/identity` package to authenticate.

```ts snippet:ReadmeSampleCreateClient_Browser
import { InteractiveBrowserCredential } from "@azure/identity";
import { AzureArcDataClient } from "@azure/arm-arcdata";

const credential = new InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>",
});
const subscriptionId = "00000000-0000-0000-0000-000000000000";
const client = new AzureArcDataClient(credential, subscriptionId);
```


### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### AzureArcDataClient

`AzureArcDataClient` is the primary interface for developers using the AzureArcData client library. Explore the methods on this client object to understand the different features of the AzureArcData service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azurearcdata/arm-azurearcdata/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential

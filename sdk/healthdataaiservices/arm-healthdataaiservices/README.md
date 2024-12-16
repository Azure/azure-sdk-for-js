# Azure HealthDataAIServices client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure HealthDataAIServices client.



Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthdataaiservices/arm-healthdataaiservices)
- [Package (NPM)](https://www.npmjs.com/package/@azure/arm-healthdataaiservices)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure/arm-healthdataaiservices?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/arm-healthdataaiservices` package

Install the Azure HealthDataAIServices client library for JavaScript with `npm`:

```bash
npm install @azure/arm-healthdataaiservices
```

### Create and authenticate a `HealthDataAIServicesClient`

To create a client object to access the Azure HealthDataAIServices API, you will need the `endpoint` of your Azure HealthDataAIServices resource and a `credential`. The Azure HealthDataAIServices client can use Azure Active Directory credentials to authenticate.
You can find the endpoint for your Azure HealthDataAIServices resource in the [Azure Portal][azure_portal].

You can authenticate with Azure Active Directory using a credential from the [@azure/identity][azure_identity] library or [an existing AAD Token](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new AAD application and grant access to Azure HealthDataAIServices** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).

For more information about how to create an Azure AD Application check out [this guide](https://docs.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal).

```javascript
const { HealthDataAIServicesClient } = require("@azure/arm-healthdataaiservices");
const { DefaultAzureCredential } = require("@azure/identity");
// For client-side applications running in the browser, use InteractiveBrowserCredential instead of DefaultAzureCredential. See https://aka.ms/azsdk/js/identity/examples for more details.

const subscriptionId = "00000000-0000-0000-0000-000000000000";
const client = new HealthDataAIServicesClient(new DefaultAzureCredential(), subscriptionId);

// For client-side applications running in the browser, use this code instead:
// const credential = new InteractiveBrowserCredential({
//   tenantId: "<YOUR_TENANT_ID>",
//   clientId: "<YOUR_CLIENT_ID>"
// });
// const client = new HealthDataAIServicesClient(credential, subscriptionId);
```


### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### HealthDataAIServicesClient

`HealthDataAIServicesClient` is the primary interface for developers using the Azure HealthDataAIServices client library. Explore the methods on this client object to understand the different features of the Azure HealthDataAIServices service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/healthdataaiservices/arm-healthdataaiservices/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential

# Azure ContainerServiceDeploymentSafeguards client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure ContainerServiceDeploymentSafeguards client.

Azure Kubernetes Service Deployment Safeguards API Client.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicesafeguards)
- [Package (NPM)](https://www.npmjs.com/package/@azure/arm-containerservicesafeguards)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/arm-containerservicesafeguards?view=azure-node-preview)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicesafeguards/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/arm-containerservicesafeguards` package

Install the Azure ContainerServiceDeploymentSafeguards client library for JavaScript with `npm`:

```bash
npm install @azure/arm-containerservicesafeguards
```

### Create and authenticate a `ContainerServiceClient`

To create a client object to access the Azure ContainerServiceDeploymentSafeguards API, you will need the `endpoint` of your Azure ContainerServiceDeploymentSafeguards resource and a `credential`. The Azure ContainerServiceDeploymentSafeguards client can use Azure Active Directory credentials to authenticate.
You can find the endpoint for your Azure ContainerServiceDeploymentSafeguards resource in the [Azure Portal][azure_portal].

You can authenticate with Azure Active Directory using a credential from the [@azure/identity][azure_identity] library or [an existing AAD Token](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new AAD application and grant access to Azure ContainerServiceDeploymentSafeguards** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).

For more information about how to create an Azure AD Application check out [this guide](https://learn.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal).

Using Node.js and Node-like environments, you can use the `DefaultAzureCredential` class to authenticate the client.

```ts snippet:ReadmeSampleCreateClient_Node
import { ContainerServiceClient } from "@azure/arm-containerservicesafeguards";
import { DefaultAzureCredential } from "@azure/identity";

const client = new ContainerServiceClient(new DefaultAzureCredential());
```

For browser environments, use the `InteractiveBrowserCredential` from the `@azure/identity` package to authenticate.

```ts snippet:ReadmeSampleCreateClient_Browser
import { InteractiveBrowserCredential } from "@azure/identity";
import { ContainerServiceClient } from "@azure/arm-containerservicesafeguards";

const credential = new InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>",
});
const client = new ContainerServiceClient(credential);
```


### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### ContainerServiceClient

`ContainerServiceClient` is the primary interface for developers using the Azure ContainerServiceDeploymentSafeguards client library. Explore the methods on this client object to understand the different features of the Azure ContainerServiceDeploymentSafeguards service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservicesafeguards/samples) directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential

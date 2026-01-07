# Azure Batch client library for JavaScript

This package contains an isomorphic SDK (runs both in Node.js and in browsers) for Azure Batch client.

Azure Batch provides Cloud-scale job scheduling and compute management.

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].

### Install the `@azure/batch` package

Install the Azure Batch client library for JavaScript with `npm`:

```bash
npm install @azure/batch
```

### Create and authenticate a `BatchClient`

To create a client object to access the Azure Batch API, you will need the `endpoint` of your Azure Batch resource and a `credential`. The Azure Batch client can use Azure Active Directory credentials to authenticate.
You can find the endpoint for your Azure Batch resource in the [Azure Portal][azure_portal].

Azure batch supports authentication either via Microsoft Entra ID or Shared Key.

- [Microsoft Entra ID](#microsoft-entra-id)
- [Shared Key](#shared-key)

#### Microsoft Entra ID

You can authenticate with Azure Entra ID using a credential from the [@azure/identity][azure_identity] library or [an existing AAD Token](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token).

To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new AAD application and grant access to Azure Batch** by assigning the suitable role to your service principal (note: roles such as `"Owner"` will not grant the necessary permissions).

For more information about how to create an Azure AD Application check out [this guide](https://learn.microsoft.com/azure/active-directory/develop/howto-create-service-principal-portal).

Using Node.js and Node-like environments, you can use the `DefaultAzureCredential` class to authenticate the client.

```ts snippet:ReadmeSampleCreateClient_Node_EntraID
import { BatchClient } from "@azure-rest/batch";
import { DefaultAzureCredential } from "@azure/identity";

const client = new BatchClient("<endpoint>", new DefaultAzureCredential());
```

For browser environments, use the `InteractiveBrowserCredential` from the `@azure/identity` package to authenticate.

```ts snippet:ReadmeSampleCreateClient_Browser
import { InteractiveBrowserCredential } from "@azure/identity";
import { BatchClient } from "@azure-rest/batch";

const credential = new InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>"
 });
const client = new BatchClient("<endpoint>", credential);
```

#### Shared Key

To use shared key to authenticate, you must first `npm` install [`@azure/core-auth`](https://www.npmjs.com/package/@azure/core-auth), then provide the account name and account key to construct the an `AzureNamedKeyCredential` credential from `@azure/core-auth`.

Noted that Share Key authentication is only supported in Node.js and Node-like environments.

```ts snippet:ReadmeSampleCreateClient_Node_SharedKey
import { AzureNamedKeyCredential } from "@azure/core-auth";
import { BatchClient } from "@azure-rest/batch";

const credential = new AzureNamedKeyCredential("<account name>", "<account key>");
const client = new BatchClient("<endpoint>", credential);
```

### JavaScript Bundle
To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### BatchClient

`BatchClient` is the primary interface for developers using the Azure Batch client library. Explore the methods on this client object to understand the different features of the Azure Batch service that you can access.

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
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

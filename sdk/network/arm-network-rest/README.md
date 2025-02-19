# Azure NetworkManagement REST client library for JavaScript

Network Management Rest Client

**If you are not familiar with our REST client, please spend 5 minutes to take a look at our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library, the REST client provides a light-weighted & developer friendly way to call azure rest api**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/network/arm-network-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/arm-network)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure-rest/arm-network?view=azure-node-preview)
- [Samples](https://github.com/Azure-Samples/azure-samples-js-management)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/arm-network` package

Install the Azure NetworkManagement client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/arm-network
```

### Create and authenticate a `NetworkManagementClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity)

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

Use the returned token credential to authenticate the client:

```ts snippet:ReadmeSampleCreateClient_Node
import { DefaultAzureCredential } from "@azure/identity";
import NetworkManagementClient from "@azure-rest/arm-network";

const credential = new DefaultAzureCredential();
const client = NetworkManagementClient(credential);
```

## Examples

The following section shows you how to initialize and authenticate your client, then list all of your Virtual Networks within a resource group.

### List virtual networks within a resource group

```ts snippet:ReadmeSampleListVirtualNetworks
import { DefaultAzureCredential } from "@azure/identity";
import NetworkManagementClient, {
  VirtualNetworksListParameters,
  paginate,
} from "@azure-rest/arm-network";

const credential = new DefaultAzureCredential();
const client = NetworkManagementClient(credential);

const subscriptionId = "";
const resourceGroupName = "rg1";
const options: VirtualNetworksListParameters = {
  queryParameters: { "api-version": "2022-05-01" },
};

const initialResponse = await client
  .path(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks",
    subscriptionId,
    resourceGroupName,
  )
  .get(options);

const pageData = paginate(client, initialResponse);
for await (const page of pageData.byPage()) {
  for await (const item of page) {
    console.log(`Virtual Network: ${item}`);
  }
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

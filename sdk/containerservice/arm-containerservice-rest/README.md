# Azure ContainerService client library for JavaScript

Container Service Client

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerservice/arm-containerservice-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/arm-containerservice)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/arm-containerservice?view=azure-node-preview)
- [Samples](https://github.com/Azure-Samples/azure-samples-js-management)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/arm-containerservice` package

Install the Azure ContainerService client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/arm-containerservice
```

### Create and authenticate a `ContainerServiceClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

## Examples

The following section shows you how to initialize and authenticate your client, then list all of your Managed Clusters.

### List All Managed Clusters

```typescript
import ContainerServiceManagementClient, { paginate } from "@azure-rest/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

async function listManagedClusters() {
  const subscriptionId = process.env.SUBSCRIPTION_ID as string;
  const credential = new DefaultAzureCredential();
  const client = ContainerServiceManagementClient(credential);
  const initialResponse = await client.path(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedClusters",
    subscriptionId
  ).get();
  const result = paginate(client, initialResponse);
  const resArray = new Array();
  for await (let item of result) {
    resArray.push(item);
  }
  console.log(resArray);
}

listManagedClusters().catch(console.error);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

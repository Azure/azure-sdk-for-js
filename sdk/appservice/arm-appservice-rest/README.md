# Azure WebSitemManagement REST client library for JavaScript

App Service Client

**If you are not familiar with our REST client, please spend 5 minutes to take a look at our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library, the REST client provides a light-weighted & developer friendly way to call azure rest api**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/appservice/arm-appservice-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/arm-appservice)
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure-rest/arm-appservice)

## Getting started

### Currently supported environments

- Node.js version 14.x.x or higher

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/arm-appservice` package

Install the Azure WebSiteManagement client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/arm-appservice
```

### Create and authenticate a `WebSiteManagementClient`

To use an [Azure Active Directory (AAD) token credential](https://docs.microsoft.com/azure/databricks/dev-tools/api/latest/aad/app-aad-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client:

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

Use the returned token credential to authenticate the client:

```typescript
import WebSiteManagementClient from "@azure-rest/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
const credential = new DefaultAzureCredential();
const client = WebSiteManagementClient(credential);
```

## Examples

The following section shows you how to initialize and authenticate your client, then list all of your App Service Plans.

### List All App Service Plans

```typescript
import WebSiteManagementClient, { paginate }  from "@azure-rest/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

async function listAppServicePlans() {
  const subscriptionId = process.env.SUBSCRIPTION_ID as string;
  const credential = new DefaultAzureCredential();
  const client = WebSiteManagementClient(credential);
  const result = [];
  const initialResposne = await client
    .path("/subscriptions/{subscriptionId}/providers/Microsoft.Web/serverfarms", subscriptionId)
    .get();
  const res = paginate(client, initialResposne);
  for await (let item of res) {
    result.push(item);
  }
  console.log(result);
}

listAppServicePlans().catch(console.error);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

# Azure OnlineExperimentation REST client library for JavaScript

Azure Online Experimentation Service

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/onlineexperimentation/onlineexperimentation-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/onlineexperimentation)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/onlineexperimentation` package

Install the Azure OnlineExperimentation REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/onlineexperimentation
```

### Create and authenticate a `OnlineExperimentationClient`

The Azure Online Experimentation client library initialization requires two parameters:

- The `endpoint` property value from the [`Microsoft.OnlineExperimentation/workspaces`](https://learn.microsoft.com/azure/templates/microsoft.onlineexperimentation/workspaces) resource.
- A `TokenCredential` for authentication, the simplest approach is to use [`DefaultAzureCredential`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential) from the `@azure/identity` library.

```ts snippet:InitializeClient
import { DefaultAzureCredential } from "@azure/identity";
import { OnlineExperimentationClient } from "@azure-rest/onlineexperimentation";

const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
const credential = new DefaultAzureCredential();
// Initialize a client with default API version
const client = OnlineExperimentationClient(endpoint, credential);
```

## Examples

- Full set of [examples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/onlineexperimentation/onlineexperimentation-rest/EXAMPLES.md) demonstrating individual API operations.
- Example demonstrating experiment metrics management lifecycle: [TypeScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/onlineexperimentation/onlineexperimentation-rest/samples/v1-beta/typescript/README.md) and [JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/onlineexperimentation/onlineexperimentation-rest/samples/v1-beta/javascript/README.md).

### Quick Start - Initialize Client and List Experiment Metrics

The Azure OnlineExperimentation REST client library initialization requires two parameters:

- The `endpoint` property value from the [`Microsoft.OnlineExperimentation/workspaces`](https://learn.microsoft.com/azure/templates/microsoft.onlineexperimentation/workspaces) resource.
- A `TokenCredential` for authentication, the simplest approach is to use [`DefaultAzureCredential`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md#defaultazurecredential).

```ts snippet:ListExperimentMetrics
import { DefaultAzureCredential } from "@azure/identity";
import {
  OnlineExperimentationClient,
  isUnexpected,
  paginate,
} from "@azure-rest/onlineexperimentation";

const endpoint = process.env.AZURE_ONLINEEXPERIMENTATION_ENDPOINT || "<endpoint>";
const credential = new DefaultAzureCredential();
const client = OnlineExperimentationClient(endpoint, credential);
const listResponse = await client.path("/experiment-metrics").get({
  queryParameters: {
    top: 10,
    skip: 0,
  },
});
if (isUnexpected(listResponse)) {
  throw listResponse;
}
for await (const metric of paginate(client, listResponse)) {
  // Access metric properties
  const id = metric.id;
  const name = metric.displayName;
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

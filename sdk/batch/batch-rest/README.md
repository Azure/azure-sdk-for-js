# Azure Batch REST client library for JavaScript

Azure Batch provides Cloud-scale job scheduling and compute management.

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

TODO: Add links back when the package is published

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Install the `@azure-rest/batch` package

Install the Azure Batch REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/batch
```

### Create and authenticate a `BatchClient`

Azure batch supports authentication either via Microsoft Entra ID or Shared Key.

- [Microsoft Entra ID](#microsoft-entra-id)
- [Shared Key](#shared-key)

#### Microsoft Entra ID

To use an [Microsoft Entra ID token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with Microsoft Entra ID, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity)

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the Microsoft Entra ID application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

#### Shared Key

To use shared key to authenticate, you must first `npm` install [`@azure/core-auth`](https://www.npmjs.com/package/@azure/core-auth), then provide the account name and account key to construct the an `AzureNamedKeyCredential` credential from `@azure/core-auth`

```typescript
import { AzureNamedKeyCredential } from "@azure/core-auth";
import createClient from "@azure-rest/batch";

const credential = new AzureNamedKeyCredential("<account name>", "<account key>");
const batchClient = createClient("<account endpoint>", credential);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

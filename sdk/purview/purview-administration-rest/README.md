# Azure Purview Administration REST client library for JavaScript

Azure Purview data plane administration. It supports data plane operations. It can manage account, collections, keys, resource set rule, metadata policy, metadata roles.

## Azure Purview Metadata Policies

**Please rely heavily on the [service's documentation][account_product_documentation] and our [REST client docs][rest_client] to use this library**

Key links:

- [Source code][source_code]
- [Package (NPM)][account_npm]
- [API reference documentation][account_ref_docs]
- [Product documentation][account_product_documentation]

## Getting started

### Currently supported environments

- Node.js version 14.x.x or higher

### Prerequisites

- You must have an [Azure subscription][azure_subscription] and a [Purview][purview_resource] to use this package.

#### Create a Purview Resource

Follow [these][purview_resource] instructions to create your Purview resource

### Install the `@azure-rest/purview-account` package

Install the Azure Purview Account client library for JavaScript with `npm`:

```bash
npm install @azure-rest/purview-account
```

### Create and authenticate a `PurviewAccount`

To use an [Azure Active Directory (AAD) token credential][authenticate_with_token],
provide an instance of the desired credential type obtained from the
[@azure/identity][azure_identity_credentials] library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`][azure_identity_npm] and
[enable AAD authentication on your Purview resource][enable_aad]

After setup, you can choose which type of [credential][azure_identity_credentials] from `@azure/identity` to use.
As an example, [DefaultAzureCredential][default_azure_credential]
can be used to authenticate the client:

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

Use the returned token credential to authenticate the client:

```typescript
import {
  PurviewAccountClient,
  PurviewMetadataPoliciesClient,
} from "@azure-rest/purview-administration";
import { DefaultAzureCredential } from "@azure/identity";
const accountClient = PurviewAccountClient(
  "https://<my-account-name>.purview.azure.com",
  new DefaultAzureCredential()
);

const metadataClient = PurviewAccountClient(
  "https://<my-account-name>.purview.azure.com",
  new DefaultAzureCredential()
);
```

## Key concepts

### REST Client

This client is one of our REST clients. We highly recommend you read how to use a REST client [here][rest_client].

## Examples

The following section shows you how to initialize and authenticate your client, then get all of your type-defs.

- [Get A List of Collections](#get-a-list-of-collections "Get A List of Collections")

```typescript
import { PurviewAccountClient } from "@azure-rest/purview-administration";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== List collections sample ==");
  const client = PurviewAccountClient(endpoint, new DefaultAzureCredential());

  const response = await client.path("/collections").get();

  if (response.status !== "200") {
    console.log(`GET "/collections" failed with ${response.status}`);
  }

  console.log(response.body);
}

main().catch(console.error);
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fpurview%2Fpurview-account-rest%2FREADME.png)

[account_product_documentation]: https://azure.microsoft.com/services/purview/
[rest_client]: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md
[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-catalog-rest
[account_npm]: https://www.npmjs.com/org/azure-rest
[account_ref_docs]: https://azure.github.io/azure-sdk-for-js
[azure_subscription]: https://azure.microsoft.com/free/
[purview_resource]: https://docs.microsoft.com/azure/purview/create-catalog-portal
[authenticate_with_token]: https://docs.microsoft.com/azure/purview/tutorial-using-rest-apis#create-a-service-principal-application
[azure_identity_credentials]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials
[azure_identity_npm]: https://www.npmjs.com/package/@azure/identity
[enable_aad]: https://docs.microsoft.com/azure/purview/create-catalog-portal#add-a-security-principal-to-a-data-plane-role
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential

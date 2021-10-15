# Azure Purview Scanning Rest-Level client library for JavaScript

Azure Purview Scanning is a fully managed cloud service whose users can scan your data into your data estate (also known as your **catalog**). Scanning is a process by which the catalog connects directly to a data source on a user-specified schedule.

- Scan your data into your catalog
- Examine your data
- Extract schemas from your data

**Please rely heavily on the [service's documentation][scanning_product_documentation] and our [Rest client docs][rest_client] to use this library**

Key links:

- [Source code][source_code]
- [Package (NPM)][scanning_npm]
- [API reference documentation][scanning_ref_docs]
- [Product documentation][scanning_product_documentation]

## Getting started

### Currently supported environments

- Node.js version 14.x.x or higher

### Prerequisites

- You must have an [Azure subscription][azure_subscription] and a [Purview][purview_resource] to use this package.

#### Create a Purview Resource

Follow [these][purview_resource] instructions to create your Purview resource

### Install the `@azure-rest/purview-scanning` package

Install the Azure Purview Scanning client library for JavaScript with `npm`:

```bash
npm install @azure-rest/purview-scanning
```

### Create and authenticate a `PurviewScanning`

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
import PurviewScanning from "@azure-rest/purview-scanning";
import { DefaultAzureCredential } from "@azure/identity";
const client = PurviewScanning(
  "https://<my-account-name>.scan.purview.azure.com",
  new DefaultAzureCredential()
);
```

## Key concepts

### Rest Client

This client is one of our Rest clients. We highly recommend you read how to use a Rest client [here][rest_client].

## Examples

The following section shows you how to initialize and authenticate your client, then list all of your data sources.

- [List All Data Sources](#list-all-data-sources "List All Data Sources")

### List All Data Sources

```typescript
import PurviewScanning, { paginate, DataSource } from "@azure-rest/purview-scanning";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { DefaultAzureCredential } from "@azure/identity";

async function main() {
  console.log("== List dataSources ==");
  const client = PurviewScanning(
    "https://<my-account-name>.scan.purview.azure.com",
    new DefaultAzureCredential()
  );

  const dataSources = await client.path("/datasources").get();
  if (dataSources.status !== "200") {
    throw dataSources.body.error;
  }
  const iter = paginate(client, dataSources)

  const items: DataSource[] = [];

  for await (const item of <PagedAsyncIterableIterator<DataSource, (DataSource)[], PageSettings>>iter) {
    items.push(item);
  }

  console.log(items?.map((ds) => ds.name).join("\n"));
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fpurview%2Fpurview-scanning-rest%2FREADME.png)

<!-- LINKS -->

[scanning_product_documentation]: https://azure.microsoft.com/services/purview/
[rest_client]: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md
[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-scanning-rest
[scanning_npm]: https://www.npmjs.com/package/@azure-rest/purview-scanning
[scanning_ref_docs]: https://azure.github.io/azure-sdk-for-js
[azure_subscription]: https://azure.microsoft.com/free/
[purview_resource]: https://docs.microsoft.com/azure/purview/create-catalog-portal
[authenticate_with_token]: https://docs.microsoft.com/azure/cognitive-services/authentication?tabs=powershell#authenticate-with-an-authentication-token
[azure_identity_credentials]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials
[azure_identity_npm]: https://www.npmjs.com/package/@azure/identity
[enable_aad]: https://docs.microsoft.com/azure/purview/create-catalog-portal#add-a-security-principal-to-a-data-plane-role
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential

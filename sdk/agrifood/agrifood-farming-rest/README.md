# Azure FarmBeats REST client library for JavaScript

Azure FarmBeats is a business-to-business offering available in Azure Marketplace. It enables aggregation of agriculture data sets across providers. Azure FarmBeats enables you to build artificial intelligence (AI) or machine learning (ML) models based on fused data sets. By using Azure FarmBeats, agriculture businesses can focus on core value-adds instead of the undifferentiated heavy lifting of data engineering.

**Please rely heavily on the [service's documentation][product_documentation] and our [REST client docs][rest_client] to use this library**

[Source code][source_code] | [Package (NPM)][npm] | [API reference documentation][ref_docs]| [Product documentation][product_documentation]

## Getting started

### Currently supported environments

- Node.js version 14.x.x or higher

### Prerequisites

- You must have an [Azure subscription][azure_subscription] and a running instance of Azure FarmBeats.

### Install the `@azure-rest/agrifood-farming` package

Install the Azure Purview Catalog client library for JavaScript with `npm`:

```bash
npm install @azure-rest/agrifood-farming
```

### Create and authenticate a `FarmBeats`

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
import FarmBeats from "@azure-rest/agrifood-farming";
import { DefaultAzureCredential } from "@azure/identity";

const authority = "https://login.windows-ppe.net";

const client = FarmBeats(
  "https://<farmbeats resource name>.farmbeats-dogfood.azure.net",
  new DefaultAzureCredential({ authorityHost: authority })
);
```

## Key concepts

### REST Client

This client is one of our REST clients. We highly recommend you read how to use a REST client [here][rest_client].

## Examples

Please refer to the [samples folder][samples_folder]

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/logger).

## Next steps

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fpurview%2Fagrifood-farming-rest%2FREADME.png)

[product_documentation]: https://docs.microsoft.com/azure/industry/agriculture/overview-azure-farmbeats
[rest_client]: https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/rest-clients.md
[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/agrifood/agrifood-farming-rest
[npm]: https://www.npmjs.com/org/azure-rest
[ref_docs]: https://azure.github.io/azure-sdk-for-js
[azure_subscription]: https://azure.microsoft.com/free/
[farmbeats_resource]: https://docs.microsoft.com/azure/industry/agriculture/install-azure-farmbeats
[authenticate_with_token]: https://docs.microsoft.com/azure/cognitive-services/authentication?tabs=powershell#authenticate-with-an-authentication-token
[azure_identity_credentials]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#credentials
[azure_identity_npm]: https://www.npmjs.com/package/@azure/identity
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/identity/identity#defaultazurecredential

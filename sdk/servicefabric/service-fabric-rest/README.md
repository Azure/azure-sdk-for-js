# Azure Service Fabric REST client library for JavaScript

[Service Description]

**Please rely heavily on the [service's documentation][product_documentation] and our [REST client docs][rest_client] to use this library**

Key links:

- [Source code][source_code]
- [Package (NPM)][npm]
- [API reference documentation][ref_docs]
- [Product documentation][product_documentation]

## Getting started

### Currently supported environments

- Node.js version 14.x.x or higher

### Prerequisites

- You must have an [Azure subscription][azure_subscription] and a resource to use this package.

#### Create a Resource

Follow [these][resource] instructions to create your resource

### Install the `@azure-rest/service-fabric` package

Install the Azure Service Fabric client library for JavaScript with `npm`:

```bash
npm install @azure-rest/service-fabric
```

### Create and authenticate a ServiceFabric

To use an [Azure Active Directory (AAD) token credential][authenticate_with_token],
provide an instance of the desired credential type obtained from the
[@azure/identity][azure_identity_credentials] library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`][azure_identity_npm] and
[enable AAD authentication on your resource][enable_aad]

After setup, you can choose which type of [credential][azure_identity_credentials] from `@azure/identity` to use.
As an example, [DefaultAzureCredential][default_azure_credential]
can be used to authenticate the client:

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

Use the returned token credential to authenticate the client:

```typescript
import ServiceFabric from "@azure-rest/service-fabric";
import { DefaultAzureCredential } from "@azure/identity";
const client = ServiceFabric("<my-endpoint>", new DefaultAzureCredential());
```

## Key concepts

### REST Client

This client is one of our REST clients. We highly recommend you read how to use a REST client [here][rest_client].

## Examples

The following section shows you how to initialize and authenticate your client, then get all of your type-defs.

- [Get All Type Definitions](#get-all-type-definitions "Get All Type Definitions")

```typescript
import ServiceFabric from "@azure-rest/service-fabric";
import { DefaultAzureCredential } from "@azure/identity";

async function main() {
  const client = ServiceFabric(endpoint, new DefaultAzureCredential());

  const result = await client.path("<my-path>").get();

  if (result.status !== "200") {
    throw result;
  }

  console.log(result).join("\n"));
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

[product_documentation]: https://docs.microsoft.com/azure/service-fabric/
[rest_client]: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md
[source_code]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicefabric/service-fabric-rest
[npm]: https://www.npmjs.com/org/azure-rest
[ref_docs]: https://azure.github.io/azure-sdk-for-js
[azure_subscription]: https://azure.microsoft.com/free/
[resource]: https://docs.microsoft.com/azure/service-fabric/quickstart-managed-cluster-template
[authenticate_with_token]: https://docs.microsoft.com/azure/cognitive-services/authentication?tabs=powershell#authenticate-with-an-authentication-token
[azure_identity_credentials]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials
[azure_identity_npm]: https://www.npmjs.com/package/@azure/identity
[enable_aad]: https://docs.microsoft.com/azure/service-fabric/quickstart-managed-cluster-template
[default_azure_credential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential

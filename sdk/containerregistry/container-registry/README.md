# Azure Container Registry client library for JavaScript

Azure Container Registry allows you to store and manage container images and artifacts in a private registry for all types of container deployments.

Use the client library for Azure Container Registry to:

- List images or artifacts in a registry
- Obtain metadata for images and artifacts, repositories and tags
- Set read/write/delete properties on registry items
- Delete images and artifacts, repositories and tags

[Source code][source] |
[Package (NPM)][package] |
[API reference documentation][api_docs] |
[REST API documentation][rest_docs] |
[Product documentation][product_docs] |
[Samples][samples]

## Getting started

### Currently supported environments

- Node.js version 8.x or higher

### Prerequisites

You need an [Azure subscription][azure_sub] and a [Container Registry account][container_registry_docs] to use this package.

To create a new Container Registry, you can use the [Azure Portal][container_registry_create_portal],
[Azure PowerShell][container_registry_create_ps], or the [Azure CLI][container_registry_create_cli].
Here's an example using the Azure CLI:

```Powershell
az acr create --name MyContainerRegistry --resource-group MyResourceGroup --location westus --sku Basic
```

### Install the `@azure/container-registry` package

Install the Container Registry client library for JavaScript with `npm`:

```bash
npm install @azure/container-registry
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

### Authenticate the client

The [Azure Identity library][identity] provides easy Azure Active Directory support for authentication.

```javascript
const { ContainerRegistryClient } = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");

const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT;
// Create a ContainerRegistryClient that will authenticate through Active Directory
const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());
```

Note that these samples assume you have a `CONTAINER_REGISTRY_ENDPOINT` environment variable set, which is the URL including the name of the login server and the `https://` prefix.

For more information on using AAD with Azure Container Registry, please see the service's [Authentication Overview](https://docs.microsoft.com/azure/container-registry/container-registry-authentication).

## Key concepts

A **registry** stores Docker images and [OCI Artifacts](https://opencontainers.org/). An image or artifact consists of a **manifest** and **layers**. An image's manifest describes the layers that make up the image, and is uniquely identified by its **digest**. An image can also be "tagged" to give it a human-readable alias. An image or artifact can have zero or more **tags** associated with it, and each tag uniquely identifies the image. A collection of images that share the same name but have different tags, is referred to as a **repository**.

For more information please see [Container Registry Concepts](https://docs.microsoft.com/azure/container-registry/container-registry-concepts).

## Examples

### Listing repositories

Iterate through the collection of repositories in the registry.

```javascript
const { ContainerRegistryClient } = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential());

  console.log("Listing repositories");
  const iterator = client.listRepositoryNames();
  for await (const repository of iterator) {
    console.log(`  repository: ${repository}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

Please take a look at the [samples][samples] directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript][az_sdk_js]

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcontainerregistry%2Fcontainer-registry%2FREADME.png)

[azure_sub]: https://azure.microsoft.com/free/
[acr_resource]: https://ms.portal.azure.com/#create/Microsoft.ContainerRegistry
[source]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/containerregistry/container-registry/
[package]: https://www.npmjs.com/package/@azure/container-registry
[api_docs]: https://docs.microsoft.com/javascript/api/@azure/container-registry
[rest_docs]: https://docs.microsoft.com/rest/api/containerregistry/
[product_docs]: https://docs.microsoft.com/azure/container-registry/
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/containerregistry/container-registry/samples
[container_registry_docs]: https://docs.microsoft.com/azure/container-registry/container-registry-intro
[container_registry_create_ps]: https://docs.microsoft.com/azure/container-registry/container-registry-get-started-powershell
[container_registry_create_cli]: https://docs.microsoft.com/azure/container-registry/container-registry-get-started-azure-cli
[container_registry_create_portal]: https://docs.microsoft.com/azure/container-registry/container-registry-get-started-portal
[container_registry_concepts]: https://docs.microsoft.com/azure/container-registry/container-registry-concepts
[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[identity]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/README.md
[az_sdk_js]: https://github.com/Azure/azure-sdk-for-js

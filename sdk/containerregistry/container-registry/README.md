# Azure Container Registry client library for JavaScript

Azure Container Registry allows you to store and manage container images and artifacts in a private registry for all types of container deployments.

Use the client library for Azure Container Registry to:

- List images or artifacts in a registry
- Obtain metadata for images and artifacts, repositories and tags
- Set read/write/delete properties on registry items
- Delete images and artifacts, repositories and tags

Key links:

- [Source code][source]
- [Package (NPM)][package]
- [API reference documentation][api_docs]
- [REST API documentation][rest_docs]
- [Product documentation][product_docs]
- [Samples][samples]

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

> Note: This package cannot be used in the browser due to service limitations, please refer to [this document][cors] for guidance.

### Prerequisites

- An [Azure Subscription](https://azure.microsoft.com)
- A [Container Registry account][container_registry_docs]

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

### Authenticate the client

The [Azure Identity library][identity] provides easy Azure Active Directory support for authentication.

```javascript
const {
  ContainerRegistryClient,
  KnownContainerRegistryAudience
} = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");

const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT;
// Create a ContainerRegistryClient that will authenticate through Active Directory
const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
  audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud
});
```

Note that these samples assume you have a `CONTAINER_REGISTRY_ENDPOINT` environment variable set, which is the URL including the name of the login server and the `https://` prefix.

#### National Clouds

To authenticate with a registry in a [National Cloud](https://docs.microsoft.com/azure/active-directory/develop/authentication-national-cloud), you will need to make the following additions to your configuration:

- Set the `authorityHost` in the credential options or via the `AZURE_AUTHORITY_HOST` environment variable
- Set the `audience` in `ContainerRegistryClientOptions`

```javascript
const {
  ContainerRegistryClient,
  KnownContainerRegistryAudience
} = require("@azure/container-registry");
const { DefaultAzureCredential, AzureAuthorityHosts } = require("@azure/identity");

const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT;
// Create a ContainerRegistryClient that will authenticate through AAD in the China national cloud
const client = new ContainerRegistryClient(
  endpoint,
  new DefaultAzureCredential({ authorityHost: AzureAuthorityHosts.AzureChina }),
  {
    audience: KnownContainerRegistryAudience.AzureResourceManagerChina
  }
);
```

For more information on using AAD with Azure Container Registry, please see the service's [Authentication Overview](https://docs.microsoft.com/azure/container-registry/container-registry-authentication).

## Key concepts

A **registry** stores Docker images and [OCI Artifacts](https://opencontainers.org/). An image or artifact consists of a **manifest** and **layers**. An image's manifest describes the layers that make up the image, and is uniquely identified by its **digest**. An image can also be "tagged" to give it a human-readable alias. An image or artifact can have zero or more **tags** associated with it, and each tag uniquely identifies the image. A collection of images that share the same name but have different tags, is referred to as a **repository**.

For more information please see [Container Registry Concepts](https://docs.microsoft.com/azure/container-registry/container-registry-concepts).

## Examples

### Listing repositories

Iterate through the collection of repositories in the registry.

```javascript
const {
  ContainerRegistryClient,
  KnownContainerRegistryAudience
} = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  // endpoint should be in the form of "https://myregistryname.azurecr.io"
  // where "myregistryname" is the actual name of your registry
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
    audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud
  });

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

### List tags with anonymous access

```javascript
const {
  ContainerRegistryClient,
  KnownContainerRegistryAudience
} = require("@azure/container-registry");

async function main() {
  // Get the service endpoint from the environment
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";

  // Create a new ContainerRegistryClient for anonymous access
  const client = new ContainerRegistryClient(endpoint, {
    audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud
  });

  // Obtain a RegistryArtifact object to get access to image operations
  const image = client.getArtifact("library/hello-world", "latest");

  // List the set of tags on the hello_world image tagged as "latest"
  const tagIterator = image.listTagProperties();

  // Iterate through the image's tags, listing the tagged alias for the image
  console.log(`${image.fullyQualifiedReference}  has the following aliases:`);
  for await (const tag of tagIterator) {
    console.log(`  ${tag.registryLoginServer}/${tag.repositoryName}:${tag.name}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

### Set artifact properties

```javascript
const {
  ContainerRegistryClient,
  KnownContainerRegistryAudience
} = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  // Get the service endpoint from the environment
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";

  // Create a new ContainerRegistryClient and RegistryArtifact to access image operations
  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
    audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud
  });
  const image = client.getArtifact("library/hello-world", "v1");

  // Set permissions on the image's "latest" tag
  await image.updateTagProperties("latest", { canWrite: false, canDelete: false });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

### Delete images

```javascript
const {
  ContainerRegistryClient,
  KnownContainerRegistryAudience
} = require("@azure/container-registry");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  // Get the service endpoint from the environment
  const endpoint = process.env.CONTAINER_REGISTRY_ENDPOINT || "<endpoint>";
  // Create a new ContainerRegistryClient
  const client = new ContainerRegistryClient(endpoint, new DefaultAzureCredential(), {
    audience: KnownContainerRegistryAudience.AzureResourceManagerPublicCloud
  });

  // Iterate through repositories
  const repositoryNames = client.listRepositoryNames();
  for await (const repositoryName of repositoryNames) {
    const repository = client.getRepository(repositoryName);
    // Obtain the images ordered from newest to oldest by passing the `order` option
    const imageManifests = repository.listManifestProperties({
      order: "LastUpdatedOnDescending"
    });
    const imagesToKeep = 3;
    let imageCount = 0;
    // Delete images older than the first three.
    for await (const manifest of imageManifests) {
      imageCount++;
      if (imageCount > imagesToKeep) {
        const image = repository.getArtifact(manifest.digest);
        console.log(`Deleting image with digest ${manifest.digest}`);
        console.log(`  Deleting the following tags from the image:`);
        for (const tagName of manifest.tags) {
          console.log(`    ${manifest.repositoryName}:${tagName}`);
          image.deleteTag(tagName);
        }
        await image.delete();
      }
    }
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
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

## Next steps

Please take a look at the [samples][samples] directory for detailed examples that demonstrate how to use the client libraries.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript][az_sdk_js]

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcontainerregistry%2Fcontainer-registry%2FREADME.png)

[azure_sub]: https://azure.microsoft.com/free/
[acr_resource]: https://ms.portal.azure.com/#create/Microsoft.ContainerRegistry
[source]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/
[package]: https://www.npmjs.com/package/@azure/container-registry
[api_docs]: https://docs.microsoft.com/javascript/api/@azure/container-registry
[rest_docs]: https://docs.microsoft.com/rest/api/containerregistry/
[product_docs]: https://docs.microsoft.com/azure/container-registry/
[cors]: https://github.com/Azure/azure-sdk-for-js/blob/main/samples/cors/ts/README.md
[samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerregistry/container-registry/samples
[container_registry_docs]: https://docs.microsoft.com/azure/container-registry/container-registry-intro
[container_registry_create_ps]: https://docs.microsoft.com/azure/container-registry/container-registry-get-started-powershell
[container_registry_create_cli]: https://docs.microsoft.com/azure/container-registry/container-registry-get-started-azure-cli
[container_registry_create_portal]: https://docs.microsoft.com/azure/container-registry/container-registry-get-started-portal
[container_registry_concepts]: https://docs.microsoft.com/azure/container-registry/container-registry-concepts
[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[identity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md
[az_sdk_js]: https://github.com/Azure/azure-sdk-for-js

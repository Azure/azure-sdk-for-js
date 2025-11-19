---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-container-registry
urlFragment: container-registry-typescript
---

# Azure Container Registry client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Container Registry in some common scenarios.

| **File Name**                                         | **Description**                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [containerRegistryClient.ts][containerregistryclient] | Lists repository names and deletes a repository.                                           |
| [anonymousListTags.ts][anonymouslisttags]             | Lists tags for an image in a registry that enables anonymous pull access.                  |
| [deleteImages.ts][deleteimages]                       | Deletes all but the latest three images.                                                   |
| [repositoryAndArtifact.ts][repositoryandartifact]     | Uses ContainerRepository and RegistryArtifact to work with manifests, tags, and artifacts. |
| [setImageProperties.ts][setimageproperties]           | Updates the properties on the tag so it can't be overwritten or deleted.                   |
| [deleteBlob.ts][deleteblob]                           | Deletes the blobs associated with a given manifest from the repository.                    |
| [deleteManifest.ts][deletemanifest]                   | Deletes a given manifest from the repository.                                              |
| [downloadCustomManifest.ts][downloadcustommanifest]   | Downloads a manifest which may be of varying media type.                                   |
| [downloadImage.ts][downloadimage]                     | Downloads an image from the repository.                                                    |
| [uploadCustomManifest.ts][uploadcustommanifest]       | Uploads a manifest with custom manifest type, in this case a manifest list.                |
| [uploadImage.ts][uploadimage]                         | Uploads an image to the repository.                                                        |
| [uploadManifest.ts][uploadmanifest]                   | Uploads a manifest to a repository.                                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Container Registry][createinstance_azurecontainerregistry]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/containerRegistryClient.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env CONTAINER_REGISTRY_ENDPOINT="<container registry endpoint>" node dist/containerRegistryClient.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[containerregistryclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/containerRegistryClient.ts
[anonymouslisttags]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/anonymousListTags.ts
[deleteimages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/deleteImages.ts
[repositoryandartifact]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/repositoryAndArtifact.ts
[setimageproperties]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/setImageProperties.ts
[deleteblob]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/deleteBlob.ts
[deletemanifest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/deleteManifest.ts
[downloadcustommanifest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/downloadCustomManifest.ts
[downloadimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/downloadImage.ts
[uploadcustommanifest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/uploadCustomManifest.ts
[uploadimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/uploadImage.ts
[uploadmanifest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1/typescript/src/uploadManifest.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/container-registry
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecontainerregistry]: https://learn.microsoft.com/azure/container-registry/container-registry-get-started-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerregistry/container-registry/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

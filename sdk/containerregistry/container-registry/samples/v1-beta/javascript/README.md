---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-container-registry
urlFragment: container-registry-javascript-beta
---

# Azure Container Registry client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Container Registry in some common scenarios.

| **File Name**                                         | **Description**                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [containerRegistryClient.js][containerregistryclient] | Lists repository names and deletes a repository.                                           |
| [anonymousListTags.js][anonymouslisttags]             | Lists tags for an image in a registry that enables anonymous pull access.                  |
| [deleteImages.js][deleteimages]                       | Deletes all but the latest three images.                                                   |
| [repositoryAndArtifact.js][repositoryandartifact]     | Uses ContainerRepository and RegistryArtifact to work with manifests, tags, and artifacts. |
| [setImageProperties.js][setimageproperties]           | Updates the properties on the tag so it can't be overwritten or deleted.                   |
| [downloadImage.js][downloadimage]                     | Downloads an image from the repository.                                                    |
| [uploadImage.js][uploadimage]                         | Uploads an image to the repository.                                                        |
| [uploadManifest.js][uploadmanifest]                   | Uploads a manifest to a repository.                                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node containerRegistryClient.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env CONTAINER_REGISTRY_ENDPOINT="<container registry endpoint>" node containerRegistryClient.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[containerregistryclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1-beta/javascript/containerRegistryClient.js
[anonymouslisttags]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1-beta/javascript/anonymousListTags.js
[deleteimages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1-beta/javascript/deleteImages.js
[repositoryandartifact]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1-beta/javascript/repositoryAndArtifact.js
[setimageproperties]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1-beta/javascript/setImageProperties.js
[downloadimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1-beta/javascript/downloadImage.js
[uploadimage]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1-beta/javascript/uploadImage.js
[uploadmanifest]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerregistry/container-registry/samples/v1-beta/javascript/uploadManifest.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/container-registry
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecontainerregistry]: https://docs.microsoft.com/azure/container-registry/container-registry-get-started-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerregistry/container-registry/README.md

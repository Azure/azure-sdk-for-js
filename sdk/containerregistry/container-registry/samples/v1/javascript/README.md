---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-container-registry
urlFragment: container-registry-javascript
---

# Azure Container Registry client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Container Registry in some common scenarios.

| **File Name**                                         | **Description**                                                   |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| [containerRegistryClient.js][containerregistryclient] | Demonstrates the use of a ContainerRegistryClient.                |
| [repositoryAndArtifact.js][repositoryandartifact]     | Demonstrates the use of ContainerRepository and RegistryArtifact. |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

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
npx cross-env CONTAINERREGISTRY_REGISTRY_ENDPOINT="<containerregistry registry endpoint>" node containerRegistryClient.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[containerregistryclient]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/containerregistry/container-registry/samples/v1/javascript/containerRegistryClient.js
[repositoryandartifact]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/containerregistry/container-registry/samples/v1/javascript/repositoryAndArtifact.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/container-registry
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecontainerregistry]: https://docs.microsoft.com/azure/container-registry/container-registry-get-started-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/containerregistry/container-registry/README.md

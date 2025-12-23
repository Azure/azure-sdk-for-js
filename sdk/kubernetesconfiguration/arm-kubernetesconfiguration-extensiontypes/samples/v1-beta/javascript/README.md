# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [extensionTypesClusterGetVersionSample.js][extensiontypesclustergetversionsample]     | Get details of a version for an Extension Type installable to the cluster. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/GetExtensionTypeVersion.json         |
| [extensionTypesClusterListVersionsSample.js][extensiontypesclusterlistversionssample] | List the version for an Extension Type installable to the cluster. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/ListExtensionTypeVersions.json               |
| [extensionTypesGetSample.js][extensiontypesgetsample]                                 | Get an Extension Type installable to the cluster based region and type for the cluster. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/GetExtensionType.json   |
| [extensionTypesGetVersionSample.js][extensiontypesgetversionsample]                   | Get details of a version for an extension type and location x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/GetExtensionTypeVersionByLocation.json              |
| [extensionTypesListSample.js][extensiontypeslistsample]                               | List installable Extension Types for the cluster based region and type for the cluster. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/ListExtensionTypes.json |
| [extensionTypesListVersionsSample.js][extensiontypeslistversionssample]               | List the versions for an extension type and location. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/ListExtensionTypeVersionsByLocation.json                  |
| [extensionTypesLocationGetSample.js][extensiontypeslocationgetsample]                 | Get an extension type for the location. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/GetExtensionTypeByLocation.json                                         |
| [extensionTypesLocationListSample.js][extensiontypeslocationlistsample]               | List all Extension Types for the location. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/extensionTypes/preview/2024-11-01-preview/examples/ListExtensionTypesByLocation.json                                    |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

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
node extensionTypesClusterGetVersionSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env KUBERNETESCONFIGURATION_SUBSCRIPTION_ID="<kubernetesconfiguration subscription id>" KUBERNETESCONFIGURATION_RESOURCE_GROUP="<kubernetesconfiguration resource group>" node extensionTypesClusterGetVersionSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[extensiontypesclustergetversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/javascript/extensionTypesClusterGetVersionSample.js
[extensiontypesclusterlistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/javascript/extensionTypesClusterListVersionsSample.js
[extensiontypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/javascript/extensionTypesGetSample.js
[extensiontypesgetversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/javascript/extensionTypesGetVersionSample.js
[extensiontypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/javascript/extensionTypesListSample.js
[extensiontypeslistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/javascript/extensionTypesListVersionsSample.js
[extensiontypeslocationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/javascript/extensionTypesLocationGetSample.js
[extensiontypeslocationlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/samples/v1-beta/javascript/extensionTypesLocationListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-kubernetesconfiguration-extensiontypes?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensiontypes/README.md

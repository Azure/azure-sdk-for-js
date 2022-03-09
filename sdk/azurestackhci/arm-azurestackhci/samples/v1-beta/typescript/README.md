# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [createArcExtension.ts][createarcextension]                                                                                     | Create Extension for HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/PutExtension.json                                |
| [createArcSetting.ts][createarcsetting]                                                                                         | Create ArcSetting for HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/PutArcSetting.json                              |
| [createCluster.ts][createcluster]                                                                                               | Create an HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/CreateCluster.json                                          |
| [deleteArcExtension.ts][deletearcextension]                                                                                     | Delete particular Arc Extension of HCI Cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/DeleteExtension.json               |
| [deleteArcSetting.ts][deletearcsetting]                                                                                         | Delete ArcSetting resource details of HCI Cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/DeleteArcSetting.json           |
| [deleteCluster.ts][deletecluster]                                                                                               | Delete an HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/DeleteCluster.json                                          |
| [getArcSetting.ts][getarcsetting]                                                                                               | Get ArcSetting resource details of HCI Cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/GetArcSetting.json                 |
| [getArcSettingsExtension.ts][getarcsettingsextension]                                                                           | Get particular Arc Extension of HCI Cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/GetExtension.json                     |
| [getCluster.ts][getcluster]                                                                                                     | Get HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/GetCluster.json                                                   |
| [listArcSettingResourcesByHciCluster.ts][listarcsettingresourcesbyhcicluster]                                                   | Get ArcSetting resources of HCI Cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/ListArcSettingsByCluster.json             |
| [listClustersInAGivenResourceGroup.ts][listclustersinagivenresourcegroup]                                                       | List all HCI clusters in a resource group. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/ListClustersByResourceGroup.json        |
| [listClustersInAGivenSubscription.ts][listclustersinagivensubscription]                                                         | List all HCI clusters in a subscription. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/ListClustersBySubscription.json           |
| [listExtensionsUnderArcSettingResource.ts][listextensionsunderarcsettingresource]                                               | List all Extensions under ArcSetting resource. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/ListExtensionsByArcSetting.json     |
| [listOperationsAvailableWithTheMicrosoftAzureStackHciProvider.ts][listoperationsavailablewiththemicrosoftazurestackhciprovider] | List all available Microsoft.AzureStackHCI provider operations x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/ListOperations.json |
| [updateArcExtension.ts][updatearcextension]                                                                                     | Update Extension for HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/PatchExtension.json                              |
| [updateCluster.ts][updatecluster]                                                                                               | Update an HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/UpdateCluster.json                                          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

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
node dist/createArcExtension.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/createArcExtension.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createarcextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/createArcExtension.ts
[createarcsetting]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/createArcSetting.ts
[createcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/createCluster.ts
[deletearcextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/deleteArcExtension.ts
[deletearcsetting]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/deleteArcSetting.ts
[deletecluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/deleteCluster.ts
[getarcsetting]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/getArcSetting.ts
[getarcsettingsextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/getArcSettingsExtension.ts
[getcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/getCluster.ts
[listarcsettingresourcesbyhcicluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/listArcSettingResourcesByHciCluster.ts
[listclustersinagivenresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/listClustersInAGivenResourceGroup.ts
[listclustersinagivensubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/listClustersInAGivenSubscription.ts
[listextensionsunderarcsettingresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/listExtensionsUnderArcSettingResource.ts
[listoperationsavailablewiththemicrosoftazurestackhciprovider]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/listOperationsAvailableWithTheMicrosoftAzureStackHciProvider.ts
[updatearcextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/updateArcExtension.ts
[updatecluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/typescript/src/updateCluster.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-azurestackhci?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azurestackhci/arm-azurestackhci/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

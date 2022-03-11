# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [createArcExtension.js][createarcextension]                                                                                     | Create Extension for HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/PutExtension.json                                |
| [createArcSetting.js][createarcsetting]                                                                                         | Create ArcSetting for HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/PutArcSetting.json                              |
| [createCluster.js][createcluster]                                                                                               | Create an HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/CreateCluster.json                                          |
| [deleteArcExtension.js][deletearcextension]                                                                                     | Delete particular Arc Extension of HCI Cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/DeleteExtension.json               |
| [deleteArcSetting.js][deletearcsetting]                                                                                         | Delete ArcSetting resource details of HCI Cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/DeleteArcSetting.json           |
| [deleteCluster.js][deletecluster]                                                                                               | Delete an HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/DeleteCluster.json                                          |
| [getArcSetting.js][getarcsetting]                                                                                               | Get ArcSetting resource details of HCI Cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/GetArcSetting.json                 |
| [getArcSettingsExtension.js][getarcsettingsextension]                                                                           | Get particular Arc Extension of HCI Cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/GetExtension.json                     |
| [getCluster.js][getcluster]                                                                                                     | Get HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/GetCluster.json                                                   |
| [listArcSettingResourcesByHciCluster.js][listarcsettingresourcesbyhcicluster]                                                   | Get ArcSetting resources of HCI Cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/ListArcSettingsByCluster.json             |
| [listClustersInAGivenResourceGroup.js][listclustersinagivenresourcegroup]                                                       | List all HCI clusters in a resource group. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/ListClustersByResourceGroup.json        |
| [listClustersInAGivenSubscription.js][listclustersinagivensubscription]                                                         | List all HCI clusters in a subscription. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/ListClustersBySubscription.json           |
| [listExtensionsUnderArcSettingResource.js][listextensionsunderarcsettingresource]                                               | List all Extensions under ArcSetting resource. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/ListExtensionsByArcSetting.json     |
| [listOperationsAvailableWithTheMicrosoftAzureStackHciProvider.js][listoperationsavailablewiththemicrosoftazurestackhciprovider] | List all available Microsoft.AzureStackHCI provider operations x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/ListOperations.json |
| [updateArcExtension.js][updatearcextension]                                                                                     | Update Extension for HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/PatchExtension.json                              |
| [updateCluster.js][updatecluster]                                                                                               | Update an HCI cluster. x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/stable/2022-01-01/examples/UpdateCluster.json                                          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node createArcExtension.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node createArcExtension.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createarcextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/createArcExtension.js
[createarcsetting]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/createArcSetting.js
[createcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/createCluster.js
[deletearcextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/deleteArcExtension.js
[deletearcsetting]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/deleteArcSetting.js
[deletecluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/deleteCluster.js
[getarcsetting]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/getArcSetting.js
[getarcsettingsextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/getArcSettingsExtension.js
[getcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/getCluster.js
[listarcsettingresourcesbyhcicluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/listArcSettingResourcesByHciCluster.js
[listclustersinagivenresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/listClustersInAGivenResourceGroup.js
[listclustersinagivensubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/listClustersInAGivenSubscription.js
[listextensionsunderarcsettingresource]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/listExtensionsUnderArcSettingResource.js
[listoperationsavailablewiththemicrosoftazurestackhciprovider]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/listOperationsAvailableWithTheMicrosoftAzureStackHciProvider.js
[updatearcextension]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/updateArcExtension.js
[updatecluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/azurestackhci/arm-azurestackhci/samples/v1-beta/javascript/updateCluster.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-azurestackhci?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/azurestackhci/arm-azurestackhci/README.md

# @azure/arm-deviceregistry client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-deviceregistry in some common scenarios.

| **File Name**                                                                                                                                 | **Description**                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [assetEndpointProfilesAssetEndpointProfilesCreateOrReplaceSample.js][assetendpointprofilesassetendpointprofilescreateorreplacesample]         | create a AssetEndpointProfile x-ms-original-file: 2024-11-01/Create_AssetEndpointProfile.json                                      |
| [assetEndpointProfilesAssetEndpointProfilesDeleteSample.js][assetendpointprofilesassetendpointprofilesdeletesample]                           | delete a AssetEndpointProfile x-ms-original-file: 2024-11-01/Delete_AssetEndpointProfile.json                                      |
| [assetEndpointProfilesAssetEndpointProfilesGetSample.js][assetendpointprofilesassetendpointprofilesgetsample]                                 | get a AssetEndpointProfile x-ms-original-file: 2024-11-01/Get_AssetEndpointProfile.json                                            |
| [assetEndpointProfilesAssetEndpointProfilesListByResourceGroupSample.js][assetendpointprofilesassetendpointprofileslistbyresourcegroupsample] | list AssetEndpointProfile resources by resource group x-ms-original-file: 2024-11-01/List_AssetEndpointProfiles_ResourceGroup.json |
| [assetEndpointProfilesAssetEndpointProfilesListBySubscriptionSample.js][assetendpointprofilesassetendpointprofileslistbysubscriptionsample]   | list AssetEndpointProfile resources by subscription ID x-ms-original-file: 2024-11-01/List_AssetEndpointProfiles_Subscription.json |
| [assetEndpointProfilesAssetEndpointProfilesUpdateSample.js][assetendpointprofilesassetendpointprofilesupdatesample]                           | update a AssetEndpointProfile x-ms-original-file: 2024-11-01/Update_AssetEndpointProfile.json                                      |
| [assetsAssetsCreateOrReplaceSample.js][assetsassetscreateorreplacesample]                                                                     | create a Asset x-ms-original-file: 2024-11-01/Create_Asset_With_DiscoveredAssetRef.json                                            |
| [assetsAssetsDeleteSample.js][assetsassetsdeletesample]                                                                                       | delete a Asset x-ms-original-file: 2024-11-01/Delete_Asset.json                                                                    |
| [assetsAssetsGetSample.js][assetsassetsgetsample]                                                                                             | get a Asset x-ms-original-file: 2024-11-01/Get_Asset.json                                                                          |
| [assetsAssetsListByResourceGroupSample.js][assetsassetslistbyresourcegroupsample]                                                             | list Asset resources by resource group x-ms-original-file: 2024-11-01/List_Assets_ResourceGroup.json                               |
| [assetsAssetsListBySubscriptionSample.js][assetsassetslistbysubscriptionsample]                                                               | list Asset resources by subscription ID x-ms-original-file: 2024-11-01/List_Assets_Subscription.json                               |
| [assetsAssetsUpdateSample.js][assetsassetsupdatesample]                                                                                       | update a Asset x-ms-original-file: 2024-11-01/Update_Asset.json                                                                    |
| [billingContainersBillingContainersGetSample.js][billingcontainersbillingcontainersgetsample]                                                 | get a BillingContainer x-ms-original-file: 2024-11-01/Get_BillingContainer.json                                                    |
| [billingContainersBillingContainersListBySubscriptionSample.js][billingcontainersbillingcontainerslistbysubscriptionsample]                   | list BillingContainer resources by subscription ID x-ms-original-file: 2024-11-01/List_BillingContainers_Subscription.json         |
| [operationStatusOperationStatusGetSample.js][operationstatusoperationstatusgetsample]                                                         | returns the current status of an async operation. x-ms-original-file: 2024-11-01/Get_OperationStatus.json                          |
| [operationsOperationsListSample.js][operationsoperationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2024-11-01/List_Operations.json                                           |

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
node assetEndpointProfilesAssetEndpointProfilesCreateOrReplaceSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node assetEndpointProfilesAssetEndpointProfilesCreateOrReplaceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[assetendpointprofilesassetendpointprofilescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetEndpointProfilesAssetEndpointProfilesCreateOrReplaceSample.js
[assetendpointprofilesassetendpointprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetEndpointProfilesAssetEndpointProfilesDeleteSample.js
[assetendpointprofilesassetendpointprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetEndpointProfilesAssetEndpointProfilesGetSample.js
[assetendpointprofilesassetendpointprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetEndpointProfilesAssetEndpointProfilesListByResourceGroupSample.js
[assetendpointprofilesassetendpointprofileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetEndpointProfilesAssetEndpointProfilesListBySubscriptionSample.js
[assetendpointprofilesassetendpointprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetEndpointProfilesAssetEndpointProfilesUpdateSample.js
[assetsassetscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetsAssetsCreateOrReplaceSample.js
[assetsassetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetsAssetsDeleteSample.js
[assetsassetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetsAssetsGetSample.js
[assetsassetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetsAssetsListByResourceGroupSample.js
[assetsassetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetsAssetsListBySubscriptionSample.js
[assetsassetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/assetsAssetsUpdateSample.js
[billingcontainersbillingcontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/billingContainersBillingContainersGetSample.js
[billingcontainersbillingcontainerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/billingContainersBillingContainersListBySubscriptionSample.js
[operationstatusoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/operationStatusOperationStatusGetSample.js
[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/javascript/operationsOperationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-deviceregistry?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceregistry/arm-deviceregistry/README.md

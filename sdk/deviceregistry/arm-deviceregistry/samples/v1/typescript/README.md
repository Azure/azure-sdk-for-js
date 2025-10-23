# @azure/arm-deviceregistry client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-deviceregistry in some common scenarios.

| **File Name**                                                                                                                                 | **Description**                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [assetEndpointProfilesAssetEndpointProfilesCreateOrReplaceSample.ts][assetendpointprofilesassetendpointprofilescreateorreplacesample]         | create a AssetEndpointProfile x-ms-original-file: 2024-11-01/Create_AssetEndpointProfile.json                                      |
| [assetEndpointProfilesAssetEndpointProfilesDeleteSample.ts][assetendpointprofilesassetendpointprofilesdeletesample]                           | delete a AssetEndpointProfile x-ms-original-file: 2024-11-01/Delete_AssetEndpointProfile.json                                      |
| [assetEndpointProfilesAssetEndpointProfilesGetSample.ts][assetendpointprofilesassetendpointprofilesgetsample]                                 | get a AssetEndpointProfile x-ms-original-file: 2024-11-01/Get_AssetEndpointProfile.json                                            |
| [assetEndpointProfilesAssetEndpointProfilesListByResourceGroupSample.ts][assetendpointprofilesassetendpointprofileslistbyresourcegroupsample] | list AssetEndpointProfile resources by resource group x-ms-original-file: 2024-11-01/List_AssetEndpointProfiles_ResourceGroup.json |
| [assetEndpointProfilesAssetEndpointProfilesListBySubscriptionSample.ts][assetendpointprofilesassetendpointprofileslistbysubscriptionsample]   | list AssetEndpointProfile resources by subscription ID x-ms-original-file: 2024-11-01/List_AssetEndpointProfiles_Subscription.json |
| [assetEndpointProfilesAssetEndpointProfilesUpdateSample.ts][assetendpointprofilesassetendpointprofilesupdatesample]                           | update a AssetEndpointProfile x-ms-original-file: 2024-11-01/Update_AssetEndpointProfile.json                                      |
| [assetsAssetsCreateOrReplaceSample.ts][assetsassetscreateorreplacesample]                                                                     | create a Asset x-ms-original-file: 2024-11-01/Create_Asset_With_DiscoveredAssetRef.json                                            |
| [assetsAssetsDeleteSample.ts][assetsassetsdeletesample]                                                                                       | delete a Asset x-ms-original-file: 2024-11-01/Delete_Asset.json                                                                    |
| [assetsAssetsGetSample.ts][assetsassetsgetsample]                                                                                             | get a Asset x-ms-original-file: 2024-11-01/Get_Asset.json                                                                          |
| [assetsAssetsListByResourceGroupSample.ts][assetsassetslistbyresourcegroupsample]                                                             | list Asset resources by resource group x-ms-original-file: 2024-11-01/List_Assets_ResourceGroup.json                               |
| [assetsAssetsListBySubscriptionSample.ts][assetsassetslistbysubscriptionsample]                                                               | list Asset resources by subscription ID x-ms-original-file: 2024-11-01/List_Assets_Subscription.json                               |
| [assetsAssetsUpdateSample.ts][assetsassetsupdatesample]                                                                                       | update a Asset x-ms-original-file: 2024-11-01/Update_Asset.json                                                                    |
| [billingContainersBillingContainersGetSample.ts][billingcontainersbillingcontainersgetsample]                                                 | get a BillingContainer x-ms-original-file: 2024-11-01/Get_BillingContainer.json                                                    |
| [billingContainersBillingContainersListBySubscriptionSample.ts][billingcontainersbillingcontainerslistbysubscriptionsample]                   | list BillingContainer resources by subscription ID x-ms-original-file: 2024-11-01/List_BillingContainers_Subscription.json         |
| [operationStatusOperationStatusGetSample.ts][operationstatusoperationstatusgetsample]                                                         | returns the current status of an async operation. x-ms-original-file: 2024-11-01/Get_OperationStatus.json                          |
| [operationsOperationsListSample.ts][operationsoperationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2024-11-01/List_Operations.json                                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

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
node dist/assetEndpointProfilesAssetEndpointProfilesCreateOrReplaceSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/assetEndpointProfilesAssetEndpointProfilesCreateOrReplaceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[assetendpointprofilesassetendpointprofilescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesAssetEndpointProfilesCreateOrReplaceSample.ts
[assetendpointprofilesassetendpointprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesAssetEndpointProfilesDeleteSample.ts
[assetendpointprofilesassetendpointprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesAssetEndpointProfilesGetSample.ts
[assetendpointprofilesassetendpointprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesAssetEndpointProfilesListByResourceGroupSample.ts
[assetendpointprofilesassetendpointprofileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesAssetEndpointProfilesListBySubscriptionSample.ts
[assetendpointprofilesassetendpointprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesAssetEndpointProfilesUpdateSample.ts
[assetsassetscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsAssetsCreateOrReplaceSample.ts
[assetsassetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsAssetsDeleteSample.ts
[assetsassetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsAssetsGetSample.ts
[assetsassetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsAssetsListByResourceGroupSample.ts
[assetsassetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsAssetsListBySubscriptionSample.ts
[assetsassetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsAssetsUpdateSample.ts
[billingcontainersbillingcontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/billingContainersBillingContainersGetSample.ts
[billingcontainersbillingcontainerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/billingContainersBillingContainersListBySubscriptionSample.ts
[operationstatusoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/operationStatusOperationStatusGetSample.ts
[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/operationsOperationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-deviceregistry?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceregistry/arm-deviceregistry/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

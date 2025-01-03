# @azure/arm-deviceregistry client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-deviceregistry in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [assetEndpointProfilesCreateOrReplaceSample.ts][assetendpointprofilescreateorreplacesample]                             | create a AssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Create_AssetEndpointProfile.json                                                          |
| [assetEndpointProfilesDeleteSample.ts][assetendpointprofilesdeletesample]                                               | delete a AssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Delete_AssetEndpointProfile.json                                                          |
| [assetEndpointProfilesGetSample.ts][assetendpointprofilesgetsample]                                                     | get a AssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Get_AssetEndpointProfile.json                                                                |
| [assetEndpointProfilesListByResourceGroupSample.ts][assetendpointprofileslistbyresourcegroupsample]                     | list AssetEndpointProfile resources by resource group x-ms-original-file: 2024-09-01-preview/List_AssetEndpointProfiles_ResourceGroup.json                     |
| [assetEndpointProfilesListBySubscriptionSample.ts][assetendpointprofileslistbysubscriptionsample]                       | list AssetEndpointProfile resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_AssetEndpointProfiles_Subscription.json                     |
| [assetEndpointProfilesUpdateSample.ts][assetendpointprofilesupdatesample]                                               | update a AssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Update_AssetEndpointProfile.json                                                          |
| [assetsCreateOrReplaceSample.ts][assetscreateorreplacesample]                                                           | create a Asset x-ms-original-file: 2024-09-01-preview/Create_Asset_Without_DisplayName.json                                                                    |
| [assetsDeleteSample.ts][assetsdeletesample]                                                                             | delete a Asset x-ms-original-file: 2024-09-01-preview/Delete_Asset.json                                                                                        |
| [assetsGetSample.ts][assetsgetsample]                                                                                   | get a Asset x-ms-original-file: 2024-09-01-preview/Get_Asset.json                                                                                              |
| [assetsListByResourceGroupSample.ts][assetslistbyresourcegroupsample]                                                   | list Asset resources by resource group x-ms-original-file: 2024-09-01-preview/List_Assets_ResourceGroup.json                                                   |
| [assetsListBySubscriptionSample.ts][assetslistbysubscriptionsample]                                                     | list Asset resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_Assets_Subscription.json                                                   |
| [assetsUpdateSample.ts][assetsupdatesample]                                                                             | update a Asset x-ms-original-file: 2024-09-01-preview/Update_Asset.json                                                                                        |
| [billingContainersGetSample.ts][billingcontainersgetsample]                                                             | get a BillingContainer x-ms-original-file: 2024-09-01-preview/Get_BillingContainer.json                                                                        |
| [billingContainersListBySubscriptionSample.ts][billingcontainerslistbysubscriptionsample]                               | list BillingContainer resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_BillingContainers_Subscription.json                             |
| [discoveredAssetEndpointProfilesCreateOrReplaceSample.ts][discoveredassetendpointprofilescreateorreplacesample]         | create a DiscoveredAssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Create_DiscoveredAssetEndpointProfile.json                                      |
| [discoveredAssetEndpointProfilesDeleteSample.ts][discoveredassetendpointprofilesdeletesample]                           | delete a DiscoveredAssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Delete_DiscoveredAssetEndpointProfile.json                                      |
| [discoveredAssetEndpointProfilesGetSample.ts][discoveredassetendpointprofilesgetsample]                                 | get a DiscoveredAssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Get_DiscoveredAssetEndpointProfile.json                                            |
| [discoveredAssetEndpointProfilesListByResourceGroupSample.ts][discoveredassetendpointprofileslistbyresourcegroupsample] | list DiscoveredAssetEndpointProfile resources by resource group x-ms-original-file: 2024-09-01-preview/List_DiscoveredAssetEndpointProfiles_ResourceGroup.json |
| [discoveredAssetEndpointProfilesListBySubscriptionSample.ts][discoveredassetendpointprofileslistbysubscriptionsample]   | list DiscoveredAssetEndpointProfile resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_DiscoveredAssetEndpointProfiles_Subscription.json |
| [discoveredAssetEndpointProfilesUpdateSample.ts][discoveredassetendpointprofilesupdatesample]                           | update a DiscoveredAssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Update_DiscoveredAssetEndpointProfile.json                                      |
| [discoveredAssetsCreateOrReplaceSample.ts][discoveredassetscreateorreplacesample]                                       | create a DiscoveredAsset x-ms-original-file: 2024-09-01-preview/Create_DiscoveredAsset.json                                                                    |
| [discoveredAssetsDeleteSample.ts][discoveredassetsdeletesample]                                                         | delete a DiscoveredAsset x-ms-original-file: 2024-09-01-preview/Delete_DiscoveredAsset.json                                                                    |
| [discoveredAssetsGetSample.ts][discoveredassetsgetsample]                                                               | get a DiscoveredAsset x-ms-original-file: 2024-09-01-preview/Get_DiscoveredAsset.json                                                                          |
| [discoveredAssetsListByResourceGroupSample.ts][discoveredassetslistbyresourcegroupsample]                               | list DiscoveredAsset resources by resource group x-ms-original-file: 2024-09-01-preview/List_DiscoveredAssets_ResourceGroup.json                               |
| [discoveredAssetsListBySubscriptionSample.ts][discoveredassetslistbysubscriptionsample]                                 | list DiscoveredAsset resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_DiscoveredAssets_Subscription.json                               |
| [discoveredAssetsUpdateSample.ts][discoveredassetsupdatesample]                                                         | update a DiscoveredAsset x-ms-original-file: 2024-09-01-preview/Update_DiscoveredAsset.json                                                                    |
| [operationStatusGetSample.ts][operationstatusgetsample]                                                                 | returns the current status of an async operation. x-ms-original-file: 2024-09-01-preview/Get_OperationStatus.json                                              |
| [operationsListSample.ts][operationslistsample]                                                                         | list the operations for the provider x-ms-original-file: 2024-09-01-preview/List_Operations.json                                                               |
| [schemaRegistriesCreateOrReplaceSample.ts][schemaregistriescreateorreplacesample]                                       | create a SchemaRegistry x-ms-original-file: 2024-09-01-preview/Create_SchemaRegistry.json                                                                      |
| [schemaRegistriesDeleteSample.ts][schemaregistriesdeletesample]                                                         | delete a SchemaRegistry x-ms-original-file: 2024-09-01-preview/Delete_SchemaRegistry.json                                                                      |
| [schemaRegistriesGetSample.ts][schemaregistriesgetsample]                                                               | get a SchemaRegistry x-ms-original-file: 2024-09-01-preview/Get_SchemaRegistry.json                                                                            |
| [schemaRegistriesListByResourceGroupSample.ts][schemaregistrieslistbyresourcegroupsample]                               | list SchemaRegistry resources by resource group x-ms-original-file: 2024-09-01-preview/List_SchemaRegistries_ResourceGroup.json                                |
| [schemaRegistriesListBySubscriptionSample.ts][schemaregistrieslistbysubscriptionsample]                                 | list SchemaRegistry resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_SchemaRegistries_Subscription.json                                |
| [schemaRegistriesUpdateSample.ts][schemaregistriesupdatesample]                                                         | update a SchemaRegistry x-ms-original-file: 2024-09-01-preview/Update_SchemaRegistry.json                                                                      |
| [schemaVersionsCreateOrReplaceSample.ts][schemaversionscreateorreplacesample]                                           | create a SchemaVersion x-ms-original-file: 2024-09-01-preview/Create_SchemaVersion.json                                                                        |
| [schemaVersionsDeleteSample.ts][schemaversionsdeletesample]                                                             | delete a SchemaVersion x-ms-original-file: 2024-09-01-preview/Delete_SchemaVersion.json                                                                        |
| [schemaVersionsGetSample.ts][schemaversionsgetsample]                                                                   | get a SchemaVersion x-ms-original-file: 2024-09-01-preview/Get_SchemaVersion.json                                                                              |
| [schemaVersionsListBySchemaSample.ts][schemaversionslistbyschemasample]                                                 | list SchemaVersion resources by Schema x-ms-original-file: 2024-09-01-preview/List_SchemaVersions_Schema.json                                                  |
| [schemasCreateOrReplaceSample.ts][schemascreateorreplacesample]                                                         | create a Schema x-ms-original-file: 2024-09-01-preview/Create_Schema.json                                                                                      |
| [schemasDeleteSample.ts][schemasdeletesample]                                                                           | delete a Schema x-ms-original-file: 2024-09-01-preview/Delete_Schema.json                                                                                      |
| [schemasGetSample.ts][schemasgetsample]                                                                                 | get a Schema x-ms-original-file: 2024-09-01-preview/Get_Schema.json                                                                                            |
| [schemasListBySchemaRegistrySample.ts][schemaslistbyschemaregistrysample]                                               | list Schema resources by SchemaRegistry x-ms-original-file: 2024-09-01-preview/List_Schemas_SchemaRegistry.json                                                |

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
node dist/assetEndpointProfilesCreateOrReplaceSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/assetEndpointProfilesCreateOrReplaceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[assetendpointprofilescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesCreateOrReplaceSample.ts
[assetendpointprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesDeleteSample.ts
[assetendpointprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesGetSample.ts
[assetendpointprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesListByResourceGroupSample.ts
[assetendpointprofileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesListBySubscriptionSample.ts
[assetendpointprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetEndpointProfilesUpdateSample.ts
[assetscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsCreateOrReplaceSample.ts
[assetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsDeleteSample.ts
[assetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsGetSample.ts
[assetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsListByResourceGroupSample.ts
[assetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsListBySubscriptionSample.ts
[assetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/assetsUpdateSample.ts
[billingcontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/billingContainersGetSample.ts
[billingcontainerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/billingContainersListBySubscriptionSample.ts
[discoveredassetendpointprofilescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetEndpointProfilesCreateOrReplaceSample.ts
[discoveredassetendpointprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetEndpointProfilesDeleteSample.ts
[discoveredassetendpointprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetEndpointProfilesGetSample.ts
[discoveredassetendpointprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetEndpointProfilesListByResourceGroupSample.ts
[discoveredassetendpointprofileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetEndpointProfilesListBySubscriptionSample.ts
[discoveredassetendpointprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetEndpointProfilesUpdateSample.ts
[discoveredassetscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetsCreateOrReplaceSample.ts
[discoveredassetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetsDeleteSample.ts
[discoveredassetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetsGetSample.ts
[discoveredassetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetsListByResourceGroupSample.ts
[discoveredassetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetsListBySubscriptionSample.ts
[discoveredassetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/discoveredAssetsUpdateSample.ts
[operationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/operationStatusGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/operationsListSample.ts
[schemaregistriescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemaRegistriesCreateOrReplaceSample.ts
[schemaregistriesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemaRegistriesDeleteSample.ts
[schemaregistriesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemaRegistriesGetSample.ts
[schemaregistrieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemaRegistriesListByResourceGroupSample.ts
[schemaregistrieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemaRegistriesListBySubscriptionSample.ts
[schemaregistriesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemaRegistriesUpdateSample.ts
[schemaversionscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemaVersionsCreateOrReplaceSample.ts
[schemaversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemaVersionsDeleteSample.ts
[schemaversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemaVersionsGetSample.ts
[schemaversionslistbyschemasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemaVersionsListBySchemaSample.ts
[schemascreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemasCreateOrReplaceSample.ts
[schemasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemasDeleteSample.ts
[schemasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemasGetSample.ts
[schemaslistbyschemaregistrysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/typescript/src/schemasListBySchemaRegistrySample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-deviceregistry?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceregistry/arm-deviceregistry/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

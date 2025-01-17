# @azure/arm-deviceregistry client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-deviceregistry in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [assetEndpointProfilesCreateOrReplaceSample.js][assetendpointprofilescreateorreplacesample]                             | create a AssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Create_AssetEndpointProfile.json                                                          |
| [assetEndpointProfilesDeleteSample.js][assetendpointprofilesdeletesample]                                               | delete a AssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Delete_AssetEndpointProfile.json                                                          |
| [assetEndpointProfilesGetSample.js][assetendpointprofilesgetsample]                                                     | get a AssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Get_AssetEndpointProfile.json                                                                |
| [assetEndpointProfilesListByResourceGroupSample.js][assetendpointprofileslistbyresourcegroupsample]                     | list AssetEndpointProfile resources by resource group x-ms-original-file: 2024-09-01-preview/List_AssetEndpointProfiles_ResourceGroup.json                     |
| [assetEndpointProfilesListBySubscriptionSample.js][assetendpointprofileslistbysubscriptionsample]                       | list AssetEndpointProfile resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_AssetEndpointProfiles_Subscription.json                     |
| [assetEndpointProfilesUpdateSample.js][assetendpointprofilesupdatesample]                                               | update a AssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Update_AssetEndpointProfile.json                                                          |
| [assetsCreateOrReplaceSample.js][assetscreateorreplacesample]                                                           | create a Asset x-ms-original-file: 2024-09-01-preview/Create_Asset_Without_DisplayName.json                                                                    |
| [assetsDeleteSample.js][assetsdeletesample]                                                                             | delete a Asset x-ms-original-file: 2024-09-01-preview/Delete_Asset.json                                                                                        |
| [assetsGetSample.js][assetsgetsample]                                                                                   | get a Asset x-ms-original-file: 2024-09-01-preview/Get_Asset.json                                                                                              |
| [assetsListByResourceGroupSample.js][assetslistbyresourcegroupsample]                                                   | list Asset resources by resource group x-ms-original-file: 2024-09-01-preview/List_Assets_ResourceGroup.json                                                   |
| [assetsListBySubscriptionSample.js][assetslistbysubscriptionsample]                                                     | list Asset resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_Assets_Subscription.json                                                   |
| [assetsUpdateSample.js][assetsupdatesample]                                                                             | update a Asset x-ms-original-file: 2024-09-01-preview/Update_Asset.json                                                                                        |
| [billingContainersGetSample.js][billingcontainersgetsample]                                                             | get a BillingContainer x-ms-original-file: 2024-09-01-preview/Get_BillingContainer.json                                                                        |
| [billingContainersListBySubscriptionSample.js][billingcontainerslistbysubscriptionsample]                               | list BillingContainer resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_BillingContainers_Subscription.json                             |
| [discoveredAssetEndpointProfilesCreateOrReplaceSample.js][discoveredassetendpointprofilescreateorreplacesample]         | create a DiscoveredAssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Create_DiscoveredAssetEndpointProfile.json                                      |
| [discoveredAssetEndpointProfilesDeleteSample.js][discoveredassetendpointprofilesdeletesample]                           | delete a DiscoveredAssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Delete_DiscoveredAssetEndpointProfile.json                                      |
| [discoveredAssetEndpointProfilesGetSample.js][discoveredassetendpointprofilesgetsample]                                 | get a DiscoveredAssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Get_DiscoveredAssetEndpointProfile.json                                            |
| [discoveredAssetEndpointProfilesListByResourceGroupSample.js][discoveredassetendpointprofileslistbyresourcegroupsample] | list DiscoveredAssetEndpointProfile resources by resource group x-ms-original-file: 2024-09-01-preview/List_DiscoveredAssetEndpointProfiles_ResourceGroup.json |
| [discoveredAssetEndpointProfilesListBySubscriptionSample.js][discoveredassetendpointprofileslistbysubscriptionsample]   | list DiscoveredAssetEndpointProfile resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_DiscoveredAssetEndpointProfiles_Subscription.json |
| [discoveredAssetEndpointProfilesUpdateSample.js][discoveredassetendpointprofilesupdatesample]                           | update a DiscoveredAssetEndpointProfile x-ms-original-file: 2024-09-01-preview/Update_DiscoveredAssetEndpointProfile.json                                      |
| [discoveredAssetsCreateOrReplaceSample.js][discoveredassetscreateorreplacesample]                                       | create a DiscoveredAsset x-ms-original-file: 2024-09-01-preview/Create_DiscoveredAsset.json                                                                    |
| [discoveredAssetsDeleteSample.js][discoveredassetsdeletesample]                                                         | delete a DiscoveredAsset x-ms-original-file: 2024-09-01-preview/Delete_DiscoveredAsset.json                                                                    |
| [discoveredAssetsGetSample.js][discoveredassetsgetsample]                                                               | get a DiscoveredAsset x-ms-original-file: 2024-09-01-preview/Get_DiscoveredAsset.json                                                                          |
| [discoveredAssetsListByResourceGroupSample.js][discoveredassetslistbyresourcegroupsample]                               | list DiscoveredAsset resources by resource group x-ms-original-file: 2024-09-01-preview/List_DiscoveredAssets_ResourceGroup.json                               |
| [discoveredAssetsListBySubscriptionSample.js][discoveredassetslistbysubscriptionsample]                                 | list DiscoveredAsset resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_DiscoveredAssets_Subscription.json                               |
| [discoveredAssetsUpdateSample.js][discoveredassetsupdatesample]                                                         | update a DiscoveredAsset x-ms-original-file: 2024-09-01-preview/Update_DiscoveredAsset.json                                                                    |
| [operationStatusGetSample.js][operationstatusgetsample]                                                                 | returns the current status of an async operation. x-ms-original-file: 2024-09-01-preview/Get_OperationStatus.json                                              |
| [operationsListSample.js][operationslistsample]                                                                         | list the operations for the provider x-ms-original-file: 2024-09-01-preview/List_Operations.json                                                               |
| [schemaRegistriesCreateOrReplaceSample.js][schemaregistriescreateorreplacesample]                                       | create a SchemaRegistry x-ms-original-file: 2024-09-01-preview/Create_SchemaRegistry.json                                                                      |
| [schemaRegistriesDeleteSample.js][schemaregistriesdeletesample]                                                         | delete a SchemaRegistry x-ms-original-file: 2024-09-01-preview/Delete_SchemaRegistry.json                                                                      |
| [schemaRegistriesGetSample.js][schemaregistriesgetsample]                                                               | get a SchemaRegistry x-ms-original-file: 2024-09-01-preview/Get_SchemaRegistry.json                                                                            |
| [schemaRegistriesListByResourceGroupSample.js][schemaregistrieslistbyresourcegroupsample]                               | list SchemaRegistry resources by resource group x-ms-original-file: 2024-09-01-preview/List_SchemaRegistries_ResourceGroup.json                                |
| [schemaRegistriesListBySubscriptionSample.js][schemaregistrieslistbysubscriptionsample]                                 | list SchemaRegistry resources by subscription ID x-ms-original-file: 2024-09-01-preview/List_SchemaRegistries_Subscription.json                                |
| [schemaRegistriesUpdateSample.js][schemaregistriesupdatesample]                                                         | update a SchemaRegistry x-ms-original-file: 2024-09-01-preview/Update_SchemaRegistry.json                                                                      |
| [schemaVersionsCreateOrReplaceSample.js][schemaversionscreateorreplacesample]                                           | create a SchemaVersion x-ms-original-file: 2024-09-01-preview/Create_SchemaVersion.json                                                                        |
| [schemaVersionsDeleteSample.js][schemaversionsdeletesample]                                                             | delete a SchemaVersion x-ms-original-file: 2024-09-01-preview/Delete_SchemaVersion.json                                                                        |
| [schemaVersionsGetSample.js][schemaversionsgetsample]                                                                   | get a SchemaVersion x-ms-original-file: 2024-09-01-preview/Get_SchemaVersion.json                                                                              |
| [schemaVersionsListBySchemaSample.js][schemaversionslistbyschemasample]                                                 | list SchemaVersion resources by Schema x-ms-original-file: 2024-09-01-preview/List_SchemaVersions_Schema.json                                                  |
| [schemasCreateOrReplaceSample.js][schemascreateorreplacesample]                                                         | create a Schema x-ms-original-file: 2024-09-01-preview/Create_Schema.json                                                                                      |
| [schemasDeleteSample.js][schemasdeletesample]                                                                           | delete a Schema x-ms-original-file: 2024-09-01-preview/Delete_Schema.json                                                                                      |
| [schemasGetSample.js][schemasgetsample]                                                                                 | get a Schema x-ms-original-file: 2024-09-01-preview/Get_Schema.json                                                                                            |
| [schemasListBySchemaRegistrySample.js][schemaslistbyschemaregistrysample]                                               | list Schema resources by SchemaRegistry x-ms-original-file: 2024-09-01-preview/List_Schemas_SchemaRegistry.json                                                |

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
node assetEndpointProfilesCreateOrReplaceSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node assetEndpointProfilesCreateOrReplaceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[assetendpointprofilescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetEndpointProfilesCreateOrReplaceSample.js
[assetendpointprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetEndpointProfilesDeleteSample.js
[assetendpointprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetEndpointProfilesGetSample.js
[assetendpointprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetEndpointProfilesListByResourceGroupSample.js
[assetendpointprofileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetEndpointProfilesListBySubscriptionSample.js
[assetendpointprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetEndpointProfilesUpdateSample.js
[assetscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetsCreateOrReplaceSample.js
[assetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetsDeleteSample.js
[assetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetsGetSample.js
[assetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetsListByResourceGroupSample.js
[assetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetsListBySubscriptionSample.js
[assetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/assetsUpdateSample.js
[billingcontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/billingContainersGetSample.js
[billingcontainerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/billingContainersListBySubscriptionSample.js
[discoveredassetendpointprofilescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetEndpointProfilesCreateOrReplaceSample.js
[discoveredassetendpointprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetEndpointProfilesDeleteSample.js
[discoveredassetendpointprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetEndpointProfilesGetSample.js
[discoveredassetendpointprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetEndpointProfilesListByResourceGroupSample.js
[discoveredassetendpointprofileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetEndpointProfilesListBySubscriptionSample.js
[discoveredassetendpointprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetEndpointProfilesUpdateSample.js
[discoveredassetscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetsCreateOrReplaceSample.js
[discoveredassetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetsDeleteSample.js
[discoveredassetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetsGetSample.js
[discoveredassetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetsListByResourceGroupSample.js
[discoveredassetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetsListBySubscriptionSample.js
[discoveredassetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/discoveredAssetsUpdateSample.js
[operationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/operationStatusGetSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/operationsListSample.js
[schemaregistriescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemaRegistriesCreateOrReplaceSample.js
[schemaregistriesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemaRegistriesDeleteSample.js
[schemaregistriesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemaRegistriesGetSample.js
[schemaregistrieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemaRegistriesListByResourceGroupSample.js
[schemaregistrieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemaRegistriesListBySubscriptionSample.js
[schemaregistriesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemaRegistriesUpdateSample.js
[schemaversionscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemaVersionsCreateOrReplaceSample.js
[schemaversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemaVersionsDeleteSample.js
[schemaversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemaVersionsGetSample.js
[schemaversionslistbyschemasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemaVersionsListBySchemaSample.js
[schemascreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemasCreateOrReplaceSample.js
[schemasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemasDeleteSample.js
[schemasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemasGetSample.js
[schemaslistbyschemaregistrysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1-beta/javascript/schemasListBySchemaRegistrySample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-deviceregistry?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceregistry/arm-deviceregistry/README.md

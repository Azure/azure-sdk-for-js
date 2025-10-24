# @azure/arm-deviceregistry client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-deviceregistry in some common scenarios.

| **File Name**                                                                                                 | **Description**                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [assetEndpointProfilesCreateOrReplaceSample.ts][assetendpointprofilescreateorreplacesample]                   | create a AssetEndpointProfile x-ms-original-file: 2025-10-01/CreateOrReplace_AssetEndpointProfile.json                                    |
| [assetEndpointProfilesDeleteSample.ts][assetendpointprofilesdeletesample]                                     | delete a AssetEndpointProfile x-ms-original-file: 2025-10-01/Delete_AssetEndpointProfile.json                                             |
| [assetEndpointProfilesGetSample.ts][assetendpointprofilesgetsample]                                           | get a AssetEndpointProfile x-ms-original-file: 2025-10-01/Get_AssetEndpointProfile.json                                                   |
| [assetEndpointProfilesListByResourceGroupSample.ts][assetendpointprofileslistbyresourcegroupsample]           | list AssetEndpointProfile resources by resource group x-ms-original-file: 2025-10-01/List_AssetEndpointProfiles_ByResourceGroup.json      |
| [assetEndpointProfilesListBySubscriptionSample.ts][assetendpointprofileslistbysubscriptionsample]             | list AssetEndpointProfile resources by subscription ID x-ms-original-file: 2025-10-01/List_AssetEndpointProfiles_BySubscription.json      |
| [assetEndpointProfilesUpdateSample.ts][assetendpointprofilesupdatesample]                                     | update a AssetEndpointProfile x-ms-original-file: 2025-10-01/Update_AssetEndpointProfile.json                                             |
| [assetsCreateOrReplaceSample.ts][assetscreateorreplacesample]                                                 | create a Asset x-ms-original-file: 2025-10-01/CreateOrReplace_Asset_With_DiscoveredAssetRef.json                                          |
| [assetsDeleteSample.ts][assetsdeletesample]                                                                   | delete a Asset x-ms-original-file: 2025-10-01/Delete_Asset.json                                                                           |
| [assetsGetSample.ts][assetsgetsample]                                                                         | get a Asset x-ms-original-file: 2025-10-01/Get_Asset.json                                                                                 |
| [assetsListByResourceGroupSample.ts][assetslistbyresourcegroupsample]                                         | list Asset resources by resource group x-ms-original-file: 2025-10-01/List_Assets_ByResourceGroup.json                                    |
| [assetsListBySubscriptionSample.ts][assetslistbysubscriptionsample]                                           | list Asset resources by subscription ID x-ms-original-file: 2025-10-01/List_Assets_BySubscription.json                                    |
| [assetsUpdateSample.ts][assetsupdatesample]                                                                   | update a Asset x-ms-original-file: 2025-10-01/Update_Asset.json                                                                           |
| [billingContainersGetSample.ts][billingcontainersgetsample]                                                   | get a BillingContainer x-ms-original-file: 2025-10-01/Get_BillingContainer.json                                                           |
| [billingContainersListBySubscriptionSample.ts][billingcontainerslistbysubscriptionsample]                     | list BillingContainer resources by subscription ID x-ms-original-file: 2025-10-01/List_BillingContainers_BySubscription.json              |
| [namespaceAssetsCreateOrReplaceSample.ts][namespaceassetscreateorreplacesample]                               | create a NamespaceAsset x-ms-original-file: 2025-10-01/CreateOrReplace_NamespaceAsset.json                                                |
| [namespaceAssetsDeleteSample.ts][namespaceassetsdeletesample]                                                 | delete a NamespaceAsset x-ms-original-file: 2025-10-01/Delete_NamespaceAsset.json                                                         |
| [namespaceAssetsGetSample.ts][namespaceassetsgetsample]                                                       | get a NamespaceAsset x-ms-original-file: 2025-10-01/Get_NamespaceAsset.json                                                               |
| [namespaceAssetsListByResourceGroupSample.ts][namespaceassetslistbyresourcegroupsample]                       | list NamespaceAsset resources by Namespace x-ms-original-file: 2025-10-01/List_NamespaceAssets_ByResourceGroup.json                       |
| [namespaceAssetsUpdateSample.ts][namespaceassetsupdatesample]                                                 | update a NamespaceAsset x-ms-original-file: 2025-10-01/Update_NamespaceAsset.json                                                         |
| [namespaceDevicesCreateOrReplaceSample.ts][namespacedevicescreateorreplacesample]                             | create a NamespaceDevice x-ms-original-file: 2025-10-01/CreateOrReplace_NamespaceDevice.json                                              |
| [namespaceDevicesDeleteSample.ts][namespacedevicesdeletesample]                                               | delete a NamespaceDevice x-ms-original-file: 2025-10-01/Delete_NamespaceDevice.json                                                       |
| [namespaceDevicesGetSample.ts][namespacedevicesgetsample]                                                     | get a NamespaceDevice x-ms-original-file: 2025-10-01/Get_NamespaceDevice.json                                                             |
| [namespaceDevicesListByResourceGroupSample.ts][namespacedeviceslistbyresourcegroupsample]                     | list NamespaceDevice resources by Namespace x-ms-original-file: 2025-10-01/List_NamespaceDevices_ByResourceGroup.json                     |
| [namespaceDevicesUpdateSample.ts][namespacedevicesupdatesample]                                               | update a NamespaceDevice x-ms-original-file: 2025-10-01/Update_NamespaceDevice.json                                                       |
| [namespaceDiscoveredAssetsCreateOrReplaceSample.ts][namespacediscoveredassetscreateorreplacesample]           | create a NamespaceDiscoveredAsset x-ms-original-file: 2025-10-01/CreateOrReplace_NamespaceDiscoveredAsset.json                            |
| [namespaceDiscoveredAssetsDeleteSample.ts][namespacediscoveredassetsdeletesample]                             | delete a NamespaceDiscoveredAsset x-ms-original-file: 2025-10-01/Delete_NamespaceDiscoveredAsset.json                                     |
| [namespaceDiscoveredAssetsGetSample.ts][namespacediscoveredassetsgetsample]                                   | get a NamespaceDiscoveredAsset x-ms-original-file: 2025-10-01/Get_NamespaceDiscoveredAsset.json                                           |
| [namespaceDiscoveredAssetsListByResourceGroupSample.ts][namespacediscoveredassetslistbyresourcegroupsample]   | list NamespaceDiscoveredAsset resources by Namespace x-ms-original-file: 2025-10-01/List_NamespaceDiscoveredAssets_ByResourceGroup.json   |
| [namespaceDiscoveredAssetsUpdateSample.ts][namespacediscoveredassetsupdatesample]                             | update a NamespaceDiscoveredAsset x-ms-original-file: 2025-10-01/Update_NamespaceDiscoveredAsset.json                                     |
| [namespaceDiscoveredDevicesCreateOrReplaceSample.ts][namespacediscovereddevicescreateorreplacesample]         | create a NamespaceDiscoveredDevice x-ms-original-file: 2025-10-01/CreateOrReplace_NamespaceDiscoveredDevice.json                          |
| [namespaceDiscoveredDevicesDeleteSample.ts][namespacediscovereddevicesdeletesample]                           | delete a NamespaceDiscoveredDevice x-ms-original-file: 2025-10-01/Delete_NamespaceDiscoveredDevice.json                                   |
| [namespaceDiscoveredDevicesGetSample.ts][namespacediscovereddevicesgetsample]                                 | get a NamespaceDiscoveredDevice x-ms-original-file: 2025-10-01/Get_NamespaceDiscoveredDevice.json                                         |
| [namespaceDiscoveredDevicesListByResourceGroupSample.ts][namespacediscovereddeviceslistbyresourcegroupsample] | list NamespaceDiscoveredDevice resources by Namespace x-ms-original-file: 2025-10-01/List_NamespaceDiscoveredDevices_ByResourceGroup.json |
| [namespaceDiscoveredDevicesUpdateSample.ts][namespacediscovereddevicesupdatesample]                           | update a NamespaceDiscoveredDevice x-ms-original-file: 2025-10-01/Update_NamespaceDiscoveredDevice.json                                   |
| [namespacesCreateOrReplaceSample.ts][namespacescreateorreplacesample]                                         | create a Namespace x-ms-original-file: 2025-10-01/CreateOrReplace_Namespace_With_Endpoints.json                                           |
| [namespacesDeleteSample.ts][namespacesdeletesample]                                                           | delete a Namespace x-ms-original-file: 2025-10-01/Delete_Namespace.json                                                                   |
| [namespacesGetSample.ts][namespacesgetsample]                                                                 | get a Namespace x-ms-original-file: 2025-10-01/Get_Namespace.json                                                                         |
| [namespacesListByResourceGroupSample.ts][namespaceslistbyresourcegroupsample]                                 | list Namespace resources by resource group x-ms-original-file: 2025-10-01/List_Namespace_ByResourceGroup.json                             |
| [namespacesListBySubscriptionSample.ts][namespaceslistbysubscriptionsample]                                   | list Namespace resources by subscription ID x-ms-original-file: 2025-10-01/List_Namespace_BySubscription.json                             |
| [namespacesMigrateSample.ts][namespacesmigratesample]                                                         | migrate the resources into Namespace x-ms-original-file: 2025-10-01/Migrate_Assets_Namespace.json                                         |
| [namespacesUpdateSample.ts][namespacesupdatesample]                                                           | update a Namespace x-ms-original-file: 2025-10-01/Update_Namespace_Endpoints.json                                                         |
| [operationStatusGetSample.ts][operationstatusgetsample]                                                       | returns the current status of an async operation. x-ms-original-file: 2025-10-01/Get_OperationStatus.json                                 |
| [operationsListSample.ts][operationslistsample]                                                               | list the operations for the provider x-ms-original-file: 2025-10-01/List_Operations.json                                                  |
| [schemaRegistriesCreateOrReplaceSample.ts][schemaregistriescreateorreplacesample]                             | create a SchemaRegistry x-ms-original-file: 2025-10-01/CreateOrReplace_SchemaRegistry.json                                                |
| [schemaRegistriesDeleteSample.ts][schemaregistriesdeletesample]                                               | delete a SchemaRegistry x-ms-original-file: 2025-10-01/Delete_SchemaRegistry.json                                                         |
| [schemaRegistriesGetSample.ts][schemaregistriesgetsample]                                                     | get a SchemaRegistry x-ms-original-file: 2025-10-01/Get_SchemaRegistry.json                                                               |
| [schemaRegistriesListByResourceGroupSample.ts][schemaregistrieslistbyresourcegroupsample]                     | list SchemaRegistry resources by resource group x-ms-original-file: 2025-10-01/List_SchemaRegistries_ByResourceGroup.json                 |
| [schemaRegistriesListBySubscriptionSample.ts][schemaregistrieslistbysubscriptionsample]                       | list SchemaRegistry resources by subscription ID x-ms-original-file: 2025-10-01/List_SchemaRegistries_BySubscription.json                 |
| [schemaRegistriesUpdateSample.ts][schemaregistriesupdatesample]                                               | update a SchemaRegistry x-ms-original-file: 2025-10-01/Update_SchemaRegistry.json                                                         |
| [schemaVersionsCreateOrReplaceSample.ts][schemaversionscreateorreplacesample]                                 | create a SchemaVersion x-ms-original-file: 2025-10-01/CreateOrReplace_SchemaVersion.json                                                  |
| [schemaVersionsDeleteSample.ts][schemaversionsdeletesample]                                                   | delete a SchemaVersion x-ms-original-file: 2025-10-01/Delete_SchemaVersion.json                                                           |
| [schemaVersionsGetSample.ts][schemaversionsgetsample]                                                         | get a SchemaVersion x-ms-original-file: 2025-10-01/Get_SchemaVersion.json                                                                 |
| [schemaVersionsListBySchemaSample.ts][schemaversionslistbyschemasample]                                       | list SchemaVersion resources by Schema x-ms-original-file: 2025-10-01/List_SchemaVersions_BySchema.json                                   |
| [schemasCreateOrReplaceSample.ts][schemascreateorreplacesample]                                               | create a Schema x-ms-original-file: 2025-10-01/CreateOrReplace_Schema.json                                                                |
| [schemasDeleteSample.ts][schemasdeletesample]                                                                 | delete a Schema x-ms-original-file: 2025-10-01/Delete_Schema.json                                                                         |
| [schemasGetSample.ts][schemasgetsample]                                                                       | get a Schema x-ms-original-file: 2025-10-01/Get_Schema.json                                                                               |
| [schemasListBySchemaRegistrySample.ts][schemaslistbyschemaregistrysample]                                     | list Schema resources by SchemaRegistry x-ms-original-file: 2025-10-01/List_Schemas_BySchemaRegistry.json                                 |

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
node dist/assetEndpointProfilesCreateOrReplaceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[assetendpointprofilescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesCreateOrReplaceSample.ts
[assetendpointprofilesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesDeleteSample.ts
[assetendpointprofilesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesGetSample.ts
[assetendpointprofileslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesListByResourceGroupSample.ts
[assetendpointprofileslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesListBySubscriptionSample.ts
[assetendpointprofilesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetEndpointProfilesUpdateSample.ts
[assetscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsCreateOrReplaceSample.ts
[assetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsDeleteSample.ts
[assetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsGetSample.ts
[assetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsListByResourceGroupSample.ts
[assetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsListBySubscriptionSample.ts
[assetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/assetsUpdateSample.ts
[billingcontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/billingContainersGetSample.ts
[billingcontainerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/billingContainersListBySubscriptionSample.ts
[namespaceassetscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceAssetsCreateOrReplaceSample.ts
[namespaceassetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceAssetsDeleteSample.ts
[namespaceassetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceAssetsGetSample.ts
[namespaceassetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceAssetsListByResourceGroupSample.ts
[namespaceassetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceAssetsUpdateSample.ts
[namespacedevicescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDevicesCreateOrReplaceSample.ts
[namespacedevicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDevicesDeleteSample.ts
[namespacedevicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDevicesGetSample.ts
[namespacedeviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDevicesListByResourceGroupSample.ts
[namespacedevicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDevicesUpdateSample.ts
[namespacediscoveredassetscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDiscoveredAssetsCreateOrReplaceSample.ts
[namespacediscoveredassetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDiscoveredAssetsDeleteSample.ts
[namespacediscoveredassetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDiscoveredAssetsGetSample.ts
[namespacediscoveredassetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDiscoveredAssetsListByResourceGroupSample.ts
[namespacediscoveredassetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDiscoveredAssetsUpdateSample.ts
[namespacediscovereddevicescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDiscoveredDevicesCreateOrReplaceSample.ts
[namespacediscovereddevicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDiscoveredDevicesDeleteSample.ts
[namespacediscovereddevicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDiscoveredDevicesGetSample.ts
[namespacediscovereddeviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDiscoveredDevicesListByResourceGroupSample.ts
[namespacediscovereddevicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespaceDiscoveredDevicesUpdateSample.ts
[namespacescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespacesCreateOrReplaceSample.ts
[namespacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespacesDeleteSample.ts
[namespacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespacesGetSample.ts
[namespaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespacesListByResourceGroupSample.ts
[namespaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespacesListBySubscriptionSample.ts
[namespacesmigratesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespacesMigrateSample.ts
[namespacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/namespacesUpdateSample.ts
[operationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/operationStatusGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/operationsListSample.ts
[schemaregistriescreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemaRegistriesCreateOrReplaceSample.ts
[schemaregistriesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemaRegistriesDeleteSample.ts
[schemaregistriesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemaRegistriesGetSample.ts
[schemaregistrieslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemaRegistriesListByResourceGroupSample.ts
[schemaregistrieslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemaRegistriesListBySubscriptionSample.ts
[schemaregistriesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemaRegistriesUpdateSample.ts
[schemaversionscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemaVersionsCreateOrReplaceSample.ts
[schemaversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemaVersionsDeleteSample.ts
[schemaversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemaVersionsGetSample.ts
[schemaversionslistbyschemasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemaVersionsListBySchemaSample.ts
[schemascreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemasCreateOrReplaceSample.ts
[schemasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemasDeleteSample.ts
[schemasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemasGetSample.ts
[schemaslistbyschemaregistrysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deviceregistry/arm-deviceregistry/samples/v1/typescript/src/schemasListBySchemaRegistrySample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-deviceregistry?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deviceregistry/arm-deviceregistry/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

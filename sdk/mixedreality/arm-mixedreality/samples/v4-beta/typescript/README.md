# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkLocalNameAvailability.ts][checklocalnameavailability]                                             | Check Name Availability for local uniqueness x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/proxy/CheckNameAvailabilityForLocalUniqueness.json          |
| [checkNameAvailabilityLocalSample.ts][checknameavailabilitylocalsample]                                 | Check Name Availability for local uniqueness x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/proxy/CheckNameAvailabilityForLocalUniqueness.json |
| [createRemoteRenderingAccount.ts][createremoterenderingaccount]                                         | Creating or Updating a Remote Rendering Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/Put.json                               |
| [createSpatialAnchorAccount.ts][createspatialanchoraccount]                                             | Creating or Updating a Spatial Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/Put.json                                 |
| [deleteRemoteRenderingAccount.ts][deleteremoterenderingaccount]                                         | Delete a Remote Rendering Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/Delete.json                                          |
| [deleteSpatialAnchorsAccount.ts][deletespatialanchorsaccount]                                           | Delete a Spatial Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/Delete.json                                            |
| [getRemoteRenderingAccount.ts][getremoterenderingaccount]                                               | Retrieve a Remote Rendering Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/Get.json                                           |
| [getSpatialAnchorsAccount.ts][getspatialanchorsaccount]                                                 | Retrieve a Spatial Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/Get.json                                             |
| [listAvailableOperations.ts][listavailableoperations]                                                   | Exposing Available Operations x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/proxy/ExposingAvailableOperations.json                                     |
| [listRemoteRenderingAccountKey.ts][listremoterenderingaccountkey]                                       | List Both of the 2 Keys of a Remote Rendering Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/ListKeys.json                     |
| [listRemoteRenderingAccountsByResourceGroup.ts][listremoterenderingaccountsbyresourcegroup]             | List Resources by Resource Group x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/GetByResourceGroup.json                                |
| [listRemoteRenderingAccountsBySubscription.ts][listremoterenderingaccountsbysubscription]               | List Remote Rendering Accounts by Subscription x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/GetBySubscription.json                   |
| [listSpatialAnchorAccountKey.ts][listspatialanchoraccountkey]                                           | List Both of the 2 Keys of a Spatial Anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/ListKeys.json                       |
| [listSpatialAnchorAccountsByResourceGroup.ts][listspatialanchoraccountsbyresourcegroup]                 | List Resources by Resource Group x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/GetByResourceGroup.json                                 |
| [listSpatialAnchorsAccountsBySubscription.ts][listspatialanchorsaccountsbysubscription]                 | List Spatial Anchors Accounts by Subscription x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/GetBySubscription.json                     |
| [objectAnchorsAccountsCreateSample.ts][objectanchorsaccountscreatesample]                               | Creating or Updating an object anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/object-anchors/Put.json                         |
| [objectAnchorsAccountsDeleteSample.ts][objectanchorsaccountsdeletesample]                               | Delete an Object Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/object-anchors/Delete.json                                    |
| [objectAnchorsAccountsGetSample.ts][objectanchorsaccountsgetsample]                                     | Retrieve an Object Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/object-anchors/Get.json                                     |
| [objectAnchorsAccountsListByResourceGroupSample.ts][objectanchorsaccountslistbyresourcegroupsample]     | List Resources by Resource Group x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/object-anchors/GetByResourceGroup.json                         |
| [objectAnchorsAccountsListBySubscriptionSample.ts][objectanchorsaccountslistbysubscriptionsample]       | List Object Anchors Accounts by Subscription x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/object-anchors/GetBySubscription.json              |
| [objectAnchorsAccountsListKeysSample.ts][objectanchorsaccountslistkeyssample]                           | List Both of the 2 Keys of an object anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/object-anchors/ListKeys.json               |
| [objectAnchorsAccountsRegenerateKeysSample.ts][objectanchorsaccountsregeneratekeyssample]               | Regenerate specified Key of an object anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/object-anchors/RegenerateKey.json         |
| [objectAnchorsAccountsUpdateSample.ts][objectanchorsaccountsupdatesample]                               | Updating an Object Anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/object-anchors/Patch.json                                    |
| [operationsListSample.ts][operationslistsample]                                                         | Exposing Available Operations x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/proxy/ExposingAvailableOperations.json                            |
| [regenerateRemoteRenderingAccountKeys.ts][regenerateremoterenderingaccountkeys]                         | Regenerate specified Key of a Remote Rendering Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/RegenerateKey.json               |
| [regenerateSpatialAnchorsAccountKeys.ts][regeneratespatialanchorsaccountkeys]                           | Regenerate specified Key of a Spatial Anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/RegenerateKey.json                 |
| [remoteRenderingAccountsCreateSample.ts][remoterenderingaccountscreatesample]                           | Creating or Updating a Remote Rendering Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/remote-rendering/Put.json                      |
| [remoteRenderingAccountsDeleteSample.ts][remoterenderingaccountsdeletesample]                           | Delete a Remote Rendering Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/remote-rendering/Delete.json                                 |
| [remoteRenderingAccountsGetSample.ts][remoterenderingaccountsgetsample]                                 | Retrieve a Remote Rendering Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/remote-rendering/Get.json                                  |
| [remoteRenderingAccountsListByResourceGroupSample.ts][remoterenderingaccountslistbyresourcegroupsample] | List Resources by Resource Group x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/remote-rendering/GetByResourceGroup.json                       |
| [remoteRenderingAccountsListBySubscriptionSample.ts][remoterenderingaccountslistbysubscriptionsample]   | List Remote Rendering Accounts by Subscription x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/remote-rendering/GetBySubscription.json          |
| [remoteRenderingAccountsListKeysSample.ts][remoterenderingaccountslistkeyssample]                       | List Both of the 2 Keys of a Remote Rendering Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/remote-rendering/ListKeys.json            |
| [remoteRenderingAccountsRegenerateKeysSample.ts][remoterenderingaccountsregeneratekeyssample]           | Regenerate specified Key of a Remote Rendering Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/remote-rendering/RegenerateKey.json      |
| [remoteRenderingAccountsUpdateSample.ts][remoterenderingaccountsupdatesample]                           | Updating a Remote Rendering Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/remote-rendering/Patch.json                                 |
| [spatialAnchorsAccountsCreateSample.ts][spatialanchorsaccountscreatesample]                             | Creating or Updating a Spatial Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/spatial-anchors/Put.json                        |
| [spatialAnchorsAccountsDeleteSample.ts][spatialanchorsaccountsdeletesample]                             | Delete a Spatial Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/spatial-anchors/Delete.json                                   |
| [spatialAnchorsAccountsGetSample.ts][spatialanchorsaccountsgetsample]                                   | Retrieve a Spatial Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/spatial-anchors/Get.json                                    |
| [spatialAnchorsAccountsListByResourceGroupSample.ts][spatialanchorsaccountslistbyresourcegroupsample]   | List Resources by Resource Group x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/spatial-anchors/GetByResourceGroup.json                        |
| [spatialAnchorsAccountsListBySubscriptionSample.ts][spatialanchorsaccountslistbysubscriptionsample]     | List Spatial Anchors Accounts by Subscription x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/spatial-anchors/GetBySubscription.json            |
| [spatialAnchorsAccountsListKeysSample.ts][spatialanchorsaccountslistkeyssample]                         | List Both of the 2 Keys of a Spatial Anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/spatial-anchors/ListKeys.json              |
| [spatialAnchorsAccountsRegenerateKeysSample.ts][spatialanchorsaccountsregeneratekeyssample]             | Regenerate specified Key of a Spatial Anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/spatial-anchors/RegenerateKey.json        |
| [spatialAnchorsAccountsUpdateSample.ts][spatialanchorsaccountsupdatesample]                             | Updating a Spatial Anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/preview/2021-03-01-preview/examples/spatial-anchors/Patch.json                                   |
| [updateRemoteRenderingAccount.ts][updateremoterenderingaccount]                                         | Updating a Remote Rendering Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/Patch.json                                          |
| [updateSpatialAnchorsAccount.ts][updatespatialanchorsaccount]                                           | Updating a Spatial Anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/Patch.json                                            |

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
node dist/checkLocalNameAvailability.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/checkLocalNameAvailability.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checklocalnameavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/checkLocalNameAvailability.ts
[checknameavailabilitylocalsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/checkNameAvailabilityLocalSample.ts
[createremoterenderingaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/createRemoteRenderingAccount.ts
[createspatialanchoraccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/createSpatialAnchorAccount.ts
[deleteremoterenderingaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/deleteRemoteRenderingAccount.ts
[deletespatialanchorsaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/deleteSpatialAnchorsAccount.ts
[getremoterenderingaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/getRemoteRenderingAccount.ts
[getspatialanchorsaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/getSpatialAnchorsAccount.ts
[listavailableoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/listAvailableOperations.ts
[listremoterenderingaccountkey]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/listRemoteRenderingAccountKey.ts
[listremoterenderingaccountsbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/listRemoteRenderingAccountsByResourceGroup.ts
[listremoterenderingaccountsbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/listRemoteRenderingAccountsBySubscription.ts
[listspatialanchoraccountkey]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/listSpatialAnchorAccountKey.ts
[listspatialanchoraccountsbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/listSpatialAnchorAccountsByResourceGroup.ts
[listspatialanchorsaccountsbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/listSpatialAnchorsAccountsBySubscription.ts
[objectanchorsaccountscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/objectAnchorsAccountsCreateSample.ts
[objectanchorsaccountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/objectAnchorsAccountsDeleteSample.ts
[objectanchorsaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/objectAnchorsAccountsGetSample.ts
[objectanchorsaccountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/objectAnchorsAccountsListByResourceGroupSample.ts
[objectanchorsaccountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/objectAnchorsAccountsListBySubscriptionSample.ts
[objectanchorsaccountslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/objectAnchorsAccountsListKeysSample.ts
[objectanchorsaccountsregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/objectAnchorsAccountsRegenerateKeysSample.ts
[objectanchorsaccountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/objectAnchorsAccountsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/operationsListSample.ts
[regenerateremoterenderingaccountkeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/regenerateRemoteRenderingAccountKeys.ts
[regeneratespatialanchorsaccountkeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/regenerateSpatialAnchorsAccountKeys.ts
[remoterenderingaccountscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/remoteRenderingAccountsCreateSample.ts
[remoterenderingaccountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/remoteRenderingAccountsDeleteSample.ts
[remoterenderingaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/remoteRenderingAccountsGetSample.ts
[remoterenderingaccountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/remoteRenderingAccountsListByResourceGroupSample.ts
[remoterenderingaccountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/remoteRenderingAccountsListBySubscriptionSample.ts
[remoterenderingaccountslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/remoteRenderingAccountsListKeysSample.ts
[remoterenderingaccountsregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/remoteRenderingAccountsRegenerateKeysSample.ts
[remoterenderingaccountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/remoteRenderingAccountsUpdateSample.ts
[spatialanchorsaccountscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/spatialAnchorsAccountsCreateSample.ts
[spatialanchorsaccountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/spatialAnchorsAccountsDeleteSample.ts
[spatialanchorsaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/spatialAnchorsAccountsGetSample.ts
[spatialanchorsaccountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/spatialAnchorsAccountsListByResourceGroupSample.ts
[spatialanchorsaccountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/spatialAnchorsAccountsListBySubscriptionSample.ts
[spatialanchorsaccountslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/spatialAnchorsAccountsListKeysSample.ts
[spatialanchorsaccountsregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/spatialAnchorsAccountsRegenerateKeysSample.ts
[spatialanchorsaccountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/spatialAnchorsAccountsUpdateSample.ts
[updateremoterenderingaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/updateRemoteRenderingAccount.ts
[updatespatialanchorsaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4-beta/typescript/src/updateSpatialAnchorsAccount.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-mixedreality?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mixedreality/arm-mixedreality/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkLocalNameAvailability.ts][checklocalnameavailability]                                 | Check Name Availability for local uniqueness x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/proxy/CheckNameAvailabilityForLocalUniqueness.json |
| [createRemoteRenderingAccount.ts][createremoterenderingaccount]                             | Creating or Updating a Remote Rendering Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/Put.json                      |
| [createSpatialAnchorAccount.ts][createspatialanchoraccount]                                 | Creating or Updating a Spatial Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/Put.json                        |
| [deleteRemoteRenderingAccount.ts][deleteremoterenderingaccount]                             | Delete a Remote Rendering Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/Delete.json                                 |
| [deleteSpatialAnchorsAccount.ts][deletespatialanchorsaccount]                               | Delete a Spatial Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/Delete.json                                   |
| [getRemoteRenderingAccount.ts][getremoterenderingaccount]                                   | Retrieve a Remote Rendering Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/Get.json                                  |
| [getSpatialAnchorsAccount.ts][getspatialanchorsaccount]                                     | Retrieve a Spatial Anchors Account. x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/Get.json                                    |
| [listAvailableOperations.ts][listavailableoperations]                                       | Exposing Available Operations x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/proxy/ExposingAvailableOperations.json                            |
| [listRemoteRenderingAccountKey.ts][listremoterenderingaccountkey]                           | List Both of the 2 Keys of a Remote Rendering Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/ListKeys.json            |
| [listRemoteRenderingAccountsByResourceGroup.ts][listremoterenderingaccountsbyresourcegroup] | List Resources by Resource Group x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/GetByResourceGroup.json                       |
| [listRemoteRenderingAccountsBySubscription.ts][listremoterenderingaccountsbysubscription]   | List Remote Rendering Accounts by Subscription x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/GetBySubscription.json          |
| [listSpatialAnchorAccountKey.ts][listspatialanchoraccountkey]                               | List Both of the 2 Keys of a Spatial Anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/ListKeys.json              |
| [listSpatialAnchorAccountsByResourceGroup.ts][listspatialanchoraccountsbyresourcegroup]     | List Resources by Resource Group x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/GetByResourceGroup.json                        |
| [listSpatialAnchorsAccountsBySubscription.ts][listspatialanchorsaccountsbysubscription]     | List Spatial Anchors Accounts by Subscription x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/GetBySubscription.json            |
| [regenerateRemoteRenderingAccountKeys.ts][regenerateremoterenderingaccountkeys]             | Regenerate specified Key of a Remote Rendering Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/RegenerateKey.json      |
| [regenerateSpatialAnchorsAccountKeys.ts][regeneratespatialanchorsaccountkeys]               | Regenerate specified Key of a Spatial Anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/RegenerateKey.json        |
| [updateRemoteRenderingAccount.ts][updateremoterenderingaccount]                             | Updating a Remote Rendering Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/remote-rendering/Patch.json                                 |
| [updateSpatialAnchorsAccount.ts][updatespatialanchorsaccount]                               | Updating a Spatial Anchors Account x-ms-original-file: specification/mixedreality/resource-manager/Microsoft.MixedReality/stable/2021-01-01/examples/spatial-anchors/Patch.json                                   |

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

[checklocalnameavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/checkLocalNameAvailability.ts
[createremoterenderingaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/createRemoteRenderingAccount.ts
[createspatialanchoraccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/createSpatialAnchorAccount.ts
[deleteremoterenderingaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/deleteRemoteRenderingAccount.ts
[deletespatialanchorsaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/deleteSpatialAnchorsAccount.ts
[getremoterenderingaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/getRemoteRenderingAccount.ts
[getspatialanchorsaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/getSpatialAnchorsAccount.ts
[listavailableoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/listAvailableOperations.ts
[listremoterenderingaccountkey]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/listRemoteRenderingAccountKey.ts
[listremoterenderingaccountsbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/listRemoteRenderingAccountsByResourceGroup.ts
[listremoterenderingaccountsbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/listRemoteRenderingAccountsBySubscription.ts
[listspatialanchoraccountkey]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/listSpatialAnchorAccountKey.ts
[listspatialanchoraccountsbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/listSpatialAnchorAccountsByResourceGroup.ts
[listspatialanchorsaccountsbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/listSpatialAnchorsAccountsBySubscription.ts
[regenerateremoterenderingaccountkeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/regenerateRemoteRenderingAccountKeys.ts
[regeneratespatialanchorsaccountkeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/regenerateSpatialAnchorsAccountKeys.ts
[updateremoterenderingaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/updateRemoteRenderingAccount.ts
[updatespatialanchorsaccount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mixedreality/arm-mixedreality/samples/v4/typescript/src/updateSpatialAnchorsAccount.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-mixedreality?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mixedreality/arm-mixedreality/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

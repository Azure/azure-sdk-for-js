# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [moveCollectionsBulkRemoveSample.ts][movecollectionsbulkremovesample]                                                 | Removes the set of move resources included in the request body from move collection. The orchestration is done by service. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_BulkRemove.json                                                                                                                                               |
| [moveCollectionsCommitSample.ts][movecollectionscommitsample]                                                         | Commits the set of resources included in the request body. The commit operation is triggered on the moveResources in the moveState 'CommitPending' or 'CommitFailed', on a successful completion the moveResource moveState do a transition to Committed. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_Commit.json                    |
| [moveCollectionsCreateSample.ts][movecollectionscreatesample]                                                         | Creates or updates a move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_Create.json                                                                                                                                                                                                                                                                                                                                                            |
| [moveCollectionsDeleteSample.ts][movecollectionsdeletesample]                                                         | Deletes a move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_Delete.json                                                                                                                                                                                                                                                                                                                                                                       |
| [moveCollectionsDiscardSample.ts][movecollectionsdiscardsample]                                                       | Discards the set of resources included in the request body. The discard operation is triggered on the moveResources in the moveState 'CommitPending' or 'DiscardFailed', on a successful completion the moveResource moveState do a transition to MovePending. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_Discard.json              |
| [moveCollectionsGetSample.ts][movecollectionsgetsample]                                                               | Gets the move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_Get.json                                                                                                                                                                                                                                                                                                                                                                           |
| [moveCollectionsInitiateMoveSample.ts][movecollectionsinitiatemovesample]                                             | Moves the set of resources included in the request body. The move operation is triggered after the moveResources are in the moveState 'MovePending' or 'MoveFailed', on a successful completion the moveResource moveState do a transition to CommitPending. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_InitiateMove.json           |
| [moveCollectionsListMoveCollectionsByResourceGroupSample.ts][movecollectionslistmovecollectionsbyresourcegroupsample] | Get all the Move Collections in the resource group. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_ListMoveCollectionsByResourceGroup.json                                                                                                                                                                                                                                                                                                                  |
| [moveCollectionsListMoveCollectionsBySubscriptionSample.ts][movecollectionslistmovecollectionsbysubscriptionsample]   | Get all the Move Collections in the subscription. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_ListMoveCollectionsBySubscription.json                                                                                                                                                                                                                                                                                                                     |
| [moveCollectionsListRequiredForSample.ts][movecollectionslistrequiredforsample]                                       | List of the move resources for which an arm resource is required for. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/RequiredFor_Get.json                                                                                                                                                                                                                                                                                                                                   |
| [moveCollectionsPrepareSample.ts][movecollectionspreparesample]                                                       | Initiates prepare for the set of resources included in the request body. The prepare operation is on the moveResources that are in the moveState 'PreparePending' or 'PrepareFailed', on a successful completion the moveResource moveState do a transition to MovePending. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_Prepare.json |
| [moveCollectionsResolveDependenciesSample.ts][movecollectionsresolvedependenciessample]                               | Computes, resolves and validate the dependencies of the moveResources in the move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_ResolveDependencies.json                                                                                                                                                                                                                                                                                       |
| [moveCollectionsUpdateSample.ts][movecollectionsupdatesample]                                                         | Updates a move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveCollections_Update.json                                                                                                                                                                                                                                                                                                                                                                       |
| [moveResourcesCreateSample.ts][moveresourcescreatesample]                                                             | Creates or updates a Move Resource in the move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveResources_Create.json                                                                                                                                                                                                                                                                                                                                         |
| [moveResourcesDeleteSample.ts][moveresourcesdeletesample]                                                             | Deletes a Move Resource from the move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveResources_Delete.json                                                                                                                                                                                                                                                                                                                                                  |
| [moveResourcesGetSample.ts][moveresourcesgetsample]                                                                   | Gets the Move Resource. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveResources_Get.json                                                                                                                                                                                                                                                                                                                                                                               |
| [moveResourcesListSample.ts][moveresourceslistsample]                                                                 | Lists the Move Resources in the move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/MoveResources_List.json                                                                                                                                                                                                                                                                                                                                                     |
| [operationsDiscoveryGetSample.ts][operationsdiscoverygetsample]                                                       | x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/OperationsDiscovery_Get.json                                                                                                                                                                                                                                                                                                                                                                                                 |
| [unresolvedDependenciesGetSample.ts][unresolveddependenciesgetsample]                                                 | Gets a list of unresolved dependencies. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/UnresolvedDependencies_Get.json                                                                                                                                                                                                                                                                                                                                                      |

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
node dist/moveCollectionsBulkRemoveSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env RESOURCEMOVER_SUBSCRIPTION_ID="<resourcemover subscription id>" RESOURCEMOVER_RESOURCE_GROUP="<resourcemover resource group>" node dist/moveCollectionsBulkRemoveSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[movecollectionsbulkremovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsBulkRemoveSample.ts
[movecollectionscommitsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsCommitSample.ts
[movecollectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsCreateSample.ts
[movecollectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsDeleteSample.ts
[movecollectionsdiscardsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsDiscardSample.ts
[movecollectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsGetSample.ts
[movecollectionsinitiatemovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsInitiateMoveSample.ts
[movecollectionslistmovecollectionsbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsListMoveCollectionsByResourceGroupSample.ts
[movecollectionslistmovecollectionsbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsListMoveCollectionsBySubscriptionSample.ts
[movecollectionslistrequiredforsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsListRequiredForSample.ts
[movecollectionspreparesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsPrepareSample.ts
[movecollectionsresolvedependenciessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsResolveDependenciesSample.ts
[movecollectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsUpdateSample.ts
[moveresourcescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveResourcesCreateSample.ts
[moveresourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveResourcesDeleteSample.ts
[moveresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveResourcesGetSample.ts
[moveresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveResourcesListSample.ts
[operationsdiscoverygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/operationsDiscoveryGetSample.ts
[unresolveddependenciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/unresolvedDependenciesGetSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-resourcemover?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcemover/arm-resourcemover/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

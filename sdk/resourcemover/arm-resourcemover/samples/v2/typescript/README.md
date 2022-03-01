# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [moveCollectionsBulkRemove.ts][movecollectionsbulkremove]                                                 | Removes the set of move resources included in the request body from move collection. The orchestration is done by service. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_BulkRemove.json                                                                                                                                               |
| [moveCollectionsCommit.ts][movecollectionscommit]                                                         | Commits the set of resources included in the request body. The commit operation is triggered on the moveResources in the moveState 'CommitPending' or 'CommitFailed', on a successful completion the moveResource moveState do a transition to Committed. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_Commit.json                    |
| [moveCollectionsCreate.ts][movecollectionscreate]                                                         | Creates or updates a move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_Create.json                                                                                                                                                                                                                                                                                                                                                            |
| [moveCollectionsDelete.ts][movecollectionsdelete]                                                         | Deletes a move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_Delete.json                                                                                                                                                                                                                                                                                                                                                                       |
| [moveCollectionsDiscard.ts][movecollectionsdiscard]                                                       | Discards the set of resources included in the request body. The discard operation is triggered on the moveResources in the moveState 'CommitPending' or 'DiscardFailed', on a successful completion the moveResource moveState do a transition to MovePending. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_Discard.json              |
| [moveCollectionsGet.ts][movecollectionsget]                                                               | Gets the move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_Get.json                                                                                                                                                                                                                                                                                                                                                                           |
| [moveCollectionsInitiateMove.ts][movecollectionsinitiatemove]                                             | Moves the set of resources included in the request body. The move operation is triggered after the moveResources are in the moveState 'MovePending' or 'MoveFailed', on a successful completion the moveResource moveState do a transition to CommitPending. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_InitiateMove.json           |
| [moveCollectionsListMoveCollectionsByResourceGroup.ts][movecollectionslistmovecollectionsbyresourcegroup] | Get all the Move Collections in the resource group. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_ListMoveCollectionsByResourceGroup.json                                                                                                                                                                                                                                                                                                                  |
| [moveCollectionsListMoveCollectionsBySubscription.ts][movecollectionslistmovecollectionsbysubscription]   | Get all the Move Collections in the subscription. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_ListMoveCollectionsBySubscription.json                                                                                                                                                                                                                                                                                                                     |
| [moveCollectionsPrepare.ts][movecollectionsprepare]                                                       | Initiates prepare for the set of resources included in the request body. The prepare operation is on the moveResources that are in the moveState 'PreparePending' or 'PrepareFailed', on a successful completion the moveResource moveState do a transition to MovePending. To aid the user to prerequisite the operation the client can call operation with validateOnly property set to true. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_Prepare.json |
| [moveCollectionsResolveDependencies.ts][movecollectionsresolvedependencies]                               | Computes, resolves and validate the dependencies of the moveResources in the move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_ResolveDependencies.json                                                                                                                                                                                                                                                                                       |
| [moveCollectionsUpdate.ts][movecollectionsupdate]                                                         | Updates a move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveCollections_Update.json                                                                                                                                                                                                                                                                                                                                                                       |
| [moveResourcesCreate.ts][moveresourcescreate]                                                             | Creates or updates a Move Resource in the move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveResources_Create.json                                                                                                                                                                                                                                                                                                                                         |
| [moveResourcesDelete.ts][moveresourcesdelete]                                                             | Deletes a Move Resource from the move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveResources_Delete.json                                                                                                                                                                                                                                                                                                                                                  |
| [moveResourcesGet.ts][moveresourcesget]                                                                   | Gets the Move Resource. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveResources_Get.json                                                                                                                                                                                                                                                                                                                                                                               |
| [moveResourcesList.ts][moveresourceslist]                                                                 | Lists the Move Resources in the move collection. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/MoveResources_List.json                                                                                                                                                                                                                                                                                                                                                     |
| [operationsDiscoveryGet.ts][operationsdiscoveryget]                                                       | x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/OperationsDiscovery_Get.json                                                                                                                                                                                                                                                                                                                                                                                                 |
| [requiredForGet.ts][requiredforget]                                                                       | List of the move resources for which an arm resource is required for. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/RequiredFor_Get.json                                                                                                                                                                                                                                                                                                                                   |
| [unresolvedDependenciesGet.ts][unresolveddependenciesget]                                                 | Gets a list of unresolved dependencies. x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2021-08-01/examples/UnresolvedDependencies_Get.json                                                                                                                                                                                                                                                                                                                                                      |

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
node dist/moveCollectionsBulkRemove.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/moveCollectionsBulkRemove.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[movecollectionsbulkremove]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsBulkRemove.ts
[movecollectionscommit]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsCommit.ts
[movecollectionscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsCreate.ts
[movecollectionsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsDelete.ts
[movecollectionsdiscard]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsDiscard.ts
[movecollectionsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsGet.ts
[movecollectionsinitiatemove]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsInitiateMove.ts
[movecollectionslistmovecollectionsbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsListMoveCollectionsByResourceGroup.ts
[movecollectionslistmovecollectionsbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsListMoveCollectionsBySubscription.ts
[movecollectionsprepare]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsPrepare.ts
[movecollectionsresolvedependencies]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsResolveDependencies.ts
[movecollectionsupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveCollectionsUpdate.ts
[moveresourcescreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveResourcesCreate.ts
[moveresourcesdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveResourcesDelete.ts
[moveresourcesget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveResourcesGet.ts
[moveresourceslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/moveResourcesList.ts
[operationsdiscoveryget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/operationsDiscoveryGet.ts
[requiredforget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/requiredForGet.ts
[unresolveddependenciesget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/resourcemover/arm-resourcemover/samples/v2/typescript/src/unresolvedDependenciesGet.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-resourcemover?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/resourcemover/arm-resourcemover/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

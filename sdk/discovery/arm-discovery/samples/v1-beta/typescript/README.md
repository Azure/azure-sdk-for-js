# @azure/arm-discovery client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-discovery in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bookshelfPrivateEndpointConnectionsCreateOrUpdateSample.ts][bookshelfprivateendpointconnectionscreateorupdatesample]   | approves or updates the specified private endpoint connection. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_CreateOrUpdate_MaximumSet_Gen.json     |
| [bookshelfPrivateEndpointConnectionsDeleteSample.ts][bookshelfprivateendpointconnectionsdeletesample]                   | deletes the specified private endpoint connection. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_Delete_MaximumSet_Gen.json                         |
| [bookshelfPrivateEndpointConnectionsGetSample.ts][bookshelfprivateendpointconnectionsgetsample]                         | gets the specified private endpoint connection associated with the bookshelf. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_Get_MaximumSet_Gen.json |
| [bookshelfPrivateEndpointConnectionsListByBookshelfSample.ts][bookshelfprivateendpointconnectionslistbybookshelfsample] | lists all private endpoint connections for a bookshelf. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_ListByBookshelf_MaximumSet_Gen.json           |
| [bookshelfPrivateLinkResourcesGetSample.ts][bookshelfprivatelinkresourcesgetsample]                                     | gets the specified private link resource for the bookshelf. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateLinkResources_Get_MaximumSet_Gen.json                         |
| [bookshelfPrivateLinkResourcesListByBookshelfSample.ts][bookshelfprivatelinkresourceslistbybookshelfsample]             | lists all private link resources for the bookshelf. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateLinkResources_ListByBookshelf_MaximumSet_Gen.json                     |
| [bookshelvesCreateOrUpdateSample.ts][bookshelvescreateorupdatesample]                                                   | create a Bookshelf x-ms-original-file: 2026-02-01-preview/Bookshelves_CreateOrUpdate_MaximumSet_Gen.json                                                                         |
| [bookshelvesDeleteSample.ts][bookshelvesdeletesample]                                                                   | delete a Bookshelf x-ms-original-file: 2026-02-01-preview/Bookshelves_Delete_MaximumSet_Gen.json                                                                                 |
| [bookshelvesGetSample.ts][bookshelvesgetsample]                                                                         | get a Bookshelf x-ms-original-file: 2026-02-01-preview/Bookshelves_Get_MaximumSet_Gen.json                                                                                       |
| [bookshelvesListByResourceGroupSample.ts][bookshelveslistbyresourcegroupsample]                                         | list Bookshelf resources by resource group x-ms-original-file: 2026-02-01-preview/Bookshelves_ListByResourceGroup_MaximumSet_Gen.json                                            |
| [bookshelvesListBySubscriptionSample.ts][bookshelveslistbysubscriptionsample]                                           | list Bookshelf resources by subscription ID x-ms-original-file: 2026-02-01-preview/Bookshelves_ListBySubscription_MaximumSet_Gen.json                                            |
| [bookshelvesUpdateSample.ts][bookshelvesupdatesample]                                                                   | update a Bookshelf x-ms-original-file: 2026-02-01-preview/Bookshelves_Update_MaximumSet_Gen.json                                                                                 |
| [chatModelDeploymentsCreateOrUpdateSample.ts][chatmodeldeploymentscreateorupdatesample]                                 | create a ChatModelDeployment x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_CreateOrUpdate_MaximumSet_Gen.json                                                      |
| [chatModelDeploymentsDeleteSample.ts][chatmodeldeploymentsdeletesample]                                                 | delete a ChatModelDeployment x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_Delete_MaximumSet_Gen.json                                                              |
| [chatModelDeploymentsGetSample.ts][chatmodeldeploymentsgetsample]                                                       | get a ChatModelDeployment x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_Get_MaximumSet_Gen.json                                                                    |
| [chatModelDeploymentsListByWorkspaceSample.ts][chatmodeldeploymentslistbyworkspacesample]                               | list ChatModelDeployment resources by Workspace x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_ListByWorkspace_MaximumSet_Gen.json                                  |
| [chatModelDeploymentsUpdateSample.ts][chatmodeldeploymentsupdatesample]                                                 | update a ChatModelDeployment x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_Update_MaximumSet_Gen.json                                                              |
| [nodePoolsCreateOrUpdateSample.ts][nodepoolscreateorupdatesample]                                                       | create a NodePool x-ms-original-file: 2026-02-01-preview/NodePools_CreateOrUpdate_MaximumSet_Gen.json                                                                            |
| [nodePoolsDeleteSample.ts][nodepoolsdeletesample]                                                                       | delete a NodePool x-ms-original-file: 2026-02-01-preview/NodePools_Delete_MaximumSet_Gen.json                                                                                    |
| [nodePoolsGetSample.ts][nodepoolsgetsample]                                                                             | get a NodePool x-ms-original-file: 2026-02-01-preview/NodePools_Get_MaximumSet_Gen.json                                                                                          |
| [nodePoolsListBySupercomputerSample.ts][nodepoolslistbysupercomputersample]                                             | list NodePool resources by Supercomputer x-ms-original-file: 2026-02-01-preview/NodePools_ListBySupercomputer_MaximumSet_Gen.json                                                |
| [nodePoolsUpdateSample.ts][nodepoolsupdatesample]                                                                       | update a NodePool x-ms-original-file: 2026-02-01-preview/NodePools_Update_MaximumSet_Gen.json                                                                                    |
| [operationsListSample.ts][operationslistsample]                                                                         | list the operations for the provider x-ms-original-file: 2026-02-01-preview/Operations_List_MaximumSet_Gen.json                                                                  |
| [projectsCreateOrUpdateSample.ts][projectscreateorupdatesample]                                                         | create a Project x-ms-original-file: 2026-02-01-preview/Projects_CreateOrUpdate_MaximumSet_Gen.json                                                                              |
| [projectsDeleteSample.ts][projectsdeletesample]                                                                         | delete a Project x-ms-original-file: 2026-02-01-preview/Projects_Delete_MaximumSet_Gen.json                                                                                      |
| [projectsGetSample.ts][projectsgetsample]                                                                               | get a Project x-ms-original-file: 2026-02-01-preview/Projects_Get_MaximumSet_Gen.json                                                                                            |
| [projectsListByWorkspaceSample.ts][projectslistbyworkspacesample]                                                       | list Project resources by Workspace x-ms-original-file: 2026-02-01-preview/Projects_ListByWorkspace_MaximumSet_Gen.json                                                          |
| [projectsUpdateSample.ts][projectsupdatesample]                                                                         | update a Project x-ms-original-file: 2026-02-01-preview/Projects_Update_MaximumSet_Gen.json                                                                                      |
| [storageAssetsCreateOrUpdateSample.ts][storageassetscreateorupdatesample]                                               | create a StorageAsset x-ms-original-file: 2026-02-01-preview/StorageAssets_CreateOrUpdate_MaximumSet_Gen.json                                                                    |
| [storageAssetsDeleteSample.ts][storageassetsdeletesample]                                                               | delete a StorageAsset x-ms-original-file: 2026-02-01-preview/StorageAssets_Delete_MaximumSet_Gen.json                                                                            |
| [storageAssetsGetSample.ts][storageassetsgetsample]                                                                     | get a StorageAsset x-ms-original-file: 2026-02-01-preview/StorageAssets_Get_MaximumSet_Gen.json                                                                                  |
| [storageAssetsListByStorageContainerSample.ts][storageassetslistbystoragecontainersample]                               | list StorageAsset resources by StorageContainer x-ms-original-file: 2026-02-01-preview/StorageAssets_ListByStorageContainer_MaximumSet_Gen.json                                  |
| [storageAssetsUpdateSample.ts][storageassetsupdatesample]                                                               | update a StorageAsset x-ms-original-file: 2026-02-01-preview/StorageAssets_Update_MaximumSet_Gen.json                                                                            |
| [storageContainersCreateOrUpdateSample.ts][storagecontainerscreateorupdatesample]                                       | create a StorageContainer x-ms-original-file: 2026-02-01-preview/StorageContainers_CreateOrUpdate_MaximumSet_Gen.json                                                            |
| [storageContainersDeleteSample.ts][storagecontainersdeletesample]                                                       | delete a StorageContainer x-ms-original-file: 2026-02-01-preview/StorageContainers_Delete_MaximumSet_Gen.json                                                                    |
| [storageContainersGetSample.ts][storagecontainersgetsample]                                                             | get a StorageContainer x-ms-original-file: 2026-02-01-preview/StorageContainers_Get_MaximumSet_Gen.json                                                                          |
| [storageContainersListByResourceGroupSample.ts][storagecontainerslistbyresourcegroupsample]                             | list StorageContainer resources by resource group x-ms-original-file: 2026-02-01-preview/StorageContainers_ListByResourceGroup_MaximumSet_Gen.json                               |
| [storageContainersListBySubscriptionSample.ts][storagecontainerslistbysubscriptionsample]                               | list StorageContainer resources by subscription ID x-ms-original-file: 2026-02-01-preview/StorageContainers_ListBySubscription_MaximumSet_Gen.json                               |
| [storageContainersUpdateSample.ts][storagecontainersupdatesample]                                                       | update a StorageContainer x-ms-original-file: 2026-02-01-preview/StorageContainers_Update_MaximumSet_Gen.json                                                                    |
| [supercomputersCreateOrUpdateSample.ts][supercomputerscreateorupdatesample]                                             | create a Supercomputer x-ms-original-file: 2026-02-01-preview/Supercomputers_CreateOrUpdate_MaximumSet_Gen.json                                                                  |
| [supercomputersDeleteSample.ts][supercomputersdeletesample]                                                             | delete a Supercomputer x-ms-original-file: 2026-02-01-preview/Supercomputers_Delete_MaximumSet_Gen.json                                                                          |
| [supercomputersGetSample.ts][supercomputersgetsample]                                                                   | get a Supercomputer x-ms-original-file: 2026-02-01-preview/Supercomputers_Get_MaximumSet_Gen.json                                                                                |
| [supercomputersListByResourceGroupSample.ts][supercomputerslistbyresourcegroupsample]                                   | list Supercomputer resources by resource group x-ms-original-file: 2026-02-01-preview/Supercomputers_ListByResourceGroup_MaximumSet_Gen.json                                     |
| [supercomputersListBySubscriptionSample.ts][supercomputerslistbysubscriptionsample]                                     | list Supercomputer resources by subscription ID x-ms-original-file: 2026-02-01-preview/Supercomputers_ListBySubscription_MaximumSet_Gen.json                                     |
| [supercomputersUpdateSample.ts][supercomputersupdatesample]                                                             | update a Supercomputer x-ms-original-file: 2026-02-01-preview/Supercomputers_Update_MaximumSet_Gen.json                                                                          |
| [toolsCreateOrUpdateSample.ts][toolscreateorupdatesample]                                                               | create a Tool x-ms-original-file: 2026-02-01-preview/Tools_CreateOrUpdate_MaximumSet_Gen.json                                                                                    |
| [toolsDeleteSample.ts][toolsdeletesample]                                                                               | delete a Tool x-ms-original-file: 2026-02-01-preview/Tools_Delete_MaximumSet_Gen.json                                                                                            |
| [toolsGetSample.ts][toolsgetsample]                                                                                     | get a Tool x-ms-original-file: 2026-02-01-preview/Tools_Get_MaximumSet_Gen.json                                                                                                  |
| [toolsListByResourceGroupSample.ts][toolslistbyresourcegroupsample]                                                     | list Tool resources by resource group x-ms-original-file: 2026-02-01-preview/Tools_ListByResourceGroup_MaximumSet_Gen.json                                                       |
| [toolsListBySubscriptionSample.ts][toolslistbysubscriptionsample]                                                       | list Tool resources by subscription ID x-ms-original-file: 2026-02-01-preview/Tools_ListBySubscription_MaximumSet_Gen.json                                                       |
| [toolsUpdateSample.ts][toolsupdatesample]                                                                               | update a Tool x-ms-original-file: 2026-02-01-preview/Tools_Update_MaximumSet_Gen.json                                                                                            |
| [workspacePrivateEndpointConnectionsCreateOrUpdateSample.ts][workspaceprivateendpointconnectionscreateorupdatesample]   | approves or updates the specified private endpoint connection. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_CreateOrUpdate_MaximumSet_Gen.json     |
| [workspacePrivateEndpointConnectionsDeleteSample.ts][workspaceprivateendpointconnectionsdeletesample]                   | deletes the specified private endpoint connection. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_Delete_MaximumSet_Gen.json                         |
| [workspacePrivateEndpointConnectionsGetSample.ts][workspaceprivateendpointconnectionsgetsample]                         | gets the specified private endpoint connection associated with the workspace. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_Get_MaximumSet_Gen.json |
| [workspacePrivateEndpointConnectionsListByWorkspaceSample.ts][workspaceprivateendpointconnectionslistbyworkspacesample] | lists all private endpoint connections for a workspace. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_ListByWorkspace_MaximumSet_Gen.json           |
| [workspacePrivateLinkResourcesGetSample.ts][workspaceprivatelinkresourcesgetsample]                                     | gets the specified private link resource for the workspace. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateLinkResources_Get_MaximumSet_Gen.json                         |
| [workspacePrivateLinkResourcesListByWorkspaceSample.ts][workspaceprivatelinkresourceslistbyworkspacesample]             | lists all private link resources for the workspace. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateLinkResources_ListByWorkspace_MaximumSet_Gen.json                     |
| [workspacesCreateOrUpdateSample.ts][workspacescreateorupdatesample]                                                     | create a Workspace x-ms-original-file: 2026-02-01-preview/Workspaces_CreateOrUpdate_MaximumSet_Gen.json                                                                          |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                                                     | delete a Workspace x-ms-original-file: 2026-02-01-preview/Workspaces_Delete_MaximumSet_Gen.json                                                                                  |
| [workspacesGetSample.ts][workspacesgetsample]                                                                           | get a Workspace x-ms-original-file: 2026-02-01-preview/Workspaces_Get_MaximumSet_Gen.json                                                                                        |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample]                                           | list Workspace resources by resource group x-ms-original-file: 2026-02-01-preview/Workspaces_ListByResourceGroup_MaximumSet_Gen.json                                             |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]                                             | list Workspace resources by subscription ID x-ms-original-file: 2026-02-01-preview/Workspaces_ListBySubscription_MaximumSet_Gen.json                                             |
| [workspacesUpdateSample.ts][workspacesupdatesample]                                                                     | update a Workspace x-ms-original-file: 2026-02-01-preview/Workspaces_Update_MaximumSet_Gen.json                                                                                  |

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
node dist/bookshelfPrivateEndpointConnectionsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/bookshelfPrivateEndpointConnectionsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bookshelfprivateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelfPrivateEndpointConnectionsCreateOrUpdateSample.ts
[bookshelfprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelfPrivateEndpointConnectionsDeleteSample.ts
[bookshelfprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelfPrivateEndpointConnectionsGetSample.ts
[bookshelfprivateendpointconnectionslistbybookshelfsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelfPrivateEndpointConnectionsListByBookshelfSample.ts
[bookshelfprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelfPrivateLinkResourcesGetSample.ts
[bookshelfprivatelinkresourceslistbybookshelfsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelfPrivateLinkResourcesListByBookshelfSample.ts
[bookshelvescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelvesCreateOrUpdateSample.ts
[bookshelvesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelvesDeleteSample.ts
[bookshelvesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelvesGetSample.ts
[bookshelveslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelvesListByResourceGroupSample.ts
[bookshelveslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelvesListBySubscriptionSample.ts
[bookshelvesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/bookshelvesUpdateSample.ts
[chatmodeldeploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/chatModelDeploymentsCreateOrUpdateSample.ts
[chatmodeldeploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/chatModelDeploymentsDeleteSample.ts
[chatmodeldeploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/chatModelDeploymentsGetSample.ts
[chatmodeldeploymentslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/chatModelDeploymentsListByWorkspaceSample.ts
[chatmodeldeploymentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/chatModelDeploymentsUpdateSample.ts
[nodepoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/nodePoolsCreateOrUpdateSample.ts
[nodepoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/nodePoolsDeleteSample.ts
[nodepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/nodePoolsGetSample.ts
[nodepoolslistbysupercomputersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/nodePoolsListBySupercomputerSample.ts
[nodepoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/nodePoolsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/operationsListSample.ts
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/projectsCreateOrUpdateSample.ts
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/projectsDeleteSample.ts
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/projectsGetSample.ts
[projectslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/projectsListByWorkspaceSample.ts
[projectsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/projectsUpdateSample.ts
[storageassetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageAssetsCreateOrUpdateSample.ts
[storageassetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageAssetsDeleteSample.ts
[storageassetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageAssetsGetSample.ts
[storageassetslistbystoragecontainersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageAssetsListByStorageContainerSample.ts
[storageassetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageAssetsUpdateSample.ts
[storagecontainerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageContainersCreateOrUpdateSample.ts
[storagecontainersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageContainersDeleteSample.ts
[storagecontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageContainersGetSample.ts
[storagecontainerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageContainersListByResourceGroupSample.ts
[storagecontainerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageContainersListBySubscriptionSample.ts
[storagecontainersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/storageContainersUpdateSample.ts
[supercomputerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/supercomputersCreateOrUpdateSample.ts
[supercomputersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/supercomputersDeleteSample.ts
[supercomputersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/supercomputersGetSample.ts
[supercomputerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/supercomputersListByResourceGroupSample.ts
[supercomputerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/supercomputersListBySubscriptionSample.ts
[supercomputersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/supercomputersUpdateSample.ts
[toolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/toolsCreateOrUpdateSample.ts
[toolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/toolsDeleteSample.ts
[toolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/toolsGetSample.ts
[toolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/toolsListByResourceGroupSample.ts
[toolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/toolsListBySubscriptionSample.ts
[toolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/toolsUpdateSample.ts
[workspaceprivateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacePrivateEndpointConnectionsCreateOrUpdateSample.ts
[workspaceprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacePrivateEndpointConnectionsDeleteSample.ts
[workspaceprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacePrivateEndpointConnectionsGetSample.ts
[workspaceprivateendpointconnectionslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacePrivateEndpointConnectionsListByWorkspaceSample.ts
[workspaceprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacePrivateLinkResourcesGetSample.ts
[workspaceprivatelinkresourceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacePrivateLinkResourcesListByWorkspaceSample.ts
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacesCreateOrUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/typescript/src/workspacesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-discovery?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/discovery/arm-discovery/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

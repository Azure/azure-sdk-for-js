# @azure/arm-discovery client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-discovery in some common scenarios.

| **File Name**                                                                                                           | **Description**                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bookshelfPrivateEndpointConnectionsCreateOrUpdateSample.js][bookshelfprivateendpointconnectionscreateorupdatesample]   | approves or updates the specified private endpoint connection. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_CreateOrUpdate_MaximumSet_Gen.json     |
| [bookshelfPrivateEndpointConnectionsDeleteSample.js][bookshelfprivateendpointconnectionsdeletesample]                   | deletes the specified private endpoint connection. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_Delete_MaximumSet_Gen.json                         |
| [bookshelfPrivateEndpointConnectionsGetSample.js][bookshelfprivateendpointconnectionsgetsample]                         | gets the specified private endpoint connection associated with the bookshelf. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_Get_MaximumSet_Gen.json |
| [bookshelfPrivateEndpointConnectionsListByBookshelfSample.js][bookshelfprivateendpointconnectionslistbybookshelfsample] | lists all private endpoint connections for a bookshelf. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateEndpointConnections_ListByBookshelf_MaximumSet_Gen.json           |
| [bookshelfPrivateLinkResourcesGetSample.js][bookshelfprivatelinkresourcesgetsample]                                     | gets the specified private link resource for the bookshelf. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateLinkResources_Get_MaximumSet_Gen.json                         |
| [bookshelfPrivateLinkResourcesListByBookshelfSample.js][bookshelfprivatelinkresourceslistbybookshelfsample]             | lists all private link resources for the bookshelf. x-ms-original-file: 2026-02-01-preview/BookshelfPrivateLinkResources_ListByBookshelf_MaximumSet_Gen.json                     |
| [bookshelvesCreateOrUpdateSample.js][bookshelvescreateorupdatesample]                                                   | create a Bookshelf x-ms-original-file: 2026-02-01-preview/Bookshelves_CreateOrUpdate_MaximumSet_Gen.json                                                                         |
| [bookshelvesDeleteSample.js][bookshelvesdeletesample]                                                                   | delete a Bookshelf x-ms-original-file: 2026-02-01-preview/Bookshelves_Delete_MaximumSet_Gen.json                                                                                 |
| [bookshelvesGetSample.js][bookshelvesgetsample]                                                                         | get a Bookshelf x-ms-original-file: 2026-02-01-preview/Bookshelves_Get_MaximumSet_Gen.json                                                                                       |
| [bookshelvesListByResourceGroupSample.js][bookshelveslistbyresourcegroupsample]                                         | list Bookshelf resources by resource group x-ms-original-file: 2026-02-01-preview/Bookshelves_ListByResourceGroup_MaximumSet_Gen.json                                            |
| [bookshelvesListBySubscriptionSample.js][bookshelveslistbysubscriptionsample]                                           | list Bookshelf resources by subscription ID x-ms-original-file: 2026-02-01-preview/Bookshelves_ListBySubscription_MaximumSet_Gen.json                                            |
| [bookshelvesUpdateSample.js][bookshelvesupdatesample]                                                                   | update a Bookshelf x-ms-original-file: 2026-02-01-preview/Bookshelves_Update_MaximumSet_Gen.json                                                                                 |
| [chatModelDeploymentsCreateOrUpdateSample.js][chatmodeldeploymentscreateorupdatesample]                                 | create a ChatModelDeployment x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_CreateOrUpdate_MaximumSet_Gen.json                                                      |
| [chatModelDeploymentsDeleteSample.js][chatmodeldeploymentsdeletesample]                                                 | delete a ChatModelDeployment x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_Delete_MaximumSet_Gen.json                                                              |
| [chatModelDeploymentsGetSample.js][chatmodeldeploymentsgetsample]                                                       | get a ChatModelDeployment x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_Get_MaximumSet_Gen.json                                                                    |
| [chatModelDeploymentsListByWorkspaceSample.js][chatmodeldeploymentslistbyworkspacesample]                               | list ChatModelDeployment resources by Workspace x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_ListByWorkspace_MaximumSet_Gen.json                                  |
| [chatModelDeploymentsUpdateSample.js][chatmodeldeploymentsupdatesample]                                                 | update a ChatModelDeployment x-ms-original-file: 2026-02-01-preview/ChatModelDeployments_Update_MaximumSet_Gen.json                                                              |
| [nodePoolsCreateOrUpdateSample.js][nodepoolscreateorupdatesample]                                                       | create a NodePool x-ms-original-file: 2026-02-01-preview/NodePools_CreateOrUpdate_MaximumSet_Gen.json                                                                            |
| [nodePoolsDeleteSample.js][nodepoolsdeletesample]                                                                       | delete a NodePool x-ms-original-file: 2026-02-01-preview/NodePools_Delete_MaximumSet_Gen.json                                                                                    |
| [nodePoolsGetSample.js][nodepoolsgetsample]                                                                             | get a NodePool x-ms-original-file: 2026-02-01-preview/NodePools_Get_MaximumSet_Gen.json                                                                                          |
| [nodePoolsListBySupercomputerSample.js][nodepoolslistbysupercomputersample]                                             | list NodePool resources by Supercomputer x-ms-original-file: 2026-02-01-preview/NodePools_ListBySupercomputer_MaximumSet_Gen.json                                                |
| [nodePoolsUpdateSample.js][nodepoolsupdatesample]                                                                       | update a NodePool x-ms-original-file: 2026-02-01-preview/NodePools_Update_MaximumSet_Gen.json                                                                                    |
| [operationsListSample.js][operationslistsample]                                                                         | list the operations for the provider x-ms-original-file: 2026-02-01-preview/Operations_List_MaximumSet_Gen.json                                                                  |
| [projectsCreateOrUpdateSample.js][projectscreateorupdatesample]                                                         | create a Project x-ms-original-file: 2026-02-01-preview/Projects_CreateOrUpdate_MaximumSet_Gen.json                                                                              |
| [projectsDeleteSample.js][projectsdeletesample]                                                                         | delete a Project x-ms-original-file: 2026-02-01-preview/Projects_Delete_MaximumSet_Gen.json                                                                                      |
| [projectsGetSample.js][projectsgetsample]                                                                               | get a Project x-ms-original-file: 2026-02-01-preview/Projects_Get_MaximumSet_Gen.json                                                                                            |
| [projectsListByWorkspaceSample.js][projectslistbyworkspacesample]                                                       | list Project resources by Workspace x-ms-original-file: 2026-02-01-preview/Projects_ListByWorkspace_MaximumSet_Gen.json                                                          |
| [projectsUpdateSample.js][projectsupdatesample]                                                                         | update a Project x-ms-original-file: 2026-02-01-preview/Projects_Update_MaximumSet_Gen.json                                                                                      |
| [storageAssetsCreateOrUpdateSample.js][storageassetscreateorupdatesample]                                               | create a StorageAsset x-ms-original-file: 2026-02-01-preview/StorageAssets_CreateOrUpdate_MaximumSet_Gen.json                                                                    |
| [storageAssetsDeleteSample.js][storageassetsdeletesample]                                                               | delete a StorageAsset x-ms-original-file: 2026-02-01-preview/StorageAssets_Delete_MaximumSet_Gen.json                                                                            |
| [storageAssetsGetSample.js][storageassetsgetsample]                                                                     | get a StorageAsset x-ms-original-file: 2026-02-01-preview/StorageAssets_Get_MaximumSet_Gen.json                                                                                  |
| [storageAssetsListByStorageContainerSample.js][storageassetslistbystoragecontainersample]                               | list StorageAsset resources by StorageContainer x-ms-original-file: 2026-02-01-preview/StorageAssets_ListByStorageContainer_MaximumSet_Gen.json                                  |
| [storageAssetsUpdateSample.js][storageassetsupdatesample]                                                               | update a StorageAsset x-ms-original-file: 2026-02-01-preview/StorageAssets_Update_MaximumSet_Gen.json                                                                            |
| [storageContainersCreateOrUpdateSample.js][storagecontainerscreateorupdatesample]                                       | create a StorageContainer x-ms-original-file: 2026-02-01-preview/StorageContainers_CreateOrUpdate_MaximumSet_Gen.json                                                            |
| [storageContainersDeleteSample.js][storagecontainersdeletesample]                                                       | delete a StorageContainer x-ms-original-file: 2026-02-01-preview/StorageContainers_Delete_MaximumSet_Gen.json                                                                    |
| [storageContainersGetSample.js][storagecontainersgetsample]                                                             | get a StorageContainer x-ms-original-file: 2026-02-01-preview/StorageContainers_Get_MaximumSet_Gen.json                                                                          |
| [storageContainersListByResourceGroupSample.js][storagecontainerslistbyresourcegroupsample]                             | list StorageContainer resources by resource group x-ms-original-file: 2026-02-01-preview/StorageContainers_ListByResourceGroup_MaximumSet_Gen.json                               |
| [storageContainersListBySubscriptionSample.js][storagecontainerslistbysubscriptionsample]                               | list StorageContainer resources by subscription ID x-ms-original-file: 2026-02-01-preview/StorageContainers_ListBySubscription_MaximumSet_Gen.json                               |
| [storageContainersUpdateSample.js][storagecontainersupdatesample]                                                       | update a StorageContainer x-ms-original-file: 2026-02-01-preview/StorageContainers_Update_MaximumSet_Gen.json                                                                    |
| [supercomputersCreateOrUpdateSample.js][supercomputerscreateorupdatesample]                                             | create a Supercomputer x-ms-original-file: 2026-02-01-preview/Supercomputers_CreateOrUpdate_MaximumSet_Gen.json                                                                  |
| [supercomputersDeleteSample.js][supercomputersdeletesample]                                                             | delete a Supercomputer x-ms-original-file: 2026-02-01-preview/Supercomputers_Delete_MaximumSet_Gen.json                                                                          |
| [supercomputersGetSample.js][supercomputersgetsample]                                                                   | get a Supercomputer x-ms-original-file: 2026-02-01-preview/Supercomputers_Get_MaximumSet_Gen.json                                                                                |
| [supercomputersListByResourceGroupSample.js][supercomputerslistbyresourcegroupsample]                                   | list Supercomputer resources by resource group x-ms-original-file: 2026-02-01-preview/Supercomputers_ListByResourceGroup_MaximumSet_Gen.json                                     |
| [supercomputersListBySubscriptionSample.js][supercomputerslistbysubscriptionsample]                                     | list Supercomputer resources by subscription ID x-ms-original-file: 2026-02-01-preview/Supercomputers_ListBySubscription_MaximumSet_Gen.json                                     |
| [supercomputersUpdateSample.js][supercomputersupdatesample]                                                             | update a Supercomputer x-ms-original-file: 2026-02-01-preview/Supercomputers_Update_MaximumSet_Gen.json                                                                          |
| [toolsCreateOrUpdateSample.js][toolscreateorupdatesample]                                                               | create a Tool x-ms-original-file: 2026-02-01-preview/Tools_CreateOrUpdate_MaximumSet_Gen.json                                                                                    |
| [toolsDeleteSample.js][toolsdeletesample]                                                                               | delete a Tool x-ms-original-file: 2026-02-01-preview/Tools_Delete_MaximumSet_Gen.json                                                                                            |
| [toolsGetSample.js][toolsgetsample]                                                                                     | get a Tool x-ms-original-file: 2026-02-01-preview/Tools_Get_MaximumSet_Gen.json                                                                                                  |
| [toolsListByResourceGroupSample.js][toolslistbyresourcegroupsample]                                                     | list Tool resources by resource group x-ms-original-file: 2026-02-01-preview/Tools_ListByResourceGroup_MaximumSet_Gen.json                                                       |
| [toolsListBySubscriptionSample.js][toolslistbysubscriptionsample]                                                       | list Tool resources by subscription ID x-ms-original-file: 2026-02-01-preview/Tools_ListBySubscription_MaximumSet_Gen.json                                                       |
| [toolsUpdateSample.js][toolsupdatesample]                                                                               | update a Tool x-ms-original-file: 2026-02-01-preview/Tools_Update_MaximumSet_Gen.json                                                                                            |
| [workspacePrivateEndpointConnectionsCreateOrUpdateSample.js][workspaceprivateendpointconnectionscreateorupdatesample]   | approves or updates the specified private endpoint connection. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_CreateOrUpdate_MaximumSet_Gen.json     |
| [workspacePrivateEndpointConnectionsDeleteSample.js][workspaceprivateendpointconnectionsdeletesample]                   | deletes the specified private endpoint connection. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_Delete_MaximumSet_Gen.json                         |
| [workspacePrivateEndpointConnectionsGetSample.js][workspaceprivateendpointconnectionsgetsample]                         | gets the specified private endpoint connection associated with the workspace. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_Get_MaximumSet_Gen.json |
| [workspacePrivateEndpointConnectionsListByWorkspaceSample.js][workspaceprivateendpointconnectionslistbyworkspacesample] | lists all private endpoint connections for a workspace. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateEndpointConnections_ListByWorkspace_MaximumSet_Gen.json           |
| [workspacePrivateLinkResourcesGetSample.js][workspaceprivatelinkresourcesgetsample]                                     | gets the specified private link resource for the workspace. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateLinkResources_Get_MaximumSet_Gen.json                         |
| [workspacePrivateLinkResourcesListByWorkspaceSample.js][workspaceprivatelinkresourceslistbyworkspacesample]             | lists all private link resources for the workspace. x-ms-original-file: 2026-02-01-preview/WorkspacePrivateLinkResources_ListByWorkspace_MaximumSet_Gen.json                     |
| [workspacesCreateOrUpdateSample.js][workspacescreateorupdatesample]                                                     | create a Workspace x-ms-original-file: 2026-02-01-preview/Workspaces_CreateOrUpdate_MaximumSet_Gen.json                                                                          |
| [workspacesDeleteSample.js][workspacesdeletesample]                                                                     | delete a Workspace x-ms-original-file: 2026-02-01-preview/Workspaces_Delete_MaximumSet_Gen.json                                                                                  |
| [workspacesGetSample.js][workspacesgetsample]                                                                           | get a Workspace x-ms-original-file: 2026-02-01-preview/Workspaces_Get_MaximumSet_Gen.json                                                                                        |
| [workspacesListByResourceGroupSample.js][workspaceslistbyresourcegroupsample]                                           | list Workspace resources by resource group x-ms-original-file: 2026-02-01-preview/Workspaces_ListByResourceGroup_MaximumSet_Gen.json                                             |
| [workspacesListBySubscriptionSample.js][workspaceslistbysubscriptionsample]                                             | list Workspace resources by subscription ID x-ms-original-file: 2026-02-01-preview/Workspaces_ListBySubscription_MaximumSet_Gen.json                                             |
| [workspacesUpdateSample.js][workspacesupdatesample]                                                                     | update a Workspace x-ms-original-file: 2026-02-01-preview/Workspaces_Update_MaximumSet_Gen.json                                                                                  |

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
node bookshelfPrivateEndpointConnectionsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node bookshelfPrivateEndpointConnectionsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bookshelfprivateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelfPrivateEndpointConnectionsCreateOrUpdateSample.js
[bookshelfprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelfPrivateEndpointConnectionsDeleteSample.js
[bookshelfprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelfPrivateEndpointConnectionsGetSample.js
[bookshelfprivateendpointconnectionslistbybookshelfsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelfPrivateEndpointConnectionsListByBookshelfSample.js
[bookshelfprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelfPrivateLinkResourcesGetSample.js
[bookshelfprivatelinkresourceslistbybookshelfsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelfPrivateLinkResourcesListByBookshelfSample.js
[bookshelvescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelvesCreateOrUpdateSample.js
[bookshelvesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelvesDeleteSample.js
[bookshelvesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelvesGetSample.js
[bookshelveslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelvesListByResourceGroupSample.js
[bookshelveslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelvesListBySubscriptionSample.js
[bookshelvesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/bookshelvesUpdateSample.js
[chatmodeldeploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/chatModelDeploymentsCreateOrUpdateSample.js
[chatmodeldeploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/chatModelDeploymentsDeleteSample.js
[chatmodeldeploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/chatModelDeploymentsGetSample.js
[chatmodeldeploymentslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/chatModelDeploymentsListByWorkspaceSample.js
[chatmodeldeploymentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/chatModelDeploymentsUpdateSample.js
[nodepoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/nodePoolsCreateOrUpdateSample.js
[nodepoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/nodePoolsDeleteSample.js
[nodepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/nodePoolsGetSample.js
[nodepoolslistbysupercomputersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/nodePoolsListBySupercomputerSample.js
[nodepoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/nodePoolsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/operationsListSample.js
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/projectsCreateOrUpdateSample.js
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/projectsDeleteSample.js
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/projectsGetSample.js
[projectslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/projectsListByWorkspaceSample.js
[projectsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/projectsUpdateSample.js
[storageassetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageAssetsCreateOrUpdateSample.js
[storageassetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageAssetsDeleteSample.js
[storageassetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageAssetsGetSample.js
[storageassetslistbystoragecontainersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageAssetsListByStorageContainerSample.js
[storageassetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageAssetsUpdateSample.js
[storagecontainerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageContainersCreateOrUpdateSample.js
[storagecontainersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageContainersDeleteSample.js
[storagecontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageContainersGetSample.js
[storagecontainerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageContainersListByResourceGroupSample.js
[storagecontainerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageContainersListBySubscriptionSample.js
[storagecontainersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/storageContainersUpdateSample.js
[supercomputerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/supercomputersCreateOrUpdateSample.js
[supercomputersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/supercomputersDeleteSample.js
[supercomputersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/supercomputersGetSample.js
[supercomputerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/supercomputersListByResourceGroupSample.js
[supercomputerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/supercomputersListBySubscriptionSample.js
[supercomputersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/supercomputersUpdateSample.js
[toolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/toolsCreateOrUpdateSample.js
[toolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/toolsDeleteSample.js
[toolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/toolsGetSample.js
[toolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/toolsListByResourceGroupSample.js
[toolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/toolsListBySubscriptionSample.js
[toolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/toolsUpdateSample.js
[workspaceprivateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacePrivateEndpointConnectionsCreateOrUpdateSample.js
[workspaceprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacePrivateEndpointConnectionsDeleteSample.js
[workspaceprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacePrivateEndpointConnectionsGetSample.js
[workspaceprivateendpointconnectionslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacePrivateEndpointConnectionsListByWorkspaceSample.js
[workspaceprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacePrivateLinkResourcesGetSample.js
[workspaceprivatelinkresourceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacePrivateLinkResourcesListByWorkspaceSample.js
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacesCreateOrUpdateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacesDeleteSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacesGetSample.js
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacesListByResourceGroupSample.js
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacesListBySubscriptionSample.js
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/discovery/arm-discovery/samples/v1-beta/javascript/workspacesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-discovery?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/discovery/arm-discovery/README.md

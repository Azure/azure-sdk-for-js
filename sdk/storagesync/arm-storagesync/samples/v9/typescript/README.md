# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cloudEndpointsCreate.ts][cloudendpointscreate]                                                                 | Create a new CloudEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/CloudEndpoints_Create.json                                                                                                            |
| [cloudEndpointsDelete.ts][cloudendpointsdelete]                                                                 | Delete a given CloudEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/CloudEndpoints_Delete.json                                                                                                          |
| [cloudEndpointsGet.ts][cloudendpointsget]                                                                       | Get a given CloudEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/CloudEndpoints_Get.json                                                                                                                |
| [cloudEndpointsListBySyncGroup.ts][cloudendpointslistbysyncgroup]                                               | Get a CloudEndpoint List. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/CloudEndpoints_ListBySyncGroup.json                                                                                                     |
| [cloudEndpointsPostBackup.ts][cloudendpointspostbackup]                                                         | Post Backup a given CloudEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/CloudEndpoints_PostBackup.json                                                                                                 |
| [cloudEndpointsPostRestore.ts][cloudendpointspostrestore]                                                       | Post Restore a given CloudEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/CloudEndpoints_PostRestore.json                                                                                               |
| [cloudEndpointsPreBackup.ts][cloudendpointsprebackup]                                                           | Pre Backup a given CloudEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/CloudEndpoints_PreBackup.json                                                                                                   |
| [cloudEndpointsPreRestore.ts][cloudendpointsprerestore]                                                         | Pre Restore a given CloudEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/CloudEndpoints_PreRestore.json                                                                                                 |
| [cloudEndpointsRestoreheartbeat.ts][cloudendpointsrestoreheartbeat]                                             | Restore Heartbeat a given CloudEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/CloudEndpoints_RestoreHeatbeat.json                                                                                      |
| [cloudEndpointsTriggerChangeDetection.ts][cloudendpointstriggerchangedetection]                                 | Triggers detection of changes performed on Azure File share connected to the specified Azure File Sync Cloud Endpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/CloudEndpoints_TriggerChangeDetection.json |
| [operationsList.ts][operationslist]                                                                             | Lists all of the available Storage Sync Rest API operations. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/Operations_List.json                                                                                 |
| [privateEndpointConnectionsCreate.ts][privateendpointconnectionscreate]                                         | Update the state of specified private endpoint connection associated with the storage sync service. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/PrivateEndpointConnections_Create.json                        |
| [privateEndpointConnectionsDelete.ts][privateendpointconnectionsdelete]                                         | Deletes the specified private endpoint connection associated with the storage sync service. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/PrivateEndpointConnections_Delete.json                                |
| [privateEndpointConnectionsGet.ts][privateendpointconnectionsget]                                               | Gets the specified private endpoint connection associated with the storage sync service. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/PrivateEndpointConnections_Get.json                                      |
| [privateEndpointConnectionsListByStorageSyncService.ts][privateendpointconnectionslistbystoragesyncservice]     | Get a PrivateEndpointConnection List. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/PrivateEndpointConnections_ListByStorageSyncService.json                                                                    |
| [privateLinkResourcesList.ts][privatelinkresourceslist]                                                         | Gets the private link resources that need to be created for a storage sync service. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/PrivateLinkResources_List.json                                                |
| [registeredServersCreate.ts][registeredserverscreate]                                                           | Add a new registered server. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/RegisteredServers_Create.json                                                                                                        |
| [registeredServersDelete.ts][registeredserversdelete]                                                           | Delete the given registered server. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/RegisteredServers_Delete.json                                                                                                 |
| [registeredServersGet.ts][registeredserversget]                                                                 | Get a given registered server. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/RegisteredServers_Get.json                                                                                                         |
| [registeredServersListByStorageSyncService.ts][registeredserverslistbystoragesyncservice]                       | Get a given registered server list. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/RegisteredServers_ListByStorageSyncService.json                                                                               |
| [registeredServersTriggerRollover.ts][registeredserverstriggerrollover]                                         | Triggers Server certificate rollover. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/RegisteredServers_TriggerRollover.json                                                                                      |
| [serverEndpointsCreate.ts][serverendpointscreate]                                                               | Create a new ServerEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/ServerEndpoints_Create.json                                                                                                          |
| [serverEndpointsDelete.ts][serverendpointsdelete]                                                               | Delete a given ServerEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/ServerEndpoints_Delete.json                                                                                                        |
| [serverEndpointsGet.ts][serverendpointsget]                                                                     | Get a ServerEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/ServerEndpoints_Get.json                                                                                                                    |
| [serverEndpointsListBySyncGroup.ts][serverendpointslistbysyncgroup]                                             | Get a ServerEndpoint list. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/ServerEndpoints_ListBySyncGroup.json                                                                                                   |
| [serverEndpointsRecallAction.ts][serverendpointsrecallaction]                                                   | Recall a server endpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/ServerEndpoints_Recall.json                                                                                                             |
| [serverEndpointsUpdate.ts][serverendpointsupdate]                                                               | Patch a given ServerEndpoint. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/ServerEndpoints_Update.json                                                                                                         |
| [storageSyncServiceCheckNameAvailabilityAlreadyExists.ts][storagesyncservicechecknameavailabilityalreadyexists] | Check the give namespace name availability. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/StorageSyncServiceCheckNameAvailability_AlreadyExists.json                                                            |
| [storageSyncServiceCheckNameAvailabilityAvailable.ts][storagesyncservicechecknameavailabilityavailable]         | Check the give namespace name availability. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/StorageSyncServiceCheckNameAvailability_Available.json                                                                |
| [storageSyncServicesCreate.ts][storagesyncservicescreate]                                                       | Create a new StorageSyncService. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/StorageSyncServices_Create.json                                                                                                  |
| [storageSyncServicesDelete.ts][storagesyncservicesdelete]                                                       | Delete a given StorageSyncService. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/StorageSyncServices_Delete.json                                                                                                |
| [storageSyncServicesGet.ts][storagesyncservicesget]                                                             | Get a given StorageSyncService. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/StorageSyncServices_Get.json                                                                                                      |
| [storageSyncServicesListByResourceGroup.ts][storagesyncserviceslistbyresourcegroup]                             | Get a StorageSyncService list by Resource group name. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/StorageSyncServices_ListByResourceGroup.json                                                                |
| [storageSyncServicesListBySubscription.ts][storagesyncserviceslistbysubscription]                               | Get a StorageSyncService list by subscription. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/StorageSyncServices_ListBySubscription.json                                                                        |
| [storageSyncServicesUpdate.ts][storagesyncservicesupdate]                                                       | Patch a given StorageSyncService. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/StorageSyncServices_Update.json                                                                                                 |
| [syncGroupsCreate.ts][syncgroupscreate]                                                                         | Create a new SyncGroup. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/SyncGroups_Create.json                                                                                                                    |
| [syncGroupsDelete.ts][syncgroupsdelete]                                                                         | Delete a given SyncGroup. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/SyncGroups_Delete.json                                                                                                                  |
| [syncGroupsGet.ts][syncgroupsget]                                                                               | Get a given SyncGroup. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/SyncGroups_Get.json                                                                                                                        |
| [syncGroupsListByStorageSyncService.ts][syncgroupslistbystoragesyncservice]                                     | Get a SyncGroup List. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/SyncGroups_ListByStorageSyncService.json                                                                                                    |
| [workflowsAbort.ts][workflowsabort]                                                                             | Abort the given workflow. x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/Workflows_Abort.json                                                                                                                    |
| [workflowsGet.ts][workflowsget]                                                                                 | Get Operation status x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/LocationOperationStatus_Get.json                                                                                                             |
| [workflowsListByStorageSyncService.ts][workflowslistbystoragesyncservice]                                       | Get a Workflow List x-ms-original-file: specification/storagesync/resource-manager/Microsoft.StorageSync/stable/2020-09-01/examples/Workflows_ListByStorageSyncService.json                                                                                                       |

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
node dist/cloudEndpointsCreate.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/cloudEndpointsCreate.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cloudendpointscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/cloudEndpointsCreate.ts
[cloudendpointsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/cloudEndpointsDelete.ts
[cloudendpointsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/cloudEndpointsGet.ts
[cloudendpointslistbysyncgroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/cloudEndpointsListBySyncGroup.ts
[cloudendpointspostbackup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/cloudEndpointsPostBackup.ts
[cloudendpointspostrestore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/cloudEndpointsPostRestore.ts
[cloudendpointsprebackup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/cloudEndpointsPreBackup.ts
[cloudendpointsprerestore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/cloudEndpointsPreRestore.ts
[cloudendpointsrestoreheartbeat]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/cloudEndpointsRestoreheartbeat.ts
[cloudendpointstriggerchangedetection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/cloudEndpointsTriggerChangeDetection.ts
[operationslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/operationsList.ts
[privateendpointconnectionscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/privateEndpointConnectionsCreate.ts
[privateendpointconnectionsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/privateEndpointConnectionsDelete.ts
[privateendpointconnectionsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/privateEndpointConnectionsGet.ts
[privateendpointconnectionslistbystoragesyncservice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/privateEndpointConnectionsListByStorageSyncService.ts
[privatelinkresourceslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/privateLinkResourcesList.ts
[registeredserverscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/registeredServersCreate.ts
[registeredserversdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/registeredServersDelete.ts
[registeredserversget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/registeredServersGet.ts
[registeredserverslistbystoragesyncservice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/registeredServersListByStorageSyncService.ts
[registeredserverstriggerrollover]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/registeredServersTriggerRollover.ts
[serverendpointscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/serverEndpointsCreate.ts
[serverendpointsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/serverEndpointsDelete.ts
[serverendpointsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/serverEndpointsGet.ts
[serverendpointslistbysyncgroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/serverEndpointsListBySyncGroup.ts
[serverendpointsrecallaction]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/serverEndpointsRecallAction.ts
[serverendpointsupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/serverEndpointsUpdate.ts
[storagesyncservicechecknameavailabilityalreadyexists]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/storageSyncServiceCheckNameAvailabilityAlreadyExists.ts
[storagesyncservicechecknameavailabilityavailable]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/storageSyncServiceCheckNameAvailabilityAvailable.ts
[storagesyncservicescreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/storageSyncServicesCreate.ts
[storagesyncservicesdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/storageSyncServicesDelete.ts
[storagesyncservicesget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/storageSyncServicesGet.ts
[storagesyncserviceslistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/storageSyncServicesListByResourceGroup.ts
[storagesyncserviceslistbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/storageSyncServicesListBySubscription.ts
[storagesyncservicesupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/storageSyncServicesUpdate.ts
[syncgroupscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/syncGroupsCreate.ts
[syncgroupsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/syncGroupsDelete.ts
[syncgroupsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/syncGroupsGet.ts
[syncgroupslistbystoragesyncservice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/syncGroupsListByStorageSyncService.ts
[workflowsabort]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/workflowsAbort.ts
[workflowsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/workflowsGet.ts
[workflowslistbystoragesyncservice]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v9/typescript/src/workflowsListByStorageSyncService.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-storagesync?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storagesync/arm-storagesync/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

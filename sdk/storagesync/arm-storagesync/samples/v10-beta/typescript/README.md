# @azure/arm-storagesync client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-storagesync in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [cloudEndpointsAfsShareMetadataCertificatePublicKeysSample.ts][cloudendpointsafssharemetadatacertificatepublickeyssample] | get the AFS file share metadata signing certificate public keys. x-ms-original-file: 2022-09-01/CloudEndpoints_AfsShareMetadataCertificatePublicKeys.json                                        |
| [cloudEndpointsCreateSample.ts][cloudendpointscreatesample]                                                               | create a new CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_Create.json                                                                                                            |
| [cloudEndpointsDeleteSample.ts][cloudendpointsdeletesample]                                                               | delete a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_Delete.json                                                                                                          |
| [cloudEndpointsGetSample.ts][cloudendpointsgetsample]                                                                     | get a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_Get.json                                                                                                                |
| [cloudEndpointsListBySyncGroupSample.ts][cloudendpointslistbysyncgroupsample]                                             | get a CloudEndpoint List. x-ms-original-file: 2022-09-01/CloudEndpoints_ListBySyncGroup.json                                                                                                     |
| [cloudEndpointsPostBackupSample.ts][cloudendpointspostbackupsample]                                                       | post Backup a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_PostBackup.json                                                                                                 |
| [cloudEndpointsPostRestoreSample.ts][cloudendpointspostrestoresample]                                                     | post Restore a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_PostRestore.json                                                                                               |
| [cloudEndpointsPreBackupSample.ts][cloudendpointsprebackupsample]                                                         | pre Backup a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_PreBackup.json                                                                                                   |
| [cloudEndpointsPreRestoreSample.ts][cloudendpointsprerestoresample]                                                       | pre Restore a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_PreRestore.json                                                                                                 |
| [cloudEndpointsRestoreHeartbeatSample.ts][cloudendpointsrestoreheartbeatsample]                                           | restore Heartbeat a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_RestoreHeatbeat.json                                                                                      |
| [cloudEndpointsTriggerChangeDetectionSample.ts][cloudendpointstriggerchangedetectionsample]                               | triggers detection of changes performed on Azure File share connected to the specified Azure File Sync Cloud Endpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_TriggerChangeDetection.json |
| [locationOperationStatusSample.ts][locationoperationstatussample]                                                         | get Operation status x-ms-original-file: 2022-09-01/LocationOperationStatus_Get.json                                                                                                             |
| [operationsListSample.ts][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2022-09-01/Operations_List.json                                                                                                         |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]                                       | update the state of specified private endpoint connection associated with the storage sync service. x-ms-original-file: 2022-09-01/PrivateEndpointConnections_Create.json                        |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                       | deletes the specified private endpoint connection associated with the storage sync service. x-ms-original-file: 2022-09-01/PrivateEndpointConnections_Delete.json                                |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                             | gets the specified private endpoint connection associated with the storage sync service. x-ms-original-file: 2022-09-01/PrivateEndpointConnections_Get.json                                      |
| [privateEndpointConnectionsListByStorageSyncServiceSample.ts][privateendpointconnectionslistbystoragesyncservicesample]   | get a PrivateEndpointConnection List. x-ms-original-file: 2022-09-01/PrivateEndpointConnections_ListByStorageSyncService.json                                                                    |
| [privateLinkResourcesListByStorageSyncServiceSample.ts][privatelinkresourceslistbystoragesyncservicesample]               | gets the private link resources that need to be created for a storage sync service. x-ms-original-file: 2022-09-01/PrivateLinkResources_List.json                                                |
| [registeredServersCreateSample.ts][registeredserverscreatesample]                                                         | add a new registered server. x-ms-original-file: 2022-09-01/RegisteredServers_Create.json                                                                                                        |
| [registeredServersDeleteSample.ts][registeredserversdeletesample]                                                         | delete the given registered server. x-ms-original-file: 2022-09-01/RegisteredServers_Delete.json                                                                                                 |
| [registeredServersGetSample.ts][registeredserversgetsample]                                                               | get a given registered server. x-ms-original-file: 2022-09-01/RegisteredServers_Get.json                                                                                                         |
| [registeredServersListByStorageSyncServiceSample.ts][registeredserverslistbystoragesyncservicesample]                     | get a given registered server list. x-ms-original-file: 2022-09-01/RegisteredServers_ListByStorageSyncService.json                                                                               |
| [registeredServersTriggerRolloverSample.ts][registeredserverstriggerrolloversample]                                       | triggers Server certificate rollover. x-ms-original-file: 2022-09-01/RegisteredServers_TriggerRollover.json                                                                                      |
| [registeredServersUpdateSample.ts][registeredserversupdatesample]                                                         | update registered server. x-ms-original-file: 2022-09-01/RegisteredServers_Update.json                                                                                                           |
| [serverEndpointsCreateSample.ts][serverendpointscreatesample]                                                             | create a new ServerEndpoint. x-ms-original-file: 2022-09-01/ServerEndpoints_Create.json                                                                                                          |
| [serverEndpointsDeleteSample.ts][serverendpointsdeletesample]                                                             | delete a given ServerEndpoint. x-ms-original-file: 2022-09-01/ServerEndpoints_Delete.json                                                                                                        |
| [serverEndpointsGetSample.ts][serverendpointsgetsample]                                                                   | get a ServerEndpoint. x-ms-original-file: 2022-09-01/ServerEndpoints_Get.json                                                                                                                    |
| [serverEndpointsListBySyncGroupSample.ts][serverendpointslistbysyncgroupsample]                                           | get a ServerEndpoint list. x-ms-original-file: 2022-09-01/ServerEndpoints_ListBySyncGroup.json                                                                                                   |
| [serverEndpointsRecallActionSample.ts][serverendpointsrecallactionsample]                                                 | recall a server endpoint. x-ms-original-file: 2022-09-01/ServerEndpoints_Recall.json                                                                                                             |
| [serverEndpointsUpdateSample.ts][serverendpointsupdatesample]                                                             | patch a given ServerEndpoint. x-ms-original-file: 2022-09-01/ServerEndpoints_Update.json                                                                                                         |
| [storageSyncServicesCheckNameAvailabilitySample.ts][storagesyncserviceschecknameavailabilitysample]                       | check the give namespace name availability. x-ms-original-file: 2022-09-01/StorageSyncServiceCheckNameAvailability_AlreadyExists.json                                                            |
| [storageSyncServicesCreateSample.ts][storagesyncservicescreatesample]                                                     | create a new StorageSyncService. x-ms-original-file: 2022-09-01/StorageSyncServices_Create.json                                                                                                  |
| [storageSyncServicesDeleteSample.ts][storagesyncservicesdeletesample]                                                     | delete a given StorageSyncService. x-ms-original-file: 2022-09-01/StorageSyncServices_Delete.json                                                                                                |
| [storageSyncServicesGetSample.ts][storagesyncservicesgetsample]                                                           | get a given StorageSyncService. x-ms-original-file: 2022-09-01/StorageSyncServices_Get.json                                                                                                      |
| [storageSyncServicesListByResourceGroupSample.ts][storagesyncserviceslistbyresourcegroupsample]                           | get a StorageSyncService list by Resource group name. x-ms-original-file: 2022-09-01/StorageSyncServices_ListByResourceGroup.json                                                                |
| [storageSyncServicesListBySubscriptionSample.ts][storagesyncserviceslistbysubscriptionsample]                             | get a StorageSyncService list by subscription. x-ms-original-file: 2022-09-01/StorageSyncServices_ListBySubscription.json                                                                        |
| [storageSyncServicesUpdateSample.ts][storagesyncservicesupdatesample]                                                     | patch a given StorageSyncService. x-ms-original-file: 2022-09-01/StorageSyncServices_Update.json                                                                                                 |
| [syncGroupsCreateSample.ts][syncgroupscreatesample]                                                                       | create a new SyncGroup. x-ms-original-file: 2022-09-01/SyncGroups_Create.json                                                                                                                    |
| [syncGroupsDeleteSample.ts][syncgroupsdeletesample]                                                                       | delete a given SyncGroup. x-ms-original-file: 2022-09-01/SyncGroups_Delete.json                                                                                                                  |
| [syncGroupsGetSample.ts][syncgroupsgetsample]                                                                             | get a given SyncGroup. x-ms-original-file: 2022-09-01/SyncGroups_Get.json                                                                                                                        |
| [syncGroupsListByStorageSyncServiceSample.ts][syncgroupslistbystoragesyncservicesample]                                   | get a SyncGroup List. x-ms-original-file: 2022-09-01/SyncGroups_ListByStorageSyncService.json                                                                                                    |
| [workflowsAbortSample.ts][workflowsabortsample]                                                                           | abort the given workflow. x-ms-original-file: 2022-09-01/Workflows_Abort.json                                                                                                                    |
| [workflowsGetSample.ts][workflowsgetsample]                                                                               | get Workflows resource x-ms-original-file: 2022-09-01/Workflows_Get.json                                                                                                                         |
| [workflowsListByStorageSyncServiceSample.ts][workflowslistbystoragesyncservicesample]                                     | get a Workflow List x-ms-original-file: 2022-09-01/Workflows_ListByStorageSyncService.json                                                                                                       |

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
node dist/cloudEndpointsAfsShareMetadataCertificatePublicKeysSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/cloudEndpointsAfsShareMetadataCertificatePublicKeysSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cloudendpointsafssharemetadatacertificatepublickeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsAfsShareMetadataCertificatePublicKeysSample.ts
[cloudendpointscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsCreateSample.ts
[cloudendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsDeleteSample.ts
[cloudendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsGetSample.ts
[cloudendpointslistbysyncgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsListBySyncGroupSample.ts
[cloudendpointspostbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsPostBackupSample.ts
[cloudendpointspostrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsPostRestoreSample.ts
[cloudendpointsprebackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsPreBackupSample.ts
[cloudendpointsprerestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsPreRestoreSample.ts
[cloudendpointsrestoreheartbeatsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsRestoreHeartbeatSample.ts
[cloudendpointstriggerchangedetectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/cloudEndpointsTriggerChangeDetectionSample.ts
[locationoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/locationOperationStatusSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbystoragesyncservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/privateEndpointConnectionsListByStorageSyncServiceSample.ts
[privatelinkresourceslistbystoragesyncservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/privateLinkResourcesListByStorageSyncServiceSample.ts
[registeredserverscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/registeredServersCreateSample.ts
[registeredserversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/registeredServersDeleteSample.ts
[registeredserversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/registeredServersGetSample.ts
[registeredserverslistbystoragesyncservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/registeredServersListByStorageSyncServiceSample.ts
[registeredserverstriggerrolloversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/registeredServersTriggerRolloverSample.ts
[registeredserversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/registeredServersUpdateSample.ts
[serverendpointscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/serverEndpointsCreateSample.ts
[serverendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/serverEndpointsDeleteSample.ts
[serverendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/serverEndpointsGetSample.ts
[serverendpointslistbysyncgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/serverEndpointsListBySyncGroupSample.ts
[serverendpointsrecallactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/serverEndpointsRecallActionSample.ts
[serverendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/serverEndpointsUpdateSample.ts
[storagesyncserviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/storageSyncServicesCheckNameAvailabilitySample.ts
[storagesyncservicescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/storageSyncServicesCreateSample.ts
[storagesyncservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/storageSyncServicesDeleteSample.ts
[storagesyncservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/storageSyncServicesGetSample.ts
[storagesyncserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/storageSyncServicesListByResourceGroupSample.ts
[storagesyncserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/storageSyncServicesListBySubscriptionSample.ts
[storagesyncservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/storageSyncServicesUpdateSample.ts
[syncgroupscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/syncGroupsCreateSample.ts
[syncgroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/syncGroupsDeleteSample.ts
[syncgroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/syncGroupsGetSample.ts
[syncgroupslistbystoragesyncservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/syncGroupsListByStorageSyncServiceSample.ts
[workflowsabortsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/workflowsAbortSample.ts
[workflowsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/workflowsGetSample.ts
[workflowslistbystoragesyncservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/typescript/src/workflowsListByStorageSyncServiceSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-storagesync?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storagesync/arm-storagesync/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

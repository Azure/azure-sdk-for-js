# @azure/arm-storagesync client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-storagesync in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [cloudEndpointsAfsShareMetadataCertificatePublicKeysSample.js][cloudendpointsafssharemetadatacertificatepublickeyssample] | get the AFS file share metadata signing certificate public keys. x-ms-original-file: 2022-09-01/CloudEndpoints_AfsShareMetadataCertificatePublicKeys.json                                        |
| [cloudEndpointsCreateSample.js][cloudendpointscreatesample]                                                               | create a new CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_Create.json                                                                                                            |
| [cloudEndpointsDeleteSample.js][cloudendpointsdeletesample]                                                               | delete a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_Delete.json                                                                                                          |
| [cloudEndpointsGetSample.js][cloudendpointsgetsample]                                                                     | get a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_Get.json                                                                                                                |
| [cloudEndpointsListBySyncGroupSample.js][cloudendpointslistbysyncgroupsample]                                             | get a CloudEndpoint List. x-ms-original-file: 2022-09-01/CloudEndpoints_ListBySyncGroup.json                                                                                                     |
| [cloudEndpointsPostBackupSample.js][cloudendpointspostbackupsample]                                                       | post Backup a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_PostBackup.json                                                                                                 |
| [cloudEndpointsPostRestoreSample.js][cloudendpointspostrestoresample]                                                     | post Restore a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_PostRestore.json                                                                                               |
| [cloudEndpointsPreBackupSample.js][cloudendpointsprebackupsample]                                                         | pre Backup a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_PreBackup.json                                                                                                   |
| [cloudEndpointsPreRestoreSample.js][cloudendpointsprerestoresample]                                                       | pre Restore a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_PreRestore.json                                                                                                 |
| [cloudEndpointsRestoreheartbeatSample.js][cloudendpointsrestoreheartbeatsample]                                           | restore Heartbeat a given CloudEndpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_RestoreHeatbeat.json                                                                                      |
| [cloudEndpointsTriggerChangeDetectionSample.js][cloudendpointstriggerchangedetectionsample]                               | triggers detection of changes performed on Azure File share connected to the specified Azure File Sync Cloud Endpoint. x-ms-original-file: 2022-09-01/CloudEndpoints_TriggerChangeDetection.json |
| [locationOperationStatusSample.js][locationoperationstatussample]                                                         | get Operation status x-ms-original-file: 2022-09-01/LocationOperationStatus_Get.json                                                                                                             |
| [operationsListSample.js][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2022-09-01/Operations_List.json                                                                                                         |
| [privateEndpointConnectionsCreateSample.js][privateendpointconnectionscreatesample]                                       | update the state of specified private endpoint connection associated with the storage sync service. x-ms-original-file: 2022-09-01/PrivateEndpointConnections_Create.json                        |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                                       | deletes the specified private endpoint connection associated with the storage sync service. x-ms-original-file: 2022-09-01/PrivateEndpointConnections_Delete.json                                |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                             | gets the specified private endpoint connection associated with the storage sync service. x-ms-original-file: 2022-09-01/PrivateEndpointConnections_Get.json                                      |
| [privateEndpointConnectionsListByStorageSyncServiceSample.js][privateendpointconnectionslistbystoragesyncservicesample]   | get a PrivateEndpointConnection List. x-ms-original-file: 2022-09-01/PrivateEndpointConnections_ListByStorageSyncService.json                                                                    |
| [privateLinkResourcesListByStorageSyncServiceSample.js][privatelinkresourceslistbystoragesyncservicesample]               | gets the private link resources that need to be created for a storage sync service. x-ms-original-file: 2022-09-01/PrivateLinkResources_List.json                                                |
| [registeredServersCreateSample.js][registeredserverscreatesample]                                                         | add a new registered server. x-ms-original-file: 2022-09-01/RegisteredServers_Create.json                                                                                                        |
| [registeredServersDeleteSample.js][registeredserversdeletesample]                                                         | delete the given registered server. x-ms-original-file: 2022-09-01/RegisteredServers_Delete.json                                                                                                 |
| [registeredServersGetSample.js][registeredserversgetsample]                                                               | get a given registered server. x-ms-original-file: 2022-09-01/RegisteredServers_Get.json                                                                                                         |
| [registeredServersListByStorageSyncServiceSample.js][registeredserverslistbystoragesyncservicesample]                     | get a given registered server list. x-ms-original-file: 2022-09-01/RegisteredServers_ListByStorageSyncService.json                                                                               |
| [registeredServersTriggerRolloverSample.js][registeredserverstriggerrolloversample]                                       | triggers Server certificate rollover. x-ms-original-file: 2022-09-01/RegisteredServers_TriggerRollover.json                                                                                      |
| [registeredServersUpdateSample.js][registeredserversupdatesample]                                                         | update registered server. x-ms-original-file: 2022-09-01/RegisteredServers_Update.json                                                                                                           |
| [serverEndpointsCreateSample.js][serverendpointscreatesample]                                                             | create a new ServerEndpoint. x-ms-original-file: 2022-09-01/ServerEndpoints_Create.json                                                                                                          |
| [serverEndpointsDeleteSample.js][serverendpointsdeletesample]                                                             | delete a given ServerEndpoint. x-ms-original-file: 2022-09-01/ServerEndpoints_Delete.json                                                                                                        |
| [serverEndpointsGetSample.js][serverendpointsgetsample]                                                                   | get a ServerEndpoint. x-ms-original-file: 2022-09-01/ServerEndpoints_Get.json                                                                                                                    |
| [serverEndpointsListBySyncGroupSample.js][serverendpointslistbysyncgroupsample]                                           | get a ServerEndpoint list. x-ms-original-file: 2022-09-01/ServerEndpoints_ListBySyncGroup.json                                                                                                   |
| [serverEndpointsRecallActionSample.js][serverendpointsrecallactionsample]                                                 | recall a server endpoint. x-ms-original-file: 2022-09-01/ServerEndpoints_Recall.json                                                                                                             |
| [serverEndpointsUpdateSample.js][serverendpointsupdatesample]                                                             | patch a given ServerEndpoint. x-ms-original-file: 2022-09-01/ServerEndpoints_Update.json                                                                                                         |
| [storageSyncServicesCheckNameAvailabilitySample.js][storagesyncserviceschecknameavailabilitysample]                       | check the give namespace name availability. x-ms-original-file: 2022-09-01/StorageSyncServiceCheckNameAvailability_AlreadyExists.json                                                            |
| [storageSyncServicesCreateSample.js][storagesyncservicescreatesample]                                                     | create a new StorageSyncService. x-ms-original-file: 2022-09-01/StorageSyncServices_Create.json                                                                                                  |
| [storageSyncServicesDeleteSample.js][storagesyncservicesdeletesample]                                                     | delete a given StorageSyncService. x-ms-original-file: 2022-09-01/StorageSyncServices_Delete.json                                                                                                |
| [storageSyncServicesGetSample.js][storagesyncservicesgetsample]                                                           | get a given StorageSyncService. x-ms-original-file: 2022-09-01/StorageSyncServices_Get.json                                                                                                      |
| [storageSyncServicesListByResourceGroupSample.js][storagesyncserviceslistbyresourcegroupsample]                           | get a StorageSyncService list by Resource group name. x-ms-original-file: 2022-09-01/StorageSyncServices_ListByResourceGroup.json                                                                |
| [storageSyncServicesListBySubscriptionSample.js][storagesyncserviceslistbysubscriptionsample]                             | get a StorageSyncService list by subscription. x-ms-original-file: 2022-09-01/StorageSyncServices_ListBySubscription.json                                                                        |
| [storageSyncServicesUpdateSample.js][storagesyncservicesupdatesample]                                                     | patch a given StorageSyncService. x-ms-original-file: 2022-09-01/StorageSyncServices_Update.json                                                                                                 |
| [syncGroupsCreateSample.js][syncgroupscreatesample]                                                                       | create a new SyncGroup. x-ms-original-file: 2022-09-01/SyncGroups_Create.json                                                                                                                    |
| [syncGroupsDeleteSample.js][syncgroupsdeletesample]                                                                       | delete a given SyncGroup. x-ms-original-file: 2022-09-01/SyncGroups_Delete.json                                                                                                                  |
| [syncGroupsGetSample.js][syncgroupsgetsample]                                                                             | get a given SyncGroup. x-ms-original-file: 2022-09-01/SyncGroups_Get.json                                                                                                                        |
| [syncGroupsListByStorageSyncServiceSample.js][syncgroupslistbystoragesyncservicesample]                                   | get a SyncGroup List. x-ms-original-file: 2022-09-01/SyncGroups_ListByStorageSyncService.json                                                                                                    |
| [workflowsAbortSample.js][workflowsabortsample]                                                                           | abort the given workflow. x-ms-original-file: 2022-09-01/Workflows_Abort.json                                                                                                                    |
| [workflowsGetSample.js][workflowsgetsample]                                                                               | get Workflows resource x-ms-original-file: 2022-09-01/Workflows_Get.json                                                                                                                         |
| [workflowsListByStorageSyncServiceSample.js][workflowslistbystoragesyncservicesample]                                     | get a Workflow List x-ms-original-file: 2022-09-01/Workflows_ListByStorageSyncService.json                                                                                                       |

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
node cloudEndpointsAfsShareMetadataCertificatePublicKeysSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node cloudEndpointsAfsShareMetadataCertificatePublicKeysSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cloudendpointsafssharemetadatacertificatepublickeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsAfsShareMetadataCertificatePublicKeysSample.js
[cloudendpointscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsCreateSample.js
[cloudendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsDeleteSample.js
[cloudendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsGetSample.js
[cloudendpointslistbysyncgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsListBySyncGroupSample.js
[cloudendpointspostbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsPostBackupSample.js
[cloudendpointspostrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsPostRestoreSample.js
[cloudendpointsprebackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsPreBackupSample.js
[cloudendpointsprerestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsPreRestoreSample.js
[cloudendpointsrestoreheartbeatsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsRestoreheartbeatSample.js
[cloudendpointstriggerchangedetectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/cloudEndpointsTriggerChangeDetectionSample.js
[locationoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/locationOperationStatusSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/operationsListSample.js
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/privateEndpointConnectionsCreateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbystoragesyncservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/privateEndpointConnectionsListByStorageSyncServiceSample.js
[privatelinkresourceslistbystoragesyncservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/privateLinkResourcesListByStorageSyncServiceSample.js
[registeredserverscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/registeredServersCreateSample.js
[registeredserversdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/registeredServersDeleteSample.js
[registeredserversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/registeredServersGetSample.js
[registeredserverslistbystoragesyncservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/registeredServersListByStorageSyncServiceSample.js
[registeredserverstriggerrolloversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/registeredServersTriggerRolloverSample.js
[registeredserversupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/registeredServersUpdateSample.js
[serverendpointscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/serverEndpointsCreateSample.js
[serverendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/serverEndpointsDeleteSample.js
[serverendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/serverEndpointsGetSample.js
[serverendpointslistbysyncgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/serverEndpointsListBySyncGroupSample.js
[serverendpointsrecallactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/serverEndpointsRecallActionSample.js
[serverendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/serverEndpointsUpdateSample.js
[storagesyncserviceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/storageSyncServicesCheckNameAvailabilitySample.js
[storagesyncservicescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/storageSyncServicesCreateSample.js
[storagesyncservicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/storageSyncServicesDeleteSample.js
[storagesyncservicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/storageSyncServicesGetSample.js
[storagesyncserviceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/storageSyncServicesListByResourceGroupSample.js
[storagesyncserviceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/storageSyncServicesListBySubscriptionSample.js
[storagesyncservicesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/storageSyncServicesUpdateSample.js
[syncgroupscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/syncGroupsCreateSample.js
[syncgroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/syncGroupsDeleteSample.js
[syncgroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/syncGroupsGetSample.js
[syncgroupslistbystoragesyncservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/syncGroupsListByStorageSyncServiceSample.js
[workflowsabortsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/workflowsAbortSample.js
[workflowsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/workflowsGetSample.js
[workflowslistbystoragesyncservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagesync/arm-storagesync/samples/v10-beta/javascript/workflowsListByStorageSyncServiceSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-storagesync?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storagesync/arm-storagesync/README.md

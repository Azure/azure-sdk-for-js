# @azure/arm-computedisk client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-computedisk in some common scenarios.

| **File Name**                                                                                                                           | **Description**                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [diskAccessesCreateOrUpdateSample.js][diskaccessescreateorupdatesample]                                                                 | creates or updates a disk access resource x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Create.json                                                                                                                             |
| [diskAccessesDeleteSample.js][diskaccessesdeletesample]                                                                                 | deletes a disk access resource. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Delete.json                                                                                                                                       |
| [diskAccessesGetPrivateLinkResourcesSample.js][diskaccessesgetprivatelinkresourcessample]                                               | gets the private link resources possible under disk access resource x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateLinkResources_Get.json                                                                                  |
| [diskAccessesGetSample.js][diskaccessesgetsample]                                                                                       | gets information about a disk access resource. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Get.json                                                                                                                           |
| [diskAccessesListByResourceGroupSample.js][diskaccesseslistbyresourcegroupsample]                                                       | lists all the disk access resources under a resource group. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_ListByResourceGroup.json                                                                                              |
| [diskAccessesListSample.js][diskaccesseslistsample]                                                                                     | lists all the disk access resources under a subscription. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_ListBySubscription.json                                                                                                 |
| [diskAccessesUpdateSample.js][diskaccessesupdatesample]                                                                                 | updates (patches) a disk access resource. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Update.json                                                                                                                             |
| [diskEncryptionSetsCreateOrUpdateSample.js][diskencryptionsetscreateorupdatesample]                                                     | creates or updates a disk encryption set x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Create.json                                                                                                                |
| [diskEncryptionSetsDeleteSample.js][diskencryptionsetsdeletesample]                                                                     | deletes a disk encryption set. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Delete.json                                                                                                                          |
| [diskEncryptionSetsGetSample.js][diskencryptionsetsgetsample]                                                                           | gets information about a disk encryption set. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Get.json                                                                                                              |
| [diskEncryptionSetsListAssociatedResourcesSample.js][diskencryptionsetslistassociatedresourcessample]                                   | lists all resources that are encrypted with this disk encryption set. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_ListAssociatedResources.json                                                                  |
| [diskEncryptionSetsListByResourceGroupSample.js][diskencryptionsetslistbyresourcegroupsample]                                           | lists all the disk encryption sets under a resource group. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_ListByResourceGroup.json                                                                                 |
| [diskEncryptionSetsListSample.js][diskencryptionsetslistsample]                                                                         | lists all the disk encryption sets under a subscription. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_ListBySubscription.json                                                                                    |
| [diskEncryptionSetsUpdateSample.js][diskencryptionsetsupdatesample]                                                                     | updates (patches) a disk encryption set. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Update.json                                                                                                                |
| [diskRestorePointsGetSample.js][diskrestorepointsgetsample]                                                                             | get disk restorePoint resource x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_Get.json                                                                                                                               |
| [diskRestorePointsGrantAccessSample.js][diskrestorepointsgrantaccesssample]                                                             | grants access to a diskRestorePoint. x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_BeginGetAccess.json                                                                                                              |
| [diskRestorePointsListByRestorePointSample.js][diskrestorepointslistbyrestorepointsample]                                               | lists diskRestorePoints under a vmRestorePoint. x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_ListByVmRestorePoint.json                                                                                             |
| [diskRestorePointsRevokeAccessSample.js][diskrestorepointsrevokeaccesssample]                                                           | revokes access to a diskRestorePoint. x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_EndGetAccess.json                                                                                                               |
| [disksCreateOrUpdateSample.js][diskscreateorupdatesample]                                                                               | creates or updates a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_CreateOrUpdate_AvailabilityPolicy.json                                                                                                                             |
| [disksDeleteSample.js][disksdeletesample]                                                                                               | deletes a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_Delete.json                                                                                                                                                                   |
| [disksGetSample.js][disksgetsample]                                                                                                     | gets information about a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_Get.json                                                                                                                                                       |
| [disksGrantAccessSample.js][disksgrantaccesssample]                                                                                     | grants access to a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_BeginGetAccess.json                                                                                                                                                  |
| [disksListByResourceGroupSample.js][diskslistbyresourcegroupsample]                                                                     | lists all the disks under a resource group. x-ms-original-file: 2025-01-02/diskExamples/Disk_ListByResourceGroup.json                                                                                                                          |
| [disksListSample.js][diskslistsample]                                                                                                   | lists all the disks under a subscription. x-ms-original-file: 2025-01-02/diskExamples/Disk_ListBySubscription.json                                                                                                                             |
| [disksRevokeAccessSample.js][disksrevokeaccesssample]                                                                                   | revokes access to a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_EndGetAccess.json                                                                                                                                                   |
| [disksUpdateSample.js][disksupdatesample]                                                                                               | updates (patches) a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_CreateOrUpdate_BurstingEnabled.json                                                                                                                                 |
| [privateEndpointConnectionsDeleteAPrivateEndpointConnectionSample.js][privateendpointconnectionsdeleteaprivateendpointconnectionsample] | deletes a private endpoint connection under a disk access resource. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Delete.json                                                                          |
| [privateEndpointConnectionsGetAPrivateEndpointConnectionSample.js][privateendpointconnectionsgetaprivateendpointconnectionsample]       | gets information about a private endpoint connection under a disk access resource. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Get.json                                                              |
| [privateEndpointConnectionsListPrivateEndpointConnectionsSample.js][privateendpointconnectionslistprivateendpointconnectionssample]     | list information about private endpoint connections under a disk access resource x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_ListByDiskAccess.json                                                   |
| [privateEndpointConnectionsUpdateAPrivateEndpointConnectionSample.js][privateendpointconnectionsupdateaprivateendpointconnectionsample] | approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Approve.json |
| [snapshotsCreateOrUpdateSample.js][snapshotscreateorupdatesample]                                                                       | creates or updates a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_ByImportingAnUnmanagedBlobFromADifferentSubscription.json                                                                                       |
| [snapshotsDeleteSample.js][snapshotsdeletesample]                                                                                       | deletes a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Delete.json                                                                                                                                                       |
| [snapshotsGetSample.js][snapshotsgetsample]                                                                                             | gets information about a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Get.json                                                                                                                                           |
| [snapshotsGrantAccessSample.js][snapshotsgrantaccesssample]                                                                             | grants access to a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_BeginGetAccess.json                                                                                                                                      |
| [snapshotsListByResourceGroupSample.js][snapshotslistbyresourcegroupsample]                                                             | lists snapshots under a resource group. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_ListByResourceGroup.json                                                                                                                      |
| [snapshotsListSample.js][snapshotslistsample]                                                                                           | lists snapshots under a subscription. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_ListBySubscription.json                                                                                                                         |
| [snapshotsRevokeAccessSample.js][snapshotsrevokeaccesssample]                                                                           | revokes access to a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_EndGetAccess.json                                                                                                                                       |
| [snapshotsUpdateSample.js][snapshotsupdatesample]                                                                                       | updates (patches) a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Update.json                                                                                                                                             |

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
node diskAccessesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node diskAccessesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[diskaccessescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskAccessesCreateOrUpdateSample.js
[diskaccessesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskAccessesDeleteSample.js
[diskaccessesgetprivatelinkresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskAccessesGetPrivateLinkResourcesSample.js
[diskaccessesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskAccessesGetSample.js
[diskaccesseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskAccessesListByResourceGroupSample.js
[diskaccesseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskAccessesListSample.js
[diskaccessesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskAccessesUpdateSample.js
[diskencryptionsetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskEncryptionSetsCreateOrUpdateSample.js
[diskencryptionsetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskEncryptionSetsDeleteSample.js
[diskencryptionsetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskEncryptionSetsGetSample.js
[diskencryptionsetslistassociatedresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskEncryptionSetsListAssociatedResourcesSample.js
[diskencryptionsetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskEncryptionSetsListByResourceGroupSample.js
[diskencryptionsetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskEncryptionSetsListSample.js
[diskencryptionsetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskEncryptionSetsUpdateSample.js
[diskrestorepointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskRestorePointsGetSample.js
[diskrestorepointsgrantaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskRestorePointsGrantAccessSample.js
[diskrestorepointslistbyrestorepointsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskRestorePointsListByRestorePointSample.js
[diskrestorepointsrevokeaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/diskRestorePointsRevokeAccessSample.js
[diskscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/disksCreateOrUpdateSample.js
[disksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/disksDeleteSample.js
[disksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/disksGetSample.js
[disksgrantaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/disksGrantAccessSample.js
[diskslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/disksListByResourceGroupSample.js
[diskslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/disksListSample.js
[disksrevokeaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/disksRevokeAccessSample.js
[disksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/disksUpdateSample.js
[privateendpointconnectionsdeleteaprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/privateEndpointConnectionsDeleteAPrivateEndpointConnectionSample.js
[privateendpointconnectionsgetaprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/privateEndpointConnectionsGetAPrivateEndpointConnectionSample.js
[privateendpointconnectionslistprivateendpointconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/privateEndpointConnectionsListPrivateEndpointConnectionsSample.js
[privateendpointconnectionsupdateaprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/privateEndpointConnectionsUpdateAPrivateEndpointConnectionSample.js
[snapshotscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/snapshotsCreateOrUpdateSample.js
[snapshotsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/snapshotsDeleteSample.js
[snapshotsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/snapshotsGetSample.js
[snapshotsgrantaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/snapshotsGrantAccessSample.js
[snapshotslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/snapshotsListByResourceGroupSample.js
[snapshotslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/snapshotsListSample.js
[snapshotsrevokeaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/snapshotsRevokeAccessSample.js
[snapshotsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computedisk/samples/v1-beta/javascript/snapshotsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computedisk?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-computedisk/README.md

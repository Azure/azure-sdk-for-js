# @azure/arm-compute-disk client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-compute-disk in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [diskAccessesCreateOrUpdateSample.ts][diskaccessescreateorupdatesample]                                     | creates or updates a disk access resource x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Create.json                                                                                                                             |
| [diskAccessesDeleteAPrivateEndpointConnectionSample.ts][diskaccessesdeleteaprivateendpointconnectionsample] | deletes a private endpoint connection under a disk access resource. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Delete.json                                                                          |
| [diskAccessesDeleteSample.ts][diskaccessesdeletesample]                                                     | deletes a disk access resource. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Delete.json                                                                                                                                       |
| [diskAccessesGetAPrivateEndpointConnectionSample.ts][diskaccessesgetaprivateendpointconnectionsample]       | gets information about a private endpoint connection under a disk access resource. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Get.json                                                              |
| [diskAccessesGetPrivateLinkResourcesSample.ts][diskaccessesgetprivatelinkresourcessample]                   | gets the private link resources possible under disk access resource x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateLinkResources_Get.json                                                                                  |
| [diskAccessesGetSample.ts][diskaccessesgetsample]                                                           | gets information about a disk access resource. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Get.json                                                                                                                           |
| [diskAccessesListByResourceGroupSample.ts][diskaccesseslistbyresourcegroupsample]                           | lists all the disk access resources under a resource group. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_ListByResourceGroup.json                                                                                              |
| [diskAccessesListPrivateEndpointConnectionsSample.ts][diskaccesseslistprivateendpointconnectionssample]     | list information about private endpoint connections under a disk access resource x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_ListByDiskAccess.json                                                   |
| [diskAccessesListSample.ts][diskaccesseslistsample]                                                         | lists all the disk access resources under a subscription. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_ListBySubscription.json                                                                                                 |
| [diskAccessesUpdateAPrivateEndpointConnectionSample.ts][diskaccessesupdateaprivateendpointconnectionsample] | approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccessPrivateEndpointConnection_Approve.json |
| [diskAccessesUpdateSample.ts][diskaccessesupdatesample]                                                     | updates (patches) a disk access resource. x-ms-original-file: 2025-01-02/diskAccessExamples/DiskAccess_Update.json                                                                                                                             |
| [diskEncryptionSetsCreateOrUpdateSample.ts][diskencryptionsetscreateorupdatesample]                         | creates or updates a disk encryption set x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Create.json                                                                                                                |
| [diskEncryptionSetsDeleteSample.ts][diskencryptionsetsdeletesample]                                         | deletes a disk encryption set. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Delete.json                                                                                                                          |
| [diskEncryptionSetsGetSample.ts][diskencryptionsetsgetsample]                                               | gets information about a disk encryption set. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Get.json                                                                                                              |
| [diskEncryptionSetsListAssociatedResourcesSample.ts][diskencryptionsetslistassociatedresourcessample]       | lists all resources that are encrypted with this disk encryption set. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_ListAssociatedResources.json                                                                  |
| [diskEncryptionSetsListByResourceGroupSample.ts][diskencryptionsetslistbyresourcegroupsample]               | lists all the disk encryption sets under a resource group. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_ListByResourceGroup.json                                                                                 |
| [diskEncryptionSetsListSample.ts][diskencryptionsetslistsample]                                             | lists all the disk encryption sets under a subscription. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_ListBySubscription.json                                                                                    |
| [diskEncryptionSetsUpdateSample.ts][diskencryptionsetsupdatesample]                                         | updates (patches) a disk encryption set. x-ms-original-file: 2025-01-02/diskEncryptionSetExamples/DiskEncryptionSet_Update.json                                                                                                                |
| [diskRestorePointGetSample.ts][diskrestorepointgetsample]                                                   | get disk restorePoint resource x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_Get.json                                                                                                                               |
| [diskRestorePointGrantAccessSample.ts][diskrestorepointgrantaccesssample]                                   | grants access to a diskRestorePoint. x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_BeginGetAccess.json                                                                                                              |
| [diskRestorePointListByRestorePointSample.ts][diskrestorepointlistbyrestorepointsample]                     | lists diskRestorePoints under a vmRestorePoint. x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_ListByVmRestorePoint.json                                                                                             |
| [diskRestorePointRevokeAccessSample.ts][diskrestorepointrevokeaccesssample]                                 | revokes access to a diskRestorePoint. x-ms-original-file: 2025-01-02/diskRestorePointExamples/DiskRestorePoint_EndGetAccess.json                                                                                                               |
| [disksCreateOrUpdateSample.ts][diskscreateorupdatesample]                                                   | creates or updates a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_CreateOrUpdate_AvailabilityPolicy.json                                                                                                                             |
| [disksDeleteSample.ts][disksdeletesample]                                                                   | deletes a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_Delete.json                                                                                                                                                                   |
| [disksGetSample.ts][disksgetsample]                                                                         | gets information about a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_Get.json                                                                                                                                                       |
| [disksGrantAccessSample.ts][disksgrantaccesssample]                                                         | grants access to a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_BeginGetAccess.json                                                                                                                                                  |
| [disksListByResourceGroupSample.ts][diskslistbyresourcegroupsample]                                         | lists all the disks under a resource group. x-ms-original-file: 2025-01-02/diskExamples/Disk_ListByResourceGroup.json                                                                                                                          |
| [disksListSample.ts][diskslistsample]                                                                       | lists all the disks under a subscription. x-ms-original-file: 2025-01-02/diskExamples/Disk_ListBySubscription.json                                                                                                                             |
| [disksRevokeAccessSample.ts][disksrevokeaccesssample]                                                       | revokes access to a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_EndGetAccess.json                                                                                                                                                   |
| [disksUpdateSample.ts][disksupdatesample]                                                                   | updates (patches) a disk. x-ms-original-file: 2025-01-02/diskExamples/Disk_CreateOrUpdate_BurstingEnabled.json                                                                                                                                 |
| [snapshotsCreateOrUpdateSample.ts][snapshotscreateorupdatesample]                                           | creates or updates a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Create_ByImportingAnUnmanagedBlobFromADifferentSubscription.json                                                                                       |
| [snapshotsDeleteSample.ts][snapshotsdeletesample]                                                           | deletes a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Delete.json                                                                                                                                                       |
| [snapshotsGetSample.ts][snapshotsgetsample]                                                                 | gets information about a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Get.json                                                                                                                                           |
| [snapshotsGrantAccessSample.ts][snapshotsgrantaccesssample]                                                 | grants access to a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_BeginGetAccess.json                                                                                                                                      |
| [snapshotsListByResourceGroupSample.ts][snapshotslistbyresourcegroupsample]                                 | lists snapshots under a resource group. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_ListByResourceGroup.json                                                                                                                      |
| [snapshotsListSample.ts][snapshotslistsample]                                                               | lists snapshots under a subscription. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_ListBySubscription.json                                                                                                                         |
| [snapshotsRevokeAccessSample.ts][snapshotsrevokeaccesssample]                                               | revokes access to a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_EndGetAccess.json                                                                                                                                       |
| [snapshotsUpdateSample.ts][snapshotsupdatesample]                                                           | updates (patches) a snapshot. x-ms-original-file: 2025-01-02/snapshotExamples/Snapshot_Update.json                                                                                                                                             |

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
node dist/diskAccessesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/diskAccessesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[diskaccessescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesCreateOrUpdateSample.ts
[diskaccessesdeleteaprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesDeleteAPrivateEndpointConnectionSample.ts
[diskaccessesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesDeleteSample.ts
[diskaccessesgetaprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesGetAPrivateEndpointConnectionSample.ts
[diskaccessesgetprivatelinkresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesGetPrivateLinkResourcesSample.ts
[diskaccessesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesGetSample.ts
[diskaccesseslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesListByResourceGroupSample.ts
[diskaccesseslistprivateendpointconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesListPrivateEndpointConnectionsSample.ts
[diskaccesseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesListSample.ts
[diskaccessesupdateaprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesUpdateAPrivateEndpointConnectionSample.ts
[diskaccessesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskAccessesUpdateSample.ts
[diskencryptionsetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskEncryptionSetsCreateOrUpdateSample.ts
[diskencryptionsetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskEncryptionSetsDeleteSample.ts
[diskencryptionsetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskEncryptionSetsGetSample.ts
[diskencryptionsetslistassociatedresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskEncryptionSetsListAssociatedResourcesSample.ts
[diskencryptionsetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskEncryptionSetsListByResourceGroupSample.ts
[diskencryptionsetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskEncryptionSetsListSample.ts
[diskencryptionsetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskEncryptionSetsUpdateSample.ts
[diskrestorepointgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskRestorePointGetSample.ts
[diskrestorepointgrantaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskRestorePointGrantAccessSample.ts
[diskrestorepointlistbyrestorepointsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskRestorePointListByRestorePointSample.ts
[diskrestorepointrevokeaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/diskRestorePointRevokeAccessSample.ts
[diskscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/disksCreateOrUpdateSample.ts
[disksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/disksDeleteSample.ts
[disksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/disksGetSample.ts
[disksgrantaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/disksGrantAccessSample.ts
[diskslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/disksListByResourceGroupSample.ts
[diskslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/disksListSample.ts
[disksrevokeaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/disksRevokeAccessSample.ts
[disksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/disksUpdateSample.ts
[snapshotscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/snapshotsCreateOrUpdateSample.ts
[snapshotsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/snapshotsDeleteSample.ts
[snapshotsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/snapshotsGetSample.ts
[snapshotsgrantaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/snapshotsGrantAccessSample.ts
[snapshotslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/snapshotsListByResourceGroupSample.ts
[snapshotslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/snapshotsListSample.ts
[snapshotsrevokeaccesssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/snapshotsRevokeAccessSample.ts
[snapshotsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-disk/samples/v1-beta/typescript/src/snapshotsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-compute-disk?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-compute-disk/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

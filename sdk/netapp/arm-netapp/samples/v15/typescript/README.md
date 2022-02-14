# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountBackupsDelete.ts][accountbackupsdelete]                     | Delete the specified Backup for a Netapp Account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Backups_Account_Delete.json                                                                                                                            |
| [accountBackupsGet.ts][accountbackupsget]                           | Gets the specified backup for a Netapp Account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Backups_Account_Get.json                                                                                                                                 |
| [accountBackupsList.ts][accountbackupslist]                         | List all Backups for a Netapp Account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Backups_Account_List.json                                                                                                                                         |
| [accountsCreateOrUpdate.ts][accountscreateorupdate]                 | Create or update the specified NetApp account within the resource group x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Accounts_CreateOrUpdate.json                                                                                                    |
| [accountsDelete.ts][accountsdelete]                                 | Delete the specified NetApp account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Accounts_Delete.json                                                                                                                                                |
| [accountsGet.ts][accountsget]                                       | Get the NetApp account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Accounts_Get.json                                                                                                                                                                |
| [accountsList.ts][accountslist]                                     | List and describe all NetApp accounts in the resource group. x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Accounts_List.json                                                                                                                         |
| [accountsUpdate.ts][accountsupdate]                                 | Patch the specified NetApp account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Accounts_Update.json                                                                                                                                                 |
| [backupPoliciesCreate.ts][backuppoliciescreate]                     | Create a backup policy for Netapp Account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/BackupPolicies_Create.json                                                                                                                                    |
| [backupPoliciesUpdate.ts][backuppoliciesupdate]                     | Patch a backup policy for Netapp Account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/BackupPolicies_Update.json                                                                                                                                     |
| [backupsCreate.ts][backupscreate]                                   | Create a backup for the volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Backups_Create.json                                                                                                                                                      |
| [backupsDelete.ts][backupsdelete]                                   | Delete backup policy x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/BackupPolicies_Delete.json                                                                                                                                                         |
| [backupsGet.ts][backupsget]                                         | Get a particular backup Policy x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/BackupPolicies_Get.json                                                                                                                                                  |
| [backupsList.ts][backupslist]                                       | List backup policies for Netapp Account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/BackupPolicies_List.json                                                                                                                                        |
| [backupsUpdate.ts][backupsupdate]                                   | Patch a backup for the volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Backups_Update.json                                                                                                                                                       |
| [checkFilePathAvailability.ts][checkfilepathavailability]           | Check if a file path is available. x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/CheckFilePathAvailability.json                                                                                                                                       |
| [checkNameAvailability.ts][checknameavailability]                   | Check if a resource name is available. x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/CheckNameAvailability.json                                                                                                                                       |
| [checkQuotaAvailability.ts][checkquotaavailability]                 | Check if a quota is available. x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/CheckQuotaAvailability.json                                                                                                                                              |
| [operationList.ts][operationlist]                                   | Lists all of the available Microsoft.NetApp Rest API operations x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/OperationList.json                                                                                                                      |
| [poolsCreateOrUpdate.ts][poolscreateorupdate]                       | Create or Update a capacity pool x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Pools_CreateOrUpdate.json                                                                                                                                              |
| [poolsDelete.ts][poolsdelete]                                       | Delete the specified capacity pool x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Pools_Delete.json                                                                                                                                                    |
| [poolsGet.ts][poolsget]                                             | Get details of the specified capacity pool x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Pools_Get.json                                                                                                                                               |
| [poolsList.ts][poolslist]                                           | List all capacity pools in the NetApp Account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Pools_List.json                                                                                                                                           |
| [poolsUpdate.ts][poolsupdate]                                       | Patch the specified capacity pool x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Pools_Update.json                                                                                                                                                     |
| [quotaLimits.ts][quotalimits]                                       | Get the default and current subscription quota limit x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/QuotaLimits_Get.json                                                                                                                               |
| [snapshotPoliciesCreate.ts][snapshotpoliciescreate]                 | Create a snapshot policy x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/SnapshotPolicies_Create.json                                                                                                                                                   |
| [snapshotPoliciesDelete.ts][snapshotpoliciesdelete]                 | Delete snapshot policy x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/SnapshotPolicies_Delete.json                                                                                                                                                     |
| [snapshotPoliciesGet.ts][snapshotpoliciesget]                       | Get a snapshot Policy x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/SnapshotPolicies_Get.json                                                                                                                                                         |
| [snapshotPoliciesList.ts][snapshotpolicieslist]                     | List snapshot policy x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/SnapshotPolicies_List.json                                                                                                                                                         |
| [snapshotPoliciesListVolumes.ts][snapshotpolicieslistvolumes]       | Get volumes associated with snapshot policy x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/SnapshotPolicies_ListVolumes.json                                                                                                                           |
| [snapshotPoliciesUpdate.ts][snapshotpoliciesupdate]                 | Patch a snapshot policy x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/SnapshotPolicies_Update.json                                                                                                                                                    |
| [snapshotsCreate.ts][snapshotscreate]                               | Create the specified snapshot within the given volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Snapshots_Create.json                                                                                                                             |
| [snapshotsDelete.ts][snapshotsdelete]                               | Delete snapshot x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Snapshots_Delete.json                                                                                                                                                                   |
| [snapshotsGet.ts][snapshotsget]                                     | Get details of the specified snapshot x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Snapshots_Get.json                                                                                                                                                |
| [snapshotsList.ts][snapshotslist]                                   | List all snapshots associated with the volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Snapshots_List.json                                                                                                                                       |
| [snapshotsSingleFileRestore.ts][snapshotssinglefilerestore]         | Restore the specified files from the specified snapshot to the active filesystem x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Snapshots_SingleFileRestore.json                                                                                       |
| [snapshotsUpdate.ts][snapshotsupdate]                               | Patch a snapshot x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Snapshots_Update.json                                                                                                                                                                  |
| [subvolumesCreate.ts][subvolumescreate]                             | Creates a subvolume in the path or clones the subvolume mentioned in the parentPath x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Subvolumes_Create.json                                                                                              |
| [subvolumesDelete.ts][subvolumesdelete]                             | Delete subvolume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Subvolumes_Delete.json                                                                                                                                                                 |
| [subvolumesGet.ts][subvolumesget]                                   | Returns the path associated with the subvolumeName provided x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Subvolumes_Get.json                                                                                                                         |
| [subvolumesList.ts][subvolumeslist]                                 | Returns a list of the subvolumes in the volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Subvolumes_List.json                                                                                                                                     |
| [subvolumesMetadata.ts][subvolumesmetadata]                         | Get details of the specified subvolume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Subvolumes_Metadata.json                                                                                                                                         |
| [subvolumesUpdate.ts][subvolumesupdate]                             | Patch a subvolume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Subvolumes_Update.json                                                                                                                                                                |
| [vaultsList.ts][vaultslist]                                         | List vaults for a Netapp Account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Vaults_List.json                                                                                                                                                       |
| [volumeGroupsCreate.ts][volumegroupscreate]                         | Create a volume group along with specified volumes x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/VolumeGroups_Create.json                                                                                                                             |
| [volumeGroupsDelete.ts][volumegroupsdelete]                         | Delete the specified volume group only if there are no volumes under volume group. x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/VolumeGroups_Delete.json                                                                                             |
| [volumeGroupsGet.ts][volumegroupsget]                               | Get details of the specified volume group x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/VolumeGroups_Get.json                                                                                                                                         |
| [volumeGroupsList.ts][volumegroupslist]                             | List all volume groups for given account x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/VolumeGroups_List.json                                                                                                                                         |
| [volumesAuthorizeReplication.ts][volumesauthorizereplication]       | Moves volume to another pool x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_PoolChange.json                                                                                                                                                    |
| [volumesBackupStatus.ts][volumesbackupstatus]                       | Get the status of the backup for a volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_BackupStatus.json                                                                                                                                     |
| [volumesBreakReplication.ts][volumesbreakreplication]               | Break the replication connection on the destination volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_BreakReplication.json                                                                                                                |
| [volumesCreateOrUpdate.ts][volumescreateorupdate]                   | Create or update the specified volume within the capacity pool x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_CreateOrUpdate.json                                                                                                              |
| [volumesDelete.ts][volumesdelete]                                   | Delete the specified volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_Delete.json                                                                                                                                                         |
| [volumesDeleteReplication.ts][volumesdeletereplication]             | Delete the replication connection on the destination volume, and send release to the source replication x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_DeleteReplication.json                                                                  |
| [volumesGet.ts][volumesget]                                         | Get the details of the specified volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_Get.json                                                                                                                                                |
| [volumesList.ts][volumeslist]                                       | List all volumes within the capacity pool x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_List.json                                                                                                                                             |
| [volumesReInitializeReplication.ts][volumesreinitializereplication] | Re-Initializes the replication connection on the destination volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_ReInitializeReplication.json                                                                                                |
| [volumesReplicationStatus.ts][volumesreplicationstatus]             | Get the status of the replication x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_ReplicationStatus.json                                                                                                                                        |
| [volumesRestoreStatus.ts][volumesrestorestatus]                     | Get the status of the restore for a volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_RestoreStatus.json                                                                                                                                   |
| [volumesResyncReplication.ts][volumesresyncreplication]             | Resync the connection on the destination volume. If the operation is ran on the source volume it will reverse-resync the connection and sync from destination to source. x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_ResyncReplication.json |
| [volumesRevert.ts][volumesrevert]                                   | Revert a volume to the snapshot specified in the body x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_Revert.json                                                                                                                               |
| [volumesUpdate.ts][volumesupdate]                                   | Patch the specified volume x-ms-original-file: specification/netapp/resource-manager/Microsoft.NetApp/stable/2021-10-01/examples/Volumes_Update.json                                                                                                                                                          |

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
node dist/accountBackupsDelete.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/accountBackupsDelete.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountbackupsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/accountBackupsDelete.ts
[accountbackupsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/accountBackupsGet.ts
[accountbackupslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/accountBackupsList.ts
[accountscreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/accountsCreateOrUpdate.ts
[accountsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/accountsDelete.ts
[accountsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/accountsGet.ts
[accountslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/accountsList.ts
[accountsupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/accountsUpdate.ts
[backuppoliciescreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/backupPoliciesCreate.ts
[backuppoliciesupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/backupPoliciesUpdate.ts
[backupscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/backupsCreate.ts
[backupsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/backupsDelete.ts
[backupsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/backupsGet.ts
[backupslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/backupsList.ts
[backupsupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/backupsUpdate.ts
[checkfilepathavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/checkFilePathAvailability.ts
[checknameavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/checkNameAvailability.ts
[checkquotaavailability]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/checkQuotaAvailability.ts
[operationlist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/operationList.ts
[poolscreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/poolsCreateOrUpdate.ts
[poolsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/poolsDelete.ts
[poolsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/poolsGet.ts
[poolslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/poolsList.ts
[poolsupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/poolsUpdate.ts
[quotalimits]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/quotaLimits.ts
[snapshotpoliciescreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotPoliciesCreate.ts
[snapshotpoliciesdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotPoliciesDelete.ts
[snapshotpoliciesget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotPoliciesGet.ts
[snapshotpolicieslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotPoliciesList.ts
[snapshotpolicieslistvolumes]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotPoliciesListVolumes.ts
[snapshotpoliciesupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotPoliciesUpdate.ts
[snapshotscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotsCreate.ts
[snapshotsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotsDelete.ts
[snapshotsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotsGet.ts
[snapshotslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotsList.ts
[snapshotssinglefilerestore]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotsSingleFileRestore.ts
[snapshotsupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/snapshotsUpdate.ts
[subvolumescreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/subvolumesCreate.ts
[subvolumesdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/subvolumesDelete.ts
[subvolumesget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/subvolumesGet.ts
[subvolumeslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/subvolumesList.ts
[subvolumesmetadata]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/subvolumesMetadata.ts
[subvolumesupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/subvolumesUpdate.ts
[vaultslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/vaultsList.ts
[volumegroupscreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumeGroupsCreate.ts
[volumegroupsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumeGroupsDelete.ts
[volumegroupsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumeGroupsGet.ts
[volumegroupslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumeGroupsList.ts
[volumesauthorizereplication]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesAuthorizeReplication.ts
[volumesbackupstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesBackupStatus.ts
[volumesbreakreplication]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesBreakReplication.ts
[volumescreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesCreateOrUpdate.ts
[volumesdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesDelete.ts
[volumesdeletereplication]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesDeleteReplication.ts
[volumesget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesGet.ts
[volumeslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesList.ts
[volumesreinitializereplication]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesReInitializeReplication.ts
[volumesreplicationstatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesReplicationStatus.ts
[volumesrestorestatus]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesRestoreStatus.ts
[volumesresyncreplication]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesResyncReplication.ts
[volumesrevert]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesRevert.ts
[volumesupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/netapp/arm-netapp/samples/v15/typescript/src/volumesUpdate.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-netapp?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/netapp/arm-netapp/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

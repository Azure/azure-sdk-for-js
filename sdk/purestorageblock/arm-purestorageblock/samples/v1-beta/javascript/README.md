# @azure/arm-purestorageblock client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-purestorageblock in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [avsStorageContainerVolumesDeleteSample.js][avsstoragecontainervolumesdeletesample]                                       | delete a volume in an AVS storage container x-ms-original-file: 2026-01-01-preview/AvsStorageContainerVolumes_Delete_MaximumSet_Gen.json                                                              |
| [avsStorageContainerVolumesGetSample.js][avsstoragecontainervolumesgetsample]                                             | get a volume in an AVS storage container x-ms-original-file: 2026-01-01-preview/AvsStorageContainerVolumes_Get_MaximumSet_Gen.json                                                                    |
| [avsStorageContainerVolumesListByAvsStorageContainerSample.js][avsstoragecontainervolumeslistbyavsstoragecontainersample] | list volumes in an AVS storage container x-ms-original-file: 2026-01-01-preview/AvsStorageContainerVolumes_ListByAvsStorageContainer_MaximumSet_Gen.json                                              |
| [avsStorageContainerVolumesUpdateSample.js][avsstoragecontainervolumesupdatesample]                                       | update a volume in an AVS storage container x-ms-original-file: 2026-01-01-preview/AvsStorageContainerVolumes_Update_MaximumSet_Gen.json                                                              |
| [avsStorageContainersDeleteSample.js][avsstoragecontainersdeletesample]                                                   | delete an AVS storage container x-ms-original-file: 2026-01-01-preview/AvsStorageContainers_Delete_MaximumSet_Gen.json                                                                                |
| [avsStorageContainersGetSample.js][avsstoragecontainersgetsample]                                                         | get an AVS storage container x-ms-original-file: 2026-01-01-preview/AvsStorageContainers_Get_MaximumSet_Gen.json                                                                                      |
| [avsStorageContainersListByStoragePoolSample.js][avsstoragecontainerslistbystoragepoolsample]                             | list AVS storage containers by storage pool x-ms-original-file: 2026-01-01-preview/AvsStorageContainers_ListByStoragePool_MaximumSet_Gen.json                                                         |
| [avsVmVolumesDeleteSample.js][avsvmvolumesdeletesample]                                                                   | delete a volume in an AVS VM x-ms-original-file: 2026-01-01-preview/AvsVmVolumes_Delete_MaximumSet_Gen.json                                                                                           |
| [avsVmVolumesGetSample.js][avsvmvolumesgetsample]                                                                         | get a volume in an AVS VM x-ms-original-file: 2026-01-01-preview/AvsVmVolumes_Get_MaximumSet_Gen.json                                                                                                 |
| [avsVmVolumesListByAvsVmSample.js][avsvmvolumeslistbyavsvmsample]                                                         | list volumes in an AVS VM x-ms-original-file: 2026-01-01-preview/AvsVmVolumes_ListByAvsVm_MaximumSet_Gen.json                                                                                         |
| [avsVmVolumesUpdateSample.js][avsvmvolumesupdatesample]                                                                   | update a volume in an AVS VM x-ms-original-file: 2026-01-01-preview/AvsVmVolumes_Update_MaximumSet_Gen.json                                                                                           |
| [avsVmsDeleteSample.js][avsvmsdeletesample]                                                                               | delete an AVS VM x-ms-original-file: 2026-01-01-preview/AvsVms_Delete_MaximumSet_Gen.json                                                                                                             |
| [avsVmsGetSample.js][avsvmsgetsample]                                                                                     | get an AVS VM x-ms-original-file: 2026-01-01-preview/AvsVms_Get_MaximumSet_Gen.json                                                                                                                   |
| [avsVmsListByStoragePoolSample.js][avsvmslistbystoragepoolsample]                                                         | list AVS VMs by storage pool x-ms-original-file: 2026-01-01-preview/AvsVms_ListByStoragePool_MaximumSet_Gen.json                                                                                      |
| [avsVmsUpdateSample.js][avsvmsupdatesample]                                                                               | update an AVS VM x-ms-original-file: 2026-01-01-preview/AvsVms_Update_MaximumSet_Gen.json                                                                                                             |
| [operationsListSample.js][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2026-01-01-preview/Operations_List_MaximumSet_Gen.json                                                                                       |
| [reservationsCreateSample.js][reservationscreatesample]                                                                   | create a reservation x-ms-original-file: 2026-01-01-preview/Reservations_Create_MaximumSet_Gen.json                                                                                                   |
| [reservationsDeleteSample.js][reservationsdeletesample]                                                                   | delete a reservation x-ms-original-file: 2026-01-01-preview/Reservations_Delete_MaximumSet_Gen.json                                                                                                   |
| [reservationsGetBillingReportSample.js][reservationsgetbillingreportsample]                                               | provides a summarized report along with actions for resources billed via given reservation x-ms-original-file: 2026-01-01-preview/Reservations_GetBillingReport_MaximumSet_Gen.json                   |
| [reservationsGetBillingStatusSample.js][reservationsgetbillingstatussample]                                               | provides various statistics about resources billed via given reservation. x-ms-original-file: 2026-01-01-preview/Reservations_GetBillingStatus_MaximumSet_Gen.json                                    |
| [reservationsGetResourceLimitsSample.js][reservationsgetresourcelimitssample]                                             | limits constraining certain resource properties. x-ms-original-file: 2026-01-01-preview/Reservations_GetResourceLimits_MaximumSet_Gen.json                                                            |
| [reservationsGetSample.js][reservationsgetsample]                                                                         | get a reservation x-ms-original-file: 2026-01-01-preview/Reservations_Get_MaximumSet_Gen.json                                                                                                         |
| [reservationsListByResourceGroupSample.js][reservationslistbyresourcegroupsample]                                         | list reservations by resource group x-ms-original-file: 2026-01-01-preview/Reservations_ListByResourceGroup_MaximumSet_Gen.json                                                                       |
| [reservationsListBySubscriptionSample.js][reservationslistbysubscriptionsample]                                           | list reservations by Azure subscription ID x-ms-original-file: 2026-01-01-preview/Reservations_ListBySubscription_MaximumSet_Gen.json                                                                 |
| [reservationsUpdateSample.js][reservationsupdatesample]                                                                   | update a reservation x-ms-original-file: 2026-01-01-preview/Reservations_Update_MaximumSet_Gen.json                                                                                                   |
| [storagePoolsCreateSample.js][storagepoolscreatesample]                                                                   | create a storage pool x-ms-original-file: 2026-01-01-preview/StoragePools_Create_MaximumSet_Gen.json                                                                                                  |
| [storagePoolsDeleteSample.js][storagepoolsdeletesample]                                                                   | delete a storage pool x-ms-original-file: 2026-01-01-preview/StoragePools_Delete_MaximumSet_Gen.json                                                                                                  |
| [storagePoolsDisableAvsConnectionSample.js][storagepoolsdisableavsconnectionsample]                                       | disable the existing AVS connection x-ms-original-file: 2026-01-01-preview/StoragePools_DisableAvsConnection_MaximumSet_Gen.json                                                                      |
| [storagePoolsEnableAvsConnectionSample.js][storagepoolsenableavsconnectionsample]                                         | initiate a connection between the storage pool and a specified AVS SDDC resource x-ms-original-file: 2026-01-01-preview/StoragePools_EnableAvsConnection_MaximumSet_Gen.json                          |
| [storagePoolsFinalizeAvsConnectionSample.js][storagepoolsfinalizeavsconnectionsample]                                     | finalize an already started AVS connection to a specific AVS SDDC x-ms-original-file: 2026-01-01-preview/StoragePools_FinalizeAvsConnection_MaximumSet_Gen.json                                       |
| [storagePoolsGetAvsConnectionSample.js][storagepoolsgetavsconnectionsample]                                               | returns current information about an on-going connection to an AVS instance x-ms-original-file: 2026-01-01-preview/StoragePools_GetAvsConnection_MaximumSet_Gen.json                                  |
| [storagePoolsGetAvsStatusSample.js][storagepoolsgetavsstatussample]                                                       | returns the status of the storage pool connection to AVS x-ms-original-file: 2026-01-01-preview/StoragePools_GetAvsStatus_MaximumSet_Gen.json                                                         |
| [storagePoolsGetHealthStatusSample.js][storagepoolsgethealthstatussample]                                                 | retrieve health metrics of a storage pool x-ms-original-file: 2026-01-01-preview/StoragePools_GetHealthStatus_MaximumSet_Gen.json                                                                     |
| [storagePoolsGetSample.js][storagepoolsgetsample]                                                                         | get a storage pool x-ms-original-file: 2026-01-01-preview/StoragePools_Get_MaximumSet_Gen.json                                                                                                        |
| [storagePoolsListByResourceGroupSample.js][storagepoolslistbyresourcegroupsample]                                         | list storage pools by resource group x-ms-original-file: 2026-01-01-preview/StoragePools_ListByResourceGroup_MaximumSet_Gen.json                                                                      |
| [storagePoolsListBySubscriptionSample.js][storagepoolslistbysubscriptionsample]                                           | list storage pools by Azure subscription ID x-ms-original-file: 2026-01-01-preview/StoragePools_ListBySubscription_MaximumSet_Gen.json                                                                |
| [storagePoolsRepairAvsConnectionSample.js][storagepoolsrepairavsconnectionsample]                                         | test and repair, if needed, all configuration elements of the storage pool connection to the AVS instance x-ms-original-file: 2026-01-01-preview/StoragePools_RepairAvsConnection_MaximumSet_Gen.json |
| [storagePoolsUpdateSample.js][storagepoolsupdatesample]                                                                   | update a storage pool x-ms-original-file: 2026-01-01-preview/StoragePools_Update_MaximumSet_Gen.json                                                                                                  |
| [volumeGroupsCreateSample.js][volumegroupscreatesample]                                                                   | create a volume group x-ms-original-file: 2026-01-01-preview/VolumeGroups_Create_MaximumSet_Gen.json                                                                                                  |
| [volumeGroupsDeleteSample.js][volumegroupsdeletesample]                                                                   | delete a volume group x-ms-original-file: 2026-01-01-preview/VolumeGroups_Delete_MaximumSet_Gen.json                                                                                                  |
| [volumeGroupsGetSample.js][volumegroupsgetsample]                                                                         | get a volume group x-ms-original-file: 2026-01-01-preview/VolumeGroups_Get_MaximumSet_Gen.json                                                                                                        |
| [volumeGroupsGetStatusSample.js][volumegroupsgetstatussample]                                                             | get current status and space information of the volume group x-ms-original-file: 2026-01-01-preview/VolumeGroups_GetStatus_MaximumSet_Gen.json                                                        |
| [volumeGroupsListByStoragePoolSample.js][volumegroupslistbystoragepoolsample]                                             | list volume groups by storage pool x-ms-original-file: 2026-01-01-preview/VolumeGroups_ListByStoragePool_MaximumSet_Gen.json                                                                          |
| [volumeGroupsListConnectionParametersSample.js][volumegroupslistconnectionparameterssample]                               | get connection parameters for ISCSI connection to the volume group x-ms-original-file: 2026-01-01-preview/VolumeGroups_ListConnectionParameters_MaximumSet_Gen.json                                   |
| [volumeGroupsUpdateSample.js][volumegroupsupdatesample]                                                                   | update a volume group x-ms-original-file: 2026-01-01-preview/VolumeGroups_Update_MaximumSet_Gen.json                                                                                                  |
| [volumesCreateSample.js][volumescreatesample]                                                                             | create a volume x-ms-original-file: 2026-01-01-preview/Volumes_Create_MaximumSet_Gen.json                                                                                                             |
| [volumesDeleteSample.js][volumesdeletesample]                                                                             | delete a volume x-ms-original-file: 2026-01-01-preview/Volumes_Delete_MaximumSet_Gen.json                                                                                                             |
| [volumesGetSample.js][volumesgetsample]                                                                                   | get a volume x-ms-original-file: 2026-01-01-preview/Volumes_Get_MaximumSet_Gen.json                                                                                                                   |
| [volumesListByVolumeGroupSample.js][volumeslistbyvolumegroupsample]                                                       | list volumes by volume group x-ms-original-file: 2026-01-01-preview/Volumes_ListByVolumeGroup_MaximumSet_Gen.json                                                                                     |
| [volumesUpdateSample.js][volumesupdatesample]                                                                             | update a volume x-ms-original-file: 2026-01-01-preview/Volumes_Update_MaximumSet_Gen.json                                                                                                             |

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
node avsStorageContainerVolumesDeleteSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node avsStorageContainerVolumesDeleteSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[avsstoragecontainervolumesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsStorageContainerVolumesDeleteSample.js
[avsstoragecontainervolumesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsStorageContainerVolumesGetSample.js
[avsstoragecontainervolumeslistbyavsstoragecontainersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsStorageContainerVolumesListByAvsStorageContainerSample.js
[avsstoragecontainervolumesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsStorageContainerVolumesUpdateSample.js
[avsstoragecontainersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsStorageContainersDeleteSample.js
[avsstoragecontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsStorageContainersGetSample.js
[avsstoragecontainerslistbystoragepoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsStorageContainersListByStoragePoolSample.js
[avsvmvolumesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsVmVolumesDeleteSample.js
[avsvmvolumesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsVmVolumesGetSample.js
[avsvmvolumeslistbyavsvmsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsVmVolumesListByAvsVmSample.js
[avsvmvolumesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsVmVolumesUpdateSample.js
[avsvmsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsVmsDeleteSample.js
[avsvmsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsVmsGetSample.js
[avsvmslistbystoragepoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsVmsListByStoragePoolSample.js
[avsvmsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/avsVmsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/operationsListSample.js
[reservationscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/reservationsCreateSample.js
[reservationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/reservationsDeleteSample.js
[reservationsgetbillingreportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/reservationsGetBillingReportSample.js
[reservationsgetbillingstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/reservationsGetBillingStatusSample.js
[reservationsgetresourcelimitssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/reservationsGetResourceLimitsSample.js
[reservationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/reservationsGetSample.js
[reservationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/reservationsListByResourceGroupSample.js
[reservationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/reservationsListBySubscriptionSample.js
[reservationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/reservationsUpdateSample.js
[storagepoolscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsCreateSample.js
[storagepoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsDeleteSample.js
[storagepoolsdisableavsconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsDisableAvsConnectionSample.js
[storagepoolsenableavsconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsEnableAvsConnectionSample.js
[storagepoolsfinalizeavsconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsFinalizeAvsConnectionSample.js
[storagepoolsgetavsconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsGetAvsConnectionSample.js
[storagepoolsgetavsstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsGetAvsStatusSample.js
[storagepoolsgethealthstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsGetHealthStatusSample.js
[storagepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsGetSample.js
[storagepoolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsListByResourceGroupSample.js
[storagepoolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsListBySubscriptionSample.js
[storagepoolsrepairavsconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsRepairAvsConnectionSample.js
[storagepoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/storagePoolsUpdateSample.js
[volumegroupscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumeGroupsCreateSample.js
[volumegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumeGroupsDeleteSample.js
[volumegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumeGroupsGetSample.js
[volumegroupsgetstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumeGroupsGetStatusSample.js
[volumegroupslistbystoragepoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumeGroupsListByStoragePoolSample.js
[volumegroupslistconnectionparameterssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumeGroupsListConnectionParametersSample.js
[volumegroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumeGroupsUpdateSample.js
[volumescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumesCreateSample.js
[volumesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumesDeleteSample.js
[volumesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumesGetSample.js
[volumeslistbyvolumegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumesListByVolumeGroupSample.js
[volumesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1-beta/javascript/volumesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-purestorageblock?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purestorageblock/arm-purestorageblock/README.md

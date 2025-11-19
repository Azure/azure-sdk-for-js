# @azure/arm-purestorageblock client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-purestorageblock in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [avsStorageContainerVolumesDeleteSample.ts][avsstoragecontainervolumesdeletesample]                                       | delete a volume in an AVS storage container x-ms-original-file: 2024-11-01/AvsStorageContainerVolumes_Delete_MaximumSet_Gen.json                                                              |
| [avsStorageContainerVolumesGetSample.ts][avsstoragecontainervolumesgetsample]                                             | get a volume in an AVS storage container x-ms-original-file: 2024-11-01/AvsStorageContainerVolumes_Get_MaximumSet_Gen.json                                                                    |
| [avsStorageContainerVolumesListByAvsStorageContainerSample.ts][avsstoragecontainervolumeslistbyavsstoragecontainersample] | list volumes in an AVS storage container x-ms-original-file: 2024-11-01/AvsStorageContainerVolumes_ListByAvsStorageContainer_MaximumSet_Gen.json                                              |
| [avsStorageContainerVolumesUpdateSample.ts][avsstoragecontainervolumesupdatesample]                                       | update a volume in an AVS storage container x-ms-original-file: 2024-11-01/AvsStorageContainerVolumes_Update_MaximumSet_Gen.json                                                              |
| [avsStorageContainersDeleteSample.ts][avsstoragecontainersdeletesample]                                                   | delete an AVS storage container x-ms-original-file: 2024-11-01/AvsStorageContainers_Delete_MaximumSet_Gen.json                                                                                |
| [avsStorageContainersGetSample.ts][avsstoragecontainersgetsample]                                                         | get an AVS storage container x-ms-original-file: 2024-11-01/AvsStorageContainers_Get_MaximumSet_Gen.json                                                                                      |
| [avsStorageContainersListByStoragePoolSample.ts][avsstoragecontainerslistbystoragepoolsample]                             | list AVS storage containers by storage pool x-ms-original-file: 2024-11-01/AvsStorageContainers_ListByStoragePool_MaximumSet_Gen.json                                                         |
| [avsVmVolumesDeleteSample.ts][avsvmvolumesdeletesample]                                                                   | delete a volume in an AVS VM x-ms-original-file: 2024-11-01/AvsVmVolumes_Delete_MaximumSet_Gen.json                                                                                           |
| [avsVmVolumesGetSample.ts][avsvmvolumesgetsample]                                                                         | get a volume in an AVS VM x-ms-original-file: 2024-11-01/AvsVmVolumes_Get_MaximumSet_Gen.json                                                                                                 |
| [avsVmVolumesListByAvsVmSample.ts][avsvmvolumeslistbyavsvmsample]                                                         | list volumes in an AVS VM x-ms-original-file: 2024-11-01/AvsVmVolumes_ListByAvsVm_MaximumSet_Gen.json                                                                                         |
| [avsVmVolumesUpdateSample.ts][avsvmvolumesupdatesample]                                                                   | update a volume in an AVS VM x-ms-original-file: 2024-11-01/AvsVmVolumes_Update_MaximumSet_Gen.json                                                                                           |
| [avsVmsDeleteSample.ts][avsvmsdeletesample]                                                                               | delete an AVS VM x-ms-original-file: 2024-11-01/AvsVms_Delete_MaximumSet_Gen.json                                                                                                             |
| [avsVmsGetSample.ts][avsvmsgetsample]                                                                                     | get an AVS VM x-ms-original-file: 2024-11-01/AvsVms_Get_MaximumSet_Gen.json                                                                                                                   |
| [avsVmsListByStoragePoolSample.ts][avsvmslistbystoragepoolsample]                                                         | list AVS VMs by storage pool x-ms-original-file: 2024-11-01/AvsVms_ListByStoragePool_MaximumSet_Gen.json                                                                                      |
| [avsVmsUpdateSample.ts][avsvmsupdatesample]                                                                               | update an AVS VM x-ms-original-file: 2024-11-01/AvsVms_Update_MaximumSet_Gen.json                                                                                                             |
| [operationsListSample.ts][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2024-11-01/Operations_List_MaximumSet_Gen.json                                                                                       |
| [reservationsGetBillingReportSample.ts][reservationsgetbillingreportsample]                                               | provides a summarized report along with actions for resources billed via given reservation x-ms-original-file: 2024-11-01/Reservations_GetBillingReport_MaximumSet_Gen.json                   |
| [reservationsGetBillingStatusSample.ts][reservationsgetbillingstatussample]                                               | provides various statistics about resources billed via given reservation. x-ms-original-file: 2024-11-01/Reservations_GetBillingStatus_MaximumSet_Gen.json                                    |
| [reservationsGetResourceLimitsSample.ts][reservationsgetresourcelimitssample]                                             | limits constraining certain resource properties. x-ms-original-file: 2024-11-01/Reservations_GetResourceLimits_MaximumSet_Gen.json                                                            |
| [storagePoolsCreateSample.ts][storagepoolscreatesample]                                                                   | create a storage pool x-ms-original-file: 2024-11-01/StoragePools_Create_MaximumSet_Gen.json                                                                                                  |
| [storagePoolsDeleteSample.ts][storagepoolsdeletesample]                                                                   | delete a storage pool x-ms-original-file: 2024-11-01/StoragePools_Delete_MaximumSet_Gen.json                                                                                                  |
| [storagePoolsDisableAvsConnectionSample.ts][storagepoolsdisableavsconnectionsample]                                       | disable the existing AVS connection x-ms-original-file: 2024-11-01/StoragePools_DisableAvsConnection_MaximumSet_Gen.json                                                                      |
| [storagePoolsEnableAvsConnectionSample.ts][storagepoolsenableavsconnectionsample]                                         | initiate a connection between the storage pool and a specified AVS SDDC resource x-ms-original-file: 2024-11-01/StoragePools_EnableAvsConnection_MaximumSet_Gen.json                          |
| [storagePoolsFinalizeAvsConnectionSample.ts][storagepoolsfinalizeavsconnectionsample]                                     | finalize an already started AVS connection to a specific AVS SDDC x-ms-original-file: 2024-11-01/StoragePools_FinalizeAvsConnection_MaximumSet_Gen.json                                       |
| [storagePoolsGetAvsConnectionSample.ts][storagepoolsgetavsconnectionsample]                                               | returns current information about an on-going connection to an AVS instance x-ms-original-file: 2024-11-01/StoragePools_GetAvsConnection_MaximumSet_Gen.json                                  |
| [storagePoolsGetAvsStatusSample.ts][storagepoolsgetavsstatussample]                                                       | returns the status of the storage pool connection to AVS x-ms-original-file: 2024-11-01/StoragePools_GetAvsStatus_MaximumSet_Gen.json                                                         |
| [storagePoolsGetHealthStatusSample.ts][storagepoolsgethealthstatussample]                                                 | retrieve health metrics of a storage pool x-ms-original-file: 2024-11-01/StoragePools_GetHealthStatus_MaximumSet_Gen.json                                                                     |
| [storagePoolsGetSample.ts][storagepoolsgetsample]                                                                         | get a storage pool x-ms-original-file: 2024-11-01/StoragePools_Get_MaximumSet_Gen.json                                                                                                        |
| [storagePoolsListByResourceGroupSample.ts][storagepoolslistbyresourcegroupsample]                                         | list storage pools by resource group x-ms-original-file: 2024-11-01/StoragePools_ListByResourceGroup_MaximumSet_Gen.json                                                                      |
| [storagePoolsListBySubscriptionSample.ts][storagepoolslistbysubscriptionsample]                                           | list storage pools by Azure subscription ID x-ms-original-file: 2024-11-01/StoragePools_ListBySubscription_MaximumSet_Gen.json                                                                |
| [storagePoolsRepairAvsConnectionSample.ts][storagepoolsrepairavsconnectionsample]                                         | test and repair, if needed, all configuration elements of the storage pool connection to the AVS instance x-ms-original-file: 2024-11-01/StoragePools_RepairAvsConnection_MaximumSet_Gen.json |
| [storagePoolsUpdateSample.ts][storagepoolsupdatesample]                                                                   | update a storage pool x-ms-original-file: 2024-11-01/StoragePools_Update_MaximumSet_Gen.json                                                                                                  |

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
node dist/avsStorageContainerVolumesDeleteSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/avsStorageContainerVolumesDeleteSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[avsstoragecontainervolumesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsStorageContainerVolumesDeleteSample.ts
[avsstoragecontainervolumesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsStorageContainerVolumesGetSample.ts
[avsstoragecontainervolumeslistbyavsstoragecontainersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsStorageContainerVolumesListByAvsStorageContainerSample.ts
[avsstoragecontainervolumesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsStorageContainerVolumesUpdateSample.ts
[avsstoragecontainersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsStorageContainersDeleteSample.ts
[avsstoragecontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsStorageContainersGetSample.ts
[avsstoragecontainerslistbystoragepoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsStorageContainersListByStoragePoolSample.ts
[avsvmvolumesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsVmVolumesDeleteSample.ts
[avsvmvolumesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsVmVolumesGetSample.ts
[avsvmvolumeslistbyavsvmsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsVmVolumesListByAvsVmSample.ts
[avsvmvolumesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsVmVolumesUpdateSample.ts
[avsvmsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsVmsDeleteSample.ts
[avsvmsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsVmsGetSample.ts
[avsvmslistbystoragepoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsVmsListByStoragePoolSample.ts
[avsvmsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/avsVmsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/operationsListSample.ts
[reservationsgetbillingreportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/reservationsGetBillingReportSample.ts
[reservationsgetbillingstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/reservationsGetBillingStatusSample.ts
[reservationsgetresourcelimitssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/reservationsGetResourceLimitsSample.ts
[storagepoolscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsCreateSample.ts
[storagepoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsDeleteSample.ts
[storagepoolsdisableavsconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsDisableAvsConnectionSample.ts
[storagepoolsenableavsconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsEnableAvsConnectionSample.ts
[storagepoolsfinalizeavsconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsFinalizeAvsConnectionSample.ts
[storagepoolsgetavsconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsGetAvsConnectionSample.ts
[storagepoolsgetavsstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsGetAvsStatusSample.ts
[storagepoolsgethealthstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsGetHealthStatusSample.ts
[storagepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsGetSample.ts
[storagepoolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsListByResourceGroupSample.ts
[storagepoolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsListBySubscriptionSample.ts
[storagepoolsrepairavsconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsRepairAvsConnectionSample.ts
[storagepoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purestorageblock/arm-purestorageblock/samples/v1/typescript/src/storagePoolsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-purestorageblock?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purestorageblock/arm-purestorageblock/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

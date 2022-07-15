# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ascOperationsGetSample.ts][ascoperationsgetsample]                         | Gets the status of an asynchronous operation for the Azure HPC Cache x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/AscOperations_Get.json                                                                                                                                                                                                                                                                                   |
| [cachesCreateOrUpdateSample.ts][cachescreateorupdatesample]                 | Create or update a Cache. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_CreateOrUpdate.json                                                                                                                                                                                                                                                                                                                          |
| [cachesDebugInfoSample.ts][cachesdebuginfosample]                           | Tells a Cache to write generate debug info for support to process. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_DebugInfo.json                                                                                                                                                                                                                                                                                      |
| [cachesDeleteSample.ts][cachesdeletesample]                                 | Schedules a Cache for deletion. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Delete.json                                                                                                                                                                                                                                                                                                                            |
| [cachesFlushSample.ts][cachesflushsample]                                   | Tells a Cache to write all dirty data to the Storage Target(s). During the flush, clients will see errors returned until the flush is complete. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Flush.json                                                                                                                                                                                                             |
| [cachesGetSample.ts][cachesgetsample]                                       | Returns a Cache. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Get.json                                                                                                                                                                                                                                                                                                                                              |
| [cachesListByResourceGroupSample.ts][cacheslistbyresourcegroupsample]       | Returns all Caches the user has access to under a resource group. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_ListByResourceGroup.json                                                                                                                                                                                                                                                                             |
| [cachesListSample.ts][cacheslistsample]                                     | Returns all Caches the user has access to under a subscription. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_List.json                                                                                                                                                                                                                                                                                              |
| [cachesStartSample.ts][cachesstartsample]                                   | Tells a Stopped state Cache to transition to Active state. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Start.json                                                                                                                                                                                                                                                                                                  |
| [cachesStopSample.ts][cachesstopsample]                                     | Tells an Active Cache to transition to Stopped state. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Stop.json                                                                                                                                                                                                                                                                                                        |
| [cachesUpdateSample.ts][cachesupdatesample]                                 | Update a Cache instance. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Update.json                                                                                                                                                                                                                                                                                                                                   |
| [cachesUpgradeFirmwareSample.ts][cachesupgradefirmwaresample]               | Upgrade a Cache's firmware if a new version is available. Otherwise, this operation has no effect. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_UpgradeFirmware.json                                                                                                                                                                                                                                                |
| [operationsListSample.ts][operationslistsample]                             | Lists all of the available Resource Provider operations. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Operations_List.json                                                                                                                                                                                                                                                                                                 |
| [skusListSample.ts][skuslistsample]                                         | Get the list of StorageCache.Cache SKUs available to this subscription. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Skus_List.json                                                                                                                                                                                                                                                                                        |
| [storageTargetFlushSample.ts][storagetargetflushsample]                     | Tells the cache to write all dirty data to the Storage Target's backend storage. Client requests to this storage target's namespace will return errors until the flush operation completes. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_Flush.json                                                                                                                                                         |
| [storageTargetResumeSample.ts][storagetargetresumesample]                   | Resumes client access to a previously suspended storage target. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_Resume.json                                                                                                                                                                                                                                                                                    |
| [storageTargetSuspendSample.ts][storagetargetsuspendsample]                 | Suspends client access to a storage target. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_Suspend.json                                                                                                                                                                                                                                                                                                       |
| [storageTargetsCreateOrUpdateSample.ts][storagetargetscreateorupdatesample] | Create or update a Storage Target. This operation is allowed at any time, but if the Cache is down or unhealthy, the actual creation/modification of the Storage Target may be delayed until the Cache is healthy again. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_CreateOrUpdate.json                                                                                                                   |
| [storageTargetsDeleteSample.ts][storagetargetsdeletesample]                 | Removes a Storage Target from a Cache. This operation is allowed at any time, but if the Cache is down or unhealthy, the actual removal of the Storage Target may be delayed until the Cache is healthy again. Note that if the Cache has data to flush to the Storage Target, the data will be flushed before the Storage Target will be deleted. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_Delete.json |
| [storageTargetsDnsRefreshSample.ts][storagetargetsdnsrefreshsample]         | Tells a storage target to refresh its DNS information. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_DnsRefresh.json                                                                                                                                                                                                                                                                                         |
| [storageTargetsGetSample.ts][storagetargetsgetsample]                       | Returns a Storage Target from a Cache. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_Get.json                                                                                                                                                                                                                                                                                                                |
| [storageTargetsListByCacheSample.ts][storagetargetslistbycachesample]       | Returns a list of Storage Targets for the specified Cache. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_ListByCache.json                                                                                                                                                                                                                                                                                    |
| [usageModelsListSample.ts][usagemodelslistsample]                           | Get the list of Cache Usage Models available to this subscription. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/UsageModels_List.json                                                                                                                                                                                                                                                                                      |

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
node dist/ascOperationsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/ascOperationsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[ascoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/ascOperationsGetSample.ts
[cachescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesCreateOrUpdateSample.ts
[cachesdebuginfosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesDebugInfoSample.ts
[cachesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesDeleteSample.ts
[cachesflushsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesFlushSample.ts
[cachesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesGetSample.ts
[cacheslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesListByResourceGroupSample.ts
[cacheslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesListSample.ts
[cachesstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesStartSample.ts
[cachesstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesStopSample.ts
[cachesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesUpdateSample.ts
[cachesupgradefirmwaresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/cachesUpgradeFirmwareSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/operationsListSample.ts
[skuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/skusListSample.ts
[storagetargetflushsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/storageTargetFlushSample.ts
[storagetargetresumesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/storageTargetResumeSample.ts
[storagetargetsuspendsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/storageTargetSuspendSample.ts
[storagetargetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/storageTargetsCreateOrUpdateSample.ts
[storagetargetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/storageTargetsDeleteSample.ts
[storagetargetsdnsrefreshsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/storageTargetsDnsRefreshSample.ts
[storagetargetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/storageTargetsGetSample.ts
[storagetargetslistbycachesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/storageTargetsListByCacheSample.ts
[usagemodelslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v6/typescript/src/usageModelsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-storagecache?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storagecache/arm-storagecache/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

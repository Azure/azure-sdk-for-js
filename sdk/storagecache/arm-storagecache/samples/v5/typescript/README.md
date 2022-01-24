# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ascOperationsGet.ts][ascoperationsget]                                               | Gets the status of an asynchronous operation for the Azure HPC Cache x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/AscOperations_Get.json                                                                                                                                                                                                                                                                                   |
| [cachesCreateOrUpdate.ts][cachescreateorupdate]                                       | Create or update a Cache. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_CreateOrUpdate.json                                                                                                                                                                                                                                                                                                                          |
| [cachesCreateOrUpdateLdapOnly.ts][cachescreateorupdateldaponly]                       | Create or update a Cache. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_CreateOrUpdate_ldap_only.json                                                                                                                                                                                                                                                                                                                |
| [cachesDebugInfo.ts][cachesdebuginfo]                                                 | Tells a Cache to write generate debug info for support to process. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_DebugInfo.json                                                                                                                                                                                                                                                                                      |
| [cachesDelete.ts][cachesdelete]                                                       | Schedules a Cache for deletion. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Delete.json                                                                                                                                                                                                                                                                                                                            |
| [cachesDnsRefresh.ts][cachesdnsrefresh]                                               | Tells a storage target to refresh its DNS information. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_DnsRefresh.json                                                                                                                                                                                                                                                                                         |
| [cachesFlush.ts][cachesflush]                                                         | Tells a Cache to write all dirty data to the Storage Target(s). During the flush, clients will see errors returned until the flush is complete. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Flush.json                                                                                                                                                                                                             |
| [cachesGet.ts][cachesget]                                                             | Returns a Cache. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Get.json                                                                                                                                                                                                                                                                                                                                              |
| [cachesList.ts][cacheslist]                                                           | Returns all Caches the user has access to under a subscription. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_List.json                                                                                                                                                                                                                                                                                              |
| [cachesListByResourceGroup.ts][cacheslistbyresourcegroup]                             | Returns all Caches the user has access to under a resource group. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_ListByResourceGroup.json                                                                                                                                                                                                                                                                             |
| [cachesStart.ts][cachesstart]                                                         | Tells a Stopped state Cache to transition to Active state. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Start.json                                                                                                                                                                                                                                                                                                  |
| [cachesStop.ts][cachesstop]                                                           | Tells an Active Cache to transition to Stopped state. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Stop.json                                                                                                                                                                                                                                                                                                        |
| [cachesUpdate.ts][cachesupdate]                                                       | Update a Cache instance. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Update.json                                                                                                                                                                                                                                                                                                                                   |
| [cachesUpdateLdapOnly.ts][cachesupdateldaponly]                                       | Update a Cache instance. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_Update_ldap_only.json                                                                                                                                                                                                                                                                                                                         |
| [cachesUpgradeFirmware.ts][cachesupgradefirmware]                                     | Upgrade a Cache's firmware if a new version is available. Otherwise, this operation has no effect. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Caches_UpgradeFirmware.json                                                                                                                                                                                                                                                |
| [skusList.ts][skuslist]                                                               | Get the list of StorageCache.Cache SKUs available to this subscription. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/Skus_List.json                                                                                                                                                                                                                                                                                        |
| [storageTargetsCreateOrUpdate.ts][storagetargetscreateorupdate]                       | Create or update a Storage Target. This operation is allowed at any time, but if the Cache is down or unhealthy, the actual creation/modification of the Storage Target may be delayed until the Cache is healthy again. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_CreateOrUpdate.json                                                                                                                   |
| [storageTargetsCreateOrUpdateBlobNfs.ts][storagetargetscreateorupdateblobnfs]         | Create or update a Storage Target. This operation is allowed at any time, but if the Cache is down or unhealthy, the actual creation/modification of the Storage Target may be delayed until the Cache is healthy again. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_CreateOrUpdate_BlobNfs.json                                                                                                           |
| [storageTargetsCreateOrUpdateNoJunctions.ts][storagetargetscreateorupdatenojunctions] | Create or update a Storage Target. This operation is allowed at any time, but if the Cache is down or unhealthy, the actual creation/modification of the Storage Target may be delayed until the Cache is healthy again. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_CreateOrUpdate_NoJunctions.json                                                                                                       |
| [storageTargetsDelete.ts][storagetargetsdelete]                                       | Removes a Storage Target from a Cache. This operation is allowed at any time, but if the Cache is down or unhealthy, the actual removal of the Storage Target may be delayed until the Cache is healthy again. Note that if the Cache has data to flush to the Storage Target, the data will be flushed before the Storage Target will be deleted. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_Delete.json |
| [storageTargetsFlush.ts][storagetargetsflush]                                         | Tells the cache to write all dirty data to the Storage Target's backend storage. Client requests to this storage target's namespace will return errors until the flush operation completes. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_Flush.json                                                                                                                                                         |
| [storageTargetsGet.ts][storagetargetsget]                                             | Returns a Storage Target from a Cache. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_Get.json                                                                                                                                                                                                                                                                                                                |
| [storageTargetsList.ts][storagetargetslist]                                           | Returns a list of Storage Targets for the specified Cache. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_ListByCache.json                                                                                                                                                                                                                                                                                    |
| [storageTargetsResume.ts][storagetargetsresume]                                       | Resumes client access to a previously suspended storage target. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_Resume.json                                                                                                                                                                                                                                                                                    |
| [storageTargetsSuspend.ts][storagetargetssuspend]                                     | Suspends client access to a storage target. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/StorageTargets_Suspend.json                                                                                                                                                                                                                                                                                                       |
| [usageModelsList.ts][usagemodelslist]                                                 | Get the list of Cache Usage Models available to this subscription. x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2021-09-01/examples/UsageModels_List.json                                                                                                                                                                                                                                                                                      |

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
node dist/ascOperationsGet.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/ascOperationsGet.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[ascoperationsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/ascOperationsGet.ts
[cachescreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesCreateOrUpdate.ts
[cachescreateorupdateldaponly]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesCreateOrUpdateLdapOnly.ts
[cachesdebuginfo]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesDebugInfo.ts
[cachesdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesDelete.ts
[cachesdnsrefresh]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesDnsRefresh.ts
[cachesflush]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesFlush.ts
[cachesget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesGet.ts
[cacheslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesList.ts
[cacheslistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesListByResourceGroup.ts
[cachesstart]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesStart.ts
[cachesstop]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesStop.ts
[cachesupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesUpdate.ts
[cachesupdateldaponly]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesUpdateLdapOnly.ts
[cachesupgradefirmware]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/cachesUpgradeFirmware.ts
[skuslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/skusList.ts
[storagetargetscreateorupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/storageTargetsCreateOrUpdate.ts
[storagetargetscreateorupdateblobnfs]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/storageTargetsCreateOrUpdateBlobNfs.ts
[storagetargetscreateorupdatenojunctions]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/storageTargetsCreateOrUpdateNoJunctions.ts
[storagetargetsdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/storageTargetsDelete.ts
[storagetargetsflush]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/storageTargetsFlush.ts
[storagetargetsget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/storageTargetsGet.ts
[storagetargetslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/storageTargetsList.ts
[storagetargetsresume]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/storageTargetsResume.ts
[storagetargetssuspend]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/storageTargetsSuspend.ts
[usagemodelslist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storagecache/arm-storagecache/samples/v5/typescript/src/usageModelsList.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-storagecache?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storagecache/arm-storagecache/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

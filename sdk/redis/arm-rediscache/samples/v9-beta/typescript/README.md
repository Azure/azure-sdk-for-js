# @azure/arm-rediscache client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-rediscache in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessPolicyAssignmentCreateUpdateSample.ts][accesspolicyassignmentcreateupdatesample]     | adds the access policy assignment to the specified users x-ms-original-file: 2025-08-01-preview/RedisCacheAccessPolicyAssignmentCreateUpdate.json                                                   |
| [accessPolicyAssignmentDeleteSample.ts][accesspolicyassignmentdeletesample]                 | deletes the access policy assignment from a redis cache x-ms-original-file: 2025-08-01-preview/RedisCacheAccessPolicyAssignmentDelete.json                                                          |
| [accessPolicyAssignmentGetSample.ts][accesspolicyassignmentgetsample]                       | gets the list of assignments for an access policy of a redis cache x-ms-original-file: 2025-08-01-preview/RedisCacheAccessPolicyAssignmentGet.json                                                  |
| [accessPolicyAssignmentListSample.ts][accesspolicyassignmentlistsample]                     | gets the list of access policy assignments associated with this redis cache x-ms-original-file: 2025-08-01-preview/RedisCacheAccessPolicyAssignmentList.json                                        |
| [accessPolicyCreateUpdateSample.ts][accesspolicycreateupdatesample]                         | adds an access policy to the redis cache x-ms-original-file: 2025-08-01-preview/RedisCacheAccessPolicyCreateUpdate.json                                                                             |
| [accessPolicyDeleteSample.ts][accesspolicydeletesample]                                     | deletes the access policy from a redis cache x-ms-original-file: 2025-08-01-preview/RedisCacheAccessPolicyDelete.json                                                                               |
| [accessPolicyGetSample.ts][accesspolicygetsample]                                           | gets the detailed information about an access policy of a redis cache x-ms-original-file: 2025-08-01-preview/RedisCacheAccessPolicyGet.json                                                         |
| [accessPolicyListSample.ts][accesspolicylistsample]                                         | gets the list of access policies associated with this redis cache x-ms-original-file: 2025-08-01-preview/RedisCacheAccessPolicyList.json                                                            |
| [asyncOperationStatusGetSample.ts][asyncoperationstatusgetsample]                           | for checking the ongoing status of an operation x-ms-original-file: 2025-08-01-preview/RedisCacheAsyncOperationStatus.json                                                                          |
| [firewallRulesCreateOrUpdateSample.ts][firewallrulescreateorupdatesample]                   | create or update a redis cache firewall rule x-ms-original-file: 2025-08-01-preview/RedisCacheFirewallRuleCreate.json                                                                               |
| [firewallRulesDeleteSample.ts][firewallrulesdeletesample]                                   | deletes a single firewall rule in a specified redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheFirewallRuleDelete.json                                                                 |
| [firewallRulesGetSample.ts][firewallrulesgetsample]                                         | gets a single firewall rule in a specified redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheFirewallRuleGet.json                                                                       |
| [firewallRulesListSample.ts][firewallruleslistsample]                                       | gets all firewall rules in the specified redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheFirewallRulesList.json                                                                       |
| [linkedServerCreateSample.ts][linkedservercreatesample]                                     | adds a linked server to the Redis cache (requires Premium SKU). x-ms-original-file: 2025-08-01-preview/RedisCacheLinkedServer_Create.json                                                           |
| [linkedServerDeleteSample.ts][linkedserverdeletesample]                                     | deletes the linked server from a redis cache (requires Premium SKU). x-ms-original-file: 2025-08-01-preview/RedisCacheLinkedServer_Delete.json                                                      |
| [linkedServerGetSample.ts][linkedservergetsample]                                           | gets the detailed information about a linked server of a redis cache (requires Premium SKU). x-ms-original-file: 2025-08-01-preview/RedisCacheLinkedServer_Get.json                                 |
| [linkedServerListSample.ts][linkedserverlistsample]                                         | gets the list of linked servers associated with this redis cache (requires Premium SKU). x-ms-original-file: 2025-08-01-preview/RedisCacheLinkedServer_List.json                                    |
| [operationsListSample.ts][operationslistsample]                                             | list the operations for the provider x-ms-original-file: 2025-08-01-preview/RedisCacheOperations.json                                                                                               |
| [patchSchedulesCreateOrUpdateSample.ts][patchschedulescreateorupdatesample]                 | create or replace the patching schedule for Redis cache. x-ms-original-file: 2025-08-01-preview/RedisCachePatchSchedulesCreateOrUpdate.json                                                         |
| [patchSchedulesDeleteSample.ts][patchschedulesdeletesample]                                 | deletes the patching schedule of a redis cache. x-ms-original-file: 2025-08-01-preview/RedisCachePatchSchedulesDelete.json                                                                          |
| [patchSchedulesGetSample.ts][patchschedulesgetsample]                                       | gets the patching schedule of a redis cache. x-ms-original-file: 2025-08-01-preview/RedisCachePatchSchedulesGet.json                                                                                |
| [patchSchedulesListByRedisResourceSample.ts][patchscheduleslistbyredisresourcesample]       | gets all patch schedules in the specified redis cache (there is only one). x-ms-original-file: 2025-08-01-preview/RedisCachePatchSchedulesList.json                                                 |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]         | deletes the specified private endpoint connection associated with the redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheDeletePrivateEndpointConnection.json                            |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]               | gets the specified private endpoint connection associated with the redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheGetPrivateEndpointConnection.json                                  |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]             | list all the private endpoint connections associated with the redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheListPrivateEndpointConnections.json                                     |
| [privateEndpointConnectionsPutSample.ts][privateendpointconnectionsputsample]               | update the state of specified private endpoint connection associated with the redis cache. x-ms-original-file: 2025-08-01-preview/RedisCachePutPrivateEndpointConnection.json                       |
| [privateLinkResourcesListByRedisCacheSample.ts][privatelinkresourceslistbyrediscachesample] | gets the private link resources that need to be created for a redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheListPrivateLinkResources.json                                           |
| [redisCheckNameAvailabilitySample.ts][redischecknameavailabilitysample]                     | checks that the redis cache name is valid and is not already in use. x-ms-original-file: 2025-08-01-preview/RedisCacheCheckNameAvailability.json                                                    |
| [redisCreateSample.ts][rediscreatesample]                                                   | create or replace (overwrite/recreate, with potential downtime) an existing Redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheCreate.json                                               |
| [redisDeleteSample.ts][redisdeletesample]                                                   | deletes a Redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheDelete.json                                                                                                                 |
| [redisExportDataSample.ts][redisexportdatasample]                                           | export data from the redis cache to blobs in a container. x-ms-original-file: 2025-08-01-preview/RedisCacheExport.json                                                                              |
| [redisFlushCacheSample.ts][redisflushcachesample]                                           | deletes all of the keys in a cache. x-ms-original-file: 2025-08-01-preview/RedisCacheFlush.json                                                                                                     |
| [redisForceRebootSample.ts][redisforcerebootsample]                                         | reboot specified Redis node(s). This operation requires write permission to the cache resource. There can be potential data loss. x-ms-original-file: 2025-08-01-preview/RedisCacheForceReboot.json |
| [redisGetSample.ts][redisgetsample]                                                         | gets a Redis cache (resource description). x-ms-original-file: 2025-08-01-preview/RedisCacheGet.json                                                                                                |
| [redisImportDataSample.ts][redisimportdatasample]                                           | import data into Redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheImport.json                                                                                                          |
| [redisListByResourceGroupSample.ts][redislistbyresourcegroupsample]                         | lists all Redis caches in a resource group. x-ms-original-file: 2025-08-01-preview/RedisCacheListByResourceGroup.json                                                                               |
| [redisListBySubscriptionSample.ts][redislistbysubscriptionsample]                           | gets all Redis caches in the specified subscription. x-ms-original-file: 2025-08-01-preview/RedisCacheList.json                                                                                     |
| [redisListKeysSample.ts][redislistkeyssample]                                               | retrieve a Redis cache's access keys. This operation requires write permission to the cache resource. x-ms-original-file: 2025-08-01-preview/RedisCacheListKeys.json                                |
| [redisListUpgradeNotificationsSample.ts][redislistupgradenotificationssample]               | [Deprecated] Gets any upgrade notifications for a Redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheListUpgradeNotifications.json                                                       |
| [redisRegenerateKeySample.ts][redisregeneratekeysample]                                     | regenerate Redis cache's access keys. This operation requires write permission to the cache resource. x-ms-original-file: 2025-08-01-preview/RedisCacheRegenerateKey.json                           |
| [redisUpdateSample.ts][redisupdatesample]                                                   | update an existing Redis cache. x-ms-original-file: 2025-08-01-preview/RedisCacheUpdate.json                                                                                                        |

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
node dist/accessPolicyAssignmentCreateUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/accessPolicyAssignmentCreateUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accesspolicyassignmentcreateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/accessPolicyAssignmentCreateUpdateSample.ts
[accesspolicyassignmentdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/accessPolicyAssignmentDeleteSample.ts
[accesspolicyassignmentgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/accessPolicyAssignmentGetSample.ts
[accesspolicyassignmentlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/accessPolicyAssignmentListSample.ts
[accesspolicycreateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/accessPolicyCreateUpdateSample.ts
[accesspolicydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/accessPolicyDeleteSample.ts
[accesspolicygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/accessPolicyGetSample.ts
[accesspolicylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/accessPolicyListSample.ts
[asyncoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/asyncOperationStatusGetSample.ts
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/firewallRulesCreateOrUpdateSample.ts
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/firewallRulesDeleteSample.ts
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/firewallRulesGetSample.ts
[firewallruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/firewallRulesListSample.ts
[linkedservercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/linkedServerCreateSample.ts
[linkedserverdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/linkedServerDeleteSample.ts
[linkedservergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/linkedServerGetSample.ts
[linkedserverlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/linkedServerListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/operationsListSample.ts
[patchschedulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/patchSchedulesCreateOrUpdateSample.ts
[patchschedulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/patchSchedulesDeleteSample.ts
[patchschedulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/patchSchedulesGetSample.ts
[patchscheduleslistbyredisresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/patchSchedulesListByRedisResourceSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/privateEndpointConnectionsPutSample.ts
[privatelinkresourceslistbyrediscachesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/privateLinkResourcesListByRedisCacheSample.ts
[redischecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisCheckNameAvailabilitySample.ts
[rediscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisCreateSample.ts
[redisdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisDeleteSample.ts
[redisexportdatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisExportDataSample.ts
[redisflushcachesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisFlushCacheSample.ts
[redisforcerebootsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisForceRebootSample.ts
[redisgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisGetSample.ts
[redisimportdatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisImportDataSample.ts
[redislistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisListByResourceGroupSample.ts
[redislistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisListBySubscriptionSample.ts
[redislistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisListKeysSample.ts
[redislistupgradenotificationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisListUpgradeNotificationsSample.ts
[redisregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisRegenerateKeySample.ts
[redisupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9-beta/typescript/src/redisUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-rediscache?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redis/arm-rediscache/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

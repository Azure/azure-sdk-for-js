# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessPolicyAssignmentCreateUpdateSample.ts][accesspolicyassignmentcreateupdatesample]     | Adds the access policy assignment to the specified users x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheAccessPolicyAssignmentCreateUpdate.json                                                   |
| [accessPolicyAssignmentDeleteSample.ts][accesspolicyassignmentdeletesample]                 | Deletes the access policy assignment from a redis cache x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheAccessPolicyAssignmentDelete.json                                                          |
| [accessPolicyAssignmentGetSample.ts][accesspolicyassignmentgetsample]                       | Gets the list of assignments for an access policy of a redis cache x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheAccessPolicyAssignmentGet.json                                                  |
| [accessPolicyAssignmentListSample.ts][accesspolicyassignmentlistsample]                     | Gets the list of access policy assignments associated with this redis cache x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheAccessPolicyAssignmentList.json                                        |
| [accessPolicyCreateUpdateSample.ts][accesspolicycreateupdatesample]                         | Adds an access policy to the redis cache x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheAccessPolicyCreateUpdate.json                                                                             |
| [accessPolicyDeleteSample.ts][accesspolicydeletesample]                                     | Deletes the access policy from a redis cache x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheAccessPolicyDelete.json                                                                               |
| [accessPolicyGetSample.ts][accesspolicygetsample]                                           | Gets the detailed information about an access policy of a redis cache x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheAccessPolicyGet.json                                                         |
| [accessPolicyListSample.ts][accesspolicylistsample]                                         | Gets the list of access policies associated with this redis cache x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheAccessPolicyList.json                                                            |
| [asyncOperationStatusGetSample.ts][asyncoperationstatusgetsample]                           | For checking the ongoing status of an operation x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheAsyncOperationStatus.json                                                                          |
| [firewallRulesCreateOrUpdateSample.ts][firewallrulescreateorupdatesample]                   | Create or update a redis cache firewall rule x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheFirewallRuleCreate.json                                                                               |
| [firewallRulesDeleteSample.ts][firewallrulesdeletesample]                                   | Deletes a single firewall rule in a specified redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheFirewallRuleDelete.json                                                                 |
| [firewallRulesGetSample.ts][firewallrulesgetsample]                                         | Gets a single firewall rule in a specified redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheFirewallRuleGet.json                                                                       |
| [firewallRulesListSample.ts][firewallruleslistsample]                                       | Gets all firewall rules in the specified redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheFirewallRulesList.json                                                                       |
| [linkedServerCreateSample.ts][linkedservercreatesample]                                     | Adds a linked server to the Redis cache (requires Premium SKU). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheLinkedServer_Create.json                                                           |
| [linkedServerDeleteSample.ts][linkedserverdeletesample]                                     | Deletes the linked server from a redis cache (requires Premium SKU). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheLinkedServer_Delete.json                                                      |
| [linkedServerGetSample.ts][linkedservergetsample]                                           | Gets the detailed information about a linked server of a redis cache (requires Premium SKU). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheLinkedServer_Get.json                                 |
| [linkedServerListSample.ts][linkedserverlistsample]                                         | Gets the list of linked servers associated with this redis cache (requires Premium SKU). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheLinkedServer_List.json                                    |
| [operationsListSample.ts][operationslistsample]                                             | Lists all of the available REST API operations of the Microsoft.Cache provider. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheOperations.json                                                    |
| [patchSchedulesCreateOrUpdateSample.ts][patchschedulescreateorupdatesample]                 | Create or replace the patching schedule for Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCachePatchSchedulesCreateOrUpdate.json                                                         |
| [patchSchedulesDeleteSample.ts][patchschedulesdeletesample]                                 | Deletes the patching schedule of a redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCachePatchSchedulesDelete.json                                                                          |
| [patchSchedulesGetSample.ts][patchschedulesgetsample]                                       | Gets the patching schedule of a redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCachePatchSchedulesGet.json                                                                                |
| [patchSchedulesListByRedisResourceSample.ts][patchscheduleslistbyredisresourcesample]       | Gets all patch schedules in the specified redis cache (there is only one). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCachePatchSchedulesList.json                                                 |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]         | Deletes the specified private endpoint connection associated with the redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheDeletePrivateEndpointConnection.json                            |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]               | Gets the specified private endpoint connection associated with the redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheGetPrivateEndpointConnection.json                                  |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]             | List all the private endpoint connections associated with the redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheListPrivateEndpointConnections.json                                     |
| [privateEndpointConnectionsPutSample.ts][privateendpointconnectionsputsample]               | Update the state of specified private endpoint connection associated with the redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCachePutPrivateEndpointConnection.json                       |
| [privateLinkResourcesListByRedisCacheSample.ts][privatelinkresourceslistbyrediscachesample] | Gets the private link resources that need to be created for a redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheListPrivateLinkResources.json                                           |
| [redisCheckNameAvailabilitySample.ts][redischecknameavailabilitysample]                     | Checks that the redis cache name is valid and is not already in use. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheCheckNameAvailability.json                                                    |
| [redisCreateSample.ts][rediscreatesample]                                                   | Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheCreate.json                                               |
| [redisDeleteSample.ts][redisdeletesample]                                                   | Deletes a Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheDelete.json                                                                                                                 |
| [redisExportDataSample.ts][redisexportdatasample]                                           | Export data from the redis cache to blobs in a container. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheExport.json                                                                              |
| [redisFlushCacheSample.ts][redisflushcachesample]                                           | Deletes all of the keys in a cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheFlush.json                                                                                                     |
| [redisForceRebootSample.ts][redisforcerebootsample]                                         | Reboot specified Redis node(s). This operation requires write permission to the cache resource. There can be potential data loss. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheForceReboot.json |
| [redisGetSample.ts][redisgetsample]                                                         | Gets a Redis cache (resource description). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheGet.json                                                                                                |
| [redisImportDataSample.ts][redisimportdatasample]                                           | Import data into Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheImport.json                                                                                                          |
| [redisListByResourceGroupSample.ts][redislistbyresourcegroupsample]                         | Lists all Redis caches in a resource group. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheListByResourceGroup.json                                                                               |
| [redisListBySubscriptionSample.ts][redislistbysubscriptionsample]                           | Gets all Redis caches in the specified subscription. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheList.json                                                                                     |
| [redisListKeysSample.ts][redislistkeyssample]                                               | Retrieve a Redis cache's access keys. This operation requires write permission to the cache resource. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheListKeys.json                                |
| [redisListUpgradeNotificationsSample.ts][redislistupgradenotificationssample]               | Gets any upgrade notifications for a Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheListUpgradeNotifications.json                                                                    |
| [redisRegenerateKeySample.ts][redisregeneratekeysample]                                     | Regenerate Redis cache's access keys. This operation requires write permission to the cache resource. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheRegenerateKey.json                           |
| [redisUpdateSample.ts][redisupdatesample]                                                   | Update an existing Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2024-11-01/examples/RedisCacheUpdate.json                                                                                                        |

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env REDIS_SUBSCRIPTION_ID="<redis subscription id>" REDIS_RESOURCE_GROUP="<redis resource group>" node dist/accessPolicyAssignmentCreateUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accesspolicyassignmentcreateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/accessPolicyAssignmentCreateUpdateSample.ts
[accesspolicyassignmentdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/accessPolicyAssignmentDeleteSample.ts
[accesspolicyassignmentgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/accessPolicyAssignmentGetSample.ts
[accesspolicyassignmentlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/accessPolicyAssignmentListSample.ts
[accesspolicycreateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/accessPolicyCreateUpdateSample.ts
[accesspolicydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/accessPolicyDeleteSample.ts
[accesspolicygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/accessPolicyGetSample.ts
[accesspolicylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/accessPolicyListSample.ts
[asyncoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/asyncOperationStatusGetSample.ts
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/firewallRulesCreateOrUpdateSample.ts
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/firewallRulesDeleteSample.ts
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/firewallRulesGetSample.ts
[firewallruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/firewallRulesListSample.ts
[linkedservercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/linkedServerCreateSample.ts
[linkedserverdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/linkedServerDeleteSample.ts
[linkedservergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/linkedServerGetSample.ts
[linkedserverlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/linkedServerListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/operationsListSample.ts
[patchschedulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/patchSchedulesCreateOrUpdateSample.ts
[patchschedulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/patchSchedulesDeleteSample.ts
[patchschedulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/patchSchedulesGetSample.ts
[patchscheduleslistbyredisresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/patchSchedulesListByRedisResourceSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/privateEndpointConnectionsListSample.ts
[privateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/privateEndpointConnectionsPutSample.ts
[privatelinkresourceslistbyrediscachesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/privateLinkResourcesListByRedisCacheSample.ts
[redischecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisCheckNameAvailabilitySample.ts
[rediscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisCreateSample.ts
[redisdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisDeleteSample.ts
[redisexportdatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisExportDataSample.ts
[redisflushcachesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisFlushCacheSample.ts
[redisforcerebootsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisForceRebootSample.ts
[redisgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisGetSample.ts
[redisimportdatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisImportDataSample.ts
[redislistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisListByResourceGroupSample.ts
[redislistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisListBySubscriptionSample.ts
[redislistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisListKeysSample.ts
[redislistupgradenotificationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisListUpgradeNotificationsSample.ts
[redisregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisRegenerateKeySample.ts
[redisupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v8/typescript/src/redisUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-rediscache?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redis/arm-rediscache/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

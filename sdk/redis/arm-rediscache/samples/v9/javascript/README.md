# @azure/arm-rediscache client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-rediscache in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessPolicyAssignmentCreateUpdateSample.js][accesspolicyassignmentcreateupdatesample]     | adds the access policy assignment to the specified users x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyAssignmentCreateUpdate.json                                                   |
| [accessPolicyAssignmentDeleteSample.js][accesspolicyassignmentdeletesample]                 | deletes the access policy assignment from a redis cache x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyAssignmentDelete.json                                                          |
| [accessPolicyAssignmentGetSample.js][accesspolicyassignmentgetsample]                       | gets the list of assignments for an access policy of a redis cache x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyAssignmentGet.json                                                  |
| [accessPolicyAssignmentListSample.js][accesspolicyassignmentlistsample]                     | gets the list of access policy assignments associated with this redis cache x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyAssignmentList.json                                        |
| [accessPolicyCreateUpdateSample.js][accesspolicycreateupdatesample]                         | adds an access policy to the redis cache x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyCreateUpdate.json                                                                             |
| [accessPolicyDeleteSample.js][accesspolicydeletesample]                                     | deletes the access policy from a redis cache x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyDelete.json                                                                               |
| [accessPolicyGetSample.js][accesspolicygetsample]                                           | gets the detailed information about an access policy of a redis cache x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyGet.json                                                         |
| [accessPolicyListSample.js][accesspolicylistsample]                                         | gets the list of access policies associated with this redis cache x-ms-original-file: 2024-11-01/RedisCacheAccessPolicyList.json                                                            |
| [asyncOperationStatusGetSample.js][asyncoperationstatusgetsample]                           | for checking the ongoing status of an operation x-ms-original-file: 2024-11-01/RedisCacheAsyncOperationStatus.json                                                                          |
| [firewallRulesCreateOrUpdateSample.js][firewallrulescreateorupdatesample]                   | create or update a redis cache firewall rule x-ms-original-file: 2024-11-01/RedisCacheFirewallRuleCreate.json                                                                               |
| [firewallRulesDeleteSample.js][firewallrulesdeletesample]                                   | deletes a single firewall rule in a specified redis cache. x-ms-original-file: 2024-11-01/RedisCacheFirewallRuleDelete.json                                                                 |
| [firewallRulesGetSample.js][firewallrulesgetsample]                                         | gets a single firewall rule in a specified redis cache. x-ms-original-file: 2024-11-01/RedisCacheFirewallRuleGet.json                                                                       |
| [firewallRulesListSample.js][firewallruleslistsample]                                       | gets all firewall rules in the specified redis cache. x-ms-original-file: 2024-11-01/RedisCacheFirewallRulesList.json                                                                       |
| [linkedServerCreateSample.js][linkedservercreatesample]                                     | adds a linked server to the Redis cache (requires Premium SKU). x-ms-original-file: 2024-11-01/RedisCacheLinkedServer_Create.json                                                           |
| [linkedServerDeleteSample.js][linkedserverdeletesample]                                     | deletes the linked server from a redis cache (requires Premium SKU). x-ms-original-file: 2024-11-01/RedisCacheLinkedServer_Delete.json                                                      |
| [linkedServerGetSample.js][linkedservergetsample]                                           | gets the detailed information about a linked server of a redis cache (requires Premium SKU). x-ms-original-file: 2024-11-01/RedisCacheLinkedServer_Get.json                                 |
| [linkedServerListSample.js][linkedserverlistsample]                                         | gets the list of linked servers associated with this redis cache (requires Premium SKU). x-ms-original-file: 2024-11-01/RedisCacheLinkedServer_List.json                                    |
| [patchSchedulesCreateOrUpdateSample.js][patchschedulescreateorupdatesample]                 | create or replace the patching schedule for Redis cache. x-ms-original-file: 2024-11-01/RedisCachePatchSchedulesCreateOrUpdate.json                                                         |
| [patchSchedulesDeleteSample.js][patchschedulesdeletesample]                                 | deletes the patching schedule of a redis cache. x-ms-original-file: 2024-11-01/RedisCachePatchSchedulesDelete.json                                                                          |
| [patchSchedulesGetSample.js][patchschedulesgetsample]                                       | gets the patching schedule of a redis cache. x-ms-original-file: 2024-11-01/RedisCachePatchSchedulesGet.json                                                                                |
| [patchSchedulesListByRedisResourceSample.js][patchscheduleslistbyredisresourcesample]       | gets all patch schedules in the specified redis cache (there is only one). x-ms-original-file: 2024-11-01/RedisCachePatchSchedulesList.json                                                 |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]         | deletes the specified private endpoint connection associated with the redis cache. x-ms-original-file: 2024-11-01/RedisCacheDeletePrivateEndpointConnection.json                            |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]               | gets the specified private endpoint connection associated with the redis cache. x-ms-original-file: 2024-11-01/RedisCacheGetPrivateEndpointConnection.json                                  |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]             | list all the private endpoint connections associated with the redis cache. x-ms-original-file: 2024-11-01/RedisCacheListPrivateEndpointConnections.json                                     |
| [privateEndpointConnectionsPutSample.js][privateendpointconnectionsputsample]               | update the state of specified private endpoint connection associated with the redis cache. x-ms-original-file: 2024-11-01/RedisCachePutPrivateEndpointConnection.json                       |
| [privateLinkResourcesListByRedisCacheSample.js][privatelinkresourceslistbyrediscachesample] | gets the private link resources that need to be created for a redis cache. x-ms-original-file: 2024-11-01/RedisCacheListPrivateLinkResources.json                                           |
| [redisCheckNameAvailabilitySample.js][redischecknameavailabilitysample]                     | checks that the redis cache name is valid and is not already in use. x-ms-original-file: 2024-11-01/RedisCacheCheckNameAvailability.json                                                    |
| [redisCreateSample.js][rediscreatesample]                                                   | create or replace (overwrite/recreate, with potential downtime) an existing Redis cache. x-ms-original-file: 2024-11-01/RedisCacheCreate.json                                               |
| [redisDeleteSample.js][redisdeletesample]                                                   | deletes a Redis cache. x-ms-original-file: 2024-11-01/RedisCacheDelete.json                                                                                                                 |
| [redisExportDataSample.js][redisexportdatasample]                                           | export data from the redis cache to blobs in a container. x-ms-original-file: 2024-11-01/RedisCacheExport.json                                                                              |
| [redisFlushCacheSample.js][redisflushcachesample]                                           | deletes all of the keys in a cache. x-ms-original-file: 2024-11-01/RedisCacheFlush.json                                                                                                     |
| [redisForceRebootSample.js][redisforcerebootsample]                                         | reboot specified Redis node(s). This operation requires write permission to the cache resource. There can be potential data loss. x-ms-original-file: 2024-11-01/RedisCacheForceReboot.json |
| [redisGetSample.js][redisgetsample]                                                         | gets a Redis cache (resource description). x-ms-original-file: 2024-11-01/RedisCacheGet.json                                                                                                |
| [redisImportDataSample.js][redisimportdatasample]                                           | import data into Redis cache. x-ms-original-file: 2024-11-01/RedisCacheImport.json                                                                                                          |
| [redisListByResourceGroupSample.js][redislistbyresourcegroupsample]                         | lists all Redis caches in a resource group. x-ms-original-file: 2024-11-01/RedisCacheListByResourceGroup.json                                                                               |
| [redisListBySubscriptionSample.js][redislistbysubscriptionsample]                           | gets all Redis caches in the specified subscription. x-ms-original-file: 2024-11-01/RedisCacheList.json                                                                                     |
| [redisListKeysSample.js][redislistkeyssample]                                               | retrieve a Redis cache's access keys. This operation requires write permission to the cache resource. x-ms-original-file: 2024-11-01/RedisCacheListKeys.json                                |
| [redisListUpgradeNotificationsSample.js][redislistupgradenotificationssample]               | [Deprecated] Gets any upgrade notifications for a Redis cache. x-ms-original-file: 2024-11-01/RedisCacheListUpgradeNotifications.json                                                       |
| [redisRegenerateKeySample.js][redisregeneratekeysample]                                     | regenerate Redis cache's access keys. This operation requires write permission to the cache resource. x-ms-original-file: 2024-11-01/RedisCacheRegenerateKey.json                           |
| [redisUpdateSample.js][redisupdatesample]                                                   | update an existing Redis cache. x-ms-original-file: 2024-11-01/RedisCacheUpdate.json                                                                                                        |

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
node accessPolicyAssignmentCreateUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node accessPolicyAssignmentCreateUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accesspolicyassignmentcreateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/accessPolicyAssignmentCreateUpdateSample.js
[accesspolicyassignmentdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/accessPolicyAssignmentDeleteSample.js
[accesspolicyassignmentgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/accessPolicyAssignmentGetSample.js
[accesspolicyassignmentlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/accessPolicyAssignmentListSample.js
[accesspolicycreateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/accessPolicyCreateUpdateSample.js
[accesspolicydeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/accessPolicyDeleteSample.js
[accesspolicygetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/accessPolicyGetSample.js
[accesspolicylistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/accessPolicyListSample.js
[asyncoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/asyncOperationStatusGetSample.js
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/firewallRulesCreateOrUpdateSample.js
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/firewallRulesDeleteSample.js
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/firewallRulesGetSample.js
[firewallruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/firewallRulesListSample.js
[linkedservercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/linkedServerCreateSample.js
[linkedserverdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/linkedServerDeleteSample.js
[linkedservergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/linkedServerGetSample.js
[linkedserverlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/linkedServerListSample.js
[patchschedulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/patchSchedulesCreateOrUpdateSample.js
[patchschedulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/patchSchedulesDeleteSample.js
[patchschedulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/patchSchedulesGetSample.js
[patchscheduleslistbyredisresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/patchSchedulesListByRedisResourceSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/privateEndpointConnectionsListSample.js
[privateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/privateEndpointConnectionsPutSample.js
[privatelinkresourceslistbyrediscachesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/privateLinkResourcesListByRedisCacheSample.js
[redischecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisCheckNameAvailabilitySample.js
[rediscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisCreateSample.js
[redisdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisDeleteSample.js
[redisexportdatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisExportDataSample.js
[redisflushcachesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisFlushCacheSample.js
[redisforcerebootsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisForceRebootSample.js
[redisgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisGetSample.js
[redisimportdatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisImportDataSample.js
[redislistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisListByResourceGroupSample.js
[redislistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisListBySubscriptionSample.js
[redislistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisListKeysSample.js
[redislistupgradenotificationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisListUpgradeNotificationsSample.js
[redisregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisRegenerateKeySample.js
[redisupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v9/javascript/redisUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-rediscache?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redis/arm-rediscache/README.md

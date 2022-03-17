# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [asyncOperationStatusGetSample.js][asyncoperationstatusgetsample]                           | For checking the ongoing status of an operation x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheAsyncOperationStatus.json                                                                          |
| [firewallRulesCreateOrUpdateSample.js][firewallrulescreateorupdatesample]                   | Create or update a redis cache firewall rule x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheFirewallRuleCreate.json                                                                               |
| [firewallRulesDeleteSample.js][firewallrulesdeletesample]                                   | Deletes a single firewall rule in a specified redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheFirewallRuleDelete.json                                                                 |
| [firewallRulesGetSample.js][firewallrulesgetsample]                                         | Gets a single firewall rule in a specified redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheFirewallRuleGet.json                                                                       |
| [firewallRulesListSample.js][firewallruleslistsample]                                       | Gets all firewall rules in the specified redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheFirewallRulesList.json                                                                       |
| [linkedServerCreateSample.js][linkedservercreatesample]                                     | Adds a linked server to the Redis cache (requires Premium SKU). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheLinkedServer_Create.json                                                           |
| [linkedServerDeleteSample.js][linkedserverdeletesample]                                     | Deletes the linked server from a redis cache (requires Premium SKU). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheLinkedServer_Delete.json                                                      |
| [linkedServerGetSample.js][linkedservergetsample]                                           | Gets the detailed information about a linked server of a redis cache (requires Premium SKU). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheLinkedServer_Get.json                                 |
| [linkedServerListSample.js][linkedserverlistsample]                                         | Gets the list of linked servers associated with this redis cache (requires Premium SKU). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheLinkedServer_List.json                                    |
| [patchSchedulesCreateOrUpdateSample.js][patchschedulescreateorupdatesample]                 | Create or replace the patching schedule for Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCachePatchSchedulesCreateOrUpdate.json                                                         |
| [patchSchedulesDeleteSample.js][patchschedulesdeletesample]                                 | Deletes the patching schedule of a redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCachePatchSchedulesDelete.json                                                                          |
| [patchSchedulesGetSample.js][patchschedulesgetsample]                                       | Gets the patching schedule of a redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCachePatchSchedulesGet.json                                                                                |
| [patchSchedulesListByRedisResourceSample.js][patchscheduleslistbyredisresourcesample]       | Gets all patch schedules in the specified redis cache (there is only one). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCachePatchSchedulesList.json                                                 |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]         | Deletes the specified private endpoint connection associated with the redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheDeletePrivateEndpointConnection.json                            |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]               | Gets the specified private endpoint connection associated with the redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheGetPrivateEndpointConnection.json                                  |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]             | List all the private endpoint connections associated with the redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheListPrivateEndpointConnections.json                                     |
| [privateEndpointConnectionsPutSample.js][privateendpointconnectionsputsample]               | Update the state of specified private endpoint connection associated with the redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCachePutPrivateEndpointConnection.json                       |
| [privateLinkResourcesListByRedisCacheSample.js][privatelinkresourceslistbyrediscachesample] | Gets the private link resources that need to be created for a redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheListPrivateLinkResources.json                                           |
| [redisCheckNameAvailabilitySample.js][redischecknameavailabilitysample]                     | Checks that the redis cache name is valid and is not already in use. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheCheckNameAvailability.json                                                    |
| [redisCreateSample.js][rediscreatesample]                                                   | Create or replace (overwrite/recreate, with potential downtime) an existing Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheCreate.json                                               |
| [redisDeleteSample.js][redisdeletesample]                                                   | Deletes a Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheDelete.json                                                                                                                 |
| [redisExportDataSample.js][redisexportdatasample]                                           | Export data from the redis cache to blobs in a container. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheExport.json                                                                              |
| [redisForceRebootSample.js][redisforcerebootsample]                                         | Reboot specified Redis node(s). This operation requires write permission to the cache resource. There can be potential data loss. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheForceReboot.json |
| [redisGetSample.js][redisgetsample]                                                         | Gets a Redis cache (resource description). x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheGet.json                                                                                                |
| [redisImportDataSample.js][redisimportdatasample]                                           | Import data into Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheImport.json                                                                                                          |
| [redisListByResourceGroupSample.js][redislistbyresourcegroupsample]                         | Lists all Redis caches in a resource group. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheListByResourceGroup.json                                                                               |
| [redisListBySubscriptionSample.js][redislistbysubscriptionsample]                           | Gets all Redis caches in the specified subscription. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheList.json                                                                                     |
| [redisListKeysSample.js][redislistkeyssample]                                               | Retrieve a Redis cache's access keys. This operation requires write permission to the cache resource. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheListKeys.json                                |
| [redisListUpgradeNotificationsSample.js][redislistupgradenotificationssample]               | Gets any upgrade notifications for a Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheListUpgradeNotifications.json                                                                    |
| [redisRegenerateKeySample.js][redisregeneratekeysample]                                     | Regenerate Redis cache's access keys. This operation requires write permission to the cache resource. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheRegenerateKey.json                           |
| [redisUpdateSample.js][redisupdatesample]                                                   | Update an existing Redis cache. x-ms-original-file: specification/redis/resource-manager/Microsoft.Cache/stable/2021-06-01/examples/RedisCacheUpdate.json                                                                                                        |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node asyncOperationStatusGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node asyncOperationStatusGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[asyncoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/asyncOperationStatusGetSample.js
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/firewallRulesCreateOrUpdateSample.js
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/firewallRulesDeleteSample.js
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/firewallRulesGetSample.js
[firewallruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/firewallRulesListSample.js
[linkedservercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/linkedServerCreateSample.js
[linkedserverdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/linkedServerDeleteSample.js
[linkedservergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/linkedServerGetSample.js
[linkedserverlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/linkedServerListSample.js
[patchschedulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/patchSchedulesCreateOrUpdateSample.js
[patchschedulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/patchSchedulesDeleteSample.js
[patchschedulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/patchSchedulesGetSample.js
[patchscheduleslistbyredisresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/patchSchedulesListByRedisResourceSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/privateEndpointConnectionsListSample.js
[privateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/privateEndpointConnectionsPutSample.js
[privatelinkresourceslistbyrediscachesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/privateLinkResourcesListByRedisCacheSample.js
[redischecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisCheckNameAvailabilitySample.js
[rediscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisCreateSample.js
[redisdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisDeleteSample.js
[redisexportdatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisExportDataSample.js
[redisforcerebootsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisForceRebootSample.js
[redisgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisGetSample.js
[redisimportdatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisImportDataSample.js
[redislistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisListByResourceGroupSample.js
[redislistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisListBySubscriptionSample.js
[redislistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisListKeysSample.js
[redislistupgradenotificationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisListUpgradeNotificationsSample.js
[redisregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisRegenerateKeySample.js
[redisupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redis/arm-rediscache/samples/v6/javascript/redisUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-rediscache?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redis/arm-rediscache/README.md

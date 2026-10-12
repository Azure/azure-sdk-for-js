# @azure/arm-redisenterprisecache client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-redisenterprisecache in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessPolicyAssignmentCreateUpdateSample.ts][accesspolicyassignmentcreateupdatesample]     | creates/Updates a particular access policy assignment for a database x-ms-original-file: 2026-09-01/RedisEnterpriseAccessPolicyAssignmentCreateUpdate.json                                                                                                                                                                                        |
| [accessPolicyAssignmentDeleteSample.ts][accesspolicyassignmentdeletesample]                 | deletes a single access policy assignment. x-ms-original-file: 2026-09-01/RedisEnterpriseAccessPolicyAssignmentDelete.json                                                                                                                                                                                                                        |
| [accessPolicyAssignmentGetSample.ts][accesspolicyassignmentgetsample]                       | gets information about access policy assignment for database. x-ms-original-file: 2026-09-01/RedisEnterpriseAccessPolicyAssignmentGet.json                                                                                                                                                                                                        |
| [accessPolicyAssignmentListSample.ts][accesspolicyassignmentlistsample]                     | gets all access policy assignments.. x-ms-original-file: 2026-09-01/RedisEnterpriseAccessPolicyAssignmentsList.json                                                                                                                                                                                                                               |
| [clustersUnlinkMigratedEndpointSample.ts][clustersunlinkmigratedendpointsample]             | unlinks the migrated endpoint from an Azure Managed Redis cluster that was migrated from Azure Cache for Redis Enterprise, removing the source cache endpoint that was redirected to this cluster during migration. x-ms-original-file: 2026-09-01/RedisEnterpriseUnlinkMigratedEndpoint.json                                                     |
| [databasesCreateSample.ts][databasescreatesample]                                           | creates a database x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesCreate.json                                                                                                                                                                                                                                                             |
| [databasesDeleteSample.ts][databasesdeletesample]                                           | deletes a single database x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesDelete.json                                                                                                                                                                                                                                                      |
| [databasesExportSample.ts][databasesexportsample]                                           | exports a database file from target database. x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesExport.json                                                                                                                                                                                                                                  |
| [databasesFlushSample.ts][databasesflushsample]                                             | flushes all the keys in this database and also from its linked databases. x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesFlush.json                                                                                                                                                                                                       |
| [databasesForceLinkToReplicationGroupSample.ts][databasesforcelinktoreplicationgroupsample] | forcibly recreates an existing database on the specified cluster, and rejoins it to an existing replication group. **IMPORTANT NOTE:** All data in this database will be discarded, and the database will temporarily be unavailable while rejoining the replication group. x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesForceLink.json |
| [databasesForceUnlinkSample.ts][databasesforceunlinksample]                                 | forcibly removes the link to the specified database resource. x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesForceUnlink.json                                                                                                                                                                                                             |
| [databasesGetSample.ts][databasesgetsample]                                                 | gets information about a database in a Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesGet.json                                                                                                                                                                                                                  |
| [databasesImportSample.ts][databasesimportsample]                                           | imports database files to target database. x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesImport.json                                                                                                                                                                                                                                     |
| [databasesListByClusterSample.ts][databaseslistbyclustersample]                             | gets all databases in the specified Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesListByCluster.json                                                                                                                                                                                                           |
| [databasesListKeysSample.ts][databaseslistkeyssample]                                       | retrieves the access keys for the Redis Enterprise database. x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesListKeys.json                                                                                                                                                                                                                 |
| [databasesRegenerateKeySample.ts][databasesregeneratekeysample]                             | regenerates the Redis Enterprise database's access keys. x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesRegenerateKey.json                                                                                                                                                                                                                |
| [databasesUpdateSample.ts][databasesupdatesample]                                           | updates a database x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesNoClusterCacheUpdateClustering.json                                                                                                                                                                                                                                     |
| [databasesUpgradeDBRedisVersionSample.ts][databasesupgradedbredisversionsample]             | upgrades the database Redis version to the latest available. x-ms-original-file: 2026-09-01/RedisEnterpriseDatabasesUpgradeDBRedisVersion.json                                                                                                                                                                                                    |
| [migrationsGetSample.ts][migrationsgetsample]                                               | gets information about a migration in a Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationGet.json                                                                                                                                                                                                                 |
| [migrationsListSample.ts][migrationslistsample]                                             | gets information about all migrations attempts in a Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationList.json                                                                                                                                                                                                    |
| [migrationsStartSample.ts][migrationsstartsample]                                           | starts a new migration x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationStart.json                                                                                                                                                                                                                                                          |
| [migrationsUndoSample.ts][migrationsundosample]                                             | cancel or rollback the migration operation in a Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationUndo.json                                                                                                                                                                                                        |
| [migrationsUnlinkMigratedEndpointSample.ts][migrationsunlinkmigratedendpointsample]         | unlinks the migrated endpoint from the Azure Managed Redis cluster that was migrated from Azure Cache for Redis, removing the source cache endpoint that was redirected to this cluster during migration. x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationUnlinkMigratedEndpoint.json                                                      |
| [migrationsValidateSample.ts][migrationsvalidatesample]                                     | validates if a source Azure Cache for Redis resource can be migrated to a target Azure Managed Redis resource. x-ms-original-file: 2026-09-01/RedisEnterpriseMigrationValidate.json                                                                                                                                                               |
| [operationsListSample.ts][operationslistsample]                                             | lists all of the available REST API operations of the Microsoft.Cache provider. x-ms-original-file: 2026-09-01/OperationsList.json                                                                                                                                                                                                                |
| [operationsStatusGetSample.ts][operationsstatusgetsample]                                   | gets the status of operation. x-ms-original-file: 2026-09-01/OperationsStatusGet.json                                                                                                                                                                                                                                                             |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]         | deletes the specified private endpoint connection associated with the Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseDeletePrivateEndpointConnection.json                                                                                                                                                                |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]               | gets the specified private endpoint connection associated with the Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseGetPrivateEndpointConnection.json                                                                                                                                                                      |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]             | lists all the private endpoint connections associated with the Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseListPrivateEndpointConnections.json                                                                                                                                                                        |
| [privateEndpointConnectionsPutSample.ts][privateendpointconnectionsputsample]               | updates the state of the specified private endpoint connection associated with the Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterprisePutPrivateEndpointConnection.json                                                                                                                                                      |
| [privateLinkResourcesListByClusterSample.ts][privatelinkresourceslistbyclustersample]       | gets the private link resources that need to be created for a Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseListPrivateLinkResources.json                                                                                                                                                                               |
| [redisEnterpriseCreateSample.ts][redisenterprisecreatesample]                               | creates or updates an existing (overwrite/recreate, with potential downtime) cache cluster x-ms-original-file: 2026-09-01/RedisEnterpriseCreate.json                                                                                                                                                                                              |
| [redisEnterpriseDeleteSample.ts][redisenterprisedeletesample]                               | deletes a Redis Enterprise cache cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseDelete.json                                                                                                                                                                                                                                               |
| [redisEnterpriseGetSample.ts][redisenterprisegetsample]                                     | gets information about a Redis Enterprise cluster x-ms-original-file: 2026-09-01/RedisEnterpriseGet.json                                                                                                                                                                                                                                          |
| [redisEnterpriseListByResourceGroupSample.ts][redisenterpriselistbyresourcegroupsample]     | lists all Redis Enterprise clusters in a resource group. x-ms-original-file: 2026-09-01/RedisEnterpriseListByResourceGroup.json                                                                                                                                                                                                                   |
| [redisEnterpriseListSample.ts][redisenterpriselistsample]                                   | lists all Redis Enterprise clusters in the specified subscription. x-ms-original-file: 2026-09-01/RedisEnterpriseList.json                                                                                                                                                                                                                        |
| [redisEnterpriseListSkusForScalingSample.ts][redisenterpriselistskusforscalingsample]       | lists the available SKUs for scaling the Redis Enterprise cluster. x-ms-original-file: 2026-09-01/RedisEnterpriseListSkusForScaling.json                                                                                                                                                                                                          |
| [redisEnterpriseUpdateSample.ts][redisenterpriseupdatesample]                               | updates an existing Redis Enterprise cluster x-ms-original-file: 2026-09-01/RedisEnterpriseUpdate.json                                                                                                                                                                                                                                            |

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

[accesspolicyassignmentcreateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/accessPolicyAssignmentCreateUpdateSample.ts
[accesspolicyassignmentdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/accessPolicyAssignmentDeleteSample.ts
[accesspolicyassignmentgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/accessPolicyAssignmentGetSample.ts
[accesspolicyassignmentlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/accessPolicyAssignmentListSample.ts
[clustersunlinkmigratedendpointsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/clustersUnlinkMigratedEndpointSample.ts
[databasescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesCreateSample.ts
[databasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesDeleteSample.ts
[databasesexportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesExportSample.ts
[databasesflushsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesFlushSample.ts
[databasesforcelinktoreplicationgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesForceLinkToReplicationGroupSample.ts
[databasesforceunlinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesForceUnlinkSample.ts
[databasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesGetSample.ts
[databasesimportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesImportSample.ts
[databaseslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesListByClusterSample.ts
[databaseslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesListKeysSample.ts
[databasesregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesRegenerateKeySample.ts
[databasesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesUpdateSample.ts
[databasesupgradedbredisversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/databasesUpgradeDBRedisVersionSample.ts
[migrationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/migrationsGetSample.ts
[migrationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/migrationsListSample.ts
[migrationsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/migrationsStartSample.ts
[migrationsundosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/migrationsUndoSample.ts
[migrationsunlinkmigratedendpointsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/migrationsUnlinkMigratedEndpointSample.ts
[migrationsvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/migrationsValidateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/operationsListSample.ts
[operationsstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/operationsStatusGetSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/privateEndpointConnectionsListSample.ts
[privateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/privateEndpointConnectionsPutSample.ts
[privatelinkresourceslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/privateLinkResourcesListByClusterSample.ts
[redisenterprisecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/redisEnterpriseCreateSample.ts
[redisenterprisedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/redisEnterpriseDeleteSample.ts
[redisenterprisegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/redisEnterpriseGetSample.ts
[redisenterpriselistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/redisEnterpriseListByResourceGroupSample.ts
[redisenterpriselistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/redisEnterpriseListSample.ts
[redisenterpriselistskusforscalingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/redisEnterpriseListSkusForScalingSample.ts
[redisenterpriseupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5/typescript/src/redisEnterpriseUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-redisenterprisecache
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redisenterprise/arm-redisenterprisecache/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

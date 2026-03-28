# @azure/arm-redisenterprisecache client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-redisenterprisecache in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessPolicyAssignmentCreateUpdateSample.ts][accesspolicyassignmentcreateupdatesample]     | creates/Updates a particular access policy assignment for a database x-ms-original-file: 2025-08-01-preview/RedisEnterpriseAccessPolicyAssignmentCreateUpdate.json                                                                                                                                                                                        |
| [accessPolicyAssignmentDeleteSample.ts][accesspolicyassignmentdeletesample]                 | deletes a single access policy assignment. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseAccessPolicyAssignmentDelete.json                                                                                                                                                                                                                        |
| [accessPolicyAssignmentGetSample.ts][accesspolicyassignmentgetsample]                       | gets information about access policy assignment for database. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseAccessPolicyAssignmentGet.json                                                                                                                                                                                                        |
| [accessPolicyAssignmentListSample.ts][accesspolicyassignmentlistsample]                     | gets all access policy assignments.. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseAccessPolicyAssignmentsList.json                                                                                                                                                                                                                               |
| [databasesCreateSample.ts][databasescreatesample]                                           | creates a database x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesCreate.json                                                                                                                                                                                                                                                             |
| [databasesDeleteSample.ts][databasesdeletesample]                                           | deletes a single database x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesDelete.json                                                                                                                                                                                                                                                      |
| [databasesExportSample.ts][databasesexportsample]                                           | exports a database file from target database. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesExport.json                                                                                                                                                                                                                                  |
| [databasesFlushSample.ts][databasesflushsample]                                             | flushes all the keys in this database and also from its linked databases. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesFlush.json                                                                                                                                                                                                       |
| [databasesForceLinkToReplicationGroupSample.ts][databasesforcelinktoreplicationgroupsample] | forcibly recreates an existing database on the specified cluster, and rejoins it to an existing replication group. **IMPORTANT NOTE:** All data in this database will be discarded, and the database will temporarily be unavailable while rejoining the replication group. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesForceLink.json |
| [databasesForceUnlinkSample.ts][databasesforceunlinksample]                                 | forcibly removes the link to the specified database resource. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesForceUnlink.json                                                                                                                                                                                                             |
| [databasesGetSample.ts][databasesgetsample]                                                 | gets information about a database in a Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesGet.json                                                                                                                                                                                                                  |
| [databasesImportSample.ts][databasesimportsample]                                           | imports database files to target database. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesImport.json                                                                                                                                                                                                                                     |
| [databasesListByClusterSample.ts][databaseslistbyclustersample]                             | gets all databases in the specified Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesListByCluster.json                                                                                                                                                                                                           |
| [databasesListKeysSample.ts][databaseslistkeyssample]                                       | retrieves the access keys for the Redis Enterprise database. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesListKeys.json                                                                                                                                                                                                                 |
| [databasesRegenerateKeySample.ts][databasesregeneratekeysample]                             | regenerates the Redis Enterprise database's access keys. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesRegenerateKey.json                                                                                                                                                                                                                |
| [databasesUpdateSample.ts][databasesupdatesample]                                           | updates a database x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesNoClusterCacheUpdateClustering.json                                                                                                                                                                                                                                     |
| [databasesUpgradeDBRedisVersionSample.ts][databasesupgradedbredisversionsample]             | upgrades the database Redis version to the latest available. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDatabasesUpgradeDBRedisVersion.json                                                                                                                                                                                                    |
| [migrationCancelSample.ts][migrationcancelsample]                                           | cancel or rollback the migration operation in a Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseMigrationCancel.json                                                                                                                                                                                                      |
| [migrationGetSample.ts][migrationgetsample]                                                 | gets information about a migration in a Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseMigrationGet.json                                                                                                                                                                                                                 |
| [migrationListSample.ts][migrationlistsample]                                               | gets information about all migrations attempts in a Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseMigrationList.json                                                                                                                                                                                                    |
| [migrationStartSample.ts][migrationstartsample]                                             | starts a new migration x-ms-original-file: 2025-08-01-preview/RedisEnterpriseMigrationStart.json                                                                                                                                                                                                                                                          |
| [operationsListSample.ts][operationslistsample]                                             | lists all of the available REST API operations of the Microsoft.Cache provider. x-ms-original-file: 2025-08-01-preview/OperationsList.json                                                                                                                                                                                                                |
| [operationsStatusGetSample.ts][operationsstatusgetsample]                                   | gets the status of operation. x-ms-original-file: 2025-08-01-preview/OperationsStatusGet.json                                                                                                                                                                                                                                                             |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]         | deletes the specified private endpoint connection associated with the Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDeletePrivateEndpointConnection.json                                                                                                                                                                |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]               | gets the specified private endpoint connection associated with the Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseGetPrivateEndpointConnection.json                                                                                                                                                                      |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]             | lists all the private endpoint connections associated with the Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseListPrivateEndpointConnections.json                                                                                                                                                                        |
| [privateEndpointConnectionsPutSample.ts][privateendpointconnectionsputsample]               | updates the state of the specified private endpoint connection associated with the Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterprisePutPrivateEndpointConnection.json                                                                                                                                                      |
| [privateLinkResourcesListByClusterSample.ts][privatelinkresourceslistbyclustersample]       | gets the private link resources that need to be created for a Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseListPrivateLinkResources.json                                                                                                                                                                               |
| [redisEnterpriseCreateSample.ts][redisenterprisecreatesample]                               | creates or updates an existing (overwrite/recreate, with potential downtime) cache cluster x-ms-original-file: 2025-08-01-preview/RedisEnterpriseCreate.json                                                                                                                                                                                              |
| [redisEnterpriseDeleteSample.ts][redisenterprisedeletesample]                               | deletes a Redis Enterprise cache cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseDelete.json                                                                                                                                                                                                                                               |
| [redisEnterpriseGetSample.ts][redisenterprisegetsample]                                     | gets information about a Redis Enterprise cluster x-ms-original-file: 2025-08-01-preview/RedisEnterpriseGet.json                                                                                                                                                                                                                                          |
| [redisEnterpriseListByResourceGroupSample.ts][redisenterpriselistbyresourcegroupsample]     | lists all Redis Enterprise clusters in a resource group. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseListByResourceGroup.json                                                                                                                                                                                                                   |
| [redisEnterpriseListSample.ts][redisenterpriselistsample]                                   | lists all Redis Enterprise clusters in the specified subscription. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseList.json                                                                                                                                                                                                                        |
| [redisEnterpriseListSkusForScalingSample.ts][redisenterpriselistskusforscalingsample]       | lists the available SKUs for scaling the Redis Enterprise cluster. x-ms-original-file: 2025-08-01-preview/RedisEnterpriseListSkusForScaling.json                                                                                                                                                                                                          |
| [redisEnterpriseUpdateSample.ts][redisenterpriseupdatesample]                               | updates an existing Redis Enterprise cluster x-ms-original-file: 2025-08-01-preview/RedisEnterpriseUpdate.json                                                                                                                                                                                                                                            |

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

[accesspolicyassignmentcreateupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/accessPolicyAssignmentCreateUpdateSample.ts
[accesspolicyassignmentdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/accessPolicyAssignmentDeleteSample.ts
[accesspolicyassignmentgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/accessPolicyAssignmentGetSample.ts
[accesspolicyassignmentlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/accessPolicyAssignmentListSample.ts
[databasescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesCreateSample.ts
[databasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesDeleteSample.ts
[databasesexportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesExportSample.ts
[databasesflushsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesFlushSample.ts
[databasesforcelinktoreplicationgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesForceLinkToReplicationGroupSample.ts
[databasesforceunlinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesForceUnlinkSample.ts
[databasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesGetSample.ts
[databasesimportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesImportSample.ts
[databaseslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesListByClusterSample.ts
[databaseslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesListKeysSample.ts
[databasesregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesRegenerateKeySample.ts
[databasesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesUpdateSample.ts
[databasesupgradedbredisversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/databasesUpgradeDBRedisVersionSample.ts
[migrationcancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/migrationCancelSample.ts
[migrationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/migrationGetSample.ts
[migrationlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/migrationListSample.ts
[migrationstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/migrationStartSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/operationsListSample.ts
[operationsstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/operationsStatusGetSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/privateEndpointConnectionsPutSample.ts
[privatelinkresourceslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/privateLinkResourcesListByClusterSample.ts
[redisenterprisecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/redisEnterpriseCreateSample.ts
[redisenterprisedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/redisEnterpriseDeleteSample.ts
[redisenterprisegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/redisEnterpriseGetSample.ts
[redisenterpriselistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/redisEnterpriseListByResourceGroupSample.ts
[redisenterpriselistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/redisEnterpriseListSample.ts
[redisenterpriselistskusforscalingsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/redisEnterpriseListSkusForScalingSample.ts
[redisenterpriseupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v5-beta/typescript/src/redisEnterpriseUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-redisenterprisecache?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redisenterprise/arm-redisenterprisecache/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

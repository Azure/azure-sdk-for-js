# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [databasesCreateSample.ts][databasescreatesample]                                                   | Creates a database x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDatabasesCreate.json                                                                                                       |
| [databasesDeleteSample.ts][databasesdeletesample]                                                   | Deletes a single database x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDatabasesDelete.json                                                                                                |
| [databasesExportSample.ts][databasesexportsample]                                                   | Exports a database file from target database. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDatabasesExport.json                                                                            |
| [databasesForceUnlinkSample.ts][databasesforceunlinksample]                                         | Forcibly removes the link to the specified database resource. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDatabasesForceUnlink.json                                                       |
| [databasesGetSample.ts][databasesgetsample]                                                         | Gets information about a database in a RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDatabasesGet.json                                                             |
| [databasesImportSample.ts][databasesimportsample]                                                   | Imports database files to target database. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDatabasesImport.json                                                                               |
| [databasesListByClusterSample.ts][databaseslistbyclustersample]                                     | Gets all databases in the specified RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDatabasesListByCluster.json                                                      |
| [databasesListKeysSample.ts][databaseslistkeyssample]                                               | Retrieves the access keys for the RedisEnterprise database. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDatabasesListKeys.json                                                            |
| [databasesRegenerateKeySample.ts][databasesregeneratekeysample]                                     | Regenerates the RedisEnterprise database's access keys. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDatabasesRegenerateKey.json                                                           |
| [databasesUpdateSample.ts][databasesupdatesample]                                                   | Updates a database x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDatabasesUpdate.json                                                                                                       |
| [operationsListSample.ts][operationslistsample]                                                     | Lists all of the available REST API operations of the Microsoft.Cache provider. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/OperationsList.json                                                          |
| [operationsStatusGet.ts][operationsstatusget]                                                       | Gets the status of operation. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/OperationsStatusGet.json                                                                                                       |
| [operationsStatusGetSample.ts][operationsstatusgetsample]                                           | Gets the status of operation. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/OperationsStatusGet.json                                                                                                       |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                 | Deletes the specified private endpoint connection associated with the RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDeletePrivateEndpointConnection.json           |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                       | Gets the specified private endpoint connection associated with the RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseGetPrivateEndpointConnection.json                 |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                     | Lists all the private endpoint connections associated with the RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseListPrivateEndpointConnections.json                   |
| [privateEndpointConnectionsPutSample.ts][privateendpointconnectionsputsample]                       | Updates the state of the specified private endpoint connection associated with the RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterprisePutPrivateEndpointConnection.json |
| [privateLinkResourcesListByClusterSample.ts][privatelinkresourceslistbyclustersample]               | Gets the private link resources that need to be created for a RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseListPrivateLinkResources.json                          |
| [redisEnterpriseCreate.ts][redisenterprisecreate]                                                   | Creates or updates an existing (overwrite/recreate, with potential downtime) cache cluster x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseCreate.json                                        |
| [redisEnterpriseCreateSample.ts][redisenterprisecreatesample]                                       | Creates or updates an existing (overwrite/recreate, with potential downtime) cache cluster x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseCreate.json                                        |
| [redisEnterpriseDatabasesCreate.ts][redisenterprisedatabasescreate]                                 | Creates a database x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDatabasesCreate.json                                                                                                       |
| [redisEnterpriseDatabasesDelete.ts][redisenterprisedatabasesdelete]                                 | Deletes a single database x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDatabasesDelete.json                                                                                                |
| [redisEnterpriseDatabasesExport.ts][redisenterprisedatabasesexport]                                 | Exports a database file from target database. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDatabasesExport.json                                                                            |
| [redisEnterpriseDatabasesGet.ts][redisenterprisedatabasesget]                                       | Gets information about a database in a RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDatabasesGet.json                                                             |
| [redisEnterpriseDatabasesImport.ts][redisenterprisedatabasesimport]                                 | Imports database files to target database. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDatabasesImport.json                                                                               |
| [redisEnterpriseDatabasesListByCluster.ts][redisenterprisedatabaseslistbycluster]                   | Gets all databases in the specified RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDatabasesListByCluster.json                                                      |
| [redisEnterpriseDatabasesListKeys.ts][redisenterprisedatabaseslistkeys]                             | Retrieves the access keys for the RedisEnterprise database. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDatabasesListKeys.json                                                            |
| [redisEnterpriseDatabasesRegenerateKey.ts][redisenterprisedatabasesregeneratekey]                   | Regenerates the RedisEnterprise database's access keys. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDatabasesRegenerateKey.json                                                           |
| [redisEnterpriseDatabasesUpdate.ts][redisenterprisedatabasesupdate]                                 | Updates a database x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDatabasesUpdate.json                                                                                                       |
| [redisEnterpriseDelete.ts][redisenterprisedelete]                                                   | Deletes a RedisEnterprise cache cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDelete.json                                                                                          |
| [redisEnterpriseDeletePrivateEndpointConnection.ts][redisenterprisedeleteprivateendpointconnection] | Deletes the specified private endpoint connection associated with the RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseDeletePrivateEndpointConnection.json           |
| [redisEnterpriseDeleteSample.ts][redisenterprisedeletesample]                                       | Deletes a RedisEnterprise cache cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseDelete.json                                                                                          |
| [redisEnterpriseGet.ts][redisenterpriseget]                                                         | Gets information about a RedisEnterprise cluster x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseGet.json                                                                                     |
| [redisEnterpriseGetPrivateEndpointConnection.ts][redisenterprisegetprivateendpointconnection]       | Gets the specified private endpoint connection associated with the RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseGetPrivateEndpointConnection.json                 |
| [redisEnterpriseGetSample.ts][redisenterprisegetsample]                                             | Gets information about a RedisEnterprise cluster x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseGet.json                                                                                     |
| [redisEnterpriseList.ts][redisenterpriselist]                                                       | Gets all RedisEnterprise clusters in the specified subscription. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseList.json                                                                    |
| [redisEnterpriseListByResourceGroup.ts][redisenterpriselistbyresourcegroup]                         | Lists all RedisEnterprise clusters in a resource group. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseListByResourceGroup.json                                                              |
| [redisEnterpriseListByResourceGroupSample.ts][redisenterpriselistbyresourcegroupsample]             | Lists all RedisEnterprise clusters in a resource group. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseListByResourceGroup.json                                                              |
| [redisEnterpriseListPrivateEndpointConnections.ts][redisenterpriselistprivateendpointconnections]   | Lists all the private endpoint connections associated with the RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseListPrivateEndpointConnections.json                   |
| [redisEnterpriseListPrivateLinkResources.ts][redisenterpriselistprivatelinkresources]               | Gets the private link resources that need to be created for a RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseListPrivateLinkResources.json                          |
| [redisEnterpriseListSample.ts][redisenterpriselistsample]                                           | Gets all RedisEnterprise clusters in the specified subscription. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseList.json                                                                    |
| [redisEnterprisePutPrivateEndpointConnection.ts][redisenterpriseputprivateendpointconnection]       | Updates the state of the specified private endpoint connection associated with the RedisEnterprise cluster. x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterprisePutPrivateEndpointConnection.json |
| [redisEnterpriseUpdate.ts][redisenterpriseupdate]                                                   | Updates an existing RedisEnterprise cluster x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2021-08-01/examples/RedisEnterpriseUpdate.json                                                                                       |
| [redisEnterpriseUpdateSample.ts][redisenterpriseupdatesample]                                       | Updates an existing RedisEnterprise cluster x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/stable/2022-01-01/examples/RedisEnterpriseUpdate.json                                                                                       |

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
node dist/databasesCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/databasesCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[databasescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/databasesCreateSample.ts
[databasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/databasesDeleteSample.ts
[databasesexportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/databasesExportSample.ts
[databasesforceunlinksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/databasesForceUnlinkSample.ts
[databasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/databasesGetSample.ts
[databasesimportsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/databasesImportSample.ts
[databaseslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/databasesListByClusterSample.ts
[databaseslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/databasesListKeysSample.ts
[databasesregeneratekeysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/databasesRegenerateKeySample.ts
[databasesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/databasesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/operationsListSample.ts
[operationsstatusget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/operationsStatusGet.ts
[operationsstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/operationsStatusGetSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/privateEndpointConnectionsListSample.ts
[privateendpointconnectionsputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/privateEndpointConnectionsPutSample.ts
[privatelinkresourceslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/privateLinkResourcesListByClusterSample.ts
[redisenterprisecreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseCreate.ts
[redisenterprisecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseCreateSample.ts
[redisenterprisedatabasescreate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDatabasesCreate.ts
[redisenterprisedatabasesdelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDatabasesDelete.ts
[redisenterprisedatabasesexport]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDatabasesExport.ts
[redisenterprisedatabasesget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDatabasesGet.ts
[redisenterprisedatabasesimport]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDatabasesImport.ts
[redisenterprisedatabaseslistbycluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDatabasesListByCluster.ts
[redisenterprisedatabaseslistkeys]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDatabasesListKeys.ts
[redisenterprisedatabasesregeneratekey]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDatabasesRegenerateKey.ts
[redisenterprisedatabasesupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDatabasesUpdate.ts
[redisenterprisedelete]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDelete.ts
[redisenterprisedeleteprivateendpointconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDeletePrivateEndpointConnection.ts
[redisenterprisedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseDeleteSample.ts
[redisenterpriseget]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseGet.ts
[redisenterprisegetprivateendpointconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseGetPrivateEndpointConnection.ts
[redisenterprisegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseGetSample.ts
[redisenterpriselist]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseList.ts
[redisenterpriselistbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseListByResourceGroup.ts
[redisenterpriselistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseListByResourceGroupSample.ts
[redisenterpriselistprivateendpointconnections]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseListPrivateEndpointConnections.ts
[redisenterpriselistprivatelinkresources]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseListPrivateLinkResources.ts
[redisenterpriselistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseListSample.ts
[redisenterpriseputprivateendpointconnection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterprisePutPrivateEndpointConnection.ts
[redisenterpriseupdate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseUpdate.ts
[redisenterpriseupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redisenterprise/arm-redisenterprisecache/samples/v2/typescript/src/redisEnterpriseUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-redisenterprisecache?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redisenterprise/arm-redisenterprisecache/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

# @azure/arm-mongocluster client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-mongocluster in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [firewallRulesCreateOrUpdateSample.ts][firewallrulescreateorupdatesample]                                   | creates a new firewall rule or updates an existing firewall rule on a mongo cluster. x-ms-original-file: 2025-08-01-preview/MongoClusters_FirewallRuleCreate.json                                                                                     |
| [firewallRulesDeleteSample.ts][firewallrulesdeletesample]                                                   | deletes a mongo cluster firewall rule. x-ms-original-file: 2025-08-01-preview/MongoClusters_FirewallRuleDelete.json                                                                                                                                   |
| [firewallRulesGetSample.ts][firewallrulesgetsample]                                                         | gets information about a mongo cluster firewall rule. x-ms-original-file: 2025-08-01-preview/MongoClusters_FirewallRuleGet.json                                                                                                                       |
| [firewallRulesListByMongoClusterSample.ts][firewallruleslistbymongoclustersample]                           | list all the firewall rules in a given mongo cluster. x-ms-original-file: 2025-08-01-preview/MongoClusters_FirewallRuleList.json                                                                                                                      |
| [mongoClustersCheckNameAvailabilitySample.ts][mongoclusterschecknameavailabilitysample]                     | check if mongo cluster name is available for use. x-ms-original-file: 2025-08-01-preview/MongoClusters_NameAvailability.json                                                                                                                          |
| [mongoClustersCreateOrUpdateSample.ts][mongoclusterscreateorupdatesample]                                   | create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH. x-ms-original-file: 2025-08-01-preview/MongoClusters_Create.json                                               |
| [mongoClustersDeleteSample.ts][mongoclustersdeletesample]                                                   | deletes a mongo cluster. x-ms-original-file: 2025-08-01-preview/MongoClusters_Delete.json                                                                                                                                                             |
| [mongoClustersGetSample.ts][mongoclustersgetsample]                                                         | gets information about a mongo cluster. x-ms-original-file: 2025-08-01-preview/MongoClusters_Get.json                                                                                                                                                 |
| [mongoClustersListByResourceGroupSample.ts][mongoclusterslistbyresourcegroupsample]                         | list all the mongo clusters in a given resource group. x-ms-original-file: 2025-08-01-preview/MongoClusters_ListByResourceGroup.json                                                                                                                  |
| [mongoClustersListConnectionStringsSample.ts][mongoclusterslistconnectionstringssample]                     | list mongo cluster connection strings. This includes the default connection string using SCRAM-SHA-256, as well as other connection strings supported by the cluster. x-ms-original-file: 2025-08-01-preview/MongoClusters_ListConnectionStrings.json |
| [mongoClustersListSample.ts][mongoclusterslistsample]                                                       | list all the mongo clusters in a given subscription. x-ms-original-file: 2025-08-01-preview/MongoClusters_List.json                                                                                                                                   |
| [mongoClustersPromoteSample.ts][mongoclusterspromotesample]                                                 | promotes a replica mongo cluster to a primary role. x-ms-original-file: 2025-08-01-preview/MongoClusters_ForcePromoteReplica.json                                                                                                                     |
| [mongoClustersUpdateSample.ts][mongoclustersupdatesample]                                                   | updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition. x-ms-original-file: 2025-08-01-preview/MongoClusters_PatchCMK.json                                      |
| [operationsListSample.ts][operationslistsample]                                                             | list the operations for the provider x-ms-original-file: 2025-08-01-preview/Operations_List.json                                                                                                                                                      |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]                         | create a Private endpoint connection x-ms-original-file: 2025-08-01-preview/MongoClusters_PrivateEndpointConnectionPut.json                                                                                                                           |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                         | delete the private endpoint connection x-ms-original-file: 2025-08-01-preview/MongoClusters_PrivateEndpointConnectionDelete.json                                                                                                                      |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                               | get a specific private connection x-ms-original-file: 2025-08-01-preview/MongoClusters_PrivateEndpointConnectionGet.json                                                                                                                              |
| [privateEndpointConnectionsListByMongoClusterSample.ts][privateendpointconnectionslistbymongoclustersample] | list existing private connections x-ms-original-file: 2025-08-01-preview/MongoClusters_PrivateEndpointConnectionList.json                                                                                                                             |
| [privateLinksListByMongoClusterSample.ts][privatelinkslistbymongoclustersample]                             | list private links on the given resource x-ms-original-file: 2025-08-01-preview/MongoClusters_PrivateLinkResourceList.json                                                                                                                            |
| [replicasListByParentSample.ts][replicaslistbyparentsample]                                                 | list all the replicas for the mongo cluster. x-ms-original-file: 2025-08-01-preview/MongoClusters_ReplicaList.json                                                                                                                                    |
| [usersCreateOrUpdateSample.ts][userscreateorupdatesample]                                                   | creates a new user or updates an existing user on a mongo cluster. x-ms-original-file: 2025-08-01-preview/MongoClusters_UserCreateOrUpdate.json                                                                                                       |
| [usersDeleteSample.ts][usersdeletesample]                                                                   | deletes a mongo cluster user. x-ms-original-file: 2025-08-01-preview/MongoClusters_UserDelete.json                                                                                                                                                    |
| [usersGetSample.ts][usersgetsample]                                                                         | gets the defintion of a Mongo cluster user. x-ms-original-file: 2025-08-01-preview/MongoClusters_UserGet.json                                                                                                                                         |
| [usersListByMongoClusterSample.ts][userslistbymongoclustersample]                                           | list all the users on a mongo cluster. x-ms-original-file: 2025-08-01-preview/MongoClusters_UserList.json                                                                                                                                             |

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
node dist/firewallRulesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/firewallRulesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/firewallRulesCreateOrUpdateSample.ts
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/firewallRulesDeleteSample.ts
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/firewallRulesGetSample.ts
[firewallruleslistbymongoclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/firewallRulesListByMongoClusterSample.ts
[mongoclusterschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/mongoClustersCheckNameAvailabilitySample.ts
[mongoclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/mongoClustersCreateOrUpdateSample.ts
[mongoclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/mongoClustersDeleteSample.ts
[mongoclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/mongoClustersGetSample.ts
[mongoclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/mongoClustersListByResourceGroupSample.ts
[mongoclusterslistconnectionstringssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/mongoClustersListConnectionStringsSample.ts
[mongoclusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/mongoClustersListSample.ts
[mongoclusterspromotesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/mongoClustersPromoteSample.ts
[mongoclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/mongoClustersUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbymongoclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/privateEndpointConnectionsListByMongoClusterSample.ts
[privatelinkslistbymongoclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/privateLinksListByMongoClusterSample.ts
[replicaslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/replicasListByParentSample.ts
[userscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/usersCreateOrUpdateSample.ts
[usersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/usersDeleteSample.ts
[usersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/usersGetSample.ts
[userslistbymongoclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongocluster/arm-mongocluster/samples/v1-beta/typescript/src/usersListByMongoClusterSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-mongocluster?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mongocluster/arm-mongocluster/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

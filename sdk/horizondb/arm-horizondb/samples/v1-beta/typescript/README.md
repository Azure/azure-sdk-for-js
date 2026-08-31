# @azure/arm-horizondb client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-horizondb in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [horizonDbAdministratorsCreateOrUpdateSample.ts][horizondbadministratorscreateorupdatesample]                     | creates a new HorizonDB administrator or updates an existing administrator. x-ms-original-file: 2026-05-01-preview/Administrators_CreateOrUpdate.json      |
| [horizonDbAdministratorsDeleteSample.ts][horizondbadministratorsdeletesample]                                     | deletes a HorizonDB administrator. x-ms-original-file: 2026-05-01-preview/Administrators_Delete.json                                                       |
| [horizonDbAdministratorsGetSample.ts][horizondbadministratorsgetsample]                                           | gets information about a HorizonDB administrator. x-ms-original-file: 2026-05-01-preview/Administrators_Get.json                                           |
| [horizonDbAdministratorsListSample.ts][horizondbadministratorslistsample]                                         | lists all HorizonDB administrators in a cluster. x-ms-original-file: 2026-05-01-preview/Administrators_List.json                                           |
| [horizonDbClustersCreateOrUpdateSample.ts][horizondbclusterscreateorupdatesample]                                 | creates a new HorizonDB cluster or updates an existing cluster. x-ms-original-file: 2026-05-01-preview/Clusters_CreateOrUpdate.json                        |
| [horizonDbClustersDeleteSample.ts][horizondbclustersdeletesample]                                                 | deletes a HorizonDB cluster. x-ms-original-file: 2026-05-01-preview/Clusters_Delete.json                                                                   |
| [horizonDbClustersGetSample.ts][horizondbclustersgetsample]                                                       | gets information about a HorizonDB cluster. x-ms-original-file: 2026-05-01-preview/Clusters_Get.json                                                       |
| [horizonDbClustersListByResourceGroupSample.ts][horizondbclusterslistbyresourcegroupsample]                       | lists all HorizonDB clusters in a resource group. x-ms-original-file: 2026-05-01-preview/Clusters_ListByResourceGroup.json                                 |
| [horizonDbClustersListBySubscriptionSample.ts][horizondbclusterslistbysubscriptionsample]                         | lists all HorizonDB clusters in a subscription. x-ms-original-file: 2026-05-01-preview/Clusters_ListBySubscription.json                                    |
| [horizonDbClustersRestartSample.ts][horizondbclustersrestartsample]                                               | restarts a HorizonDB cluster. x-ms-original-file: 2026-05-01-preview/Clusters_Restart.json                                                                 |
| [horizonDbClustersStartSample.ts][horizondbclustersstartsample]                                                   | starts a stopped HorizonDB cluster. x-ms-original-file: 2026-05-01-preview/Clusters_Start.json                                                             |
| [horizonDbClustersStopSample.ts][horizondbclustersstopsample]                                                     | stops a running HorizonDB cluster. x-ms-original-file: 2026-05-01-preview/Clusters_Stop.json                                                               |
| [horizonDbClustersUpdateSample.ts][horizondbclustersupdatesample]                                                 | updates an existing HorizonDB cluster (e.g., tags, virtual cores, replica count). x-ms-original-file: 2026-05-01-preview/Clusters_Update.json              |
| [horizonDbFirewallRulesCreateOrUpdateSample.ts][horizondbfirewallrulescreateorupdatesample]                       | creates a new HorizonDB firewall rule or updates an existing rule. x-ms-original-file: 2026-05-01-preview/FirewallRules_CreateOrUpdate.json                |
| [horizonDbFirewallRulesDeleteSample.ts][horizondbfirewallrulesdeletesample]                                       | deletes a HorizonDB firewall rule. x-ms-original-file: 2026-05-01-preview/FirewallRules_Delete.json                                                        |
| [horizonDbFirewallRulesGetSample.ts][horizondbfirewallrulesgetsample]                                             | gets information about a HorizonDB firewall rule. x-ms-original-file: 2026-05-01-preview/FirewallRules_Get.json                                            |
| [horizonDbFirewallRulesListSample.ts][horizondbfirewallruleslistsample]                                           | lists all HorizonDB firewall rules in a pool. x-ms-original-file: 2026-05-01-preview/FirewallRules_List.json                                               |
| [horizonDbParameterGroupsCreateOrUpdateSample.ts][horizondbparametergroupscreateorupdatesample]                   | creates a new HorizonDB parameter group or updates an existing parameter group. x-ms-original-file: 2026-05-01-preview/ParameterGroups_CreateOrUpdate.json |
| [horizonDbParameterGroupsDeleteSample.ts][horizondbparametergroupsdeletesample]                                   | deletes a HorizonDB parameter group. x-ms-original-file: 2026-05-01-preview/ParameterGroups_Delete.json                                                    |
| [horizonDbParameterGroupsGetSample.ts][horizondbparametergroupsgetsample]                                         | gets information about a HorizonDB parameter group. x-ms-original-file: 2026-05-01-preview/ParameterGroups_Get.json                                        |
| [horizonDbParameterGroupsListByResourceGroupSample.ts][horizondbparametergroupslistbyresourcegroupsample]         | lists all HorizonDB parameter groups in a resource group. x-ms-original-file: 2026-05-01-preview/ParameterGroups_ListByResourceGroup.json                  |
| [horizonDbParameterGroupsListBySubscriptionSample.ts][horizondbparametergroupslistbysubscriptionsample]           | lists all HorizonDB parameter groups in a subscription. x-ms-original-file: 2026-05-01-preview/ParameterGroups_ListBySubscription.json                     |
| [horizonDbParameterGroupsListConnectionsSample.ts][horizondbparametergroupslistconnectionssample]                 | gets all connections to a parameter group. x-ms-original-file: 2026-05-01-preview/ParameterGroups_ListConnections.json                                     |
| [horizonDbParameterGroupsListVersionsSample.ts][horizondbparametergroupslistversionssample]                       | lists parameter groups filtered by version number. x-ms-original-file: 2026-05-01-preview/ParameterGroups_ListVersions.json                                |
| [horizonDbParameterGroupsUpdateSample.ts][horizondbparametergroupsupdatesample]                                   | updates an existing HorizonDB parameter group. x-ms-original-file: 2026-05-01-preview/ParameterGroups_Update.json                                          |
| [horizonDbPoolsGetSample.ts][horizondbpoolsgetsample]                                                             | gets information about a HorizonDB pool. x-ms-original-file: 2026-05-01-preview/Pools_Get.json                                                             |
| [horizonDbPoolsListSample.ts][horizondbpoolslistsample]                                                           | lists all HorizonDB pools in a cluster. x-ms-original-file: 2026-05-01-preview/Pools_List.json                                                             |
| [horizonDbPrivateEndpointConnectionsDeleteSample.ts][horizondbprivateendpointconnectionsdeletesample]             | deletes a private endpoint connection. x-ms-original-file: 2026-05-01-preview/PrivateEndpointConnections_Delete.json                                       |
| [horizonDbPrivateEndpointConnectionsGetSample.ts][horizondbprivateendpointconnectionsgetsample]                   | gets a private endpoint connection. x-ms-original-file: 2026-05-01-preview/PrivateEndpointConnections_Get.json                                             |
| [horizonDbPrivateEndpointConnectionsListSample.ts][horizondbprivateendpointconnectionslistsample]                 | lists private endpoint connections in a HorizonDB cluster. x-ms-original-file: 2026-05-01-preview/PrivateEndpointConnections_List.json                     |
| [horizonDbPrivateEndpointConnectionsUpdateStatusSample.ts][horizondbprivateendpointconnectionsupdatestatussample] | approves or rejects a private endpoint connection. x-ms-original-file: 2026-05-01-preview/PrivateEndpointConnections_UpdateStatus.json                     |
| [horizonDbPrivateLinkResourcesGetSample.ts][horizondbprivatelinkresourcesgetsample]                               | gets a private link resource. x-ms-original-file: 2026-05-01-preview/PrivateLinkResources_Get.json                                                         |
| [horizonDbPrivateLinkResourcesListSample.ts][horizondbprivatelinkresourceslistsample]                             | lists private link resources in a HorizonDB cluster. x-ms-original-file: 2026-05-01-preview/PrivateLinkResources_List.json                                 |
| [horizonDbReplicasCreateOrUpdateSample.ts][horizondbreplicascreateorupdatesample]                                 | creates a new HorizonDB replica or updates an existing replica. x-ms-original-file: 2026-05-01-preview/Replicas_CreateOrUpdate.json                        |
| [horizonDbReplicasDeleteSample.ts][horizondbreplicasdeletesample]                                                 | deletes a HorizonDB replica. x-ms-original-file: 2026-05-01-preview/Replicas_Delete.json                                                                   |
| [horizonDbReplicasGetSample.ts][horizondbreplicasgetsample]                                                       | gets information about a HorizonDB replica. x-ms-original-file: 2026-05-01-preview/Replicas_Get.json                                                       |
| [horizonDbReplicasListSample.ts][horizondbreplicaslistsample]                                                     | lists all HorizonDB replicas in a pool. x-ms-original-file: 2026-05-01-preview/Replicas_List.json                                                          |
| [horizonDbReplicasUpdateSample.ts][horizondbreplicasupdatesample]                                                 | updates an existing HorizonDB replica (e.g., role). x-ms-original-file: 2026-05-01-preview/Replicas_Update.json                                            |
| [operationsListSample.ts][operationslistsample]                                                                   | list the operations for the provider x-ms-original-file: 2026-05-01-preview/Operations_List.json                                                           |

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
node dist/horizonDbAdministratorsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/horizonDbAdministratorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[horizondbadministratorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbAdministratorsCreateOrUpdateSample.ts
[horizondbadministratorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbAdministratorsDeleteSample.ts
[horizondbadministratorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbAdministratorsGetSample.ts
[horizondbadministratorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbAdministratorsListSample.ts
[horizondbclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbClustersCreateOrUpdateSample.ts
[horizondbclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbClustersDeleteSample.ts
[horizondbclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbClustersGetSample.ts
[horizondbclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbClustersListByResourceGroupSample.ts
[horizondbclusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbClustersListBySubscriptionSample.ts
[horizondbclustersrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbClustersRestartSample.ts
[horizondbclustersstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbClustersStartSample.ts
[horizondbclustersstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbClustersStopSample.ts
[horizondbclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbClustersUpdateSample.ts
[horizondbfirewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbFirewallRulesCreateOrUpdateSample.ts
[horizondbfirewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbFirewallRulesDeleteSample.ts
[horizondbfirewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbFirewallRulesGetSample.ts
[horizondbfirewallruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbFirewallRulesListSample.ts
[horizondbparametergroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbParameterGroupsCreateOrUpdateSample.ts
[horizondbparametergroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbParameterGroupsDeleteSample.ts
[horizondbparametergroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbParameterGroupsGetSample.ts
[horizondbparametergroupslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbParameterGroupsListByResourceGroupSample.ts
[horizondbparametergroupslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbParameterGroupsListBySubscriptionSample.ts
[horizondbparametergroupslistconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbParameterGroupsListConnectionsSample.ts
[horizondbparametergroupslistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbParameterGroupsListVersionsSample.ts
[horizondbparametergroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbParameterGroupsUpdateSample.ts
[horizondbpoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbPoolsGetSample.ts
[horizondbpoolslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbPoolsListSample.ts
[horizondbprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbPrivateEndpointConnectionsDeleteSample.ts
[horizondbprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbPrivateEndpointConnectionsGetSample.ts
[horizondbprivateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbPrivateEndpointConnectionsListSample.ts
[horizondbprivateendpointconnectionsupdatestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbPrivateEndpointConnectionsUpdateStatusSample.ts
[horizondbprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbPrivateLinkResourcesGetSample.ts
[horizondbprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbPrivateLinkResourcesListSample.ts
[horizondbreplicascreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbReplicasCreateOrUpdateSample.ts
[horizondbreplicasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbReplicasDeleteSample.ts
[horizondbreplicasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbReplicasGetSample.ts
[horizondbreplicaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbReplicasListSample.ts
[horizondbreplicasupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/horizonDbReplicasUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-horizondb?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/horizondb/arm-horizondb/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

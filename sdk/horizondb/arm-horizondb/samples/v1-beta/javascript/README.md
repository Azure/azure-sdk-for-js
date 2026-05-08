# @azure/arm-horizondb client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-horizondb in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [horizonDbClustersCreateOrUpdateSample.js][horizondbclusterscreateorupdatesample]                         | creates a new HorizonDb cluster or updates an existing cluster. x-ms-original-file: 2026-01-20-preview/Clusters_CreateOrUpdate.json                        |
| [horizonDbClustersDeleteSample.js][horizondbclustersdeletesample]                                         | deletes a HorizonDb cluster. x-ms-original-file: 2026-01-20-preview/Clusters_Delete.json                                                                   |
| [horizonDbClustersGetSample.js][horizondbclustersgetsample]                                               | gets information about a HorizonDb cluster. x-ms-original-file: 2026-01-20-preview/Clusters_Get.json                                                       |
| [horizonDbClustersListByResourceGroupSample.js][horizondbclusterslistbyresourcegroupsample]               | lists all HorizonDb clusters in a resource group. x-ms-original-file: 2026-01-20-preview/Clusters_ListByResourceGroup.json                                 |
| [horizonDbClustersListBySubscriptionSample.js][horizondbclusterslistbysubscriptionsample]                 | lists all HorizonDb clusters in a subscription. x-ms-original-file: 2026-01-20-preview/Clusters_ListBySubscription.json                                    |
| [horizonDbClustersUpdateSample.js][horizondbclustersupdatesample]                                         | updates an existing HorizonDb cluster (e.g., tags, virtual cores, replica count). x-ms-original-file: 2026-01-20-preview/Clusters_Update.json              |
| [horizonDbFirewallRulesCreateOrUpdateSample.js][horizondbfirewallrulescreateorupdatesample]               | creates a new HorizonDb firewall rule or updates an existing rule. x-ms-original-file: 2026-01-20-preview/FirewallRules_CreateOrUpdate.json                |
| [horizonDbFirewallRulesDeleteSample.js][horizondbfirewallrulesdeletesample]                               | deletes a HorizonDb firewall rule. x-ms-original-file: 2026-01-20-preview/FirewallRules_Delete.json                                                        |
| [horizonDbFirewallRulesGetSample.js][horizondbfirewallrulesgetsample]                                     | gets information about a HorizonDb firewall rule. x-ms-original-file: 2026-01-20-preview/FirewallRules_Get.json                                            |
| [horizonDbFirewallRulesListSample.js][horizondbfirewallruleslistsample]                                   | lists all HorizonDb firewall rules in a pool. x-ms-original-file: 2026-01-20-preview/FirewallRules_List.json                                               |
| [horizonDbParameterGroupsCreateOrUpdateSample.js][horizondbparametergroupscreateorupdatesample]           | creates a new HorizonDb parameter group or updates an existing parameter group. x-ms-original-file: 2026-01-20-preview/ParameterGroups_CreateOrUpdate.json |
| [horizonDbParameterGroupsDeleteSample.js][horizondbparametergroupsdeletesample]                           | deletes a HorizonDb parameter group. x-ms-original-file: 2026-01-20-preview/ParameterGroups_Delete.json                                                    |
| [horizonDbParameterGroupsGetSample.js][horizondbparametergroupsgetsample]                                 | gets information about a HorizonDb parameter group. x-ms-original-file: 2026-01-20-preview/ParameterGroups_Get.json                                        |
| [horizonDbParameterGroupsListByResourceGroupSample.js][horizondbparametergroupslistbyresourcegroupsample] | lists all HorizonDb parameter groups in a resource group. x-ms-original-file: 2026-01-20-preview/ParameterGroups_ListByResourceGroup.json                  |
| [horizonDbParameterGroupsListBySubscriptionSample.js][horizondbparametergroupslistbysubscriptionsample]   | lists all HorizonDb parameter groups in a subscription. x-ms-original-file: 2026-01-20-preview/ParameterGroups_ListBySubscription.json                     |
| [horizonDbParameterGroupsListConnectionsSample.js][horizondbparametergroupslistconnectionssample]         | gets all connections to a parameter group. x-ms-original-file: 2026-01-20-preview/ParameterGroups_ListConnections.json                                     |
| [horizonDbParameterGroupsListVersionsSample.js][horizondbparametergroupslistversionssample]               | lists parameter groups filtered by version number. x-ms-original-file: 2026-01-20-preview/ParameterGroups_ListVersions.json                                |
| [horizonDbParameterGroupsUpdateSample.js][horizondbparametergroupsupdatesample]                           | updates an existing HorizonDb parameter group. x-ms-original-file: 2026-01-20-preview/ParameterGroups_Update.json                                          |
| [horizonDbPoolsGetSample.js][horizondbpoolsgetsample]                                                     | gets information about a HorizonDb pool. x-ms-original-file: 2026-01-20-preview/Pools_Get.json                                                             |
| [horizonDbPoolsListSample.js][horizondbpoolslistsample]                                                   | lists all HorizonDb pools in a cluster. x-ms-original-file: 2026-01-20-preview/Pools_List.json                                                             |
| [horizonDbPrivateEndpointConnectionsDeleteSample.js][horizondbprivateendpointconnectionsdeletesample]     | deletes a private endpoint connection. x-ms-original-file: 2026-01-20-preview/PrivateEndpointConnections_Delete.json                                       |
| [horizonDbPrivateEndpointConnectionsGetSample.js][horizondbprivateendpointconnectionsgetsample]           | gets a private endpoint connection. x-ms-original-file: 2026-01-20-preview/PrivateEndpointConnections_Get.json                                             |
| [horizonDbPrivateEndpointConnectionsListSample.js][horizondbprivateendpointconnectionslistsample]         | lists private endpoint connections in a HorizonDb cluster. x-ms-original-file: 2026-01-20-preview/PrivateEndpointConnections_List.json                     |
| [horizonDbPrivateEndpointConnectionsUpdateSample.js][horizondbprivateendpointconnectionsupdatesample]     | updates a private endpoint connection. x-ms-original-file: 2026-01-20-preview/PrivateEndpointConnections_Update.json                                       |
| [horizonDbPrivateLinkResourcesGetSample.js][horizondbprivatelinkresourcesgetsample]                       | gets a private link resource. x-ms-original-file: 2026-01-20-preview/PrivateLinkResources_Get.json                                                         |
| [horizonDbPrivateLinkResourcesListSample.js][horizondbprivatelinkresourceslistsample]                     | lists private link resources in a HorizonDb cluster. x-ms-original-file: 2026-01-20-preview/PrivateLinkResources_List.json                                 |
| [horizonDbReplicasCreateOrUpdateSample.js][horizondbreplicascreateorupdatesample]                         | creates a new HorizonDb replica or updates an existing replica. x-ms-original-file: 2026-01-20-preview/Replicas_CreateOrUpdate.json                        |
| [horizonDbReplicasDeleteSample.js][horizondbreplicasdeletesample]                                         | deletes a HorizonDb replica. x-ms-original-file: 2026-01-20-preview/Replicas_Delete.json                                                                   |
| [horizonDbReplicasGetSample.js][horizondbreplicasgetsample]                                               | gets information about a HorizonDb replica. x-ms-original-file: 2026-01-20-preview/Replicas_Get.json                                                       |
| [horizonDbReplicasListSample.js][horizondbreplicaslistsample]                                             | lists all HorizonDb replicas in a pool. x-ms-original-file: 2026-01-20-preview/Replicas_List.json                                                          |
| [horizonDbReplicasUpdateSample.js][horizondbreplicasupdatesample]                                         | updates an existing HorizonDb replica (e.g., role). x-ms-original-file: 2026-01-20-preview/Replicas_Update.json                                            |
| [operationsListSample.js][operationslistsample]                                                           | list the operations for the provider x-ms-original-file: 2026-01-20-preview/Operations_List.json                                                           |

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
node horizonDbClustersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node horizonDbClustersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[horizondbclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbClustersCreateOrUpdateSample.js
[horizondbclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbClustersDeleteSample.js
[horizondbclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbClustersGetSample.js
[horizondbclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbClustersListByResourceGroupSample.js
[horizondbclusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbClustersListBySubscriptionSample.js
[horizondbclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbClustersUpdateSample.js
[horizondbfirewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbFirewallRulesCreateOrUpdateSample.js
[horizondbfirewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbFirewallRulesDeleteSample.js
[horizondbfirewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbFirewallRulesGetSample.js
[horizondbfirewallruleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbFirewallRulesListSample.js
[horizondbparametergroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbParameterGroupsCreateOrUpdateSample.js
[horizondbparametergroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbParameterGroupsDeleteSample.js
[horizondbparametergroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbParameterGroupsGetSample.js
[horizondbparametergroupslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbParameterGroupsListByResourceGroupSample.js
[horizondbparametergroupslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbParameterGroupsListBySubscriptionSample.js
[horizondbparametergroupslistconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbParameterGroupsListConnectionsSample.js
[horizondbparametergroupslistversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbParameterGroupsListVersionsSample.js
[horizondbparametergroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbParameterGroupsUpdateSample.js
[horizondbpoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbPoolsGetSample.js
[horizondbpoolslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbPoolsListSample.js
[horizondbprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbPrivateEndpointConnectionsDeleteSample.js
[horizondbprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbPrivateEndpointConnectionsGetSample.js
[horizondbprivateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbPrivateEndpointConnectionsListSample.js
[horizondbprivateendpointconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbPrivateEndpointConnectionsUpdateSample.js
[horizondbprivatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbPrivateLinkResourcesGetSample.js
[horizondbprivatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbPrivateLinkResourcesListSample.js
[horizondbreplicascreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbReplicasCreateOrUpdateSample.js
[horizondbreplicasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbReplicasDeleteSample.js
[horizondbreplicasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbReplicasGetSample.js
[horizondbreplicaslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbReplicasListSample.js
[horizondbreplicasupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/horizonDbReplicasUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/horizondb/arm-horizondb/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-horizondb?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/horizondb/arm-horizondb/README.md

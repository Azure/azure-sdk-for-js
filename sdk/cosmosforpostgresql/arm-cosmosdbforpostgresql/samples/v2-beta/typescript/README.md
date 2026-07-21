# @azure/arm-cosmosdbforpostgresql client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-cosmosdbforpostgresql in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [clustersCheckNameAvailabilitySample.ts][clusterschecknameavailabilitysample]                       | checks availability of a cluster name. Cluster names should be globally unique; at least 3 characters and at most 40 characters long; they must only contain lowercase letters, numbers, and hyphens; and must not start or end with a hyphen. x-ms-original-file: 2023-03-02-preview/CheckNameAvailability.json |
| [clustersCreateSample.ts][clusterscreatesample]                                                     | creates a new cluster with servers. x-ms-original-file: 2023-03-02-preview/ClusterCreateBurstablev1.json                                                                                                                                                                                                         |
| [clustersDeleteSample.ts][clustersdeletesample]                                                     | deletes a cluster together with servers in it. x-ms-original-file: 2023-03-02-preview/ClusterDelete.json                                                                                                                                                                                                         |
| [clustersGetSample.ts][clustersgetsample]                                                           | gets information about a cluster such as compute and storage configuration and cluster lifecycle metadata such as cluster creation date and time. x-ms-original-file: 2023-03-02-preview/ClusterGet.json                                                                                                         |
| [clustersListByResourceGroupSample.ts][clusterslistbyresourcegroupsample]                           | lists all clusters in a resource group. x-ms-original-file: 2023-03-02-preview/ClusterListByResourceGroup.json                                                                                                                                                                                                   |
| [clustersListSample.ts][clusterslistsample]                                                         | lists all clusters in a subscription. x-ms-original-file: 2023-03-02-preview/ClusterList.json                                                                                                                                                                                                                    |
| [clustersPromoteReadReplicaSample.ts][clusterspromotereadreplicasample]                             | promotes read replica cluster to an independent read-write cluster. x-ms-original-file: 2023-03-02-preview/ClusterPromoteReadReplica.json                                                                                                                                                                        |
| [clustersRestartSample.ts][clustersrestartsample]                                                   | restarts all nodes in the cluster. x-ms-original-file: 2023-03-02-preview/ClusterRestart.json                                                                                                                                                                                                                    |
| [clustersStartSample.ts][clustersstartsample]                                                       | starts stopped compute on all cluster nodes. x-ms-original-file: 2023-03-02-preview/ClusterStart.json                                                                                                                                                                                                            |
| [clustersStopSample.ts][clustersstopsample]                                                         | stops compute on all cluster nodes. x-ms-original-file: 2023-03-02-preview/ClusterStop.json                                                                                                                                                                                                                      |
| [clustersUpdateSample.ts][clustersupdatesample]                                                     | updates an existing cluster. The request body can contain one or several properties from the cluster definition. x-ms-original-file: 2023-03-02-preview/ClusterAddNode.json                                                                                                                                      |
| [configurationsGetCoordinatorSample.ts][configurationsgetcoordinatorsample]                         | gets information of a configuration for coordinator. x-ms-original-file: 2023-03-02-preview/ConfigurationGetCoordinator.json                                                                                                                                                                                     |
| [configurationsGetNodeSample.ts][configurationsgetnodesample]                                       | gets information of a configuration for worker nodes. x-ms-original-file: 2023-03-02-preview/ConfigurationGetNode.json                                                                                                                                                                                           |
| [configurationsGetSample.ts][configurationsgetsample]                                               | gets information of a configuration for coordinator and nodes. x-ms-original-file: 2023-03-02-preview/ConfigurationGet.json                                                                                                                                                                                      |
| [configurationsListByClusterSample.ts][configurationslistbyclustersample]                           | list all the configurations of a cluster. x-ms-original-file: 2023-03-02-preview/ConfigurationListByCluster.json                                                                                                                                                                                                 |
| [configurationsListByServerSample.ts][configurationslistbyserversample]                             | list all the configurations of a server in cluster. x-ms-original-file: 2023-03-02-preview/ConfigurationListByServer.json                                                                                                                                                                                        |
| [configurationsUpdateOnCoordinatorSample.ts][configurationsupdateoncoordinatorsample]               | updates configuration of coordinator in a cluster x-ms-original-file: 2023-03-02-preview/ConfigurationUpdateCoordinator.json                                                                                                                                                                                     |
| [configurationsUpdateOnNodeSample.ts][configurationsupdateonnodesample]                             | updates configuration of worker nodes in a cluster x-ms-original-file: 2023-03-02-preview/ConfigurationUpdateNode.json                                                                                                                                                                                           |
| [firewallRulesCreateOrUpdateSample.ts][firewallrulescreateorupdatesample]                           | creates a new cluster firewall rule or updates an existing cluster firewall rule. x-ms-original-file: 2023-03-02-preview/FirewallRuleCreate.json                                                                                                                                                                 |
| [firewallRulesDeleteSample.ts][firewallrulesdeletesample]                                           | deletes a cluster firewall rule. x-ms-original-file: 2023-03-02-preview/FirewallRuleDelete.json                                                                                                                                                                                                                  |
| [firewallRulesGetSample.ts][firewallrulesgetsample]                                                 | gets information about a cluster firewall rule. x-ms-original-file: 2023-03-02-preview/FirewallRuleGet.json                                                                                                                                                                                                      |
| [firewallRulesListByClusterSample.ts][firewallruleslistbyclustersample]                             | lists all the firewall rules on cluster. x-ms-original-file: 2023-03-02-preview/FirewallRuleListByCluster.json                                                                                                                                                                                                   |
| [operationsListSample.ts][operationslistsample]                                                     | list the operations for the provider x-ms-original-file: 2023-03-02-preview/OperationList.json                                                                                                                                                                                                                   |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample] | approves or Rejects a private endpoint connection with a given name. x-ms-original-file: 2023-03-02-preview/PrivateEndpointConnectionCreateOrUpdate.json                                                                                                                                                         |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                 | deletes a private endpoint connection with a given name. x-ms-original-file: 2023-03-02-preview/PrivateEndpointConnectionsDelete.json                                                                                                                                                                            |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                       | gets private endpoint connection. x-ms-original-file: 2023-03-02-preview/PrivateEndpointConnectionsGet.json                                                                                                                                                                                                      |
| [privateEndpointConnectionsListByClusterSample.ts][privateendpointconnectionslistbyclustersample]   | gets list of private endpoint connections on a cluster. x-ms-original-file: 2023-03-02-preview/PrivateEndpointConnectionsListByCluster.json                                                                                                                                                                      |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                   | gets a private link resource for cluster. x-ms-original-file: 2023-03-02-preview/PrivateLinkResourcesGet.json                                                                                                                                                                                                    |
| [privateLinkResourcesListByClusterSample.ts][privatelinkresourceslistbyclustersample]               | gets the private link resources for cluster. x-ms-original-file: 2023-03-02-preview/PrivateLinkResourceListByCluster.json                                                                                                                                                                                        |
| [rolesCreateSample.ts][rolescreatesample]                                                           | creates a new role or updates an existing role. x-ms-original-file: 2023-03-02-preview/RoleCreate.json                                                                                                                                                                                                           |
| [rolesDeleteSample.ts][rolesdeletesample]                                                           | deletes a cluster role. x-ms-original-file: 2023-03-02-preview/RoleDelete.json                                                                                                                                                                                                                                   |
| [rolesGetSample.ts][rolesgetsample]                                                                 | gets information about a cluster role. x-ms-original-file: 2023-03-02-preview/RoleGet.json                                                                                                                                                                                                                       |
| [rolesListByClusterSample.ts][roleslistbyclustersample]                                             | list all the roles in a given cluster. x-ms-original-file: 2023-03-02-preview/RoleListByCluster.json                                                                                                                                                                                                             |
| [serversGetSample.ts][serversgetsample]                                                             | gets information about a server in cluster. x-ms-original-file: 2023-03-02-preview/ServerGet.json                                                                                                                                                                                                                |
| [serversListByClusterSample.ts][serverslistbyclustersample]                                         | lists servers of a cluster. x-ms-original-file: 2023-03-02-preview/ServerListByCluster.json                                                                                                                                                                                                                      |

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
node dist/clustersCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/clustersCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[clusterschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersCheckNameAvailabilitySample.ts
[clusterscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersCreateSample.ts
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersDeleteSample.ts
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersGetSample.ts
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersListByResourceGroupSample.ts
[clusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersListSample.ts
[clusterspromotereadreplicasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersPromoteReadReplicaSample.ts
[clustersrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersRestartSample.ts
[clustersstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersStartSample.ts
[clustersstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersStopSample.ts
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/clustersUpdateSample.ts
[configurationsgetcoordinatorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/configurationsGetCoordinatorSample.ts
[configurationsgetnodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/configurationsGetNodeSample.ts
[configurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/configurationsGetSample.ts
[configurationslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/configurationsListByClusterSample.ts
[configurationslistbyserversample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/configurationsListByServerSample.ts
[configurationsupdateoncoordinatorsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/configurationsUpdateOnCoordinatorSample.ts
[configurationsupdateonnodesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/configurationsUpdateOnNodeSample.ts
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/firewallRulesCreateOrUpdateSample.ts
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/firewallRulesDeleteSample.ts
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/firewallRulesGetSample.ts
[firewallruleslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/firewallRulesListByClusterSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/privateEndpointConnectionsListByClusterSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/privateLinkResourcesListByClusterSample.ts
[rolescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/rolesCreateSample.ts
[rolesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/rolesDeleteSample.ts
[rolesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/rolesGetSample.ts
[roleslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/rolesListByClusterSample.ts
[serversgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/serversGetSample.ts
[serverslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/samples/v2-beta/typescript/src/serversListByClusterSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-cosmosdbforpostgresql?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cosmosforpostgresql/arm-cosmosdbforpostgresql/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

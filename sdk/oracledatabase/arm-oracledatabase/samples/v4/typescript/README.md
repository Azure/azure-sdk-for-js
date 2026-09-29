# @azure/arm-oracledatabase client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-oracledatabase in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [autonomousDatabasesActionSample.ts][autonomousdatabasesactionsample]                                                       | perform Lifecycle Management Action on Autonomous Database x-ms-original-file: 2026-06-01/AutonomousDatabases_Action_MaximumSet_Gen.json                          |
| [cloudExadataInfrastructuresConfigureExascaleSample.ts][cloudexadatainfrastructuresconfigureexascalesample]                 | configures Exascale on Cloud exadata infrastructure resource x-ms-original-file: 2026-06-01/CloudExadataInfrastructures_ConfigureExascale_MaximumSet_Gen.json     |
| [databaseEditionsGetSample.ts][databaseeditionsgetsample]                                                                   | get a DatabaseEdition x-ms-original-file: 2026-06-01/DatabaseEditions_Get_MaximumSet_Gen.json                                                                     |
| [databaseEditionsListByLocationSample.ts][databaseeditionslistbylocationsample]                                             | list DatabaseEdition resources by SubscriptionLocationResource x-ms-original-file: 2026-06-01/DatabaseEditions_ListByLocation_MaximumSet_Gen.json                 |
| [databaseSystemShapeResourcesGetSample.ts][databasesystemshaperesourcesgetsample]                                           | get a DatabaseSystemShape x-ms-original-file: 2026-06-01/DatabaseSystemShapeResources_Get_MaximumSet_Gen.json                                                     |
| [databaseSystemShapeResourcesListByLocationSample.ts][databasesystemshaperesourceslistbylocationsample]                     | list DatabaseSystemShape resources by SubscriptionLocationResource x-ms-original-file: 2026-06-01/DatabaseSystemShapeResources_ListByLocation_MaximumSet_Gen.json |
| [dbSystemsCreateOrUpdateSample.ts][dbsystemscreateorupdatesample]                                                           | create a DbSystem x-ms-original-file: 2026-06-01/DbSystems_CreateOrUpdate_MaximumSet_Gen.json                                                                     |
| [dbSystemsDeleteSample.ts][dbsystemsdeletesample]                                                                           | delete a DbSystem x-ms-original-file: 2026-06-01/DbSystems_Delete_MaximumSet_Gen.json                                                                             |
| [dbSystemsGetSample.ts][dbsystemsgetsample]                                                                                 | get a DbSystem x-ms-original-file: 2026-06-01/DbSystems_Get_MaximumSet_Gen.json                                                                                   |
| [dbSystemsListByResourceGroupSample.ts][dbsystemslistbyresourcegroupsample]                                                 | list DbSystem resources by resource group x-ms-original-file: 2026-06-01/DbSystems_ListByResourceGroup_MaximumSet_Gen.json                                        |
| [dbSystemsListBySubscriptionSample.ts][dbsystemslistbysubscriptionsample]                                                   | list DbSystem resources by subscription ID x-ms-original-file: 2026-06-01/DbSystems_ListBySubscription_MaximumSet_Gen.json                                        |
| [dbSystemsUpdateSample.ts][dbsystemsupdatesample]                                                                           | update a DbSystem x-ms-original-file: 2026-06-01/DbSystems_Update_MaximumSet_Gen.json                                                                             |
| [dbVersionsGetSample.ts][dbversionsgetsample]                                                                               | get a DbVersion x-ms-original-file: 2026-06-01/DbVersions_Get_MaximumSet_Gen.json                                                                                 |
| [dbVersionsListByLocationSample.ts][dbversionslistbylocationsample]                                                         | list DbVersion resources by SubscriptionLocationResource x-ms-original-file: 2026-06-01/DbVersions_ListByLocation_MaximumSet_Gen.json                             |
| [exadbVmClustersCreateOrUpdateSample.ts][exadbvmclusterscreateorupdatesample]                                               | create a ExadbVmCluster x-ms-original-file: 2026-06-01/ExadbVmClusters_CreateOrUpdate_MaximumSet_Gen.json                                                         |
| [exadbVmClustersDeleteSample.ts][exadbvmclustersdeletesample]                                                               | delete a ExadbVmCluster x-ms-original-file: 2026-06-01/ExadbVmClusters_Delete_MaximumSet_Gen.json                                                                 |
| [exadbVmClustersGetSample.ts][exadbvmclustersgetsample]                                                                     | get a ExadbVmCluster x-ms-original-file: 2026-06-01/ExadbVmClusters_Get_MaximumSet_Gen.json                                                                       |
| [exadbVmClustersListByResourceGroupSample.ts][exadbvmclusterslistbyresourcegroupsample]                                     | list ExadbVmCluster resources by resource group x-ms-original-file: 2026-06-01/ExadbVmClusters_ListByResourceGroup_MaximumSet_Gen.json                            |
| [exadbVmClustersListBySubscriptionSample.ts][exadbvmclusterslistbysubscriptionsample]                                       | list ExadbVmCluster resources by subscription ID x-ms-original-file: 2026-06-01/ExadbVmClusters_ListBySubscription_MaximumSet_Gen.json                            |
| [exadbVmClustersRemoveVmsSample.ts][exadbvmclustersremovevmssample]                                                         | remove VMs from the VM Cluster x-ms-original-file: 2026-06-01/ExadbVmClusters_RemoveVms_MaximumSet_Gen.json                                                       |
| [exadbVmClustersUpdateSample.ts][exadbvmclustersupdatesample]                                                               | update a ExadbVmCluster x-ms-original-file: 2026-06-01/ExadbVmClusters_Update_MaximumSet_Gen.json                                                                 |
| [exascaleDbNodesActionSample.ts][exascaledbnodesactionsample]                                                               | vM actions on DbNode of ExadbVmCluster by the provided filter x-ms-original-file: 2026-06-01/ExascaleDbNodes_Action_MaximumSet_Gen.json                           |
| [exascaleDbNodesGetSample.ts][exascaledbnodesgetsample]                                                                     | get a ExascaleDbNode x-ms-original-file: 2026-06-01/ExascaleDbNodes_Get_MaximumSet_Gen.json                                                                       |
| [exascaleDbNodesListByParentSample.ts][exascaledbnodeslistbyparentsample]                                                   | list ExascaleDbNode resources by ExadbVmCluster x-ms-original-file: 2026-06-01/ExascaleDbNodes_ListByParent_MaximumSet_Gen.json                                   |
| [exascaleDbStorageVaultsCreateSample.ts][exascaledbstoragevaultscreatesample]                                               | create a ExascaleDbStorageVault x-ms-original-file: 2026-06-01/ExascaleDbStorageVaults_Create_MaximumSet_Gen.json                                                 |
| [exascaleDbStorageVaultsDeleteSample.ts][exascaledbstoragevaultsdeletesample]                                               | delete a ExascaleDbStorageVault x-ms-original-file: 2026-06-01/ExascaleDbStorageVaults_Delete_MaximumSet_Gen.json                                                 |
| [exascaleDbStorageVaultsGetSample.ts][exascaledbstoragevaultsgetsample]                                                     | get a ExascaleDbStorageVault x-ms-original-file: 2026-06-01/ExascaleDbStorageVaults_Get_MaximumSet_Gen.json                                                       |
| [exascaleDbStorageVaultsListByResourceGroupSample.ts][exascaledbstoragevaultslistbyresourcegroupsample]                     | list ExascaleDbStorageVault resources by resource group x-ms-original-file: 2026-06-01/ExascaleDbStorageVaults_ListByResourceGroup_MaximumSet_Gen.json            |
| [exascaleDbStorageVaultsListBySubscriptionSample.ts][exascaledbstoragevaultslistbysubscriptionsample]                       | list ExascaleDbStorageVault resources by subscription ID x-ms-original-file: 2026-06-01/ExascaleDbStorageVaults_ListBySubscription_MaximumSet_Gen.json            |
| [exascaleDbStorageVaultsUpdateSample.ts][exascaledbstoragevaultsupdatesample]                                               | update a ExascaleDbStorageVault x-ms-original-file: 2026-06-01/ExascaleDbStorageVaults_Update_MaximumSet_Gen.json                                                 |
| [flexComponentsGetSample.ts][flexcomponentsgetsample]                                                                       | get a FlexComponent x-ms-original-file: 2026-06-01/FlexComponents_Get_MaximumSet_Gen.json                                                                         |
| [flexComponentsListByParentSample.ts][flexcomponentslistbyparentsample]                                                     | list FlexComponent resources by SubscriptionLocationResource x-ms-original-file: 2026-06-01/FlexComponents_ListByParent_MaximumSet_Gen.json                       |
| [giMinorVersionsGetSample.ts][giminorversionsgetsample]                                                                     | get a GiMinorVersion x-ms-original-file: 2026-06-01/GiMinorVersions_Get_MaximumSet_Gen.json                                                                       |
| [giMinorVersionsListByParentSample.ts][giminorversionslistbyparentsample]                                                   | list GiMinorVersion resources by GiVersion x-ms-original-file: 2026-06-01/GiMinorVersions_ListByParent_MaximumSet_Gen.json                                        |
| [giVersionsListByLocationSample.ts][giversionslistbylocationsample]                                                         | list GiVersion resources by SubscriptionLocationResource x-ms-original-file: 2026-06-01/GiVersions_ListByLocation_MaximumSet_Gen.json                             |
| [goldenGateConnectionsAssignDeploymentSample.ts][goldengateconnectionsassigndeploymentsample]                               | assign a GoldenGate deployment to a connection. x-ms-original-file: 2026-06-01/GoldenGateConnections_AssignDeployment_MaximumSet_Gen.json                         |
| [goldenGateConnectionsCreateOrUpdateSample.ts][goldengateconnectionscreateorupdatesample]                                   | create a GoldenGateConnection x-ms-original-file: 2026-06-01/GoldenGateConnections_CreateOrUpdate_MaximumSet_Gen.json                                             |
| [goldenGateConnectionsDeleteSample.ts][goldengateconnectionsdeletesample]                                                   | delete a GoldenGateConnection x-ms-original-file: 2026-06-01/GoldenGateConnections_Delete_MaximumSet_Gen.json                                                     |
| [goldenGateConnectionsGetAssignedDeploymentSample.ts][goldengateconnectionsgetassigneddeploymentsample]                     | get assigned deployment by GoldenGate connection. x-ms-original-file: 2026-06-01/GoldenGateConnections_GetAssignedDeployment_MaximumSet_Gen.json                  |
| [goldenGateConnectionsGetSample.ts][goldengateconnectionsgetsample]                                                         | get a GoldenGateConnection x-ms-original-file: 2026-06-01/GoldenGateConnections_Get_MaximumSet_Gen.json                                                           |
| [goldenGateConnectionsListAssignedDeploymentsByParentSample.ts][goldengateconnectionslistassigneddeploymentsbyparentsample] | list assigned deployments by GoldenGate connection. x-ms-original-file: 2026-06-01/GoldenGateConnections_ListAssignedDeploymentsByParent_MaximumSet_Gen.json      |
| [goldenGateConnectionsListByResourceGroupSample.ts][goldengateconnectionslistbyresourcegroupsample]                         | list GoldenGateConnection resources by resource group x-ms-original-file: 2026-06-01/GoldenGateConnections_ListByResourceGroup_MaximumSet_Gen.json                |
| [goldenGateConnectionsListBySubscriptionSample.ts][goldengateconnectionslistbysubscriptionsample]                           | list GoldenGateConnection resources by subscription ID x-ms-original-file: 2026-06-01/GoldenGateConnections_ListBySubscription_MaximumSet_Gen.json                |
| [goldenGateConnectionsUnassignDeploymentSample.ts][goldengateconnectionsunassigndeploymentsample]                           | unassign a GoldenGate deployment from a connection. x-ms-original-file: 2026-06-01/GoldenGateConnections_UnassignDeployment_MaximumSet_Gen.json                   |
| [goldenGateConnectionsUpdateSample.ts][goldengateconnectionsupdatesample]                                                   | update a GoldenGateConnection x-ms-original-file: 2026-06-01/GoldenGateConnections_Update_MaximumSet_Gen.json                                                     |
| [goldenGateDeploymentsAssignConnectionSample.ts][goldengatedeploymentsassignconnectionsample]                               | assign a GoldenGate connection to a deployment. x-ms-original-file: 2026-06-01/GoldenGateDeployments_AssignConnection_MaximumSet_Gen.json                         |
| [goldenGateDeploymentsCreateOrUpdateSample.ts][goldengatedeploymentscreateorupdatesample]                                   | create a GoldenGateDeployment x-ms-original-file: 2026-06-01/GoldenGateDeployments_CreateOrUpdate_MaximumSet_Gen.json                                             |
| [goldenGateDeploymentsDeleteSample.ts][goldengatedeploymentsdeletesample]                                                   | delete a GoldenGateDeployment x-ms-original-file: 2026-06-01/GoldenGateDeployments_Delete_MaximumSet_Gen.json                                                     |
| [goldenGateDeploymentsGetAssignedConnectionSample.ts][goldengatedeploymentsgetassignedconnectionsample]                     | get assigned connection by GoldenGate deployment. x-ms-original-file: 2026-06-01/GoldenGateDeployments_GetAssignedConnection_MaximumSet_Gen.json                  |
| [goldenGateDeploymentsGetSample.ts][goldengatedeploymentsgetsample]                                                         | get a GoldenGateDeployment x-ms-original-file: 2026-06-01/GoldenGateDeployments_Get_MaximumSet_Gen.json                                                           |
| [goldenGateDeploymentsListAssignedConnectionsByParentSample.ts][goldengatedeploymentslistassignedconnectionsbyparentsample] | list assigned connections by GoldenGate deployment. x-ms-original-file: 2026-06-01/GoldenGateDeployments_ListAssignedConnectionsByParent_MaximumSet_Gen.json      |
| [goldenGateDeploymentsListByResourceGroupSample.ts][goldengatedeploymentslistbyresourcegroupsample]                         | list GoldenGateDeployment resources by resource group x-ms-original-file: 2026-06-01/GoldenGateDeployments_ListByResourceGroup_MaximumSet_Gen.json                |
| [goldenGateDeploymentsListBySubscriptionSample.ts][goldengatedeploymentslistbysubscriptionsample]                           | list GoldenGateDeployment resources by subscription ID x-ms-original-file: 2026-06-01/GoldenGateDeployments_ListBySubscription_MaximumSet_Gen.json                |
| [goldenGateDeploymentsUnassignConnectionSample.ts][goldengatedeploymentsunassignconnectionsample]                           | unassign a GoldenGate connection from a deployment. x-ms-original-file: 2026-06-01/GoldenGateDeployments_UnassignConnection_MaximumSet_Gen.json                   |
| [goldenGateDeploymentsUpdateSample.ts][goldengatedeploymentsupdatesample]                                                   | update a GoldenGateDeployment x-ms-original-file: 2026-06-01/GoldenGateDeployments_Update_MaximumSet_Gen.json                                                     |
| [networkAnchorsCreateOrUpdateSample.ts][networkanchorscreateorupdatesample]                                                 | create a NetworkAnchor x-ms-original-file: 2026-06-01/NetworkAnchors_CreateOrUpdate_MaximumSet_Gen.json                                                           |
| [networkAnchorsDeleteSample.ts][networkanchorsdeletesample]                                                                 | delete a NetworkAnchor x-ms-original-file: 2026-06-01/NetworkAnchors_Delete_MaximumSet_Gen.json                                                                   |
| [networkAnchorsGetSample.ts][networkanchorsgetsample]                                                                       | get a NetworkAnchor x-ms-original-file: 2026-06-01/NetworkAnchors_Get_MaximumSet_Gen.json                                                                         |
| [networkAnchorsListByResourceGroupSample.ts][networkanchorslistbyresourcegroupsample]                                       | list NetworkAnchor resources by resource group x-ms-original-file: 2026-06-01/NetworkAnchors_ListByResourceGroup_MaximumSet_Gen.json                              |
| [networkAnchorsListBySubscriptionSample.ts][networkanchorslistbysubscriptionsample]                                         | list NetworkAnchor resources by subscription ID x-ms-original-file: 2026-06-01/NetworkAnchors_ListBySubscription_MaximumSet_Gen.json                              |
| [networkAnchorsUpdateSample.ts][networkanchorsupdatesample]                                                                 | update a NetworkAnchor x-ms-original-file: 2026-06-01/NetworkAnchors_Update_MaximumSet_Gen.json                                                                   |
| [resourceAnchorsCreateOrUpdateSample.ts][resourceanchorscreateorupdatesample]                                               | create a ResourceAnchor x-ms-original-file: 2026-06-01/ResourceAnchors_CreateOrUpdate_MaximumSet_Gen.json                                                         |
| [resourceAnchorsDeleteSample.ts][resourceanchorsdeletesample]                                                               | delete a ResourceAnchor x-ms-original-file: 2026-06-01/ResourceAnchors_Delete_MaximumSet_Gen.json                                                                 |
| [resourceAnchorsGetSample.ts][resourceanchorsgetsample]                                                                     | get a ResourceAnchor x-ms-original-file: 2026-06-01/ResourceAnchors_Get_MaximumSet_Gen.json                                                                       |
| [resourceAnchorsListByResourceGroupSample.ts][resourceanchorslistbyresourcegroupsample]                                     | list ResourceAnchor resources by resource group x-ms-original-file: 2026-06-01/ResourceAnchors_ListByResourceGroup_MaximumSet_Gen.json                            |
| [resourceAnchorsListBySubscriptionSample.ts][resourceanchorslistbysubscriptionsample]                                       | list ResourceAnchor resources by subscription ID x-ms-original-file: 2026-06-01/ResourceAnchors_ListBySubscription_MaximumSet_Gen.json                            |
| [resourceAnchorsUpdateSample.ts][resourceanchorsupdatesample]                                                               | update a ResourceAnchor x-ms-original-file: 2026-06-01/ResourceAnchors_Update_MaximumSet_Gen.json                                                                 |

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
node dist/autonomousDatabasesActionSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/autonomousDatabasesActionSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[autonomousdatabasesactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/autonomousDatabasesActionSample.ts
[cloudexadatainfrastructuresconfigureexascalesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/cloudExadataInfrastructuresConfigureExascaleSample.ts
[databaseeditionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/databaseEditionsGetSample.ts
[databaseeditionslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/databaseEditionsListByLocationSample.ts
[databasesystemshaperesourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/databaseSystemShapeResourcesGetSample.ts
[databasesystemshaperesourceslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/databaseSystemShapeResourcesListByLocationSample.ts
[dbsystemscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/dbSystemsCreateOrUpdateSample.ts
[dbsystemsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/dbSystemsDeleteSample.ts
[dbsystemsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/dbSystemsGetSample.ts
[dbsystemslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/dbSystemsListByResourceGroupSample.ts
[dbsystemslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/dbSystemsListBySubscriptionSample.ts
[dbsystemsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/dbSystemsUpdateSample.ts
[dbversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/dbVersionsGetSample.ts
[dbversionslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/dbVersionsListByLocationSample.ts
[exadbvmclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exadbVmClustersCreateOrUpdateSample.ts
[exadbvmclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exadbVmClustersDeleteSample.ts
[exadbvmclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exadbVmClustersGetSample.ts
[exadbvmclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exadbVmClustersListByResourceGroupSample.ts
[exadbvmclusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exadbVmClustersListBySubscriptionSample.ts
[exadbvmclustersremovevmssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exadbVmClustersRemoveVmsSample.ts
[exadbvmclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exadbVmClustersUpdateSample.ts
[exascaledbnodesactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exascaleDbNodesActionSample.ts
[exascaledbnodesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exascaleDbNodesGetSample.ts
[exascaledbnodeslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exascaleDbNodesListByParentSample.ts
[exascaledbstoragevaultscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exascaleDbStorageVaultsCreateSample.ts
[exascaledbstoragevaultsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exascaleDbStorageVaultsDeleteSample.ts
[exascaledbstoragevaultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exascaleDbStorageVaultsGetSample.ts
[exascaledbstoragevaultslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exascaleDbStorageVaultsListByResourceGroupSample.ts
[exascaledbstoragevaultslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exascaleDbStorageVaultsListBySubscriptionSample.ts
[exascaledbstoragevaultsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/exascaleDbStorageVaultsUpdateSample.ts
[flexcomponentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/flexComponentsGetSample.ts
[flexcomponentslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/flexComponentsListByParentSample.ts
[giminorversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/giMinorVersionsGetSample.ts
[giminorversionslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/giMinorVersionsListByParentSample.ts
[giversionslistbylocationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/giVersionsListByLocationSample.ts
[goldengateconnectionsassigndeploymentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateConnectionsAssignDeploymentSample.ts
[goldengateconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateConnectionsCreateOrUpdateSample.ts
[goldengateconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateConnectionsDeleteSample.ts
[goldengateconnectionsgetassigneddeploymentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateConnectionsGetAssignedDeploymentSample.ts
[goldengateconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateConnectionsGetSample.ts
[goldengateconnectionslistassigneddeploymentsbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateConnectionsListAssignedDeploymentsByParentSample.ts
[goldengateconnectionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateConnectionsListByResourceGroupSample.ts
[goldengateconnectionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateConnectionsListBySubscriptionSample.ts
[goldengateconnectionsunassigndeploymentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateConnectionsUnassignDeploymentSample.ts
[goldengateconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateConnectionsUpdateSample.ts
[goldengatedeploymentsassignconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateDeploymentsAssignConnectionSample.ts
[goldengatedeploymentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateDeploymentsCreateOrUpdateSample.ts
[goldengatedeploymentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateDeploymentsDeleteSample.ts
[goldengatedeploymentsgetassignedconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateDeploymentsGetAssignedConnectionSample.ts
[goldengatedeploymentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateDeploymentsGetSample.ts
[goldengatedeploymentslistassignedconnectionsbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateDeploymentsListAssignedConnectionsByParentSample.ts
[goldengatedeploymentslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateDeploymentsListByResourceGroupSample.ts
[goldengatedeploymentslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateDeploymentsListBySubscriptionSample.ts
[goldengatedeploymentsunassignconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateDeploymentsUnassignConnectionSample.ts
[goldengatedeploymentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/goldenGateDeploymentsUpdateSample.ts
[networkanchorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/networkAnchorsCreateOrUpdateSample.ts
[networkanchorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/networkAnchorsDeleteSample.ts
[networkanchorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/networkAnchorsGetSample.ts
[networkanchorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/networkAnchorsListByResourceGroupSample.ts
[networkanchorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/networkAnchorsListBySubscriptionSample.ts
[networkanchorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/networkAnchorsUpdateSample.ts
[resourceanchorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/resourceAnchorsCreateOrUpdateSample.ts
[resourceanchorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/resourceAnchorsDeleteSample.ts
[resourceanchorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/resourceAnchorsGetSample.ts
[resourceanchorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/resourceAnchorsListByResourceGroupSample.ts
[resourceanchorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/resourceAnchorsListBySubscriptionSample.ts
[resourceanchorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/oracledatabase/arm-oracledatabase/samples/v4/typescript/src/resourceAnchorsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-oracledatabase
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/oracledatabase/arm-oracledatabase/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

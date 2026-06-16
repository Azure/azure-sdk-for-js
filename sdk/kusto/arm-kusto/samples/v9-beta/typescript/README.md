# @azure/arm-kusto client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-kusto in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [attachedDatabaseConfigurationsCheckNameAvailabilitySample.ts][attacheddatabaseconfigurationschecknameavailabilitysample] | checks that the attached database configuration resource name is valid and is not already in use. x-ms-original-file: 2025-02-14/KustoAttachedDatabaseConfigurationCheckNameAvailability.json |
| [attachedDatabaseConfigurationsCreateOrUpdateSample.ts][attacheddatabaseconfigurationscreateorupdatesample]               | creates or updates an attached database configuration. x-ms-original-file: 2025-02-14/KustoAttachedDatabaseConfigurationsCreateOrUpdate.json                                                  |
| [attachedDatabaseConfigurationsDeleteSample.ts][attacheddatabaseconfigurationsdeletesample]                               | deletes the attached database configuration with the given name. x-ms-original-file: 2025-02-14/KustoAttachedDatabaseConfigurationsDelete.json                                                |
| [attachedDatabaseConfigurationsGetSample.ts][attacheddatabaseconfigurationsgetsample]                                     | returns an attached database configuration. x-ms-original-file: 2025-02-14/KustoAttachedDatabaseConfigurationsGet.json                                                                        |
| [attachedDatabaseConfigurationsListByClusterSample.ts][attacheddatabaseconfigurationslistbyclustersample]                 | returns the list of attached database configurations of the given Kusto cluster. x-ms-original-file: 2025-02-14/KustoAttachedDatabaseConfigurationsListByCluster.json                         |
| [clusterPrincipalAssignmentsCheckNameAvailabilitySample.ts][clusterprincipalassignmentschecknameavailabilitysample]       | checks that the principal assignment name is valid and is not already in use. x-ms-original-file: 2025-02-14/KustoClusterPrincipalAssignmentsCheckNameAvailability.json                       |
| [clusterPrincipalAssignmentsCreateOrUpdateSample.ts][clusterprincipalassignmentscreateorupdatesample]                     | create a Kusto cluster principalAssignment. x-ms-original-file: 2025-02-14/KustoClusterPrincipalAssignmentsCreateOrUpdate.json                                                                |
| [clusterPrincipalAssignmentsDeleteSample.ts][clusterprincipalassignmentsdeletesample]                                     | deletes a Kusto cluster principalAssignment. x-ms-original-file: 2025-02-14/KustoClusterPrincipalAssignmentsDelete.json                                                                       |
| [clusterPrincipalAssignmentsGetSample.ts][clusterprincipalassignmentsgetsample]                                           | gets a Kusto cluster principalAssignment. x-ms-original-file: 2025-02-14/KustoClusterPrincipalAssignmentsGet.json                                                                             |
| [clusterPrincipalAssignmentsListSample.ts][clusterprincipalassignmentslistsample]                                         | lists all Kusto cluster principalAssignments. x-ms-original-file: 2025-02-14/KustoClusterPrincipalAssignmentsList.json                                                                        |
| [clustersAddCalloutPoliciesSample.ts][clustersaddcalloutpoliciessample]                                                   | adds a list of callout policies for engine services. x-ms-original-file: 2025-02-14/KustoClusterAddCalloutPolicies.json                                                                       |
| [clustersAddLanguageExtensionsSample.ts][clustersaddlanguageextensionssample]                                             | add a list of language extensions that can run within KQL queries. x-ms-original-file: 2025-02-14/KustoClusterAddLanguageExtensions.json                                                      |
| [clustersCheckNameAvailabilitySample.ts][clusterschecknameavailabilitysample]                                             | checks that the cluster name is valid and is not already in use. x-ms-original-file: 2025-02-14/KustoClustersCheckNameAvailability.json                                                       |
| [clustersCreateOrUpdateSample.ts][clusterscreateorupdatesample]                                                           | create or update a Kusto cluster. x-ms-original-file: 2025-02-14/KustoClusterCreateWithCMKFederatedIdentity.json                                                                              |
| [clustersDeleteSample.ts][clustersdeletesample]                                                                           | deletes a Kusto cluster. x-ms-original-file: 2025-02-14/KustoClustersDelete.json                                                                                                              |
| [clustersDetachFollowerDatabasesSample.ts][clustersdetachfollowerdatabasessample]                                         | detaches all followers of a database owned by this cluster. x-ms-original-file: 2025-02-14/KustoClusterDetachFollowerDatabases.json                                                           |
| [clustersDiagnoseVirtualNetworkSample.ts][clustersdiagnosevirtualnetworksample]                                           | diagnoses network connectivity status for external resources on which the service is dependent on. x-ms-original-file: 2025-02-14/KustoClustersDiagnoseVirtualNetwork.json                    |
| [clustersGetSample.ts][clustersgetsample]                                                                                 | gets a Kusto cluster. x-ms-original-file: 2025-02-14/KustoClustersGet.json                                                                                                                    |
| [clustersListByResourceGroupSample.ts][clusterslistbyresourcegroupsample]                                                 | lists all Kusto clusters within a resource group. x-ms-original-file: 2025-02-14/KustoClustersListByResourceGroup.json                                                                        |
| [clustersListCalloutPoliciesSample.ts][clusterslistcalloutpoliciessample]                                                 | returns the allowed callout policies for the specified service. x-ms-original-file: 2025-02-14/KustoClustersListCalloutPolicies.json                                                          |
| [clustersListFollowerDatabasesGetSample.ts][clusterslistfollowerdatabasesgetsample]                                       | returns a list of databases that are owned by this cluster and were followed by another cluster. x-ms-original-file: 2025-02-14/KustoClusterListFollowerDatabasesGet.json                     |
| [clustersListFollowerDatabasesSample.ts][clusterslistfollowerdatabasessample]                                             | returns a list of databases that are owned by this cluster and were followed by another cluster. x-ms-original-file: 2025-02-14/KustoClusterListFollowerDatabases.json                        |
| [clustersListLanguageExtensionsSample.ts][clusterslistlanguageextensionssample]                                           | returns a list of language extensions that can run within KQL queries. x-ms-original-file: 2025-02-14/KustoClusterListLanguageExtensions.json                                                 |
| [clustersListOutboundNetworkDependenciesEndpointsSample.ts][clusterslistoutboundnetworkdependenciesendpointssample]       | gets the network endpoints of all outbound dependencies of a Kusto cluster x-ms-original-file: 2025-02-14/KustoOutboundNetworkDependenciesList.json                                           |
| [clustersListSample.ts][clusterslistsample]                                                                               | lists all Kusto clusters within a subscription. x-ms-original-file: 2025-02-14/KustoClustersList.json                                                                                         |
| [clustersListSkusByResourceSample.ts][clusterslistskusbyresourcesample]                                                   | returns the SKUs available for the provided resource. x-ms-original-file: 2025-02-14/KustoClustersListResourceSkus.json                                                                       |
| [clustersListSkusSample.ts][clusterslistskussample]                                                                       | lists eligible SKUs for Kusto resource provider. x-ms-original-file: 2025-02-14/KustoClustersListSkus.json                                                                                    |
| [clustersMigrateSample.ts][clustersmigratesample]                                                                         | migrate data from a Kusto cluster to another cluster. x-ms-original-file: 2025-02-14/KustoClusterMigrate.json                                                                                 |
| [clustersRemoveCalloutPolicySample.ts][clustersremovecalloutpolicysample]                                                 | removes callout policy for engine services. x-ms-original-file: 2025-02-14/KustoClusterRemoveCalloutPolicy.json                                                                               |
| [clustersRemoveLanguageExtensionsSample.ts][clustersremovelanguageextensionssample]                                       | remove a list of language extensions that can run within KQL queries. x-ms-original-file: 2025-02-14/KustoClusterRemoveLanguageExtensions.json                                                |
| [clustersStartSample.ts][clustersstartsample]                                                                             | starts a Kusto cluster. x-ms-original-file: 2025-02-14/KustoClustersStart.json                                                                                                                |
| [clustersStopSample.ts][clustersstopsample]                                                                               | stops a Kusto cluster. x-ms-original-file: 2025-02-14/KustoClustersStop.json                                                                                                                  |
| [clustersUpdateSample.ts][clustersupdatesample]                                                                           | update a Kusto cluster. x-ms-original-file: 2025-02-14/KustoClusterUpdateCMKKeyRotation.json                                                                                                  |
| [dataConnectionsCheckNameAvailabilitySample.ts][dataconnectionschecknameavailabilitysample]                               | checks that the data connection name is valid and is not already in use. x-ms-original-file: 2025-02-14/KustoDataConnectionsCheckNameAvailability.json                                        |
| [dataConnectionsCreateOrUpdateSample.ts][dataconnectionscreateorupdatesample]                                             | creates or updates a data connection. x-ms-original-file: 2025-02-14/KustoDataConnectionsCosmosDbCreateOrUpdate.json                                                                          |
| [dataConnectionsDataConnectionValidationSample.ts][dataconnectionsdataconnectionvalidationsample]                         | checks that the data connection parameters are valid. x-ms-original-file: 2025-02-14/KustoDataConnectionEventGridValidationAsync.json                                                         |
| [dataConnectionsDeleteSample.ts][dataconnectionsdeletesample]                                                             | deletes the data connection with the given name. x-ms-original-file: 2025-02-14/KustoDataConnectionsDelete.json                                                                               |
| [dataConnectionsGetSample.ts][dataconnectionsgetsample]                                                                   | returns a data connection. x-ms-original-file: 2025-02-14/KustoDataConnectionsCosmosDbGet.json                                                                                                |
| [dataConnectionsListByDatabaseSample.ts][dataconnectionslistbydatabasesample]                                             | returns the list of data connections of the given Kusto database. x-ms-original-file: 2025-02-14/KustoDataConnectionsListByDatabase.json                                                      |
| [dataConnectionsUpdateSample.ts][dataconnectionsupdatesample]                                                             | updates a data connection. x-ms-original-file: 2025-02-14/KustoDataConnectionsCosmosDbUpdate.json                                                                                             |
| [databaseInviteFollowerSample.ts][databaseinvitefollowersample]                                                           | generates an invitation token that allows attaching a follower database to this database. x-ms-original-file: 2025-02-14/KustoDatabaseInviteFollower.json                                     |
| [databasePrincipalAssignmentsCheckNameAvailabilitySample.ts][databaseprincipalassignmentschecknameavailabilitysample]     | checks that the database principal assignment is valid and is not already in use. x-ms-original-file: 2025-02-14/KustoDatabasePrincipalAssignmentsCheckNameAvailability.json                  |
| [databasePrincipalAssignmentsCreateOrUpdateSample.ts][databaseprincipalassignmentscreateorupdatesample]                   | creates a Kusto cluster database principalAssignment. x-ms-original-file: 2025-02-14/KustoDatabasePrincipalAssignmentsCreateOrUpdate.json                                                     |
| [databasePrincipalAssignmentsDeleteSample.ts][databaseprincipalassignmentsdeletesample]                                   | deletes a Kusto principalAssignment. x-ms-original-file: 2025-02-14/KustoDatabasePrincipalAssignmentsDelete.json                                                                              |
| [databasePrincipalAssignmentsGetSample.ts][databaseprincipalassignmentsgetsample]                                         | gets a Kusto cluster database principalAssignment. x-ms-original-file: 2025-02-14/KustoDatabasePrincipalAssignmentsGet.json                                                                   |
| [databasePrincipalAssignmentsListSample.ts][databaseprincipalassignmentslistsample]                                       | lists all Kusto cluster database principalAssignments. x-ms-original-file: 2025-02-14/KustoDatabasePrincipalAssignmentsList.json                                                              |
| [databasesAddPrincipalsSample.ts][databasesaddprincipalssample]                                                           | add Database principals permissions. x-ms-original-file: 2025-02-14/KustoDatabaseAddPrincipals.json                                                                                           |
| [databasesCheckNameAvailabilitySample.ts][databaseschecknameavailabilitysample]                                           | checks that the databases resource name is valid and is not already in use. x-ms-original-file: 2025-02-14/KustoDatabasesCheckNameAvailability.json                                           |
| [databasesCreateOrUpdateSample.ts][databasescreateorupdatesample]                                                         | creates or updates a database. x-ms-original-file: 2025-02-14/KustoDatabaseReadonlyUpdate.json                                                                                                |
| [databasesDeleteSample.ts][databasesdeletesample]                                                                         | deletes the database with the given name. x-ms-original-file: 2025-02-14/KustoDatabasesDelete.json                                                                                            |
| [databasesGetSample.ts][databasesgetsample]                                                                               | returns a database. x-ms-original-file: 2025-02-14/KustoDatabasesGet.json                                                                                                                     |
| [databasesListByClusterSample.ts][databaseslistbyclustersample]                                                           | returns the list of databases of the given Kusto cluster. x-ms-original-file: 2025-02-14/KustoDatabasesListByCluster.json                                                                     |
| [databasesListPrincipalsSample.ts][databaseslistprincipalssample]                                                         | returns a list of database principals of the given Kusto cluster and database. x-ms-original-file: 2025-02-14/KustoDatabaseListPrincipals.json                                                |
| [databasesRemovePrincipalsSample.ts][databasesremoveprincipalssample]                                                     | remove Database principals permissions. x-ms-original-file: 2025-02-14/KustoDatabaseRemovePrincipals.json                                                                                     |
| [databasesUpdateSample.ts][databasesupdatesample]                                                                         | updates a database. x-ms-original-file: 2025-02-14/KustoDatabasesUpdate.json                                                                                                                  |
| [managedPrivateEndpointsCheckNameAvailabilitySample.ts][managedprivateendpointschecknameavailabilitysample]               | checks that the managed private endpoints resource name is valid and is not already in use. x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsCheckNameAvailability.json             |
| [managedPrivateEndpointsCreateOrUpdateSample.ts][managedprivateendpointscreateorupdatesample]                             | creates a managed private endpoint. x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsCreateOrUpdate.json                                                                            |
| [managedPrivateEndpointsDeleteSample.ts][managedprivateendpointsdeletesample]                                             | deletes a managed private endpoint. x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsDelete.json                                                                                    |
| [managedPrivateEndpointsGetSample.ts][managedprivateendpointsgetsample]                                                   | gets a managed private endpoint. x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsGet.json                                                                                          |
| [managedPrivateEndpointsListSample.ts][managedprivateendpointslistsample]                                                 | returns the list of managed private endpoints. x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsList.json                                                                           |
| [managedPrivateEndpointsUpdateSample.ts][managedprivateendpointsupdatesample]                                             | updates a managed private endpoint. x-ms-original-file: 2025-02-14/KustoManagedPrivateEndpointsUpdate.json                                                                                    |
| [operationsListSample.ts][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2025-02-14/KustoOperationsList.json                                                                                                  |
| [operationsResultsGetSample.ts][operationsresultsgetsample]                                                               | returns operation results. x-ms-original-file: 2025-02-14/KustoOperationResultsGet.json                                                                                                       |
| [operationsResultsLocationGetSample.ts][operationsresultslocationgetsample]                                               | returns operation results. x-ms-original-file: 2025-02-14/KustoOperationResultsOperationResultResponseTypeGet.json                                                                            |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]                       | approve or reject a private endpoint connection with a given name. x-ms-original-file: 2025-02-14/KustoPrivateEndpointConnectionsCreateOrUpdate.json                                          |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                       | deletes a private endpoint connection with a given name. x-ms-original-file: 2025-02-14/KustoPrivateEndpointConnectionsDelete.json                                                            |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                             | gets a private endpoint connection. x-ms-original-file: 2025-02-14/KustoPrivateEndpointConnectionsGet.json                                                                                    |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                                           | returns the list of private endpoint connections. x-ms-original-file: 2025-02-14/KustoPrivateEndpointConnectionsList.json                                                                     |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                                         | gets a private link resource. x-ms-original-file: 2025-02-14/KustoPrivateLinkResourcesGet.json                                                                                                |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                                                       | returns the list of private link resources. x-ms-original-file: 2025-02-14/KustoPrivateLinkResourcesList.json                                                                                 |
| [sandboxCustomImagesCheckNameAvailabilitySample.ts][sandboxcustomimageschecknameavailabilitysample]                       | checks that the sandbox custom image resource name is valid and is not already in use. x-ms-original-file: 2025-02-14/KustoSandboxCustomImagesCheckNameAvailability.json                      |
| [sandboxCustomImagesCreateOrUpdateSample.ts][sandboxcustomimagescreateorupdatesample]                                     | creates or updates a sandbox custom image. x-ms-original-file: 2025-02-14/KustoSandboxCustomImagesCreateOrUpdate.json                                                                         |
| [sandboxCustomImagesDeleteSample.ts][sandboxcustomimagesdeletesample]                                                     | deletes a sandbox custom image. x-ms-original-file: 2025-02-14/KustoSandboxCustomImageDelete.json                                                                                             |
| [sandboxCustomImagesGetSample.ts][sandboxcustomimagesgetsample]                                                           | returns a sandbox custom image x-ms-original-file: 2025-02-14/KustoSandboxCustomImagesGet.json                                                                                                |
| [sandboxCustomImagesListByClusterSample.ts][sandboxcustomimageslistbyclustersample]                                       | returns the list of the existing sandbox custom images of the given Kusto cluster. x-ms-original-file: 2025-02-14/KustoSandboxCustomImagesList.json                                           |
| [sandboxCustomImagesUpdateSample.ts][sandboxcustomimagesupdatesample]                                                     | updates a sandbox custom image. x-ms-original-file: 2025-02-14/KustoSandboxCustomImageUpdate.json                                                                                             |
| [scriptsCheckNameAvailabilitySample.ts][scriptschecknameavailabilitysample]                                               | checks that the script name is valid and is not already in use. x-ms-original-file: 2025-02-14/KustoScriptsCheckNameAvailability.json                                                         |
| [scriptsCreateOrUpdateSample.ts][scriptscreateorupdatesample]                                                             | creates a Kusto database script. x-ms-original-file: 2025-02-14/KustoScriptsCreateOrUpdate.json                                                                                               |
| [scriptsDeleteSample.ts][scriptsdeletesample]                                                                             | deletes a Kusto database script. x-ms-original-file: 2025-02-14/KustoScriptsDelete.json                                                                                                       |
| [scriptsGetSample.ts][scriptsgetsample]                                                                                   | gets a Kusto cluster database script. x-ms-original-file: 2025-02-14/KustoScriptsGet.json                                                                                                     |
| [scriptsListByDatabaseSample.ts][scriptslistbydatabasesample]                                                             | returns the list of database scripts for given database. x-ms-original-file: 2025-02-14/KustoScriptsListByDatabase.json                                                                       |
| [scriptsUpdateSample.ts][scriptsupdatesample]                                                                             | updates a database script. x-ms-original-file: 2025-02-14/KustoScriptsUpdate.json                                                                                                             |
| [skusListSample.ts][skuslistsample]                                                                                       | lists eligible region SKUs for Kusto resource provider by Azure region. x-ms-original-file: 2025-02-14/KustoSkus.json                                                                         |

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
node dist/attachedDatabaseConfigurationsCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/attachedDatabaseConfigurationsCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[attacheddatabaseconfigurationschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/attachedDatabaseConfigurationsCheckNameAvailabilitySample.ts
[attacheddatabaseconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/attachedDatabaseConfigurationsCreateOrUpdateSample.ts
[attacheddatabaseconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/attachedDatabaseConfigurationsDeleteSample.ts
[attacheddatabaseconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/attachedDatabaseConfigurationsGetSample.ts
[attacheddatabaseconfigurationslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/attachedDatabaseConfigurationsListByClusterSample.ts
[clusterprincipalassignmentschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clusterPrincipalAssignmentsCheckNameAvailabilitySample.ts
[clusterprincipalassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clusterPrincipalAssignmentsCreateOrUpdateSample.ts
[clusterprincipalassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clusterPrincipalAssignmentsDeleteSample.ts
[clusterprincipalassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clusterPrincipalAssignmentsGetSample.ts
[clusterprincipalassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clusterPrincipalAssignmentsListSample.ts
[clustersaddcalloutpoliciessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersAddCalloutPoliciesSample.ts
[clustersaddlanguageextensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersAddLanguageExtensionsSample.ts
[clusterschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersCheckNameAvailabilitySample.ts
[clusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersCreateOrUpdateSample.ts
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersDeleteSample.ts
[clustersdetachfollowerdatabasessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersDetachFollowerDatabasesSample.ts
[clustersdiagnosevirtualnetworksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersDiagnoseVirtualNetworkSample.ts
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersGetSample.ts
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersListByResourceGroupSample.ts
[clusterslistcalloutpoliciessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersListCalloutPoliciesSample.ts
[clusterslistfollowerdatabasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersListFollowerDatabasesGetSample.ts
[clusterslistfollowerdatabasessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersListFollowerDatabasesSample.ts
[clusterslistlanguageextensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersListLanguageExtensionsSample.ts
[clusterslistoutboundnetworkdependenciesendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersListOutboundNetworkDependenciesEndpointsSample.ts
[clusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersListSample.ts
[clusterslistskusbyresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersListSkusByResourceSample.ts
[clusterslistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersListSkusSample.ts
[clustersmigratesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersMigrateSample.ts
[clustersremovecalloutpolicysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersRemoveCalloutPolicySample.ts
[clustersremovelanguageextensionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersRemoveLanguageExtensionsSample.ts
[clustersstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersStartSample.ts
[clustersstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersStopSample.ts
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/clustersUpdateSample.ts
[dataconnectionschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/dataConnectionsCheckNameAvailabilitySample.ts
[dataconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/dataConnectionsCreateOrUpdateSample.ts
[dataconnectionsdataconnectionvalidationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/dataConnectionsDataConnectionValidationSample.ts
[dataconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/dataConnectionsDeleteSample.ts
[dataconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/dataConnectionsGetSample.ts
[dataconnectionslistbydatabasesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/dataConnectionsListByDatabaseSample.ts
[dataconnectionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/dataConnectionsUpdateSample.ts
[databaseinvitefollowersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databaseInviteFollowerSample.ts
[databaseprincipalassignmentschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasePrincipalAssignmentsCheckNameAvailabilitySample.ts
[databaseprincipalassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasePrincipalAssignmentsCreateOrUpdateSample.ts
[databaseprincipalassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasePrincipalAssignmentsDeleteSample.ts
[databaseprincipalassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasePrincipalAssignmentsGetSample.ts
[databaseprincipalassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasePrincipalAssignmentsListSample.ts
[databasesaddprincipalssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasesAddPrincipalsSample.ts
[databaseschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasesCheckNameAvailabilitySample.ts
[databasescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasesCreateOrUpdateSample.ts
[databasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasesDeleteSample.ts
[databasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasesGetSample.ts
[databaseslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasesListByClusterSample.ts
[databaseslistprincipalssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasesListPrincipalsSample.ts
[databasesremoveprincipalssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasesRemovePrincipalsSample.ts
[databasesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/databasesUpdateSample.ts
[managedprivateendpointschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/managedPrivateEndpointsCheckNameAvailabilitySample.ts
[managedprivateendpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/managedPrivateEndpointsCreateOrUpdateSample.ts
[managedprivateendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/managedPrivateEndpointsDeleteSample.ts
[managedprivateendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/managedPrivateEndpointsGetSample.ts
[managedprivateendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/managedPrivateEndpointsListSample.ts
[managedprivateendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/managedPrivateEndpointsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/operationsListSample.ts
[operationsresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/operationsResultsGetSample.ts
[operationsresultslocationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/operationsResultsLocationGetSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/privateLinkResourcesListSample.ts
[sandboxcustomimageschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/sandboxCustomImagesCheckNameAvailabilitySample.ts
[sandboxcustomimagescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/sandboxCustomImagesCreateOrUpdateSample.ts
[sandboxcustomimagesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/sandboxCustomImagesDeleteSample.ts
[sandboxcustomimagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/sandboxCustomImagesGetSample.ts
[sandboxcustomimageslistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/sandboxCustomImagesListByClusterSample.ts
[sandboxcustomimagesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/sandboxCustomImagesUpdateSample.ts
[scriptschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/scriptsCheckNameAvailabilitySample.ts
[scriptscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/scriptsCreateOrUpdateSample.ts
[scriptsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/scriptsDeleteSample.ts
[scriptsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/scriptsGetSample.ts
[scriptslistbydatabasesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/scriptsListByDatabaseSample.ts
[scriptsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/scriptsUpdateSample.ts
[skuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kusto/arm-kusto/samples/v9-beta/typescript/src/skusListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-kusto?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kusto/arm-kusto/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

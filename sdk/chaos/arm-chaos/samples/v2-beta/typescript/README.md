# @azure/arm-chaos client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-chaos in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [actionVersionsGetSample.ts][actionversionsgetsample]                                                             | get an Action Version resource for a given location and action. x-ms-original-file: 2026-05-01-preview/ActionVersions_Get.json                                                  |
| [actionVersionsListSample.ts][actionversionslistsample]                                                           | get a list of Action Version resources for a given location and action. x-ms-original-file: 2026-05-01-preview/ActionVersions_List.json                                         |
| [actionsGetSample.ts][actionsgetsample]                                                                           | get an Action resource for a given location. x-ms-original-file: 2026-05-01-preview/Actions_Get.json                                                                            |
| [actionsListSample.ts][actionslistsample]                                                                         | get a list of Action resources for a given location. x-ms-original-file: 2026-05-01-preview/Actions_List.json                                                                   |
| [capabilitiesCreateOrUpdateSample.ts][capabilitiescreateorupdatesample]                                           | create or update a Capability resource that extends a Target resource. x-ms-original-file: 2026-05-01-preview/Capabilities_CreateOrUpdate.json                                  |
| [capabilitiesDeleteSample.ts][capabilitiesdeletesample]                                                           | delete a Capability that extends a Target resource. x-ms-original-file: 2026-05-01-preview/Capabilities_Delete.json                                                             |
| [capabilitiesGetSample.ts][capabilitiesgetsample]                                                                 | get a Capability resource that extends a Target resource. x-ms-original-file: 2026-05-01-preview/Capabilities_Get.json                                                          |
| [capabilitiesListSample.ts][capabilitieslistsample]                                                               | get a list of Capability resources that extend a Target resource. x-ms-original-file: 2026-05-01-preview/Capabilities_List.json                                                 |
| [capabilityTypesGetSample.ts][capabilitytypesgetsample]                                                           | get a Capability Type resource for given Target Type and location. x-ms-original-file: 2026-05-01-preview/CapabilityTypes_Get.json                                              |
| [capabilityTypesListSample.ts][capabilitytypeslistsample]                                                         | get a list of Capability Type resources for given Target Type and location. x-ms-original-file: 2026-05-01-preview/CapabilityTypes_List.json                                    |
| [discoveredResourcesGetSample.ts][discoveredresourcesgetsample]                                                   | get a discovered resource. x-ms-original-file: 2026-05-01-preview/DiscoveredResources_Get.json                                                                                  |
| [discoveredResourcesListByWorkspaceSample.ts][discoveredresourceslistbyworkspacesample]                           | get a list of discovered resources for a workspace. x-ms-original-file: 2026-05-01-preview/DiscoveredResources_ListByWorkspace.json                                             |
| [experimentsCancelSample.ts][experimentscancelsample]                                                             | cancel a running Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_Cancel.json                                                                            |
| [experimentsCreateOrUpdateSample.ts][experimentscreateorupdatesample]                                             | create or update a Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_CreateOrUpdate.json                                                                  |
| [experimentsDeleteSample.ts][experimentsdeletesample]                                                             | delete a Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_Delete.json                                                                                    |
| [experimentsExecutionDetailsSample.ts][experimentsexecutiondetailssample]                                         | execution details of an experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_ExecutionDetails.json                                                           |
| [experimentsGetExecutionSample.ts][experimentsgetexecutionsample]                                                 | get an execution of an Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_GetExecution.json                                                                |
| [experimentsGetSample.ts][experimentsgetsample]                                                                   | get a Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_Get.json                                                                                          |
| [experimentsListAllExecutionsSample.ts][experimentslistallexecutionssample]                                       | get a list of executions of an Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_ListAllExecutions.json                                                   |
| [experimentsListAllSample.ts][experimentslistallsample]                                                           | get a list of Experiment resources in a subscription. x-ms-original-file: 2026-05-01-preview/Experiments_ListAll.json                                                           |
| [experimentsListSample.ts][experimentslistsample]                                                                 | get a list of Experiment resources in a resource group. x-ms-original-file: 2026-05-01-preview/Experiments_List.json                                                            |
| [experimentsStartSample.ts][experimentsstartsample]                                                               | start a Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_Start.json                                                                                      |
| [experimentsUpdateSample.ts][experimentsupdatesample]                                                             | the operation to update an experiment. x-ms-original-file: 2026-05-01-preview/Experiments_Update.json                                                                           |
| [operationStatusesGetSample.ts][operationstatusesgetsample]                                                       | returns the current status of an async operation. x-ms-original-file: 2026-05-01-preview/OperationStatuses_Get.json                                                             |
| [operationsListAllSample.ts][operationslistallsample]                                                             | list the operations for the provider x-ms-original-file: 2026-05-01-preview/Operations_List.json                                                                                |
| [privateAccessesCreateOrUpdateSample.ts][privateaccessescreateorupdatesample]                                     | create or update a private access x-ms-original-file: 2026-05-01-preview/PrivateAccesses_CreateOrUpdate_Create_Or_Update_A_Private_Access_Resource.json                         |
| [privateAccessesDeleteAPrivateEndpointConnectionSample.ts][privateaccessesdeleteaprivateendpointconnectionsample] | deletes a private endpoint connection under a private access resource. x-ms-original-file: 2026-05-01-preview/PrivateAccesses_DeleteAPrivateEndpointConnection.json             |
| [privateAccessesDeleteSample.ts][privateaccessesdeletesample]                                                     | delete a private access x-ms-original-file: 2026-05-01-preview/PrivateAccesses_Delete.json                                                                                      |
| [privateAccessesGetAPrivateEndpointConnectionSample.ts][privateaccessesgetaprivateendpointconnectionsample]       | gets information about a private endpoint connection under a private access resource. x-ms-original-file: 2026-05-01-preview/PrivateAccesses_GetAPrivateEndpointConnection.json |
| [privateAccessesGetPrivateLinkResourcesSample.ts][privateaccessesgetprivatelinkresourcessample]                   | gets the private link resources possible under private access resource x-ms-original-file: 2026-05-01-preview/PrivateAccesses_GetPrivateLinkResources.json                      |
| [privateAccessesGetSample.ts][privateaccessesgetsample]                                                           | get a private access resource x-ms-original-file: 2026-05-01-preview/PrivateAccesses_Get_Get_A_Private_Access_Resource.json                                                     |
| [privateAccessesListAllSample.ts][privateaccesseslistallsample]                                                   | get a list of private access resources in a subscription. x-ms-original-file: 2026-05-01-preview/PrivateAccesses_ListAll.json                                                   |
| [privateAccessesListPrivateEndpointConnectionsSample.ts][privateaccesseslistprivateendpointconnectionssample]     | list information about private endpoint connections under a private access resource x-ms-original-file: 2026-05-01-preview/PrivateAccesses_ListPrivateEndpointConnections.json  |
| [privateAccessesListSample.ts][privateaccesseslistsample]                                                         | get a list of private access resources in a resource group. x-ms-original-file: 2026-05-01-preview/PrivateAccesses_List.json                                                    |
| [privateAccessesUpdateSample.ts][privateaccessesupdatesample]                                                     | patch a private access tags x-ms-original-file: 2026-05-01-preview/PrivateAccesses_Update.json                                                                                  |
| [scenarioConfigurationsCreateOrUpdateSample.ts][scenarioconfigurationscreateorupdatesample]                       | create or update a scenario definition. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_CreateOrUpdate.json                                                       |
| [scenarioConfigurationsDeleteSample.ts][scenarioconfigurationsdeletesample]                                       | delete a scenario definition. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_Delete.json                                                                         |
| [scenarioConfigurationsExecuteSample.ts][scenarioconfigurationsexecutesample]                                     | execute the scenario execution with the given scenario configuration. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_Execute.json                                |
| [scenarioConfigurationsFixResourcePermissionsSample.ts][scenarioconfigurationsfixresourcepermissionssample]       | fixes resource permissions for the given scenario configuration. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_FixResourcePermissions.json                      |
| [scenarioConfigurationsGetSample.ts][scenarioconfigurationsgetsample]                                             | get a scenario definition. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_Get.json                                                                               |
| [scenarioConfigurationsListAllSample.ts][scenarioconfigurationslistallsample]                                     | get a list of scenario definitions. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_ListAll.json                                                                  |
| [scenarioConfigurationsValidateSample.ts][scenarioconfigurationsvalidatesample]                                   | validate the given scenario configuration. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_Validate.json                                                          |
| [scenarioRunsCancelSample.ts][scenariorunscancelsample]                                                           | cancel the currently running scenario execution. x-ms-original-file: 2026-05-01-preview/ScenarioRuns_Cancel.json                                                                |
| [scenarioRunsGetSample.ts][scenariorunsgetsample]                                                                 | get a scenario run. x-ms-original-file: 2026-05-01-preview/ScenarioRuns_Get.json                                                                                                |
| [scenarioRunsListAllSample.ts][scenariorunslistallsample]                                                         | get a list of scenario runs. x-ms-original-file: 2026-05-01-preview/ScenarioRuns_ListAll.json                                                                                   |
| [scenariosCreateOrUpdateSample.ts][scenarioscreateorupdatesample]                                                 | create or update a scenario. x-ms-original-file: 2026-05-01-preview/Scenarios_CreateOrUpdate.json                                                                               |
| [scenariosDeleteSample.ts][scenariosdeletesample]                                                                 | delete a scenario. x-ms-original-file: 2026-05-01-preview/Scenarios_Delete.json                                                                                                 |
| [scenariosGetSample.ts][scenariosgetsample]                                                                       | get a scenario. x-ms-original-file: 2026-05-01-preview/Scenarios_Get.json                                                                                                       |
| [scenariosListAllSample.ts][scenarioslistallsample]                                                               | get a list of scenarios. x-ms-original-file: 2026-05-01-preview/Scenarios_ListAll.json                                                                                          |
| [targetTypesGetSample.ts][targettypesgetsample]                                                                   | get a Target Type resources for given location. x-ms-original-file: 2026-05-01-preview/TargetTypes_Get.json                                                                     |
| [targetTypesListSample.ts][targettypeslistsample]                                                                 | get a list of Target Type resources for given location. x-ms-original-file: 2026-05-01-preview/TargetTypes_List.json                                                            |
| [targetsCreateOrUpdateSample.ts][targetscreateorupdatesample]                                                     | create or update a Target resource that extends a tracked regional resource. x-ms-original-file: 2026-05-01-preview/Targets_CreateOrUpdate.json                                 |
| [targetsDeleteSample.ts][targetsdeletesample]                                                                     | delete a Target resource that extends a tracked regional resource. x-ms-original-file: 2026-05-01-preview/Targets_Delete.json                                                   |
| [targetsGetSample.ts][targetsgetsample]                                                                           | get a Target resource that extends a tracked regional resource. x-ms-original-file: 2026-05-01-preview/Targets_Get.json                                                         |
| [targetsListSample.ts][targetslistsample]                                                                         | get a list of Target resources that extend a tracked regional resource. x-ms-original-file: 2026-05-01-preview/Targets_List.json                                                |
| [workspacesCreateOrUpdateSample.ts][workspacescreateorupdatesample]                                               | create or update a Workspace resource. x-ms-original-file: 2026-05-01-preview/Workspaces_CreateOrUpdate.json                                                                    |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                                               | delete a Workspace resource. x-ms-original-file: 2026-05-01-preview/Workspaces_Delete.json                                                                                      |
| [workspacesGetSample.ts][workspacesgetsample]                                                                     | get a Workspace resource. x-ms-original-file: 2026-05-01-preview/Workspaces_Get.json                                                                                            |
| [workspacesListAllSample.ts][workspaceslistallsample]                                                             | get a list of all Workspace resources in a subscription. x-ms-original-file: 2026-05-01-preview/Workspaces_ListAll.json                                                         |
| [workspacesListSample.ts][workspaceslistsample]                                                                   | get a list of Workspace resources in a resource group. x-ms-original-file: 2026-05-01-preview/Workspaces_List.json                                                              |
| [workspacesRefreshRecommendationsSample.ts][workspacesrefreshrecommendationssample]                               | refreshes recommendation status for all scenarios in a given workspace. x-ms-original-file: 2026-05-01-preview/Workspaces_RefreshRecommendations.json                           |
| [workspacesUpdateSample.ts][workspacesupdatesample]                                                               | the operation to update a Workspace. x-ms-original-file: 2026-05-01-preview/Workspaces_Update.json                                                                              |

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
node dist/actionVersionsGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/actionVersionsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[actionversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/actionVersionsGetSample.ts
[actionversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/actionVersionsListSample.ts
[actionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/actionsGetSample.ts
[actionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/actionsListSample.ts
[capabilitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/capabilitiesCreateOrUpdateSample.ts
[capabilitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/capabilitiesDeleteSample.ts
[capabilitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/capabilitiesGetSample.ts
[capabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/capabilitiesListSample.ts
[capabilitytypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/capabilityTypesGetSample.ts
[capabilitytypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/capabilityTypesListSample.ts
[discoveredresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/discoveredResourcesGetSample.ts
[discoveredresourceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/discoveredResourcesListByWorkspaceSample.ts
[experimentscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsCancelSample.ts
[experimentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsCreateOrUpdateSample.ts
[experimentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsDeleteSample.ts
[experimentsexecutiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsExecutionDetailsSample.ts
[experimentsgetexecutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsGetExecutionSample.ts
[experimentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsGetSample.ts
[experimentslistallexecutionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsListAllExecutionsSample.ts
[experimentslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsListAllSample.ts
[experimentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsListSample.ts
[experimentsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsStartSample.ts
[experimentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/experimentsUpdateSample.ts
[operationstatusesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/operationStatusesGetSample.ts
[operationslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/operationsListAllSample.ts
[privateaccessescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/privateAccessesCreateOrUpdateSample.ts
[privateaccessesdeleteaprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/privateAccessesDeleteAPrivateEndpointConnectionSample.ts
[privateaccessesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/privateAccessesDeleteSample.ts
[privateaccessesgetaprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/privateAccessesGetAPrivateEndpointConnectionSample.ts
[privateaccessesgetprivatelinkresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/privateAccessesGetPrivateLinkResourcesSample.ts
[privateaccessesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/privateAccessesGetSample.ts
[privateaccesseslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/privateAccessesListAllSample.ts
[privateaccesseslistprivateendpointconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/privateAccessesListPrivateEndpointConnectionsSample.ts
[privateaccesseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/privateAccessesListSample.ts
[privateaccessesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/privateAccessesUpdateSample.ts
[scenarioconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenarioConfigurationsCreateOrUpdateSample.ts
[scenarioconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenarioConfigurationsDeleteSample.ts
[scenarioconfigurationsexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenarioConfigurationsExecuteSample.ts
[scenarioconfigurationsfixresourcepermissionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenarioConfigurationsFixResourcePermissionsSample.ts
[scenarioconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenarioConfigurationsGetSample.ts
[scenarioconfigurationslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenarioConfigurationsListAllSample.ts
[scenarioconfigurationsvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenarioConfigurationsValidateSample.ts
[scenariorunscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenarioRunsCancelSample.ts
[scenariorunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenarioRunsGetSample.ts
[scenariorunslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenarioRunsListAllSample.ts
[scenarioscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenariosCreateOrUpdateSample.ts
[scenariosdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenariosDeleteSample.ts
[scenariosgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenariosGetSample.ts
[scenarioslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/scenariosListAllSample.ts
[targettypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/targetTypesGetSample.ts
[targettypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/targetTypesListSample.ts
[targetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/targetsCreateOrUpdateSample.ts
[targetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/targetsDeleteSample.ts
[targetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/targetsGetSample.ts
[targetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/targetsListSample.ts
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/workspacesCreateOrUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/workspacesGetSample.ts
[workspaceslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/workspacesListAllSample.ts
[workspaceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/workspacesListSample.ts
[workspacesrefreshrecommendationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/workspacesRefreshRecommendationsSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/typescript/src/workspacesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-chaos?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/chaos/arm-chaos/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

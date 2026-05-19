# @azure/arm-chaos client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-chaos in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [actionVersionsGetSample.js][actionversionsgetsample]                                                             | get an Action Version resource for a given location and action. x-ms-original-file: 2026-05-01-preview/ActionVersions_Get.json                                                  |
| [actionVersionsListSample.js][actionversionslistsample]                                                           | get a list of Action Version resources for a given location and action. x-ms-original-file: 2026-05-01-preview/ActionVersions_List.json                                         |
| [actionsGetSample.js][actionsgetsample]                                                                           | get an Action resource for a given location. x-ms-original-file: 2026-05-01-preview/Actions_Get.json                                                                            |
| [actionsListSample.js][actionslistsample]                                                                         | get a list of Action resources for a given location. x-ms-original-file: 2026-05-01-preview/Actions_List.json                                                                   |
| [capabilitiesCreateOrUpdateSample.js][capabilitiescreateorupdatesample]                                           | create or update a Capability resource that extends a Target resource. x-ms-original-file: 2026-05-01-preview/Capabilities_CreateOrUpdate.json                                  |
| [capabilitiesDeleteSample.js][capabilitiesdeletesample]                                                           | delete a Capability that extends a Target resource. x-ms-original-file: 2026-05-01-preview/Capabilities_Delete.json                                                             |
| [capabilitiesGetSample.js][capabilitiesgetsample]                                                                 | get a Capability resource that extends a Target resource. x-ms-original-file: 2026-05-01-preview/Capabilities_Get.json                                                          |
| [capabilitiesListSample.js][capabilitieslistsample]                                                               | get a list of Capability resources that extend a Target resource. x-ms-original-file: 2026-05-01-preview/Capabilities_List.json                                                 |
| [capabilityTypesGetSample.js][capabilitytypesgetsample]                                                           | get a Capability Type resource for given Target Type and location. x-ms-original-file: 2026-05-01-preview/CapabilityTypes_Get.json                                              |
| [capabilityTypesListSample.js][capabilitytypeslistsample]                                                         | get a list of Capability Type resources for given Target Type and location. x-ms-original-file: 2026-05-01-preview/CapabilityTypes_List.json                                    |
| [discoveredResourcesGetSample.js][discoveredresourcesgetsample]                                                   | get a discovered resource. x-ms-original-file: 2026-05-01-preview/DiscoveredResources_Get.json                                                                                  |
| [discoveredResourcesListByWorkspaceSample.js][discoveredresourceslistbyworkspacesample]                           | get a list of discovered resources for a workspace. x-ms-original-file: 2026-05-01-preview/DiscoveredResources_ListByWorkspace.json                                             |
| [experimentsCancelSample.js][experimentscancelsample]                                                             | cancel a running Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_Cancel.json                                                                            |
| [experimentsCreateOrUpdateSample.js][experimentscreateorupdatesample]                                             | create or update a Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_CreateOrUpdate.json                                                                  |
| [experimentsDeleteSample.js][experimentsdeletesample]                                                             | delete a Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_Delete.json                                                                                    |
| [experimentsExecutionDetailsSample.js][experimentsexecutiondetailssample]                                         | execution details of an experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_ExecutionDetails.json                                                           |
| [experimentsGetExecutionSample.js][experimentsgetexecutionsample]                                                 | get an execution of an Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_GetExecution.json                                                                |
| [experimentsGetSample.js][experimentsgetsample]                                                                   | get a Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_Get.json                                                                                          |
| [experimentsListAllExecutionsSample.js][experimentslistallexecutionssample]                                       | get a list of executions of an Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_ListAllExecutions.json                                                   |
| [experimentsListAllSample.js][experimentslistallsample]                                                           | get a list of Experiment resources in a subscription. x-ms-original-file: 2026-05-01-preview/Experiments_ListAll.json                                                           |
| [experimentsListSample.js][experimentslistsample]                                                                 | get a list of Experiment resources in a resource group. x-ms-original-file: 2026-05-01-preview/Experiments_List.json                                                            |
| [experimentsStartSample.js][experimentsstartsample]                                                               | start a Experiment resource. x-ms-original-file: 2026-05-01-preview/Experiments_Start.json                                                                                      |
| [experimentsUpdateSample.js][experimentsupdatesample]                                                             | the operation to update an experiment. x-ms-original-file: 2026-05-01-preview/Experiments_Update.json                                                                           |
| [operationStatusesGetSample.js][operationstatusesgetsample]                                                       | returns the current status of an async operation. x-ms-original-file: 2026-05-01-preview/OperationStatuses_Get.json                                                             |
| [operationsListAllSample.js][operationslistallsample]                                                             | list the operations for the provider x-ms-original-file: 2026-05-01-preview/Operations_List.json                                                                                |
| [privateAccessesCreateOrUpdateSample.js][privateaccessescreateorupdatesample]                                     | create or update a private access x-ms-original-file: 2026-05-01-preview/PrivateAccesses_CreateOrUpdate_Create_Or_Update_A_Private_Access_Resource.json                         |
| [privateAccessesDeleteAPrivateEndpointConnectionSample.js][privateaccessesdeleteaprivateendpointconnectionsample] | deletes a private endpoint connection under a private access resource. x-ms-original-file: 2026-05-01-preview/PrivateAccesses_DeleteAPrivateEndpointConnection.json             |
| [privateAccessesDeleteSample.js][privateaccessesdeletesample]                                                     | delete a private access x-ms-original-file: 2026-05-01-preview/PrivateAccesses_Delete.json                                                                                      |
| [privateAccessesGetAPrivateEndpointConnectionSample.js][privateaccessesgetaprivateendpointconnectionsample]       | gets information about a private endpoint connection under a private access resource. x-ms-original-file: 2026-05-01-preview/PrivateAccesses_GetAPrivateEndpointConnection.json |
| [privateAccessesGetPrivateLinkResourcesSample.js][privateaccessesgetprivatelinkresourcessample]                   | gets the private link resources possible under private access resource x-ms-original-file: 2026-05-01-preview/PrivateAccesses_GetPrivateLinkResources.json                      |
| [privateAccessesGetSample.js][privateaccessesgetsample]                                                           | get a private access resource x-ms-original-file: 2026-05-01-preview/PrivateAccesses_Get_Get_A_Private_Access_Resource.json                                                     |
| [privateAccessesListAllSample.js][privateaccesseslistallsample]                                                   | get a list of private access resources in a subscription. x-ms-original-file: 2026-05-01-preview/PrivateAccesses_ListAll.json                                                   |
| [privateAccessesListPrivateEndpointConnectionsSample.js][privateaccesseslistprivateendpointconnectionssample]     | list information about private endpoint connections under a private access resource x-ms-original-file: 2026-05-01-preview/PrivateAccesses_ListPrivateEndpointConnections.json  |
| [privateAccessesListSample.js][privateaccesseslistsample]                                                         | get a list of private access resources in a resource group. x-ms-original-file: 2026-05-01-preview/PrivateAccesses_List.json                                                    |
| [privateAccessesUpdateSample.js][privateaccessesupdatesample]                                                     | patch a private access tags x-ms-original-file: 2026-05-01-preview/PrivateAccesses_Update.json                                                                                  |
| [scenarioConfigurationsCreateOrUpdateSample.js][scenarioconfigurationscreateorupdatesample]                       | create or update a scenario definition. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_CreateOrUpdate.json                                                       |
| [scenarioConfigurationsDeleteSample.js][scenarioconfigurationsdeletesample]                                       | delete a scenario definition. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_Delete.json                                                                         |
| [scenarioConfigurationsExecuteSample.js][scenarioconfigurationsexecutesample]                                     | execute the scenario execution with the given scenario configuration. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_Execute.json                                |
| [scenarioConfigurationsFixResourcePermissionsSample.js][scenarioconfigurationsfixresourcepermissionssample]       | fixes resource permissions for the given scenario configuration. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_FixResourcePermissions.json                      |
| [scenarioConfigurationsGetSample.js][scenarioconfigurationsgetsample]                                             | get a scenario definition. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_Get.json                                                                               |
| [scenarioConfigurationsListAllSample.js][scenarioconfigurationslistallsample]                                     | get a list of scenario definitions. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_ListAll.json                                                                  |
| [scenarioConfigurationsValidateSample.js][scenarioconfigurationsvalidatesample]                                   | validate the given scenario configuration. x-ms-original-file: 2026-05-01-preview/ScenarioConfigurations_Validate.json                                                          |
| [scenarioRunsCancelSample.js][scenariorunscancelsample]                                                           | cancel the currently running scenario execution. x-ms-original-file: 2026-05-01-preview/ScenarioRuns_Cancel.json                                                                |
| [scenarioRunsGetSample.js][scenariorunsgetsample]                                                                 | get a scenario run. x-ms-original-file: 2026-05-01-preview/ScenarioRuns_Get.json                                                                                                |
| [scenarioRunsListAllSample.js][scenariorunslistallsample]                                                         | get a list of scenario runs. x-ms-original-file: 2026-05-01-preview/ScenarioRuns_ListAll.json                                                                                   |
| [scenariosCreateOrUpdateSample.js][scenarioscreateorupdatesample]                                                 | create or update a scenario. x-ms-original-file: 2026-05-01-preview/Scenarios_CreateOrUpdate.json                                                                               |
| [scenariosDeleteSample.js][scenariosdeletesample]                                                                 | delete a scenario. x-ms-original-file: 2026-05-01-preview/Scenarios_Delete.json                                                                                                 |
| [scenariosGetSample.js][scenariosgetsample]                                                                       | get a scenario. x-ms-original-file: 2026-05-01-preview/Scenarios_Get.json                                                                                                       |
| [scenariosListAllSample.js][scenarioslistallsample]                                                               | get a list of scenarios. x-ms-original-file: 2026-05-01-preview/Scenarios_ListAll.json                                                                                          |
| [targetTypesGetSample.js][targettypesgetsample]                                                                   | get a Target Type resources for given location. x-ms-original-file: 2026-05-01-preview/TargetTypes_Get.json                                                                     |
| [targetTypesListSample.js][targettypeslistsample]                                                                 | get a list of Target Type resources for given location. x-ms-original-file: 2026-05-01-preview/TargetTypes_List.json                                                            |
| [targetsCreateOrUpdateSample.js][targetscreateorupdatesample]                                                     | create or update a Target resource that extends a tracked regional resource. x-ms-original-file: 2026-05-01-preview/Targets_CreateOrUpdate.json                                 |
| [targetsDeleteSample.js][targetsdeletesample]                                                                     | delete a Target resource that extends a tracked regional resource. x-ms-original-file: 2026-05-01-preview/Targets_Delete.json                                                   |
| [targetsGetSample.js][targetsgetsample]                                                                           | get a Target resource that extends a tracked regional resource. x-ms-original-file: 2026-05-01-preview/Targets_Get.json                                                         |
| [targetsListSample.js][targetslistsample]                                                                         | get a list of Target resources that extend a tracked regional resource. x-ms-original-file: 2026-05-01-preview/Targets_List.json                                                |
| [workspacesCreateOrUpdateSample.js][workspacescreateorupdatesample]                                               | create or update a Workspace resource. x-ms-original-file: 2026-05-01-preview/Workspaces_CreateOrUpdate.json                                                                    |
| [workspacesDeleteSample.js][workspacesdeletesample]                                                               | delete a Workspace resource. x-ms-original-file: 2026-05-01-preview/Workspaces_Delete.json                                                                                      |
| [workspacesGetSample.js][workspacesgetsample]                                                                     | get a Workspace resource. x-ms-original-file: 2026-05-01-preview/Workspaces_Get.json                                                                                            |
| [workspacesListAllSample.js][workspaceslistallsample]                                                             | get a list of all Workspace resources in a subscription. x-ms-original-file: 2026-05-01-preview/Workspaces_ListAll.json                                                         |
| [workspacesListSample.js][workspaceslistsample]                                                                   | get a list of Workspace resources in a resource group. x-ms-original-file: 2026-05-01-preview/Workspaces_List.json                                                              |
| [workspacesRefreshRecommendationsSample.js][workspacesrefreshrecommendationssample]                               | refreshes recommendation status for all scenarios in a given workspace. x-ms-original-file: 2026-05-01-preview/Workspaces_RefreshRecommendations.json                           |
| [workspacesUpdateSample.js][workspacesupdatesample]                                                               | the operation to update a Workspace. x-ms-original-file: 2026-05-01-preview/Workspaces_Update.json                                                                              |

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
node actionVersionsGetSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node actionVersionsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[actionversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/actionVersionsGetSample.js
[actionversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/actionVersionsListSample.js
[actionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/actionsGetSample.js
[actionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/actionsListSample.js
[capabilitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/capabilitiesCreateOrUpdateSample.js
[capabilitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/capabilitiesDeleteSample.js
[capabilitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/capabilitiesGetSample.js
[capabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/capabilitiesListSample.js
[capabilitytypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/capabilityTypesGetSample.js
[capabilitytypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/capabilityTypesListSample.js
[discoveredresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/discoveredResourcesGetSample.js
[discoveredresourceslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/discoveredResourcesListByWorkspaceSample.js
[experimentscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsCancelSample.js
[experimentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsCreateOrUpdateSample.js
[experimentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsDeleteSample.js
[experimentsexecutiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsExecutionDetailsSample.js
[experimentsgetexecutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsGetExecutionSample.js
[experimentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsGetSample.js
[experimentslistallexecutionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsListAllExecutionsSample.js
[experimentslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsListAllSample.js
[experimentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsListSample.js
[experimentsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsStartSample.js
[experimentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/experimentsUpdateSample.js
[operationstatusesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/operationStatusesGetSample.js
[operationslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/operationsListAllSample.js
[privateaccessescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/privateAccessesCreateOrUpdateSample.js
[privateaccessesdeleteaprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/privateAccessesDeleteAPrivateEndpointConnectionSample.js
[privateaccessesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/privateAccessesDeleteSample.js
[privateaccessesgetaprivateendpointconnectionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/privateAccessesGetAPrivateEndpointConnectionSample.js
[privateaccessesgetprivatelinkresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/privateAccessesGetPrivateLinkResourcesSample.js
[privateaccessesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/privateAccessesGetSample.js
[privateaccesseslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/privateAccessesListAllSample.js
[privateaccesseslistprivateendpointconnectionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/privateAccessesListPrivateEndpointConnectionsSample.js
[privateaccesseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/privateAccessesListSample.js
[privateaccessesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/privateAccessesUpdateSample.js
[scenarioconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenarioConfigurationsCreateOrUpdateSample.js
[scenarioconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenarioConfigurationsDeleteSample.js
[scenarioconfigurationsexecutesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenarioConfigurationsExecuteSample.js
[scenarioconfigurationsfixresourcepermissionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenarioConfigurationsFixResourcePermissionsSample.js
[scenarioconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenarioConfigurationsGetSample.js
[scenarioconfigurationslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenarioConfigurationsListAllSample.js
[scenarioconfigurationsvalidatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenarioConfigurationsValidateSample.js
[scenariorunscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenarioRunsCancelSample.js
[scenariorunsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenarioRunsGetSample.js
[scenariorunslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenarioRunsListAllSample.js
[scenarioscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenariosCreateOrUpdateSample.js
[scenariosdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenariosDeleteSample.js
[scenariosgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenariosGetSample.js
[scenarioslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/scenariosListAllSample.js
[targettypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/targetTypesGetSample.js
[targettypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/targetTypesListSample.js
[targetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/targetsCreateOrUpdateSample.js
[targetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/targetsDeleteSample.js
[targetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/targetsGetSample.js
[targetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/targetsListSample.js
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/workspacesCreateOrUpdateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/workspacesDeleteSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/workspacesGetSample.js
[workspaceslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/workspacesListAllSample.js
[workspaceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/workspacesListSample.js
[workspacesrefreshrecommendationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/workspacesRefreshRecommendationsSample.js
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2-beta/javascript/workspacesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-chaos?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/chaos/arm-chaos/README.md

# @azure/arm-monitoraccounts client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-monitoraccounts in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureMonitorWorkspacesCreateOrUpdateSample.js][azuremonitorworkspacescreateorupdatesample]                 | creates or updates an Azure Monitor Workspace x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_CreateOrUpdate_MaximumSet_Gen.json                           |
| [azureMonitorWorkspacesDeleteSample.js][azuremonitorworkspacesdeletesample]                                 | deletes an Azure Monitor Workspace x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_Delete_MaximumSet_Gen.json                                              |
| [azureMonitorWorkspacesGetSample.js][azuremonitorworkspacesgetsample]                                       | returns the specified Azure Monitor Workspace x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_Get_MaximumSet_Gen.json                                      |
| [azureMonitorWorkspacesListByResourceGroupSample.js][azuremonitorworkspaceslistbyresourcegroupsample]       | lists all Azure Monitor Workspaces in the specified resource group x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_ListByResourceGroup_MaximumSet_Gen.json |
| [azureMonitorWorkspacesListBySubscriptionSample.js][azuremonitorworkspaceslistbysubscriptionsample]         | lists all Azure Monitor Workspaces in the specified subscription x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_ListBySubscription_MaximumSet_Gen.json    |
| [azureMonitorWorkspacesUpdateSample.js][azuremonitorworkspacesupdatesample]                                 | updates part of an Azure Monitor Workspace x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_Update_MaximumSet_Gen.json                                      |
| [issueAddInvestigationResultSample.js][issueaddinvestigationresultsample]                                   | adds investigation result x-ms-original-file: 2025-10-03/Issue_AddInvestigationResult_MaximumSet_Gen.json                                                        |
| [issueAddOrUpdateAlertsSample.js][issueaddorupdatealertssample]                                             | add or update alerts in the issue x-ms-original-file: 2025-10-03/Issue_AddOrUpdateAlerts_MaximumSet_Gen.json                                                     |
| [issueAddOrUpdateResourcesSample.js][issueaddorupdateresourcessample]                                       | add or update resources in the issue x-ms-original-file: 2025-10-03/Issue_AddOrUpdateResources_MaximumSet_Gen.json                                               |
| [issueCreateSample.js][issuecreatesample]                                                                   | create a new issue or updates an existing one x-ms-original-file: 2025-10-03/Issue_Create_MaximumSet_Gen.json                                                    |
| [issueDeleteSample.js][issuedeletesample]                                                                   | delete an issue x-ms-original-file: 2025-10-03/Issue_Delete_MaximumSet_Gen.json                                                                                  |
| [issueFetchBackgroundVisualizationSample.js][issuefetchbackgroundvisualizationsample]                       | fetch the background visualization of the issue x-ms-original-file: 2025-10-03/Issue_FetchBackgroundVisualization_MaximumSet_Gen.json                            |
| [issueFetchInvestigationResultSample.js][issuefetchinvestigationresultsample]                               | fetch investigation result x-ms-original-file: 2025-10-03/Issue_FetchInvestigationResult_MaximumSet_Gen.json                                                     |
| [issueGetSample.js][issuegetsample]                                                                         | get issue properties x-ms-original-file: 2025-10-03/Issue_Get_MaximumSet_Gen.json                                                                                |
| [issueListAlertsSample.js][issuelistalertssample]                                                           | list all alerts in the issue - this method uses pagination to return all alerts x-ms-original-file: 2025-10-03/Issue_ListAlerts_MaximumSet_Gen.json              |
| [issueListResourcesSample.js][issuelistresourcessample]                                                     | list all resources in the issue - this method uses pagination to return all resources x-ms-original-file: 2025-10-03/Issue_ListResources_MaximumSet_Gen.json     |
| [issueListSample.js][issuelistsample]                                                                       | list all issues under the parent x-ms-original-file: 2025-10-03/Issue_List_MaximumSet_Gen.json                                                                   |
| [issueSetBackgroundVisualizationSample.js][issuesetbackgroundvisualizationsample]                           | set the background visualization for the issue x-ms-original-file: 2025-10-03/Issue_SetBackgroundVisualization_MaximumSet_Gen.json                               |
| [issueUpdateSample.js][issueupdatesample]                                                                   | update an issue x-ms-original-file: 2025-10-03/Issue_Update_MaximumSet_Gen.json                                                                                  |
| [metricsContainersCreateOrUpdateSample.js][metricscontainerscreateorupdatesample]                           | creates or updates metrics container settings for a monitoring account. x-ms-original-file: 2025-10-03/MetricsContainers_CreateOrUpdate_MaximumSet_Gen.json      |
| [metricsContainersGetSample.js][metricscontainersgetsample]                                                 | gets metrics container settings for a monitoring account. x-ms-original-file: 2025-10-03/MetricsContainers_Get_MaximumSet_Gen.json                               |
| [metricsContainersListByAzureMonitorWorkspaceSample.js][metricscontainerslistbyazuremonitorworkspacesample] | lists metrics containers for a monitoring account. x-ms-original-file: 2025-10-03/MetricsContainers_ListByAzureMonitorWorkspace_MaximumSet_Gen.json              |
| [operationsListSample.js][operationslistsample]                                                             | list the operations for the provider x-ms-original-file: 2025-10-03/Operations_List.json                                                                         |

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
node azureMonitorWorkspacesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node azureMonitorWorkspacesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azuremonitorworkspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/azureMonitorWorkspacesCreateOrUpdateSample.js
[azuremonitorworkspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/azureMonitorWorkspacesDeleteSample.js
[azuremonitorworkspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/azureMonitorWorkspacesGetSample.js
[azuremonitorworkspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/azureMonitorWorkspacesListByResourceGroupSample.js
[azuremonitorworkspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/azureMonitorWorkspacesListBySubscriptionSample.js
[azuremonitorworkspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/azureMonitorWorkspacesUpdateSample.js
[issueaddinvestigationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueAddInvestigationResultSample.js
[issueaddorupdatealertssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueAddOrUpdateAlertsSample.js
[issueaddorupdateresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueAddOrUpdateResourcesSample.js
[issuecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueCreateSample.js
[issuedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueDeleteSample.js
[issuefetchbackgroundvisualizationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueFetchBackgroundVisualizationSample.js
[issuefetchinvestigationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueFetchInvestigationResultSample.js
[issuegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueGetSample.js
[issuelistalertssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueListAlertsSample.js
[issuelistresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueListResourcesSample.js
[issuelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueListSample.js
[issuesetbackgroundvisualizationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueSetBackgroundVisualizationSample.js
[issueupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/issueUpdateSample.js
[metricscontainerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/metricsContainersCreateOrUpdateSample.js
[metricscontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/metricsContainersGetSample.js
[metricscontainerslistbyazuremonitorworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/metricsContainersListByAzureMonitorWorkspaceSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-monitoraccounts?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/arm-monitoraccounts/README.md

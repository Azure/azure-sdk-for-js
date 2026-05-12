# @azure/arm-monitoraccounts client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-monitoraccounts in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [azureMonitorWorkspacesCreateOrUpdateSample.ts][azuremonitorworkspacescreateorupdatesample]                 | creates or updates an Azure Monitor Workspace x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_CreateOrUpdate_MaximumSet_Gen.json                           |
| [azureMonitorWorkspacesDeleteSample.ts][azuremonitorworkspacesdeletesample]                                 | deletes an Azure Monitor Workspace x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_Delete_MaximumSet_Gen.json                                              |
| [azureMonitorWorkspacesGetSample.ts][azuremonitorworkspacesgetsample]                                       | returns the specified Azure Monitor Workspace x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_Get_MaximumSet_Gen.json                                      |
| [azureMonitorWorkspacesListByResourceGroupSample.ts][azuremonitorworkspaceslistbyresourcegroupsample]       | lists all Azure Monitor Workspaces in the specified resource group x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_ListByResourceGroup_MaximumSet_Gen.json |
| [azureMonitorWorkspacesListBySubscriptionSample.ts][azuremonitorworkspaceslistbysubscriptionsample]         | lists all Azure Monitor Workspaces in the specified subscription x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_ListBySubscription_MaximumSet_Gen.json    |
| [azureMonitorWorkspacesUpdateSample.ts][azuremonitorworkspacesupdatesample]                                 | updates part of an Azure Monitor Workspace x-ms-original-file: 2025-10-03/AzureMonitorWorkspaces_Update_MaximumSet_Gen.json                                      |
| [issueAddInvestigationResultSample.ts][issueaddinvestigationresultsample]                                   | adds investigation result x-ms-original-file: 2025-10-03/Issue_AddInvestigationResult_MaximumSet_Gen.json                                                        |
| [issueAddOrUpdateAlertsSample.ts][issueaddorupdatealertssample]                                             | add or update alerts in the issue x-ms-original-file: 2025-10-03/Issue_AddOrUpdateAlerts_MaximumSet_Gen.json                                                     |
| [issueAddOrUpdateResourcesSample.ts][issueaddorupdateresourcessample]                                       | add or update resources in the issue x-ms-original-file: 2025-10-03/Issue_AddOrUpdateResources_MaximumSet_Gen.json                                               |
| [issueCreateSample.ts][issuecreatesample]                                                                   | create a new issue or updates an existing one x-ms-original-file: 2025-10-03/Issue_Create_MaximumSet_Gen.json                                                    |
| [issueDeleteSample.ts][issuedeletesample]                                                                   | delete an issue x-ms-original-file: 2025-10-03/Issue_Delete_MaximumSet_Gen.json                                                                                  |
| [issueFetchBackgroundVisualizationSample.ts][issuefetchbackgroundvisualizationsample]                       | fetch the background visualization of the issue x-ms-original-file: 2025-10-03/Issue_FetchBackgroundVisualization_MaximumSet_Gen.json                            |
| [issueFetchInvestigationResultSample.ts][issuefetchinvestigationresultsample]                               | fetch investigation result x-ms-original-file: 2025-10-03/Issue_FetchInvestigationResult_MaximumSet_Gen.json                                                     |
| [issueGetSample.ts][issuegetsample]                                                                         | get issue properties x-ms-original-file: 2025-10-03/Issue_Get_MaximumSet_Gen.json                                                                                |
| [issueListAlertsSample.ts][issuelistalertssample]                                                           | list all alerts in the issue - this method uses pagination to return all alerts x-ms-original-file: 2025-10-03/Issue_ListAlerts_MaximumSet_Gen.json              |
| [issueListResourcesSample.ts][issuelistresourcessample]                                                     | list all resources in the issue - this method uses pagination to return all resources x-ms-original-file: 2025-10-03/Issue_ListResources_MaximumSet_Gen.json     |
| [issueListSample.ts][issuelistsample]                                                                       | list all issues under the parent x-ms-original-file: 2025-10-03/Issue_List_MaximumSet_Gen.json                                                                   |
| [issueSetBackgroundVisualizationSample.ts][issuesetbackgroundvisualizationsample]                           | set the background visualization for the issue x-ms-original-file: 2025-10-03/Issue_SetBackgroundVisualization_MaximumSet_Gen.json                               |
| [issueUpdateSample.ts][issueupdatesample]                                                                   | update an issue x-ms-original-file: 2025-10-03/Issue_Update_MaximumSet_Gen.json                                                                                  |
| [metricsContainersCreateOrUpdateSample.ts][metricscontainerscreateorupdatesample]                           | creates or updates metrics container settings for a monitoring account. x-ms-original-file: 2025-10-03/MetricsContainers_CreateOrUpdate_MaximumSet_Gen.json      |
| [metricsContainersGetSample.ts][metricscontainersgetsample]                                                 | gets metrics container settings for a monitoring account. x-ms-original-file: 2025-10-03/MetricsContainers_Get_MaximumSet_Gen.json                               |
| [metricsContainersListByAzureMonitorWorkspaceSample.ts][metricscontainerslistbyazuremonitorworkspacesample] | lists metrics containers for a monitoring account. x-ms-original-file: 2025-10-03/MetricsContainers_ListByAzureMonitorWorkspace_MaximumSet_Gen.json              |
| [operationsListSample.ts][operationslistsample]                                                             | list the operations for the provider x-ms-original-file: 2025-10-03/Operations_List.json                                                                         |

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
node dist/azureMonitorWorkspacesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/azureMonitorWorkspacesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azuremonitorworkspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/azureMonitorWorkspacesCreateOrUpdateSample.ts
[azuremonitorworkspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/azureMonitorWorkspacesDeleteSample.ts
[azuremonitorworkspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/azureMonitorWorkspacesGetSample.ts
[azuremonitorworkspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/azureMonitorWorkspacesListByResourceGroupSample.ts
[azuremonitorworkspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/azureMonitorWorkspacesListBySubscriptionSample.ts
[azuremonitorworkspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/azureMonitorWorkspacesUpdateSample.ts
[issueaddinvestigationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueAddInvestigationResultSample.ts
[issueaddorupdatealertssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueAddOrUpdateAlertsSample.ts
[issueaddorupdateresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueAddOrUpdateResourcesSample.ts
[issuecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueCreateSample.ts
[issuedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueDeleteSample.ts
[issuefetchbackgroundvisualizationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueFetchBackgroundVisualizationSample.ts
[issuefetchinvestigationresultsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueFetchInvestigationResultSample.ts
[issuegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueGetSample.ts
[issuelistalertssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueListAlertsSample.ts
[issuelistresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueListResourcesSample.ts
[issuelistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueListSample.ts
[issuesetbackgroundvisualizationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueSetBackgroundVisualizationSample.ts
[issueupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/issueUpdateSample.ts
[metricscontainerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/metricsContainersCreateOrUpdateSample.ts
[metricscontainersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/metricsContainersGetSample.ts
[metricscontainerslistbyazuremonitorworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/metricsContainersListByAzureMonitorWorkspaceSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/monitor/arm-monitoraccounts/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-monitoraccounts?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/monitor/arm-monitoraccounts/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

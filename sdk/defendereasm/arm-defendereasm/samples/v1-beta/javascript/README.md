# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                            |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [labelsCreateAndUpdateSample.js][labelscreateandupdatesample]                 | Create or update a Label. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_CreateAndUpdate.json                                         |
| [labelsDeleteSample.js][labelsdeletesample]                                   | Delete a Label. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_Delete.json                                                            |
| [labelsGetByWorkspaceSample.js][labelsgetbyworkspacesample]                   | Returns a label in the given workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_GetByWorkspace.json                            |
| [labelsListByWorkspaceSample.js][labelslistbyworkspacesample]                 | Returns a list of labels in the given workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_ListByWorkspace.json                  |
| [labelsUpdateSample.js][labelsupdatesample]                                   | Update a Label. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_Update.json                                                            |
| [operationsListSample.js][operationslistsample]                               | Returns list of operations. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Operations_List.json                                              |
| [tasksGetByWorkspaceSample.js][tasksgetbyworkspacesample]                     | Returns a task in the given workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Tasks_GetByWorkspace.json                              |
| [workspacesCreateAndUpdateSample.js][workspacescreateandupdatesample]         | Create or update a Workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_CreateAndUpdate.json                                 |
| [workspacesDeleteSample.js][workspacesdeletesample]                           | Delete a Workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_Delete.json                                                    |
| [workspacesGetSample.js][workspacesgetsample]                                 | Returns a workspace with the given name. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_Get.json                                  |
| [workspacesListByResourceGroupSample.js][workspaceslistbyresourcegroupsample] | Returns a list of workspaces in the given resource group. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_ListByResourceGroup.json |
| [workspacesListBySubscriptionSample.js][workspaceslistbysubscriptionsample]   | Returns a list of workspaces under the given subscription. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_ListBySubscription.json |
| [workspacesUpdateSample.js][workspacesupdatesample]                           | Update a Workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_Update.json                                                    |

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
node labelsCreateAndUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env DEFENDEREASM_SUBSCRIPTION_ID="<defendereasm subscription id>" DEFENDEREASM_RESOURCE_GROUP="<defendereasm resource group>" node labelsCreateAndUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[labelscreateandupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/labelsCreateAndUpdateSample.js
[labelsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/labelsDeleteSample.js
[labelsgetbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/labelsGetByWorkspaceSample.js
[labelslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/labelsListByWorkspaceSample.js
[labelsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/labelsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/operationsListSample.js
[tasksgetbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/tasksGetByWorkspaceSample.js
[workspacescreateandupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/workspacesCreateAndUpdateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/workspacesDeleteSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/workspacesGetSample.js
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/workspacesListByResourceGroupSample.js
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/workspacesListBySubscriptionSample.js
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/javascript/workspacesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-defendereasm?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/defendereasm/arm-defendereasm/README.md

# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                            |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [labelsCreateAndUpdateSample.ts][labelscreateandupdatesample]                 | Create or update a Label. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_CreateAndUpdate.json                                         |
| [labelsDeleteSample.ts][labelsdeletesample]                                   | Delete a Label. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_Delete.json                                                            |
| [labelsGetByWorkspaceSample.ts][labelsgetbyworkspacesample]                   | Returns a label in the given workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_GetByWorkspace.json                            |
| [labelsListByWorkspaceSample.ts][labelslistbyworkspacesample]                 | Returns a list of labels in the given workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_ListByWorkspace.json                  |
| [labelsUpdateSample.ts][labelsupdatesample]                                   | Update a Label. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Labels_Update.json                                                            |
| [operationsListSample.ts][operationslistsample]                               | Returns list of operations. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Operations_List.json                                              |
| [tasksGetByWorkspaceSample.ts][tasksgetbyworkspacesample]                     | Returns a task in the given workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Tasks_GetByWorkspace.json                              |
| [workspacesCreateAndUpdateSample.ts][workspacescreateandupdatesample]         | Create or update a Workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_CreateAndUpdate.json                                 |
| [workspacesDeleteSample.ts][workspacesdeletesample]                           | Delete a Workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_Delete.json                                                    |
| [workspacesGetSample.ts][workspacesgetsample]                                 | Returns a workspace with the given name. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_Get.json                                  |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample] | Returns a list of workspaces in the given resource group. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_ListByResourceGroup.json |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]   | Returns a list of workspaces under the given subscription. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_ListBySubscription.json |
| [workspacesUpdateSample.ts][workspacesupdatesample]                           | Update a Workspace. x-ms-original-file: specification/riskiq/resource-manager/Microsoft.Easm/preview/2023-04-01-preview/examples/Workspaces_Update.json                                                    |

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
node dist/labelsCreateAndUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env DEFENDEREASM_SUBSCRIPTION_ID="<defendereasm subscription id>" DEFENDEREASM_RESOURCE_GROUP="<defendereasm resource group>" node dist/labelsCreateAndUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[labelscreateandupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/labelsCreateAndUpdateSample.ts
[labelsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/labelsDeleteSample.ts
[labelsgetbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/labelsGetByWorkspaceSample.ts
[labelslistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/labelsListByWorkspaceSample.ts
[labelsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/labelsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/operationsListSample.ts
[tasksgetbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/tasksGetByWorkspaceSample.ts
[workspacescreateandupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/workspacesCreateAndUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/defendereasm/arm-defendereasm/samples/v1-beta/typescript/src/workspacesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-defendereasm?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/defendereasm/arm-defendereasm/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

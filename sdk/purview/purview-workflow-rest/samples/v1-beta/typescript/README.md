# Purview Workflow client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Purview Workflow in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [approveApprovalTaskSample.ts][approveapprovaltasksample]         | Approve an approval task. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ApproveApprovalTask.json                                                                                                                                                                              |
| [cancelWorkflowRunSample.ts][cancelworkflowrunsample]             | Cancel a workflow run. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/CancelWorkflowRun.json                                                                                                                                                                                   |
| [claimDsarTaskRequestSample.ts][claimdsartaskrequestsample]       | Claim a DSAR task request. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ClaimDSARTaskRequest.json                                                                                                                                                                            |
| [createOrReplaceWorkflowSample.ts][createorreplaceworkflowsample] | Create or replace a workflow. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/CreateOrReplaceWorkflow.json                                                                                                                                                                      |
| [deleteWorkflowSample.ts][deleteworkflowsample]                   | Delete a workflow. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/DeleteWorkflow.json                                                                                                                                                                                          |
| [getWorkflowRunSample.ts][getworkflowrunsample]                   | Get a workflow run. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowRun.json                                                                                                                                                                                         |
| [getWorkflowSample.ts][getworkflowsample]                         | Get a specific workflow. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflow.json                                                                                                                                                                                       |
| [getWorkflowTaskSample.ts][getworkflowtasksample]                 | Get a workflow task. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowTask.json                                                                                                                                                                                       |
| [listWorkflowRunsSample.ts][listworkflowrunssample]               | List workflow runs. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflowRuns.json                                                                                                                                                                                       |
| [listWorkflowTasksSample.ts][listworkflowtaskssample]             | Get all workflow tasks. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflowTasks.json                                                                                                                                                                                  |
| [listWorkflowsSample.ts][listworkflowssample]                     | List all workflows. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflows.json                                                                                                                                                                                          |
| [reassignWorkflowTaskSample.ts][reassignworkflowtasksample]       | Reassign a workflow task. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ReassignWorkflowTask.json                                                                                                                                                                             |
| [rejectApprovalTaskSample.ts][rejectapprovaltasksample]           | Reject an approval task. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/RejectApprovalTask.json                                                                                                                                                                                |
| [releaseDsarTaskRequestSample.ts][releasedsartaskrequestsample]   | Release a DSAR task request. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ReleaseDSARTaskRequest.json                                                                                                                                                                        |
| [submitUserRequestsSample.ts][submituserrequestssample]           | Submit a user request for requestor, a user request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/SubmitUserRequests.json |
| [updateTaskRequestSample.ts][updatetaskrequestsample]             | Update the status of a workflow task request. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/UpdateTaskRequest.json                                                                                                                                                            |

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
node dist/approveApprovalTaskSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" TENANTID="<tenantid>" CLIENTID="<clientid>" USERNAME="<username>" PASSWORD="<password>" node dist/approveApprovalTaskSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[approveapprovaltasksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/approveApprovalTaskSample.ts
[cancelworkflowrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/cancelWorkflowRunSample.ts
[claimdsartaskrequestsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/claimDsarTaskRequestSample.ts
[createorreplaceworkflowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/createOrReplaceWorkflowSample.ts
[deleteworkflowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/deleteWorkflowSample.ts
[getworkflowrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/getWorkflowRunSample.ts
[getworkflowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/getWorkflowSample.ts
[getworkflowtasksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/getWorkflowTaskSample.ts
[listworkflowrunssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/listWorkflowRunsSample.ts
[listworkflowtaskssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/listWorkflowTasksSample.ts
[listworkflowssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/listWorkflowsSample.ts
[reassignworkflowtasksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/reassignWorkflowTaskSample.ts
[rejectapprovaltasksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/rejectApprovalTaskSample.ts
[releasedsartaskrequestsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/releaseDsarTaskRequestSample.ts
[submituserrequestssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/submitUserRequestsSample.ts
[updatetaskrequestsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/typescript/src/updateTaskRequestSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/purview-workflow?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-workflow-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html

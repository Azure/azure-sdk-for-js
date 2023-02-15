# Purview Workflow client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Purview Workflow in some common scenarios.

| **File Name**                                                     | **Description**                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [approveApprovalTaskSample.js][approveapprovaltasksample]         | Approve an approval task. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ApproveApprovalTask.json                                                                                                                                                                              |
| [cancelWorkflowRunSample.js][cancelworkflowrunsample]             | Cancel a workflow run. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/CancelWorkflowRun.json                                                                                                                                                                                   |
| [createOrReplaceWorkflowSample.js][createorreplaceworkflowsample] | Create or replace a workflow. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/CreateOrReplaceWorkflow.json                                                                                                                                                                      |
| [deleteWorkflowSample.js][deleteworkflowsample]                   | Delete a workflow. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/DeleteWorkflow.json                                                                                                                                                                                          |
| [getWorkflowRunSample.js][getworkflowrunsample]                   | Get a workflow run. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowRun.json                                                                                                                                                                                         |
| [getWorkflowSample.js][getworkflowsample]                         | Get a specific workflow. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflow.json                                                                                                                                                                                       |
| [getWorkflowTaskSample.js][getworkflowtasksample]                 | Get a workflow task. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowTask.json                                                                                                                                                                                       |
| [listWorkflowRunsSample.js][listworkflowrunssample]               | List workflow runs. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflowRuns.json                                                                                                                                                                                       |
| [listWorkflowTasksSample.js][listworkflowtaskssample]             | Get all workflow tasks. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflowTasks.json                                                                                                                                                                                  |
| [listWorkflowsSample.js][listworkflowssample]                     | List all workflows. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflows.json                                                                                                                                                                                          |
| [reassignWorkflowTaskSample.js][reassignworkflowtasksample]       | Reassign a workflow task. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ReassignWorkflowTask.json                                                                                                                                                                             |
| [rejectApprovalTaskSample.js][rejectapprovaltasksample]           | Reject an approval task. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/RejectApprovalTask.json                                                                                                                                                                                |
| [submitUserRequestsSample.js][submituserrequestssample]           | Submit a user request for requestor, a user request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/SubmitUserRequests.json |
| [updateTaskStatusSample.js][updatetaskstatussample]               | Update the status of a workflow task request. x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/UpdateTaskRequest.json                                                                                                                                                            |

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
node approveApprovalTaskSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env ENDPOINT="<endpoint>" TENANTID="<tenantid>" CLIENTID="<clientid>" USERNAME="<username>" PASSWORD="<password>" node approveApprovalTaskSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[approveapprovaltasksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/approveApprovalTaskSample.js
[cancelworkflowrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/cancelWorkflowRunSample.js
[createorreplaceworkflowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/createOrReplaceWorkflowSample.js
[deleteworkflowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/deleteWorkflowSample.js
[getworkflowrunsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/getWorkflowRunSample.js
[getworkflowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/getWorkflowSample.js
[getworkflowtasksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/getWorkflowTaskSample.js
[listworkflowrunssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/listWorkflowRunsSample.js
[listworkflowtaskssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/listWorkflowTasksSample.js
[listworkflowssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/listWorkflowsSample.js
[reassignworkflowtasksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/reassignWorkflowTaskSample.js
[rejectapprovaltasksample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/rejectApprovalTaskSample.js
[submituserrequestssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/submitUserRequestsSample.js
[updatetaskstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/purview-workflow-rest/samples/v1-beta/javascript/updateTaskStatusSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure-rest/purview-workflow?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/purview-workflow-rest/README.md

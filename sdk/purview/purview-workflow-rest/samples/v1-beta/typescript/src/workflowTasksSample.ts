// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  ApproveApprovalTaskParameters,
  ListWorkflowTasksParameters,
  paginate,
  UpdateTaskStatusParameters,
  RejectApprovalTaskParameters,
  ReassignWorkflowTaskParameters,
  PurviewWorkflowClient,
  isUnexpected,
} from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get all workflow tasks.
 *
 * @summary Get all workflow tasks.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflowTasks.json
 */

async function workflowTasksList(
  client: PurviewWorkflowClient,
  queryParameters: ListWorkflowTasksParameters
) {
  const initialResponse = await client.path("/workflowtasks").get(queryParameters);
  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(
    `The total count of workflow tasks is ${result.length}, these workflow tasks are ${result}`
  );
}

/**
 * This sample demonstrates how to Get a workflow task.
 *
 * @summary Get a workflow task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowTask.json
 */

async function workTaskGet(client: PurviewWorkflowClient, taskId: string) {
  const result = await client.path("/workflowtasks/{taskId}", taskId).get();
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`The returned workflow task is ${result.body}`);
}

/**
 * This sample demonstrates how to Approve an approval task.
 *
 * @summary Approve an approval task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ApproveApprovalTask.json
 */

async function approveWorkflowTask(
  client: PurviewWorkflowClient,
  taskId: string,
  approvePayload: ApproveApprovalTaskParameters
) {
  const result = await client
    .path("/workflowtasks/{taskId}/approve-approval", taskId)
    .post(approvePayload);
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`Approve workflow task ${taskId} successfully.`);
}

/**
 * This sample demonstrates how to Reject an approval task.
 *
 * @summary Reject an approval task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/RejectApprovalTask.json
 */

async function rejectWorkflowTask(
  client: PurviewWorkflowClient,
  taskId: string,
  rejectPayload: RejectApprovalTaskParameters
) {
  const result = await client
    .path("/workflowtasks/{taskId}/reject-approval", taskId)
    .post(rejectPayload);
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`Reject workflow task ${taskId} successfully.`);
}

/**
 * This sample demonstrates how to Update the status of a workflow task request.
 *
 * @summary Update the status of a workflow task request.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/UpdateTaskRequest.json
 */

async function updateWorkflowTaskStatus(
  client: PurviewWorkflowClient,
  taskId: string,
  updateStatusPayload: UpdateTaskStatusParameters
) {
  const result = await client
    .path("/workflowtasks/{taskId}/change-task-status", taskId)
    .post(updateStatusPayload);
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`Update workflow task ${taskId} status successfully.`);
}

/**
 * This sample demonstrates how to Reassign a workflow task.
 *
 * @summary Reassign a workflow task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ReassignWorkflowTask.json
 */
async function workflowTaskReassign(
  client: PurviewWorkflowClient,
  taskId: string,
  reassignPayload: ReassignWorkflowTaskParameters
) {
  const result = await client
    .path("/workflowtasks/{taskId}/reassign", taskId)
    .post(reassignPayload);
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`Reassign workflow task ${taskId} successfully.`);
}

async function main() {
  // ================================================== Create client ==================================================

  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);

  // ================================================== List workflow tasks ==================================================

  const queryParameters: ListWorkflowTasksParameters = {
    queryParameters: {
      viewMode: "sent",
      timeWindow: "30d",
      maxpagesize: 1000,
      orderby: "createdTime desc",
    },
  };
  workflowTasksList(client, queryParameters);

  // ================================================== Get a workflow task ==================================================

  /*
    Workflow tasks are generated automatically inside Workflow service,  user could get workflow task id from the response of list workflow tasks api. 
    Before workflow tasks were generated, a user request should be submitted.
  */

  const taskId1 = "b02404fc-b413-11ed-afa1-0242ac120002"; // This is an example task id, user could get task id either from the response of list workflow tasks api.
  workTaskGet(client, taskId1);

  /*
    After get the workflow task id, user could according to the workflow task type or requirement to decide how to handle this workflow task.
    For approval workflow tasks, user could approve/reject/reassign task, for simple workflow tasks, user could update status or reassign task.
  */
  // ================================================== Approve a workflow task ==================================================

  const taskId2 = "f8b917f6-b414-11ed-afa1-0242ac120002"; // This is an example task id, user could get task id either from the response of list workflow tasks api.

  const approvePayload: ApproveApprovalTaskParameters = {
    body: { comment: "Thanks for raising this!" },
  }; //This payload is an example payload, please replace the payload with real data.
  approveWorkflowTask(client, taskId2, approvePayload);

  // ================================================== Reject a workflow task ==================================================

  const taskId3 = "f8b917f6-b414-11ed-afa1-0242ac120002"; // This is an example task id, user could get task id either from the response of list workflow tasks api.

  const rejectPayload: RejectApprovalTaskParameters = {
    body: { comment: "Thanks for raising this!" },
  }; //This payload is an example payload, please replace the payload with real data.

  rejectWorkflowTask(client, taskId3, rejectPayload);

  // ================================================== Update the status of a workflow task ==================================================

  const taskId4 = "5a6cc330-b415-11ed-afa1-0242ac120002"; // This is an example task id, user could get task id either from the response of list workflow tasks api.

  const updateStatusPayload: UpdateTaskStatusParameters = {
    body: { comment: "Thanks!", newStatus: "InProgress" },
  }; //This payload is an example payload, please replace the payload with real data.
  updateWorkflowTaskStatus(client, taskId4, updateStatusPayload);

  // ================================================== Reassign a workflow task ==================================================

  const taskId5 = "7d493e38-b415-11ed-afa1-0242ac120002"; // This is an example task id, user could get task id either from the response of list workflow tasks api.

  const reassignPayload: ReassignWorkflowTaskParameters = {
    body: {
      reassignments: [
        {
          reassignFrom: "eece94d9-0619-4669-bb8a-d6ecec5220bc",
          reassignTo: "7645223c-cdca-43e9-98c8-bd4d97e79e5e",
        },
      ],
    },
  }; //This payload is an example payload, please replace the payload with real data.
  workflowTaskReassign(client, taskId5, reassignPayload);
}

main().catch(console.error);

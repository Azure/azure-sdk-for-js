// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  ApproveApprovalTaskParameters,
  ListWorkflowTasksParameters,
  paginate,
  UpdateTaskStatusParameters,
  RejectApprovalTaskParameters,
  ReassignWorkflowTaskParameters,
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

async function workflowTasksList() {
  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";

  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const options: ListWorkflowTasksParameters = {
    queryParameters: {
      viewMode: "sent",
      timeWindow: "30d",
      maxpagesize: 1000,
      orderby: "createdTime desc",
    },
  };
  const initialResponse = await client.path("/workflowtasks").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

/**
 * This sample demonstrates how to Get a workflow task.
 *
 * @summary Get a workflow task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowTask.json
 */

async function workTaskGet() {
  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const taskId = "98d98e2c-23fa-4157-a3f8-ff8ce5cc095c";
  const result = await client.path("/workflowtasks/{taskId}", taskId).get();
  console.log(result);
}

/**
 * This sample demonstrates how to Approve an approval task.
 *
 * @summary Approve an approval task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ApproveApprovalTask.json
 */

async function approvalTaskApprove() {
  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const taskId = "98d98e2c-23fa-4157-a3f8-ff8ce5cc095c";
  const options: ApproveApprovalTaskParameters = {
    body: { comment: "Thanks for raising this!" },
  };
  const result = await client
    .path("/workflowtasks/{taskId}/approve-approval", taskId)
    .post(options);
  console.log(result);
}

/**
 * This sample demonstrates how to Reject an approval task.
 *
 * @summary Reject an approval task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/RejectApprovalTask.json
 */

async function approvalRequestReject() {
  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const taskId = "98d98e2c-23fa-4157-a3f8-ff8ce5cc095c";
  const options: RejectApprovalTaskParameters = {
    body: { comment: "Thanks for raising this!" },
  };
  const result = await client.path("/workflowtasks/{taskId}/reject-approval", taskId).post(options);
  console.log(result);
}

/**
 * This sample demonstrates how to Update the status of a workflow task request.
 *
 * @summary Update the status of a workflow task request.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/UpdateTaskRequest.json
 */

async function taskRequestUpdate() {
  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const taskId = "d5bd0215-df84-4245-8e18-3a8f012be376";
  const options: UpdateTaskStatusParameters = {
    body: { comment: "Thanks!", newStatus: "InProgress" },
  };
  const result = await client
    .path("/workflowtasks/{taskId}/change-task-status", taskId)
    .post(options);
  console.log(result);
}

/**
 * This sample demonstrates how to Reassign a workflow task.
 *
 * @summary Reassign a workflow task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ReassignWorkflowTask.json
 */
async function workflowTaskReassign() {
  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";

  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const taskId = "11b0244b-70ea-4c6b-9d28-08f52de40f2f";
  const options: ReassignWorkflowTaskParameters = {
    body: {
      reassignments: [
        {
          reassignFrom: "eece94d9-0619-4669-bb8a-d6ecec5220bc",
          reassignTo: "7645223c-cdca-43e9-98c8-bd4d97e79e5e",
        },
      ],
    },
  };
  const result = await client.path("/workflowtasks/{taskId}/reassign", taskId).post(options);
  console.log(result);
}

async function main() {
  workflowTasksList();

  // Workflow tasks are generated automatically inside Workflow service, user could get workflow task id from the response of list workflow tasks api. Before workflow tasks were generated, a user request should be submitted.

  // After get the workflow task id, user could get the workflow task detail by calling get workflow task api.
  workTaskGet();

  // After get the workflow task id, user could according to the workflow task type or requirement to decide how to handle this workflow task.
  // For approval workflow tasks, user could approve/reject/reassign task, foe simple workflow tasks, user could update status or reassign task.
  approvalTaskApprove();
  approvalRequestReject();
  taskRequestUpdate();
  workflowTaskReassign();
}

main().catch(console.error);

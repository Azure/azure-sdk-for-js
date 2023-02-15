// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createPurviewWorkflowClient = require("@azure-rest/purview-workflow").default;
const { UsernamePasswordCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Update the status of a workflow task request.
 *
 * @summary Update the status of a workflow task request.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/UpdateTaskRequest.json
 */
const endpoint = process.env["ENDPOINT"] || "";
const tenantId = process.env["TENANTID"] || "";
const clientId = process.env["CLIENTID"] || "";
const username = process.env["USERNAME"] || "";
const password = process.env["PASSWORD"] || "";

async function taskRequestUpdate() {
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const taskId = "d5bd0215-df84-4245-8e18-3a8f012be376";
  const options = {
    body: { comment: "Thanks!", newStatus: "InProgress" },
  };
  const result = await client
    .path("/workflowtasks/{taskId}/change-task-status", taskId)
    .post(options);
  console.log(result);
}

taskRequestUpdate().catch(console.error);

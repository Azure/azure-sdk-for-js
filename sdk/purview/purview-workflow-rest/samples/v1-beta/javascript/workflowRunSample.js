// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createPurviewWorkflowClient = require("@azure-rest/purview-workflow").default,
  { paginate } = require("@azure-rest/purview-workflow");
const { UsernamePasswordCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to List workflow runs.
 *
 * @summary List workflow runs.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflowRuns.json
 */
async function workflowRunsList() {
  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const options = {
    queryParameters: {
      timeWindow: "30d",
      orderby: "startTime desc",
      maxpagesize: 1000,
    },
  };
  const initialResponse = await client.path("/workflowruns").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

/**
 * This sample demonstrates how to Get a workflow run.
 *
 * @summary Get a workflow run.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowRun.json
 */
async function workflowRunGet() {
  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const workflowRunId = "04334a74-3400-11ed-a261-0242ac120002";
  const result = await client.path("/workflowruns/{workflowRunId}", workflowRunId).get();
  console.log(result);
}

/**
 * This sample demonstrates how to Cancel a workflow run.
 *
 * @summary Cancel a workflow run.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/CancelWorkflowRun.json
 */
async function workflowRunCancel() {
  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const workflowRunId = "b7aaf54b-59c2-4a0e-a7d0-f431044f2198";
  const options = { body: { comment: "Thanks!" } };
  const result = await client
    .path("/workflowruns/{workflowRunId}/cancel", workflowRunId)
    .post(options);
  console.log(result);
}

async function main() {
  workflowRunsList();

  //User could get workflow run id from the response of list workflow runs api.
  //After get the workflow run id, user could call get workflow run api to get a workflow run detail or cancel a workflow run.
  workflowRunGet();
  workflowRunCancel();
}

main().catch(console.error);

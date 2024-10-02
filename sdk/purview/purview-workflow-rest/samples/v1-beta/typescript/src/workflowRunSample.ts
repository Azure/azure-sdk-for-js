// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  CancelWorkflowRunParameters,
  ListWorkflowRunsParameters,
  PurviewWorkflowClient,
  isUnexpected,
  paginate,
} from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List workflow runs.
 *
 * @summary List workflow runs.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflowRuns.json
 */
async function workflowRunsList(
  client: PurviewWorkflowClient,
  queryParameter: ListWorkflowRunsParameters
) {
  const initialResponse = await client.path("/workflowruns").get(queryParameter);

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(
    `The total count of workflow runs is ${result.length}, these workflow runs are ${result}`
  );
}

/**
 * This sample demonstrates how to Get a workflow run.
 *
 * @summary Get a workflow run.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowRun.json
 */
async function workflowRunGet(client: PurviewWorkflowClient, workflowRunId: string) {
  const result = await client.path("/workflowruns/{workflowRunId}", workflowRunId).get();
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`The returned workflow run is ${result.body}`);
}

/**
 * This sample demonstrates how to Cancel a workflow run.
 *
 * @summary Cancel a workflow run.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/CancelWorkflowRun.json
 */
async function workflowRunCancel(
  client: PurviewWorkflowClient,
  workflowRunId: string,
  cancelReply: CancelWorkflowRunParameters
) {
  const result = await client
    .path("/workflowruns/{workflowRunId}/cancel", workflowRunId)
    .post(cancelReply);
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`Cancel workflow run ${workflowRunId} successfully.`);
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

  // ================================================== List workflow runs ==================================================

  const queryParameters: ListWorkflowRunsParameters = {
    queryParameters: {
      timeWindow: "30d",
      orderby: "startTime desc",
      maxpagesize: 1000,
    },
  };
  workflowRunsList(client, queryParameters);

  // ================================================== Get a workflow run ==================================================
  /*
    Workflow runs are generated automatically inside Workflow service,  user could get workflow run id from the response of list workflow runs api. 
    Before workflow workflow runs were generated, a user request should be submitted.
  */

  const workflowRunId1 = "d503b2d2-84da-4a85-9e85-6e82e39d59a0"; // This is an example workflow run id, user could get workflow run id from the response of list workflow runs api.
  workflowRunGet(client, workflowRunId1);

  // ================================================== Cancel a workflow run ==================================================

  const workflowRunId2 = "57f9d6d2-b41b-11ed-afa1-0242ac120002"; // This is an example workflow run id, user could get workflow run id from the response of list workflow runs api.
  const cancelReply: CancelWorkflowRunParameters = { body: { comment: "Thanks!" } }; //This payload is an example payload, please replace the payload with real data.

  workflowRunCancel(client, workflowRunId2, cancelReply);
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  CancelWorkflowRunParameters
} from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential} from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Cancel a workflow run.
 *
 * @summary Cancel a workflow run.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/CancelWorkflowRun.json
 */
const endpoint = process.env["ENDPOINT"] || "";
const tenantId = process.env["TENANTID"] || "";
const clientId = process.env["CLIENTID"] || "";
const username = process.env["USERNAME"] || "";
const password = process.env["PASSWORD"] || "";

async function workflowRunCancel() {
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const workflowRunId = "b7aaf54b-59c2-4a0e-a7d0-f431044f2198";
  const options: CancelWorkflowRunParameters = { body: { comment: "Thanks!" } };
  const result = await client
    .path("/workflowruns/{workflowRunId}/cancel", workflowRunId)
    .post(options);
  console.log(result);
}

workflowRunCancel().catch(console.error);

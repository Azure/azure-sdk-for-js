// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  CancelWorkflowRunParameters
} from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Cancel a workflow run.
 *
 * @summary Cancel a workflow run.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/CancelWorkflowRun.json
 */
async function workflowRunCancel() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const workflowRunId = "b7aaf54b-59c2-4a0e-a7d0-f431044f2198";
  const options: CancelWorkflowRunParameters = { body: { comment: "Thanks!" } };
  const result = await client
    .path("/workflowruns/{workflowRunId}/cancel", workflowRunId)
    .post(options);
  console.log(result);
}

workflowRunCancel().catch(console.error);

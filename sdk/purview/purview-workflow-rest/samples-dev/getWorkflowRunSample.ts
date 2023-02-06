// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get a workflow run.
 *
 * @summary Get a workflow run.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowRun.json
 */
async function workflowRunGet() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const workflowRunId = "04334a74-3400-11ed-a261-0242ac120002";
  const result = await client
    .path("/workflowruns/{workflowRunId}", workflowRunId)
    .get();
  console.log(result);
}

workflowRunGet().catch(console.error);

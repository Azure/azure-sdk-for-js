// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get a workflow run.
 *
 * @summary Get a workflow run.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowRun.json
 */
const endpoint = process.env["ENDPOINT"] || "";
const tenantId = process.env["TENANTID"] || "";
const clientId = process.env["CLIENTID"] || "";
const username = process.env["USERNAME"] || "";
const password = process.env["PASSWORD"] || "";

async function workflowRunGet() {
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const workflowRunId = "04334a74-3400-11ed-a261-0242ac120002";
  const result = await client.path("/workflowruns/{workflowRunId}", workflowRunId).get();
  console.log(result);
}

workflowRunGet().catch(console.error);

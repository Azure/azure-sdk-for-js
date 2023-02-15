// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete a workflow.
 *
 * @summary Delete a workflow.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/DeleteWorkflow.json
 */
const endpoint = process.env["ENDPOINT"] || "";
const tenantId = process.env["TENANTID"] || "";
const clientId = process.env["CLIENTID"] || "";
const username = process.env["USERNAME"] || "";
const password = process.env["PASSWORD"] || "";

async function workflowDelete() {
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const workflowId = "4afb5752-e47f-43a1-8ba7-c696bf8d2745";
  const result = await client.path("/workflows/{workflowId}", workflowId).delete();
  console.log(result);
}

workflowDelete().catch(console.error);

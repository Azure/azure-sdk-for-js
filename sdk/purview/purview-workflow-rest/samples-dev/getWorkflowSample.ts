// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get a specific workflow.
 *
 * @summary Get a specific workflow.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflow.json
 */
async function workflowGet() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const workflowId = "d503b2d2-84da-4a85-9e85-6e82e39d59a0";
  const result = await client.path("/workflows/{workflowId}", workflowId).get();
  console.log(result);
}

workflowGet().catch(console.error);

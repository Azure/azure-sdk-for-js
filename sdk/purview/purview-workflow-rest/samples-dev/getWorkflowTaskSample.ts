// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get a workflow task.
 *
 * @summary Get a workflow task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflowTask.json
 */
async function workTaskGet() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const taskId = "98d98e2c-23fa-4157-a3f8-ff8ce5cc095c";
  const result = await client.path("/workflowtasks/{taskId}", taskId).get();
  console.log(result);
}

workTaskGet().catch(console.error);

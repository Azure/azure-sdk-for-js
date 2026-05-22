// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Batch inference endpoint in the workspace.
 *
 * @summary lists Batch inference endpoint in the workspace.
 * x-ms-original-file: 2025-12-01/Workspace/BatchEndpoint/list.json
 */
async function listWorkspaceBatchEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.batchEndpoints.list("test-rg", "my-aml-workspace", {
    count: 1,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkspaceBatchEndpoint();
}

main().catch(console.error);

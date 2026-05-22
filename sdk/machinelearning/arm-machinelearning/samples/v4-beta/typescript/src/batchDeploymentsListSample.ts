// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Batch inference deployments in the workspace.
 *
 * @summary lists Batch inference deployments in the workspace.
 * x-ms-original-file: 2025-12-01/Workspace/BatchDeployment/list.json
 */
async function listWorkspaceBatchDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.batchDeployments.list(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    { orderBy: "string", top: 1 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listWorkspaceBatchDeployment();
}

main().catch(console.error);

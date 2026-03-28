// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a batch inference deployment by id.
 *
 * @summary gets a batch inference deployment by id.
 * x-ms-original-file: 2025-12-01/Workspace/BatchDeployment/get.json
 */
async function getWorkspaceBatchDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.batchDeployments.get(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkspaceBatchDeployment();
}

main().catch(console.error);

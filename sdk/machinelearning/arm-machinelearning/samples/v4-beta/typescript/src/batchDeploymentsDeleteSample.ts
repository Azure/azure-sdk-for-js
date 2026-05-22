// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Batch Inference deployment (asynchronous).
 *
 * @summary delete Batch Inference deployment (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/BatchDeployment/delete.json
 */
async function deleteWorkspaceBatchDeployment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.batchDeployments.delete(
    "test-rg",
    "my-aml-workspace",
    "testEndpointName",
    "testDeploymentName",
  );
}

async function main(): Promise<void> {
  await deleteWorkspaceBatchDeployment();
}

main().catch(console.error);

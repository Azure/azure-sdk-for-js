// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Batch Inference Endpoint (asynchronous).
 *
 * @summary delete Batch Inference Endpoint (asynchronous).
 * x-ms-original-file: 2025-12-01/Workspace/BatchEndpoint/delete.json
 */
async function deleteWorkspaceBatchEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.batchEndpoints.delete("resourceGroup-1234", "testworkspace", "testBatchEndpoint");
}

async function main(): Promise<void> {
  await deleteWorkspaceBatchEndpoint();
}

main().catch(console.error);

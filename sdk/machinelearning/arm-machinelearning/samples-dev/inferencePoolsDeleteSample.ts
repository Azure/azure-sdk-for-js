// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete InferencePool (asynchronous).
 *
 * @summary delete InferencePool (asynchronous).
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferencePool/delete.json
 */
async function deleteWorkspaceInferencePool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.inferencePools.delete("test-rg", "my-aml-workspace", "string");
}

async function main(): Promise<void> {
  await deleteWorkspaceInferencePool();
}

main().catch(console.error);

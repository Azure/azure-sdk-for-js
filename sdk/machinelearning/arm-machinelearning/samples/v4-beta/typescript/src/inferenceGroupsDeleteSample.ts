// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete InferenceGroup (asynchronous).
 *
 * @summary delete InferenceGroup (asynchronous).
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceGroup/delete.json
 */
async function deleteWorkspaceInferenceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.inferenceGroups.delete("test-rg", "my-aml-workspace", "string", "string");
}

async function main(): Promise<void> {
  await deleteWorkspaceInferenceGroup();
}

main().catch(console.error);

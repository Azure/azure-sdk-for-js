// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update InferenceGroup (asynchronous).
 *
 * @summary update InferenceGroup (asynchronous).
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceGroup/update.json
 */
async function updateWorkspaceInferenceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.inferenceGroups.update(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
    {
      sku: { name: "string", capacity: 1, family: "string", size: "string", tier: "Standard" },
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateWorkspaceInferenceGroup();
}

main().catch(console.error);

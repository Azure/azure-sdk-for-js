// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get InferenceGroup.
 *
 * @summary get InferenceGroup.
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceGroup/get.json
 */
async function getWorkspaceInferenceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.inferenceGroups.get(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkspaceInferenceGroup();
}

main().catch(console.error);

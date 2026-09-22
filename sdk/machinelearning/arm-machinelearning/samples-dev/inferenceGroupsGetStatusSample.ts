// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve inference group status.
 *
 * @summary retrieve inference group status.
 * x-ms-original-file: 2026-03-15-preview/Workspace/InferenceGroup/getStatus.json
 */
async function getStatusWorkspaceInferenceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.inferenceGroups.getStatus(
    "test-rg",
    "my-aml-workspace",
    "string",
    "string",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getStatusWorkspaceInferenceGroup();
}

main().catch(console.error);

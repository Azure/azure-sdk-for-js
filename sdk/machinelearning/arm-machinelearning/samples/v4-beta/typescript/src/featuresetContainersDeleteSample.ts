// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete container.
 *
 * @summary delete container.
 * x-ms-original-file: 2025-12-01/Workspace/FeaturesetContainer/delete.json
 */
async function deleteWorkspaceFeaturesetContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.featuresetContainers.delete("test-rg", "my-aml-workspace", "string");
}

async function main(): Promise<void> {
  await deleteWorkspaceFeaturesetContainer();
}

main().catch(console.error);

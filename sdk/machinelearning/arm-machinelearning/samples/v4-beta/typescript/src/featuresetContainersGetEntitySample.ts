// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get container.
 *
 * @summary get container.
 * x-ms-original-file: 2025-12-01/Workspace/FeaturesetContainer/getEntity.json
 */
async function getEntityWorkspaceFeaturesetContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.featuresetContainers.getEntity(
    "test-rg",
    "my-aml-workspace",
    "string",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getEntityWorkspaceFeaturesetContainer();
}

main().catch(console.error);

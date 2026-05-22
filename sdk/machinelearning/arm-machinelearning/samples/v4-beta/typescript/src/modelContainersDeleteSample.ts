// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete container.
 *
 * @summary delete container.
 * x-ms-original-file: 2025-12-01/Workspace/ModelContainer/delete.json
 */
async function deleteWorkspaceModelContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.modelContainers.delete("testrg123", "workspace123", "testContainer");
}

async function main(): Promise<void> {
  await deleteWorkspaceModelContainer();
}

main().catch(console.error);

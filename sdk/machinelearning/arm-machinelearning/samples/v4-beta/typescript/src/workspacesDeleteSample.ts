// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a machine learning workspace.
 *
 * @summary deletes a machine learning workspace.
 * x-ms-original-file: 2025-12-01/Workspace/delete.json
 */
async function deleteWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  await client.workspaces.delete("workspace-1234", "testworkspace");
}

async function main(): Promise<void> {
  await deleteWorkspace();
}

main().catch(console.error);

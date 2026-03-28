// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a machine learning workspace with the specified parameters.
 *
 * @summary updates a machine learning workspace with the specified parameters.
 * x-ms-original-file: 2025-12-01/Workspace/update.json
 */
async function updateWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update("workspace-1234", "testworkspace", {
    description: "new description",
    friendlyName: "New friendly name",
    publicNetworkAccess: "Disabled",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateWorkspace();
}

main().catch(console.error);

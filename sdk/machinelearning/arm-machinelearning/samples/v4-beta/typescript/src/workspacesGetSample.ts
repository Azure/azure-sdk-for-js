// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the properties of the specified machine learning workspace.
 *
 * @summary gets the properties of the specified machine learning workspace.
 * x-ms-original-file: 2025-12-01/Workspace/get.json
 */
async function getWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("workspace-1234", "testworkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await getWorkspace();
}

main().catch(console.error);

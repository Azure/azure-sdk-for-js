// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Workspace resource.
 *
 * @summary get a Workspace resource.
 * x-ms-original-file: 2026-05-01-preview/Workspaces_Get.json
 */
async function getAWorkspaceInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("exampleRG", "exampleWorkspace");
  console.log(result);
}

async function main(): Promise<void> {
  await getAWorkspaceInAResourceGroup();
}

main().catch(console.error);

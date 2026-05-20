// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Workspace resource.
 *
 * @summary delete a Workspace resource.
 * x-ms-original-file: 2026-05-01-preview/Workspaces_Delete.json
 */
async function deleteAWorkspaceInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  await client.workspaces.delete("exampleRG", "exampleWorkspace");
}

async function main(): Promise<void> {
  await deleteAWorkspaceInAResourceGroup();
}

main().catch(console.error);

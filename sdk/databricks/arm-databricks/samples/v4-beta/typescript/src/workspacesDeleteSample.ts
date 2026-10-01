// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the workspace.
 *
 * @summary deletes the workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceDelete.json
 */
async function deleteAWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  await client.workspaces.delete("rg", "myWorkspace");
}

/**
 * This sample demonstrates how to deletes the workspace.
 *
 * @summary deletes the workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceDeleteForceDeletion.json
 */
async function deleteAWorkspaceWithForceDeletionParameter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  await client.workspaces.delete("rg", "myWorkspace", { forceDeletion: false });
}

async function main(): Promise<void> {
  await deleteAWorkspace();
  await deleteAWorkspaceWithForceDeletionParameter();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a workspace.
 *
 * @summary updates a workspace.
 * x-ms-original-file: 2026-01-01/WorkspaceUpdate.json
 */
async function updateAWorkspaceTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update("rg", "myWorkspace", {
    tags: { mytag1: "myvalue1" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAWorkspaceTags();
}

main().catch(console.error);

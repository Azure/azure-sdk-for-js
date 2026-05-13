// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update a Workspace.
 *
 * @summary the operation to update a Workspace.
 * x-ms-original-file: 2026-05-01-preview/Workspaces_Update.json
 */
async function updateAWorkspaceInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.update("exampleRG", "exampleWorkspace", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/exampleResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleIdentity":
          {},
      },
    },
    tags: { environment: "production", department: "engineering", project: "chaos-testing" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAWorkspaceInAResourceGroup();
}

main().catch(console.error);

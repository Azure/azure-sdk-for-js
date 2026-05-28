// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Workspace resource.
 *
 * @summary create or update a Workspace resource.
 * x-ms-original-file: 2026-05-01-preview/Workspaces_CreateOrUpdate.json
 */
async function createOrUpdateAWorkspaceInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("exampleRG", "exampleWorkspace", {
    properties: {
      scopes: [
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/exampleResourceGroup",
      ],
    },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/exampleResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/exampleIdentity":
          {},
      },
    },
    location: "westus2",
    tags: { environment: "production", department: "engineering", project: "chaos-testing" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAWorkspaceInAResourceGroup();
}

main().catch(console.error);

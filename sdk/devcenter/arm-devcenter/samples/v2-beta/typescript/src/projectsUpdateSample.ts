// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to partially updates a project.
 *
 * @summary partially updates a project.
 * x-ms-original-file: 2026-01-01-preview/Projects_Patch.json
 */
async function projectsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projects.update("rg1", "DevProject", {
    description: "This is my first project.",
    catalogSettings: { catalogItemSyncTypes: ["EnvironmentDefinition"] },
    displayName: "Dev",
    assignedGroups: [{ objectId: "33333333-3333-3333-3333-333333333333", scope: "DevBox" }],
    tags: { CostCenter: "R&D" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await projectsUpdate();
}

main().catch(console.error);

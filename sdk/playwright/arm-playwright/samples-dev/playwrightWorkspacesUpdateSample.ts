// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementClient } from "@azure/arm-playwright";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a PlaywrightWorkspace
 *
 * @summary update a PlaywrightWorkspace
 * x-ms-original-file: 2025-07-01-preview/PlaywrightWorkspaces_Update.json
 */
async function playwrightWorkspacesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const result = await client.playwrightWorkspaces.update("dummyrg", "myWorkspace", {
    tags: { Team: "Dev Exp", Division: "LT" },
    properties: { regionalAffinity: "Disabled" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await playwrightWorkspacesUpdate();
}

main().catch(console.error);

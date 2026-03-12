// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to updates a Playwright workspace resource synchronously.
 *
 * @summary updates a Playwright workspace resource synchronously.
 * x-ms-original-file: 2025-09-01/PlaywrightWorkspaces_Update.json
 */

import { PlaywrightManagementClient } from "@azure/arm-playwright";
import { DefaultAzureCredential } from "@azure/identity";

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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementClient } from "@azure/arm-playwright";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Playwright workspace resource asynchronously.
 *
 * @summary deletes a Playwright workspace resource asynchronously.
 * x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_Delete.json
 */
async function playwrightWorkspacesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  await client.playwrightWorkspaces.delete("dummyrg", "myWorkspace");
}

async function main(): Promise<void> {
  await playwrightWorkspacesDelete();
}

main().catch(console.error);

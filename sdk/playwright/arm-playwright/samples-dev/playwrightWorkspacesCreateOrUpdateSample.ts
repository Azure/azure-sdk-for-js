// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementClient } from "@azure/arm-playwright";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a PlaywrightWorkspace
 *
 * @summary create a PlaywrightWorkspace
 * x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_CreateOrUpdate.json
 */
async function playwrightWorkspacesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const result = await client.playwrightWorkspaces.createOrUpdate("dummyrg", "myWorkspace", {
    location: "westus3",
    tags: { Team: "Dev Exp" },
    properties: {
      regionalAffinity: "Enabled",
      localAuth: "Enabled",
      reporting: "Enabled",
      storageUri: "https://examplestorageaccount.blob.core.windows.net",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await playwrightWorkspacesCreateOrUpdate();
}

main().catch(console.error);

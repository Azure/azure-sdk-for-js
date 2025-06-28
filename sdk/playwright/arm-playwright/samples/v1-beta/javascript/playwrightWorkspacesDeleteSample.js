// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlaywrightManagementClient } = require("@azure/arm-playwright");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a PlaywrightWorkspace
 *
 * @summary delete a PlaywrightWorkspace
 * x-ms-original-file: 2025-07-01-preview/PlaywrightWorkspaces_Delete.json
 */
async function playwrightWorkspacesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  await client.playwrightWorkspaces.delete("dummyrg", "myWorkspace");
}

async function main() {
  await playwrightWorkspacesDelete();
}

main().catch(console.error);

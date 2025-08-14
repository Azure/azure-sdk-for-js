// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlaywrightManagementClient } = require("@azure/arm-playwright");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Playwright workspace resource asynchronously.
 *
 * @summary deletes a Playwright workspace resource asynchronously.
 * x-ms-original-file: 2025-09-01/PlaywrightWorkspaces_Delete.json
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

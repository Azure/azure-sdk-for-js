// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlaywrightManagementClient } = require("@azure/arm-playwright");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a PlaywrightWorkspace
 *
 * @summary get a PlaywrightWorkspace
 * x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_Get.json
 */
async function playwrightWorkspacesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const result = await client.playwrightWorkspaces.get("dummyrg", "myWorkspace");
  console.log(result);
}

async function main() {
  await playwrightWorkspacesGet();
}

main().catch(console.error);

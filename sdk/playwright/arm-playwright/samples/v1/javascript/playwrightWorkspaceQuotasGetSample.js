// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlaywrightManagementClient } = require("@azure/arm-playwright");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Playwright workspace quota resource by name.
 *
 * @summary gets a Playwright workspace quota resource by name.
 * x-ms-original-file: 2025-09-01/PlaywrightWorkspaceQuotas_Get.json
 */
async function playwrightWorkspaceQuotasGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const result = await client.playwrightWorkspaceQuotas.get(
    "dummyrg",
    "myWorkspace",
    "ExecutionMinutes",
  );
  console.log(result);
}

async function main() {
  await playwrightWorkspaceQuotasGet();
}

main().catch(console.error);

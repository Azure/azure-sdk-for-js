// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlaywrightManagementClient } = require("@azure/arm-playwright");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get subscription-level location-based Playwright quota resource by name.
 *
 * @summary get subscription-level location-based Playwright quota resource by name.
 * x-ms-original-file: 2025-07-01-preview/PlaywrightQuotas_Get.json
 */
async function playwrightQuotasGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const result = await client.playwrightQuotas.get("eastus", "ExecutionMinutes");
  console.log(result);
}

async function main() {
  await playwrightQuotasGet();
}

main().catch(console.error);

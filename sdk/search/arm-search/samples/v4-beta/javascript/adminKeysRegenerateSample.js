// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates either the primary or secondary admin API key. You can only regenerate one key at a time.
 *
 * @summary regenerates either the primary or secondary admin API key. You can only regenerate one key at a time.
 * x-ms-original-file: 2026-03-01-preview/SearchRegenerateAdminKey.json
 */
async function searchRegenerateAdminKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.adminKeys.regenerate("rg1", "mysearchservice", "primary");
  console.log(result);
}

async function main() {
  await searchRegenerateAdminKey();
}

main().catch(console.error);

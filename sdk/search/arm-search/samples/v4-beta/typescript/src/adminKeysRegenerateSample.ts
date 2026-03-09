// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerates either the primary or secondary admin API key. You can only regenerate one key at a time.
 *
 * @summary regenerates either the primary or secondary admin API key. You can only regenerate one key at a time.
 * x-ms-original-file: 2025-05-01/SearchRegenerateAdminKey.json
 */
async function searchRegenerateAdminKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.adminKeys.regenerate("rg1", "mysearchservice", "primary");
  console.log(result);
}

async function main(): Promise<void> {
  await searchRegenerateAdminKey();
}

main().catch(console.error);

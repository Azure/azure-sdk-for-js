// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the primary and secondary admin API keys for the specified Azure AI Search service.
 *
 * @summary gets the primary and secondary admin API keys for the specified Azure AI Search service.
 * x-ms-original-file: 2025-05-01/SearchGetAdminKeys.json
 */
async function searchGetAdminKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.adminKeys.get("rg1", "mysearchservice");
  console.log(result);
}

async function main(): Promise<void> {
  await searchGetAdminKeys();
}

main().catch(console.error);

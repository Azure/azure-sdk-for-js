// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified query key. Unlike admin keys, query keys are not regenerated. The process for regenerating a query key is to delete and then recreate it.
 *
 * @summary deletes the specified query key. Unlike admin keys, query keys are not regenerated. The process for regenerating a query key is to delete and then recreate it.
 * x-ms-original-file: 2025-05-01/SearchDeleteQueryKey.json
 */
async function searchDeleteQueryKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  await client.queryKeys.delete("rg1", "mysearchservice", "<a query API key>");
}

async function main(): Promise<void> {
  await searchDeleteQueryKey();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the quota usage for a search SKU in the given subscription.
 *
 * @summary gets the quota usage for a search SKU in the given subscription.
 * x-ms-original-file: 2026-03-01-preview/GetQuotaUsage.json
 */
async function getQuotaUsage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.usageBySubscriptionSku("westus", "free");
  console.log(result);
}

async function main(): Promise<void> {
  await getQuotaUsage();
}

main().catch(console.error);

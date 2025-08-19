// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the quota usage for a search SKU in the given subscription.
 *
 * @summary Gets the quota usage for a search SKU in the given subscription.
 * x-ms-original-file: specification/search/resource-manager/Microsoft.Search/stable/2025-05-01/examples/GetQuotaUsage.json
 */

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getQuotaUsage(): Promise<void> {
  const subscriptionId = process.env["SEARCH_SUBSCRIPTION_ID"] || "subid";
  const location = "westus";
  const skuName = "free";
  const credential = new DefaultAzureCredential();
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.usageBySubscriptionSku(location, skuName);
  console.log(result);
}

async function main(): Promise<void> {
  await getQuotaUsage();
}

main().catch(console.error);

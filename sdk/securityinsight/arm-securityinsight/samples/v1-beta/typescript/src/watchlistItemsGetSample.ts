// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a watchlist item.
 *
 * @summary get a watchlist item.
 * x-ms-original-file: 2025-07-01-preview/watchlists/GetWatchlistItemById.json
 */
async function getAWatchlistItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.watchlistItems.get(
    "myRg",
    "myWorkspace",
    "highValueAsset",
    "3f8901fe-63d9-4875-9ad5-9fb3b8105797",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAWatchlistItem();
}

main().catch(console.error);

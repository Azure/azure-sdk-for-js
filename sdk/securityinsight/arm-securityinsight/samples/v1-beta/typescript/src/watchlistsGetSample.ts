// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a watchlist, without its watchlist items.
 *
 * @summary get a watchlist, without its watchlist items.
 * x-ms-original-file: 2025-07-01-preview/watchlists/GetWatchlistByAlias.json
 */
async function getAWatchlist(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.watchlists.get("myRg", "myWorkspace", "highValueAsset");
  console.log(result);
}

async function main(): Promise<void> {
  await getAWatchlist();
}

main().catch(console.error);

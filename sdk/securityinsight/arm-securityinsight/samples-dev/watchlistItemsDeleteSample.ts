// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a watchlist item.
 *
 * @summary delete a watchlist item.
 * x-ms-original-file: 2025-07-01-preview/watchlists/DeleteWatchlistItem.json
 */
async function deleteAWatchlistItem(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.watchlistItems.delete(
    "myRg",
    "myWorkspace",
    "highValueAsset",
    "4008512e-1d30-48b2-9ee2-d3612ed9d3ea",
  );
}

async function main(): Promise<void> {
  await deleteAWatchlistItem();
}

main().catch(console.error);

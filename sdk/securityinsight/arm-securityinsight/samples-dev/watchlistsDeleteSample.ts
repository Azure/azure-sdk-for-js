// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a watchlist.
 *
 * @summary delete a watchlist.
 * x-ms-original-file: 2025-07-01-preview/watchlists/DeleteWatchlist.json
 */
async function deleteAWatchlist(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  await client.watchlists.delete("myRg", "myWorkspace", "highValueAsset");
}

async function main(): Promise<void> {
  await deleteAWatchlist();
}

main().catch(console.error);

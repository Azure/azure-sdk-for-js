// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a watchlist, without its watchlist items.
 *
 * @summary get a watchlist, without its watchlist items.
 * x-ms-original-file: 2025-07-01-preview/watchlists/GetWatchlistByAlias.json
 */
async function getAWatchlist() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.watchlists.get("myRg", "myWorkspace", "highValueAsset");
  console.log(result);
}

async function main() {
  await getAWatchlist();
}

main().catch(console.error);

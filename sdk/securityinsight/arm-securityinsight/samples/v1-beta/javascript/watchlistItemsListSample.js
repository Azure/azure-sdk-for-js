// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all watchlist Items.
 *
 * @summary get all watchlist Items.
 * x-ms-original-file: 2025-07-01-preview/watchlists/GetWatchlistItems.json
 */
async function getAllWatchlistItems() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.watchlistItems.list("myRg", "myWorkspace", "highValueAsset")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllWatchlistItems();
}

main().catch(console.error);

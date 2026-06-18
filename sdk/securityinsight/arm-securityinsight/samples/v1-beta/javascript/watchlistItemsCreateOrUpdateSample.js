// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a watchlist item.
 *
 * @summary create or update a watchlist item.
 * x-ms-original-file: 2025-07-01-preview/watchlists/CreateWatchlistItem.json
 */
async function createOrUpdateAWatchlistItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.watchlistItems.createOrUpdate(
    "myRg",
    "myWorkspace",
    "highValueAsset",
    "82ba292c-dc97-4dfc-969d-d4dd9e666842",
    {
      etag: "0300bf09-0000-0000-0000-5c37296e0000",
      itemsKeyValue: {
        "Business tier": "10.0.2.0/24",
        "Data tier": "10.0.2.0/24",
        "Gateway subnet": "10.0.255.224/27",
        "Private DMZ in": "10.0.0.0/27",
        "Public DMZ out": "10.0.0.96/27",
        "Web Tier": "10.0.1.0/24",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAWatchlistItem();
}

main().catch(console.error);

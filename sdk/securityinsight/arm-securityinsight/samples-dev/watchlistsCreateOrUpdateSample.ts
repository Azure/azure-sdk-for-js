// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Watchlist and its Watchlist Items (bulk creation, e.g. through text/csv content type). To create a Watchlist and its Items, we should call this endpoint with rawContent and contentType properties.
 *
 * @summary create or update a Watchlist and its Watchlist Items (bulk creation, e.g. through text/csv content type). To create a Watchlist and its Items, we should call this endpoint with rawContent and contentType properties.
 * x-ms-original-file: 2025-07-01-preview/watchlists/CreateWatchlist.json
 */
async function createOrUpdateAWatchlist(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.watchlists.createOrUpdate("myRg", "myWorkspace", "highValueAsset", {
    etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
    description: "Watchlist from CSV content",
    displayName: "High Value Assets Watchlist",
    itemsSearchKey: "header1",
    provider: "Microsoft",
    source: "watchlist.csv",
    sourceType: "Local",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a Watchlist and its Watchlist Items (bulk creation, e.g. through text/csv content type). To create a Watchlist and its Items, we should call this endpoint with rawContent and contentType properties.
 *
 * @summary create or update a Watchlist and its Watchlist Items (bulk creation, e.g. through text/csv content type). To create a Watchlist and its Items, we should call this endpoint with rawContent and contentType properties.
 * x-ms-original-file: 2025-07-01-preview/watchlists/CreateWatchlistAndWatchlistItems.json
 */
async function createOrUpdateAWatchlistAndBulkCreatesWatchlistItems(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.watchlists.createOrUpdate("myRg", "myWorkspace", "highValueAsset", {
    etag: '"0300bf09-0000-0000-0000-5c37296e0000"',
    description: "Watchlist from CSV content",
    contentType: "text/csv",
    displayName: "High Value Assets Watchlist",
    itemsSearchKey: "header1",
    numberOfLinesToSkip: 1,
    provider: "Microsoft",
    rawContent: "This line will be skipped\nheader1,header2\nvalue1,value2",
    source: "watchlist.csv",
    sourceType: "Local",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAWatchlist();
  await createOrUpdateAWatchlistAndBulkCreatesWatchlistItems();
}

main().catch(console.error);

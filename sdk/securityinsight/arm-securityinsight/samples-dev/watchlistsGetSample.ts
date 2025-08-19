// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a watchlist, without its watchlist items.
 *
 * @summary Gets a watchlist, without its watchlist items.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/watchlists/GetWatchlistByAlias.json
 */

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAWatchlist(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const watchlistAlias = "highValueAsset";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.watchlists.get(resourceGroupName, workspaceName, watchlistAlias);
  console.log(result);
}

async function main(): Promise<void> {
  await getAWatchlist();
}

main().catch(console.error);

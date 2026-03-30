// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all HorizonDb clusters in a subscription.
 *
 * @summary lists all HorizonDb clusters in a subscription.
 * x-ms-original-file: 2026-01-20-preview/Clusters_ListBySubscription.json
 */
async function listHorizonDbClustersBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.horizonDbClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHorizonDbClustersBySubscription();
}

main().catch(console.error);

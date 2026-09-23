// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops a running HorizonDB cluster.
 *
 * @summary stops a running HorizonDB cluster.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Stop.json
 */
async function stopAHorizonDBCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbClusters.stop("exampleresourcegroup", "examplecluster");
}

async function main() {
  await stopAHorizonDBCluster();
}

main().catch(console.error);

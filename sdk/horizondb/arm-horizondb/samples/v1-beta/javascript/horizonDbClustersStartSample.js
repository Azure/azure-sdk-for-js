// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a stopped HorizonDB cluster.
 *
 * @summary starts a stopped HorizonDB cluster.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Start.json
 */
async function startAHorizonDBCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbClusters.start("exampleresourcegroup", "examplecluster");
}

async function main() {
  await startAHorizonDBCluster();
}

main().catch(console.error);

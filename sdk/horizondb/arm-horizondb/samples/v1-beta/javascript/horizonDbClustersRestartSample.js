// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restarts a HorizonDB cluster.
 *
 * @summary restarts a HorizonDB cluster.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Restart.json
 */
async function restartAHorizonDBCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbClusters.restart("exampleresourcegroup", "examplecluster");
}

async function main() {
  await restartAHorizonDBCluster();
}

main().catch(console.error);

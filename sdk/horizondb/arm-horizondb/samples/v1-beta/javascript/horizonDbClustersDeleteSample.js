// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a HorizonDb cluster.
 *
 * @summary deletes a HorizonDb cluster.
 * x-ms-original-file: 2026-01-20-preview/Clusters_Delete.json
 */
async function deleteAHorizonDbCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbClusters.delete("exampleresourcegroup", "examplecluster");
}

async function main() {
  await deleteAHorizonDbCluster();
}

main().catch(console.error);

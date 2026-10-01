// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a HorizonDB cluster.
 *
 * @summary deletes a HorizonDB cluster.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Delete.json
 */
async function deleteAHorizonDBCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbClusters.delete("exampleresourcegroup", "examplecluster");
}

async function main() {
  await deleteAHorizonDBCluster();
}

main().catch(console.error);

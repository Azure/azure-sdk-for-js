// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing HorizonDb cluster (e.g., tags, virtual cores, replica count).
 *
 * @summary updates an existing HorizonDb cluster (e.g., tags, virtual cores, replica count).
 * x-ms-original-file: 2026-01-20-preview/Clusters_Update.json
 */
async function updateAHorizonDbCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbClusters.update("exampleresourcegroup", "examplecluster", {
    tags: { team: "updated-data-platform" },
    properties: { vCores: 8, administratorLoginPassword: "examplenewpassword" },
  });
  console.log(result);
}

async function main() {
  await updateAHorizonDbCluster();
}

main().catch(console.error);

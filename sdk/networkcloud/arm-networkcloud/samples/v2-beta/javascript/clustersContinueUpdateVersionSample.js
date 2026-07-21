// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to trigger the continuation of an update for a cluster with a matching update strategy that has paused after completing a segment of the update.
 *
 * @summary trigger the continuation of an update for a cluster with a matching update strategy that has paused after completing a segment of the update.
 * x-ms-original-file: 2026-05-01-preview/Clusters_ContinueUpdateVersion.json
 */
async function continueUpdateClusterVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusters.continueUpdateVersion("resourceGroupName", "clusterName", {
    machineGroupTargetingMode: "AlphaByRack",
    safeguardMode: "All",
  });
  console.log(result);
}

async function main() {
  await continueUpdateClusterVersion();
}

main().catch(console.error);

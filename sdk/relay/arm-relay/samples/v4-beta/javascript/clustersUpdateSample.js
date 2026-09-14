// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates mutable properties of a Relay cluster.
 *
 * @summary updates mutable properties of a Relay cluster.
 * x-ms-original-file: 2026-07-01-preview/Clusters/ClusterPatch.json
 */
async function clusterPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.clusters.update("myResourceGroup", "testCluster", {
    sku: { name: "Dedicated", tier: "Dedicated", capacity: 4 },
    tags: { environment: "production", owner: "relay" },
  });
  console.log(result);
}

async function main() {
  await clusterPatch();
}

main().catch(console.error);

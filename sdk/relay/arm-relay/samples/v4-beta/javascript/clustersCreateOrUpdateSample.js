// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Relay cluster.
 *
 * @summary creates or updates a Relay cluster.
 * x-ms-original-file: 2026-07-01-preview/Clusters/ClusterPut.json
 */
async function clusterPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("myResourceGroup", "testCluster", {
    location: "South Central US",
    properties: { zoneRedundant: true },
    sku: { name: "Dedicated", tier: "Dedicated", capacity: 3 },
    tags: { environment: "production" },
  });
  console.log(result);
}

async function main() {
  await clusterPut();
}

main().catch(console.error);

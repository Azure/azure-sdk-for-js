// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Relay cluster.
 *
 * @summary gets a Relay cluster.
 * x-ms-original-file: 2026-07-01-preview/Clusters/ClusterGet.json
 */
async function clusterGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.clusters.get("myResourceGroup", "testCluster");
  console.log(result);
}

async function main() {
  await clusterGet();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelayAPI } = require("@azure/arm-relay");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists SKUs supported by a Relay cluster.
 *
 * @summary lists SKUs supported by a Relay cluster.
 * x-ms-original-file: 2026-07-01-preview/Clusters/ClusterSkusGet.json
 */
async function clusterSkusGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new RelayAPI(credential, subscriptionId);
  const result = await client.clusters.listSkus("myResourceGroup", "testCluster");
  console.log(result);
}

async function main() {
  await clusterSkusGet();
}

main().catch(console.error);

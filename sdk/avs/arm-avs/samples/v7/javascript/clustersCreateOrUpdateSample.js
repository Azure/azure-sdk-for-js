// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Cluster
 *
 * @summary create a Cluster
 * x-ms-original-file: 2024-09-01/Clusters_CreateOrUpdate.json
 */
async function clustersCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.clusters.createOrUpdate("group1", "cloud1", "cluster1", {
    sku: { name: "AV20" },
    properties: { clusterSize: 3 },
  });
  console.log(result);
}

async function main() {
  await clustersCreateOrUpdate();
}

main().catch(console.error);

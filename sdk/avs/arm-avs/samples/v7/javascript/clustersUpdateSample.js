// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Cluster
 *
 * @summary update a Cluster
 * x-ms-original-file: 2024-09-01/Clusters_Update.json
 */
async function clustersUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.clusters.update("group1", "cloud1", "cluster1", {
    properties: { clusterSize: 4 },
  });
  console.log(result);
}

async function main() {
  await clustersUpdate();
}

main().catch(console.error);

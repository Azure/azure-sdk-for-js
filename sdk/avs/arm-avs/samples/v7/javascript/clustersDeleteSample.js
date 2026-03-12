// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Cluster
 *
 * @summary delete a Cluster
 * x-ms-original-file: 2025-09-01/Clusters_Delete.json
 */
async function clustersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.clusters.delete("group1", "cloud1", "cluster1");
}

async function main() {
  await clustersDelete();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the provided cluster.
 *
 * @summary delete the provided cluster.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Delete.json
 */
async function deleteCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.clusters.delete("resourceGroupName", "clusterName");
  console.log(result);
}

async function main() {
  await deleteCluster();
}

main().catch(console.error);

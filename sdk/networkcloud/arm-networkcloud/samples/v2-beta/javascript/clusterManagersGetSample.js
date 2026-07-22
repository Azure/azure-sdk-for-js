// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of the provided cluster manager.
 *
 * @summary get the properties of the provided cluster manager.
 * x-ms-original-file: 2026-05-01-preview/ClusterManagers_Get.json
 */
async function getClusterManager() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.clusterManagers.get("resourceGroupName", "clusterManagerName");
  console.log(result);
}

async function main() {
  await getClusterManager();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reimages a single node on the node type, including its OS disk and all data disks.
 *
 * @summary reimages a single node on the node type, including its OS disk and all data disks.
 * x-ms-original-file: 2026-09-01-preview/ReimageAllDisks_example.json
 */
async function reimageAllDisksOnANode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.nodeTypes.reimageAllDisks("resRg", "myCluster", "BE", {
    nodes: ["BE_0"],
    force: false,
  });
}

async function main() {
  await reimageAllDisksOnANode();
}

main().catch(console.error);

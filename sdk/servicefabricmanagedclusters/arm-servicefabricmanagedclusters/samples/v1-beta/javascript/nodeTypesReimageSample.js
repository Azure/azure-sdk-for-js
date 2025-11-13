// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reimages one or more nodes on the node type. It will disable the fabric nodes, trigger a reimage on the VMs and activate the nodes back again.
 *
 * @summary reimages one or more nodes on the node type. It will disable the fabric nodes, trigger a reimage on the VMs and activate the nodes back again.
 * x-ms-original-file: 2025-06-01-preview/ReimageNodes_UD_example.json
 */
async function reimageAllNodesByUpgradeDomain() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.nodeTypes.reimage("resRg", "myCluster", "BE", {
    updateType: "ByUpgradeDomain",
  });
}

/**
 * This sample demonstrates how to reimages one or more nodes on the node type. It will disable the fabric nodes, trigger a reimage on the VMs and activate the nodes back again.
 *
 * @summary reimages one or more nodes on the node type. It will disable the fabric nodes, trigger a reimage on the VMs and activate the nodes back again.
 * x-ms-original-file: 2025-06-01-preview/ReimageNodes_example.json
 */
async function reimageNodes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.nodeTypes.reimage("resRg", "myCluster", "BE", {
    nodes: ["BE_0", "BE_3"],
  });
}

async function main() {
  await reimageAllNodesByUpgradeDomain();
  await reimageNodes();
}

main().catch(console.error);

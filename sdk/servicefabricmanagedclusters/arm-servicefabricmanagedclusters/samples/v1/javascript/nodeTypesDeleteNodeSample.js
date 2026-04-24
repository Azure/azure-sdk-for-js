// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes one or more nodes on the node type. It will disable the fabric nodes, trigger a delete on the VMs and removes the state from the cluster.
 *
 * @summary deletes one or more nodes on the node type. It will disable the fabric nodes, trigger a delete on the VMs and removes the state from the cluster.
 * x-ms-original-file: 2026-02-01/DeleteNodes_example.json
 */
async function deleteNodes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.nodeTypes.deleteNode("resRg", "myCluster", "BE", { nodes: ["BE_0", "BE_3"] });
}

async function main() {
  await deleteNodes();
}

main().catch(console.error);

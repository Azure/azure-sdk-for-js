// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to reimages one or more nodes on the node type. It will disable the fabric nodes, trigger a reimage on the VMs and activate the nodes back again.
 *
 * @summary reimages one or more nodes on the node type. It will disable the fabric nodes, trigger a reimage on the VMs and activate the nodes back again.
 * x-ms-original-file: 2025-03-01-preview/ReimageNodes_UD_example.json
 */

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

async function reimageAllNodesByUpgradeDomain(): Promise<void> {
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
 * x-ms-original-file: 2025-03-01-preview/ReimageNodes_example.json
 */
async function reimageNodes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.nodeTypes.reimage("resRg", "myCluster", "BE", {
    nodes: ["BE_0", "BE_3"],
  });
}

async function main(): Promise<void> {
  await reimageAllNodesByUpgradeDomain();
  await reimageNodes();
}

main().catch(console.error);

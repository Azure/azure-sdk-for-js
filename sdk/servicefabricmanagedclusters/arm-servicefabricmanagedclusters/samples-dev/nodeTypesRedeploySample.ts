// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to redeploys one or more nodes on the node type. It will disable the fabric nodes, trigger a shut down on the VMs, move them to a new node, and power them back on.
 *
 * @summary redeploys one or more nodes on the node type. It will disable the fabric nodes, trigger a shut down on the VMs, move them to a new node, and power them back on.
 * x-ms-original-file: 2025-03-01-preview/RedeployNodes_UD_example.json
 */
async function redeployAllNodesByUpgradeDomain(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.nodeTypes.redeploy("resRg", "myCluster", "BE");
}

/**
 * This sample demonstrates how to redeploys one or more nodes on the node type. It will disable the fabric nodes, trigger a shut down on the VMs, move them to a new node, and power them back on.
 *
 * @summary redeploys one or more nodes on the node type. It will disable the fabric nodes, trigger a shut down on the VMs, move them to a new node, and power them back on.
 * x-ms-original-file: 2025-03-01-preview/RedeployNodes_example.json
 */
async function redeployNodes(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricClient(credential, subscriptionId);
  await client.nodeTypes.redeploy("resRg", "myCluster", "BE");
}

async function main(): Promise<void> {
  await redeployAllNodesByUpgradeDomain();
  await redeployNodes();
}

main().catch(console.error);

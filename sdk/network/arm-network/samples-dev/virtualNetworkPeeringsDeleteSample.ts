// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified virtual network peering.
 *
 * @summary deletes the specified virtual network peering.
 * x-ms-original-file: 2025-05-01/VirtualNetworkPeeringDelete.json
 */
async function deletePeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkPeerings.delete("peerTest", "vnet1", "peer");
}

async function main(): Promise<void> {
  await deletePeering();
}

main().catch(console.error);

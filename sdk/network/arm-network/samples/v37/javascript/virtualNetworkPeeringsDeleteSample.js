// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified virtual network peering.
 *
 * @summary deletes the specified virtual network peering.
 * x-ms-original-file: 2025-05-01/VirtualNetworkPeeringDelete.json
 */
async function deletePeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkPeerings.delete("peerTest", "vnet1", "peer");
}

async function main() {
  await deletePeering();
}

main().catch(console.error);

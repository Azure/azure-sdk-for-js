// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all virtual network peerings in a virtual network.
 *
 * @summary gets all virtual network peerings in a virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkPeeringList.json
 */
async function listPeerings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkPeerings.list("peerTest", "vnet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all virtual network peerings in a virtual network.
 *
 * @summary gets all virtual network peerings in a virtual network.
 * x-ms-original-file: 2025-05-01/VirtualNetworkPeeringListWithRemoteVirtualNetworkEncryption.json
 */
async function listPeeringsWithRemoteVirtualNetworkEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkPeerings.list("peerTest", "vnet1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPeerings();
  await listPeeringsWithRemoteVirtualNetworkEncryption();
}

main().catch(console.error);

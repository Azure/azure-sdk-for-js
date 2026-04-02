// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the specified Virtual Router Peering.
 *
 * @summary creates or updates the specified Virtual Router Peering.
 * x-ms-original-file: 2025-05-01/VirtualRouterPeeringPut.json
 */
async function createVirtualRouterPeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualRouterPeerings.createOrUpdate(
    "rg1",
    "virtualRouter",
    "peering1",
    { peerAsn: 20000, peerIp: "192.168.1.5" },
  );
  console.log(result);
}

async function main() {
  await createVirtualRouterPeering();
}

main().catch(console.error);

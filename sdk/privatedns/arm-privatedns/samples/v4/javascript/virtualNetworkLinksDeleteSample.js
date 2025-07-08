// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a virtual network link to the specified Private DNS zone. WARNING: In case of a registration virtual network, all auto-registered DNS records in the zone for the virtual network will also be deleted. This operation cannot be undone.
 *
 * @summary deletes a virtual network link to the specified Private DNS zone. WARNING: In case of a registration virtual network, all auto-registered DNS records in the zone for the virtual network will also be deleted. This operation cannot be undone.
 * x-ms-original-file: 2024-06-01/VirtualNetworkLinkDelete.json
 */
async function deletePrivateDNSZoneVirtualNetworkLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  await client.virtualNetworkLinks.delete(
    "resourceGroup1",
    "privatezone1.com",
    "virtualNetworkLink1",
  );
}

async function main() {
  await deletePrivateDNSZoneVirtualNetworkLink();
}

main().catch(console.error);

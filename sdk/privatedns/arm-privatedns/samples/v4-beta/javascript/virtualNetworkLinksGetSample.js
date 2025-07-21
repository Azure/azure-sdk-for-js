// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkClient } = require("@azure/arm-privatedns");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a virtual network link to the specified Private DNS zone.
 *
 * @summary gets a virtual network link to the specified Private DNS zone.
 * x-ms-original-file: 2024-06-01/VirtualNetworkLinkGet.json
 */
async function getPrivateDNSZoneVirtualNetworkLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionId";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.virtualNetworkLinks.get(
    "resourceGroup1",
    "privatezone1.com",
    "virtualNetworkLink1",
  );
  console.log(result);
}

async function main() {
  await getPrivateDNSZoneVirtualNetworkLink();
}

main().catch(console.error);

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-privatedns";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a virtual network link to the specified Private DNS zone.
 *
 * @summary gets a virtual network link to the specified Private DNS zone.
 * x-ms-original-file: 2024-06-01/VirtualNetworkLinkGet.json
 */
async function getPrivateDNSZoneVirtualNetworkLink(): Promise<void> {
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

async function main(): Promise<void> {
  await getPrivateDNSZoneVirtualNetworkLink();
}

main().catch(console.error);
